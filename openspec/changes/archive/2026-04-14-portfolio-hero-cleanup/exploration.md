## Exploration: portfolio-hero-cleanup

### Current State

El portfolio tiene una estructura moderna y completa, pero con problemas de credibilidad:

- **Hero Section**: Diseñado con badge "DISPONIBLE PARA TRABAJAR", título con gradiente, descripción, botones CTA y tarjeta de perfil. Visualmente sólido.
- **About Section**: Narrativa centrada en desarrollo frontend, sin referencias explícitas a gastronomía/marketing. Estadísticas: "1+ Año", "8+ Proyectos", "100+ Commits".
- **Projects Section**: 8 proyectos con filtros (Vanilla JS, React, Proyectos Cliente, UI/UX). Solo 2-3 son vanilla JS propios y verificables.
- **Skills**: HTML5, CSS3, JS, React, Git, GitHub, VS Code, Figma, menciona TypeScript/Next.js.
- **Contact**: WhatsApp + email + sociales. Sin mensaje de objetivo laboral.

**Problemas críticos detectados**:
1. "8+ proyectos" inflado — solo 3-4 son verificables con demo/código
2. "Studio Create" marcado "In Development" — inconsistente con meta de proyectos 100% funcionales
3. Proyectos cliente (SEMM, Homepowerpty, HostPro, etc.) sin README ni documentación de autoría
4. Stack confuso: menciona React/Next.js/Supabase cuando el objetivo es "vanilla-first junior"
5. Meta tags SEO mencionan "E-commerce", "Real estate" — dispersión de nicho
6. No hay mensaje explícito de "busco primera oportunidad"

### Affected Areas

- `index.html` — Hero, About, Projects (tabs/cards), Skills, Contact, Footer, meta tags
- `assets/css/main-new.css` — Estilos de secciones afectadas (minimal)
- `assets/js/main-new.js` — Tab filtering (si se eliminan categorías)

### What Must Change

#### ELIMINAR
- "8+ Proyectos Completados" → reemplazar con "4+ Proyectos Funcionales"
- Proyectos cliente sin documentación (SEMM, Homepowerpty, HostPro, Provi Vivir, Somos Properties)
- "Studio Create" con estado "In Development"
- Tab de filtro "Proyectos Cliente" y "UI/UX" (si se quitan esos proyectos)
- Figma en skills (es diseño, no desarrollo)
- Meta tags con keywords irrelevantes (e-commerce, real estate)

#### MODIFICAR
- Hero description → más específica y vanilla-first
- About → "junior autodidacta de Panamá, vanilla JavaScript, HTML5, CSS3"
- Stats → "Desde 2025", "4+ Proyectos Funcionales"
- Skills → separar CORE (HTML/CSS/JS/Git) de APRENDIENDO (React, TypeScript)
- Contact → agregar "Busco mi primera oportunidad como Frontend Developer"
- Footer bio → "Desarrollador Web Frontend junior"
- Title/meta → "Desarrollador Web Frontend Junior | HTML · CSS · JavaScript"

#### MANTENER
- Estructura HTML semántica (nav, hero, about, work, contact, footer)
- Diseño visual: gradientes, dark mode, responsive, profile card
- 4 proyectos reales: Weather App, Pomodoro Timer, Budget Calculator, budget-app local
- Canales de contacto directos
- Badge "DISPONIBLE PARA TRABAJAR"

### Approaches

1. **Cleanup Conservative** (recomendado como Fase 1)
   - Pros: rápido (1-2h), solo cambia contenido/copy, riesgo cero de romper diseño
   - Cons: no agrega proyectos nuevos
   - Effort: Low

2. **Full Hero Redesign**
   - Pros: mayor impacto visual
   - Cons: requiere cambios en HTML/CSS/JS, riesgo de regresiones
   - Effort: High

3. **Cleanup Conservative + Nuevo Proyecto** (Fase 1 + Fase 2)
   - Pros: máximo impacto, 4 proyectos sólidos documentados
   - Cons: 4-6 horas total
   - Effort: Medium-High

### Recommendation

**Approach 1 como este cambio (portfolio-hero-cleanup)**, seguido de Approach 3 en un cambio separado.

Razones:
- La credibilidad se gana primero con honestidad (estadísticas reales, copy correcto)
- Cleanup es reversible y de bajo riesgo
- Libera el portfolio de "ruido" antes de agregar más proyectos

### Risks

- Quitar proyectos cliente puede parecer portfolio más vacío → mitigación: 3-4 proyectos sólidos con demo es suficiente para junior
- "Junior" en el copy puede parecer negativo → mitigación: honestidad atrae más que inflar
- Eliminar React/Next de skills puede reducir matches en búsquedas → mitigación: mantener en sección "Aprendiendo"

### Ready for Proposal

✅ Yes — exploración completa, lista para sdd-propose.
