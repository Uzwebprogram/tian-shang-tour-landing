// shared/config/env.ts
// Barcha environment o'zgaruvchilari va konstantalar bitta joyda.

export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  APP_NAME: 'TIAN SHAN',
  TELEGRAM_BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? '',
  TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID ?? '',
} as const;
