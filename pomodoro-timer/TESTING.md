# Guía de Testing - Pomodoro Timer

## Checklist de Funcionalidades

### Core Timer ✅
- [ ] Iniciar timer (25 minutos por defecto)
- [ ] Pausar timer manteniendo el tiempo
- [ ] Reiniciar timer al tiempo inicial
- [ ] Saltar sesión completándola inmediatamente
- [ ] Mostrar tiempo restante en formato MM:SS
- [ ] Barra de progreso visual

### Sesiones y Ciclos ✅  
- [ ] Sesión de Trabajo (25 min) → Descanso Corto (5 min)
- [ ] 4 Sesiones de Trabajo → Descanso Largo (15 min)
- [ ] Cambio automático de sesión al completar tiempo
- [ ] Indicadores visuales del tipo de sesión actual

### Configuración ✅
- [ ] Ajustar tiempo de trabajo (1-60 minutos)
- [ ] Ajustar descanso corto (1-60 minutos)  
- [ ] Ajustar descanso largo (1-60 minutos)
- [ ] Activar/desactivar sonidos
- [ ] Persistir configuración entre sesiones

### Notificaciones ✅
- [ ] Notificación del navegador al completar sesión
- [ ] Sonido sintético al completar sesión
- [ ] Notificaciones in-app (toast messages)
- [ ] Solicitar permisos de notificación automáticamente

### Estadísticas ✅
- [ ] Contar sesiones completadas del día
- [ ] Tiempo total de trabajo acumulado
- [ ] Racha actual de sesiones consecutivas
- [ ] Objetivo diario configurable
- [ ] Persistir estadísticas por día

### Interactividad ✅
- [ ] Atajo de teclado: Espacio = Play/Pause
- [ ] Atajo de teclado: Ctrl+R = Reset
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

### 2. Configuración
```
1. Ajustar tiempo de trabajo a 1 minuto
2. Iniciar timer → debe mostrar 01:00
3. Cambiar a 60 minutos → debe mostrar 60:00
4. Desactivar sonidos → verificar toggle cambia a "OFF"
```

### 3. Ciclo Completo
```
1. Configurar trabajo a 1 minuto, descanso corto a 30 segundos
2. Completar 1 sesión → debe cambiar a descanso corto
3. Completar descanso → debe volver a trabajo
4. Repetir 4 veces → debe mostrar descanso largo
```

### 4. Persistencia
```
1. Cambiar configuración
2. Recargar página (F5)
3. Verificar configuración se mantiene
4. Verificar estadísticas se mantienen
```

### 5. Responsive
```
1. Desktop: Probar en ventana 1200px+ de ancho
2. Tablet: Redimensionar a 800px de ancho
3. Móvil: Redimensionar a 350px de ancho
4. Verificar todos los elementos son accesibles
```

## URLs de Testing

- **Local**: `http://localhost:3000/pomodoro-timer/`
- **GitHub Pages**: `https://risso-patron.github.io/portfolio/pomodoro-timer/`

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