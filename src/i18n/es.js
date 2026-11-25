// Contenido en español. La versión inglesa (en.js) tiene exactamente las mismas
// claves; el build falla si falta alguna. El HTML dentro de los textos es
// contenido de autor (no proviene de usuarios), por eso se inserta tal cual.

export default {
    lang: 'es',
    ogLocale: 'es_PA',

    meta: {
        home: {
            title: 'Jorge Luis Risso Patrón | Frontend Developer Junior — sitios y aplicaciones web',
            description:
                'Frontend Developer Junior en Panamá. Desarrollo sitios y aplicaciones web para negocios: SpaceOS, SALDO, Comparo360 y sitios para empresas. Disponible para freelance y trabajo remoto.',
        },
    },

    // ids de ancla por idioma (URLs legibles en cada lengua)
    ids: { work: 'trabajo', featured: 'destacado', contexts: 'contextos', employer: 'empleo', how: 'como-trabajo', about: 'sobre-mi', contact: 'contacto' },

    ui: {
        skip: 'Saltar al contenido',
        nav: { work: 'Trabajo', about: 'Sobre mí', cv: 'CV', contact: 'Contacto' },
        navLabel: 'Navegación principal',
        langSwitch: { label: 'EN', aria: 'Read this page in English' },
        theme: 'Cambiar entre tema claro y oscuro',
        menu: 'Abrir o cerrar el menú',
        homeLink: 'Inicio — Jorge Luis Risso Patrón',
        backToWork: 'Volver al trabajo',
        nextCase: 'Siguiente caso',
        caseFacts: 'Ficha del proyecto',
        external: '(se abre en una pestaña nueva)',
        footerTagline: 'Frontend Developer Junior. Sitios y aplicaciones web desde Panamá.',
        footerNav: 'Navegación',
        footerSocial: 'Redes',
        rights: 'Todos los derechos reservados.',
        madeIn: 'Hecho en Panamá, sin plantillas.',
        cvLink: 'Ver CV',
        whatsappFloat: 'Escribir por WhatsApp',
        gallery: {
            open: 'Ver capturas de',
            dialog: 'Galería de capturas',
            close: 'Cerrar galería',
            prev: 'Captura anterior',
            next: 'Captura siguiente',
            counter: 'Captura {n} de {total}',
        },
    },

    whatsappText: 'Hola Jorge Luis, vi tu portfolio y me interesa hablar contigo',

    hero: {
        name: 'Jorge Luis Risso Patrón',
        role: 'Frontend Developer Junior · Panamá',
        title: 'Hago sitios y aplicaciones web para negocios.',
        lead:
            'Mi trabajo más grande hasta hoy es <a href="{spaceos}">SpaceOS</a>, el sistema interno con el que mi estudio, Space Panamá, gestiona clientes, cotizaciones y eventos.',
        availability: 'Disponible para proyectos freelance y para sumarme a un equipo de producto, preferiblemente en remoto.',
        ctaWork: 'Ver trabajo',
        ctaTalk: 'Hablemos por WhatsApp',
        ctaMail: 'Escribir un correo',
        photoAlt: 'Jorge Luis Risso Patrón',
    },

    work: {
        kicker: 'Trabajo seleccionado',
        title: 'Ordenado por lo que demuestra, no por fecha.',
        columns: { name: 'Proyecto', kind: 'Qué es', year: 'Año', status: 'Estado' },
        rows: [
            { route: 'spaceos', name: 'SpaceOS', kind: 'Sistema de gestión interno · Space Panamá', year: '2026', status: 'En uso · privado', stack: 'Next.js · TypeScript · Supabase' },
            { route: 'saldo', name: 'SALDO', kind: 'Producto propio · finanzas personales', year: '2025–26', status: 'Demo pública', stack: 'React · Supabase · Vitest' },
            { route: 'comparo360', name: 'Comparo360', kind: 'Producto propio · comparativas de software', year: '2026', status: 'En línea', stack: 'Astro · TypeScript · SEO' },
            { anchor: 'employer', name: 'Sitios para empresas', kind: 'Empleo anterior · cuatro sitios', year: '2025–26', status: 'Publicados', stack: 'Next.js · React · HTML/CSS/JS' },
        ],
        inProgressLabel: 'En desarrollo',
        inProgress: 'Space Web, la nueva web de Space Panamá (Next.js).',
        earlyLabel: 'Primeros proyectos (2025)',
        early: [
            { name: 'Weather App', href: '/weather-app', code: 'https://github.com/Risso-patron/portfolio/tree/main/weather-app' },
            { name: 'Pomodoro Timer', href: '/pomodoro-timer/', code: 'https://github.com/Risso-patron/portfolio/tree/main/pomodoro-timer' },
        ],
        codeLabel: 'código',
    },

    featured: {
        kicker: 'Caso destacado',
        title: 'SpaceOS: el sistema interno de Space Panamá',
        body:
            'Un estudio que vende eventos y servicios creativos necesita seguir cada oportunidad hasta que se convierte en un evento con proveedores, tareas y pagos. SpaceOS reúne ese recorrido en una sola aplicación, que hoy usa el equipo.',
        facts: [
            { value: '200', label: 'commits' },
            { value: '48', label: 'migraciones SQL' },
            { value: '154', label: 'archivos de pruebas' },
            { value: '19', label: 'escenarios E2E' },
        ],
        factsNote: 'Cifras del repositorio, agosto a octubre de 2026.',
        cta: 'Leer el caso',
    },

    flow: {
        title: 'Recorrido comercial en SpaceOS',
        steps: ['Oportunidad', 'Cotización', 'Aceptación', 'Evento o proyecto'],
        outputs: ['Tareas', 'Proveedores', 'Abonos', 'Documentos'],
        base: 'Clientes · búsqueda global · notificaciones · roles',
    },

    contexts: {
        space: {
            kicker: 'Space Panamá',
            title: 'Las herramientas de mi propio estudio',
            body:
                'Space Panamá es mi estudio creativo. Ahí desarrollo sus productos digitales: SpaceOS, en uso por el equipo, y la nueva web del estudio, en desarrollo.',
        },
        employer: {
            kicker: 'Empleo anterior',
            title: 'Sitios para empresas',
            body:
                'Cuatro proyectos web desarrollados dentro de un mismo contexto empresarial, para negocios de sectores distintos y con necesidades diferentes.',
            items: [
                { name: 'SOMOS Properties', gallery: 'somosproperties', image: 'somosproperties.com/somosproperties-00.webp', stack: 'Next.js · React · Tailwind CSS', text: 'Desarrollo desde cero y mantenimiento de la plataforma inmobiliaria: actualización de propiedades, mejoras de contenido y tareas de SEO.' },
                { name: 'HomePower PTY', gallery: 'homepower', image: 'homepowerpty.com/homepower-00.webp', stack: 'HTML · CSS · JavaScript', text: 'Desarrollo desde cero del sitio y del catálogo digital, con una implementación responsive orientada a presentar y consultar productos.' },
                { name: 'HostPro Panamá', gallery: 'hostpro', image: 'hostpropanama.com/hostpropanama-desktop.webp', stack: 'Next.js · React', text: 'Desarrollo del sitio web: implementación frontend y evolución continua del proyecto.' },
                { name: 'Provivir Panamá', gallery: 'provivir', image: 'provivirpanama.com/provivir-desktop.webp', stack: 'HTML · CSS · JavaScript', text: 'Desarrollo e implementación frontend sobre una interfaz diseñada por otro profesional.' },
            ],
        },
    },

    how: {
        kicker: 'Cómo trabajo',
        title: 'Lo que cuido en cada entrega',
        items: [
            { title: 'Datos con reglas claras', text: 'En SpaceOS cada tabla tiene políticas de acceso por rol (RLS) y cada migración que toca permisos tiene su prueba.' },
            { title: 'Pruebas desde el principio', text: 'Pruebas unitarias y de componentes con Vitest, flujos completos con Playwright y verificaciones en CI.' },
            { title: 'Accesibilidad comprobada', text: 'Contraste AA, navegación por teclado y movimiento reducido, revisados en varios anchos de pantalla.' },
            { title: 'Decisiones por escrito', text: 'Documento las decisiones importantes y dejo guías de uso para quien recibe el trabajo.' },
        ],
    },

    stack: {
        kicker: 'Stack',
        groups: [
            { name: 'Frontend', items: 'HTML, CSS, JavaScript, TypeScript, React, Next.js, Astro, Tailwind CSS' },
            { name: 'Datos y backend', items: 'Supabase (Auth, PostgreSQL, RLS, Storage), Route Handlers, funciones serverless' },
            { name: 'Calidad', items: 'Vitest, Testing Library, Playwright, GitHub Actions' },
            { name: 'Herramientas', items: 'Git, GitHub, Vercel, Netlify, Figma, VS Code' },
        ],
    },

    about: {
        kicker: 'Sobre mí',
        title: 'De la gastronomía al desarrollo web.',
        paragraphs: [
            'Soy chef profesional desde 2003. En 2025 empecé mi transición al desarrollo web, de forma autodidacta, con una idea clara: llevar a los proyectos digitales la organización, el ritmo de trabajo y la resolución de problemas que aprendí en cocina.',
            'Desde entonces desarrollé sitios para empresas en un empleo, construí productos propios como SALDO y Comparo360, y hoy desarrollo las herramientas de mi estudio, Space Panamá.',
            'Sigo siendo junior, y lo digo sin rodeos: lo que muestro aquí está publicado o en uso, y cada caso explica qué parte hice yo.',
        ],
        photoAlt: 'Jorge Luis Risso Patrón trabajando en su computadora',
    },

    contact: {
        kicker: 'Contacto',
        title: '¿Tienes un proyecto o una vacante?',
        body:
            'Acepto proyectos freelance de sitios y aplicaciones web, y busco sumarme a un equipo de producto, preferiblemente en remoto. Respondo por WhatsApp o por correo.',
        whatsapp: 'WhatsApp',
        email: 'Correo',
    },

    cases: {
        spaceos: {
            meta: {
                title: 'SpaceOS — sistema interno de Space Panamá | Jorge Luis Risso Patrón',
                description:
                    'Caso: SpaceOS, la aplicación con la que Space Panamá gestiona clientes, oportunidades, cotizaciones, eventos y proveedores. Next.js, TypeScript, Supabase con RLS y pruebas en tres niveles.',
            },
            kicker: 'Caso · Space Panamá',
            title: 'SpaceOS',
            summary:
                'Sistema interno de Space Panamá para gestionar clientes, oportunidades comerciales, cotizaciones, eventos, proveedores y documentos.',
            facts: [
                ['Rol', 'Desarrollo de punta a punta: modelo de datos, aplicación y pruebas'],
                ['Periodo', 'Agosto a octubre de 2026 (primera versión)'],
                ['Estado', 'En uso por el equipo · acceso privado'],
                ['Stack', 'Next.js (App Router), React, TypeScript, Supabase, Playwright, Vitest'],
            ],
            showFlow: true,
            sections: [
                {
                    title: 'El problema',
                    html: '<p>El trabajo de un estudio de eventos empieza con una conversación y termina con un evento entregado. En el medio hay cotizaciones, aceptaciones, abonos, proveedores y tareas. Sin un sistema, ese recorrido queda repartido entre chats y planillas, y es fácil perder una próxima acción.</p>',
                },
                {
                    title: 'La solución',
                    html: '<p>Una aplicación web con acceso por rol que acompaña la oportunidad desde el primer contacto hasta el evento. Incluye panel con acciones urgentes y próximas, pipeline comercial visual, cotizaciones con conceptos y aceptación, eventos con tareas, notas operativas y servicios de proveedores, documentos asociados a cada entidad, plantillas comerciales, notificaciones y búsqueda global.</p>',
                },
                {
                    title: 'Decisiones técnicas',
                    html:
                        '<ul class="decisions">' +
                        '<li><strong>Seguridad en la base de datos, no solo en la interfaz.</strong> Políticas RLS por rol, privilegios mínimos por tabla y acceso anónimo revocado. Las migraciones que tocan permisos tienen su propia prueba.</li>' +
                        '<li><strong>Cambios de esquema sin romper datos.</strong> Separar los datos de contacto y los comerciales se hizo en dos pasos, primero expandir y luego contraer, para migrar sin cortar el uso.</li>' +
                        '<li><strong>Un historial que no se reescribe.</strong> Los seguimientos de cada oportunidad solo admiten agregar: no se editan ni se borran.</li>' +
                        '<li><strong>Pruebas en tres niveles.</strong> Vitest y Testing Library para lógica y componentes; Playwright contra un entorno local aislado para los flujos completos, incluida una prueba de contraste visual.</li>' +
                        '</ul>',
                },
                {
                    title: 'En números',
                    html:
                        '<dl class="numbers"><div><dt>200</dt><dd>commits</dd></div><div><dt>48</dt><dd>migraciones SQL</dd></div><div><dt>154</dt><dd>archivos de pruebas</dd></div><div><dt>19</dt><dd>especificaciones E2E</dd></div></dl>' +
                        '<p class="note">Cifras del repositorio. No incluyo métricas de negocio.</p>',
                },
                {
                    title: 'Por qué no hay capturas',
                    html: '<p>SpaceOS trabaja con datos reales de clientes y proveedores, así que no muestro capturas de producción. El diagrama de arriba resume cómo se conectan los módulos.</p>',
                },
            ],
            links: [],
            privateNote: 'Aplicación privada: no tiene demo pública.',
        },

        saldo: {
            meta: {
                title: 'SALDO — finanzas personales | Jorge Luis Risso Patrón',
                description:
                    'Caso: SALDO, aplicación web de finanzas personales con importación de extractos bancarios y categorización con IA. React, Supabase y Vitest.',
            },
            kicker: 'Caso · producto propio',
            title: 'SALDO',
            summary:
                'Aplicación web de finanzas personales: registro de ingresos y gastos, importación de extractos bancarios y categorización con IA.',
            facts: [
                ['Rol', 'Producto propio'],
                ['Periodo', 'Desde noviembre de 2025'],
                ['Estado', 'Publicado · demo pública'],
                ['Stack', 'React, Vite, Tailwind CSS, Supabase (Auth, PostgreSQL, RLS), Vitest'],
            ],
            images: [
                { src: 'saldo/screenshot-desktop.webp', width: 1877, height: 905, alt: 'Captura de SALDO en escritorio' },
                { src: 'saldo/screenshot-mobile.webp', width: 343, height: 707, alt: 'Captura de SALDO en un teléfono', narrow: true },
            ],
            sections: [
                {
                    title: 'El problema',
                    html: '<p>Lo empecé para entender a dónde iba mi dinero cada mes sin depender de hojas de cálculo. El registro manual cansa rápido, así que el reto era que cargar datos costara poco.</p>',
                },
                {
                    title: 'La solución',
                    html: '<p>Registro manual de movimientos y, sobre todo, importación de extractos CSV o TXT del banco, con detección automática de columnas y perfiles guardados por banco. Después del import, la IA propone categorías. El panel muestra el saldo del mes, la mayor categoría de gasto y la tendencia frente al mes anterior. También hay presupuesto mensual, metas de ahorro, varias monedas, interfaz en tres idiomas y funcionamiento sin conexión como PWA.</p>',
                },
                {
                    title: 'Decisiones técnicas',
                    html:
                        '<ul class="decisions">' +
                        '<li><strong>Datos por usuario en la base.</strong> Autenticación y PostgreSQL con Supabase, con RLS para que cada persona vea solo sus movimientos.</li>' +
                        '<li><strong>Claves de IA fuera del navegador.</strong> Las llamadas a los proveedores de IA pasan por funciones serverless; el cliente nunca recibe una clave.</li>' +
                        '<li><strong>Importación tolerante.</strong> Formatos con separador <code>;</code> o <code>,</code>, débito y crédito en columnas distintas y perfiles por banco para no repetir la configuración.</li>' +
                        '<li><strong>Pruebas.</strong> 73 archivos de pruebas con Vitest.</li>' +
                        '</ul>',
                },
            ],
            links: [
                { label: 'Abrir SALDO', href: 'https://saldo.risso-patron.com/' },
                { label: 'Ver el código', href: 'https://github.com/risso-patron/Saldo' },
            ],
        },

        comparo360: {
            meta: {
                title: 'Comparo360 — comparativas de software | Jorge Luis Risso Patrón',
                description:
                    'Caso: Comparo360, sitio de comparativas de software para pymes con recomendador de CRM. Astro, TypeScript, Zod, pruebas de SEO en CI.',
            },
            kicker: 'Caso · producto propio',
            title: 'Comparo360',
            summary:
                'Sitio de comparativas y guías de software para pymes, con un recomendador de CRM y enlaces de afiliado declarados.',
            facts: [
                ['Rol', 'Producto propio'],
                ['Periodo', 'Desde agosto de 2026'],
                ['Estado', 'En línea'],
                ['Stack', 'Astro, MDX, TypeScript, Zod, Vitest, Vercel'],
            ],
            images: [
                { src: 'comparo360/home-desktop.webp', width: 1440, height: 900, alt: 'Portada de Comparo360 en escritorio' },
                { src: 'comparo360/home-mobile.webp', width: 390, height: 844, alt: 'Portada de Comparo360 en un teléfono', narrow: true },
                { src: 'comparo360/recomendador-desktop.webp', width: 1440, height: 900, alt: 'Recomendador de CRM de Comparo360' },
            ],
            sections: [
                {
                    title: 'El problema',
                    html: '<p>Los equipos pequeños eligen CRM y herramientas comerciales a partir de rankings sin contexto. Comparo360 propone lo contrario: criterios publicados, precios verificados y límites explicados.</p>',
                },
                {
                    title: 'La solución',
                    html: '<p>Un sitio de contenido con guías, análisis de productos y un recomendador de cuatro preguntas que explica el resultado con las respuestas del visitante. Cada enlace de afiliado está declarado y hay una página que explica cómo se evalúa cada herramienta.</p>',
                },
                {
                    title: 'Decisiones técnicas',
                    html:
                        '<ul class="decisions">' +
                        '<li><strong>Astro en lugar de HTML copiado a mano.</strong> El sitio era 95 % contenido. Comparé HTML con parciales, Astro, Next.js y Eleventy, y dejé la decisión documentada en un ADR.</li>' +
                        '<li><strong>Precios como datos, no como texto.</strong> Productos y programas de afiliados viven en colecciones validadas con Zod; si un dato no cumple el esquema, el build falla.</li>' +
                        '<li><strong>Un solo componente para los enlaces de afiliado.</strong> Cada enlace lleva un identificador de ubicación para saber qué página y qué posición funcionan.</li>' +
                        '<li><strong>SEO verificado en CI.</strong> Formato, tipos, build y pruebas de contrato SEO, sitemap y política de seguridad de contenido en cada cambio.</li>' +
                        '<li><strong>Recomendador con lógica pura probada.</strong> Desempate por preferencia declarada y afinidad honesta, cubiertos por pruebas unitarias.</li>' +
                        '</ul>',
                },
            ],
            links: [{ label: 'Visitar Comparo360', href: 'https://comparo360.risso-patron.com/' }],
        },
    },
};
