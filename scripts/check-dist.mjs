import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const base = normalizeBase(readBase(process.argv.slice(2)));
const basePrefix = base === '/' ? '' : base.replace(/\/$/, '');

const required = [
  'index.html',
  'uutiset/index.html',
  'asukastiedotteet/index.html',
  'asuminen/index.html',
  'asuminen/pesutupa/index.html',
  'historia/index.html',
  'kylakartta/index.html',
  'tietoa/index.html',
  'yhteystiedot/index.html',
  'uutiset/tiedotteet-sahkoisesti/index.html',
  'favicon.svg',
  'media/kevat.jpg',
  'media/kylan-kartta.pdf',
];

// Old Kotisivukone forms were copied as links. They are not pages of this site.
const allowedMissing = new Set(['/lomake.html']);

const failures = [];

for (const relative of required) {
  const file = path.join(dist, relative);
  try {
    const info = await stat(file);
    if (relative.endsWith('.jpg') && info.size < 10_000) {
      failures.push(`${relative} is only ${info.size} bytes`);
    }
  } catch {
    failures.push(`missing ${relative}`);
  }
}

const htmlFiles = await walk(dist, '.html');
let cssLinks = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const where = path.relative(dist, file);

  if (html.includes('Luonnos toimikunnalle') || html.includes('Ei vielä julkinen sivusto')) {
    failures.push(`${where} still contains the draft banner`);
  }

  if (basePrefix && html.includes('"/kannelkylaf')) {
    failures.push(`${where} joined the base path without a slash`);
  }
  if (!basePrefix && html.includes('"/kannelkyla')) {
    failures.push(`${where} has a Pages prefix in a root build`);
  }

  for (const url of attributes(html)) {
    if (!url || url.startsWith('#') || url.startsWith('//')) continue;
    if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(url)) continue;
    if (!url.startsWith('/')) {
      failures.push(`${where} has a relative link ${url}`);
      continue;
    }

    const bare = url.split('#')[0].split('?')[0];
    let sitePath = bare;
    if (basePrefix) {
      if (bare === basePrefix) sitePath = '/';
      else if (bare.startsWith(`${basePrefix}/`)) sitePath = bare.slice(basePrefix.length);
      else {
        failures.push(`${where} link is outside the base: ${url}`);
        continue;
      }
    }

    if (allowedMissing.has(sitePath)) continue;
    if (sitePath.endsWith('.css')) cssLinks += 1;

    const target = sitePathToFile(sitePath);
    try {
      await stat(path.join(dist, target));
    } catch {
      failures.push(`${where} -> ${url} (expected dist/${target})`);
    }
  }
}

const home = await readFile(path.join(dist, 'index.html'), 'utf8');
const contacts = await readFile(path.join(dist, 'yhteystiedot/index.html'), 'utf8');
const history = await readFile(path.join(dist, 'historia/index.html'), 'utf8');
if (!home.includes('Tervetuloa Kannelkylään')) failures.push('home is missing the welcome heading');
if (!contacts.includes('Tanja Partanen')) failures.push('contacts page is missing the manager');
if (!history.includes('Asuntotuotantotoimiston')) failures.push('history page is missing its opening text');
if (cssLinks === 0) failures.push('no stylesheet link in the built pages');

if (failures.length > 0) {
  console.error(`dist check failed for base ${base}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`dist ok (${htmlFiles.length} pages, base ${base})`);

function readBase(argv) {
  const index = argv.indexOf('--base');
  if (index === -1) return '/';
  const value = argv[index + 1];
  if (!value) throw new Error('--base needs a value');
  return value;
}

function normalizeBase(value) {
  if (!value || value === '/') return '/';
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function sitePathToFile(sitePath) {
  if (sitePath === '/' || sitePath === '') return 'index.html';
  const relative = sitePath.replace(/^\/+/, '');
  if (relative.endsWith('/')) return `${relative}index.html`;
  if (/\.[a-z0-9]+$/i.test(relative)) return relative;
  return `${relative}/index.html`;
}

function attributes(html) {
  const found = [];
  const pattern = /(?:href|src|data-lightbox)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  for (const match of html.matchAll(pattern)) found.push(match[1] ?? match[2] ?? '');
  return found;
}

async function walk(directory, extension) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full, extension)));
    else if (entry.name.endsWith(extension)) found.push(full);
  }
  return found;
}
