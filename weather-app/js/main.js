// ==================== MAIN MODULE ====================
// Inicializacion y orquestacion de Weather App
// Luis Risso Patron - 2026

import { API_CONFIG, EXAMPLE_CITIES, MESSAGES, DEMO_MODE } from './config.js';
import { getWeatherAndForecast, getWeatherAndForecastByCoords } from './api.js';
import {
    initializeElements,
    showLoading,
    hideLoading,
    showError,
    displayWeather,
    displayForecast,
    displayHourlyForecast,
    updateUnitIcon,
    getCityInputValue
} from './ui.js';
import { initAccessibility, announceToScreenReader } from './accessibility.js';
import { initTheme } from './theme.js';
import { createTemperatureChart, updateChartTheme } from './chart-handler.js';
import { initSavedLocations, saveCity, setSearchFunction, isCitySaved } from './saved-locations.js';

const appState = {
    currentUnit: API_CONFIG.DEFAULT_UNIT,
    currentWeatherData: null,
    isSearching: false
};

function debounce(fn, delay = 300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

function initializeApp() {
    initializeElements();
    initTheme();
    initAccessibility();
    initSavedLocations();
    setSearchFunction((cityName) => {
        const cityInput = document.getElementById('cityInput');
        if (!cityInput) return;
        cityInput.value = cityName;
        handleSearch();
    });
    setupEventListeners();
    rotatePlaceholderCities();
    checkAPIConfiguration();
}

function setupEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });

        const debouncedInput = debounce((event) => {
            const value = event.target.value.trim();
            if (value.length >= 3) {
                console.log('Sugerencias para:', value);
            }
        }, 300);
        cityInput.addEventListener('input', debouncedInput);
    }

    const geoBtn = document.getElementById('geoBtn');
    if (geoBtn) {
        geoBtn.addEventListener('click', handleGeolocation);
    }

    const unitBtn = document.querySelector('.unit-btn');
    if (unitBtn) {
        unitBtn.addEventListener('click', handleUnitToggle);
    }

    const saveCityBtn = document.getElementById('saveCurrentCity');
    if (saveCityBtn) {
        saveCityBtn.addEventListener('click', handleSaveCurrentCity);
    }
}

function updateWeatherViews(weather, forecast, unit) {
    appState.currentWeatherData = weather;
    displayWeather(weather, unit);
    updateSaveCityButton(weather.name);

    if (!forecast) return;

    displayForecast(forecast);
    createTemperatureChart(forecast, unit);
    displayHourlyForecast(forecast.list, unit === 'metric' ? 'C' : 'F');
}

async function handleSearch() {
    const city = getCityInputValue();
    if (!city) {
        showError(MESSAGES.ERROR_NO_CITY);
        return;
    }

    if (appState.isSearching) {
        return;
    }

    appState.isSearching = true;
    showLoading(`Buscando clima de ${city}...`);

    try {
        const { weather, forecast } = await getWeatherAndForecast(city, appState.currentUnit);
        updateWeatherViews(weather, forecast, appState.currentUnit);

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
        console.error('Error en busqueda:', error);
    } finally {
        appState.isSearching = false;
    }
}

async function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('La geolocalizacion no esta disponible en tu navegador');
        return;
    }

    if (DEMO_MODE) {
        showLoading('Detectando ubicacion...');
        setTimeout(async () => {
            try {
                const { weather, forecast } = await getWeatherAndForecast('panama', appState.currentUnit);
                updateWeatherViews(weather, forecast, appState.currentUnit);
                setTimeout(() => {
                    showError('MODO DEMO: Simulando ubicacion de Panama para portfolio.', 'info');
                }, 1000);
            } catch (error) {
                hideLoading();
                showError(error.message);
            }
        }, 800);
        return;
    }

    showLoading('Detectando tu ubicacion...');
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const { weather, forecast } = await getWeatherAndForecastByCoords(
                    latitude,
                    longitude,
                    appState.currentUnit
                );
                updateWeatherViews(weather, forecast, appState.currentUnit);
            } catch (error) {
                hideLoading();
                showError('Error al obtener datos del clima para tu ubicacion');
                console.error('Error en geolocalizacion:', error);
            }
        },
        (error) => {
            hideLoading();
            switch (error.code) {
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

async function handleUnitToggle() {
    const newUnit = appState.currentUnit === 'metric' ? 'imperial' : 'metric';
    appState.currentUnit = newUnit;
    updateUnitIcon(newUnit);
    updateChartTheme();

    if (!appState.currentWeatherData) return;

    const city = appState.currentWeatherData.name;
    showLoading(`Convirtiendo a ${newUnit === 'metric' ? 'Celsius' : 'Fahrenheit'}...`);

    try {
        const { weather, forecast } = await getWeatherAndForecast(city, newUnit);
        updateWeatherViews(weather, forecast, newUnit);
    } catch (error) {
        hideLoading();
        showError('Error al cambiar unidades');
        console.error('Error al cambiar unidades:', error);
        appState.currentUnit = newUnit === 'metric' ? 'imperial' : 'metric';
        updateUnitIcon(appState.currentUnit);
    }
}

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
        updateSaveCityButton(cityData.name);
        showError(result.message, 'info');
    } else {
        showError(result.message, 'info');
    }
}

function updateSaveCityButton(cityName) {
    const saveBtn = document.getElementById('saveCurrentCity');
    if (!saveBtn) return;

    const isSaved = Boolean(cityName) && isCitySaved(cityName);
    saveBtn.classList.toggle('saved', isSaved);
    saveBtn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
    saveBtn.title = isSaved ? 'Ciudad guardada' : 'Guardar ciudad actual';
    saveBtn.innerHTML = isSaved
        ? '<i class="wi wi-stars"></i> Guardada'
        : '<i class="wi wi-stars"></i> Guardar';
}

function rotatePlaceholderCities() {
    const cityInput = document.getElementById('cityInput');
    if (!cityInput) return;

    let currentCityIndex = 0;
    setInterval(() => {
        if (!cityInput.value) {
            cityInput.placeholder = `Buscar ciudad (ej: ${EXAMPLE_CITIES[currentCityIndex]})`;
            currentCityIndex = (currentCityIndex + 1) % EXAMPLE_CITIES.length;
        }
    }, 3000);
}

function checkAPIConfiguration() {
    if (DEMO_MODE) return;

    if (API_CONFIG.PROXY.ENABLED) {
        console.log('Modo seguro activo: consumo de APIs via proxy /api');
        return;
    }

    if (API_CONFIG.API_KEY === 'TU_API_KEY_AQUI') {
        setTimeout(() => {
            showError('Configuracion requerida: define API key o activa proxy seguro en produccion.', 'info');
        }, 1000);
    }
}

window.addEventListener('error', (event) => {
    console.error('Error global capturado:', event.error);
    showError('Ocurrio un error inesperado. Por favor recarga la pagina.');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rechazada no capturada:', event.reason);
    event.preventDefault();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

window.WeatherApp = {
    state: appState,
    search: handleSearch,
    geolocate: handleGeolocation,
    toggleUnits: handleUnitToggle
};
