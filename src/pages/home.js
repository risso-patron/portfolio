// Página de inicio (Propuesta B · evolución editorial).

import { layout, contactLinks } from '../components/layout.js';
import { icon } from '../components/icons.js';
import { esc, EXT } from '../components/html.js';
import { flowDiagram, workRow, siteItem } from '../components/work.js';

export function meta(ctx) {
    return { ...ctx.t.meta.home, ogType: 'profile' };
}

export function render(ctx) {
    const { t, url } = ctx;
    const links = contactLinks(t);
    const ids = t.ids;

    const hero = `
        <section class="hero" aria-labelledby="hero-title">
            <div class="wrap hero-grid">
                <div class="hero-text">
                    <p class="eyebrow">${t.hero.name}</p>
                    <p class="hero-role">${t.hero.role}</p>
                    <h1 id="hero-title" class="display">${t.hero.title}</h1>
                    <p class="lead">${t.hero.lead.replace('{spaceos}', url('spaceos'))}</p>
                    <p class="availability"><span class="dot" aria-hidden="true"></span>${t.hero.availability}</p>
                    <div class="actions">
                        <a class="btn btn-primary" href="#${ids.work}">${t.hero.ctaWork}${icon('arrow-right')}</a>
                        <a class="btn" href="${links.whatsapp}" ${EXT}>${icon('whatsapp')}${t.hero.ctaTalk}</a>
                        <a class="text-link" href="${links.email}">${icon('mail')}${t.hero.ctaMail}</a>
                    </div>
                </div>
                <figure class="hero-photo">
                    <img src="/assets/images/jorge_luis_hero.webp" alt="${esc(t.hero.photoAlt)}" width="1000" height="1200" fetchpriority="high" decoding="async">
                </figure>
            </div>
        </section>`;

    const work = `
        <section class="section" id="${ids.work}" aria-labelledby="work-title">
            <div class="wrap">
                <header class="section-head">
                    <p class="kicker">${t.work.kicker}</p>
                    <h2 id="work-title" class="h2">${t.work.title}</h2>
                </header>
                <div class="work-head" aria-hidden="true">
                    <span></span><span>${t.work.columns.name}</span><span>${t.work.columns.kind}</span><span></span><span>${t.work.columns.year}</span><span>${t.work.columns.status}</span><span></span>
                </div>
                <ol class="work-index" role="list">${t.work.rows.map((r, i) => workRow(r, i, ctx)).join('')}
                </ol>
                <dl class="work-more">
                    <div>
                        <dt>${t.work.inProgressLabel}</dt>
                        <dd>${t.work.inProgress}</dd>
                    </div>
                    <div>
                        <dt>${t.work.earlyLabel}</dt>
                        <dd>${t.work.early
                            .map((p) => `<a href="${p.href}">${p.name}</a> <a class="muted-link" href="${p.code}" ${EXT}>(${t.work.codeLabel}<span class="visually-hidden"> ${t.ui.external}</span>)</a>`)
                            .join(' · ')}</dd>
                    </div>
                </dl>
            </div>
        </section>`;

    const featured = `
        <section class="section section-featured" id="${ids.featured}" aria-labelledby="featured-title">
            <div class="wrap featured-grid">
                <div class="featured-text">
                    <p class="kicker">${t.featured.kicker}</p>
                    <h2 id="featured-title" class="h2">${t.featured.title}</h2>
                    <p>${t.featured.body}</p>
                    <dl class="facts">
${t.featured.facts.map((f) => `                        <div><dt>${f.value}</dt><dd>${f.label}</dd></div>`).join('\n')}
                    </dl>
                    <p class="note">${t.featured.factsNote}</p>
                    <a class="btn btn-primary" href="${url('spaceos')}">${t.featured.cta}${icon('arrow-right')}</a>
                </div>
${flowDiagram(t)}
            </div>
        </section>`;

    const c = t.contexts;
    const contexts = `
        <section class="section" id="${ids.contexts}" aria-label="${esc(c.space.kicker + ' · ' + c.employer.kicker)}">
            <div class="wrap">
                <div class="context">
                    <p class="kicker">${c.space.kicker}</p>
                    <h2 class="h3">${c.space.title}</h2>
                    <p class="measure">${c.space.body}</p>
                </div>
                <div class="context" id="${ids.employer}">
                    <p class="kicker">${c.employer.kicker}</p>
                    <h2 class="h3">${c.employer.title}</h2>
                    <p class="measure">${c.employer.body}</p>
                    <ul class="site-list" role="list">${c.employer.items.map((it) => siteItem(it, ctx)).join('')}
                    </ul>
                </div>
            </div>
        </section>`;

    const how = `
        <section class="section" id="${ids.how}" aria-labelledby="how-title">
            <div class="wrap how-grid">
                <header class="section-head">
                    <p class="kicker">${t.how.kicker}</p>
                    <h2 id="how-title" class="h2">${t.how.title}</h2>
                </header>
                <ol class="how-list" role="list">
${t.how.items.map((it) => `                    <li><h3 class="h4">${it.title}</h3><p>${it.text}</p></li>`).join('\n')}
                </ol>
                <div class="stack">
                    <p class="kicker">${t.stack.kicker}</p>
                    <dl>
${t.stack.groups.map((g) => `                        <div><dt>${g.name}</dt><dd>${g.items}</dd></div>`).join('\n')}
                    </dl>
                </div>
            </div>
        </section>`;

    const about = `
        <section class="section" id="${ids.about}" aria-labelledby="about-title">
            <div class="wrap about-grid">
                <figure class="about-photo">
                    <img src="/assets/images/jorge_luis_about.webp" alt="${esc(t.about.photoAlt)}" width="1000" height="1200" loading="lazy" decoding="async">
                </figure>
                <div class="about-text">
                    <p class="kicker">${t.about.kicker}</p>
                    <h2 id="about-title" class="h2">${t.about.title}</h2>
${t.about.paragraphs.map((p) => `                    <p>${p}</p>`).join('\n')}
                </div>
            </div>
        </section>`;

    const contact = `
        <section class="section section-contact" id="${ids.contact}" aria-labelledby="contact-title">
            <div class="wrap contact-inner">
                <p class="kicker">${t.contact.kicker}</p>
                <h2 id="contact-title" class="display display-sm">${t.contact.title}</h2>
                <p class="lead measure">${t.contact.body}</p>
                <div class="actions">
                    <a class="btn btn-primary" href="${links.whatsapp}" ${EXT}>${icon('whatsapp')}${t.contact.whatsapp}</a>
                    <a class="btn" href="${links.email}">${icon('mail')}${t.contact.email}</a>
                    <a class="icon-link" href="${links.linkedin}" ${EXT} aria-label="LinkedIn">${icon('linkedin')}</a>
                    <a class="icon-link" href="${links.github}" ${EXT} aria-label="GitHub">${icon('github')}</a>
                </div>
            </div>
        </section>`;

    return layout(ctx, [hero, work, featured, contexts, how, about, contact].join('\n'), { withLightbox: true });
}
