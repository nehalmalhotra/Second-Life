const fs = require('fs');
const path = require('path');

const linkPath = path.join(__dirname, '..', 'public', 'shared-assets');
const targetPath = path.join(__dirname, '..', '..', 'assets');

// Check if target directory exists
if (!fs.existsSync(targetPath)) {
  console.warn(
    `[link-shared-assets] Warning: Target directory does not exist: ${targetPath}`
  );
  console.warn('[link-shared-assets] Skipping symlink creation.');
  process.exit(0);
}

// Check if symlink already exists
if (fs.existsSync(linkPath)) {
  const stat = fs.lstatSync(linkPath);
  if (stat.isSymbolicLink() || stat.isDirectory()) {
    console.log('[link-shared-assets] Symlink already exists, skipping.');
    process.exit(0);
  }
}

// Create symlink — use junction on Windows for cross-platform compatibility
const type = process.platform === 'win32' ? 'junction' : 'dir';

try {
  fs.symlinkSync(targetPath, linkPath, type);
  console.log(`[link-shared-assets] Created symlink: ${linkPath} → ${targetPath}`);
} catch (err) {
  console.error(`[link-shared-assets] Failed to create symlink: ${err.message}`);
  process.exit(1);
}
