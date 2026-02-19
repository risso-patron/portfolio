// ==================== CONFIGURATION ====================
// Weather App configuration
// Jorge Luis Risso Patron - 2026

const isBrowser = typeof window !== 'undefined';
const runtimeConfig = isBrowser ? (window.WEATHER_CONFIG || {}) : {};
const isLocalHost = isBrowser
    ? ['localhost', '127.0.0.1'].includes(window.location.hostname)
    : false;

const envApiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENWEATHER_API_KEY)
    ? import.meta.env.VITE_OPENWEATHER_API_KEY
    : null;
const envGiphyKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GIPHY_API_KEY)
    ? import.meta.env.VITE_GIPHY_API_KEY
    : null;

const useProxyDefault = !isLocalHost;
const useProxy = typeof runtimeConfig.USE_PROXY === 'boolean'
    ? runtimeConfig.USE_PROXY
    : useProxyDefault;

const openWeatherKey = envApiKey || runtimeConfig.API_KEY || 'TU_API_KEY_AQUI';
const giphyKey = envGiphyKey || runtimeConfig.GIPHY_API_KEY || 'TU_GIPHY_API_KEY_AQUI';

export const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    API_KEY: openWeatherKey,
    GIPHY_BASE_URL: 'https://api.giphy.com/v1/gifs',
    GIPHY_API_KEY: giphyKey,
    RATE_LIMIT: {
        CALLS_PER_MINUTE: 60,
        CALLS_PER_MONTH: 1000000,
        WARNING_THRESHOLD: 50
    },
    DEFAULT_UNIT: 'metric',
    LANGUAGE: 'es',
    CACHE_DURATION: 10 * 60 * 1000,
    PROXY: {
        ENABLED: useProxy,
        WEATHER_ENDPOINT: '/api/weather',
        FORECAST_ENDPOINT: '/api/forecast',
        GIPHY_ENDPOINT: '/api/giphy'
    }
};

export const PEXELS_CONFIG = {
    API_KEY: isBrowser ? (window.PEXELS_CONFIG?.API_KEY || null) : null,
    ENABLED: false
};

export const WEATHER_ICONS = {
    '01d': 'wi wi-day-sunny',
    '01n': 'wi wi-night-clear',
    '02d': 'wi wi-day-cloudy',
    '02n': 'wi wi-night-alt-cloudy',
    '03d': 'wi wi-cloud',
    '03n': 'wi wi-cloud',
    '04d': 'wi wi-cloudy',
    '04n': 'wi wi-cloudy',
    '09d': 'wi wi-showers',
    '09n': 'wi wi-showers',
    '10d': 'wi wi-day-rain',
    '10n': 'wi wi-night-alt-rain',
    '11d': 'wi wi-day-thunderstorm',
    '11n': 'wi wi-night-alt-thunderstorm',
    '13d': 'wi wi-day-snow',
    '13n': 'wi wi-night-alt-snow',
    '50d': 'wi wi-day-fog',
    '50n': 'wi wi-night-fog'
};

export const DEMO_MODE = false;

export const DEMO_DATA = {
    cities: {
        panama: {
            name: 'Ciudad de Panama',
            main: { temp: 28, feels_like: 32, humidity: 78, pressure: 1012, temp_max: 32, temp_min: 24 },
            weather: [{ main: 'Partly Cloudy', description: 'parcialmente nublado', icon: '02d' }],
            wind: { speed: 12, deg: 180 },
            clouds: { all: 40 },
            visibility: 10000,
            coord: { lat: 8.9824, lon: -79.5199 },
            sys: { country: 'PA', sunrise: 1702807200, sunset: 1702850400 }
        },
        madrid: {
            name: 'Madrid',
            main: { temp: 18, feels_like: 16, humidity: 65, pressure: 1015, temp_max: 20, temp_min: 15 },
            weather: [{ main: 'Clear', description: 'cielo claro', icon: '01d' }],
            wind: { speed: 8, deg: 270 },
            clouds: { all: 10 },
            visibility: 10000,
            coord: { lat: 40.4168, lon: -3.7038 },
            sys: { country: 'ES', sunrise: 1702801800, sunset: 1702835400 }
        }
    }
};

export const MESSAGES = {
    LOADING: 'Obteniendo informacion del clima...',
    ERROR_NO_CITY: 'Por favor ingresa el nombre de una ciudad',
    ERROR_API_KEY: 'Configuracion requerida: agrega API key en entorno local o usa proxy seguro.',
    ERROR_CITY_NOT_FOUND: 'Ciudad no encontrada. Verifica el nombre e intenta nuevamente.',
    ERROR_NETWORK: 'Error de conexion. Verifica tu internet e intenta nuevamente.',
    ERROR_PERMISSION_DENIED: 'Permiso de ubicacion denegado',
    ERROR_POSITION_UNAVAILABLE: 'Informacion de ubicacion no disponible',
    ERROR_TIMEOUT: 'Tiempo de espera agotado',
    ERROR_UNKNOWN: 'Error desconocido al obtener ubicacion',
    INFO_DEMO_MODE: 'MODO DEMO: Mostrando datos simulados para portfolio.'
};

export const EXAMPLE_CITIES = [
    'Panama',
    'Madrid',
    'Londres',
    'Nueva York',
    'Tokio',
    'Paris',
    'Buenos Aires',
    'Miami'
];
