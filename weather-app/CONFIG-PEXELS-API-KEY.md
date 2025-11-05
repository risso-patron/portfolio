# 🎨 Configurar Pexels API para Fondos Realistas

## 📋 Instrucciones Paso a Paso

### 1️⃣ Obtener API Key de Pexels (GRATIS)

1. **Visita**: https://www.pexels.com/api/
2. **Haz clic** en "Get Started" o "Sign Up"
3. **Crea una cuenta** con tu email (o usa GitHub/Google)
4. **Ve al Dashboard**: https://www.pexels.com/api/documentation/
5. **Copia tu API Key** (aparece en "Your API Key")

---

### 2️⃣ Configurar en la App

1. **Abre el archivo**: `pexels-config.js`
2. **Reemplaza** `TU_PEXELS_API_KEY_AQUI` con tu API key real:

```javascript
const PEXELS_CONFIG = {
    API_KEY: '563492ad6f91700001000001abc123def456' // ← Tu API key aquí
};
```

3. **Guarda el archivo** (Ctrl+S)

---

### 3️⃣ Probar la Integración

1. **Abre la app** en el navegador: `http://localhost:8000/weather-app/index.html`
2. **Busca una ciudad**: por ejemplo "London"
3. **Observa**: El fondo debería cambiar a una foto realista del clima actual
4. **Prueba diferentes climas**:
   - Soleado → "Dubai"
   - Lluvioso → "London"
   - Nevado → "Moscow"
   - Nublado → "Seattle"

---

## 🔍 Resolución de Problemas

### ❌ "El fondo no cambia"
- **Verifica** que la API key esté correctamente copiada en `pexels-config.js`
- **Abre** DevTools Console (F12) y busca errores
- **Revisa** que `pexels-config.js` esté en la misma carpeta que `index.html`

### ❌ "Error 401 Unauthorized"
- Tu API key es inválida o incorrecta
- Copia nuevamente desde https://www.pexels.com/api/documentation/

### ❌ "Error 429 Too Many Requests"
- Has excedido el límite de 200 requests/hora
- Espera 1 hora o crea otra cuenta

---

## 📊 Límites de Pexels API (Plan Gratuito)

- ✅ **200 requests por hora**
- ✅ **20,000 requests por mes**
- ✅ **Uso ilimitado** (no expira)
- ✅ **Imágenes HD gratuitas**

Para una app personal, esto es MÁS que suficiente.

---

## 🎨 Cómo Funciona

La app mapea cada condición climática a búsquedas específicas en Pexels:

| Clima | Búsqueda en Pexels |
|-------|-------------------|
| ☀️ Clear | "blue sky sunny day clouds" |
| ☁️ Clouds | "cloudy overcast sky gray" |
| 🌧️ Rain | "rain drops window rainy weather" |
| ⛈️ Thunderstorm | "lightning storm dark clouds thunder" |
| ❄️ Snow | "snow falling winter landscape" |
| 🌫️ Mist | "fog misty morning nature" |
| 🌅 Dawn | "sunrise golden hour sky" |
| 🌇 Sunset | "sunset orange sky evening" |
| 🌃 Night | "starry night sky stars milky way" |

Cada búsqueda devuelve ~15 fotos HD, y la app selecciona una al azar para variedad.

---

## 🚀 Mejoras Futuras (Opcionales)

- **Cache de imágenes**: Guardar URLs en localStorage para evitar requests repetidos
- **Transición más suave**: Precargar 2-3 imágenes y alternarlas
- **Videos de fondo**: Pexels también tiene videos HD (requiere más código)

---

**¡Listo!** Una vez configurada la API key, tu Weather App tendrá fondos realistas profesionales 📸
