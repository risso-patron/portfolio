# Pomodoro Timer

Aplicación web que implementa la técnica Pomodoro para mejorar la productividad mediante sesiones de trabajo cronometradas con descansos regulares.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Design-ff6b6b?style=flat)

## Características

- **Timer con 3 modos**: Pomodoro (25min), descanso corto (5min) y descanso largo (15min), duraciones fijas
- **Cambio de modo manual**: los botones Pomodoro/Descanso Corto/Descanso Largo cambian el modo activo; no hay ciclo automático de trabajo→descanso
- **Notificaciones**: Notification API del navegador (si el usuario concede permiso) más un sonido de alarma
- **Estadísticas**: Seguimiento de sesiones completadas, tiempo total y rachas diarias
- **Persistencia**: Guarda estadísticas en LocalStorage
- **Responsive**: Ajustes para evitar overflow y solapes en móvil (390/375/360px) y tablet (768px)
- **Sonido**: Dos archivos de audio externos (`new Audio(url)`) para clic y alarma, sin generación sintética

## Demo

**[Ver Demo en Vivo](https://www.risso-patron.com/pomodoro-timer/)**

## Capturas de Pantalla

*Screenshots serán agregadas después del deployment*

## Tecnologías Utilizadas

- **Frontend**: HTML5 semántico, CSS3 con variables y grid
- **JavaScript**: ES6+, LocalStorage
- **APIs**: Notifications API, HTML5 Audio (`new Audio()`)
- **Responsive**: Flexbox, Grid, Media Queries puntuales
- **Persistencia**: LocalStorage para configuración y estadísticas

## Uso

### Funcionamiento Básico
1. **Iniciar**: Haz clic en "Iniciar" (no hay atajos de teclado; no existen listeners de teclado en el código)
2. **Pausar/Reanudar**: El mismo botón alterna entre pausar y reanudar la sesión
3. **Reiniciar**: Clic en "Reiniciar" para volver al tiempo inicial del modo actual
4. **Cambiar de modo**: Clic en Pomodoro / Descanso Corto / Descanso Largo (no hay botón "Saltar")

### Duraciones y modos
- **Trabajo, descanso corto y descanso largo son duraciones fijas** (25/5/15 min) — no hay panel de configuración para ajustarlas
- El cambio entre Pomodoro → Descanso es **manual**: al completarse un Pomodoro no avanza solo a un descanso; el usuario elige el siguiente modo con los botones

### Estadísticas
- Sesiones completadas del día
- Tiempo total de trabajo
- Racha actual de sesiones consecutivas
- Objetivo diario personalizable

## Técnica Pomodoro

Desarrollada por Francesco Cirillo en los 80s:

1. **25 minutos** de trabajo concentrado
2. **5 minutos** de descanso corto
3. Repetir 4 veces
4. **15-30 minutos** de descanso largo

### Beneficios
- Mejora la concentración y enfoque
- Reduce la fatiga mental
- Aumenta la productividad
- Facilita la estimación de tareas

## Aprendizajes

Lo que aprendí construyendo este proyecto:

### JavaScript
- **Funciones y estado global**: `let`/`const` para el estado del timer (modo actual, tiempo restante)
- **Intervals**: Manejo de `setInterval` y `clearInterval` (decremento simple de un contador, sin corrección de drift por timestamp)
- **LocalStorage**: Persistencia de estadísticas entre sesiones, con fecha local (no UTC) para el corte de "día"
- **Event Listeners**: Manejo de eventos de clic (no hay atajos de teclado)

### APIs del Navegador
- **Notifications API**: Permisos y notificaciones del sistema
- **HTML5 Audio**: Dos objetos `new Audio(url)` (clic y alarma) apuntando a archivos externos, sin generación sintética ni cadena de fallbacks
- **Document Title**: Actualización dinámica del título

### CSS Moderno
- **Variables CSS**: Sistema de design tokens
- **CSS Grid/Flexbox**: Layout de estadísticas y timer
- **Animations**: Efectos suaves y feedback visual
- **Media Queries puntuales**: Ajustes para evitar overflow horizontal y solapes en móvil

### UX/UI
- **Estados de Loading**: Feedback visual durante transiciones
- **Accessibility**: `aria-label` en controles clave, `role="timer"` + `aria-live="polite"` en el countdown
- **Focus States**: Outline nativo del navegador (no está suprimido en los botones)
- **Mobile-First**: Ajustes puntuales para los anchos más comunes (360-768px)
- **Contraste**: Los estados activos sobre `--primary` (nav/tabs/modo/botón principal) cumplen WCAG AA (~6.36:1)

## Próximas Mejoras

- [ ] **PWA completa** con Service Worker y funcionamiento offline
- [ ] **Exportar estadísticas** a CSV/JSON  
- [ ] **Temas personalizables** (oscuro/claro con más variantes)
- [ ] **Integración con Spotify** para música de fondo
- [ ] **Gráficos de productividad** semanal/mensual
- [ ] **Sincronización en la nube** (Firebase/Supabase)
- [ ] **Pomodoros por proyecto** con categorías personalizadas

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/risso-patron/portfolio.git

# Navegar al proyecto
cd portfolio/pomodoro-timer

# Abrir en navegador
open index.html
# O usar un servidor local
python -m http.server 3000
```

## Estructura del Proyecto

```
pomodoro-timer/
├── index.html          # Aplicación principal
├── README.md          # Documentación
└── screenshots/       # Capturas de pantalla
```

## Navegadores Compatibles

- Chrome/Edge 60+ ✅
- Firefox 55+ ✅
- Safari 11+ ✅
- Chrome Mobile 60+ ✅
- Safari Mobile 11+ ✅

### Características de Accesibilidad

- ✅ **WCAG 2.1 Nivel AA** compliance
- ✅ **Lectores de pantalla** compatibles (NVDA, JAWS, VoiceOver)
- ✅ **Navegación por teclado** completa
- ✅ **Focus states** visibles
- ✅ **Zoom sin límites** (hasta 500%+)
- ✅ **ARIA labels** en el botón "Volver" y en el campo de tarea (`#focusInput`); el countdown usa `role="timer"` + `aria-live="polite"`

## Autor

**Jorge Luis Risso Patrón**
- GitHub: [@risso-patron](https://github.com/risso-patron)
- Portfolio: [risso-patron.github.io/portfolio](https://risso-patron.github.io/portfolio/)
- Email: luisrissopa@gmail.com

## Licencia

MIT License - Libre para uso personal y comercial

---

*Construido con JavaScript vanilla como parte de mi portfolio de desarrollo frontend*