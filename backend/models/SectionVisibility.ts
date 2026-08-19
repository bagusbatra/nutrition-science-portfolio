import { Schema, model } from 'mongoose';

const sectionVisibilitySchema = new Schema({
  skripsi: { type: Boolean, default: true },
  workbench: { type: Boolean, default: true },
  cases: { type: Boolean, default: true },
  rotations: { type: Boolean, default: true },
  media: { type: Boolean, default: true },
  skills: { type: Boolean, default: true },
}, { timestamps: true });

export const SectionVisibilityModel = model('SectionVisibility', sectionVisibilitySchema);
