import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

type LeadBody = {
  name?: string;
  lastName?: string;
  phone?: string;
  comment?: string;
  tour?: string;
  seats?: number | string;
};

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function handleContact(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void,
) {
  const url = req.url?.split('?')[0];
  if (url !== '/api/contact') {
    next();
    return;
  }

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Telegram is not configured' }));
    return;
  }

  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as LeadBody;
    const name = body.name?.trim() ?? '';
    const lastName = body.lastName?.trim() ?? '';
    const phone = body.phone?.trim() ?? '';
    const comment = body.comment?.trim() ?? '';
    const tour = body.tour?.trim() ?? '';
    const seatsRaw = body.seats;
    const seats =
      seatsRaw === undefined || seatsRaw === ''
        ? undefined
        : Number(seatsRaw);

    if (!name || !phone) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Name and phone are required' }));
      return;
    }

    const lines = [
      tour
        ? '🏔️ <b>Yangi tur bron — TIAN SHAN TRAVEL</b>'
        : '🧭 <b>Yangi so‘rov — TIAN SHAN TRAVEL</b>',
      '',
    ];
    if (tour) lines.push(`<b>Tur:</b> ${escapeHtml(tour)}`);
    lines.push(`<b>Ism:</b> ${escapeHtml(name)}`);
    if (lastName) lines.push(`<b>Familiya:</b> ${escapeHtml(lastName)}`);
    lines.push(`<b>Telefon:</b> ${escapeHtml(phone)}`);
    if (seats != null && !Number.isNaN(seats)) {
      lines.push(`<b>Joylar:</b> ${seats}`);
    }
    if (comment) lines.push(`<b>Izoh:</b> ${escapeHtml(comment)}`);

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join('\n'),
          parse_mode: 'HTML',
        }),
      },
    );

    if (!telegramRes.ok) {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Telegram API error' }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({ ok: true }));
  } catch {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Server error' }));
  }
}

export function telegramContactPlugin(): Plugin {
  return {
    name: 'telegram-contact',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void handleContact(req, res, next);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        void handleContact(req, res, next);
      });
    },
  };
}
