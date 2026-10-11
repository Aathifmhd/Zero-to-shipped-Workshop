import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { config } from './config/index.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: config.clientUrl }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/resume', resumeRoutes);

app.use(notFound);
app.use(errorHandler);

await connectDB();

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
