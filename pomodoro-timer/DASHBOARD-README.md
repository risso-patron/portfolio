# 🍅 Pomodoro Timer - Dashboard Profesional 2026

## ✨ Diseño Completamente Renovado

Transformación completa del Pomodoro Timer tradicional a un **dashboard profesional de productividad** con estadísticas avanzadas y visualización de datos.

---

## 🎯 Características Principales

### 1. 📊 **Panel de Estadísticas Completo**
- **4 Métricas Clave** con comparativas vs período anterior:
  - ⏱️ Tiempo Total de Foco (32h 45m, +12%)
  - ✅ Pomodoros Completados (78, +5%)
  - 🔥 Racha Actual (12 días)
  - 📊 Eficiencia Diaria (4.2h, -8%)

### 2. 📈 **Gráficos Interactivos (Chart.js 4.4.1)**
- **Gráfico de Barras**: Horas de foco por día de la semana
- **Gráfico de Dona**: Distribución de actividades
  - Trabajo Profundo: 65%
  - Estudio: 25%
  - Lectura: 10%

### 3. 📅 **Tabs de Períodos**
- Día
- Semana
- Mes
- Año

### 4. 📋 **Tabla de Sesiones Recientes**
- Fecha y hora de cada sesión
- Etiquetas categorizadas (Diseño, Investigación, Reunión, Codificación)
- Estado (Completado/Interrumpido)
- Duración
- Sistema de colores por categoría

### 5. ⏱️ **Temporizador Funcional**
- **3 Modos**:
  - Pomodoro: 25 minutos
  - Descanso Corto: 5 minutos
  - Descanso Largo: 15 minutos
- Controles: Iniciar/Pausar/Reiniciar
- Info en tiempo real: Pomodoros hoy, Tiempo hoy, Racha

### 6. 🎨 **Temas Dark/Light**
- Toggle instantáneo entre modos
- Gráficos adaptativos al tema
- Persistencia con LocalStorage
- Colores optimizados para cada tema

---

## 🏗️ Arquitectura

### Estructura del Archivo
```
index-new.html (todo-en-uno)
├── Estilos CSS (variables, componentes, responsive)
├── HTML (vistas de estadísticas y temporizador)
└── JavaScript (lógica, charts, timer, theme)
```

### Tecnologías
- ✅ **HTML5** semántico
- ✅ **CSS3** con variables y grid/flexbox
- ✅ **JavaScript Vanilla** (sin frameworks)
- ✅ **Chart.js 4.4.1** (gráficos)
- ✅ **LocalStorage** (persistencia tema)
- ✅ **Notifications API** (alertas desktop)

---

## 🎨 Sistema de Diseño

### Paleta de Colores

**Dark Mode:**
```css
--primary: #FF6347 (Tomate)
--secondary: #4ECDC4 (Turquesa)
--accent: #FFE66D (Amarillo)
--bg-dark: #0A0E27
--bg-card: #151A36
--text-primary: #F7F7FF
```

**Light Mode:**
```css
--bg-dark: #F3F4F6
--bg-card: #FFFFFF
--text-primary: #111827
--border-color: #E5E7EB
```

### Componentes Principales

1. **Stat Cards** - Métricas con íconos y cambios porcentuales
2. **Chart Cards** - Contenedores para gráficos con headers
3. **Sessions Table** - Tabla responsiva con badges de estado
4. **Timer Card** - Card central del temporizador
5. **Navigation** - Tabs y botones de navegación

---

## 📱 Responsive Design

### Breakpoints
```css
/* Desktop */
@media (min-width: 969px) → Grid 2 columnas para charts

/* Tablet */
@media (max-width: 968px) → Charts en 1 columna, header vertical

/* Mobile */
@media (max-width: 640px) → Stats 1 columna, controles verticales
```

### Optimizaciones Mobile
- ✅ Tabs con scroll horizontal
- ✅ Tabla responsiva con font-size reducido
- ✅ Botones de control full-width
- ✅ Session info en columna vertical
- ✅ Touch-friendly (padding generoso)

---

## 🔧 Funcionalidades JavaScript

### 1. **Theme Manager**
```javascript
toggleTheme() → Cambia entre dark/light
updateChartsTheme() → Actualiza colores de gráficos
localStorage → Persiste preferencia
```

### 2. **View Manager**
```javascript
showView('stats') → Muestra panel estadísticas
showView('timer') → Muestra temporizador
```

### 3. **Timer Logic**
```javascript
startTimer() → Inicia countdown
pauseTimer() → Pausa timer
resetTimer() → Reinicia a tiempo inicial
playNotification() → Notificación desktop
```

### 4. **Charts Creation**
```javascript
createDailyChart() → Gráfico de barras semanal
createDistributionChart() → Gráfico de dona distribución
updateChartsTheme() → Actualiza tema de gráficos
```

### 5. **Tabs Management**
```javascript
Event listeners en tabs → Filtro por período
```

---

## 📊 Datos de Demo

### Stats Cards
```javascript
{
  tiempoTotal: "32h 45m",
  cambio: "+12% vs semana pasada",
  pomodoros: 78,
  racha: "12 Días",
  eficiencia: "4.2h"
}
```

### Gráfico Semanal
```javascript
dias: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
horas: [5, 6, 6, 7, 4, 3, 3]
```

### Distribución
```javascript
actividades: [
  { nombre: 'Trabajo Profundo', porcentaje: 65, color: '#FF6347' },
  { nombre: 'Estudio', porcentaje: 25, color: '#4ECDC4' },
  { nombre: 'Lectura', porcentaje: 10, color: '#FFE66D' }
]
```

### Sesiones Recientes
```javascript
sesiones: [
  { fecha: 'Hoy', etiqueta: 'Diseño UI', duracion: '25 min', estado: 'Completado', hora: '14:30' },
  { fecha: 'Hoy', etiqueta: 'Investigación', duracion: '25 min', estado: 'Completado', hora: '13:00' },
  { fecha: 'Ayer', etiqueta: 'Reunión', duracion: '12 min', estado: 'Interrumpido', hora: '09:45' },
  { fecha: 'Ayer', etiqueta: 'Codificación', duracion: '50 min', estado: 'Completado', hora: '08:30' }
]
```

---

## 🎯 Habilidades Demostradas

### Frontend Junior
- ✅ **CSS Grid & Flexbox** (layouts complejos)
- ✅ **Chart.js Integration** (visualización de datos)
- ✅ **JavaScript ES6+** (arrow functions, template literals)
- ✅ **DOM Manipulation** (crear/actualizar elementos)
- ✅ **Event Handling** (clicks, timers, eventos custom)
- ✅ **LocalStorage API** (persistencia de preferencias)
- ✅ **Notifications API** (alertas desktop)
- ✅ **Responsive Design** (mobile-first approach)
- ✅ **Theme System** (dark/light mode completo)
- ✅ **CSS Variables** (sistema de diseño escalable)

### Buenas Prácticas
- ✅ **Código limpio** y comentado
- ✅ **Nombres descriptivos** de variables y funciones
- ✅ **Separación de responsabilidades** (tema, timer, charts)
- ✅ **Animaciones suaves** (UX mejorada)
- ✅ **Accesibilidad** (colores de alto contraste)
- ✅ **Performance** (destroy charts no implementado aún, pero preparado)

---

## 🚀 Cómo Usar

### Ver en Navegador
1. Abrir `index-new.html` en navegador
2. O acceder a: `http://localhost:8000/pomodoro-timer/index-new.html`

### Navegación
- **Botón "Estadísticas"** → Muestra dashboard completo
- **Botón "Temporizador"** → Muestra timer funcional
- **Toggle "Modo Oscuro/Claro"** → Cambia tema
- **Tabs (Día/Semana/Mes/Año)** → Filtra estadísticas
- **Gráfico ⋯** → Placeholder para opciones futuras

### Usar Timer
1. Click en **"Iniciar"** → Comienza countdown
2. Click en **"Pausar"** → Detiene temporalmente
3. Click en **"Reiniciar"** → Vuelve a tiempo inicial
4. Cambiar modo → Click en **Pomodoro/Descanso Corto/Largo**

---

## 🔮 Próximas Mejoras

### Backend Integration (Futuro)
- [ ] Conectar con API para datos reales
- [ ] Autenticación de usuarios
- [ ] Sincronización entre dispositivos
- [ ] Exportar estadísticas a CSV/PDF

### Funcionalidades
- [ ] **Etiquetas personalizadas** para tareas
- [ ] **Filtros avanzados** en tabla sesiones
- [ ] **Gráfico de tendencias** (línea de tiempo)
- [ ] **Comparativas** entre períodos
- [ ] **Metas diarias/semanales** configurables
- [ ] **Sonidos personalizables** para alarmas
- [ ] **Integración con Google Calendar**
- [ ] **Modo Focus** (bloqueo de distracciones)

### UX/UI
- [ ] **Animaciones de transición** entre vistas
- [ ] **Skeleton loaders** al cargar datos
- [ ] **Toast notifications** para feedback
- [ ] **Drag & drop** para reordenar sesiones
- [ ] **Tema custom** (selector de colores)

---

## 📊 Comparativa: Antes vs Después

| Aspecto | Versión Anterior | Nueva Versión |
|---------|------------------|---------------|
| **Diseño** | Timer básico centrado | Dashboard profesional con stats |
| **Gráficos** | ❌ No tenía | ✅ 2 gráficos interactivos (Chart.js) |
| **Estadísticas** | ❌ Básicas o inexistentes | ✅ 4 métricas con comparativas |
| **Navegación** | Una sola vista | ✅ 2 vistas (Timer + Stats) |
| **Tabla Sesiones** | ❌ No tenía | ✅ Historial completo con estados |
| **Responsive** | Limitado | ✅ Completamente responsive |
| **Temas** | Dark/Light simple | ✅ Sistema completo con charts adaptativos |
| **Períodos** | ❌ No tenía | ✅ Día/Semana/Mes/Año |
| **Categorías** | ❌ No tenía | ✅ Tags con colores |

---

## 🎓 Aprendizajes Técnicos

### Chart.js 4.4.1
- Configuración de gráficos de barras y dona
- Customización de tooltips
- Responsive charts con `maintainAspectRatio: false`
- Theme switching en charts
- Ocultar leyendas predeterminadas
- Custom colors y borderRadius

### CSS Grid Avanzado
```css
/* Grid adaptativo */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

/* Grid específico */
grid-template-columns: 2fr 1fr; /* 66% / 33% */
```

### JavaScript Moderno
```javascript
// Template literals para HTML dinámico
// Arrow functions para callbacks
// Dataset attributes (data-period, data-mode)
// Event delegation
// Destructuring (futuro con API)
```

---

## 👤 Autor

**Luis Risso Patrón**  
Desarrollador Web Frontend Junior  
📧 luisrissopa@gmail.com  
🐙 [@risso-patron](https://github.com/risso-patron)  
🌐 [Portfolio](https://risso-patron.github.io/portfolio/)

---

## 📄 Licencia

MIT License - Proyecto Portfolio

---

## 🔗 Enlaces

- **Demo Local**: `http://localhost:8000/pomodoro-timer/index-new.html`
- **GitHub Pages**: `https://risso-patron.github.io/portfolio/pomodoro-timer/index-new.html`
- **Repositorio**: `https://github.com/risso-patron/portfolio`

---

**Última actualización:** Enero 2026  
**Versión:** 2.0 Dashboard Edition  
**Inspiración:** Diseños modernos de dashboards de productividad
