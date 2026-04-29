// scripts/build.js — ensambla src/ partials en index.html
// Uso: npm run build
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const PARTIALS = [
    'src/_head.html',
    'src/_navbar.html',
    'src/_hero.html',
    'src/_about.html',
    'src/_work.html',
    'src/_arsenal.html',
    'src/_contact.html',
    'src/_footer.html',
];

for (const p of PARTIALS) {
    try {
        readFileSync(join(ROOT, p));
    } catch {
        console.error(`ERROR: partial no encontrado — ${p}`);
        process.exit(1);
    }
}

const html = PARTIALS
    .map(p => readFileSync(join(ROOT, p), 'utf8'))
    .join('');

writeFileSync(join(ROOT, 'index.html'), html, 'utf8');
console.log(`✓ index.html ensamblado desde ${PARTIALS.length} partials`);
