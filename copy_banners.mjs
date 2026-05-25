import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\kajma\\.gemini\\antigravity-ide\\brain\\5d5d7da9-c64c-48ee-a682-11c849c0e985';
const destDir = 'C:\\Users\\kajma\\Documents\\clonme\\frontend\\src\\assets\\banners';

const files = [
  { src: 'banner_girls_1_1779724295898.png', dest: 'new_banner_1.png' },
  { src: 'banner_girls_2_1779724308208.png', dest: 'new_banner_2.png' },
  { src: 'banner_girls_3_1779724320371.png', dest: 'new_banner_3.png' }
];

for (const file of files) {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Error copying ${file.src}:`, err);
  }
}
