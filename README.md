# tian-shang-tour-landing

TIAN SHAN Travel — premium tour landing (Vite + React).

## Telegram bot (forma → guruh)

Forma to‘ldirilganda xabar Telegram guruhiga yuboriladi.

### Vercel — Environment Variables (majburiy)

Loyiha Vercel ga ulangan. `.env` dagi qiymatlarni **Vercel Dashboard** ga qo‘yish kerak (local `.env` production ga ta’sir qilmaydi).

1. [Vercel Dashboard](https://vercel.com) → **tian-shang-tour-landing** → **Settings** → **Environment Variables**
2. Quyidagi o‘zgaruvchilarni qo‘shing (Production, Preview, Development — hammasiga):

| Key | Value | Izoh |
|-----|-------|------|
| `TELEGRAM_BOT_TOKEN` | `@BotFather` dan olingan token | Masalan: `8635258287:AAFF...` |
| `TELEGRAM_CHAT_ID` | Guruh ID | Keyinroq qo‘shiladi (minus bilan, masalan `-100...`) |

3. **Save** → **Deployments** → oxirgi deploy → **Redeploy**

> **Muhim:** Token va guruh ID ni GitHub ga commit qilmang — faqat Vercel Environment Variables da saqlang.

### Guruh ID ni olish

1. `@tianshang_order_bot` botini guruhga qo‘shing (admin qiling)
2. Guruhda biror xabar yozing (masalan: `test`)
3. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Javobda `"chat":{"id":-1001234567890}` — bu `TELEGRAM_CHAT_ID` (minus bilan boshlanadi)
5. Shu ID ni Vercel → Environment Variables → `TELEGRAM_CHAT_ID` ga qo‘ying va redeploy qiling

### Local dev

```bash
cp .env.example .env
# .env ichida TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni to‘ldiring
npm run dev
```
