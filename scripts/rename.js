const fs = require('fs');
const path = require('path');
const env = process.env.VERCEL_ENV;

const oldPath = path.join(__dirname, '../src/_middleware.ts');
const newPath = path.join(__dirname, '../src/middleware.ts');

console.log('Vercel build env: ', env);

if (env === 'production') {
  try {
    fs.renameSync(oldPath, newPath);
    console.log('rename middleware successful');
  } catch (error) {
    console.error(error);
    console.log('rename middleware failed');
  }
}
