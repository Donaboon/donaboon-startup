import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'donaboon-startup.js',
        chunkFileNames: 'chunk-[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  plugins: [react(), svgr()],
});
