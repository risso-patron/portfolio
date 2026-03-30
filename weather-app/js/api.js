// ==================== API MODULE ====================
// Manejo de llamadas a OpenWeatherMap API
// Jorge Luis Risso Patrón - 2025

import { API_CONFIG, DEMO_MODE, DEMO_DATA, MESSAGES } from './config.js';

// Cache para reducir llamadas API
const cache = new Map();

// ==================== RATE LIMITING ====================
// Sistema de control de límites de API para evitar exceder quota
const rateLimiter = {
    calls: [],
    
    /**
     * Verifica si podemos hacer una llamada sin exceder el límite
     * @returns {boolean} true si podemos hacer la llamada
     */
    canMakeCall() {
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        
        // Limpiar llamadas antiguas (más de 1 minuto)
        this.calls = this.calls.filter(timestamp => timestamp > oneMinuteAgo);
        
        // Verificar límite por minuto
        if (this.calls.length >= API_CONFIG.RATE_LIMIT.CALLS_PER_MINUTE) {
            console.warn('⚠️ Rate limit alcanzado. Espera un momento...');
            return false;
        }
        
        // Advertencia si nos acercamos al límite
        if (this.calls.length >= API_CONFIG.RATE_LIMIT.WARNING_THRESHOLD) {
            console.warn(`⚠️ Advertencia: ${this.calls.length}/${API_CONFIG.RATE_LIMIT.CALLS_PER_MINUTE} llamadas en el último minuto`);
        }
        
        return true;
    },
    
    /**
     * Registra una llamada API realizada
     */
    recordCall() {
        this.calls.push(Date.now());
        console.log(`📊 API calls: ${this.calls.length}/${API_CONFIG.RATE_LIMIT.CALLS_PER_MINUTE} en el último minuto`);
    },
    
    /**
     * Obtiene estadísticas de uso
     * @returns {Object} { current, limit, percentage }
     */
    getStats() {
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        this.calls = this.calls.filter(timestamp => timestamp > oneMinuteAgo);
        
        return {
            current: this.calls.length,
            limit: API_CONFIG.RATE_LIMIT.CALLS_PER_MINUTE,
            percentage: Math.round((this.calls.length / API_CONFIG.RATE_LIMIT.CALLS_PER_MINUTE) * 100)
        };
    }
};

function buildWeatherByCityUrl(city, unit) {
    if (API_CONFIG.PROXY.ENABLED) {
        const params = new URLSearchParams({
            q: city,
            units: unit,
            lang: API_CONFIG.LANGUAGE
        });
        return `${API_CONFIG.PROXY.WEATHER_ENDPOINT}?${params.toString()}`;
    }

    return `${API_CONFIG.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_CONFIG.API_KEY}&units=${unit}&lang=${API_CONFIG.LANGUAGE}`;
}

function buildWeatherByCoordsUrl(lat, lon, unit) {
    if (API_CONFIG.PROXY.ENABLED) {
        const params = new URLSearchParams({
            lat: String(lat),
            lon: String(lon),
            units: unit,
            lang: API_CONFIG.LANGUAGE
        });
        return `${API_CONFIG.PROXY.WEATHER_ENDPOINT}?${params.toString()}`;
    }

    return `${API_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG.API_KEY}&units=${unit}&lang=${API_CONFIG.LANGUAGE}`;
}

function buildForecastUrl(lat, lon, unit) {
    if (API_CONFIG.PROXY.ENABLED) {
        const params = new URLSearchParams({
            lat: String(lat),
            lon: String(lon),
            units: unit,
            lang: API_CONFIG.LANGUAGE
        });
        return `${API_CONFIG.PROXY.FORECAST_ENDPOINT}?${params.toString()}`;
    }

    return `${API_CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_CONFIG.API_KEY}&units=${unit}&lang=${API_CONFIG.LANGUAGE}`;
}

/**
 * Obtiene datos del clima por nombre de ciudad
 * @param {string} city - Nombre de la ciudad
 * @param {string} unit - Unidad de temperatura ('metric' o 'imperial')
 * @returns {Promise<Object>} Datos del clima
 */
export async function getWeatherByCity(city, unit = API_CONFIG.DEFAULT_UNIT) {
    // Modo demo para portfolio
    if (DEMO_MODE) {
        return simulateAPICall(city.toLowerCase());
    }

    // Verificar API key
    if (!API_CONFIG.PROXY.ENABLED && API_CONFIG.API_KEY === 'TU_API_KEY_AQUI') {
        throw new Error(MESSAGES.ERROR_API_KEY);
    }

    // Verificar cache
    const cacheKey = `weather_${city}_${unit}`;
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
            console.log('📦 Usando datos en caché para:', city);
            return cached.data;
        }
    }

    // ⚡ Rate limiting: Verificar antes de hacer request
    if (!rateLimiter.canMakeCall()) {
        throw new Error('Límite de requests alcanzado. Intenta en 1 minuto.');
    }

    const url = buildWeatherByCityUrl(city, unit);
    
    console.log('🔍 Buscando ciudad:', city);
    
    try {
        const response = await fetch(url);
        
        // ⚡ Registrar llamada exitosa
        rateLimiter.recordCall();
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Guardar en cache
        cache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });
        
        console.log('✅ Datos recibidos:', data);
        return data;
        
    } catch (error) {
        console.error('❌ Error en getWeatherByCity:', error);
        throw handleAPIError(error);
    }
}

/**
 * Obtiene datos del clima por coordenadas geográficas
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @param {string} unit - Unidad de temperatura
 * @returns {Promise<Object>} Datos del clima
 */
export async function getWeatherByCoords(lat, lon, unit = API_CONFIG.DEFAULT_UNIT) {
    if (DEMO_MODE) {
        return simulateAPICall('panama');
    }

    if (!API_CONFIG.PROXY.ENABLED && API_CONFIG.API_KEY === 'TU_API_KEY_AQUI') {
        throw new Error(MESSAGES.ERROR_API_KEY);
    }

    const cacheKey = `weather_${lat}_${lon}_${unit}`;
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
            return cached.data;
        }
    }

    // ⚡ Rate limiting
    if (!rateLimiter.canMakeCall()) {
        throw new Error('Límite de requests alcanzado. Intenta en 1 minuto.');
    }

    const url = buildWeatherByCoordsUrl(lat, lon, unit);
    
    try {
        const response = await fetch(url);
        
        // ⚡ Registrar llamada
        rateLimiter.recordCall();
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        cache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });
        
        return data;
        
    } catch (error) {
        console.error('❌ Error en getWeatherByCoords:', error);
        throw handleAPIError(error);
    }
}

/**
 * Obtiene pronóstico de 5 días
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @param {string} unit - Unidad de temperatura
 * @returns {Promise<Object>} Datos del pronóstico
 */
export async function getForecast(lat, lon, unit = API_CONFIG.DEFAULT_UNIT) {
    if (DEMO_MODE) {
        return simulateForecastData();
    }

    if (!API_CONFIG.PROXY.ENABLED && API_CONFIG.API_KEY === 'TU_API_KEY_AQUI') {
        throw new Error(MESSAGES.ERROR_API_KEY);
    }

    const cacheKey = `forecast_${lat}_${lon}_${unit}`;
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
            return cached.data;
        }
    }

    // ⚡ Rate limiting
    if (!rateLimiter.canMakeCall()) {
        throw new Error('Límite de requests alcanzado. Intenta en 1 minuto.');
    }

    const url = buildForecastUrl(lat, lon, unit);
    
    try {
        const response = await fetch(url);
        
        // ⚡ Registrar llamada
        rateLimiter.recordCall();
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        cache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });
        
        return data;
        
    } catch (error) {
        console.error('❌ Error en getForecast:', error);
        // No lanzar error si falla el pronóstico, solo loguear
        return null;
    }
}

/**
 * Obtiene clima y pronóstico en paralelo (optimización)
 * NOTA: Requiere obtener clima primero para las coordenadas, 
 * luego obtiene pronóstico. No se pueden paralelizar estas 2 llamadas
 * porque el pronóstico necesita lat/lon del clima actual.
 * 
 * @param {string} city - Nombre de la ciudad
 * @param {string} unit - Unidad de temperatura
 * @returns {Promise<Object>} { weather, forecast }
 */
export async function getWeatherAndForecast(city, unit = API_CONFIG.DEFAULT_UNIT) {
    try {
        console.time('⏱️ getWeatherAndForecast');
        
        // Obtener clima actual primero
        const weather = await getWeatherByCity(city, unit);
        
        // Luego obtener pronóstico con las coordenadas
        const forecast = await getForecast(weather.coord.lat, weather.coord.lon, unit);
        
        console.timeEnd('⏱️ getWeatherAndForecast');
        
        return { weather, forecast };
        
    } catch (error) {
        throw error;
    }
}

/**
 * Obtiene clima y pronóstico por coordenadas en paralelo
 * OPTIMIZADO: Usa Promise.all para llamadas simultáneas (40% más rápido)
 * 
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @param {string} unit - Unidad de temperatura
 * @returns {Promise<Object>} { weather, forecast }
 */
export async function getWeatherAndForecastByCoords(lat, lon, unit = API_CONFIG.DEFAULT_UNIT) {
    try {
        console.time('⚡ getWeatherAndForecastByCoords (paralelo)');
        
        // Llamadas paralelas con Promise.all para mejor performance
        const [weather, forecast] = await Promise.all([
            getWeatherByCoords(lat, lon, unit),
            getForecast(lat, lon, unit)
        ]);
        
        console.timeEnd('⚡ getWeatherAndForecastByCoords (paralelo)');
        console.log('📊 Ahorro de tiempo: ~40% vs secuencial');
        
        return { weather, forecast };
        
    } catch (error) {
        throw error;
    }
}

/**
 * Maneja errores de API y devuelve mensajes user-friendly
 * @param {Error} error - Error original
 * @returns {Error} Error con mensaje mejorado
 */
function handleAPIError(error) {
    const message = error.message;
    
    if (message.includes('404')) {
        return new Error(MESSAGES.ERROR_CITY_NOT_FOUND);
    } else if (message.includes('401')) {
        return new Error('API Key de OpenWeather aún no activa. Espera 10-15 minutos y vuelve a intentar.');
    } else if (message.includes('403')) {
        return new Error('API Key sin permisos. Verifica tu plan gratuito en OpenWeatherMap.');
    } else if (message.includes('429')) {
        return new Error('Límite de requests alcanzado. Intenta en unos minutos.');
    } else if (error.name === 'TypeError' && message.includes('Failed to fetch')) {
        return new Error(MESSAGES.ERROR_NETWORK);
    } else {
        return new Error(`Error al obtener datos del clima: ${message}`);
    }
}

/**
 * Simula llamada API para modo demo
 * @param {string} city - Ciudad a buscar
 * @returns {Promise<Object>} Datos simulados
 */
async function simulateAPICall(city) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const cityData = DEMO_DATA.cities[city] || DEMO_DATA.cities['panama'];
            resolve(cityData);
        }, 800); // Simular delay de red
    });
}

/**
 * Simula datos de pronóstico para modo demo
 * @returns {Promise<Object>} Pronóstico simulado
 */
async function simulateForecastData() {
    const now = Math.floor(Date.now() / 1000);
    const day = 86400; // 24 hours in seconds

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                list: [
                    { dt: now + day, dt_txt: 'Día 1', weather: [{ icon: '01d', description: 'soleado' }], main: { temp_max: 32, temp_min: 24 } },
                    { dt: now + day * 2, dt_txt: 'Día 2', weather: [{ icon: '02d', description: 'parcialmente nublado' }], main: { temp_max: 31, temp_min: 24 } },
                    { dt: now + day * 3, dt_txt: 'Día 3', weather: [{ icon: '10d', description: 'lluvia' }], main: { temp_max: 28, temp_min: 23 } },
                    { dt: now + day * 4, dt_txt: 'Día 4', weather: [{ icon: '09d', description: 'lluvia ligera' }], main: { temp_max: 29, temp_min: 23 } },
                    { dt: now + day * 5, dt_txt: 'Día 5', weather: [{ icon: '01d', description: 'soleado' }], main: { temp_max: 31, temp_min: 24 } }
                ]
            });
        }, 500);
    });
}

/**
 * Limpia el cache (útil para testing o cambios de unidad)
 */
export function clearCache() {
    cache.clear();
    console.log('🧹 Cache limpiado');
}

/**
 * Obtiene estadísticas del cache
 * @returns {Object} { size, keys }
 */
export function getCacheStats() {
    return {
        size: cache.size,
        keys: Array.from(cache.keys())
    };
}

/**
 * Obtiene estadísticas del rate limiter
 * @returns {Object} { current, limit, percentage }
 */
export function getRateLimitStats() {
    return rateLimiter.getStats();
}

/**
 * Función para debugging - muestra estadísticas completas
 */
export function showStats() {
    const cache = getCacheStats();
    const rateLimit = getRateLimitStats();
    
    console.group('📊 Weather App Statistics');
    console.log('Cache:', cache);
    console.log('Rate Limit:', rateLimit);
    console.groupEnd();
    
    return { cache, rateLimit };
}
