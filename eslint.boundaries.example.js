// eslint.boundaries.example.js
// ⭐ Bu konfiguratsiya import yo'nalishini ROBOT bilan majburlaydi.
// "Spaghetti" bog'lanishlar fizik jihatdan imkonsiz bo'ladi.
//
// O'rnatish: npm i -D eslint-plugin-boundaries

import boundaries from 'eslint-plugin-boundaries';

export default [
  {
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      // 1) Import faqat PASTGA: app -> pages -> widgets -> features -> entities -> shared
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'app',      allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
          { from: 'pages',    allow: ['widgets', 'features', 'entities', 'shared'] },
          { from: 'widgets',  allow: ['features', 'entities', 'shared'] },
          { from: 'features', allow: ['entities', 'shared'] },
          { from: 'entities', allow: ['shared'] },
          { from: 'shared',   allow: ['shared'] },
        ],
      }],
      // 2) Feature ichki fayllariga to'g'ridan-to'g'ri kirish taqiqlanadi — faqat index.ts orqali
      'boundaries/no-private': ['error', { allowUncles: false }],
    },
  },
  // 3) HTTP klientni faqat api/ qatlami import qila oladi
  {
    files: ['src/**/*'],
    ignores: ['src/**/api/**', 'src/shared/api/**'],
    rules: {
      'no-restricted-imports': ['error', {
        paths: [{
          name: '@/shared/api/httpClient',
          message: 'API ga faqat api/ qatlami (repository) orqali murojaat qiling.',
        }],
      }],
    },
  },
];
