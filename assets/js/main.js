// Portfolio RP — comportamiento mínimo y progresivo.
// El contenido funciona sin JavaScript; esto solo agrega tema, menú móvil,
// galería y una entrada suave de secciones (si no se pidió reducir el movimiento).

(() => {
    const root = document.documentElement;

    // ---------- Tema (oscuro por defecto; la elección se recuerda) ----------
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle?.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch {
            /* almacenamiento no disponible: el tema vale solo para esta visita */
        }
    });

    // ---------- Menú móvil ----------
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('site-nav');
    const setMenu = (open) => {
        menuToggle.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('is-open', open);
    };
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
        nav.addEventListener('click', (e) => {
            if (e.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                setMenu(false);
                menuToggle.focus();
            }
        });
    }

    // ---------- Galería de capturas (<dialog> nativo: foco y Escape incluidos) ----------
    const P = '/assets/images/projects/';
    const galleries = {
        somosproperties: ['somosproperties-00', 'somosproperties-01', 'somosproperties-02', 'somosproperties-03'].map((n) => `${P}somosproperties.com/${n}.webp`),
        homepower: ['homepower-00', 'homepower-01', 'homepower-02', 'homepower-03', 'homepower-04'].map((n) => `${P}homepowerpty.com/${n}.webp`),
        hostpro: ['hostpropanama-desktop', 'hostpro-01', 'hostpro-02', 'hostpro-03', 'hostpro-04'].map((n) => `${P}hostpropanama.com/${n}.webp`),
        provivir: ['provivir-desktop', 'provivir-mobile'].map((n) => `${P}provivirpanama.com/${n}.webp`),
    };

    const dialog = document.querySelector('.lightbox');
    if (dialog && typeof dialog.showModal === 'function') {
        const img = dialog.querySelector('.lightbox-img');
        const counter = dialog.querySelector('.lightbox-counter');
        const template = dialog.dataset.counter;
        let list = [];
        let index = 0;
        let label = '';

        const show = (i) => {
            index = (i + list.length) % list.length;
            img.src = list[index];
            img.alt = `${label} — ${index + 1}/${list.length}`;
            counter.textContent = template.replace('{n}', index + 1).replace('{total}', list.length);
        };

        document.querySelectorAll('[data-gallery]').forEach((btn) => {
            btn.addEventListener('click', () => {
                list = galleries[btn.dataset.gallery] || [];
                if (!list.length) return;
                label = btn.closest('.site-item')?.querySelector('.site-name')?.textContent || '';
                show(0);
                dialog.showModal();
            });
        });

        dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
        dialog.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
        dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.close();
        });
        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });
    }

    // ---------- Entrada suave (nunca en el hero ni con movimiento reducido) ----------
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
        );
        document.querySelectorAll('main .section, .case-body, .case-gallery').forEach((el) => {
            // Lo que ya está en pantalla al cargar no se oculta.
            if (el.getBoundingClientRect().top < window.innerHeight) return;
            el.classList.add('reveal');
            observer.observe(el);
        });
    }
})();
