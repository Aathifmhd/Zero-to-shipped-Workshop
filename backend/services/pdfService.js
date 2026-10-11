// Import the lib file directly: pdf-parse's index.js runs a debug harness when it has no parent module.
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { HttpError } from '../utils.js';

export async function extractTextFromPdf(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch {
    throw new HttpError(422, 'That file could not be parsed as a PDF.');
  }
}
