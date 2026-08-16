import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { ContactMessageModel } from '../models/ContactMessage';

export const contactRouter = Router();

contactRouter.get(
  '/',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const messages = await ContactMessageModel.find().sort({ createdAt: -1 });
    res.json(messages);
  })
);

contactRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { senderName, senderOrg, senderEmail, inquiryType, message } = req.body;
    if (!senderName?.trim() || !senderEmail?.trim() || !inquiryType?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'senderName, senderEmail, inquiryType, and message are required' });
    }
    const contactMessage = await ContactMessageModel.create({
      senderName: senderName.trim(),
      senderOrg: senderOrg?.trim() || '',
      senderEmail: senderEmail.trim(),
      inquiryType: inquiryType.trim(),
      message: message.trim(),
    });
    res.status(201).json(contactMessage);
  })
);

contactRouter.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const deleted = await ContactMessageModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pesan tidak ditemukan' });
    }
    res.json({ success: true });
  })
);
