# Tasks: portfolio-hero-cleanup

> Archivo afectado: `index.html` (único archivo con cambios)
> Sin cambios en CSS ni JS de comportamiento.
> Verificación: manual en browser.

---

## Phase 1: Meta Tags

- [ ] 1.1 Reemplazar `<title>` en `index.html`
  - Actual: `Jorge Luis Risso Patrón - Desarrollador Web Frontend`
  - Nuevo: `Jorge Luis Risso Patrón | Frontend Developer Junior — HTML, CSS, JavaScript`

- [ ] 1.2 Reemplazar `<meta name="description">`
  - Actual: `"...Portfolio con proyectos reales: Weather App, E-commerce, plataformas web. HTML, CSS, JavaScript."`
  - Nuevo: `"Desarrollador Web Frontend Junior autodidacta de Panamá. Proyectos funcionales con JavaScript vanilla: Weather App, Pomodoro Timer, Budget App. Buscando primera oportunidad en tech."`

- [ ] 1.3 Reemplazar `<meta name="keywords">`
  - Nuevo: `"desarrollador frontend junior, frontend developer panama, javascript vanilla, HTML CSS JavaScript, portfolio developer junior"`

- [ ] 1.4 Reemplazar `<meta property="og:title">`
  - Nuevo: `"Jorge Luis Risso Patrón | Frontend Developer Junior"`

- [ ] 1.5 Reemplazar `<meta property="og:description">`
  - Nuevo: `"Desarrollador Web Frontend Junior de Panamá. Proyectos reales con JavaScript vanilla."`

- [ ] 1.6 Reemplazar `<meta name="twitter:title">`
  - Nuevo: `"Jorge Luis Risso Patrón | Frontend Developer Junior"`

- [ ] 1.7 Reemplazar `<meta name="twitter:description">`
  - Nuevo: `"Portfolio con proyectos reales en JavaScript vanilla. Disponible para primera oportunidad."`

- [ ] 1.8 Actualizar `schema.org` — campo `"jobTitle"`
  - Actual: `"Desarrollador Web Frontend"`
  - Nuevo: `"Desarrollador Web Frontend Junior"`

---

## Phase 2: Hero Section

- [ ] 2.1 Reemplazar `<p class="hero-description">`
  - Actual: `"Construyo experiencias web funcionales y atractivas. Especializado en JavaScript vanilla, enfocado en código limpio y diseño responsive."`
  - Nuevo: `"Construyo interfaces web con JavaScript vanilla, HTML y CSS. Enfocado en código limpio, diseño responsive y proyectos 100% funcionales."`

- [ ] 2.2 Reemplazar stat de experiencia en la profile card
  - Actual: `<span class="stat-value">1+ Año</span>`
  - Nuevo: `<span class="stat-value">Desde 2025</span>`

---

## Phase 3: About Section

- [ ] 3.1 Reemplazar párrafo "Especializado en el stack JavaScript moderno..."
  - Nuevo: `"Desarrollador web frontend junior autodidacta de Panamá, especializado en JavaScript vanilla, HTML5 y CSS3. Construyo proyectos funcionales desde cero aplicando mejores prácticas de código limpio y diseño responsive."`

- [ ] 3.2 Reemplazar stat `8+` (Proyectos)
  - Actual: `<span class="stat-number">8+</span>` con label `"Proyectos Completados"`
  - Nuevo: `<span class="stat-number">4+</span>` con label `"Proyectos Funcionales"`

- [ ] 3.3 Reemplazar label de stat de experiencia en about
  - Actual: `<span class="stat-label">Año de Experiencia</span>` (con número `1+`)
  - Nuevo número: `<span class="stat-number">2025</span>` y label: `<span class="stat-label">Desarrollando desde</span>`

- [ ] 3.4 Reemplazar label de commits
  - Actual: `"Commits"`
  - Nuevo: `"Commits en GitHub"`

---

## Phase 4: Projects Section

- [ ] 4.1 Eliminar tab `data-category="client"` — botón "Proyectos Cliente"
  - Línea a eliminar: `<button class="tab-btn" data-category="client">Proyectos Cliente</button>`

- [ ] 4.2 Eliminar tab `data-category="ui"` — botón "UI/UX"
  - Línea a eliminar: `<button class="tab-btn" data-category="ui">UI/UX</button>`

- [ ] 4.3 Eliminar `<article class="project-card" data-category="client">` — Home Power PTY
  - Bloque completo del artículo (desde `<!-- Home Power PTY -->` hasta su `</article>`)

- [ ] 4.4 Eliminar `<article class="project-card" data-category="client">` — SOMOS Properties
  - Bloque completo del artículo (desde `<!-- SOMOS Properties -->` hasta su `</article>`)

- [ ] 4.5 Eliminar `<article class="project-card" data-category="client ui">` — HostPro Panama
  - Bloque completo del artículo (desde `<!-- HostPro Panama -->` hasta su `</article>`)

- [ ] 4.6 Eliminar `<article class="project-card" data-category="client">` — Provivir Panamá
  - Bloque completo del artículo (desde `<!-- Provivir Panama -->` hasta su `</article>`)

- [ ] 4.7 Eliminar `<article class="project-card" data-category="client ui">` — Studio Create
  - Bloque completo del artículo (desde `<!-- Studio Create -->` hasta su `</article>`)

- [ ] 4.8 Agregar Budget App como 4° proyecto con `data-category="apps"`
  - Demo: `/budget-app/`
  - Code: `https://github.com/Risso-patron/portfolio/tree/main/budget-app`
  - Tech: `VANILLA JS + LOCALSTORAGE`
  - Stack tags: HTML, CSS, JavaScript, LocalStorage

---

## Phase 5: Tech Arsenal

- [ ] 5.1 Mantener Figma en el stack. Agregar herramientas adicionales al `.tech-grid`:
  - Agregar: Vercel (cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg)
  - Agregar: Netlify (icono SVG o badge texto si no hay devicon disponible)
  - Mantener todas las existentes: HTML5, CSS3, JavaScript, React, Git, GitHub, VS Code, Figma

- [ ] 5.2 Mover `<div class="tech-item">` de React a sección "Aprendiendo"
  - Añadir después del `.tech-grid` un bloque:
    ```html
    <div class="tech-learning">
        <p class="learning-label">Aprendiendo: <span>React</span></p>
    </div>
    ```
  - Eliminar React del `.tech-grid` principal

---

## Phase 6: Contact & Footer

- [ ] 6.1 Reemplazar `<p class="contact-subtitle">`
  - Actual: `"Estoy disponible para freelance y posiciones full-time. Si tienes un proyecto interesante o una oportunidad laboral, hablemos."`
  - Nuevo: `"Busco mi primera oportunidad como Frontend Developer en empresa o startup. También disponible para proyectos freelance. Si tienes una oportunidad o quieres hablar sobre código, escríbeme."`

- [ ] 6.2 Reemplazar descripción en footer
  - Actual: `"Desarrollador Frontend especializado en crear experiencias web funcionales."`
  - Nuevo: `"Frontend Developer Junior. Construyo interfaces con JavaScript vanilla."`

---

## Phase 7: Verificación Manual en Browser

- [ ] 7.1 Abrir `index.html` en browser — verificar `<title>` en pestaña contiene "Junior"
- [ ] 7.2 Contar project cards en DOM — DEBE haber exactamente 4
- [ ] 7.3 Verificar que NO existe texto "In Development" ni "Coming Soon" visible
- [ ] 7.4 Verificar tabs: solo existen "Todos", "Vanilla JS", "React"
- [ ] 7.5 Hacer click en tab "Vanilla JS" — DEBEN aparecer exactamente 3 proyectos
- [ ] 7.6 Hacer click en tab "React" — DEBE aparecer exactamente 1 proyecto
- [ ] 7.7 Verificar Arsenal Técnico: Figma NO aparece, React está en sección "Aprendiendo"
- [ ] 7.8 Verificar About stats: NO existe "8+", SÍ existe "4+" con label "Proyectos Funcionales"
- [ ] 7.9 Verificar meta description (DevTools > Elements > head): sin "E-commerce" ni "real estate"
- [ ] 7.10 Verificar Contact subtitle: contiene "primera oportunidad"
