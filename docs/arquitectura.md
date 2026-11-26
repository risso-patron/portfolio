# Arquitectura del portfolio

## Índice

1. [Resumen](#resumen)
2. [Estructura](#estructura)
3. [Flujo de build](#flujo-de-build)
4. [Comandos](#comandos)
5. [Cómo agregar contenido](#cómo-agregar-contenido)
6. [ADR-001: generador propio en lugar de un framework](#adr-001-generador-propio-en-lugar-de-un-framework)

## Resumen

Sitio estático bilingüe (ES/EN) sin dependencias de ejecución. Un script de Node
renderiza plantillas escritas como funciones de JavaScript y escribe el resultado
en `dist/`, que es lo único que se publica. Las funciones de `api/` siguen en la
raíz para Vercel.

## Estructura

```
src/
  site.config.js     rutas, idiomas, qué se copia a dist/ y qué se excluye
  i18n/es.js, en.js  todo el texto del sitio (mismas claves en ambos)
  components/        layout, iconos (sprite SVG), filas de trabajo, utilidades HTML
  pages/home.js      página de inicio
  pages/case.js      plantilla de las páginas de caso
assets/              CSS, JS, fuentes autoalojadas (OFL), imágenes
scripts/build.js     generador + validaciones
scripts/dev-server.js servidor local sobre dist/
api/                 funciones serverless (clima, giphy)
```

## Flujo de build

```
es.js ─┐                         ┌─> dist/index.html, dist/en.html
en.js ─┼─> paridad de claves ──> render ─> dist/trabajo/*.html, dist/en/work/*.html
       │                         ├─> copia PUBLIC_COPY (menos PUBLIC_EXCLUDE)
pages/ ┘                         ├─> sitemap.xml con hreflang
                                 └─> validación: enlaces, anclas, marcadores
```

El build falla si:

- falta una clave en un idioma;
- un enlace interno o un ancla no existe en `dist/`;
- queda `undefined`, `[object Object]` o un marcador sin reemplazar en el HTML.

Solo se publica lo que está en `PUBLIC_COPY`. Carpetas internas del repo
(`budget-app/`) no llegan a `dist/`, y
la CI lo comprueba.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Genera `dist/` y valida |
| `npm run dev` | Build + servidor local en `dist/` |
| `npm start` | Solo servidor local (sin rebuild) |
| `npm run check` | Comprobación de sintaxis de API y scripts |

## Cómo agregar contenido

- **Texto:** editar `src/i18n/es.js` y `src/i18n/en.js` con las mismas claves.
- **Nuevo caso:** agregar la ruta en `ROUTES` de `site.config.js` con
  `template: 'case'`, el contenido en `cases.<id>` de ambos diccionarios, sus
  imágenes en `assets/images/projects/<id>/` (y en `PUBLIC_COPY`), y el id en
  `CASE_ORDER` de `src/pages/case.js`.
- **Nueva sección en la home:** su id de ancla va en `ids` de cada idioma.

## ADR-001: generador propio en lugar de un framework

- **Estado:** aceptado (noviembre 2026).
- **Contexto:** el sitio antiguo ensamblaba parciales HTML solo en español y
  duplicaba la versión inglesa a mano. Hacían falta rutas por idioma, páginas de
  caso y validación, sin cambiar de stack.
- **Decisión:** un generador de unos cientos de líneas en Node con plantillas como
  funciones de JavaScript, sin dependencias.
- **Consecuencias:** cero dependencias y control total del HTML. A cambio, no hay
  hot reload ni componentes con estado. Si el sitio necesitara blog, MDX o
  interactividad compleja, migrar a Astro sería el paso natural: las plantillas y
  los diccionarios se trasladan casi directamente.
