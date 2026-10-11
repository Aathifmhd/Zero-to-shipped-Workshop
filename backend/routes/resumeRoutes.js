import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { analyzeResume, getHistory } from '../controllers/resumeController.js';

const router = Router();

// POST /api/resume/analyze  (multipart: resume=<pdf>, jobDescription=<text>)
router.post('/analyze', upload.single('resume'), analyzeResume);

// GET /api/resume/history
router.get('/history', getHistory);

export default router;
