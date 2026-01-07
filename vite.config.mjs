import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  logLevel: 'silent',
  server: {
    port: 3030,
    hmr: true,
    watch: {
      include: ['**/*.{js,ts,jsx,tsx,liquid,css}', '_entry.ts', 'playgrounds/**/*']
    }
  },
  plugins: [
    tailwindcss()
  ]
})
