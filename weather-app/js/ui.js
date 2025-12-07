// ==================== UI MODULE ====================
// Manejo de actualización del DOM y efectos visuales
// Jorge Luis Risso Patrón - 2025

import { WEATHER_ICONS, MESSAGES } from './config.js';

// Referencias a elementos DOM
const elements = {
    // Inputs
    cityInput: null,
    searchBtn: null,
    geoBtn: null,
    unitBtn: null,
    unitIcon: null,
    
    // Displays
    weatherDisplay: null,
    searchSection: null,
    loadingIndicator: null,
    errorMessage: null,
    
    // Weather info
    weatherIcon: null,
    temperature: null,
    tempHigh: null,
    tempLow: null,
    weatherDescription: null,
    cityName: null,
    
    // Details
    feelsLike: null,
    humidity: null,
    windSpeed: null,
    pressure: null,
    visibility: null,
    cloudiness: null,
    windDirection: null,
    sunrise: null,
    sunset: null,
    
    // Forecast
    forecastContainer: null,
    
    // Sky status
    skyStatus: null
};

/**
 * Inicializa referencias a elementos DOM
 */
export function initializeElements() {
    elements.cityInput = document.getElementById('cityInput');
    elements.searchBtn = document.getElementById('searchBtn');
    elements.geoBtn = document.getElementById('geoBtn');
    elements.unitBtn = document.querySelector('.unit-btn');
    elements.unitIcon = document.getElementById('unitIcon');
    
    elements.weatherDisplay = document.getElementById('weatherDisplay');
    elements.searchSection = document.querySelector('.search-section');
    elements.loadingIndicator = document.getElementById('loadingIndicator');
    elements.errorMessage = document.getElementById('errorMessage');
    
    elements.weatherIcon = document.getElementById('weatherIcon');
    elements.temperature = document.getElementById('temperature');
    elements.tempHigh = document.getElementById('tempHigh');
    elements.tempLow = document.getElementById('tempLow');
    elements.weatherDescription = document.getElementById('weatherDescription');
    elements.cityName = document.getElementById('cityName');
    
    elements.feelsLike = document.getElementById('feelsLike');
    elements.humidity = document.getElementById('humidity');
    elements.windSpeed = document.getElementById('windSpeed');
    elements.pressure = document.getElementById('pressure');
    elements.visibility = document.getElementById('visibility');
    elements.cloudiness = document.getElementById('cloudiness');
    elements.windDirection = document.getElementById('windDirection');
    elements.sunrise = document.getElementById('sunrise');
    elements.sunset = document.getElementById('sunset');
    
    elements.forecastContainer = document.getElementById('forecastContainer');
    elements.skyStatus = document.getElementById('skyStatus');
}

/**
 * Muestra el indicador de carga
 * @param {string} message - Mensaje opcional personalizado
 */
export function showLoading(message = MESSAGES.LOADING) {
    hideError();
    if (elements.weatherDisplay) {
        elements.weatherDisplay.style.display = 'none';
    }
    if (elements.loadingIndicator) {
        const loadingText = elements.loadingIndicator.querySelector('p');
        if (loadingText) loadingText.textContent = message;
        elements.loadingIndicator.style.display = 'block';
    }
    
    // Expandir search section
    if (elements.searchSection) {
        elements.searchSection.classList.remove('compact');
    }
}

/**
 * Oculta el indicador de carga
 */
export function hideLoading() {
    if (elements.loadingIndicator) {
        elements.loadingIndicator.style.display = 'none';
    }
}

/**
 * Muestra mensaje de error
 * @param {string} message - Mensaje de error
 * @param {string} type - Tipo de mensaje ('error' o 'info')
 */
export function showError(message, type = 'error') {
    if (!elements.errorMessage) return;
    
    elements.errorMessage.textContent = message;
    elements.errorMessage.style.display = 'block';
    
    // Cambiar estilo según el tipo
    if (type === 'info') {
        elements.errorMessage.style.backgroundColor = '#3498db';
        elements.errorMessage.style.color = 'white';
        elements.errorMessage.style.borderLeft = '4px solid #2980b9';
    } else {
        elements.errorMessage.style.backgroundColor = '#ffebee';
        elements.errorMessage.style.color = '#c62828';
        elements.errorMessage.style.borderLeft = '4px solid #c62828';
    }
    
    // Auto-ocultar mensajes informativos
    if (type === 'info') {
        setTimeout(() => {
            hideError();
        }, 4000);
    }
}

/**
 * Oculta mensaje de error
 */
export function hideError() {
    if (elements.errorMessage) {
        elements.errorMessage.style.display = 'none';
    }
}

/**
 * Actualiza la UI con datos del clima
 * @param {Object} data - Datos del clima de la API
 * @param {string} currentUnit - Unidad actual ('metric' o 'imperial')
 */
export function displayWeather(data, currentUnit) {
    if (!data) return;
    
    const weatherCode = data.weather[0].icon;
    const unitSymbol = currentUnit === 'metric' ? 'C' : 'F';
    
    // Actualizar ícono del clima con imagen de OpenWeatherMap
    const iconUrl = `https://openweathermap.org/img/wn/${weatherCode}@4x.png`;
    if (elements.weatherIcon) {
        elements.weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon-img">`;
    }
    
    // Actualizar temperatura
    const tempValue = Math.round(data.main.temp);
    if (elements.temperature) {
        elements.temperature.innerHTML = `<span class="temp-value">${tempValue}</span><span class="unit">°${unitSymbol}</span>`;
    }
    
    // Actualizar high/low temps
    if (elements.tempHigh) {
        elements.tempHigh.textContent = Math.round(data.main.temp_max);
    }
    if (elements.tempLow) {
        elements.tempLow.textContent = Math.round(data.main.temp_min);
    }
    
    // Actualizar descripción y ciudad
    if (elements.weatherDescription) {
        elements.weatherDescription.textContent = data.weather[0].description;
    }
    if (elements.cityName) {
        elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
    }
    
    // Actualizar detalles del clima
    if (elements.feelsLike) {
        elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
    }
    if (elements.humidity) {
        elements.humidity.textContent = `${data.main.humidity}%`;
    }
    if (elements.windSpeed) {
        elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    }
    if (elements.pressure) {
        elements.pressure.textContent = `${data.main.pressure} hPa`;
    }
    
    // Detalles extendidos
    if (elements.visibility && data.visibility) {
        elements.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    }
    if (elements.cloudiness && data.clouds) {
        elements.cloudiness.textContent = `${data.clouds.all}%`;
    }
    if (elements.windDirection && data.wind) {
        elements.windDirection.textContent = getWindDirection(data.wind.deg || 0);
    }
    
    // Sunrise/Sunset
    if (data.sys.sunrise && data.sys.sunset) {
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        
        if (elements.sunrise) {
            elements.sunrise.textContent = sunrise.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
        if (elements.sunset) {
            elements.sunset.textContent = sunset.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    }
    
    // Actualizar fondo sky-inspired
    updateSkyBackground(weatherCode, data);
    
    // Mostrar weather display
    hideLoading();
    hideError();
    
    if (elements.weatherDisplay) {
        elements.weatherDisplay.classList.remove('hidden');
        elements.weatherDisplay.classList.add('fade-in');
        elements.weatherDisplay.style.display = 'block';
    }
    
    // Compactar search section
    if (elements.searchSection) {
        elements.searchSection.classList.add('compact');
    }
}

/**
 * Actualiza el pronóstico de 5 días
 * @param {Object} data - Datos del pronóstico de la API
 */
export function displayForecast(data) {
    if (!data || !elements.forecastContainer) return;
    
    elements.forecastContainer.innerHTML = '';
    
    // Agrupar pronósticos por día
    const dailyData = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
                temps: [],
                icons: [],
                descriptions: []
            };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].icons.push(item.weather[0].icon);
        dailyData[dateKey].descriptions.push(item.weather[0].description);
    });
    
    // Convertir a array y tomar los próximos 5 días
    const days = Object.keys(dailyData).slice(1, 6);
    
    days.forEach((dateKey) => {
        const dayData = dailyData[dateKey];
        const date = new Date(dateKey);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
        
        // Calcular max/min del día
        const tempMax = Math.round(Math.max(...dayData.temps));
        const tempMin = Math.round(Math.min(...dayData.temps));
        
        // Usar el icono más frecuente
        const iconCode = dayData.icons[Math.floor(dayData.icons.length / 2)] || dayData.icons[0];
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const description = dayData.descriptions[0];
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon">
                <img src="${iconUrl}" alt="${description}" class="forecast-icon-img">
                <div class="forecast-description">${description}</div>
            </div>
            <div class="forecast-temps">
                <span class="forecast-high">${tempMax}°</span>
                <span class="forecast-low">${tempMin}°</span>
            </div>
            <div class="forecast-precip">60%</div>
        `;
        
        elements.forecastContainer.appendChild(forecastItem);
    });
}

/**
 * Actualiza el ícono de unidad de temperatura
 * @param {string} unit - Unidad actual ('metric' o 'imperial')
 */
export function updateUnitIcon(unit) {
    if (!elements.unitIcon) return;
    
    if (unit === 'metric') {
        elements.unitIcon.src = 'icons/celsius.webp';
        elements.unitIcon.alt = 'Celsius';
    } else {
        elements.unitIcon.src = 'icons/fahrenheit.webp';
        elements.unitIcon.alt = 'Fahrenheit';
    }
}

/**
 * Actualiza el fondo inspirado en el cielo según el clima
 * @param {string} weatherCode - Código del clima (ej: '01d', '10n')
 * @param {Object} weatherData - Datos completos del clima
 */
function updateSkyBackground(weatherCode, weatherData) {
    const body = document.body;
    const currentHour = new Date().getHours();
    const isDawn = currentHour >= 5 && currentHour <= 7;
    const isSunset = currentHour >= 18 && currentHour <= 20;
    const isNight = currentHour >= 21 || currentHour <= 4;
    
    // Remover todas las clases de cielo
    body.classList.remove('clear', 'clouds', 'rain', 'thunderstorm', 'snow', 'mist', 'dawn', 'sunset', 'night');
    
    let skyClass = '';
    
    // Aplicar clase según clima y hora
    if (isNight && !weatherCode.startsWith('11')) {
        skyClass = 'night';
    } else if (isDawn && weatherCode.startsWith('01')) {
        skyClass = 'dawn';
    } else if (isSunset && weatherCode.startsWith('01')) {
        skyClass = 'sunset';
    } else if (weatherCode.startsWith('01')) {
        skyClass = 'clear';
    } else if (weatherCode.startsWith('02') || weatherCode.startsWith('03') || weatherCode.startsWith('04')) {
        skyClass = 'clouds';
    } else if (weatherCode.startsWith('09') || weatherCode.startsWith('10')) {
        skyClass = 'rain';
    } else if (weatherCode.startsWith('11')) {
        skyClass = 'thunderstorm';
    } else if (weatherCode.startsWith('13')) {
        skyClass = 'snow';
    } else if (weatherCode.startsWith('50')) {
        skyClass = 'mist';
    } else {
        skyClass = 'clouds';
    }
    
    body.classList.add(skyClass);
    
    // Actualizar sky status con ciudad
    if (elements.skyStatus) {
        elements.skyStatus.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    }
    
    // Transición suave
    setTimeout(() => {
        body.style.transition = 'all 1.5s ease-in-out';
    }, 100);
}

/**
 * Convierte grados a dirección cardinal del viento
 * @param {number} deg - Grados (0-360)
 * @returns {string} Dirección cardinal (N, NE, E, etc.)
 */
function getWindDirection(deg) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
}

/**
 * Obtiene el valor actual del input de ciudad
 * @returns {string} Nombre de la ciudad
 */
export function getCityInputValue() {
    return elements.cityInput ? elements.cityInput.value.trim() : '';
}

/**
 * Limpia el input de ciudad
 */
export function clearCityInput() {
    if (elements.cityInput) {
        elements.cityInput.value = '';
    }
}

/**
 * Focus en el input de ciudad
 */
export function focusCityInput() {
    if (elements.cityInput) {
        elements.cityInput.focus();
    }
}
