# Proposal: portfolio-hero-cleanup

## Intent

El portfolio actual sufre de **problemas críticos de credibilidad** que reducen el impacto profesional para búsqueda de trabajo como developer junior:

1. **Claims infladas**: Afirma "8+ Proyectos Completados" cuando solo 3-4 son verificables con demo funcional y código documentado. Los 4-5 restantes son proyectos cliente sin README, código privado, o incompletos (Studio Create "In Development").
2. **Stack confuso**: Posiciona como "vanilla JavaScript first" pero destaca React, Next.js, TypeScript, Supabase — tecnologías que el candidato está aprendiendo, no domina.
3. **Ausencia de posicionamiento laboral**: No existe mensaje explícito de "busco mi primera oportunidad como Frontend Developer" — reduce claridad del objetivo.
4. **Keywords SEO dispersas**: Meta tags mencionan "e-commerce", "real estate" — ruido que confunde el perfil profesional.

**Impacto**: Reclutadores perciben inflación de experiencia. Un junior honesto y verificable tiene mayor credibilidad que uno que infla.

## Scope

### In Scope
- Cambios de contenido/copy en `index.html` (stats, descripciones, skills)
- Reemplazo de meta tags SEO (title, description, keywords, OG, Twitter Card)
- Hero description y About section → "vanilla-first junior autodidacta de Panamá"
- Eliminación de proyectos no verificables (SEMM, Homepowerpty, HostPro, Provi Vivir, Somos Properties, Studio Create)
- Skills reorganizadas: CORE (HTML5, CSS3, JS, Git) vs. APRENDIENDO (React, TypeScript)
- CTA explícito en Contact: "Busco mi primera oportunidad como Frontend Developer"
- About stats: "Desde 2025", "4+ Proyectos Funcionales"

### Out of Scope
- Rediseño visual o cambios estructurales de CSS
- Creación de nuevos proyectos
- Cambios de layout HTML (estructura semántica se mantiene)
- Modificación de componentes JS de comportamiento (badge, profile card, contact form)

## Capabilities

### New Capabilities
- `portfolio-credibility`: Comunicación honesta del perfil junior con stats verificables, stack vanilla-first, objetivo laboral explícito, y solo proyectos 100% funcionales con demo activa.

### Modified Capabilities
*(ninguna — specs nuevas)*

## Approach

**Cleanup Conservative**: Cambios puramente de contenido/copy en `index.html`, sin modificación de estructura HTML, CSS ni JavaScript de comportamiento.

Pasos técnicos:
1. Actualizar `<title>`, meta description, keywords, OG, Twitter Card
2. Reescribir hero description → vanilla-first, junior explícito
3. Modificar About stats → "Desde 2025", "4+ Proyectos Funcionales"
4. Filtrar proyectos → solo 4 verificables con demo activa (Weather App, Pomodoro Timer, Budget Calculator, Budget App local)
5. Reorganizar skills → CORE / APRENDIENDO
6. Agregar CTA en Contact/footer → objetivo laboral explícito

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Meta tags, hero copy, about stats, projects (filtro a 4 reales), skills structure, footer CTA |
| `assets/css/main-new.css` | No change | Sin rediseño visual |
| `assets/js/main-new.js` | No change | Comportamiento de filtros/tabs no requiere lógica nueva |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Quitar 5 proyectos da impresión de portfolio "vacío" | Medium | 4 proyectos verificables con demos activas + READMEs sólidos es suficiente para junior |
| "Junior" en copy percibido como negativo | Low | Honestidad atrae mejor match; reclutadores buscan juniors humildes, no falsos seniors |
| Eliminar React/Next de skills reduce matches en job boards | Low | Mantener en sección "Aprendiendo" claramente visible |

## Rollback Plan

```bash
# Revertir el commit completo:
git revert <commit-hash>

# O restaurar solo index.html desde commit anterior:
git checkout HEAD~1 -- index.html
```

## Dependencies

- Ninguna dependencia externa
- No requiere build process (contenido estático)
