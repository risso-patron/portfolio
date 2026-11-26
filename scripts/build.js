// scripts/build.js — genera el sitio estático en dist/.
// Uso: npm run build
//
// 1. Verifica que es.js y en.js tengan las mismas claves.
// 2. Renderiza cada ruta de src/site.config.js en ambos idiomas.
// 3. Copia solo los archivos públicos declarados (PUBLIC_COPY).
// 4. Genera sitemap.xml con hreflang.
// 5. Valida enlaces internos, anclas y marcadores sin resolver. Falla si algo no cuadra.

import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { SITE_URL, LOCALES, ROUTES, STATIC_SITEMAP_PATHS, PUBLIC_COPY, PUBLIC_EXCLUDE } from '../src/site.config.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const errors = [];

// ---------- 1. Paridad de claves ES/EN ----------
const dictionaries = {};
for (const lang of LOCALES) {
    dictionaries[lang] = (await import(pathToFileURL(join(ROOT, 'src/i18n', `${lang}.js`)))).default;
}

function shape(value, prefix = '') {
    if (Array.isArray(value)) return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${prefix}[${i}]`))];
    if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => shape(v, prefix ? `${prefix}.${k}` : k));
    return [prefix];
}
const [base, ...others] = LOCALES;
const baseShape = new Set(shape(dictionaries[base]));
for (const lang of others) {
    const other = new Set(shape(dictionaries[lang]));
    for (const k of baseShape) if (!other.has(k)) errors.push(`[i18n] falta en ${lang}: ${k}`);
    for (const k of other) if (!baseShape.has(k)) errors.push(`[i18n] falta en ${base}: ${k}`);
}

// ---------- 2. Render ----------
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const assetVersion = createHash('sha256')
    .update(readFileSync(join(ROOT, 'assets/css/main.css')))
    .update(readFileSync(join(ROOT, 'assets/js/main.js')))
    .digest('hex')
    .slice(0, 10);

const routeById = Object.fromEntries(ROUTES.map((r) => [r.id, r]));
const templates = {};
for (const r of ROUTES) {
    templates[r.template] ??= await import(pathToFileURL(join(ROOT, 'src/pages', `${r.template}.js`)));
}

const pages = []; // { file, html, path }
for (const route of ROUTES) {
    for (const lang of LOCALES) {
        const t = dictionaries[lang];
        const url = (id) => {
            if (!routeById[id]) throw new Error(`Ruta desconocida: ${id}`);
            return routeById[id].paths[lang];
        };
        const home = url('home');
        const otherLang = LOCALES.find((l) => l !== lang);
        const ctx = {
            t,
            lang,
            route,
            url,
            year: new Date().getFullYear(),
            siteUrl: SITE_URL,
            assetVersion,
            canonical: SITE_URL + route.paths[lang],
            alternates: LOCALES.map((l) => ({ lang: l, href: SITE_URL + route.paths[l] })),
            other: { lang: otherLang, href: route.paths[otherLang] },
            section: (key) => `${home === '/' ? '/' : home}#${t.ids[key]}`,
        };
        const tpl = templates[route.template];
        ctx.page = tpl.meta(ctx);
        const html = tpl.render(ctx);
        const file = join(DIST, route.out[lang]);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html, 'utf8');
        pages.push({ file: route.out[lang], html, path: route.paths[lang] });
    }
}

// ---------- 3. Archivos públicos ----------
for (const entry of PUBLIC_COPY) {
    const src = join(ROOT, entry);
    if (!existsSync(src)) {
        errors.push(`[copy] no existe: ${entry}`);
        continue;
    }
    cpSync(src, join(DIST, entry), {
        recursive: true,
        filter: (p) => statSync(p).isDirectory() || !PUBLIC_EXCLUDE.some((re) => re.test(p)),
    });
}

// ---------- 4. Sitemap ----------
const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = ROUTES.flatMap((r) =>
    LOCALES.map(
        (lang) => `    <url>
        <loc>${SITE_URL}${r.paths[lang]}</loc>
        <lastmod>${today}</lastmod>
        <priority>${r.priority}</priority>
${LOCALES.map((l) => `        <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${r.paths[l]}"/>`).join('\n')}
    </url>`,
    ),
);
const staticEntries = STATIC_SITEMAP_PATHS.map(
    (p) => `    <url>
        <loc>${SITE_URL}${p}</loc>
        <lastmod>${today}</lastmod>
        <priority>0.5</priority>
    </url>`,
);
writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...sitemapEntries, ...staticEntries].join('\n')}
</urlset>
`,
    'utf8',
);

// ---------- 5. Validación ----------
/** Resuelve una ruta pública como lo hace Vercel con cleanUrls. */
function resolvePublic(pathname) {
    const clean = decodeURIComponent(pathname.split('?')[0]);
    const candidates = [clean, `${clean}.html`, join(clean, 'index.html')];
    return candidates.map((c) => join(DIST, c)).find((c) => existsSync(c) && statSync(c).isFile());
}
const idsIn = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const byPath = Object.fromEntries(pages.map((p) => [p.path, p]));

for (const page of pages) {
    if (/\bundefined\b|\{spaceos\}|\[object Object\]/.test(page.html)) errors.push(`[html] marcador sin resolver en ${page.file}`);
    const ownIds = idsIn(page.html);
    for (const [, attr, value] of page.html.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
        const urls = attr === 'srcset' ? value.split(',').map((s) => s.trim().split(/\s+/)[0]) : [value];
        for (const u of urls) {
            if (u.startsWith('#')) {
                if (u.length > 1 && !ownIds.has(u.slice(1))) errors.push(`[ancla] ${page.file}: ${u} no existe`);
                continue;
            }
            if (!u.startsWith('/')) continue; // externos, mailto, data:
            if (u.startsWith('/_vercel/')) continue; // rutas que inyecta Vercel en producción
            const [p, hash] = u.split('#');
            if (!resolvePublic(p)) errors.push(`[enlace] ${page.file}: ${u} no existe en dist/`);
            if (hash && byPath[p] && !idsIn(byPath[p].html).has(hash)) errors.push(`[ancla] ${page.file}: ${u} no existe`);
        }
    }
}

if (errors.length) {
    console.error(`✗ Build con ${errors.length} error(es):\n  ${errors.join('\n  ')}`);
    process.exit(1);
}
console.log(`✓ ${pages.length} páginas generadas en dist/ (${LOCALES.join(', ')}), sitemap y archivos públicos copiados`);
