import { Schema, model } from 'mongoose';

const guestbookEntrySchema = new Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  emoji: { type: String, default: '🌸' },
}, { timestamps: true });

export const GuestbookEntryModel = model('GuestbookEntry', guestbookEntrySchema);
