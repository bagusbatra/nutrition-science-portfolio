import dotenv from 'dotenv';
// This project keeps secrets in .env.local (matching the Vite convention used in the README),
// not the plain .env that dotenv/config loads by default — load both, with .local overriding.
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

import cookieSession from 'cookie-session';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { connectDB } from './db';
import { authRouter } from './routes/auth';
import { contactRouter } from './routes/contact';
import { guestbookRouter } from './routes/guestbook';
import { personalInfoRouter } from './routes/personalInfo';
import { skripsiRouter } from './routes/skripsi';
import { clinicalCasesRouter } from './routes/clinicalCases';
import { rotationsRouter } from './routes/rotations';
import { mediaRouter } from './routes/media';
import { skillsRouter } from './routes/skills';
import { seedIfEmpty } from './seed';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: 'della_admin_session',
    secret: process.env.SESSION_SECRET || 'dev-only-insecure-secret',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
  })
);

app.use('/api/auth', authRouter);
app.use('/api/guestbook', guestbookRouter);
app.use('/api/contact', contactRouter);
app.use('/api/content/identitas', personalInfoRouter);
app.use('/api/content/skripsi', skripsiRouter);
app.use('/api/content/kasus', clinicalCasesRouter);
app.use('/api/content/rotasi', rotationsRouter);
app.use('/api/content/galeri', mediaRouter);
app.use('/api/content/kompetensi', skillsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Last-resort safety net: asyncHandler forwards route errors here instead of letting them
// crash the process. Without this, one bad request (e.g. a failed Mongoose validation)
// would take down the entire API for every user, not just return an error to the requester.
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[server] Unhandled route error:', err);
  if (err?.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

// Mongo powers guestbook/contact/content routes, but auth and static routes don't need it —
// a DB hiccup shouldn't take down the whole API, so listening isn't gated on connectDB().
app.listen(PORT, () => {
  console.log(`[server] API listening on http://localhost:${PORT}`);
});

connectDB()
  .then(() => seedIfEmpty())
  .catch((err) => {
    console.error('[server] Failed to connect to MongoDB — routes that need it will fail until it is reachable', err);
  });
