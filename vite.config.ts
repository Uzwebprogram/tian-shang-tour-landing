import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { telegramContactPlugin } from './plugins/telegramContact';

// Path alias: @/ -> src/  (TypeScript paths bilan mos)
export default defineConfig({
  plugins: [react(), telegramContactPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
