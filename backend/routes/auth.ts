import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    console.error('[auth] ADMIN_USERNAME / ADMIN_PASSWORD are not configured in .env');
    return res.status(500).json({ error: 'Admin login is not configured' });
  }

  if (username !== validUsername || password !== validPassword) {
    return res.status(401).json({ error: 'Username atau password salah' });
  }

  req.session!.isAdmin = true;
  res.json({ ok: true });
});

authRouter.post('/logout', (req, res) => {
  req.session = null;
  res.json({ ok: true });
});

authRouter.get('/me', (req, res) => {
  res.json({ isAdmin: Boolean(req.session?.isAdmin) });
});
