        // ==================== Navegación con scroll ==================== 
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
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

        // ==================== Animaciones de entrada ==================== 
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar elementos con animación
        document.querySelectorAll('.fade-in').forEach(el => {
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
    
