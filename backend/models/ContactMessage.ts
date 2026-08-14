import { Schema, model } from 'mongoose';

const contactMessageSchema = new Schema({
  senderName: { type: String, required: true, trim: true },
  senderOrg: { type: String, trim: true, default: '' },
  senderEmail: { type: String, required: true, trim: true },
  inquiryType: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });

export const ContactMessageModel = model('ContactMessage', contactMessageSchema);
