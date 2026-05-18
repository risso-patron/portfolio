# homepowerpty.com — Diagnóstico

_Última revisión: [fecha] — Revisado por: Jorge Luis_

---

## Problemas Críticos 🔴
> Afectan conversión o funcionamiento. Resolver primero.

- [ ] **Carrusel de clientes duplicado** — la sección "Nuestros Clientes" repite los mismos logos dos veces. Parece un bug de loop infinito. Desconfianza visual.
- [ ] **Sin precio visible en ningún producto** — el usuario no sabe si los productos son para su presupuesto antes de contactar. Genera friction. Al menos un rango ("desde $X") ayudaría a pre-calificar.
- [ ] **Formulario de empleo mezclado con el flujo de ventas B2B** — la sección "Oportunidades Laborales" aparece en la misma página que el catálogo. Distrae al comprador B2B con una propuesta diferente.

## Mejoras Importantes 🟡
> No rompen nada, pero impactan experiencia.

- [ ] **Catálogo sin filtro en la homepage** — hay 60+ productos en scroll continuo. Un filtro por categoría (Air Fryers / Licuadoras / Estufas) reduciría el tiempo para encontrar el producto.
- [ ] **CTA principal poco claro para B2B** — el hero dice "Potencia e Innovación para tu hogar". El negocio es B2B (distribuidores, retail). El mensaje debería decir algo como "Distribuidor B2B de electrodomésticos para Panamá".
- [ ] **Sección "Conoce Home Power" aparece al final** — la propuesta de valor B2B (stock exclusivo, garantía, entrega inmediata) debería estar más arriba, justo después del hero.

## Oportunidades de Upsell 💰
> Lo que puedo ofrecerle al cliente como servicio adicional.

- [ ] **Ficha técnica descargable por producto (PDF)** — los compradores B2B necesitan presentarle la ficha a su jefe o comprador. Un PDF descargable por producto aumenta el % de cierre.
- [ ] **Página de "Cómo comprar al por mayor"** — proceso en 3 pasos: contactar → recibir cotización → recibir pedido. Reduce el tiempo de respuesta del cliente.
- [ ] **WhatsApp con menú automatizado** (WhatsApp Business API) — cuando alguien escribe fuera de horario, responder automáticamente con las categorías disponibles.

## SEO
- **Título de página:** "Potencia e Innovación para tu hogar" — **demasiado genérico, no incluye "Panamá" ni "B2B" ni "electrodomésticos"**
- **Meta descripción:** [confirmar — probablemente genérica también]
- **Google Search Console:** [ ] Sin confirmar
- **Sitemap:** [ ] Sin confirmar

## Performance
- **PageSpeed mobile:** 80 — Rendimiento 🟠 / Accesibilidad 95 / Recomendaciones 96 / SEO 100
- **PageSpeed desktop:** 87 — Rendimiento 🟠 / Accesibilidad 95 / Recomendaciones 96 / SEO 100
- **Medido:** 2026-05-16
- **Nota:** Mobile 80 es aceptable pero mejorable. El catálogo con 60+ imágenes webp es el principal sospechoso. LCP probable en el hero image.

## Análisis Claude (Diagnoser)
> Análisis realizado el 2026-05-16

```
Sitio B2B de distribución de electrodomésticos. Funciona. Los CTAs de WhatsApp
por producto (con mensaje pre-llenado) son un punto fuerte claro.

Principales problemas:
1. Título/hero orientado a B2C, no B2B
2. Carrusel de clientes con loop duplicado (bug)
3. Sin precios visibles (friction alta para leads fríos)
4. Sección de empleos mezclada con el flujo de venta
```
