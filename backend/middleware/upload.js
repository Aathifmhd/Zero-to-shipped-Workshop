import multer from 'multer';
import { config } from '../config/index.js';
import { HttpError } from '../utils.js';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.maxFileSizeMb * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') return cb(null, true);
    cb(new HttpError(400, 'Only PDF files are allowed.'));
  },
});
