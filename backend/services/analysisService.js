import { config } from '../config/index.js';
import { extractSkills } from '../utils.js';
import { extractTextFromPdf } from './pdfService.js';
import { analyzeWithClaude } from './aiService.js';
import { HttpError } from '../utils.js';

/**
 * Scores a resume PDF against a job description.
 * Uses Claude when ANTHROPIC_API_KEY is set, otherwise falls back to keyword matching.
 */
export async function analyze(pdfBuffer, jobDescription) {
  if (config.anthropicApiKey) {
    return { method: 'ai', ...(await analyzeWithClaude(pdfBuffer, jobDescription)) };
  }

  const resumeText = await extractTextFromPdf(pdfBuffer);
  if (!resumeText.trim()) {
    throw new HttpError(422, 'Could not read any text from that PDF. Is it a scanned image?');
  }
  return { method: 'keyword', ...keywordMatch(resumeText, jobDescription) };
}

function keywordMatch(resumeText, jobDescription) {
  const resumeSkills = extractSkills(resumeText);
  const jdSkills = extractSkills(jobDescription);

  const matchedSkills = jdSkills.filter((s) => resumeSkills.includes(s));
  const missingSkills = jdSkills.filter((s) => !resumeSkills.includes(s));

  const score = jdSkills.length
    ? Math.round((matchedSkills.length / jdSkills.length) * 100)
    : 0;

  return { score, matchedSkills, missingSkills };
}
