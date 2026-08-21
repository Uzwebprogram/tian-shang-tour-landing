export type LeadPayload = {
  name: string;
  phone: string;
  comment?: string;
  lastName?: string;
  tour?: string;
  seats?: number;
};

function formatTelegramMessage(payload: LeadPayload): string {
  const {
    name,
    lastName,
    phone,
    comment,
    tour,
    seats,
  } = payload;

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
  if (seats != null) lines.push(`<b>Joylar:</b> ${seats}`);
  if (comment) lines.push(`<b>Izoh:</b> ${escapeHtml(comment)}`);

  return lines.join('\n');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendViaProxy(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendViaTelegramApi(payload: LeadPayload): Promise<boolean> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramMessage(payload),
      parse_mode: 'HTML',
    }),
  });
  return res.ok;
}

export async function sendLead(payload: LeadPayload): Promise<void> {
  const viaProxy = await sendViaProxy(payload);
  if (viaProxy) return;

  const viaTelegram = await sendViaTelegramApi(payload);
  if (viaTelegram) return;

  throw new Error('Telegram delivery failed');
}
