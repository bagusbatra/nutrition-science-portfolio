import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { SkillsAndCompetenciesModel } from '../models/SkillsAndCompetencies';

export const skillsRouter = Router();

skillsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const doc = await SkillsAndCompetenciesModel.findOne();
    if (!doc) {
      return res.status(404).json({ error: 'SkillsAndCompetencies belum di-seed' });
    }
    res.json(doc);
  })
);

skillsRouter.put(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { clinical, foodService, software, certifications } = req.body;

    const doc = await SkillsAndCompetenciesModel.findOneAndUpdate(
      {},
      {
        clinical: Array.isArray(clinical) ? clinical : [],
        foodService: Array.isArray(foodService) ? foodService : [],
        software: Array.isArray(software) ? software : [],
        certifications: Array.isArray(certifications) ? certifications : [],
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(doc);
  })
);
