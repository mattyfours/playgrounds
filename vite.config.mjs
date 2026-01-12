import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import preact from '@preact/preset-vite';

export default defineConfig({
  logLevel: 'silent',
  build: {
    rollupOptions: {
      input: {
        app: 'index.html',
      },
    },
  },
  server: {
    port: 3030,
    hmr: true,
    watch: {
      include: ['**/*.{js,ts,jsx,tsx,liquid,css}', 'core/_entry.ts', 'playgrounds/**/*']
    }
  },
  plugins: [
    tailwindcss(),
    preact()
  ]
})
