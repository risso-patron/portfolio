// ==================== MAIN MODULE ====================
// Inicialización y orquestación de Weather App
// Luis Risso Patrón - 2025

import { API_CONFIG, EXAMPLE_CITIES, MESSAGES, DEMO_MODE } from './config.js';
import { getWeatherAndForecast, getWeatherAndForecastByCoords } from './api.js';
import { 
    initializeElements, 
    showLoading, 
    hideLoading, 
    showError, 
    hideError,
    displayWeather,
    displayForecast,
    displayHourlyForecast,
    updateUnitIcon,
    getCityInputValue,
    getUIElements
} from './ui.js';
import { initAccessibility, announceToScreenReader } from './accessibility.js';
import { initTheme } from './theme.js';

// Estado global de la aplicación
const appState = {
    currentUnit: API_CONFIG.DEFAULT_UNIT,
    currentWeatherData: null,
    isSearching: false,
    currentChart: null
};

/**
 * Utilidad de debounce para optimizar eventos de input
 * @param {Function} fn - Función a ejecutar
 * @param {number} delay - Delay en milisegundos
 * @returns {Function} Función debounced
 */
function debounce(fn, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    console.log('🌤️ Weather App initialized');
    console.log('📍 Por Luis Risso Patrón - Desarrollador Frontend Junior');
    console.log('🔧 Modo:', DEMO_MODE ? 'DEMO' : 'PRODUCTION');
    
    // Inicializar referencias DOM
    initializeElements();
    
    // Inicializar sistema de temas
    initTheme();
    
    // Inicializar accesibilidad
    initAccessibility();
    
    // Inicializar ciudades guardadas
    initSavedLocations();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Rotar ciudades de ejemplo en placeholder
    rotatePlaceholderCities();
    
    // Mostrar mensaje si API key no configurada
    checkAPIKeyConfiguration();
}

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    // Búsqueda por ciudad
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Enter key en input
    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // OPTIMIZACIÓN: Debounce para autocompletado futuro
        // Por ahora solo muestra sugerencias en consola
        const debouncedInput = debounce((e) => {
            const value = e.target.value.trim();
            if (value.length >= 3) {
                console.log('🔍 Sugerencias para:', value);
                // Aquí se podría implementar autocompletado en el futuro
            }
        }, 300);
        
        cityInput.addEventListener('input', debouncedInput);
    }
    
    // Geolocalización
    const geoBtn = document.getElementById('geoBtn');
    if (geoBtn) {
        geoBtn.addEventListener('click', handleGeolocation);
    }
    
    // Toggle unidades
    const unitBtn = document.querySelector('.unit-btn');
    if (unitBtn) {
        unitBtn.addEventListener('click', handleUnitToggle);
    }
    
    // Guardar ciudad actual
    const saveCityBtn = document.getElementById('saveCurrentCity');
    if (saveCityBtn) {
        saveCityBtn.addEventListener('click', handleSaveCurrentCity);
    }
    
    // Click en ciudades guardadas
    window.addEventListener('savedCityClick', (e) => {
        const cityName = e.detail.cityName;
        document.getElementById('cityInput').value = cityName;
        handleSearch();
    });
}

/**
 * Maneja la búsqueda por ciudad
 */
async function handleSearch() {
    const city = getCityInputValue();
    
    if (!city) {
        showError(MESSAGES.ERROR_NO_CITY);
        return;
    }
    
    if (appState.isSearching) {
        console.log('⏳ Búsqueda en progreso, ignorando request duplicado');
        return;
    }
    
    appState.isSearching = true;
    showLoading(`Buscando clima de ${city}...`);
    
    try {
        const { weather, forecast } = await getWeatherAndForecast(city, appState.currentUnit);
        
        appState.currentWeatherData = weather;
        displayWeather(weather, appState.currentUnit);
        
        if (forecast) {
            displayForecast(forecast);
            // Crear gráfico de temperatura con datos del forecast
            createTemperatureChart(forecast, appState.currentUnit);
            // Mostrar pronóstico por horas
            const unit = appState.currentUnit === 'metric' ? 'C' : 'F';
            displayHourlyForecast(forecast.list, unit);
        }
        
        // Anunciar a screen readers
        announceToScreenReader(
            `Clima actualizado para ${weather.name}. Temperatura: ${Math.round(weather.main.temp)} grados. ${weather.weather[0].description}.`,
            'polite'
        );
        
        if (DEMO_MODE) {
            setTimeout(() => {
                showError(MESSAGES.INFO_DEMO_MODE, 'info');
            }, 1000);
        }
        
    } catch (error) {
        hideLoading();
        showError(error.message);
        announceToScreenReader(`Error: ${error.message}`, 'assertive');
        console.error('❌ Error en búsqueda:', error);
    } finally {
        appState.isSearching = false;
    }
}

/**
 * Maneja la geolocalización
 */
async function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('La geolocalización no está disponible en tu navegador');
        return;
    }
    
    if (DEMO_MODE) {
        // Simular geolocalización en modo demo
        showLoading('Detectando ubicación...');
        setTimeout(async () => {
            try {
                const { weather, forecast } = await getWeatherAndForecast('panama', appState.currentUnit);
                appState.currentWeatherData = weather;
                displayWeather(weather, appState.currentUnit);
                if (forecast) {
                    displayForecast(forecast);
                    createTemperatureChart(forecast, appState.currentUnit);
                    const unit = appState.currentUnit === 'metric' ? 'C' : 'F';
                    displayHourlyForecast(forecast.list, unit);
                }
                setTimeout(() => {
                    showError('MODO DEMO: Simulando ubicación de Panamá para portfolio.', 'info');
                }, 1000);
            } catch (error) {
                hideLoading();
                showError(error.message);
            }
        }, 800);
        return;
    }
    
    showLoading('Detectando tu ubicación...');
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                const { weather, forecast } = await getWeatherAndForecastByCoords(
                    latitude, 
                    longitude, 
                    appState.currentUnit
                );
                
                appState.currentWeatherData = weather;
                displayWeather(weather, appState.currentUnit);
                
                if (forecast) {
                    displayForecast(forecast);
                    createTemperatureChart(forecast, appState.currentUnit);
                    const unit = appState.currentUnit === 'metric' ? 'C' : 'F';
                    displayHourlyForecast(forecast.list, unit);
                }
                
            } catch (error) {
                hideLoading();
                showError('Error al obtener datos del clima para tu ubicación');
                console.error('❌ Error en geolocalización:', error);
            }
        },
        (error) => {
            hideLoading();
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    showError(MESSAGES.ERROR_PERMISSION_DENIED);
                    break;
                case error.POSITION_UNAVAILABLE:
                    showError(MESSAGES.ERROR_POSITION_UNAVAILABLE);
                    break;
                case error.TIMEOUT:
                    showError(MESSAGES.ERROR_TIMEOUT);
                    break;
                default:
                    showError(MESSAGES.ERROR_UNKNOWN);
                    break;
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

/**
 * Maneja el cambio de unidades (Celsius ↔ Fahrenheit)
 */
async function handleUnitToggle() {
    // Alternar unidad
    const newUnit = appState.currentUnit === 'metric' ? 'imperial' : 'metric';
    appState.currentUnit = newUnit;
    
    // Actualizar ícono
    updateUnitIcon(newUnit);
    
    // Actualizar tema del gráfico
    updateChartTheme();
    
    // Refrescar clima si hay datos actuales
    if (appState.currentWeatherData) {
        const city = appState.currentWeatherData.name;
        showLoading(`Convirtiendo a ${newUnit === 'metric' ? 'Celsius' : 'Fahrenheit'}...`);
        
        try {
            const { weather, forecast } = await getWeatherAndForecast(city, newUnit);
            
            appState.currentWeatherData = weather;
            displayWeather(weather, newUnit);
            
            if (forecast) {
                displayForecast(forecast);
                createTemperatureChart(forecast, newUnit);
                const unit = newUnit === 'metric' ? 'C' : 'F';
                displayHourlyForecast(forecast.list, unit);
            }
            
        } catch (error) {
            hideLoading();
            showError('Error al cambiar unidades');
            console.error('❌ Error al cambiar unidades:', error);
            
            // Revertir unidad si falla
            appState.currentUnit = newUnit === 'metric' ? 'imperial' : 'metric';
            updateUnitIcon(appState.currentUnit);
        }
    }
}

/**
 * Maneja el guardado de la ciudad actual como favorita
 */
function handleSaveCurrentCity() {
    if (!appState.currentWeatherData) {
        showError('Primero busca una ciudad para guardarla', 'info');
        return;
    }
    
    const cityData = {
        name: appState.currentWeatherData.name,
        country: appState.currentWeatherData.sys.country,
        temp: Math.round(appState.currentWeatherData.main.temp),
        icon: appState.currentWeatherData.weather[0].icon
    };
    
    const result = saveCity(cityData);
    
    if (result.success) {
        showError(`✓ ${result.message}`, 'info');
        console.log('✓ Ciudad guardada:', cityData.name);
    } else {
        showError(result.message, 'info');
    }
}

/**
 * Rota ciudades de ejemplo en el placeholder
 */
function rotatePlaceholderCities() {
    const cityInput = document.getElementById('cityInput');
    if (!cityInput) return;
    
    let currentCityIndex = 0;
    
    setInterval(() => {
        if (!cityInput.value) {
            cityInput.placeholder = `🔍 Buscar ciudad (ej: ${EXAMPLE_CITIES[currentCityIndex]})`;
            currentCityIndex = (currentCityIndex + 1) % EXAMPLE_CITIES.length;
        }
    }, 3000);
}

/**
 * Verifica configuración de API key
 */
function checkAPIKeyConfiguration() {
    if (API_CONFIG.API_KEY === 'TU_API_KEY_AQUI' && !DEMO_MODE) {
        console.warn('⚠️ API Key no configurada');
        setTimeout(() => {
            showError('CONFIGURACIÓN REQUERIDA: Necesitas configurar tu API Key de OpenWeatherMap en js/config.js', 'info');
        }, 1000);
    } else if (!DEMO_MODE) {
        console.log('✅ API Key configurada');
        console.log('💡 Si no funciona, espera 10 minutos para que se active tu API key');
    }
}

/**
 * Manejo global de errores no capturados
 */
window.addEventListener('error', (event) => {
    console.error('❌ Error global capturado:', event.error);
    showError('Ocurrió un error inesperado. Por favor recarga la página.');
});

/**
 * Manejo de promesas rechazadas no capturadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rechazada no capturada:', event.reason);
    event.preventDefault();
});

/**
 * Carga y renderiza las ciudades guardadas
 */
function loadSavedLocations() {
    const container = document.getElementById('savedLocationsContainer');
    if (!container) return;
    
    renderSavedLocations(container, async (cityName) => {
        document.getElementById('cityInput').value = cityName;
        await handleSearch();
    });
}

/**
 * Guarda la ciudad actual en localStorage
 */
function handleSaveCurrentCity() {
    if (!appState.currentWeatherData) {
        showError('Primero busca una ciudad para guardarla');
        return;
    }
    
    const { name, sys, coord } = appState.currentWeatherData;
    const result = saveLocation(name, sys.country, coord);
    
    if (result.success) {
        loadSavedLocations(); // Recargar lista
        updateSaveLocationButton(name);
        showError(result.message, 'success');
    } else {
        showError(result.message, 'warning');
    }
}

/**
 * Actualiza el gráfico de temperatura
 * @param {Array} forecastList - Lista de pronósticos
 */
function updateTemperatureChart(forecastList) {
    const canvas = document.getElementById('temperatureChart');
    if (!canvas) return;
    
    // Destruir gráfico anterior si existe
    if (appState.currentChart) {
        destroyChart(appState.currentChart);
    }
    
    // Tomar solo las primeras 8 entradas (24 horas)
    const chartData = forecastList.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000),
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like)
    }));
    
    const unit = appState.currentUnit === 'metric' ? 'C' : 'F';
    appState.currentChart = createTemperatureChart(canvas, chartData, unit);
}

/**
 * Actualiza el botón de guardar ubicación
 * @param {string} cityName - Nombre de la ciudad
 */
function updateSaveLocationButton(cityName) {
    const saveBtn = document.getElementById('saveCurrentCity');
    if (!saveBtn) return;
    
    const isSaved = isLocationSaved(cityName);
    
    if (isSaved) {
        saveBtn.innerHTML = '<i class="fas fa-star"></i>';
        saveBtn.classList.add('saved');
        saveBtn.title = 'Ciudad guardada';
    } else {
        saveBtn.innerHTML = '<i class="far fa-star"></i>';
        saveBtn.classList.remove('saved');
        saveBtn.title = 'Guardar ciudad';
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Exportar funciones para uso en consola (debugging)
window.WeatherApp = {
    state: appState,
    search: handleSearch,
    geolocate: handleGeolocation,
    toggleUnits: handleUnitToggle
};
