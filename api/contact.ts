import type { IncomingMessage, ServerResponse } from 'http';

type LeadBody = {
  name?: string;
  lastName?: string;
  phone?: string;
  comment?: string;
  tour?: string;
  seats?: number | string;
};

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(body));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatLeadMessage(body: LeadBody) {
  const name = body.name?.trim() ?? '';
  const lastName = body.lastName?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const comment = body.comment?.trim() ?? '';
  const tour = body.tour?.trim() ?? '';
  const seatsRaw = body.seats;
  const seats =
    seatsRaw === undefined || seatsRaw === '' ? undefined : Number(seatsRaw);

  const lines = [
    tour
      ? '🏔️ <b>Новая бронь тура — TIAN SHAN TRAVEL</b>'
      : '🧭 <b>Новая заявка — TIAN SHAN TRAVEL</b>',
    '',
  ];
  if (tour) lines.push(`<b>Тур:</b> ${escapeHtml(tour)}`);
  lines.push(`<b>Имя:</b> ${escapeHtml(name)}`);
  if (lastName) lines.push(`<b>Фамилия:</b> ${escapeHtml(lastName)}`);
  lines.push(`<b>Телефон:</b> ${escapeHtml(phone)}`);
  if (seats != null && !Number.isNaN(seats)) lines.push(`<b>Мест:</b> ${seats}`);
  if (comment) lines.push(`<b>Комментарий:</b> ${escapeHtml(comment)}`);
  return lines.join('\n');
}

async function readBody(req: IncomingMessage & { body?: unknown }): Promise<LeadBody> {
  if (req.body && typeof req.body === 'object') {
    return req.body as LeadBody;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  return JSON.parse(raw) as LeadBody;
}

export default async function handler(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse,
) {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (req.method === 'GET') {
    const configured = Boolean(
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
    );
    sendJson(res, 200, { ok: true, configured });
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    sendJson(res, 503, { ok: false, error: 'Telegram is not configured' });
    return;
  }

  try {
    const body = await readBody(req);
    const name = body.name?.trim() ?? '';
    const phone = body.phone?.trim() ?? '';
    if (!name || !phone) {
      sendJson(res, 400, { ok: false, error: 'Name and phone are required' });
      return;
    }

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: /^-?\d+$/.test(chatId) ? Number(chatId) : chatId,
        text: formatLeadMessage(body),
        parse_mode: 'HTML',
      }),
    });

    if (!telegramRes.ok) {
      const detail = await telegramRes.text();
      console.error('Telegram sendMessage failed', telegramRes.status, detail);
      sendJson(res, 502, { ok: false, error: 'Telegram API error' });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('contact handler failed', error);
    sendJson(res, 500, { ok: false, error: 'Server error' });
  }
}
