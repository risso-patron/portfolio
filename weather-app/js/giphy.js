// ==================== GIPHY MODULE ====================
// Manejo de GIFs de fondo dinámicos según clima
// Jorge Luis Risso Patrón - 2025

import { API_CONFIG } from './config.js';

// Cache de GIFs para evitar repeticiones
const giphyCache = new Map();
const recentGifs = new Set();
const MAX_RECENT = 20; // Mantener últimos 20 GIFs para evitar repeticiones

/**
 * Determina los hashtags apropiados según condición climática y temperatura
 * @param {Object} weatherData - Datos del clima de OpenWeatherMap
 * @returns {string} Hashtag para buscar en Giphy
 */
function getWeatherHashtag(weatherData) {
    const condition = weatherData.weather[0].main.toLowerCase();
    const description = weatherData.weather[0].description.toLowerCase();
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const isNight = icon.includes('n');
    
    // Mapeo ULTRA-ESPECÍFICO: solo fenómenos climáticos literales
    const hashtagMap = {
        // Lluvia - Solo GIFs de agua cayendo
        'rain': temp > 20 ? 'rainstorm raining' : 'rainfall raindrops',
        'drizzle': 'drizzle rain',
        'thunderstorm': isNight ? 'lightning thunderstorm' : 'thunder lightning',
        
        // Nieve - Solo copos cayendo
        'snow': 'snowfall snowing',
        
        // Nubes - Solo cielos nublados
        'clouds': (() => {
            if (description.includes('overcast')) return 'overcast cloudy';
            if (description.includes('scattered')) return 'partly cloudy';
            return isNight ? 'clouds night' : 'cloudy sky';
        })(),
        
        // Despejado - Solo cielos claros
        'clear': (() => {
            if (isNight) {
                return 'stars night';
            }
            if (temp > 30) return 'sun sunny hot';
            if (temp > 20) return 'sunny sunshine';
            return 'clear sky';
        })(),
        
        // Atmosféricos
        'mist': 'misty foggy',
        'smoke': 'smoke',
        'haze': 'haze',
        'dust': 'dust storm',
        'fog': 'fog foggy',
        'sand': 'sandstorm',
        'ash': 'ash',
        'squall': 'wind storm',
        'tornado': 'tornado twister'
    };
    
    // Buscar hashtag específico o usar genérico basado en temperatura
    let hashtag = hashtagMap[condition];
    
    if (!hashtag) {
        // Fallback basado en temperatura
        if (temp > 30) hashtag = 'hot summer sun';
        else if (temp > 20) hashtag = 'warm spring nature';
        else if (temp > 10) hashtag = 'cool autumn nature';
        else hashtag = 'cold winter nature';
    }
    
    console.log(`🎬 Hashtag seleccionado: "${hashtag}" (${condition}, ${temp}°C, ${isNight ? 'noche' : 'día'})`);
    return hashtag;
}

/**
 * Obtiene un GIF aleatorio de Giphy basado en el clima
 * @param {Object} weatherData - Datos del clima
 * @returns {Promise<string>} URL del GIF
 */
export async function getWeatherGif(weatherData) {
    const hashtag = getWeatherHashtag(weatherData);
    const cacheKey = `giphy_${hashtag}`;
    
    // Verificar cache
    if (giphyCache.has(cacheKey)) {
        const cached = giphyCache.get(cacheKey);
        if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
            console.log('📦 Usando GIF en caché para:', hashtag);
            return selectRandomGif(cached.gifs);
        }
    }
    
    try {
        // Llamar a Giphy API
        const url = `${API_CONFIG.GIPHY_BASE_URL}/search?api_key=${API_CONFIG.GIPHY_API_KEY}&q=${encodeURIComponent(hashtag)}&limit=50&rating=g&lang=es`;
        
        console.log('🔍 Buscando GIF en Giphy:', hashtag);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Giphy API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            console.warn('⚠️ No se encontraron GIFs para:', hashtag);
            return null;
        }
        
        // Guardar en cache
        giphyCache.set(cacheKey, {
            gifs: data.data,
            timestamp: Date.now()
        });
        
        // Seleccionar GIF aleatorio evitando repeticiones
        return selectRandomGif(data.data);
        
    } catch (error) {
        console.error('❌ Error obteniendo GIF:', error);
        return null;
    }
}

/**
 * Selecciona un GIF aleatorio de la lista evitando repeticiones recientes
 * @param {Array} gifs - Lista de GIFs de Giphy
 * @returns {string} URL del GIF seleccionado
 */
function selectRandomGif(gifs) {
    // Filtrar GIFs que no hayan sido mostrados recientemente
    let availableGifs = gifs.filter(gif => !recentGifs.has(gif.id));
    
    // Si todos fueron mostrados, resetear la lista
    if (availableGifs.length === 0) {
        console.log('🔄 Todos los GIFs fueron mostrados, reseteando...');
        recentGifs.clear();
        availableGifs = gifs;
    }
    
    // Seleccionar uno aleatorio
    const randomGif = availableGifs[Math.floor(Math.random() * availableGifs.length)];
    
    // Agregar a recientes
    recentGifs.add(randomGif.id);
    
    // Mantener solo los últimos MAX_RECENT
    if (recentGifs.size > MAX_RECENT) {
        const firstItem = recentGifs.values().next().value;
        recentGifs.delete(firstItem);
    }
    
    // Retornar URL optimizada (tamaño original para mejor calidad de fondo)
    const gifUrl = randomGif.images.original.url;
    console.log('✅ GIF seleccionado:', gifUrl);
    
    return gifUrl;
}

/**
 * Aplica el GIF como fondo del contenedor
 * @param {string} gifUrl - URL del GIF
 * @param {HTMLElement} container - Elemento contenedor
 */
export function applyGifBackground(gifUrl, container) {
    if (!gifUrl || !container) return;
    
    // Precargar el GIF
    const img = new Image();
    img.onload = () => {
        // Aplicar GIF con efecto de fade
        container.style.transition = 'background-image 0.8s ease-in-out';
        container.style.backgroundImage = `
            linear-gradient(
                to bottom,
                rgba(10, 15, 30, 0.75),
                rgba(10, 15, 30, 0.85)
            ),
            url('${gifUrl}')
        `;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundAttachment = 'fixed';
        
        console.log('✨ GIF de fondo aplicado');
    };
    img.onerror = () => {
        console.error('❌ Error cargando GIF:', gifUrl);
    };
    img.src = gifUrl;
}

/**
 * Limpia el fondo del GIF
 * @param {HTMLElement} container - Elemento contenedor
 */
export function clearGifBackground(container) {
    if (!container) return;
    
    container.style.backgroundImage = 'none';
    console.log('🧹 GIF de fondo removido');
}
