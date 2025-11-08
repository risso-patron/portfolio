# 🧪 Guía de Testing Responsive - Weather App

## 📋 Checklist de Dispositivos

Usa esta guía para probar el Weather App en todos los breakpoints implementados.

---

## 🖥️ Chrome DevTools (F12 → Toggle Device Toolbar)

### 📺 TV y Pantallas Grandes

#### TV 4K Ultra HD (3840×2160)
```
Dimensiones: 3840 × 2160
```
**✅ Checklist:**
- [ ] Temperatura muestra 20rem de tamaño
- [ ] Ícono del clima: 600px × 600px
- [ ] Grid weather details: 4 columnas
- [ ] Forecast: 5 días visibles en una fila
- [ ] Texto completamente legible a distancia
- [ ] Padding generoso (6rem)

#### TV Full HD (1920×1080)
```
Dimensiones: 1920 × 1080
```
**✅ Checklist:**
- [ ] Temperatura: 12rem
- [ ] Ícono del clima: 400px × 400px
- [ ] Grid weather details: 4 columnas
- [ ] Forecast: 5 días en una fila
- [ ] Container max-width: 1600px

#### Desktop 2K/QHD (2560×1440)
```
Dimensiones: 2560 × 1440
```
**✅ Checklist:**
- [ ] Temperatura: 9rem
- [ ] Ícono del clima: 300px × 300px
- [ ] Grid: 4 columnas
- [ ] Forecast: 5 días
- [ ] Layout centrado con padding 3rem

---

### 💻 Desktop y Laptops

#### Laptop L (1440×900)
```
Dimensiones: 1440 × 900
```
**✅ Checklist:**
- [ ] Temperatura: 8-9rem
- [ ] Ícono: 280-300px
- [ ] Grid: 4 columnas
- [ ] Forecast: 5 días

#### Desktop HD (1920×1080)
```
Dimensiones: 1920 × 1080
```
**✅ Checklist:**
- [ ] Mismo comportamiento que TV Full HD
- [ ] Container max-width: 1600px

---

### 📲 Tablets

#### iPad Pro 12.9" (1024×1366)
```
Preset: iPad Pro 12.9"
Orientation: Portrait & Landscape
```
**✅ Checklist Portrait:**
- [ ] Temperatura: 7rem
- [ ] Ícono: 250px
- [ ] Grid weather details: 3 columnas
- [ ] Forecast: 4 días por fila

**✅ Checklist Landscape:**
- [ ] Grid: 4 columnas
- [ ] Search form: horizontal (input + botón en fila)
- [ ] Forecast: 4-5 días

#### iPad (768×1024)
```
Preset: iPad
Orientation: Portrait & Landscape
```
**✅ Checklist Portrait:**
- [ ] Grid: 2 columnas
- [ ] Forecast: 2-3 días por fila
- [ ] Font-size reducido apropiadamente

**✅ Checklist Landscape:**
- [ ] Grid: 3 columnas
- [ ] Forecast: 4 días
- [ ] Search form horizontal

---

### 📱 Móviles

#### iPhone 14 Pro Max (430×932)
```
Preset: iPhone 14 Pro Max
Orientation: Portrait & Landscape
```
**✅ Checklist Portrait:**
- [ ] Temperatura: 5rem
- [ ] Ícono: 150px
- [ ] Grid: 2 columnas
- [ ] Forecast: 2 días por fila
- [ ] Touch targets: 44px mínimo

**✅ Checklist Landscape:**
- [ ] Grid: 4-5 columnas compactas
- [ ] Forecast: 5 días en fila
- [ ] Header y padding reducidos

#### iPhone 12/13/14 (390×844)
```
Preset: iPhone 12 Pro
Orientation: Portrait & Landscape
```
**✅ Checklist Portrait:**
- [ ] Temperatura: 4.5rem
- [ ] Ícono: 130px
- [ ] Grid: 2 columnas
- [ ] Font-size apropiado (clamp)

**✅ Checklist Landscape:**
- [ ] Grid: 4 columnas
- [ ] Layout optimizado para ancho

#### iPhone SE (375×667)
```
Preset: iPhone SE
Orientation: Portrait & Landscape
```
**✅ Checklist Portrait:**
- [ ] Temperatura: 3.5rem
- [ ] Ícono: 100px
- [ ] Grid: 1-2 columnas
- [ ] Forecast: 1 día por fila
- [ ] Texto legible sin zoom

**✅ Checklist Landscape:**
- [ ] Grid: 4 columnas
- [ ] Forecast compacto
- [ ] Header comprimido

---

## 🧪 Testing Manual

### Paso 1: Abrir DevTools
1. Abre `weather-app/index.html` en Chrome
2. Presiona `F12`
3. Click en ícono de device toolbar (Ctrl+Shift+M)

### Paso 2: Seleccionar Dispositivo
Prueba cada preset de la lista arriba:
- iPhone SE
- iPhone 12 Pro
- iPhone 14 Pro Max
- iPad
- iPad Pro
- Responsive (custom sizes)

### Paso 3: Probar Orientaciones
Para cada dispositivo:
1. **Portrait**: Rotación vertical
2. **Landscape**: Click en ícono de rotación

### Paso 4: Testing Interactivo

**En CADA dispositivo, verifica:**

#### ✅ Funcionalidad
- [ ] Búsqueda funciona correctamente
- [ ] Botones de unidad (°C/°F) se pueden clickear fácilmente
- [ ] Geolocalización funciona (botón de ubicación)
- [ ] Forecast carga correctamente

#### ✅ Layout
- [ ] No hay overflow horizontal (scroll lateral)
- [ ] Todos los elementos son visibles
- [ ] Grid se adapta al tamaño de pantalla
- [ ] Spacing apropiado (no muy apretado ni espaciado)

#### ✅ Tipografía
- [ ] Texto legible sin zoom
- [ ] Font-size apropiado para el dispositivo
- [ ] Line-height cómodo para leer
- [ ] No hay texto cortado o superpuesto

#### ✅ Touch Targets (Móviles/Tablets)
- [ ] Botones mínimo 44px × 44px
- [ ] Fácil de tocar sin equivocarse
- [ ] Input de búsqueda: tamaño adecuado
- [ ] No hay hover effects en táctiles

#### ✅ Performance
- [ ] Animaciones suaves (si están habilitadas)
- [ ] No hay lag al cambiar de ciudad
- [ ] Imágenes/iconos cargan rápido

---

## 🐛 Problemas Comunes

### ❌ Overflow Horizontal
**Síntoma**: Scroll lateral aparece en móviles  
**Solución**: Revisar elementos con width fijo, usar max-width: 100%

### ❌ Texto Cortado
**Síntoma**: Títulos o labels se cortan  
**Solución**: Usar `clamp()` o breakpoints adicionales

### ❌ Botones Muy Pequeños en Móvil
**Síntoma**: Difícil tocar botones en pantalla táctil  
**Solución**: Verificar min-height: 44px en @media (hover: none)

### ❌ Grid Roto
**Síntoma**: Columnas no se adaptan  
**Solución**: Revisar grid-template-columns en cada breakpoint

---

## 📊 Testing Sizes Custom

Si necesitas probar tamaños específicos:

```
Responsive Mode > Width × Height
```

**Tamaños adicionales recomendados:**
- `320 × 568` - iPhone 5/SE (antiguo)
- `360 × 640` - Android común
- `412 × 915` - Pixel 6
- `540 × 720` - Surface Duo
- `1366 × 768` - Laptop común
- `2560 × 1440` - Desktop 2K
- `3840 × 2160` - 4K

---

## 🎯 Resultado Esperado

Al final del testing, el Weather App debe:

✅ **Verse perfecto** en todos los dispositivos  
✅ **Ser usable** en móviles y tablets (touch)  
✅ **Ser legible** a distancia en TV  
✅ **No tener scroll horizontal** en ningún breakpoint  
✅ **Tener tipografía escalada** apropiadamente  
✅ **Grid adaptativo** según tamaño de pantalla

---

## 📝 Reportar Problemas

Si encuentras algún problema durante el testing:

1. **Screenshot** del problema
2. **Dispositivo/Tamaño** donde ocurre
3. **Descripción** de qué está mal
4. **Orientación** (portrait/landscape)

Ejemplo:
```
❌ PROBLEMA ENCONTRADO
Dispositivo: iPhone SE (375×667) - Portrait
Descripción: Forecast cards se superponen
Screenshot: [adjuntar]
```

---

**Happy Testing! 🚀**
