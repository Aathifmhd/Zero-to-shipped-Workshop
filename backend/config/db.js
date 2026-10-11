import mongoose from 'mongoose';
import { config } from './index.js';

const RETRY_AFTER_MS = 30_000;
let connecting = null;
let lastFailureAt = 0;

export async function connectDB() {
  if (isDBConnected()) return;
  // After a failure, don't make every request wait out the timeout again.
  if (!connecting && Date.now() - lastFailureAt < RETRY_AFTER_MS) return;
  // Share one in-flight attempt between concurrent requests.
  connecting ??= mongoose
    .connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      lastFailureAt = Date.now();
      // Keep the API usable without a database; results just won't be saved.
      console.warn(`MongoDB connection failed: ${err.message}`);
    })
    .finally(() => {
      connecting = null;
    });
  await connecting;
}

export const isDBConnected = () => mongoose.connection.readyState === 1;
