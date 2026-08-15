import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { RotationExperienceModel } from '../models/RotationExperience';

export const rotationsRouter = Router();

rotationsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const docs = await RotationExperienceModel.find().sort({ createdAt: 1 });
    res.json(docs);
  })
);

rotationsRouter.post(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { category, institution, period, role, location, badges, achievements, highlightMetric, iconName } =
      req.body;

    if (!institution?.trim() || !role?.trim()) {
      return res.status(400).json({ error: 'institution dan role wajib diisi' });
    }

    const doc = await RotationExperienceModel.create({
      category,
      institution,
      period,
      role,
      location,
      badges: Array.isArray(badges) ? badges : [],
      achievements: Array.isArray(achievements) ? achievements : [],
      highlightMetric,
      iconName,
    });
    res.status(201).json(doc);
  })
);

rotationsRouter.put(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { category, institution, period, role, location, badges, achievements, highlightMetric, iconName } =
      req.body;

    if (!institution?.trim() || !role?.trim()) {
      return res.status(400).json({ error: 'institution dan role wajib diisi' });
    }

    const doc = await RotationExperienceModel.findByIdAndUpdate(
      req.params.id,
      {
        category,
        institution,
        period,
        role,
        location,
        badges: Array.isArray(badges) ? badges : [],
        achievements: Array.isArray(achievements) ? achievements : [],
        highlightMetric,
        iconName,
      },
      { new: true, runValidators: true }
    );
    if (!doc) {
      return res.status(404).json({ error: 'Rotasi tidak ditemukan' });
    }
    res.json(doc);
  })
);

rotationsRouter.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const doc = await RotationExperienceModel.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Rotasi tidak ditemukan' });
    }
    res.json({ ok: true });
  })
);
