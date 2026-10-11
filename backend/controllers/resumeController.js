import { extractTextFromPdf } from '../services/pdfService.js';
import { analyze } from '../services/analysisService.js';
import { saveAnalysis, listAnalyses } from '../services/historyService.js';
import { asyncHandler, HttpError } from '../utils.js';

export const analyzeResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new HttpError(400, 'Please upload a resume PDF.');

  const jobDescription = (req.body.jobDescription || '').trim();
  if (jobDescription.length < 20) {
    throw new HttpError(400, 'Please paste a job description (at least 20 characters).');
  }

  const resumeText = await extractTextFromPdf(req.file.buffer);
  if (!resumeText.trim()) {
    throw new HttpError(422, 'Could not read any text from that PDF. Is it a scanned image?');
  }

  const result = analyze(resumeText, jobDescription);
  const saved = await saveAnalysis({ fileName: req.file.originalname, jobDescription, ...result });

  res.json({ id: saved?._id ?? null, fileName: req.file.originalname, ...result });
});

export const getHistory = asyncHandler(async (req, res) => {
  res.json(await listAnalyses());
});
