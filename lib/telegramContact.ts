export type LeadBody = {
  name?: string;
  lastName?: string;
  phone?: string;
  comment?: string;
  tour?: string;
  seats?: number | string;
};

export type TelegramConfig = {
  token: string;
  chatId: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function getTelegramConfig(env: NodeJS.ProcessEnv = process.env): TelegramConfig | null {
  const token = env.TELEGRAM_BOT_TOKEN || env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID || env.VITE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;
  return { token, chatId };
}

export function formatLeadMessage(body: LeadBody): string {
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
  if (seats != null && !Number.isNaN(seats)) {
    lines.push(`<b>Мест:</b> ${seats}`);
  }
  if (comment) lines.push(`<b>Комментарий:</b> ${escapeHtml(comment)}`);

  return lines.join('\n');
}

export function validateLeadBody(body: LeadBody): string | null {
  const name = body.name?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  if (!name || !phone) return 'Name and phone are required';
  return null;
}

export async function sendLeadToTelegram(
  body: LeadBody,
  config: TelegramConfig,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const validationError = validateLeadBody(body);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${config.token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatLeadMessage(body),
        parse_mode: 'HTML',
      }),
    },
  );

  if (!telegramRes.ok) {
    const detail = await telegramRes.text();
    console.error('Telegram sendMessage failed', telegramRes.status, detail);
    return { ok: false, error: 'Telegram API error' };
  }

  return { ok: true };
}
