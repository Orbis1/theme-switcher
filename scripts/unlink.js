import { unlink } from 'node:fs';

// Assuming that 'path/file.txt' is a regular file.
unlink(process.env.EXTENSION_PATH, (err) => {
  if (err) throw err;
  console.log(`${process.env.EXTENSION_PATH} was deleted`);
});
