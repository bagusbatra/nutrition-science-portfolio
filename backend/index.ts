import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDB } from './db';
import { contactRouter } from './routes/contact';
import { guestbookRouter } from './routes/guestbook';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/guestbook', guestbookRouter);
app.use('/api/contact', contactRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[server] Failed to connect to MongoDB', err);
    process.exit(1);
  });
