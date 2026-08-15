import { Schema, model } from 'mongoose';

const organolepticScoreSchema = new Schema(
  {
    warna: { type: Number, required: true },
    aroma: { type: Number, required: true },
    rasa: { type: Number, required: true },
    tekstur: { type: Number, required: true },
    overall: { type: Number, required: true },
  },
  { _id: false }
);

const proximateSchema = new Schema(
  {
    fe: { type: Number, required: true },
    protein: { type: Number, required: true },
    serat: { type: Number, required: true },
    lemak: { type: Number, required: true },
    energi: { type: Number, required: true },
  },
  { _id: false }
);

const formulationSchema = new Schema(
  {
    code: { type: String, required: true, trim: true },
    ratio: { type: String, required: true, trim: true },
    kelorPercent: { type: Number, required: true },
    bekatulPercent: { type: Number, required: true },
    mocafPercent: { type: Number, required: true },
    organolepticScore: { type: organolepticScoreSchema, required: true },
    proximate: { type: proximateSchema, required: true },
    isBestChoice: { type: Boolean, default: false },
  },
  { _id: false }
);

const skripsiResearchSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subTitle: { type: String, required: true, trim: true },
    advisor: { type: [String], default: [] },
    status: { type: String, required: true, trim: true },
    completionDate: { type: String, required: true, trim: true },
    abstract: { type: String, required: true, trim: true },
    hypotheses: { type: [String], default: [] },
    formulations: { type: [formulationSchema], default: [] },
    keyTakeaways: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const SkripsiResearchModel = model('SkripsiResearch', skripsiResearchSchema);
