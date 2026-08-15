import { Schema, model } from 'mongoose';

const biokimiaSchema = new Schema(
  {
    test: { type: String, required: true, trim: true },
    result: { type: String, required: true, trim: true },
    normal: { type: String, required: true, trim: true },
    status: { type: String, enum: ['normal', 'high', 'low'], required: true },
  },
  { _id: false }
);

const menuItemSchema = new Schema(
  {
    waktu: { type: String, required: true, trim: true },
    menu: { type: String, required: true, trim: true },
    komposisi: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const clinicalCaseSchema = new Schema(
  {
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    patientProfile: {
      initial: { type: String, required: true, trim: true },
      age: { type: Number, required: true },
      gender: { type: String, enum: ['Laki-laki', 'Perempuan'], required: true },
      room: { type: String, required: true, trim: true },
      medicalDiagnosis: { type: String, required: true, trim: true },
      dietOrder: { type: String, required: true, trim: true },
    },
    adime: {
      assessment: {
        antropometri: { type: String, required: true, trim: true },
        biokimia: { type: [biokimiaSchema], default: [] },
        fisikKlinis: { type: String, required: true, trim: true },
        dietaryHistory: { type: String, required: true, trim: true },
      },
      diagnosisPES: {
        problem: { type: String, required: true, trim: true },
        etiology: { type: String, required: true, trim: true },
        signsSymptoms: { type: String, required: true, trim: true },
        formattedPES: { type: String, required: true, trim: true },
      },
      intervention: {
        tujuanDiet: { type: [String], default: [] },
        prinsipSyaratDiet: { type: [String], default: [] },
        perhitunganKebutuhan: {
          energi: { type: String, required: true, trim: true },
          protein: { type: String, required: true, trim: true },
          lemak: { type: String, required: true, trim: true },
          karbohidrat: { type: String, required: true, trim: true },
          cairan: { type: String, required: true, trim: true },
        },
        menuContoh: { type: [menuItemSchema], default: [] },
      },
      monitoringEvaluasi: { type: [String], default: [] },
      keyLearning: { type: String, trim: true },
    },
    keyLearning: { type: String, trim: true },
  },
  { timestamps: true }
);

export const ClinicalCaseModel = model('ClinicalCase', clinicalCaseSchema);
