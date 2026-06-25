import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleChat } from './chat.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const PORT = process.env.PORT || 3001;
const app = express();

app.set('trust proxy', 1);

app.use(express.json({ limit: '32kb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    next();
  });
  app.options('/api/chat', (_req, res) => res.sendStatus(204));
}

const requestCounts = new Map();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function rateLimit(req, res, next) {
  const ip = req.ip || 'local';
  const now = Date.now();
  const entry = requestCounts.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  requestCounts.set(ip, entry);
  if (entry.count > RATE_LIMIT) {
    return res.status(429).json({ error: '請求過於頻繁，請稍後再試' });
  }
  next();
}

app.post('/api/chat', rateLimit, handleChat);

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const guideMatch = req.path === '/guide' || req.path.startsWith('/guide/');
  const itemsMatch = req.path === '/items' || req.path.startsWith('/items/');
  const machinesMatch = req.path === '/machines' || req.path.startsWith('/machines/');
  const htmlFile = guideMatch ? 'guide.html' : itemsMatch ? 'items.html' : machinesMatch ? 'machines.html' : 'index.html';
  res.sendFile(path.join(distPath, htmlFile), (err) => {
    if (err) next();
  });
});

app.listen(PORT, '0.0.0.0', () => {
  const keyOk = Boolean(process.env.DEEPSEEK_API_KEY?.trim());
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
  console.log(`DeepSeek API: ${keyOk ? '已設定' : '未設定（AI 問答將無法使用）'}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`埠號 ${PORT} 已被佔用，請關閉舊的後端程序後再執行 npm run dev`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
