# 🔑 Configuración de API Key - Weather App

## ⚡ Pasos Rápidos:

### 1. Obtener API Key (2 minutos):
1. Ve a: https://openweathermap.org/api
2. Click "Sign Up" → Crear cuenta gratuita
3. Confirma tu email
4. Copia tu API Key del dashboard

### 2. Configurar en el Código:
Una vez tengas tu API key, sigue estos pasos:

#### 📝 Ubicación del Archivo:
```
weather-app/index.html 
Línea 446
```

#### 🔧 Cambio a Realizar:
**ANTES:**
```javascript
const API_KEY = 'TU_API_KEY_AQUI'; // Reemplazar con tu API key
```

**DESPUÉS:**
```javascript
const API_KEY = 'tu_api_key_real_aqui'; // Tu API key de OpenWeatherMap
```

### 3. Ejemplo Real:
Si tu API key es: `abc123def456ghi789jkl`

Entonces cambia la línea a:
```javascript
const API_KEY = 'abc123def456ghi789jkl'; // Tu API key de OpenWeatherMap
```

### 4. Guardar y Probar:
1. Guarda el archivo `index.html`
2. Abre la Weather App en el navegador
3. Busca "Ciudad de Panamá" o usa geolocalización
4. ¡Deberías ver datos reales del clima! 🌤️

## ✅ Verificación:
- [ ] API key obtenida de OpenWeatherMap
- [ ] Línea 446 en index.html actualizada
- [ ] Archivo guardado
- [ ] App probada con ciudad real
- [ ] Datos del clima se muestran correctamente

## 🚨 Problemas Comunes:

**Error: "API Key no configurada"**
→ Verificar que reemplazaste 'TU_API_KEY_AQUI'

**Error: "API Key inválida"** 
→ Verificar que copiaste la key completa sin espacios

**Error: "Ciudad no encontrada"**
→ Probar con nombres en inglés: "Panama City"

## 📞 ¿Necesitas Ayuda?
Una vez hayas obtenido tu API key, solo dime:
"Tengo mi API key: [tu_api_key_aquí]"

Y yo actualizaré automáticamente el código por ti.

---
**Creado por Jorge Luis Risso Patrón | Weather App Configuration**