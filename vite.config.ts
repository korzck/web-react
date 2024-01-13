import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: { port: 3000 },
  base: "https://github.com/korzck/web-react",
  plugins: [react()],
})