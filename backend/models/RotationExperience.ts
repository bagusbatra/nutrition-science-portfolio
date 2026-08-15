import { Schema, model } from 'mongoose';

const rotationExperienceSchema = new Schema(
  {
    category: {
      type: String,
      enum: ['Klinis (Dietetik RS)', 'MSPM (Food Service)', 'Gizi Masyarakat (Puskesmas)', 'Akademik & Riset'],
      required: true,
    },
    institution: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    badges: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    highlightMetric: { type: String, required: true, trim: true },
    iconName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const RotationExperienceModel = model('RotationExperience', rotationExperienceSchema);
