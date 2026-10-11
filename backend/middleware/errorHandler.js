import multer from 'multer';
import { config } from '../config/index.js';
import { HttpError } from '../utils.js';

export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? `File is too large (max ${config.maxFileSizeMb} MB).`
        : err.message;
    return res.status(400).json({ error: message });
  }

  const status = err.status || 500;
  if (status >= 500) console.error(err);
  // HttpError messages are written for users; hide everything else.
  const expose = err instanceof HttpError || status < 500;
  res.status(status).json({ error: expose ? err.message : 'Something went wrong.' });
}
