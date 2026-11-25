// Plantilla de página de caso. El contenido vive en src/i18n/<lang>.js → cases.<id>.

import { layout } from '../components/layout.js';
import { icon } from '../components/icons.js';
import { esc } from '../components/html.js';
import { flowDiagram, externalLink } from '../components/work.js';

/** Orden de lectura de los casos: el último enlaza de vuelta al primero. */
const CASE_ORDER = ['spaceos', 'saldo', 'comparo360'];

export function meta(ctx) {
    return { ...ctx.t.cases[ctx.route.id].meta, ogType: 'article' };
}

export function render(ctx) {
    const { t, url, route } = ctx;
    const c = t.cases[route.id];
    const nextId = CASE_ORDER[(CASE_ORDER.indexOf(route.id) + 1) % CASE_ORDER.length];
    const next = t.cases[nextId];

    const images = (c.images || [])
        .map(
            (img) => `
                <figure class="case-shot${img.narrow ? ' case-shot-narrow' : ''}">
                    <img src="/assets/images/projects/${img.src}" alt="${esc(img.alt)}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async">
                </figure>`,
        )
        .join('');

    const links = c.links.length
        ? `<p class="case-links">${c.links.map((l) => externalLink(l, ctx, 'btn')).join(' ')}</p>`
        : `<p class="case-links note">${c.privateNote}</p>`;

    const main = `
        <article class="case">
            <header class="wrap case-head">
                <p><a class="back-link" href="${ctx.section('work')}">${icon('arrow-left')}${t.ui.backToWork}</a></p>
                <p class="kicker">${c.kicker}</p>
                <h1 class="display">${c.title}</h1>
                <p class="lead measure">${c.summary}</p>
                <dl class="case-facts" aria-label="${esc(t.ui.caseFacts)}">
${c.facts.map(([k, v]) => `                    <div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
                </dl>
                ${links}
            </header>
            ${c.showFlow ? `<div class="wrap">${flowDiagram(t)}</div>` : ''}
            ${images ? `<div class="wrap case-gallery">${images}</div>` : ''}
            <div class="wrap case-body">
${c.sections
    .map(
        (s) => `                <section class="case-section">
                    <h2 class="h3">${s.title}</h2>
                    ${s.html}
                </section>`,
    )
    .join('\n')}
            </div>
            <nav class="wrap case-next" aria-label="${esc(t.ui.nextCase)}">
                <p class="kicker">${t.ui.nextCase}</p>
                <a class="case-next-link" href="${url(nextId)}">
                    <span class="h2">${next.title}</span>
                    <span class="case-next-summary">${next.summary}</span>
                    ${icon('arrow-right')}
                </a>
            </nav>
        </article>`;

    return layout(ctx, main);
}
