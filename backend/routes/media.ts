import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { MediaInfographicModel } from '../models/MediaInfographic';

export const mediaRouter = Router();

mediaRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const docs = await MediaInfographicModel.find().sort({ createdAt: 1 });
    res.json(docs);
  })
);

mediaRouter.post(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { title, category, targetAudience, description, keyPoints, thumbnailBg, accentColor, dimensions } =
      req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: 'title wajib diisi' });
    }

    const doc = await MediaInfographicModel.create({
      title,
      category,
      targetAudience,
      description,
      keyPoints: Array.isArray(keyPoints) ? keyPoints : [],
      thumbnailBg,
      accentColor,
      dimensions,
    });
    res.status(201).json(doc);
  })
);

mediaRouter.put(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { title, category, targetAudience, description, keyPoints, thumbnailBg, accentColor, dimensions } =
      req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: 'title wajib diisi' });
    }

    const doc = await MediaInfographicModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        targetAudience,
        description,
        keyPoints: Array.isArray(keyPoints) ? keyPoints : [],
        thumbnailBg,
        accentColor,
        dimensions,
      },
      { new: true, runValidators: true }
    );
    if (!doc) {
      return res.status(404).json({ error: 'Media tidak ditemukan' });
    }
    res.json(doc);
  })
);

mediaRouter.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const doc = await MediaInfographicModel.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Media tidak ditemukan' });
    }
    res.json({ ok: true });
  })
);
