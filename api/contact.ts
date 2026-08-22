import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  getTelegramConfig,
  sendLeadToTelegram,
  type LeadBody,
} from '../lib/telegramContact';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const config = getTelegramConfig();
  if (!config) {
    return res.status(503).json({ ok: false, error: 'Telegram is not configured' });
  }

  try {
    const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as LeadBody;
    const result = await sendLeadToTelegram(body, config);

    if (!result.ok) {
      const status = result.error === 'Name and phone are required' ? 400 : 502;
      return res.status(status).json({ ok: false, error: result.error });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
