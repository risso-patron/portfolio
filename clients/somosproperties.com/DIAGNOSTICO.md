# somosproperties.com — Diagnóstico

_Última revisión: [fecha] — Revisado por: Jorge Luis_

---

## Problemas Críticos 🔴
> ~~**🚨 LOGO roto en el header**~~ — FALSO POSITIVO. Era Edge lazy loading intervention por red lenta. Imágenes confirmadas OK el 2026-05-16.
> ~~**🚨 Imágenes de propiedades rotas**~~ — FALSO POSITIVO. Mismo origen. Consola sin errores, todas las imágenes cargan correctamente.

## Mejoras Importantes 🟡
> No rompen nada, pero impactan experiencia.

- [ ] **Testimonios anónimos** — Carlos Mendoza, Elena Rodríguez, Diego Ortiz no tienen foto real ni empresa. En una transacción de $80K-$1.6M, los testimonios sin foto ni empresa real generan desconfianza.
- [ ] **El formulario de contacto no dice el tiempo de respuesta** — agregar "Respondemos en menos de 2 horas" aumenta la tasa de envío.
- [ ] **Sin sección de propiedades recién agregadas** — un banner de "Nuevo ingreso" o "Recién publicado" crea urgencia.

## Oportunidades de Upsell 💰
> Lo que puedo ofrecerle al cliente como servicio adicional.

- [ ] **Corrección de imágenes rotas** — trabajo técnico urgente, perfectamente justificado cobrar una tarifa de emergencia.
- [ ] **Mapa interactivo de propiedades** — Punta Pacífica, Condado del Rey, Arraiján, Calle 50. Un mapa con pins por precio ayuda a los compradores a decidir zona.
- [ ] **Alertas de nueva propiedad** — formulario de "Avísame cuando haya una propiedad en [zona] con [precio]" genera base de datos de leads calificados.

## SEO
- **Título de página:** "Propiedades que transforman vidas" — **no incluye "Panamá" ni "inmobiliaria" ni "comprar"**. Bajo potencial de búsqueda orgánica.
- **Meta descripción:** [confirmar]
- **Google Search Console:** [ ] Sin confirmar
- **Sitemap:** [x] Tiene páginas de Privacidad, Términos, Cookies — señal de que hay estructura SEO

## Performance
- **PageSpeed mobile:** 🔴 **51** — Rendimiento CRÍTICO / Accesibilidad 93 / Recomendaciones 100 / SEO 91
- **PageSpeed desktop:** 69 — Rendimiento 🟠 / Accesibilidad 93 / Recomendaciones 100 / SEO 91
- **Medido:** 2026-05-16 (antes del deploy de fixes)
- **Nota:** Score 51 mobile es rojo. En inmobiliaria, el 60-70% del tráfico viene de mobile. Causa probable: imágenes sin optimizar de Next.js Image, LCP alto en foto hero. Oportunidad de mejora con alto impacto en leads.

## Análisis Claude (Diagnoser)
> Análisis realizado el 2026-05-16

```
Sitio inmobiliario Next.js con estructura sólida. El problema crítico es que
las imágenes optimizadas de Next.js están fallando — logo y propiedades muestran
"Error al cargar imagen". Esto requiere intervención inmediata.

Fuera de eso: buen diseño, testimonios, propiedades bien categorizadas.
El SEO del título es débil. Los testimonios necesitan validación real.
```
