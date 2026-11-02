const fs = require('fs');
const path = require('path');

const root = 'C:/Users/X/Documents/Ashara-ERP';
const nm = path.join(root, 'node_modules');

const versions = {};
for (const name of fs.readdirSync(nm)) {
  if (name.startsWith('.')) continue;
  const pkgPath = path.join(nm, name, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    versions[name] = pkg.version;
  } catch {
    /* ignore */
  }
}

const sorted = Object.fromEntries(Object.keys(versions).sort().map((k) => [k, `^${versions[k]}`]));

const pkg = {
  private: true,
  type: 'module',
  name: 'ashara-erp',
  version: '1.0.0',
  description: 'ASHARA Atelier ERP — Filament asset build (Vite + Tailwind).',
  scripts: {
    dev: 'vite',
    build: 'vite build',
  },
  devDependencies: sorted,
};

fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkg, null, 4) + '\n');
console.log('wrote package.json with', Object.keys(sorted).length, 'devDependencies');
