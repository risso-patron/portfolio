// Estructura común de todas las páginas: <head>, cabecera, pie y scripts.
// Recibe el contexto de la página (ctx) que arma scripts/build.js.

import { iconSprite, icon } from './icons.js';
import { esc } from './html.js';

const PHONE = '50764560263';
const EMAIL = 'luisrissopa@gmail.com';
const SOCIAL = {
    github: 'https://github.com/risso-patron',
    linkedin: 'https://www.linkedin.com/in/jorge-luis-risso-/',
    instagram: 'https://www.instagram.com/luis.risso.patron/',
};

export const contactLinks = (t) => ({
    whatsapp: `https://wa.me/${PHONE}?text=${encodeURIComponent(t.whatsappText)}`,
    email: `mailto:${EMAIL}`,
    ...SOCIAL,
});

function head(ctx) {
    const { t, page, alternates, canonical, siteUrl } = ctx;
    const ogImage = `${siteUrl}/assets/images/jorge_luis_hero.webp`;
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Jorge Luis Risso Patrón',
        jobTitle: t.hero.role.split(' · ')[0],
        url: `${siteUrl}/`,
        image: ogImage,
        email: `mailto:${EMAIL}`,
        address: { '@type': 'PostalAddress', addressCountry: 'PA' },
        sameAs: Object.values(SOCIAL),
        knowsAbout: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro', 'Supabase', 'PostgreSQL'],
    };

    return `<!DOCTYPE html>
<html lang="${t.lang}" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0a0e17">
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}">
    <meta name="author" content="Jorge Luis Risso Patrón">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <meta name="google-site-verification" content="gN3B9rhW-jxBQIzA9DGOzrHoIPNMgBr0gpTwKtmQOp4">

    <link rel="canonical" href="${canonical}">
${alternates.map((a) => `    <link rel="alternate" hreflang="${a.lang}" href="${a.href}">`).join('\n')}
    <link rel="alternate" hreflang="x-default" href="${alternates.find((a) => a.lang === 'es').href}">

    <meta property="og:type" content="${page.ogType}">
    <meta property="og:site_name" content="Jorge Luis Risso Patrón">
    <meta property="og:locale" content="${t.ogLocale}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${esc(page.title)}">
    <meta property="og:description" content="${esc(page.description)}">
    <meta property="og:image" content="${ogImage}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(page.title)}">
    <meta name="twitter:description" content="${esc(page.description)}">
    <meta name="twitter:image" content="${ogImage}">

    <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
    <link rel="manifest" href="/assets/icons/site.webmanifest">

    <link rel="preload" href="/assets/fonts/fraunces-latin-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/assets/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="/assets/css/main.css?v=${ctx.assetVersion}">

    <script>
        // Antes de pintar: aplica el tema guardado (oscuro por defecto) para evitar parpadeo.
        (function () {
            try {
                var saved = localStorage.getItem('theme');
                if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
            } catch (e) {}
            document.documentElement.classList.add('js');
        })();
    </script>
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`;
}

function header(ctx) {
    const { t, url, other } = ctx;
    const home = url('home');
    const nav = [
        [t.ui.nav.work, ctx.section('work')],
        [t.ui.nav.about, ctx.section('about')],
        [t.ui.nav.cv, '/jorgeluis_CV/'],
        [t.ui.nav.contact, ctx.section('contact')],
    ];

    return `
<body>
${iconSprite()}
    <a class="skip-link" href="#main">${t.ui.skip}</a>
    <header class="site-header" id="top">
        <div class="wrap header-inner">
            <a class="brand" href="${home}" aria-label="${esc(t.ui.homeLink)}">
                <img src="/assets/images/brand/rp-logo-96.webp" srcset="/assets/images/brand/rp-logo-96.webp 1x, /assets/images/brand/rp-logo-192.webp 2x" width="53" height="48" alt="">
            </a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${esc(t.ui.menu)}">
                ${icon('menu')}${icon('close', 'icon icon-close')}
            </button>
            <nav class="site-nav" id="site-nav" aria-label="${esc(t.ui.navLabel)}">
                <ul role="list">
${nav.map(([label, href]) => `                    <li><a href="${href}">${label}</a></li>`).join('\n')}
                </ul>
                <div class="nav-tools">
                    <a class="lang-switch" href="${other.href}" hreflang="${other.lang}" lang="${other.lang}" aria-label="${esc(t.ui.langSwitch.aria)}">${t.ui.langSwitch.label}</a>
                    <button class="theme-toggle" type="button" aria-label="${esc(t.ui.theme)}">
                        ${icon('sun', 'icon icon-sun')}${icon('moon', 'icon icon-moon')}
                    </button>
                </div>
            </nav>
        </div>
    </header>
`;
}

function footer(ctx) {
    const { t } = ctx;
    const links = contactLinks(t);
    const ext = `target="_blank" rel="noopener noreferrer"`;

    return `
    <footer class="site-footer">
        <div class="wrap footer-grid">
            <div class="footer-brand">
                <img src="/assets/images/brand/rp-logo-96.webp" width="53" height="48" alt="" loading="lazy">
                <p>${t.ui.footerTagline}</p>
            </div>
            <nav aria-label="${esc(t.ui.footerNav)}">
                <h2 class="footer-title">${t.ui.footerNav}</h2>
                <ul role="list">
                    <li><a href="${ctx.section('work')}">${t.ui.nav.work}</a></li>
                    <li><a href="${ctx.section('about')}">${t.ui.nav.about}</a></li>
                    <li><a href="${ctx.section('contact')}">${t.ui.nav.contact}</a></li>
                    <li><a href="/jorgeluis_CV/">${t.ui.cvLink}</a></li>
                </ul>
            </nav>
            <div>
                <h2 class="footer-title">${t.ui.footerSocial}</h2>
                <ul role="list">
                    <li><a href="${links.github}" ${ext}>GitHub</a></li>
                    <li><a href="${links.linkedin}" ${ext}>LinkedIn</a></li>
                    <li><a href="${links.instagram}" ${ext}>Instagram</a></li>
                    <li><a href="${links.whatsapp}" ${ext}>WhatsApp</a></li>
                </ul>
            </div>
        </div>
        <div class="wrap footer-bottom">
            <p>© ${ctx.year} Jorge Luis Risso Patrón. ${t.ui.rights}</p>
            <p>${t.ui.madeIn}</p>
        </div>
    </footer>

    <a class="whatsapp-float" href="${links.whatsapp}" ${ext} aria-label="${esc(t.ui.whatsappFloat)}">${icon('whatsapp')}</a>
`;
}

function lightbox(t) {
    return `
    <dialog class="lightbox" aria-label="${esc(t.ui.gallery.dialog)}" data-counter="${esc(t.ui.gallery.counter)}">
        <div class="lightbox-frame">
            <img class="lightbox-img" src="data:," alt="">
            <p class="lightbox-counter" aria-live="polite"></p>
        </div>
        <button class="lightbox-btn lightbox-prev" type="button" aria-label="${esc(t.ui.gallery.prev)}">${icon('chevron-left')}</button>
        <button class="lightbox-btn lightbox-next" type="button" aria-label="${esc(t.ui.gallery.next)}">${icon('chevron-right')}</button>
        <button class="lightbox-btn lightbox-close" type="button" aria-label="${esc(t.ui.gallery.close)}">${icon('close')}</button>
    </dialog>`;
}

/** Página completa: head + header + <main> + footer. */
export function layout(ctx, main, { withLightbox = false } = {}) {
    return `${head(ctx)}${header(ctx)}
    <main id="main" tabindex="-1">
${main}
    </main>
${footer(ctx)}${withLightbox ? lightbox(ctx.t) : ''}
    <script src="/assets/js/main.js?v=${ctx.assetVersion}" defer></script>
</body>
</html>
`;
}
