# Fayl strukturasi

Loyiha **Feature-Sliced Design (FSD)** asosida tashkil etilgan. Har bir papka aniq vazifaga ega — kod kattalashganda ham tartib saqlanadi.

> Umumiy arxitektura va API haqida: [README.md](../README.md)

---

## Loyiha daraxti

```
senior-frontend-template/
├── docs/
│   └── FILE_STRUCTURE.md      # Shu hujjat
├── src/                       # ⭐ Barcha ilova kodi
│   ├── main.tsx               # Kirish nuqtasi
│   ├── vite-env.d.ts
│   ├── app/                   # Ilova ishga tushishi
│   ├── pages/                 # Sahifalar (faqat kompozitsiya)
│   ├── widgets/               # Yirik UI bloklar
│   ├── features/              # Biznes funksiyalar
│   ├── entities/              # Ulashiladigan obyektlar
│   └── shared/                # Umumiy kod
├── index.html                 # HTML shablon
├── vite.config.ts             # Vite + @ alias
├── tsconfig.json              # TypeScript (references)
├── tsconfig.app.json          # src/ uchun TS config
├── tsconfig.node.json         # vite.config uchun TS config
├── tailwind.config.js         # Tailwind content yo'llari
├── postcss.config.js          # Tailwind + Autoprefixer
├── eslint.boundaries.example.js  # FSD import qoidalari (namuna)
├── package.json
└── README.md
```

---

## `src/` — to'liq tuzilma

```
src/
├── main.tsx
│
├── app/
│   ├── App.tsx                # Provider + Router ildizi
│   ├── providers/
│   │   └── index.tsx          # QueryClient, kelajakdagi Auth/Theme
│   ├── routes/
│   │   └── index.tsx          # Barcha marshrutlar (lazy)
│   └── styles/
│       └── globals.css        # Tailwind + CSS o'zgaruvchilar
│
├── pages/
│   ├── landing/
│   │   ├── LandingPage.tsx    # Bosh sahifa
│   │   ├── lib/
│   │   │   └── packageCatalog.ts   # Paketlar haqida ma'lumot
│   │   └── ui/
│   │       ├── PackageExplorer.tsx   # Interaktiv paket tanlovi
│   │       └── PackageDemo.tsx       # Jonli demolar
│   ├── dashboard/
│   │   └── DashboardPage.tsx  # PostList namunasi
│   └── auth/
│       └── LoginPage.tsx      # Kirish sahifasi (namuna)
│
├── widgets/
│   └── header/
│       └── Header.tsx         # Global navigatsiya
│
├── features/
│   └── post-list/             # Postlar bilan ishlash funksiyasi
│       ├── api/
│       │   └── postRepository.ts     # GET/POST /posts, /comments
│       ├── model/
│       │   ├── types.ts              # Post, Comment turlari
│       │   └── schema.ts             # Zod validatsiya (createPost)
│       ├── hooks/
│       │   └── usePosts.ts           # usePosts, usePost, usePostComments
│       ├── ui/
│       │   ├── PostList.tsx          # Ro'yxat + detail kompozitsiyasi
│       │   ├── PostCard.tsx          # Bitta post kartochkasi
│       │   └── PostDetail.tsx        # Post + user + commentlar
│       └── index.ts                  # Public API
│
├── entities/
│   └── user/                  # User obyekti (bir nechta feature da ishlatiladi)
│       ├── api/
│       │   └── userRepository.ts     # GET /users
│       ├── model/
│       │   └── types.ts              # User tipi
│       ├── ui/
│       │   └── UserCard.tsx          # User kartochkasi
│       └── index.ts
│
└── shared/
    ├── api/
    │   └── httpClient.ts      # fetch wrapper — barcha API shu orqali
    ├── config/
    │   └── env.ts             # VITE_API_BASE_URL, APP_NAME
    ├── hooks/
    │   └── useDebounce.ts     # Umumiy React hook
    ├── lib/
    │   └── formatDate.ts      # cn(), sana formatlash
    ├── types/
    │   └── index.ts           # ID, Paginated, Result
    └── ui/
        └── Button.tsx         # Dizayn tizimi tugmasi
```

---

## Qatlamlar va vazifalari

| Qatlam | Vazifa | Misol |
|--------|--------|-------|
| **app** | Ilovani ishga tushirish, global sozlash | `App.tsx`, `routes`, `providers` |
| **pages** | URL ga bog'langan sahifa — faqat yig'ish | `LandingPage`, `DashboardPage` |
| **widgets** | Bir nechta sahifada takrorlanadigan yirik blok | `Header` |
| **features** | Foydalanuvchi harakati / biznes funksiya | `post-list` |
| **entities** | Domen obyekti — qayta ishlatiladi | `user` |
| **shared** | Biznesga bog'lanmagan umumiy kod | `Button`, `httpClient` |

### Import yo'nalishi (faqat pastga)

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

- `features` `entities` dan import qiladi ✅
- `entities` `features` dan import qilmaydi ❌
- `shared` hech kimdan (FSD qatlamidan) import qilmaydi ❌

`eslint.boundaries.example.js` bu qoidalarni ESLint orqali majburlaydi.

---

## entities vs features

| | **entities** | **features** |
|---|--------------|--------------|
| Savol | "Bu obyekt nima?" | "Foydalanuvchi nima qiladi?" |
| Misol | `User`, `UserCard` | Post ro'yxati, tanlash, commentlar |
| Qayta ishlatish | Ko'p feature da | Odatda bitta ssenariy |

**Namuna:** `PostDetail` (feature) post oqimini boshqaradi, muallifni ko'rsatish uchun `UserCard` (entity) chaqiradi.

`Post` hozircha faqat `post-list` da ishlatilgani uchun `features/post-list/model` da. Agar boshqa feature ham post bilan ishlasa — `entities/post` ga ko'chirish kerak.

---

## Har bir modul ichidagi segmentlar

Feature va entity lar odatda shu segmentlarga bo'linadi:

```
<feature-name>/
├── api/        # Repository — API so'rovlari (faqat shu joy httpClient ga tegadi)
├── model/      # TypeScript turlari, Zod schema
├── ui/         # React komponentlar (~300 qator limit)
├── hooks/      # React Query hook'lar (feature da)
├── lib/        # Yordamchi funksiyalar (ixtiyoriy)
└── index.ts    # Public API — tashqariga faqat shu eksportlar
```

### `index.ts` — public API

Tashqi kod faqat `index.ts` orqali import qiladi:

```ts
// ✅ To'g'ri
import { PostList } from '@/features/post-list';
import { UserCard } from '@/entities/user';

// ❌ Noto'g'ri — ichki faylga to'g'ridan-to'g'ri kirish
import { PostList } from '@/features/post-list/ui/PostList';
```

---

## Ma'lumot oqimi

```
UI komponent     Hook              Repository           httpClient        API
────────────     ────              ──────────           ──────────        ───
PostList.tsx  →  usePosts()     →  postRepository   →  httpClient.get  →  /posts
PostDetail    →  usePost()      →  postRepository   →  httpClient.get  →  /posts/:id
UserCard      →  (entity)       →  userRepository   →  httpClient.get  →  /users/:id
```

**Qoida:** UI komponent `httpClient` ni import qilmaydi — faqat hook yoki (entity UI da) repository hook orqali chaqiriladi.

---

## Marshrutlar

| URL | Sahifa | Fayl |
|-----|--------|------|
| `/` | Landing | `pages/landing/LandingPage.tsx` |
| `/dashboard` | Dashboard (PostList) | `pages/dashboard/DashboardPage.tsx` |
| `/login` | Kirish | `pages/auth/LoginPage.tsx` |

Marshrutlar: `src/app/routes/index.tsx` — sahifalar `lazy()` bilan yuklanadi (code splitting).

---

## Path alias

`@/` → `src/` (Vite va TypeScript da bir xil):

```ts
import { App } from '@/app/App';
import { PostList } from '@/features/post-list';
```

Sozlama: `vite.config.ts`, `tsconfig.app.json`.

---

## Yangi kod qo'shish qoidalari

### Yangi feature

```
src/features/<name>/
├── api/
├── model/
├── hooks/
├── ui/
└── index.ts
```

1. Repository da API chaqiruvlari
2. Hook da React Query
3. UI da faqat hook ishlatish
4. `index.ts` da eksport
5. Sahifada (`pages/`) faqat kompozitsiya

### Yangi entity

Entity qachon kerak: **bir xil obyekt 2+ feature da** ishlatilganda.

```
src/entities/<name>/
├── api/
├── model/
├── ui/
└── index.ts
```

### Yangi sahifa

```
src/pages/<name>/<Name>Page.tsx
```

`app/routes/index.tsx` ga marshrut qo'shish.

---

## Konfiguratsiya fayllari

| Fayl | Vazifa |
|------|--------|
| `vite.config.ts` | Dev server, build, `@` alias |
| `tsconfig.json` | Project references |
| `tsconfig.app.json` | `src/` TypeScript qoidalari |
| `tailwind.config.js` | `content: ['./index.html', './src/**/*.{ts,tsx}']` |
| `postcss.config.js` | Tailwind + Autoprefixer |
| `eslint.boundaries.example.js` | FSD import cheklovlari (namuna) |
| `src/shared/config/env.ts` | `VITE_API_BASE_URL` (default: JSONPlaceholder) |

---

## Tez tekshiruv ro'yxati

Yangi PR yoki feature qo'shganda:

- [ ] Fayl to'g'ri qatlamda (`features/X/api`, emas `utils/api`)
- [ ] Import faqat pastga (`feature` → `entity` → `shared`)
- [ ] UI da `httpClient` yo'q — faqat hook/repository
- [ ] Tashqi import `index.ts` orqali
- [ ] Sahifa faqat kompozitsiya — biznes logika feature da
- [ ] Komponent ~300 qatordan oshmasa yaxshi (bo'ling)
