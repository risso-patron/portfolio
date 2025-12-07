// ==================== CONFIGURACIÓN ====================
// Weather App Configuration
// Jorge Luis Risso Patrón - 2025

// API Configuration
export const API_CONFIG = {
    // OpenWeatherMap API
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    // ⚠️ IMPORTANTE: En producción, mover a variables de entorno
    // Para desarrollo local, reemplaza 'TU_API_KEY_AQUI' con tu API key real
    API_KEY: '8d3599da8294f99fb8f1bc2ac0c7829b',
    
    // API Limits (Free tier)
    RATE_LIMIT: {
        CALLS_PER_MINUTE: 60,
        CALLS_PER_MONTH: 1000000
    },
    
    // Default settings
    DEFAULT_UNIT: 'metric', // 'metric' = Celsius, 'imperial' = Fahrenheit
    LANGUAGE: 'es',
    
    // Cache settings
    CACHE_DURATION: 10 * 60 * 1000 // 10 minutos en milisegundos
};

// Pexels API Configuration (opcional - para fondos realistas)
export const PEXELS_CONFIG = {
    API_KEY: window.PEXELS_CONFIG?.API_KEY || null,
    ENABLED: false // Deshabilitado por defecto
};

// Weather Icons Mapping
// Mapea códigos de OpenWeatherMap a clases de Weather Icons Library
export const WEATHER_ICONS = {
    '01d': 'wi wi-day-sunny',           // Despejado día
    '01n': 'wi wi-night-clear',         // Despejado noche
    '02d': 'wi wi-day-cloudy',          // Pocas nubes día
    '02n': 'wi wi-night-alt-cloudy',    // Pocas nubes noche
    '03d': 'wi wi-cloud',               // Nubes dispersas
    '03n': 'wi wi-cloud',               // Nubes dispersas noche
    '04d': 'wi wi-cloudy',              // Muy nublado
    '04n': 'wi wi-cloudy',              // Muy nublado noche
    '09d': 'wi wi-showers',             // Lluvia ligera
    '09n': 'wi wi-showers',             // Lluvia ligera noche
    '10d': 'wi wi-day-rain',            // Lluvia día
    '10n': 'wi wi-night-alt-rain',      // Lluvia noche
    '11d': 'wi wi-day-thunderstorm',    // Tormenta día
    '11n': 'wi wi-night-alt-thunderstorm', // Tormenta noche
    '13d': 'wi wi-day-snow',            // Nieve día
    '13n': 'wi wi-night-alt-snow',      // Nieve noche
    '50d': 'wi wi-day-fog',             // Niebla día
    '50n': 'wi wi-night-fog'            // Niebla noche
};

// Demo Mode Configuration (para portfolio sin API key)
export const DEMO_MODE = false; // Cambiar a true para modo demo

// Demo data para testing sin API key
export const DEMO_DATA = {
    cities: {
        'panama': {
            name: 'Ciudad de Panamá',
            main: { temp: 28, feels_like: 32, humidity: 78, pressure: 1012, temp_max: 32, temp_min: 24 },
            weather: [{ main: 'Partly Cloudy', description: 'parcialmente nublado', icon: '02d' }],
            wind: { speed: 12, deg: 180 },
            clouds: { all: 40 },
            visibility: 10000,
            coord: { lat: 8.9824, lon: -79.5199 },
            sys: { country: 'PA', sunrise: 1702807200, sunset: 1702850400 }
        },
        'madrid': {
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

// UI Messages
export const MESSAGES = {
    LOADING: 'Obteniendo información del clima...',
    ERROR_NO_CITY: 'Por favor ingresa el nombre de una ciudad',
    ERROR_API_KEY: 'API Key no configurada. Ve las instrucciones en el README.',
    ERROR_CITY_NOT_FOUND: 'Ciudad no encontrada. Verifica el nombre e intenta nuevamente.',
    ERROR_NETWORK: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
    ERROR_PERMISSION_DENIED: 'Permiso de ubicación denegado',
    ERROR_POSITION_UNAVAILABLE: 'Información de ubicación no disponible',
    ERROR_TIMEOUT: 'Tiempo de espera agotado',
    ERROR_UNKNOWN: 'Error desconocido al obtener ubicación',
    INFO_DEMO_MODE: 'MODO DEMO: Mostrando datos simulados para portfolio.'
};

// Example cities for placeholder rotation
export const EXAMPLE_CITIES = [
    'Panamá', 
    'Madrid', 
    'Londres', 
    'Nueva York', 
    'Tokio',
    'París',
    'Buenos Aires',
    'Miami'
];
