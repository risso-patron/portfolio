// Configuración global del sitio: dominio, idiomas y rutas.
// Una ruta se declara una sola vez aquí; el build genera ES y EN y enlaza
// cada página con su equivalente (hreflang) a partir de esta tabla.

export const SITE_URL = 'https://www.risso-patron.com';

export const LOCALES = ['es', 'en'];

/**
 * id: identificador interno de la página.
 * template: módulo en src/pages que la renderiza.
 * paths: ruta pública por idioma (sin extensión; cleanUrls en Vercel).
 * out: archivo generado en dist/ por idioma.
 */
export const ROUTES = [
    {
        id: 'home',
        template: 'home',
        paths: { es: '/', en: '/en' },
        out: { es: 'index.html', en: 'en.html' },
        priority: '1.0',
    },
    {
        id: 'spaceos',
        template: 'case',
        paths: { es: '/trabajo/spaceos', en: '/en/work/spaceos' },
        out: { es: 'trabajo/spaceos.html', en: 'en/work/spaceos.html' },
        priority: '0.9',
    },
    {
        id: 'saldo',
        template: 'case',
        paths: { es: '/trabajo/saldo', en: '/en/work/saldo' },
        out: { es: 'trabajo/saldo.html', en: 'en/work/saldo.html' },
        priority: '0.8',
    },
    {
        id: 'comparo360',
        template: 'case',
        paths: { es: '/trabajo/comparo360', en: '/en/work/comparo360' },
        out: { es: 'trabajo/comparo360.html', en: 'en/work/comparo360.html' },
        priority: '0.8',
    },
];

/** Rutas estáticas que existen fuera del generador y van al sitemap. */
export const STATIC_SITEMAP_PATHS = ['/jorgeluis_CV/', '/weather-app', '/pomodoro-timer'];

/**
 * Lista explícita de lo que se publica además de las páginas generadas.
 * Todo lo que no esté aquí (clients/, openspec/, test-cards.html, budget-app/,
 * archivos internos) queda fuera de producción.
 */
export const PUBLIC_COPY = [
    'assets/css',
    'assets/js',
    'assets/fonts',
    'assets/icons',
    'assets/images/brand',
    'assets/images/jorge_luis_about.webp',
    'assets/images/projects/saldo',
    'assets/images/projects/comparo360',
    'assets/images/projects/somosproperties.com',
    'assets/images/projects/homepowerpty.com',
    'assets/images/projects/hostpropanama.com',
    'assets/images/projects/provivirpanama.com',
    'assets/images/jorge_luis_hero.webp',
    'jorgeluis_CV/index.html',
    'jorgeluis_CV/styles.css',
    'assets/images/jorge-luis-perfil-v2.webp',
    'weather-app',
    'pomodoro-timer',
    'robots.txt',
];

/** Dentro de PUBLIC_COPY, archivos que no se publican (originales, docs, ejemplos). */
export const PUBLIC_EXCLUDE = [
    /\.md$/,
    /\.example\.js$/,
    /weather-app[\\/](config|pexels-config)\.js$/,
    /assets[\\/]images[\\/]projects[\\/].*\.png$/,
    /assets[\\/]icons[\\/](developer-laptop|growth-rocket|sun|moon|android-chrome-\d+x\d+|apple-touch-icon)\.webp$/,
];
