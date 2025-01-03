import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false, // ReactComponent 사용 가능하도록 설정
    }),
  ],
  server: {
    port: 3000,
  },
});
