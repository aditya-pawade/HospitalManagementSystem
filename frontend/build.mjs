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
      css: {
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer')
          ]
        }
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        minify: 'esbuild',
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
    console.log('🔄 Trying fallback build without PostCSS...')
    
    try {
      await build({
        root: __dirname,
        mode: 'production',
        logLevel: 'info',
        css: {
          postcss: false
        },
        build: {
          outDir: 'dist',
          emptyOutDir: true,
          sourcemap: false,
          minify: 'esbuild'
        }
      })
      console.log('✅ Fallback build completed successfully!')
      process.exit(0)
    } catch (fallbackError) {
      console.error('❌ Fallback build also failed:', fallbackError)
      process.exit(1)
    }
  }
}

buildProject()