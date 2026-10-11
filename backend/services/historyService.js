import Analysis from '../models/Analysis.js';
import { isDBConnected } from '../config/db.js';

export async function saveAnalysis(data) {
  if (!isDBConnected()) return null;
  return Analysis.create(data);
}

export async function listAnalyses(limit = 20) {
  if (!isDBConnected()) return [];
  return Analysis.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-jobDescription')
    .lean();
}
