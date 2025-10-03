#!/usr/bin/env node

import { build } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function buildProject() {
  try {
    console.log('Starting Vite build...')
    
    await build({
      root: __dirname,
      mode: 'production',
      logLevel: 'info',
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
              utils: ['axios', 'clsx', 'date-fns']
            }
          }
        }
      }
    })
    
    console.log('✅ Build completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

buildProject()