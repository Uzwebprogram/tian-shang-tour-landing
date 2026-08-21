export type LeadPayload = {
  name: string;
  phone: string;
  comment: string;
};

function formatTelegramMessage({ name, phone, comment }: LeadPayload): string {
  return [
    '🧭 <b>Yangi so‘rov — TIAN SHAN</b>',
    '',
    `<b>Ism:</b> ${escapeHtml(name)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
    `<b>Izoh:</b> ${escapeHtml(comment || '—')}`,
  ].join('\n');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
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
