// English content. Same keys as es.js; the build fails if any key is missing.
// Written for English readers, not translated word by word.

export default {
    lang: 'en',
    ogLocale: 'en_US',

    meta: {
        home: {
            title: 'Jorge Luis Risso Patrón | Junior Frontend Developer — websites and web apps',
            description:
                'Junior Frontend Developer based in Panama. I build websites and web apps for businesses: SpaceOS, SALDO, Comparo360 and company websites. Open to freelance work and remote roles.',
        },
    },

    // ids de ancla por idioma (URLs legibles en cada lengua)
    ids: { work: 'work', featured: 'featured', contexts: 'contexts', employer: 'employer', how: 'how-i-work', about: 'about', contact: 'contact' },

    ui: {
        skip: 'Skip to content',
        nav: { work: 'Work', about: 'About', cv: 'CV', contact: 'Contact' },
        navLabel: 'Main navigation',
        langSwitch: { label: 'ES', aria: 'Leer esta página en español' },
        theme: 'Switch between light and dark theme',
        menu: 'Open or close the menu',
        homeLink: 'Home — Jorge Luis Risso Patrón',
        backToWork: 'Back to work',
        nextCase: 'Next case',
        caseFacts: 'Project facts',
        external: '(opens in a new tab)',
        footerTagline: 'Junior Frontend Developer. Websites and web apps from Panama.',
        footerNav: 'Navigation',
        footerSocial: 'Social',
        rights: 'All rights reserved.',
        madeIn: 'Made in Panama, no templates.',
        cvLink: 'View CV (Spanish)',
        whatsappFloat: 'Message on WhatsApp',
        gallery: {
            open: 'View screenshots of',
            dialog: 'Screenshot gallery',
            close: 'Close gallery',
            prev: 'Previous screenshot',
            next: 'Next screenshot',
            counter: 'Screenshot {n} of {total}',
        },
    },

    whatsappText: 'Hi Jorge Luis, I saw your portfolio and would like to talk',

    hero: {
        name: 'Jorge Luis Risso Patrón',
        role: 'Junior Frontend Developer · Panama',
        title: 'I build websites and web apps for businesses.',
        lead:
            'My largest project so far is <a href="{spaceos}">SpaceOS</a>, the internal system my studio, Space Panamá, uses to run clients, quotes and events.',
        availability: 'Available for freelance projects and open to joining a product team, ideally remote.',
        ctaWork: 'See the work',
        ctaTalk: 'Talk on WhatsApp',
        ctaMail: 'Send an email',
        photoAlt: 'Jorge Luis Risso Patrón',
    },

    work: {
        kicker: 'Selected work',
        title: 'Ordered by what it proves, not by date.',
        columns: { name: 'Project', kind: 'What it is', year: 'Year', status: 'Status' },
        rows: [
            { route: 'spaceos', name: 'SpaceOS', kind: 'Internal operations system · Space Panamá', year: '2026', status: 'In use · private', stack: 'Next.js · TypeScript · Supabase' },
            { route: 'saldo', name: 'SALDO', kind: 'Own product · personal finance', year: '2025–26', status: 'Public demo', stack: 'React · Supabase · Vitest' },
            { route: 'comparo360', name: 'Comparo360', kind: 'Own product · software comparisons', year: '2026', status: 'Live', stack: 'Astro · TypeScript · SEO' },
            { anchor: 'employer', name: 'Company websites', kind: 'Previous job · four sites', year: '2025–26', status: 'Live', stack: 'Next.js · React · HTML/CSS/JS' },
        ],
        inProgressLabel: 'In progress',
        inProgress: 'Space Web, the new website for Space Panamá (Next.js).',
        earlyLabel: 'Early projects (2025)',
        early: [
            { name: 'Weather App', href: '/weather-app', code: 'https://github.com/Risso-patron/portfolio/tree/main/weather-app' },
            { name: 'Pomodoro Timer', href: '/pomodoro-timer/', code: 'https://github.com/Risso-patron/portfolio/tree/main/pomodoro-timer' },
        ],
        codeLabel: 'code',
    },

    featured: {
        kicker: 'Featured case',
        title: 'SpaceOS: the internal system behind Space Panamá',
        body:
            'A studio that sells events and creative services has to follow every lead until it becomes an event with vendors, tasks and payments. SpaceOS brings that whole path into one app, which the team uses today.',
        facts: [
            { value: '200', label: 'commits' },
            { value: '48', label: 'SQL migrations' },
            { value: '154', label: 'test files' },
            { value: '19', label: 'E2E scenarios' },
        ],
        factsNote: 'Figures from the repository, August to October 2026.',
        cta: 'Read the case',
    },

    flow: {
        title: 'Sales flow in SpaceOS',
        steps: ['Lead', 'Quote', 'Acceptance', 'Event or project'],
        outputs: ['Tasks', 'Vendors', 'Payments', 'Documents'],
        base: 'Clients · global search · notifications · roles',
    },

    contexts: {
        space: {
            kicker: 'Space Panamá',
            title: 'Tools for my own studio',
            body:
                'Space Panamá is my creative studio. I build its digital products there: SpaceOS, used by the team, and the studio’s new website, still in progress.',
        },
        employer: {
            kicker: 'Previous job',
            title: 'Company websites',
            body:
                'Four websites built within the same company context, for businesses in different industries with different needs.',
            items: [
                { name: 'SOMOS Properties', gallery: 'somosproperties', image: 'somosproperties.com/somosproperties-00.webp', stack: 'Next.js · React · Tailwind CSS', text: 'Built the real estate platform from scratch and maintained it: property updates, content improvements and SEO work.' },
                { name: 'HomePower PTY', gallery: 'homepower', image: 'homepowerpty.com/homepower-00.webp', stack: 'HTML · CSS · JavaScript', text: 'Built the website and digital catalog from scratch, with a responsive front end for browsing products.' },
                { name: 'HostPro Panama', gallery: 'hostpro', image: 'hostpropanama.com/hostpropanama-desktop.webp', stack: 'Next.js · React', text: 'Built the website: front-end implementation and ongoing development.' },
                { name: 'Provivir Panama', gallery: 'provivir', image: 'provivirpanama.com/provivir-desktop.webp', stack: 'HTML · CSS · JavaScript', text: 'Front-end development on an interface designed by another professional.' },
            ],
        },
    },

    how: {
        kicker: 'How I work',
        title: 'What I look after in every delivery',
        items: [
            { title: 'Data with clear rules', text: 'In SpaceOS every table has role-based access policies (RLS), and every migration that touches permissions has its own test.' },
            { title: 'Tests from day one', text: 'Unit and component tests with Vitest, end-to-end flows with Playwright, and checks in CI.' },
            { title: 'Accessibility, checked', text: 'AA contrast, keyboard navigation and reduced motion, reviewed across screen widths.' },
            { title: 'Decisions in writing', text: 'I document the important decisions and leave usage guides for whoever receives the work.' },
        ],
    },

    stack: {
        kicker: 'Stack',
        groups: [
            { name: 'Front end', items: 'HTML, CSS, JavaScript, TypeScript, React, Next.js, Astro, Tailwind CSS' },
            { name: 'Data and back end', items: 'Supabase (Auth, PostgreSQL, RLS, Storage), Route Handlers, serverless functions' },
            { name: 'Quality', items: 'Vitest, Testing Library, Playwright, GitHub Actions' },
            { name: 'Tools', items: 'Git, GitHub, Vercel, Netlify, Figma, VS Code' },
        ],
    },

    about: {
        kicker: 'About',
        title: 'From the kitchen to web development.',
        paragraphs: [
            'I have been a professional chef since 2003. In 2025 I moved into web development, mostly self-taught, with a clear goal: bring the organization, pace and problem solving I learned in kitchens to digital projects.',
            'Since then I have built company websites in a job, shipped my own products such as SALDO and Comparo360, and today I build the tools for my studio, Space Panamá.',
            'I am still a junior, and I say it plainly: everything shown here is live or in use, and each case explains which part was mine.',
        ],
        photoAlt: 'Jorge Luis Risso Patrón working at his computer',
    },

    contact: {
        kicker: 'Contact',
        title: 'Have a project or an open role?',
        body:
            'I take freelance website and web app projects, and I am looking to join a product team, ideally remote. You can reach me on WhatsApp or by email.',
        whatsapp: 'WhatsApp',
        email: 'Email',
    },

    cases: {
        spaceos: {
            meta: {
                title: 'SpaceOS — internal system for Space Panamá | Jorge Luis Risso Patrón',
                description:
                    'Case study: SpaceOS, the app Space Panamá uses to manage clients, leads, quotes, events and vendors. Next.js, TypeScript, Supabase with RLS and three levels of testing.',
            },
            kicker: 'Case · Space Panamá',
            title: 'SpaceOS',
            summary:
                'Internal system for Space Panamá to manage clients, sales leads, quotes, events, vendors and documents.',
            facts: [
                ['Role', 'End-to-end development: data model, application and tests'],
                ['Period', 'August to October 2026 (first version)'],
                ['Status', 'In use by the team · private access'],
                ['Stack', 'Next.js (App Router), React, TypeScript, Supabase, Playwright, Vitest'],
            ],
            showFlow: true,
            sections: [
                {
                    title: 'The problem',
                    html: '<p>Work at an events studio starts with a conversation and ends with a delivered event. In between there are quotes, approvals, deposits, vendors and tasks. Without a system, that path is scattered across chats and spreadsheets, and next steps get lost.</p>',
                },
                {
                    title: 'The solution',
                    html: '<p>A role-based web app that follows a lead from first contact to the event. It includes a dashboard with urgent and upcoming actions, a visual sales pipeline, quotes with line items and acceptance, events with tasks, operational notes and vendor services, documents attached to each record, sales templates, notifications and global search.</p>',
                },
                {
                    title: 'Technical decisions',
                    html:
                        '<ul class="decisions">' +
                        '<li><strong>Security in the database, not only in the UI.</strong> Role-based RLS policies, least-privilege grants per table and no anonymous access. Migrations that touch permissions have their own tests.</li>' +
                        '<li><strong>Schema changes without breaking data.</strong> Contact data and commercial data were split in two steps, expand then contract, so the migration never interrupted daily use.</li>' +
                        '<li><strong>History that cannot be rewritten.</strong> Follow-ups on each lead are append-only: they can be added, not edited or deleted.</li>' +
                        '<li><strong>Three levels of tests.</strong> Vitest and Testing Library for logic and components; Playwright against an isolated local environment for full flows, including a visual contrast check.</li>' +
                        '</ul>',
                },
                {
                    title: 'By the numbers',
                    html:
                        '<dl class="numbers"><div><dt>200</dt><dd>commits</dd></div><div><dt>48</dt><dd>SQL migrations</dd></div><div><dt>154</dt><dd>test files</dd></div><div><dt>19</dt><dd>E2E specs</dd></div></dl>' +
                        '<p class="note">Figures from the repository. No business metrics included.</p>',
                },
                {
                    title: 'Why there are no screenshots',
                    html: '<p>SpaceOS holds real client and vendor data, so I do not show production screenshots. The diagram above sums up how the modules connect.</p>',
                },
            ],
            links: [],
            privateNote: 'Private application: there is no public demo.',
        },

        saldo: {
            meta: {
                title: 'SALDO — personal finance app | Jorge Luis Risso Patrón',
                description:
                    'Case study: SALDO, a personal finance web app with bank statement import and AI categorization. React, Supabase and Vitest.',
            },
            kicker: 'Case · own product',
            title: 'SALDO',
            summary:
                'Personal finance web app: income and expense tracking, bank statement import and AI-assisted categories.',
            facts: [
                ['Role', 'Own product'],
                ['Period', 'Since November 2025'],
                ['Status', 'Live · public demo'],
                ['Stack', 'React, Vite, Tailwind CSS, Supabase (Auth, PostgreSQL, RLS), Vitest'],
            ],
            images: [
                { src: 'saldo/screenshot-desktop.webp', width: 1877, height: 905, alt: 'SALDO on desktop' },
                { src: 'saldo/screenshot-mobile.webp', width: 343, height: 707, alt: 'SALDO on a phone', narrow: true },
            ],
            sections: [
                {
                    title: 'The problem',
                    html: '<p>I started it to understand where my money went each month without living in spreadsheets. Manual entry gets old fast, so the challenge was making data entry cheap.</p>',
                },
                {
                    title: 'The solution',
                    html: '<p>Manual entries and, above all, CSV or TXT bank statement import with automatic column detection and saved profiles per bank. After an import, AI suggests categories. The dashboard shows the month’s balance, the top spending category and the trend against last month. There is also a monthly budget, savings goals, multiple currencies, a three-language interface and offline support as a PWA.</p>',
                },
                {
                    title: 'Technical decisions',
                    html:
                        '<ul class="decisions">' +
                        '<li><strong>Per-user data in the database.</strong> Auth and PostgreSQL on Supabase, with RLS so each person only sees their own transactions.</li>' +
                        '<li><strong>AI keys stay off the browser.</strong> Calls to AI providers go through serverless functions; the client never receives a key.</li>' +
                        '<li><strong>Forgiving import.</strong> <code>;</code> or <code>,</code> separators, debit and credit in separate columns, and per-bank profiles so setup is done once.</li>' +
                        '<li><strong>Tests.</strong> 73 test files with Vitest.</li>' +
                        '</ul>',
                },
            ],
            links: [
                { label: 'Open SALDO', href: 'https://saldo.risso-patron.com/' },
                { label: 'View the code', href: 'https://github.com/risso-patron/Saldo' },
            ],
        },

        comparo360: {
            meta: {
                title: 'Comparo360 — software comparisons | Jorge Luis Risso Patrón',
                description:
                    'Case study: Comparo360, a Spanish-language software comparison site for small businesses with a CRM recommender. Astro, TypeScript, Zod, SEO tests in CI.',
            },
            kicker: 'Case · own product',
            title: 'Comparo360',
            summary:
                'Spanish-language comparisons and guides for small-business software, with a CRM recommender and disclosed affiliate links.',
            facts: [
                ['Role', 'Own product'],
                ['Period', 'Since August 2026'],
                ['Status', 'Live'],
                ['Stack', 'Astro, MDX, TypeScript, Zod, Vitest, Vercel'],
            ],
            images: [
                { src: 'comparo360/home-desktop.webp', width: 1440, height: 900, alt: 'Comparo360 home page on desktop' },
                { src: 'comparo360/home-mobile.webp', width: 390, height: 844, alt: 'Comparo360 home page on a phone', narrow: true },
                { src: 'comparo360/recomendador-desktop.webp', width: 1440, height: 900, alt: 'Comparo360 CRM recommender' },
            ],
            sections: [
                {
                    title: 'The problem',
                    html: '<p>Small teams pick CRMs and sales tools from rankings with no context. Comparo360 does the opposite: published criteria, verified prices and clearly stated limits.</p>',
                },
                {
                    title: 'The solution',
                    html: '<p>A content site with guides, product reviews and a four-question recommender that explains its result using the visitor’s own answers. Every affiliate link is disclosed, and a dedicated page explains how each tool is evaluated.</p>',
                },
                {
                    title: 'Technical decisions',
                    html:
                        '<ul class="decisions">' +
                        '<li><strong>Astro instead of hand-copied HTML.</strong> The site is 95% content. I compared HTML with partials, Astro, Next.js and Eleventy, and recorded the decision in an ADR.</li>' +
                        '<li><strong>Prices as data, not prose.</strong> Products and affiliate programs live in collections validated with Zod; if a value breaks the schema, the build fails.</li>' +
                        '<li><strong>One component for affiliate links.</strong> Each link carries a placement ID, so it is clear which page and position actually work.</li>' +
                        '<li><strong>SEO checked in CI.</strong> Formatting, types, build and tests for the SEO contract, sitemap and content security policy on every change.</li>' +
                        '<li><strong>Recommender with tested pure logic.</strong> Ties broken by stated preference and honest affinity scores, covered by unit tests.</li>' +
                        '</ul>',
                },
            ],
            links: [{ label: 'Visit Comparo360', href: 'https://comparo360.risso-patron.com/' }],
        },
    },
};
