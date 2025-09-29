import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Railway deployment base
  build: {
    outDir: "dist", // Railway build output
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
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
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
