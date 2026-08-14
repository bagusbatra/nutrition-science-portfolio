import { Router } from 'express';
import { GuestbookEntryModel } from '../models/GuestbookEntry';

export const guestbookRouter = Router();

guestbookRouter.get('/', async (_req, res) => {
  const entries = await GuestbookEntryModel.find().sort({ createdAt: -1 });
  res.json(entries);
});

guestbookRouter.post('/', async (req, res) => {
  const { name, role, message, emoji } = req.body;
  if (!name?.trim() || !role?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'name, role, and message are required' });
  }
  const entry = await GuestbookEntryModel.create({
    name: name.trim(),
    role: role.trim(),
    message: message.trim(),
    emoji,
  });
  res.status(201).json(entry);
});
