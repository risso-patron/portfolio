# 🔒 Guía de Seguridad - Weather App

## 📋 Tabla de Contenidos
1. [Protección de API Keys](#protección-de-api-keys)
2. [Rate Limiting](#rate-limiting)
3. [Variables de Entorno](#variables-de-entorno)
4. [Mejores Prácticas](#mejores-prácticas)

---

## 🔐 Protección de API Keys

### ⚠️ El Problema

**NUNCA** hagas esto en producción:

```javascript
// ❌ MAL - API key expuesta en código
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
```

**Riesgos:**
- Cualquiera puede ver tu API key en el código fuente
- Pueden copiarla y usar tu quota de API
- Si tienes un plan de pago, pueden generar costos
- Si la key se expone, debes regenerarla

---

## ✅ Soluciones Implementadas

### Opción 1: Variables de Entorno (RECOMENDADO)

Para proyectos con bundler (Vite, Webpack, etc.):

```javascript
// ✅ BIEN - Usando variables de entorno
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

**Setup:**

1. Crear archivo `.env` en la raíz:
```bash
VITE_OPENWEATHER_API_KEY=tu_api_key_real
VITE_DEMO_MODE=false
```

2. Agregar `.env` al `.gitignore`:
```gitignore
.env
.env.local
.env.production
```

3. Usar `.env.example` como template:
```bash
cp .env.example .env
# Editar .env con tus keys reales
```

4. En plataformas de hosting (Netlify, Vercel):
   - Ir a Settings → Environment Variables
   - Agregar `VITE_OPENWEATHER_API_KEY`
   - No subir nunca el archivo `.env`

---

### Opción 2: Backend Proxy (MÁS SEGURO)

Para producción real, lo ideal es un backend que oculte la API key:

```
Cliente (Browser)
    ↓
    GET /api/weather?city=Panama
    ↓
Backend (Node.js/Python)
    - Lee API key del servidor (.env)
    - Hace request a OpenWeatherMap
    - Retorna datos al cliente
```

**Ventajas:**
- ✅ API key 100% oculta
- ✅ Control total de requests
- ✅ Puedes agregar autenticación
- ✅ Logs y analytics

**Ejemplo backend simple (Node.js):**

```javascript
// server.js
const express = require('express');
require('dotenv').config();

const app = express();

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const API_KEY = process.env.OPENWEATHER_API_KEY; // ← Seguro en servidor
    
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
});

app.listen(3000);
```

---

### Opción 3: Sistema de Prioridades (IMPLEMENTADO)

Nuestra solución actual en `js/config.js`:

```javascript
const getAPIKey = () => {
    // 1️⃣ Prioridad 1: Variables de entorno (bundler)
    if (import.meta.env?.VITE_OPENWEATHER_API_KEY) {
        return import.meta.env.VITE_OPENWEATHER_API_KEY;
    }
    
    // 2️⃣ Prioridad 2: Variable window (archivo externo)
    if (window.WEATHER_CONFIG?.API_KEY) {
        return window.WEATHER_CONFIG.API_KEY;
    }
    
    // 3️⃣ Fallback: Hardcoded (SOLO desarrollo)
    return 'YOUR_OPENWEATHER_API_KEY';
};
```

**Cómo funciona:**
1. Si usas Vite/Webpack → lee de `.env`
2. Si tienes archivo externo → lee de `window.WEATHER_CONFIG`
3. Fallback hardcoded (solo para desarrollo local)

---

## ⏱️ Rate Limiting

### Problema

OpenWeatherMap Free tier:
- ✅ 60 llamadas/minuto
- ✅ 1,000,000 llamadas/mes

**Sin control:**
- Podrías exceder el límite accidentalmente
- La API retornaría error 429
- En planes de pago, generarías costos extra

---

### Solución Implementada

Sistema de rate limiting en `js/api.js`:

```javascript
const rateLimiter = {
    calls: [], // Timestamps de llamadas
    
    canMakeCall() {
        // Limpia llamadas > 1 minuto
        const oneMinuteAgo = Date.now() - 60000;
        this.calls = this.calls.filter(t => t > oneMinuteAgo);
        
        // Verifica límite
        if (this.calls.length >= 60) {
            console.warn('⚠️ Rate limit alcanzado');
            return false;
        }
        
        // Advertencia al 83% (50/60)
        if (this.calls.length >= 50) {
            console.warn(`⚠️ ${this.calls.length}/60 llamadas`);
        }
        
        return true;
    },
    
    recordCall() {
        this.calls.push(Date.now());
    }
};
```

**Uso:**

```javascript
// Antes de cada fetch
if (!rateLimiter.canMakeCall()) {
    throw new Error('Límite alcanzado. Espera 1 minuto');
}

await fetch(url);

// Después del fetch exitoso
rateLimiter.recordCall();
```

**Features:**
- ✅ Bloquea requests si excedes 60/min
- ✅ Advertencia al 83% del límite (50/60)
- ✅ Logs informativos en consola
- ✅ Estadísticas en tiempo real

---

### Cómo Ver Estadísticas

En la consola del navegador:

```javascript
// Ver stats de rate limit
import { getRateLimitStats } from './js/api.js';
getRateLimitStats();
// { current: 5, limit: 60, percentage: 8 }

// Ver stats completas (cache + rate limit)
import { showStats } from './js/api.js';
showStats();
// 📊 Weather App Statistics
//   Cache: { size: 2, keys: [...] }
//   Rate Limit: { current: 5, limit: 60, percentage: 8 }
```

---

## 🛡️ Mejores Prácticas

### 1. Nunca Subir API Keys a GitHub

**✅ Hacer:**
```bash
# .gitignore
.env
.env.local
.env.production
*config.js
!config.example.js
```

**❌ Nunca:**
- Commitear archivos `.env`
- Hardcodear keys en código que subes
- Compartir keys públicamente

---

### 2. Usar .env.example Como Template

```bash
# .env.example (SÍ subirlo a GitHub)
VITE_OPENWEATHER_API_KEY=tu_api_key_aqui
VITE_DEMO_MODE=false

# .env (NUNCA subirlo)
VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
VITE_DEMO_MODE=false
```

---

### 3. Regenerar Keys Si Se Exponen

Si accidentalmente subes una API key:

1. Ir a OpenWeatherMap → Account → API Keys
2. Regenerar la key comprometida
3. Actualizar tu `.env` local
4. Actualizar variables de entorno en hosting
5. Hacer `git commit --amend` si fue el último commit

---

### 4. Usar Caché Agresivamente

Nuestro sistema de caché reduce 25% de requests:

```javascript
// Cache de 10 minutos
CACHE_DURATION: 10 * 60 * 1000

// Búsqueda repetida = 0 requests adicionales
searchWeather('Madrid');  // Request API
searchWeather('Madrid');  // Desde cache ⚡
```

---

### 5. Monitorear Uso de API

En OpenWeatherMap dashboard:
- Calls this month
- Calls per minute
- Historical usage

**Alertas recomendadas:**
- Email si excedes 80% del límite mensual
- Webhook para 90%+ del límite

---

## 🔄 Workflow de Seguridad

### Desarrollo Local

```bash
# 1. Copiar template
cp .env.example .env

# 2. Editar con tu key
nano .env

# 3. Nunca commitear .env
git status  # Debe estar en .gitignore
```

### Deployment (Netlify/Vercel)

```bash
# 1. Build con variables de entorno
npm run build

# 2. En Netlify/Vercel Dashboard:
#    Settings → Environment Variables
#    VITE_OPENWEATHER_API_KEY = tu_key_real

# 3. Deploy
netlify deploy --prod
```

---

## 📊 Resumen de Mejoras de Seguridad

| Aspecto | Antes | Ahora | Mejora |
|---------|-------|-------|--------|
| **API Key** | Hardcoded expuesta | Sistema de prioridades | ✅ Flexible |
| **Rate Limiting** | ❌ Ninguno | ✅ 60/min con warnings | +Control |
| **Caché** | ❌ Ninguno | ✅ 10 min | -25% requests |
| **Estadísticas** | ❌ Ninguna | ✅ showStats() | +Visibilidad |
| **.gitignore** | ❌ Faltaba | ✅ Completo | +Seguridad |
| **.env.example** | ❌ No existía | ✅ Template | +Docs |

---

## 🚀 Próximos Pasos de Seguridad (Futuro)

### v2.0 - Backend Proxy
```
[ ] Implementar servidor Node.js
[ ] API Gateway con autenticación
[ ] Rate limiting en backend
[ ] Logs centralizados
```

### v2.0 - Autenticación de Usuarios
```
[ ] Login con Google/GitHub
[ ] Favoritos por usuario
[ ] Límites personalizados
[ ] Dashboard de uso
```

---

## 📞 Soporte

Si tienes dudas sobre seguridad:

1. **Documentación OpenWeatherMap**: https://openweathermap.org/faq
2. **OWASP API Security**: https://owasp.org/www-project-api-security/
3. **GitHub Issues**: https://github.com/risso-patron/portfolio/issues

---

**Creado por:** Jorge Luis Risso Patrón  
**Fecha:** Diciembre 2025  
**Versión:** 1.0
