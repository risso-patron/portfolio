# Delta Spec: portfolio-credibility

> Change: portfolio-hero-cleanup
> File: openspec/changes/portfolio-hero-cleanup/specs/portfolio-credibility/spec.md
> Mode: new capability

---

## ADDED Requirements

---

### Requirement: Honest Meta Tags

El portfolio MUST comunicar un perfil de "Desarrollador Web Frontend Junior" en todos los meta tags.
Los meta tags NO DEBEN incluir keywords de nichos ajenos al perfil (e-commerce, real estate).

**Valores requeridos exactos:**

```
title: "Jorge Luis Risso Patrón | Frontend Developer Junior — HTML, CSS, JavaScript"
meta description: "Desarrollador Web Frontend Junior autodidacta de Panamá. Proyectos funcionales con JavaScript vanilla: Weather App, Pomodoro Timer, Budget App. Buscando primera oportunidad en tech."
meta keywords: "desarrollador frontend junior, frontend developer panama, javascript vanilla, HTML CSS JavaScript, portfolio developer junior"
og:title: "Jorge Luis Risso Patrón | Frontend Developer Junior"
og:description: "Desarrollador Web Frontend Junior de Panamá. Proyectos reales con JavaScript vanilla."
twitter:title: "Jorge Luis Risso Patrón | Frontend Developer Junior"
twitter:description: "Portfolio con proyectos reales en JavaScript vanilla. Disponible para primera oportunidad."
schema.org jobTitle: "Desarrollador Web Frontend Junior"
```

#### Scenario: Reclutador accede al portfolio

- GIVEN que un reclutador abre el portfolio en un navegador
- WHEN la página carga y el browser muestra el title tab
- THEN el title MUST ser "Jorge Luis Risso Patrón | Frontend Developer Junior — HTML, CSS, JavaScript"
- AND la meta description NO DEBE mencionar "E-commerce", "real estate" ni "plataformas web"

#### Scenario: Compartir en redes sociales

- GIVEN que alguien comparte la URL del portfolio en LinkedIn o WhatsApp
- WHEN la plataforma genera el preview
- THEN el og:title MUST mostrar "Frontend Developer Junior"
- AND la descripción MUST mencionar "JavaScript vanilla" y "primera oportunidad"

---

### Requirement: Hero Description Vanilla-First

La descripción del hero MUST comunicar enfoque vanilla JavaScript y ser específica.

**Valor requerido exacto:**
```
"Construyo interfaces web con JavaScript vanilla, HTML y CSS. Enfocado en código limpio, diseño responsive y proyectos 100% funcionales."
```

#### Scenario: Primera impresión

- GIVEN que un visitante llega al portfolio por primera vez
- WHEN ve la sección hero
- THEN la descripción MUST mencionar "JavaScript vanilla" explícitamente
- AND NO DEBE usar lenguaje vago como "experiencias digitales" sin especificación técnica

---

### Requirement: About Stats Verídicas

Las estadísticas de About MUST reflejar números reales y verificables.

**Valores requeridos exactos:**

| Stat | Valor actual | Valor requerido |
|------|-------------|-----------------|
| Experiencia (hero card) | "1+ Año" | "Desde 2025" |
| Proyectos (about) | "8+" | "4+" |
| Label proyectos | "Proyectos Completados" | "Proyectos Funcionales" |
| Commits | "100+" | "100+" (mantener — verificable en GitHub) |
| Label commits | "Commits" | "Commits en GitHub" |

#### Scenario: Reclutador revisa perfil de GitHub

- GIVEN que un reclutador ve "4+ Proyectos Funcionales" en el portfolio
- WHEN visita github.com/risso-patron
- THEN DEBE poder verificar al menos 4 proyectos con código y demo activa
- AND la cifra NO DEBE incluir proyectos sin demo, sin README, o marcados "In Development"

#### Scenario: Verificación de experiencia

- GIVEN que el about muestra "Desde 2025"
- WHEN un reclutador pregunta sobre experiencia en entrevista
- THEN el candidato DEBE poder relacionar directamente con proyectos fechados desde 2025
- AND "Desde 2025" es más honesto y verificable que el ambiguo "1+ Año"

---

### Requirement: About Text Junior Explícito

El texto del About MUST identificar al candidato como desarrollador junior autodidacta.

**Párrafo requerido (reemplaza "Especializado en el stack JavaScript moderno..."):**
```
"Desarrollador web frontend junior autodidacta de Panamá, especializado en JavaScript vanilla, HTML5 y CSS3. Construyo proyectos funcionales desde cero aplicando mejores prácticas de código limpio y diseño responsive."
```

#### Scenario: Expectativa del reclutador

- GIVEN que un reclutador lee el About section
- WHEN procesa el perfil del candidato
- THEN MUST quedar claro que el candidato busca su primera oportunidad formal en tech
- AND el texto SHOULD mencionar "vanilla JavaScript" como especialidad core

---

### Requirement: Solo Proyectos Verificables

La sección de proyectos MUST mostrar únicamente proyectos con demo activa y código accesible.

**Proyectos que DEBEN permanecer (4 total):**

| # | Proyecto | Categoría | Demo | Código |
|---|---------|-----------|------|--------|
| 1 | Weather App | Vanilla JS | `/weather-app/` | github.com/Risso-patron/portfolio/tree/main/weather-app |
| 2 | Pomodoro Timer | Vanilla JS | `/pomodoro-timer/` | github.com/Risso-patron/portfolio/tree/main/pomodoro-timer |
| 3 | Budget Calculator v2.0 | React | budget-calculator-rp.netlify.app | github.com/risso-patron/budget-calculator-react |
| 4 | Budget App | Vanilla JS | `/budget-app/` | github.com/Risso-patron/portfolio/tree/main/budget-app |

**Proyectos que DEBEN eliminarse:**

| Proyecto | Razón |
|---------|-------|
| Home Power PTY | Sin README, autoría no documentada |
| SOMOS Properties | Sin README, usa Next.js/React ajeno al stack vanilla |
| HostPro Panama | Sin README, sin código público |
| Provivir Panamá | Sin README, sin código público |
| Studio Create | Marcado "In Development", sin demo |

**Tabs que DEBEN eliminarse:**
- `data-category="client"` → tab "Proyectos Cliente" eliminado
- `data-category="ui"` → tab "UI/UX" eliminado

**Tabs que DEBEN permanecer:**
- "Todos" (`all`)
- "Vanilla JS" (`apps`)
- "React" (`react`)

#### Scenario: Reclutador filtra por "Vanilla JS"

- GIVEN que el visitante hace click en el tab "Vanilla JS"
- WHEN el filtro se aplica
- THEN DEBEN mostrarse exactamente 3 proyectos: Weather App, Pomodoro Timer, Budget App
- AND cada uno MUST tener link de Demo activo y link de Code accesible

#### Scenario: Reclutador filtra por "React"

- GIVEN que el visitante hace click en el tab "React"
- WHEN el filtro se aplica
- THEN DEBE mostrarse exactamente 1 proyecto: Budget Calculator v2.0
- AND MUST tener link "Demo Live" activo en netlify

#### Scenario: Tab "Todos"

- GIVEN que el visitante está en el tab "Todos"
- WHEN la sección de proyectos carga
- THEN DEBEN mostrarse exactamente 4 proyectos
- AND ninguno DEBE tener estado "In Development" ni "Coming Soon"

---

### Requirement: Skills Organizadas CORE / APRENDIENDO

El Arsenal Técnico MUST separar visualmente skills dominadas de skills en aprendizaje.

**CORE (skills que DEBEN estar en la sección principal):**
- HTML5, CSS3, JavaScript, Git, GitHub, VS Code

**APRENDIENDO (skills que DEBEN moverse a subsección "Aprendiendo"):**
- React

**Skills que DEBEN eliminarse de la sección:**
- Figma (herramienta de diseño, no de desarrollo frontend)

**Estructura requerida:**

```html
<!-- Sección principal: CORE -->
<div class="tech-grid">
  <!-- HTML5, CSS3, JavaScript, Git, GitHub, VS Code -->
</div>

<!-- Subsección: aprendiendo -->
<div class="tech-learning">
  <span class="learning-label">Aprendiendo:</span>
  <!-- React (con nota visual de "en progreso") -->
</div>
```

#### Scenario: Reclutador busca "HTML CSS JavaScript"

- GIVEN que el reclutador escanea el stack tecnológico
- WHEN ve la sección Arsenal Técnico
- THEN DEBE ver HTML5, CSS3, JavaScript en posición prominente (CORE)
- AND Figma NO DEBE aparecer en el stack técnico

#### Scenario: Transparencia sobre React

- GIVEN que el candidato menciona React en el portfolio
- WHEN el reclutador pregunta por experiencia con React
- THEN la sección "Aprendiendo" MUST haber indicado que React está en progreso
- AND el Budget Calculator v2.0 es la evidencia concreta de uso de React

---

### Requirement: CTA Laboral Explícito

La sección de contacto MUST comunicar claramente el objetivo laboral del candidato.

**Texto requerido (reemplaza subtitle actual):**
```
"Busco mi primera oportunidad como Frontend Developer en empresa o startup. También disponible para proyectos freelance. Si tienes una oportunidad o quieres hablar sobre código, escríbeme."
```

**Footer text requerido (reemplaza texto actual):**
```
"Desarrollador Web Frontend Junior. Construyo interfaces con JavaScript vanilla."
```

#### Scenario: Reclutador llega a la sección de contacto

- GIVEN que un reclutador llega a la sección de contacto
- WHEN lee el subtítulo
- THEN MUST quedar claro que el candidato busca su primera oportunidad formal
- AND los canales de contacto (WhatsApp, email) DEBEN permanecer

#### Scenario: Footer como cierre de marca

- GIVEN que el visitante llega al footer
- WHEN lee la bio del footer
- THEN MUST identificar al candidato como "Frontend Junior" especializado en "JavaScript vanilla"
- AND la descripción SHOULD ser ≤ 2 líneas

---

## Criterios de Aceptación Globales

1. Al abrir `index.html` en browser, el `<title>` MUST contener "Junior"
2. Al contar los `<article class="project-card">` en el DOM, DEBE haber exactamente 4
3. NO DEBE existir ningún `<article>` con texto "In Development" o "Coming Soon" visible
4. Al inspeccionar el `.tech-grid`, Figma NO DEBE aparecer
5. El texto "Especializado en el stack JavaScript moderno" NO DEBE existir en el HTML
6. El texto "8+" en About stats NO DEBE existir
7. El tab con `data-category="client"` NO DEBE existir
8. La meta description NO DEBE contener "E-commerce" ni "real estate"
