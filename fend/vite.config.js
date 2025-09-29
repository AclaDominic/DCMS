import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Vercel deployment base
  build: {
    outDir: "dist", // Vercel standard output directory
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: false,        // important: don't WS proxy to Laravel API
      }
    }
  },
  define: {
    __API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL || 'http://localhost:8000/api'),
  }

  //0000000000000000
  // server: {
  //   host: true, // optional; helps when testing
  // },

  // server: {
  //   host: '127.0.0.1',
  //   port: 5173,
  // },
});
