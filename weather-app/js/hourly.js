// ==================== HOURLY FORECAST MODULE ====================
// Manejo del pronóstico por hora
// Luis Risso Patrón - 2026

/**
 * Obtiene el pronóstico por hora desde la API
 * @param {string} city - Nombre de la ciudad
 * @param {string} apiKey - API key de OpenWeather
 * @returns {Promise<Array>} Array con datos hourly
 */
export async function getHourlyForecast(city, apiKey) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=12`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error obteniendo pronóstico por hora');
        }
        
        const data = await response.json();
        return processHourlyData(data.list);
    } catch (error) {
        console.error('Error en hourly forecast:', error);
        return [];
    }
}

/**
 * Procesa los datos hourly de la API
 * @param {Array} rawData - Datos crudos de la API
 * @returns {Array} Datos procesados
 */
function processHourlyData(rawData) {
    return rawData.slice(0, 8).map(item => ({
        time: formatHour(item.dt),
        temp: Math.round(item.main.temp),
        icon: getWeatherIcon(item.weather[0].id),
        description: item.weather[0].description,
        timestamp: item.dt
    }));
}

/**
 * Formatea timestamp a hora legible
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Hora formateada (ej: "14:00")
 */
function formatHour(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Obtiene el icono del clima basado en el código
 * @param {number} weatherId - ID del clima de OpenWeather
 * @returns {string} Emoji del clima
 */
function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return '⛈️';
    if (weatherId >= 300 && weatherId < 500) return '🌦️';
    if (weatherId >= 500 && weatherId < 600) return '🌧️';
    if (weatherId >= 600 && weatherId < 700) return '🌨️';
    if (weatherId >= 700 && weatherId < 800) return '🌫️';
    if (weatherId === 800) return '☀️';
    if (weatherId > 800) return '☁️';
    return '🌤️';
}

/**
 * Renderiza el pronóstico por hora en el DOM
 * @param {Array} hourlyData - Datos procesados del pronóstico
 * @param {HTMLElement} container - Contenedor DOM
 */
export function renderHourlyForecast(hourlyData, container) {
    if (!container || !hourlyData || hourlyData.length === 0) return;
    
    container.innerHTML = hourlyData.map(hour => `
        <div class="hourly-item">
            <div class="hourly-time">${hour.time}</div>
            <div class="hourly-icon" title="${hour.description}">${hour.icon}</div>
            <div class="hourly-temp">${hour.temp}°</div>
        </div>
    `).join('');
}
