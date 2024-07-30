import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base:
    process.env.NODE_ENV === 'production'
      ? '/leetcode-stats/'
      : undefined,
  server: {
    port: 8080,
    host: true,
  },
  optimizeDeps: {
    include: ['leetcode-stats'],
  },
  build: {
    outDir: 'build',
    commonjsOptions: {
      include: [/leetcode-stats/],
    },
  },
});
