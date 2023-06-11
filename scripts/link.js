import { symlink } from 'node:fs';
import { fileURLToPath } from 'url';

const path = fileURLToPath(new URL('../src', import.meta.url));

symlink(path, process.env.EXTENSION_PATH, 'junction', (err) => {
  if (err) throw err;
  console.log('link created');
});
