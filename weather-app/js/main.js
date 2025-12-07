// ==================== MAIN MODULE ====================
// Inicialización y orquestación de Weather App
// Jorge Luis Risso Patrón - 2025

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
    updateUnitIcon,
    getCityInputValue 
} from './ui.js';

// Estado global de la aplicación
const appState = {
    currentUnit: API_CONFIG.DEFAULT_UNIT,
    currentWeatherData: null,
    isSearching: false
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
    console.log('📍 Por Jorge Luis Risso Patrón - Desarrollador Frontend Junior');
    console.log('🔧 Modo:', DEMO_MODE ? 'DEMO' : 'PRODUCTION');
    
    // Inicializar referencias DOM
    initializeElements();
    
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
        }
        
        if (DEMO_MODE) {
            setTimeout(() => {
                showError(MESSAGES.INFO_DEMO_MODE, 'info');
            }, 1000);
        }
        
    } catch (error) {
        hideLoading();
        showError(error.message);
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
                if (forecast) displayForecast(forecast);
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
