// pages/landing/lib/packageCatalog.ts
// Loyihadagi har bir paket: nima uchun tanlangan va qayerda ishlatiladi.

export type PackageCategory = 'runtime' | 'data' | 'routing' | 'build' | 'style' | 'quality';

export type PackageDemo = 'button' | 'zod' | 'query' | 'router' | null;

export type PackageInfo = {
  id: string;
  name: string;
  category: PackageCategory;
  summary: string;
  whyChosen: string[];
  howItWorks: string[];
  usedIn: string;
  demo: PackageDemo;
};

export const categoryLabels: Record<PackageCategory, string> = {
  runtime: 'Runtime',
  data: 'Ma\'lumot',
  routing: 'Marshrutlash',
  build: 'Build',
  style: 'Stil',
  quality: 'Sifat',
};

export const packages: PackageInfo[] = [
  {
    id: 'react',
    name: 'react',
    category: 'runtime',
    summary: 'UI komponentlar va holat (state) uchun asos.',
    whyChosen: [
      'Komponent asosida UI — murakkab interfeyslarni bo\'laklarga bo\'lish oson.',
      'Katta ekotizim: kutubxonalar, hujjatlar, kadrlar.',
      'React 18 — concurrent features va barqaror API.',
    ],
    howItWorks: [
      'Siz funksiya komponent yozasiz → JSX qaytarasiz.',
      'useState bilan holat o\'zgaradi → faqat kerakli qism qayta chiziladi.',
      'Bu shablonda har bir qatlam (pages, features) komponentlardan tashkil topadi.',
    ],
    usedIn: 'src/main.tsx, src/app/App.tsx, barcha *.tsx fayllar',
    demo: null,
  },
  {
    id: 'react-dom',
    name: 'react-dom',
    category: 'runtime',
    summary: 'React daraxtini brauzer DOM ga ulaydi.',
    whyChosen: [
      'react bilan juft ishlaydi — virtual DOM ni haqiqiy DOM ga render qiladi.',
      'Vite + React loyihalarida standart juftlik.',
    ],
    howItWorks: [
      'createRoot(#root) — ilova bitta nuqtadan mount qilinadi.',
      'Har bir state o\'zgarishida React DOM diff hisoblab, minimal o\'zgartirish qiladi.',
    ],
    usedIn: 'src/main.tsx',
    demo: null,
  },
  {
    id: 'react-router-dom',
    name: 'react-router-dom',
    category: 'routing',
    summary: 'Sahifalar orasida navigatsiya — URL ↔ komponent.',
    whyChosen: [
      'SPA da sahifa almashish brauzer qayta yuklanmasdan.',
      'Lazy loading bilan kod bo\'linadi (code splitting).',
      'Link, useNavigate, params — standart routing API.',
    ],
    howItWorks: [
      'URL path ga qarab qaysi Page komponenti ko\'rsatilishini router hal qiladi.',
      '<Link to="..."> — <a> kabi, lekin to\'liq reload yo\'q.',
      'Marshrutlar bitta joyda: src/app/routes/index.tsx.',
    ],
    usedIn: 'src/app/routes/index.tsx, Header, LandingPage Link\'lar',
    demo: 'router',
  },
  {
    id: 'tanstack-query',
    name: '@tanstack/react-query',
    category: 'data',
    summary: 'Server ma\'lumotini cache, yuklash va yangilash.',
    whyChosen: [
      'useEffect + fetch o\'rniga — loading/error/cache tayyor.',
      'Bir xil ma\'lumotni qayta so\'ramasdan cache dan oladi (staleTime).',
      'invalidate, refetch — murakkab sync osonlashadi.',
    ],
    howItWorks: [
      'QueryClient butun ilovani o\'rab oladi (AppProviders).',
      'useQuery({ queryKey, queryFn }) — ma\'lumotni oladi va cache ga yozadi.',
      'Komponent faqat hook natijasini ko\'rsatadi — baza alohida repository da.',
    ],
    usedIn: 'src/app/providers/index.tsx, features/*/hooks/use*.ts',
    demo: 'query',
  },
  {
    id: 'jsonplaceholder',
    name: 'JSONPlaceholder API',
    category: 'data',
    summary: 'Bepul fake REST API — prototip va o\'qish uchun.',
    whyChosen: [
      'Haqiqiy backend kerak emas — darhol ishlaydi.',
      'posts, users, todos, comments — relation namunalari tayyor.',
      'GET/POST/PUT/PATCH/DELETE — REST oqimini sinash uchun.',
    ],
    howItWorks: [
      'httpClient.get("/posts") — fetch orqali JSON oladi.',
      'Repository qatlami path va mapping ni biladi — UI bilmaydi.',
      'Hook → Repository → httpClient → JSONPlaceholder.',
    ],
    usedIn: 'src/shared/api/httpClient.ts, features/*/api/*Repository.ts',
    demo: 'query',
  },
  {
    id: 'zod',
    name: 'zod',
    category: 'data',
    summary: 'Runtime da ma\'lumotni tekshirish (validatsiya).',
    whyChosen: [
      'TypeScript turlari va runtime tekshiruv bir joyda.',
      'API javobini ishonch bilan parse qilish — noto\'g\'ri data UI ga tushmaydi.',
      'Forma va DTO schema lari o\'qilishi oson.',
    ],
    howItWorks: [
      'z.object({ email: z.string().email() }) — schema yaratiladi.',
      'schema.safeParse(data) — muvaffaqiyat yoki xato ro\'yxati.',
      'model/schema.ts fayllarida saqlanadi.',
    ],
    usedIn: 'src/features/post-list/model/schema.ts',
    demo: 'zod',
  },
  {
    id: 'vite',
    name: 'vite',
    category: 'build',
    summary: 'Tez dev server va production build.',
    whyChosen: [
      'ESM asosida — dev da bundling deyarli yo\'q, juda tez HMR.',
      'CRA dan yengil va zamonaviy.',
      'React plugin bilan bir qator ishlaydi.',
    ],
    howItWorks: [
      'npm run dev — dev server, fayl saqlanganda darhol yangilanadi.',
      'npm run build — optimallashtirilgan static fayllar dist/ ga.',
    ],
    usedIn: 'vite.config.ts, package.json scripts',
    demo: null,
  },
  {
    id: 'vite-plugin-react',
    name: '@vitejs/plugin-react',
    category: 'build',
    summary: 'Vite uchun React JSX va Fast Refresh.',
    whyChosen: [
      'JSX transform va React komponentlarni qayta yuklash (sahifa refreshsiz).',
      'Vite ning rasmiy React integratsiyasi.',
    ],
    howItWorks: [
      'vite.config.ts da plugins: [react()] — Vite React ni tushunadi.',
      'Komponentda o\'zgarish → faqat o\'sha komponent yangilanadi.',
    ],
    usedIn: 'vite.config.ts',
    demo: null,
  },
  {
    id: 'typescript',
    name: 'typescript',
    category: 'quality',
    summary: 'JavaScript + statik turlar — xatolarni erta ushlash.',
    whyChosen: [
      'Katta loyihada refactor xavfsizroq.',
      'IDE autocomplete va hujjatlashtirish yaxshiroq.',
      'Senior darajadagi kod bazasi uchun standart.',
    ],
    howItWorks: [
      'tsc build vaqtida tekshiradi — noto\'g\'ri tip compile bo\'lmaydi.',
      'Har bir model, hook, props aniq tip bilan yoziladi.',
    ],
    usedIn: 'tsconfig.json, barcha .ts/.tsx fayllar',
    demo: null,
  },
  {
    id: 'tailwindcss',
    name: 'tailwindcss',
    category: 'style',
    summary: 'Utility-first CSS — class orqali stil.',
    whyChosen: [
      'Komponent yonida CSS fayl ochish kamayadi.',
      'Design token lar (rang, spacing) bir xil qoladi.',
      'Purge — faqat ishlatilgan class lar build ga kiradi.',
    ],
    howItWorks: [
      'className="flex gap-4 p-6" — to\'g\'ridan-to\'g\'ri JSX da.',
      'tailwind.config.js — content yo\'llari, theme kengaytirish.',
      'PostCSS orqali build vaqtida CSS generatsiya.',
    ],
    usedIn: 'tailwind.config.js, barcha komponent className lari',
    demo: null,
  },
  {
    id: 'eslint',
    name: 'eslint',
    category: 'quality',
    summary: 'Kod uslubi va xato qoidalarini avtomatik tekshirish.',
    whyChosen: [
      'Bir xil kod uslubi jamoa bo\'ylab.',
      'Potensial xatolar (unused vars, noto\'g\'ri import) CI da ushlanadi.',
    ],
    howItWorks: [
      'npm run lint — butun src ni skanerlaydi.',
      'eslint.config.js — qoidalar to\'plami.',
    ],
    usedIn: 'eslint.config.js, npm run lint',
    demo: null,
  },
  {
    id: 'eslint-boundaries',
    name: 'eslint-plugin-boundaries',
    category: 'quality',
    summary: 'FSD qatlamlari orasida noto\'g\'ri importni bloklaydi.',
    whyChosen: [
      'features → pages import qilmasin — arxitektura buzilmaydi.',
      'README dagi import qoidasi avtomatik majburiy bo\'ladi.',
    ],
    howItWorks: [
      'Har papka (app, pages, features...) element sifatida belgilanadi.',
      'Faqat ruxsat etilgan yo\'nalishdagi import linter xato beradi.',
    ],
    usedIn: 'eslint.boundaries.example.js',
    demo: null,
  },
  {
    id: 'shared-button',
    name: 'shared/ui/Button',
    category: 'runtime',
    summary: 'Loyiha ichidagi dizayn tizimi tugmasi — paket emas, namuna komponent.',
    whyChosen: [
      'Barcha tugmalar bir xil ko\'rinish va xatti-harakat.',
      'variant (primary/secondary) — tez o\'zgartirish.',
      'Biznes logikasi yo\'q — faqat UI primitiv.',
    ],
    howItWorks: [
      'variant="primary" → ko\'k fon, oq matn.',
      'variant="secondary" → kulrang fon.',
      'cn() yordamida qo\'shimcha className birlashtiriladi.',
      'onClick bosilganda siz bergan handler ishlaydi — quyida sinab ko\'ring.',
    ],
    usedIn: 'src/shared/ui/Button.tsx, LoginPage, LandingPage',
    demo: 'button',
  },
];
