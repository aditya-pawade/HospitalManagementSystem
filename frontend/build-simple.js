const { build } = require('vite');

(async () => {
  try {
    console.log('🚀 Starting build with Node.js API...');
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