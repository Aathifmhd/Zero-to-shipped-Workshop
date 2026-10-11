import { extractSkills } from '../utils.js';

/**
 * Compares resume text against a job description.
 * Placeholder keyword matcher — swap this for the AI-powered version later,
 * keeping the same return shape.
 */
export function analyze(resumeText, jobDescription) {
  const resumeSkills = extractSkills(resumeText);
  const jdSkills = extractSkills(jobDescription);

  const matchedSkills = jdSkills.filter((s) => resumeSkills.includes(s));
  const missingSkills = jdSkills.filter((s) => !resumeSkills.includes(s));
  const extraSkills = resumeSkills.filter((s) => !jdSkills.includes(s));

  const score = jdSkills.length
    ? Math.round((matchedSkills.length / jdSkills.length) * 100)
    : 0;

  return { score, matchedSkills, missingSkills, extraSkills };
}
