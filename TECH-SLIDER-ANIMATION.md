# 🎨 Tech Stack Slider Animation

## ✨ Características Implementadas

### 1. **Carrusel Infinito de Tecnologías**
- ✅ Animación continua de izquierda a derecha
- ✅ Efecto espejo (scroll reverso) para variedad visual
- ✅ Transición suave sin cortes

### 2. **Secciones Implementadas**
1. **Front-End**: HTML5, CSS3, Bootstrap, React, Vite, Figma, Tailwind
2. **Back-End - BaaS**: Supabase, Node.js, Express, TypeScript, JavaScript, Python, MongoDB, PostgreSQL, MySQL, Java
3. **Control de versiones**: Git, GitHub

### 3. **Efectos Visuales**
- 🎯 Íconos en escala de grises por defecto
- 🌈 Color completo al hacer hover
- 🔍 Efecto zoom (scale 1.1) en hover
- ⏸️ Pausa de animación al pasar el mouse
- 🌓 Gradientes laterales para efecto fade in/out

### 4. **Responsive Design**
- **Desktop**: Íconos 80x80px, gap 3rem
- **Mobile**: Íconos 60x60px, gap 2rem
- Animación fluida en todos los tamaños

## 🎬 Animaciones CSS

### Scroll Left (Front-End, Control de versiones)
```css
@keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
```
- Duración: 30 segundos
- Dirección: ← (izquierda)

### Scroll Right (Back-End)
```css
@keyframes scroll-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
}
```
- Duración: 30 segundos
- Dirección: → (derecha)

## 🎨 Modo Oscuro

Los sliders se adaptan automáticamente al tema:

**Light Mode**:
- Íconos: `filter: grayscale(100%)`
- Fondo: `var(--bg-light)`

**Dark Mode**:
- Íconos: `filter: grayscale(100%) brightness(1.2)`
- Fondo: `var(--bg-light)` (adaptado)
- Gradientes laterales ajustados

## 📦 Tecnología Utilizada

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones, gradientes, transformaciones
- **DevIcons CDN**: `https://cdn.jsdelivr.net/gh/devicons/devicon`
- Sin JavaScript (100% CSS puro)

## 🔧 Cómo Funciona

1. **Duplicación de elementos**: Cada ícono se duplica para crear el efecto infinito
2. **Transform translateX**: Desplaza el contenedor horizontalmente
3. **width: max-content**: Permite que el slider sea más ancho que su contenedor
4. **overflow: hidden**: Oculta los íconos que salen del viewport
5. **Gradientes laterales**: Crean efecto de fade in/out en los bordes

## 🎯 Ventajas

- ✅ Sin JavaScript necesario
- ✅ Performance óptimo (CSS puro)
- ✅ Compatible con todos los navegadores modernos
- ✅ Responsive y adaptable
- ✅ Accesible (no interfiere con lectores de pantalla)

## 📝 Personalización Futura

Para agregar más tecnologías:
1. Agrega el `<div class="tech-slide">` con la imagen
2. Duplica el elemento al final (para efecto infinito)
3. Ajusta la velocidad modificando la duración de la animación

Para cambiar velocidad:
```css
.tech-slider {
    animation: scroll-left 30s linear infinite; /* Cambiar 30s */
}
```

Valores recomendados:
- **Rápido**: 20s
- **Normal**: 30s ⭐ (actual)
- **Lento**: 45s

---

**Fecha**: Noviembre 2025  
**Autor**: Jorge Luis Risso Patrón  
**Versión**: 1.0
