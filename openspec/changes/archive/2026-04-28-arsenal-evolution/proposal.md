# Proposal: Arsenal Evolution

Date: 2026-04-28
Status: Proposed

---

## Intent

Tres problemas convergen que justifican un cambio atómico:

1. **Spec desactualizada**: `portfolio-credibility/spec.md` dice CORE = 9 ítems (sin GitHub Copilot ni Supabase), pero el HTML ya tiene 11. La spec dejó de ser fuente de verdad.
2. **APRENDIENDO frágil**: la sección usa un único pill con estilos inline (`style="..."`). Añadir TypeScript requeriría duplicar esos inline styles, que es error-prone y difícil de mantener.
3. **TypeScript ausente**: es la tecnología que extiende directamente JavaScript vanilla y complementa React (el aprendizaje principal). Debería aparecer como segundo pill en APRENDIENDO para reflejar la dirección real de crecimiento técnico.

---

## Scope

### In Scope

- **CSS class `.tech-pill`**: extraer los estilos inline del pill de React a una clase reutilizable en `assets/css/main-new.css`
- **HTML refactor**: `src/_arsenal.html` — reemplazar inline styles del pill React por clase `.tech-pill`
- **TypeScript pill**: añadir segundo pill en la sección APRENDIENDO (React → TypeScript), usando `.tech-pill` y el ícono de devicons
- **Spec update**: `openspec/specs/portfolio-credibility/spec.md` — actualizar el Requirement "Skills CORE / APRENDIENDO" para reflejar 11 ítems CORE (+ Copilot, + Supabase) y 2 ítems APRENDIENDO (+ TypeScript)

### Out of Scope

- Añadir más tecnologías a APRENDIENDO (Python, Go, etc.) — deferido
- Hover effects en pills APRENDIENDO — deferido (mantener apariencia más ligera que CORE)
- Reordenar el grid CORE existente
- Cambiar íconos de tecnologías CORE ya implementadas
- Migrar los pills a un sistema data-driven (Approach 3 — over-engineered para 2-3 ítems)

---

## Capabilities

### Modified Capabilities

- **portfolio-credibility / Skills CORE / APRENDIENDO**:
  - CORE list: de 9 ítems a 11 (añadir GitHub Copilot y Supabase — ya existen en HTML, la spec los debe reconocer)
  - APRENDIENDO list: de 1 ítem (React) a 2 (React + TypeScript)
  - Escenario nuevo: "Reclutador ve el stack de herramientas IA" — Copilot debe ser visible como herramienta de productividad, no como skill core de programación

---

## Approach

**Approach 2 — CSS class `.tech-pill`**

1. Añadir en `assets/css/main-new.css`, dentro de la sección de Arsenal:
   ```css
   .tech-pill {
     display: inline-flex;
     align-items: center;
     gap: 0.4rem;
     padding: 0.4rem 0.85rem;
     border-radius: 20px;
     font-size: 0.85rem;
     font-weight: 500;
     background: rgba(139, 92, 246, 0.15);
     color: #a78bfa;
     border: 1px solid rgba(139, 92, 246, 0.3);
   }
   ```

2. Refactorizar `src/_arsenal.html`: pill de React pasa de `style="display:inline-flex; ..."` a `class="tech-pill"`.

3. Añadir TypeScript pill debajo de React:
   ```html
   <span class="tech-pill">
     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
          alt="TypeScript" class="tech-icon" width="16" height="16">
     TypeScript
   </span>
   ```
   Nota: el ícono TypeScript es azul sólido (#3178C6) — no necesita `.tech-icon-theme` (sin inversión dark mode).

4. Actualizar spec con la realidad actual del HTML.

---

## Affected Areas

| Área | Impacto | Descripción |
|------|---------|-------------|
| `assets/css/main-new.css` | Bajo — adición | ~10-15 líneas nueva clase `.tech-pill` |
| `src/_arsenal.html` | Bajo — refactor | Reemplazar inline styles + añadir 1 pill TypeScript |
| `index.html` (build output) | Derivado | Se regenera vía `npm run build` |
| `openspec/specs/portfolio-credibility/spec.md` | Bajo — actualización | Sección "Skills CORE / APRENDIENDO" |

---

## Risks

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Pills desbordan en mobile (<480px) | Media | Verificar `flex-wrap` en `.tech-learning`; añadir `flex-wrap: wrap` si es necesario |
| Ícono TypeScript no carga (CDN externa) | Baja | Devicons CDN es muy estable; misma CDN ya usada para otros íconos CORE |
| Build no regenera `index.html` correctamente | Baja | Ejecutar `npm run build` y verificar output antes de commit |
| Spec update introduce inconsistencia | Baja | Actualizar solo la tabla CORE y la lista APRENDIENDO, sin tocar otros requirements |

---

## Rollback Plan

Cambio pequeño y reversible:
1. Revertir `src/_arsenal.html` al estado anterior (restaurar inline styles, eliminar pill TypeScript)
2. Eliminar `.tech-pill` de `assets/css/main-new.css`
3. Revertir spec al estado anterior (CORE = 9, APRENDIENDO = React)
4. Re-ejecutar `npm run build`

Sin dependencias externas, sin migraciones de datos.

---

## Success Criteria

- [ ] `.tech-pill` class definida en `assets/css/main-new.css` sin inline styles en `_arsenal.html`
- [ ] Pill React renderiza idéntico al estado previo (mismo aspecto visual)
- [ ] Pill TypeScript aparece junto a React en sección APRENDIENDO
- [ ] Ícono TypeScript (azul, devicons) visible y cargando correctamente
- [ ] `index.html` (build output) refleja los cambios tras `npm run build`
- [ ] `openspec/specs/portfolio-credibility/spec.md` lista 11 ítems CORE y 2 ítems APRENDIENDO
- [ ] Layout mobile sin desbordamiento en viewport 375px
