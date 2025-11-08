// features/support/artifacts.js
const fs = require('fs');
const path = require('path');

const artifactsDir = path.join(__dirname, '../../artifacts');

try {
  if (fs.existsSync(artifactsDir)) {
    fs.rmSync(artifactsDir, { recursive: true, force: true });
    console.log('🧹 Old artifacts deleted successfully.');
  }
  fs.mkdirSync(artifactsDir, { recursive: true });
  console.log('📁 Fresh artifacts folder created.');
} catch (error) {
  console.error('⚠️ Error cleaning artifacts folder:', error.message);
}

console.log('✨ Artifacts ready for new test run!');
