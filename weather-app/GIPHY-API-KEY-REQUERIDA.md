# ⚠️ GIPHY API KEY REQUERIDA

## 🚨 PROBLEMA ACTUAL

La **API key pública de Giphy** (`GlVGYHkr3WSBnllca`) que se usaba para testing **ya no funciona** (401 Unauthorized).

**Error en consola:**
```
GET https://api.giphy.com/v1/gifs/search?api_key=... 401 (Unauthorized)
```

---

## ✅ SOLUCIÓN: Obtener tu Propia API Key (GRATIS)

### Paso 1: Crear Cuenta en Giphy
1. Ve a **[Giphy Developers](https://developers.giphy.com/)**
2. Haz clic en **"Create an Account"** (o **"Log In"** si ya tienes cuenta)
3. Completa el registro con tu email

### Paso 2: Crear una Nueva App
1. Una vez logueado, ve a **[Dashboard](https://developers.giphy.com/dashboard/)**
2. Haz clic en **"Create an App"**
3. Selecciona **"API"** (no SDK)
4. Completa el formulario:
   - **App Name**: `Weather App Portfolio` (o el nombre que quieras)
   - **App Description**: `Weather app with dynamic GIF backgrounds`
   - **Use Case**: Selecciona **"Personal Project"**
5. Acepta los términos y condiciones
6. Haz clic en **"Create App"**

### Paso 3: Copiar tu API Key
1. En el dashboard verás tu nueva app
2. Copia la **API Key** (formato: `abc123def456...`)
3. **GUARDA esta key** (la necesitarás en el siguiente paso)

---

## 🔧 CONFIGURAR TU API KEY

### Opción 1: Hardcoded (Rápido para Testing)

**Edita `weather-app/js/config.js`** línea 46:

```javascript
// ANTES (API key expirada)
return 'GlVGYHkr3WSBnllca';

// DESPUÉS (tu API key nueva)
return 'TU_API_KEY_AQUI'; // Pega tu API key de Giphy
```

⚠️ **IMPORTANTE**: Si haces commit a GitHub, la API key quedará pública. Para producción, usa la Opción 2.

---

### Opción 2: Variables de Entorno (Recomendado)

1. **Crea archivo `.env`** en la raíz de `weather-app/`:
```bash
VITE_GIPHY_API_KEY=tu_api_key_aqui
```

2. **Verifica que `.gitignore`** incluya `.env`:
```bash
# Ya está en .gitignore
.env
```

3. **Usa un bundler** como Vite para desarrollo:
```bash
npm install vite
npx vite
```

4. La app automáticamente usará `import.meta.env.VITE_GIPHY_API_KEY`

---

## 🎬 HABILITAR GIPHY NUEVAMENTE

Una vez tengas tu API key, **descomenta el código** en `js/giphy.js`:

**Línea 70-77** actualmente dice:
```javascript
export async function getWeatherGif(weatherData) {
    // ⚠️ TEMPORALMENTE DESHABILITADO
    console.warn('⚠️ Giphy deshabilitado...');
    return null;
    
    /* CÓDIGO ORIGINAL (descomentar cuando tengas API key):
```

**Cámbialo a:**
```javascript
export async function getWeatherGif(weatherData) {
    const hashtag = getWeatherHashtag(weatherData);
    const cacheKey = `giphy_${hashtag}`;
    
    // ... resto del código original
```

O simplemente **ELIMINA las líneas 72-76** (el warning y el return null).

---

## 🧪 VERIFICAR QUE FUNCIONA

### Test en Navegador
1. Abre `weather-app/index.html`
2. Abre la **consola** (F12)
3. Busca una ciudad (ej: "Madrid")
4. Deberías ver:
```
✅ 🔍 Buscando GIF en Giphy: cloudy sky dramatic
✅ ✨ GIF de fondo aplicado
```

### Si ves errores:
```javascript
// Error 401 → API key inválida
// Verifica que copiaste bien la key

// Error 429 → Excediste el límite
// Plan gratuito: 42 requests/hora
// Espera 1 hora o usa otra API key
```

---

## 📊 LÍMITES DEL PLAN GRATUITO

| Plan | Requests/Hora | Requests/Día | Requests/Mes |
|------|---------------|--------------|--------------|
| **SDK** | 42 | 1,000 | ~30,000 |
| **API** | 1,000 | 10,000 | 1,000,000 |

💡 **Tip**: Selecciona **"API"** (no SDK) al crear tu app para obtener 1,000 req/hora.

---

## 🔄 ALTERNATIVA: Deshabilitar GIFs Temporalmente

Si no quieres configurar Giphy ahora, la app **funciona perfectamente sin GIFs**:

- ✅ Clima se muestra normal
- ✅ Íconos funcionan
- ✅ Pronóstico visible
- ❌ Sin GIF de fondo (solo degradado azul)

El código tiene **error handling graceful**, así que no afecta la funcionalidad principal.

---

## 🎯 RESUMEN RÁPIDO

```bash
1. Ve a https://developers.giphy.com/
2. Crea cuenta → Create App → Copia API Key
3. Pega en js/config.js línea 46
4. Descomenta código en js/giphy.js líneas 72-76
5. Recarga la página
6. ✨ GIFs funcionando!
```

---

## 📞 ¿NECESITAS AYUDA?

Si tienes problemas:
1. Verifica que la API key no tenga espacios extra
2. Confirma que seleccionaste "API" (no "SDK") en Giphy
3. Revisa la consola del navegador para errores específicos
4. Contacta a [@risso-patron](https://github.com/risso-patron)

---

**Última actualización**: 7 de diciembre de 2025  
**Estado**: Giphy TEMPORALMENTE DESHABILITADO (esperando API key válida)
