# tian-shang-tour-landing

TIAN SHAN Travel — premium tour landing (Vite + React).

## Telegram bot (forma → guruh)

Forma to‘ldirilganda xabar Telegram guruhiga yuboriladi.

### Vercel (production)

1. [Vercel Dashboard](https://vercel.com) → loyiha → **Settings** → **Environment Variables**
2. Qo‘shing:
   - `TELEGRAM_BOT_TOKEN` — bot token (@BotFather dan)
   - `TELEGRAM_CHAT_ID` — guruh ID (pastdagi yo‘riqnoma)
3. Redeploy qiling

### Guruh ID ni olish

1. `@tianshang_order_bot` botini guruhga qo‘shing (admin qiling)
2. Guruhda biror xabar yozing (masalan: `test`)
3. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Javobda `"chat":{"id":-1001234567890}` — bu `TELEGRAM_CHAT_ID` (minus bilan boshlanadi)

### Local dev

```bash
cp .env.example .env
# .env ichida TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni to‘ldiring
npm run dev
```
