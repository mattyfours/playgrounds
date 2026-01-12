/** @type {import('tailwindcss').Config} */
import fs from 'fs'
import path from 'path'

function getLiquidContent() {
  const playgroundsDir = './playgrounds'
  const liquidFiles = []
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walkDir(fullPath)
      } else if (file.endsWith('.liquid')) {
        liquidFiles.push(fullPath)
      }
    })
  }
  
  walkDir(playgroundsDir)
  return liquidFiles
}

export default {
  content: [
    './core/**/*.{html,js,ts,jsx,tsx}',
    './playgrounds/**/*.{html,js,ts,jsx,tsx}',
    ...getLiquidContent(),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
