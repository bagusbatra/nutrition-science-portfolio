import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { ContactMessageModel } from '../models/ContactMessage';

export const contactRouter = Router();

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
