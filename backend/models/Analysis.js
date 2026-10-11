import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    jobDescription: { type: String, required: true },
    method: { type: String, enum: ['ai', 'keyword'], required: true },
    aiModel: String,
    score: { type: Number, required: true },
    summary: String,
    matchedSkills: [String],
    missingSkills: [String],
    strengths: [String],
    improvements: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Analysis', analysisSchema);
