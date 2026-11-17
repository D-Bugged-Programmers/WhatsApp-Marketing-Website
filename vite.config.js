import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The lazy-loaded 3D hero chunk (three.js) is intentionally large.
  build: { chunkSizeWarningLimit: 1000 },
})
