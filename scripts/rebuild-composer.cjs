const fs = require('fs');
const path = require('path');

const root = 'C:/Users/X/Documents/Ashara-ERP';
const inst = JSON.parse(fs.readFileSync(path.join(root, 'vendor/composer/installed.json'), 'utf8'));
const devNames = new Set(inst['dev-package-names'] || []);

const prod = {};
const dev = {};
for (const pkg of inst.packages || []) {
  if (!pkg.name || !pkg.version) continue;
  const target = devNames.has(pkg.name) ? dev : prod;
  target[pkg.name] = pkg.version;
}

const sortObj = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));

// Inline plugin autoload maps so the app boots without relying on merge-plugin
// running (merge-plugin only merges during install/update).
const psr4 = {
  'App\\': 'app/',
  'Database\\Factories\\': 'database/factories/',
  'Database\\Seeders\\': 'database/seeders/',
};
const psr4Dev = { 'Tests\\': 'tests/' };
const files = [];

const pluginsRoot = path.join(root, 'plugins');
for (const group of fs.readdirSync(pluginsRoot)) {
  const groupDir = path.join(pluginsRoot, group);
  if (!fs.statSync(groupDir).isDirectory()) continue;
  for (const dir of fs.readdirSync(groupDir)) {
    const pluginDir = path.join(groupDir, dir);
    const pluginComposer = path.join(pluginDir, 'composer.json');
    if (!fs.existsSync(pluginComposer)) continue;
    const pc = JSON.parse(fs.readFileSync(pluginComposer, 'utf8'));
    const rel = `plugins/${group}/${dir}`;
    const map = (pc.autoload && pc.autoload['psr-4']) || {};
    for (const [ns, p] of Object.entries(map)) {
      psr4[ns] = `${rel}/${String(p).replace(/^\.\//, '')}`;
    }
    const devMap = (pc['autoload-dev'] && pc['autoload-dev']['psr-4']) || {};
    for (const [ns, p] of Object.entries(devMap)) {
      psr4Dev[ns] = `${rel}/${String(p).replace(/^\.\//, '')}`;
    }
    for (const f of (pc.autoload && pc.autoload.files) || []) {
      files.push(`${rel}/${String(f).replace(/^\.\//, '')}`);
    }
  }
}

const composer = {
  $schema: 'https://getcomposer.org/schema.json',
  name: 'ashara/erp',
  type: 'project',
  description: 'ASHARA Atelier ERP — Laravel + AureusERP (Webkul) application.',
  keywords: ['laravel', 'erp', 'aureuserp', 'atelier'],
  license: 'MIT',
  require: sortObj({ php: '^8.3', ...prod }),
  'require-dev': sortObj(dev),
  autoload: {
    'psr-4': Object.fromEntries(Object.keys(psr4).sort().map((k) => [k, psr4[k]])),
    ...(files.length ? { files: files } : {}),
  },
  'autoload-dev': {
    'psr-4': Object.fromEntries(Object.keys(psr4Dev).sort().map((k) => [k, psr4Dev[k]])),
  },
  scripts: {
    'post-autoload-dump': [],
    'post-update-cmd': ['@php artisan vendor:publish --tag=laravel-assets --ansi --force'],
    'post-root-package-install': ["@php -r \"file_exists('.env') || copy('.env.example', '.env');\""],
    'post-create-project-cmd': [
      '@php artisan key:generate --ansi',
      '@php artisan migrate --graceful --ansi',
    ],
  },
  extra: {
    laravel: { 'dont-discover': [] },
    'merge-plugin': { include: ['plugins/*/composer.json'] },
  },
  config: {
    'optimize-autoloader': true,
    'preferred-install': 'dist',
    'sort-packages': true,
    'allow-plugins': Object.fromEntries(
      (inst.packages || [])
        .filter((p) => p.type === 'composer-plugin' || p.type === 'composer-installer')
        .map((p) => [p.name, true])
    ),
  },
  'minimum-stability': 'stable',
  'prefer-stable': true,
};

fs.writeFileSync(path.join(root, 'composer.json'), JSON.stringify(composer, null, 4) + '\n');
console.log(
  'wrote composer.json:',
  Object.keys(prod).length,
  'require,',
  Object.keys(dev).length,
  'require-dev,',
  Object.keys(psr4).length,
  'psr-4,',
  files.length,
  'autoload files'
);
