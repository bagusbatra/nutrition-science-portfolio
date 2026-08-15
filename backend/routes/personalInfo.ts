import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { PersonalInfoModel } from '../models/PersonalInfo';

export const personalInfoRouter = Router();

personalInfoRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const doc = await PersonalInfoModel.findOne();
    if (!doc) {
      return res.status(404).json({ error: 'PersonalInfo belum di-seed' });
    }
    res.json(doc);
  })
);

personalInfoRouter.put(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const {
      name, title, tagline, university, faculty, gpa, status,
      targetGraduation, email, phone, linkedin, location, bio, stats,
    } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'name dan email wajib diisi' });
    }

    const doc = await PersonalInfoModel.findOneAndUpdate(
      {},
      {
        name, title, tagline, university, faculty, gpa, status,
        targetGraduation, email, phone, linkedin, location, bio,
        stats: Array.isArray(stats) ? stats : [],
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(doc);
  })
);
