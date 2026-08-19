import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { SectionVisibilityModel } from '../models/SectionVisibility';

export const sectionVisibilityRouter = Router();

sectionVisibilityRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const doc = await SectionVisibilityModel.findOne();
    if (!doc) {
      return res.status(404).json({ error: 'SectionVisibility belum di-seed' });
    }
    res.json(doc);
  })
);

sectionVisibilityRouter.put(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { skripsi, workbench, cases, rotations, media, skills } = req.body;

    const doc = await SectionVisibilityModel.findOneAndUpdate(
      {},
      {
        skripsi: Boolean(skripsi),
        workbench: Boolean(workbench),
        cases: Boolean(cases),
        rotations: Boolean(rotations),
        media: Boolean(media),
        skills: Boolean(skills),
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(doc);
  })
);
