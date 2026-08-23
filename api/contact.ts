import {
  getTelegramConfig,
  sendLeadToTelegram,
  type LeadBody,
} from '../lib/telegramContact';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(request: Request) {
  const config = getTelegramConfig();
  if (!config) {
    return json(503, { ok: false, error: 'Telegram is not configured' });
  }

  try {
    const body = (await request.json()) as LeadBody;
    const result = await sendLeadToTelegram(body, config);

    if (!result.ok) {
      const status = result.error === 'Name and phone are required' ? 400 : 502;
      return json(status, { ok: false, error: result.error });
    }

    return json(200, { ok: true });
  } catch {
    return json(500, { ok: false, error: 'Server error' });
  }
}
