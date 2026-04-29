# Exploration: arsenal-evolution

Date: 2026-04-28
Status: Complete

---

## Current State

### CORE Tech Grid (11 items — HTML)
1. HTML5
2. CSS3
3. JavaScript
4. Git
5. GitHub
6. VS Code
7. GitHub Copilot ⚠️ (not in spec)
8. Figma
9. Vercel
10. Netlify
11. Supabase ⚠️ (not in spec)

### APRENDIENDO (1 item — HTML)
- React (purple pill, inline styles)

---

## Spec vs Reality Gaps

| Item | Spec | HTML | Gap |
|------|------|------|-----|
| HTML5–Netlify (9 items) | ✅ CORE | ✅ In grid | None |
| GitHub Copilot | ❌ NOT in spec | ✅ In grid (#7) | Spec needs update |
| Supabase | ❌ NOT in spec | ✅ In grid (#11) | Spec needs update |
| React | ✅ APRENDIENDO | ✅ In pill | None |

---

## Recommended Approach

**Approach 2 — Create `.tech-pill` CSS class**

- Extract APRENDIENDO pill inline styles into reusable `.tech-learning` + `.tech-pill` CSS classes
- Add TypeScript as second pill
- ~20 lines of CSS, ~5 lines of HTML
- Scalable: future APRENDIENDO items need zero CSS changes

---

## Files Affected

- `src/_arsenal.html` — HTML edits (pill refactor + TypeScript item)
- `assets/css/main-new.css` — New `.tech-pill` class (~20 lines)
- `openspec/specs/portfolio-credibility/spec.md` — Update CORE list + APRENDIENDO list

---

## Risks

1. Mobile layout: flex-wrap may push pills to second line on <480px — test needed
2. CDN: verify TypeScript devicon URL works
3. Theme: TypeScript SVG is colored (blue) — no inversion needed in dark mode

---

## Open Questions

1. Should Copilot and Supabase be added to spec CORE, or is spec aspirational-only?
2. Pill hover effect? (CORE items have hover, APRENDIENDO currently none)
3. Order: React → TypeScript or TypeScript → React?
