<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portafolio de Jorge Luis Risso Patrón</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Sección de Inicio -->
    <section id="home">
        <h1>¡Hola! Soy Jorge Luis Risso Patrón</h1>
        <p>Soy argentino viviendo en Panamá desde 2017, con más de 10 años de experiencia en el sector gastronómico y conocimientos en programación. Actualmente estudio Python, MySQL y CSS.</p>
        <a href="#contact" class="btn">Contáctame</a>
    </section>

    <!-- Sección de Proyectos -->
    <section id="projects">
        <h2>Proyectos</h2>
        <div class="project">
            <h3><a href="https://github.com/tu_proyecto">Sistema de Gestión de Inventarios</a></h3>
            <p>Este proyecto fue desarrollado utilizando Python y MySQL, diseñado para gestionar grandes volúmenes de datos en una empresa de alimentos. Implementé soluciones de optimización para mejorar la eficiencia en la consulta de inventarios.</p>
            <img src="ruta/a/imagen.jpg" alt="Captura del proyecto">
        </div>
        <!-- Añadir más proyectos aquí -->
    </section>

    <!-- Sección de Habilidades -->
    <section id="skills">
        <h2>Habilidades</h2>
        <ul>
            <li>Python</li>
            <li>MySQL</li>
            <li>HTML, CSS</li>
            <li>JavaScript</li>
            <li>Soporte técnico de software y hardware</li>
            <li>Photoshop y After Effects</li>
        </ul>
    </section>

    <!-- Sección de Currículum -->
    <section id="resume">
        <h2>Currículum</h2>
        <p>Descarga mi currículum <a href="CV-Luis_Risso_Patron.pdf" target="_blank">aquí</a>.</p>
        <h3>Experiencia Profesional</h3>
        <ul>
            <li>Salonero, Atención al cliente, Supervisor general - DondeFederico (Febrero 2024 – Agosto 2024)</li>
            <li>Gerente de Locación - Grupo Maito (Abril 2021 – Mayo 2023)</li>
            <li>Soporte técnico - Ph Luxor Tower (Junio 2018 – Diciembre 2019)</li>
            <li>Atención y soporte tecnológico - Secretaría Legal y Técnica de la Nación Argentina (Febrero 2015 – Junio 2017)</li>
        </ul>
        <h3>Formación</h3>
        <ul>
            <li>Ingeniería en Sistemas de Información - Universidad Latina de Panamá (Abril 2019 – Marzo 2020)</li>
            <li>Inglés - NLC “Natural Learning Corporation” (2006 - 2007)</li>
            <li>Chef Internacional - Instituto Educativo Argentino (2002 – 2003)</li>
        </ul>
    </section>

    <!-- Sección de Contacto -->
    <section id="contact">
        <h2>Contacto</h2>
        <form action="tu_script_de_contacto.php" method="POST">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Mensaje:</label>
            <textarea id="message" name="message" required></textarea>
            <input type="submit" value="Enviar">
        </form>
        <p>Teléfono: +507 6456-0263</p>
        <p>Email: <a href="mailto:luisrissopa@gmail.com">luisrissopa@gmail.com</a></p>
    </section>
</body>
</html>
