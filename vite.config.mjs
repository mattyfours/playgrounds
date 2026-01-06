// vite.config.js

import { defineConfig } from 'vite'

export default defineConfig({
  logLevel: 'silent',
  appType: 'custom',
  server: {
    port: 3030,
    hmr: true,
    watch: {
      include: ['**/*.{js,ts,jsx,tsx}', '_entry.ts']
    }
  },
  optimizeDeps: {
    include: ['lit']
  },
  plugins: [
    {
      name: 'custom-html-template',
      configureServer (server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '') {
            res.setHeader('Content-Type', 'text/html')
            res.end(`
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Playgrounds</title>
                </head>
                <body>
                  <app></app>
                  <script type="module" src="_entry.ts"></script>
                </body>
              </html>
            `)
          } else {
            next()
          }
        })
      }
    }
  ]
})
