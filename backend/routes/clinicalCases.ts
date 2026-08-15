import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/requireAdmin';
import { ClinicalCaseModel } from '../models/ClinicalCase';

export const clinicalCasesRouter = Router();

clinicalCasesRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const docs = await ClinicalCaseModel.find().sort({ createdAt: 1 });
    res.json(docs);
  })
);

clinicalCasesRouter.post(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { code, title, patientProfile, adime, keyLearning } = req.body;

    if (!code?.trim() || !title?.trim()) {
      return res.status(400).json({ error: 'code dan title wajib diisi' });
    }

    const doc = await ClinicalCaseModel.create({ code, title, patientProfile, adime, keyLearning });
    res.status(201).json(doc);
  })
);

clinicalCasesRouter.put(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { code, title, patientProfile, adime, keyLearning } = req.body;

    if (!code?.trim() || !title?.trim()) {
      return res.status(400).json({ error: 'code dan title wajib diisi' });
    }

    const doc = await ClinicalCaseModel.findByIdAndUpdate(
      req.params.id,
      { code, title, patientProfile, adime, keyLearning },
      { new: true, runValidators: true }
    );
    if (!doc) {
      return res.status(404).json({ error: 'Kasus tidak ditemukan' });
    }
    res.json(doc);
  })
);

clinicalCasesRouter.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const doc = await ClinicalCaseModel.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Kasus tidak ditemukan' });
    }
    res.json({ ok: true });
  })
);
