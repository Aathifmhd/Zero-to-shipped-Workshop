import mongoose from 'mongoose';
import { config } from './index.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected');
  } catch (err) {
    // Keep the API usable without a database; results just won't be saved.
    console.warn(`MongoDB connection failed: ${err.message}`);
  }
}

export const isDBConnected = () => mongoose.connection.readyState === 1;
