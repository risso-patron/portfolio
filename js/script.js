document.addEventListener('DOMContentLoaded', function() {

     // 1. Lógica del cursor personalizado
    const ball = document.getElementById('ball');

    document.addEventListener('mousemove', (e) => {
        const ballSize = ball.getBoundingClientRect();
        const ballWidth = ballSize.width;
        const ballHeight = ballSize.height;

        // Coloca el cursor exactamente en la punta del mouse, centrado
        ball.style.position = 'fixed';
        ball.style.left = (e.clientX - ballWidth / 2) + 'px';
        ball.style.top = (e.clientY - ballHeight / 2) + 'px';
        ball.style.opacity = '1'; // Hace visible el cursor cuando el mouse se mueve
    });

    document.addEventListener('mouseleave', () => {
        ball.style.opacity = '0'; // Oculta el cursor cuando el mouse sale de la ventana
    });

    // 2. Control del menú desplegable de Experiencia Profesional
    const menuToggle = document.querySelector(".menuToggle"); // Botón para abrir/cerrar el menú
    const menu = document.querySelector(".menu"); // Contenedor del menú

    if (menuToggle && menu) { // Asegura que los elementos existan antes de añadir listeners
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active"); // Activa/desactiva la clase "active"
        });
    }

    // 3. Funcionalidad del botón "Enviar Correo"
    const sendEmailBtn = document.getElementById('sendEmailBtn');

    if (sendEmailBtn) { // Asegura que el botón exista
        sendEmailBtn.addEventListener('click', () => {
            const emailAddress = "luisrissopa@gmail.com";
            // Abre el cliente de correo predeterminado del usuario
            window.location.href = `mailto:${emailAddress}`;
            // Opcional: Puedes dar un feedback visual temporal al usuario
            sendEmailBtn.innerHTML = '<i class="fas fa-check"></i> ¡Abriendo Correo!';
            setTimeout(() => {
                sendEmailBtn.innerHTML = '<i class="fas fa-envelope"></i> Enviar Correo';
            }, 2000); // El mensaje dura 2 segundos
        });
    }
});
// 4. Carrusel automático
    const track = document.querySelector('.flex');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    if (track && items.length > 0) { // Asegura que los elementos del carrusel existan
        function moveCarousel() {
            // Calcula el ancho de un ítem (ancho + margen), asegurándose de que items[0] exista
            const itemWidth = items[0].offsetWidth + 20; 
            currentIndex = (currentIndex + 1) % items.length; // Avanza al siguiente elemento
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            track.style.transition = 'transform 0.5s ease-in-out'; // Transición suave
        }
        // Configura el intervalo para mover el carrusel automáticamente
        // Puedes ajustar el tiempo (en milisegundos) para cambiar la velocidad.
        // Sugerencia: 3000ms (3 segundos) o 4000ms (4 segundos) es un buen balance.
        setInterval(moveCarousel, 3000); // Cambia cada 3 segundos
    }