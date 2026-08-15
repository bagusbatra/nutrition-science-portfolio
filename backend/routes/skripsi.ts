import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { SkripsiResearchModel } from '../models/SkripsiResearch';

export const skripsiRouter = Router();

skripsiRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const doc = await SkripsiResearchModel.findOne();
    if (!doc) {
      return res.status(404).json({ error: 'SkripsiResearch belum di-seed' });
    }
    res.json(doc);
  })
);

skripsiRouter.put(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { title, subTitle, advisor, status, completionDate, abstract, hypotheses, formulations, keyTakeaways } =
      req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: 'title wajib diisi' });
    }

    const doc = await SkripsiResearchModel.findOneAndUpdate(
      {},
      {
        title,
        subTitle,
        status,
        completionDate,
        abstract,
        advisor: Array.isArray(advisor) ? advisor : [],
        hypotheses: Array.isArray(hypotheses) ? hypotheses : [],
        formulations: Array.isArray(formulations) ? formulations : [],
        keyTakeaways: Array.isArray(keyTakeaways) ? keyTakeaways : [],
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(doc);
  })
);
