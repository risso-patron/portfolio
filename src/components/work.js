// Piezas de presentación de trabajo reutilizadas por el inicio y los casos.

import { icon } from './icons.js';
import { esc, EXT } from './html.js';

/**
 * Diagrama del recorrido comercial de SpaceOS en HTML (no imagen):
 * se lee con lector de pantalla, se adapta al ancho y hereda el tema.
 */
export function flowDiagram(t) {
    const f = t.flow;
    return `
            <figure class="flow" aria-labelledby="flow-title">
                <figcaption id="flow-title" class="flow-title">${f.title}</figcaption>
                <ol class="flow-steps" role="list">
${f.steps.map((s) => `                    <li>${s}</li>`).join('\n')}
                </ol>
                <ul class="flow-outputs" role="list">
${f.outputs.map((s) => `                    <li>${s}</li>`).join('\n')}
                </ul>
                <p class="flow-base">${f.base}</p>
            </figure>`;
}

/** Fila del índice de trabajo. Toda la fila es un único enlace. */
export function workRow(row, index, ctx) {
    const href = row.route ? ctx.url(row.route) : `#${ctx.t.ids[row.anchor]}`;
    const n = String(index + 1).padStart(2, '0');
    return `
                <li class="work-row">
                    <a href="${href}">
                        <span class="work-n" aria-hidden="true">${n}</span>
                        <span class="work-name">${row.name}</span>
                        <span class="work-kind">${row.kind}</span>
                        <span class="work-stack">${row.stack}</span>
                        <span class="work-year">${row.year}</span>
                        <span class="work-status">${row.status}</span>
                        ${icon('arrow-right', 'icon work-arrow')}
                    </a>
                </li>`;
}

/** Tarjeta compacta de un sitio del empleo anterior, con galería accesible. */
export function siteItem(item, ctx) {
    const label = `${ctx.t.ui.gallery.open} ${item.name}`;
    return `
                <li class="site-item">
                    <button class="site-shot" type="button" data-gallery="${item.gallery}" aria-label="${esc(label)}">
                        <img src="/assets/images/projects/${item.image}" alt="" width="640" height="400" loading="lazy" decoding="async">
                        <span class="site-shot-hint">${icon('expand')}</span>
                    </button>
                    <h4 class="site-name">${item.name}</h4>
                    <p class="site-stack">${item.stack}</p>
                    <p class="site-text">${item.text}</p>
                </li>`;
}

/** Enlace externo con aviso para lectores de pantalla. */
export function externalLink(link, ctx, className = 'text-link') {
    return `<a class="${className}" href="${link.href}" ${EXT}>${link.label}${icon('arrow-up-right')}<span class="visually-hidden"> ${ctx.t.ui.external}</span></a>`;
}
