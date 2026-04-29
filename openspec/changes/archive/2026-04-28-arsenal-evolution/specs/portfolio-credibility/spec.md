# Delta for portfolio-credibility

> Change: arsenal-evolution
> Date: 2026-04-28
> Artifact store: openspec

---

## MODIFIED Requirements

### Requirement: Skills CORE / APRENDIENDO
(Previously: CORE = 9 items — HTML5, CSS3, JavaScript, Git, GitHub, VS Code, Figma, Vercel, Netlify; APRENDIENDO = React only — 1 item with inline styles)

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
