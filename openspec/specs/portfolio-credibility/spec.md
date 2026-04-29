# Spec: portfolio-credibility

> Domain: portfolio-credibility
> Promoted from: portfolio-hero-cleanup
> Date: 2026-04-14
> Status: Active — source of truth

---

## Requirements

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

**Valores implementados:**

| Stat | Valor |
|------|-------|
| Experiencia (hero card) | "Desde 2025" |
| Proyectos (about) | "4+" con label "Proyectos" |
| Commits (about) | "100+" con label "Commits" |
| Año (about) | "2025" con label "Desde" |

#### Scenario: Reclutador revisa perfil de GitHub

- GIVEN que un reclutador ve "4+ Proyectos Funcionales" en el portfolio
- WHEN visita github.com/risso-patron
- THEN DEBE poder verificar al menos 4 proyectos con código y demo activa
- AND la cifra NO DEBE incluir proyectos sin demo, sin README, o marcados "In Development"

#### Scenario: Verificación de experiencia

- GIVEN que el about muestra "Desde 2025"
- WHEN un reclutador pregunta sobre experiencia en entrevista
- THEN el candidato DEBE poder relacionar directamente con proyectos fechados desde 2025

---

### Requirement: About Text Junior Explícito

El texto del About MUST identificar al candidato como desarrollador junior autodidacta.

**Párrafo implementado:**
```
"Desarrollador web frontend junior autodidacta de Panamá, especializado en JavaScript vanilla, HTML5 y CSS3. Construyo proyectos funcionales desde cero aplicando mejores prácticas de código limpio y diseño responsive."
```

#### Scenario: Expectativa del reclutador

- GIVEN que un reclutador lee el About section
- WHEN procesa el perfil del candidato
- THEN MUST quedar claro que el candidato busca su primera oportunidad formal en tech
- AND el texto SHOULD mencionar "vanilla JavaScript" como especialidad core

---

### Requirement: Proyectos con Demo Activa

La sección de proyectos MUST mostrar proyectos con demo activa.

**Proyectos personales activos (4):**

| # | Proyecto | Categoría | Demo |
|---|---------|-----------|------|
| 1 | Weather App | Vanilla JS (`apps`) | `/weather-app/` |
| 2 | Pomodoro Timer | Vanilla JS (`apps`) | `/pomodoro-timer/` |
| 3 | Budget Calculator v2.0 | React (`react`) | budget-calculator-rp.netlify.app |
| 4 | Budget App | Vanilla JS (`apps`) | `/budget-app/` |

**Proyectos cliente activos (4) — requieren demo live pública:**

| # | Proyecto | URL |
|---|---------|-----|
| 1 | Home Power PTY | https://www.homepowerpty.com/ |
| 2 | SOMOS Properties | https://www.somosproperties.com/ |
| 3 | HostPro Panama | https://www.hostpropanama.com/ |
| 4 | Provivir Panamá | https://www.provivirpanama.com/ |

**Proyectos excluidos:**
- Studio Create — sin demo activa ("In Development")

**Tabs activos:** Todos (`all`), Vanilla JS (`apps`), React (`react`), Trabajo Cliente (`client`)

#### Scenario: Reclutador filtra por "Vanilla JS"

- GIVEN que el visitante hace click en el tab "Vanilla JS"
- WHEN el filtro se aplica
- THEN DEBEN mostrarse 3 proyectos: Weather App, Pomodoro Timer, Budget App
- AND cada uno MUST tener link de Demo activo

#### Scenario: Reclutador filtra por "Trabajo Cliente"

- GIVEN que el visitante hace click en el tab "Trabajo Cliente"
- WHEN el filtro se aplica
- THEN DEBEN mostrarse los 4 proyectos cliente con link "Visit Site" funcional

---

### Requirement: Skills CORE / APRENDIENDO

El Arsenal Técnico MUST separar visualmente skills dominadas de skills en aprendizaje.

**CORE (tech-grid):** HTML5, CSS3, JavaScript, Git, GitHub, VS Code, GitHub Copilot, Figma, Vercel, Netlify, Supabase

**APRENDIENDO (tech-learning pills):** React, TypeScript

**Pill implementation:**
- Each APRENDIENDO item MUST use `.tech-pill` CSS class (no inline styles)
- Rendered as colored pills (purple theme: `background: rgba(139, 92, 246, 0.15)`, `color: #a78bfa`, `border: 1px solid rgba(139, 92, 246, 0.3)`)
- Icon for TypeScript: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg` (no `.tech-icon-theme` inversion needed — solid blue #3178C6)

#### Scenario: Reclutador escanea el stack

- GIVEN que el reclutador ve la sección Arsenal Técnico
- WHEN la escanea visualmente
- THEN DEBE ver HTML5, CSS3, JavaScript en posición prominente
- AND GitHub Copilot DEBE aparecer en el grid CORE después de VS Code
- AND React DEBE aparecer en sección "Aprendiendo" claramente diferenciada

#### Scenario: Reclutador ve stack de herramientas IA

- GIVEN que el reclutador escanea la sección Arsenal Técnico
- WHEN ve la sección CORE (tech-grid)
- THEN GitHub Copilot MUST estar visible en el grid
- AND DEBE estar posicionado después de VS Code (herramientas de editor/IDE agrupadas)

#### Scenario: Reclutador evalúa dirección de crecimiento técnico

- GIVEN que el reclutador ve la sección APRENDIENDO
- WHEN la escanea
- THEN DEBE ver React Y TypeScript como tecnologías en aprendizaje
- AND el orden DEBE ser React primero, TypeScript segundo
- AND ambos DEBEN usar la clase `.tech-pill` (sin inline styles)
