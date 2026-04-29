# Tasks: Arsenal Evolution

Change: arsenal-evolution
Date: 2026-04-28
Status: Ready for apply

---

## Phase 1 — CSS Foundation

- [x] **T1** `assets/css/main-new.css`: agregar el bloque `.tech-pill` y `.tech-pill img` después del bloque `.tech-item span` y antes del comentario `/* ==================== CONTACT ====================*/`
  ```css
  /* APRENDIENDO pills */
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
  .tech-pill img {
      width: 16px;
      height: 16px;
  }
  ```

---

## Phase 2 — HTML Implementation

- [x] **T2** `src/_arsenal.html`: localizar el `<span>` del pill de React en la sección APRENDIENDO (actualmente tiene `style="display:inline-flex; align-items:center; ..."` con inline styles) y reemplazarlo por `class="tech-pill"` eliminando todos los atributos `style` inline. El resultado debe quedar:
  ```html
  <span class="tech-pill">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="16" height="16">
      React
  </span>
  ```

- [x] **T3** `src/_arsenal.html`: agregar el pill de TypeScript **después** del pill de React (recién refactorizado). Insertar:
  ```html
  <span class="tech-pill">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="16" height="16">
      TypeScript
  </span>
  ```
  Nota: el ícono TypeScript es azul sólido (#3178C6) — no usar `.tech-icon-theme` ni inversión dark mode.

---

## Phase 3 — Build & Verify

- [x] **T4** Ejecutar `npm run build` desde la raíz del proyecto para regenerar `index.html` a partir de los partials `src/*.html`. Verificar que el comando termina sin errores.

- [x] **T5** Abrir `index.html` en el navegador (o con live server) y verificar visualmente:
  - La sección Arsenal → APRENDIENDO muestra **dos pills** side by side: React y TypeScript
  - Ambos pills tienen el fondo morado translúcido (purple theme) y bordes sutiles
  - Los íconos (React naranja, TypeScript azul) aparecen correctamente junto al texto
  - No hay estilos inline visibles en el DOM (inspeccionar con DevTools → los `<span>` deben mostrar solo `class="tech-pill"`)

---

## Phase 4 — Spec Sync

- [x] **T6** `openspec/specs/portfolio-credibility/spec.md`: localizar el bloque `### Requirement: Skills CORE / APRENDIENDO` y actualizar:
  - Línea CORE: reemplazar la lista de 9 ítems por los 11 ítems: `HTML5, CSS3, JavaScript, Git, GitHub, VS Code, GitHub Copilot, Figma, Vercel, Netlify, Supabase`
  - Línea APRENDIENDO: cambiar de `React` (1 ítem, inline styles) a `React, TypeScript` (2 ítems, clase `.tech-pill`)
  - Actualizar cualquier mención a "1 ítem" o "inline styles" para reflejar la implementación real

---

## Phase 5 — Commit

- [x] **T7** Staging: `git add assets/css/main-new.css src/_arsenal.html index.html openspec/specs/portfolio-credibility/spec.md`

- [x] **T8** Commit: `git commit -m "feat(arsenal): add TypeScript pill, extract .tech-pill class, sync spec"`

---

## Verification Checklist (post-apply)

| Check | Criterio | Método |
|-------|----------|--------|
| `.tech-pill` en CSS | Existe en `main-new.css` dentro de la sección Arsenal | `grep -n "tech-pill" assets/css/main-new.css` |
| Sin inline styles en React pill | El `<span>` de React usa `class="tech-pill"` sin atributo `style` | Inspeccionar DOM en navegador |
| TypeScript pill presente | El segundo pill aparece después de React con ícono correcto | Visual en navegador |
| Build exitoso | `index.html` regenerado sin errores | `npm run build` exit 0 |
| Spec CORE = 11 ítems | GitHub Copilot y Supabase incluidos | Leer spec actualizada |
| Spec APRENDIENDO = 2 ítems | React y TypeScript con `.tech-pill` | Leer spec actualizada |
