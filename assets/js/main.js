        // ==================== Sistema de Modo Claro/Oscuro ==================== 
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        // Verificar preferencia guardada o del sistema
        const getPreferredTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        // Aplicar tema
        const setTheme = (theme) => {
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Cambiar icono
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // Log para debug
            console.log(`Tema cambiado a: ${theme}`);
        };

        // Inicializar tema al cargar la página
        const initTheme = () => {
            const preferredTheme = getPreferredTheme();
            setTheme(preferredTheme);
        };

        // Ejecutar inmediatamente
        initTheme();

        // Toggle al hacer clic
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            });
        }

        // Escuchar cambios en preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // ==================== Navegación con scroll ==================== 
        let lastScroll = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Agregar clase 'scrolled' si está por debajo de 50px
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Esconder/mostrar navbar al hacer scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling hacia abajo - esconder navbar
                navbar.classList.add('nav-hidden');
            } else {
                // Scrolling hacia arriba - mostrar navbar
                navbar.classList.remove('nav-hidden');
            }
            
            lastScroll = currentScroll;
        });

        // ==================== Scroll suave para enlaces ==================== 
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ==================== Animaciones de entrada mejoradas ==================== 
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Para animaciones de fade-up en tarjetas
                    if (entry.target.classList.contains('about-card')) {
                        entry.target.style.animationPlayState = 'running';
                    }
                }
            });
        }, observerOptions);

        // Observar elementos con animación
        document.querySelectorAll('.fade-in, .animate-fade-up').forEach(el => {
            observer.observe(el);
        });

        // ==================== Typing effect para el título (opcional) ==================== 
        /*
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Aplicar efecto typing al título principal
        window.addEventListener('load', () => {
            const title = document.querySelector('.hero-content h1');
            if (title) {
                typeWriter(title, 'Jorge Luis Risso Patrón', 80);
            }
        });
        */

        // ==================== Paralax suave para el hero ==================== 
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // ==================== Preloader (opcional) ==================== 
        /*
        window.addEventListener('load', () => {
            const preloader = document.createElement('div');
            preloader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0072ff;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            `;
            preloader.innerHTML = '<div style="color: white; font-size: 2rem; font-weight: bold;">JL</div>';
            
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
            
            document.body.appendChild(preloader);
        });
        */

        // ==================== Efectos hover suaves para tarjetas ==================== 
        document.querySelectorAll('.project-card, .about-card, .skill-category').forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function(e) {
                this.style.transform = 'translateY(0)';
            });
        });

        // ==================== Smooth scroll con offset para nav fija ==================== 
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ==================== Efecto de partículas en movimiento ==================== 
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            // Agregar movimiento aleatorio adicional
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });

        // ==================== Contador de animación para estadísticas (si aplica) ==================== 
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Aplicar a elementos con clase 'counter' si existen
        const counters = document.querySelectorAll('.counter');
        if (counters.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        animateValue(entry.target, 0, target, 2000);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => counterObserver.observe(counter));
        }

        // ==================== Log de carga ==================== 
        console.log('%c✨ Portfolio cargado exitosamente', 'color: #0072ff; font-size: 16px; font-weight: bold;');
        console.log('%c🚀 Jorge Luis Risso Patrón - Developer Frontend', 'color: #00c6ff; font-size: 14px;');
    
