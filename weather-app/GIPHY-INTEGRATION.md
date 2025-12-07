# 🎬 INTEGRACIÓN GIPHY API - Weather App

## 📋 DESCRIPCIÓN

La Weather App ahora incluye **fondos animados dinámicos** usando la API de Giphy. Cada vez que el usuario busca una ciudad, se muestra un GIF relacionado con el clima actual como fondo del contenedor principal.

---

## ✨ CARACTERÍSTICAS

### 🎯 GIFs Contextuales
Los GIFs se seleccionan según:
- **Condición climática** (lluvia, nieve, despejado, nublado, tormenta, etc.)
- **Temperatura** (calor extremo, templado, frío)
- **Hora del día** (día/noche según ícono de OpenWeatherMap)

### 🔄 Variedad Garantizada
- **Sin repeticiones**: Sistema que evita mostrar el mismo GIF consecutivamente
- **50 opciones por búsqueda**: Cada hashtag retorna hasta 50 GIFs diferentes
- **Cache inteligente**: 20 GIFs recientes en memoria para evitar duplicados

### 🎨 Hashtags Inteligentes

#### ☀️ Clima Despejado
- **Día caluroso (>30°C)**: `sunny hot summer beach`
- **Día templado (20-30°C)**: `sunny day nature warm`
- **Día fresco (<20°C)**: `clear sky nature fresh`
- **Noche calurosa**: `starry night warm`
- **Noche fría**: `stars night sky cold`

#### 🌧️ Lluvia
- **Lluvia tropical (>20°C)**: `tropical rain nature`
- **Lluvia templada**: `rain window cozy`
- **Llovizna**: `soft rain nature peaceful`

#### ⛈️ Tormenta
- **Tormenta diurna**: `thunder storm dramatic`
- **Tormenta nocturna**: `lightning storm night`

#### ❄️ Nieve
- **Nevada diurna**: `snowfall winter landscape`
- **Nevada nocturna**: `snow night winter`

#### ☁️ Nublado
- **Muy nublado**: `cloudy sky dramatic`
- **Parcialmente nublado**: `partly cloudy nature`
- **Nubes nocturnas**: `cloudy night sky`

#### 🌫️ Niebla/Neblina
- **Niebla**: `fog nature mysterious`
- **Neblina diurna**: `fog nature morning`
- **Neblina nocturna**: `fog night eerie`

---

## 🔧 CONFIGURACIÓN

### 1. Obtener API Key de Giphy

**Opción A: Usar API Key Pública de Testing**
```javascript
// Ya incluida en config.js
GIPHY_API_KEY: 'GlVGYHkr3WSBnllca'
```
- ✅ **Gratis** y lista para usar
- ⚠️ **Límite**: 42 requests/hora
- 📌 **Ideal para**: Demos, desarrollo local, portfolio

**Opción B: Crear tu Propia API Key (Recomendado para Producción)**
1. Ve a [Giphy Developers](https://developers.giphy.com/)
2. Crea una cuenta gratuita
3. Crea una nueva app
4. Copia tu API Key
5. Agrégala a `.env`:

```bash
VITE_GIPHY_API_KEY=tu_api_key_real_aqui
```

### 2. Límites de API (Plan Gratuito)

| Plan | Requests/Hora | Requests/Día | Requests/Mes |
|------|---------------|--------------|--------------|
| **Testing** | 42 | 1,000 | N/A |
| **Beta** | 1,000 | 10,000 | 1,000,000 |

---

## 📂 ESTRUCTURA DE ARCHIVOS

### Archivos Modificados
```
weather-app/
├── js/
│   ├── config.js          ← API key de Giphy agregada
│   ├── giphy.js           ← NUEVO: Módulo Giphy
│   ├── ui.js              ← Importa y usa giphy.js
│   └── main.js            (sin cambios, usa ui.js)
├── css/
│   └── base.css           ← Container preparado para GIF de fondo
├── .env.example           ← Documentación de GIPHY_API_KEY
└── GIPHY-INTEGRATION.md   ← Este archivo
```

### Nuevo Módulo: `giphy.js`

**Funciones Exportadas:**
- `getWeatherGif(weatherData)` - Obtiene GIF según clima
- `applyGifBackground(gifUrl, container)` - Aplica GIF al fondo
- `clearGifBackground(container)` - Limpia el fondo

---

## 🎨 IMPLEMENTACIÓN TÉCNICA

### 1. Selección de Hashtag
```javascript
// Ejemplo: Tormenta nocturna con 25°C
const weatherData = {
    weather: [{ main: 'Thunderstorm', icon: '11n' }],
    main: { temp: 25 }
};

const hashtag = getWeatherHashtag(weatherData);
// → 'lightning storm night'
```

### 2. Request a Giphy API
```javascript
const url = `https://api.giphy.com/v1/gifs/search
  ?api_key=${GIPHY_API_KEY}
  &q=${hashtag}
  &limit=50
  &rating=g
  &lang=es`;
```

**Parámetros:**
- `q`: Hashtag de búsqueda
- `limit`: Número de resultados (50 máx)
- `rating`: `g` (contenido apropiado para todos)
- `lang`: `es` (priorizar GIFs en español)

### 3. Selección Aleatoria sin Repetición
```javascript
// Sistema de Set para evitar repeticiones
const recentGifs = new Set(); // Últimos 20 GIFs mostrados

// Filtrar GIFs no recientes
let availableGifs = gifs.filter(gif => !recentGifs.has(gif.id));

// Si todos fueron mostrados, resetear
if (availableGifs.length === 0) {
    recentGifs.clear();
    availableGifs = gifs;
}

// Seleccionar aleatoriamente
const randomGif = availableGifs[Math.floor(Math.random() * availableGifs.length)];
```

### 4. Aplicación de Fondo con Overlay
```javascript
container.style.backgroundImage = `
    linear-gradient(
        to bottom,
        rgba(10, 15, 30, 0.75),
        rgba(10, 15, 30, 0.85)
    ),
    url('${gifUrl}')
`;
```

**Overlay oscuro** (75-85% opacidad) para:
- ✅ Mantener legibilidad del texto
- ✅ Preservar contraste de la UI
- ✅ Efecto glassmorphism coherente

---

## 🧪 TESTING

### Probar Diferentes Climas
```javascript
// En consola del navegador:

// 1. Clima soleado
console.log(await getWeatherByCity('Dubai'));

// 2. Lluvia
console.log(await getWeatherByCity('Londres'));

// 3. Nieve
console.log(await getWeatherByCity('Moscú'));

// 4. Tormenta
console.log(await getWeatherByCity('Miami'));

// 5. Nublado
console.log(await getWeatherByCity('Seattle'));
```

### Verificar Cache
```javascript
// Buscar la misma ciudad 3 veces
await getWeatherByCity('Tokyo');
await getWeatherByCity('Tokyo');
await getWeatherByCity('Tokyo');

// Los GIFs deben ser diferentes cada vez
```

---

## 📊 MÉTRICAS DE PERFORMANCE

### Tiempo de Carga de GIF
- **Precarga**: GIF se carga en segundo plano con `Image.onload`
- **Fade-in**: Transición suave de 0.8s
- **Cache**: GIFs almacenados 10 minutos (reutilizables)

### Optimización
```javascript
// ✅ Precarga antes de mostrar
const img = new Image();
img.onload = () => {
    container.style.backgroundImage = `url('${gifUrl}')`;
};
img.src = gifUrl;

// ❌ Sin precarga (puede mostrar fondo blanco)
container.style.backgroundImage = `url('${gifUrl}')`;
```

---

## 🐛 TROUBLESHOOTING

### Problema: GIFs no se muestran
**Causa**: API Key inválida  
**Solución**: Verifica `config.js` línea con `getGiphyAPIKey()`

### Problema: Mismo GIF repetido
**Causa**: Cache muy agresivo  
**Solución**: Reduce `MAX_RECENT` en `giphy.js` línea 7

### Problema: Error CORS
**Causa**: Giphy API requiere HTTPS en producción  
**Solución**: Hostea en Netlify/Vercel (HTTPS automático)

### Problema: GIF no coincide con clima
**Causa**: Hashtag muy genérico  
**Solución**: Modifica `getWeatherHashtag()` para tu caso específico

---

## 🔮 MEJORAS FUTURAS

### Versión 2.0 (Planeado)
- [ ] **Modo de alto contraste**: GIF con overlay 95% para accesibilidad
- [ ] **Selección manual**: Botón para cambiar GIF sin cambiar ciudad
- [ ] **Favoritos**: Guardar GIFs favoritos en LocalStorage
- [ ] **Previsualización**: Thumbnails de 3 GIFs para elegir
- [ ] **Modo estático**: Opción para deshabilitar GIFs (ahorro de datos)
- [ ] **GIFs específicos por ciudad**: Madrid → Puerta del Sol, etc.

### Versión 3.0 (Exploración)
- [ ] **Video backgrounds**: Usando Pexels Videos API
- [ ] **GIFs estacionales**: Navidad, Halloween, Verano
- [ ] **Machine Learning**: Análisis de sentimiento del clima

---

## 📄 LICENCIA

**Giphy API**: [Giphy Attribution Requirements](https://developers.giphy.com/docs/api/schema#attribution)
- ✅ Uso gratuito permitido
- ⚠️ Mostrar logo de Giphy (opcional pero recomendado)
- 📌 No requerido para apps educativas/portfolio

**Código de integración**: MIT License (Jorge Luis Risso Patrón)

---

## 👤 AUTOR

**Jorge Luis Risso Patrón**
- GitHub: [@risso-patron](https://github.com/risso-patron)
- Portfolio: [risso-patron.github.io/portfolio](https://risso-patron.github.io/portfolio/)
- LinkedIn: [Jorge Luis Risso Patrón](https://linkedin.com/in/risso-patron)

---

## 📚 RECURSOS

- [Giphy API Docs](https://developers.giphy.com/docs/api)
- [Giphy SDK](https://developers.giphy.com/docs/sdk)
- [OpenWeatherMap Weather Conditions](https://openweathermap.org/weather-conditions)
- [CSS Background Images](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)

---

**Última actualización**: Diciembre 2025  
**Versión**: 1.0.0
