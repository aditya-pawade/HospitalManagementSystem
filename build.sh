#!/bin/bash
set -e

echo "🚀 Starting HMS Frontend Build..."

# Navigate to frontend directory
cd frontend

# Clean install
echo "📦 Installing dependencies..."
rm -rf node_modules package-lock.json
npm install

# Build with npx to ensure proper binary access
echo "🔨 Building with Vite..."
npx vite build

echo "✅ Build completed successfully!"