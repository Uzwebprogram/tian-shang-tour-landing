/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0D6C75',
          mint: '#68C7CB',
          sage: '#79AFAF',
          ink: '#050505',
          dark: '#111111',
          card: '#1A1A1A',
          line: '#333333',
          muted: '#A3A3A3',
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          '"Plus Jakarta Sans"',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        page: '80rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
};
