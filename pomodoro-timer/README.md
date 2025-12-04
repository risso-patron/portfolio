# Pomodoro Timer

Aplicación web que implementa la técnica Pomodoro para mejorar la productividad mediante sesiones de trabajo cronometradas con descansos regulares.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Design-ff6b6b?style=flat)

## Características

- **Timer Configurable**: Ajusta los tiempos de trabajo (25min), descanso corto (5min) y largo (15min)
- **Notificaciones**: Alertas del navegador y sonidos personalizables
- **Estadísticas**: Seguimiento de sesiones completadas, tiempo total y rachas diarias
- **Persistencia**: Guarda configuración y estadísticas en LocalStorage
- **Responsive**: Optimizado para desktop, tablet y móvil
- **Atajos de Teclado**: Espacio para iniciar/pausar, Ctrl+R para reiniciar
- **Sonido Confiable**: Sistema de audio con fallbacks múltiples

## Demo

**[Ver Demo en Vivo](https://risso-patron.github.io/portfolio/pomodoro-timer/)**

## Capturas de Pantalla

*Screenshots serán agregadas después del deployment*

## Tecnologías Utilizadas

- **Frontend**: HTML5 semántico, CSS3 con variables y grid
- **JavaScript**: ES6+ con clases, async/await, LocalStorage
- **APIs**: Notifications API, Web Audio API
- **Responsive**: CSS Grid, Flexbox, Media Queries
- **Persistencia**: LocalStorage para configuración y estadísticas

## Uso

### Funcionamiento Básico
1. **Iniciar**: Haz clic en "Iniciar" o presiona Espacio
2. **Pausar**: Clic en "Pausar" o Espacio durante la sesión
3. **Reiniciar**: Volver al tiempo inicial de la sesión actual
4. **Saltar**: Completar la sesión actual inmediatamente

### Configuración
- **Tiempos**: Ajusta trabajo (1-60min), descanso corto y largo
- **Sonidos**: Activa/desactiva notificaciones sonoras
- **Ciclo Pomodoro**: 4 sesiones de trabajo → 1 descanso largo

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

### JavaScript Avanzado
- **Clases ES6**: Organización de código con constructor y métodos
- **Timing Preciso**: Uso de `Date.now()` con timestamps para evitar drift
- **Intervals**: Manejo de `setInterval` y `clearInterval` optimizado
- **LocalStorage**: Persistencia de datos entre sesiones
- **Event Listeners**: Manejo de eventos de teclado y clic

### APIs del Navegador
- **Notifications API**: Permisos y notificaciones del sistema
- **Web Audio API**: Generación de sonidos sintéticos con fallbacks
- **HTML5 Audio**: Implementación de audio confiable multiplataforma
- **Document Title**: Actualización dinámica del título

### CSS Moderno
- **Variables CSS**: Sistema de design tokens
- **CSS Grid**: Layout de estadísticas responsive
- **Animations**: Efectos suaves y feedback visual
- **Progressive Enhancement**: Funcionalidad core sin JavaScript

### UX/UI
- **Estados de Loading**: Feedback visual durante transiciones
- **Accessibility**: ARIA labels, roles semánticos, navegación por teclado
- **Focus States**: Indicadores visuales claros para navegación con teclado
- **Mobile-First**: Diseño responsive desde dispositivos pequeños
- **Contraste**: Cumple WCAG 2.1 AA para legibilidad

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
- ✅ **ARIA labels** descriptivos

## Autor

**Jorge Luis Risso Patrón**
- GitHub: [@risso-patron](https://github.com/risso-patron)
- Portfolio: [risso-patron.github.io/portfolio](https://risso-patron.github.io/portfolio/)
- Email: luisrissopa@gmail.com

## Licencia

MIT License - Libre para uso personal y comercial

---

*Construido con JavaScript vanilla como parte de mi portfolio de desarrollo frontend*