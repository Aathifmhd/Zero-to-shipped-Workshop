import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    jobDescription: { type: String, required: true },
    score: { type: Number, required: true },
    matchedSkills: [String],
    missingSkills: [String],
    extraSkills: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Analysis', analysisSchema);
