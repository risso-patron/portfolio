# Guía de Testing - Pomodoro Timer

## Checklist de Funcionalidades

### Core Timer ✅
- [ ] Iniciar timer (25 minutos por defecto, modo Pomodoro)
- [ ] Pausar timer manteniendo el tiempo (mismo botón alterna Pausar/Reanudar)
- [ ] Reiniciar timer al tiempo inicial del modo actual
- [ ] Mostrar tiempo restante en formato MM:SS
- [ ] Anillo de progreso SVG visual

### Modos (cambio manual, sin ciclo automático) ✅
- [ ] Botones Pomodoro / Descanso Corto / Descanso Largo cambian el modo activo
- [ ] Al completarse un Pomodoro NO cambia solo a descanso — requiere clic manual en el modo deseado
- [ ] No existe un contador de "4 sesiones → descanso largo"; los 3 modos son independientes
- [ ] Indicadores visuales del tipo de sesión actual (botón activo resaltado)

### Duraciones ✅
- [ ] Trabajo = 25 min, Descanso Corto = 5 min, Descanso Largo = 15 min (fijas, no hay UI para ajustarlas)
- [ ] No existe panel de configuración ni toggle de sonido on/off

### Notificaciones ✅
- [ ] Notificación del navegador al completar sesión (requiere permiso concedido)
- [ ] Sonido de alarma (`new Audio()` con archivo externo, no sintetizado) al completar sesión
- [ ] Solicitar permisos de notificación automáticamente al cargar (si el permiso está en "default")

### Estadísticas ✅
- [ ] Contar sesiones completadas del día
- [ ] Tiempo total de trabajo acumulado
- [ ] Racha actual de sesiones consecutivas
- [ ] Objetivo diario configurable
- [ ] Persistir estadísticas por día

### Interactividad ✅
- [ ] No hay atajos de teclado (Espacio/Ctrl+R) — cero listeners de teclado en el código, solo clic
- [ ] Título de página actualizado con tiempo restante
- [ ] Animaciones suaves en transiciones

### Responsive Design ✅
- [ ] Desktop (1200px+): Diseño completo
- [ ] Tablet (768-1199px): Adaptado a pantalla media
- [ ] Móvil (320-767px): Layout vertical optimizado
- [ ] Touch targets mínimo 44px

## Testing Manual

### 1. Funcionalidad Básica
```
1. Abrir la aplicación
2. Verificar timer muestra 25:00
3. Clic en "Iniciar" → debe comenzar countdown
4. Clic en "Pausar" → debe pausar en el tiempo actual
5. Clic en "Reiniciar" → debe volver a 25:00
```

### 2. Cambio de Modo (manual)
```
1. Clic en "Descanso Corto" → debe mostrar 05:00 y resaltar ese botón
2. Clic en "Descanso Largo" → debe mostrar 15:00
3. Clic en "Pomodoro" → vuelve a 25:00
4. No hay forma de ajustar estas duraciones desde la UI
```

### 3. Completar un Pomodoro
```
1. Modo Pomodoro, clic en "Iniciar" y esperar a que llegue a 00:00
2. Debe sonar la alarma, dispararse la notificación (si hay permiso) y el timer
   debe resetear solo a 25:00 — pero el MODO no cambia automáticamente a descanso
3. Pomodoros Hoy/Tiempo Hoy deben incrementar; completar Descanso Corto/Largo
   NO los incrementa (solo currentMode === 'pomodoro' llama a savePomodoro())
```

### 4. Persistencia
```
1. Completar un Pomodoro (o dejar que corra un rato)
2. Recargar página (F5)
3. Verificar que Pomodoros Hoy / Tiempo Hoy / Racha se mantienen
4. Verificar que el conteo de "hoy" usa la fecha LOCAL, no UTC
```

### 5. Responsive
```
1. Desktop: Probar en ventana 1200px+ de ancho
2. Tablet: Redimensionar a 800px de ancho
3. Móvil: Redimensionar a 350px de ancho
4. Verificar todos los elementos son accesibles
```

## URLs de Testing

- **Local**: `http://localhost:5173/pomodoro-timer/` (servidor de desarrollo del monorepo, `scripts/dev-server.js`, Node `http` plano)
- **Producción**: `https://www.risso-patron.com/pomodoro-timer/`
- GitHub Pages (`risso-patron.github.io/portfolio/pomodoro-timer/`) NO funciona como demo: `index.html` tiene `<base href="/pomodoro-timer/">`, así que CSS/JS/íconos resuelven contra la raíz del dominio en vez de `/portfolio/pomodoro-timer/`

## Casos Edge

### Notificaciones
- Probar con permisos denegados
- Probar con permisos concedidos  
- Verificar fallback si no se soportan

### Timing
- Pausar en el último segundo
- Cambiar configuración durante sesión activa
- Cerrar pestaña y volver durante sesión

### Datos
- Borrar LocalStorage y recargar
- Cambiar fecha del sistema
- Llenar estadísticas con números grandes

## Bugs Conocidos

Ninguno reportado actualmente.

## Performance

- Carga inicial: < 1 segundo
- Uso de memoria: < 10MB
- CPU idle: 0% cuando pausado
- CPU activo: < 1% durante countdown

---

**Nota**: Este timer utiliza `setInterval` con intervalo de 1 segundo. Para mayor precisión, considerar `performance.now()` en versiones futuras.