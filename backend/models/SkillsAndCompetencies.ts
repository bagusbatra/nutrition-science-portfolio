import { Schema, model } from 'mongoose';

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const certificationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const skillsAndCompetenciesSchema = new Schema(
  {
    clinical: { type: [skillSchema], default: [] },
    foodService: { type: [skillSchema], default: [] },
    software: { type: [skillSchema], default: [] },
    certifications: { type: [certificationSchema], default: [] },
  },
  { timestamps: true }
);

export const SkillsAndCompetenciesModel = model('SkillsAndCompetencies', skillsAndCompetenciesSchema);
