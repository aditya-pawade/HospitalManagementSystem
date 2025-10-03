#!/bin/bash
set -e

echo "🚀 Starting HMS Frontend Build..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the frontend directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci
fi

# Run Vite build using Node.js API directly
echo "🔨 Building with Vite..."
node -e "
const { build } = require('vite');
(async () => {
  try {
    await build({
      mode: 'production',
      logLevel: 'info'
    });
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
})();
"

echo "✨ HMS Frontend build complete!"