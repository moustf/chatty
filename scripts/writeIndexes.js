const { readdirSync, writeFileSync } = require('fs');
const { join } = require('path');

const dirConst = '--dir=';
const filterConst = '--filter=';

const directories = process.argv
  .find((e) => e.startsWith(dirConst))
  .replace(dirConst, '')
  .split(',');

const filterNames = (process.argv.find((e) => e.startsWith(filterConst)) ?? '')
  .replace(filterConst, '')
  .split(',');

const fullDirectories = directories.map((dir) => join(process.cwd(), dir));

const writeIndexForDirectory = (dir) => {
  const directoryFiles = readdirSync(dir);
  const lines = directoryFiles
    .filter((e) => !filterNames.includes(e))
    .filter((e) => e !== 'index.ts')
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((e) => e.split('.ts')[0])
    .map((e) => `export * from './${e}';`);

  const fileContent = [...lines, ''].join('\n');
  writeFileSync(`${dir}/index.ts`, fileContent);
};

fullDirectories.forEach(writeIndexForDirectory);

// eslint-disable-next-line no-console
console.log('Rewrote exports in', directories.join(', '));
