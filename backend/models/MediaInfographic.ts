import { Schema, model } from 'mongoose';

const mediaInfographicSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Leaflet Pasien', 'Poster Edukasi', 'Formulasi Pangan', 'Media Digital'],
      required: true,
    },
    targetAudience: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    keyPoints: { type: [String], default: [] },
    thumbnailBg: { type: String, required: true, trim: true },
    accentColor: { type: String, required: true, trim: true },
    dimensions: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const MediaInfographicModel = model('MediaInfographic', mediaInfographicSchema);
