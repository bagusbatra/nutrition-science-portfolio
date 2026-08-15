import { Schema, model } from 'mongoose';

const statSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    sub: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const personalInfoSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    university: { type: String, required: true, trim: true },
    faculty: { type: String, required: true, trim: true },
    gpa: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    targetGraduation: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    linkedin: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    stats: { type: [statSchema], default: [] },
  },
  { timestamps: true }
);

export const PersonalInfoModel = model('PersonalInfo', personalInfoSchema);
