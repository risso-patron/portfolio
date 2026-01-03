// ==================== SAVED LOCATIONS MODULE ====================
// Gestión de ciudades guardadas en LocalStorage
// Luis Risso Patrón - 2026

const STORAGE_KEY = 'weatherAppSavedCities';
const MAX_SAVED_CITIES = 5;

/**
 * Obtener ciudades guardadas
 */
export function getSavedCities() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error al leer ciudades guardadas:', error);
        return [];
    }
}

/**
 * Guardar ciudad
 */
export function saveCity(cityData) {
    try {
        const saved = getSavedCities();
        
        // Verificar si ya existe
        const exists = saved.some(city => 
            city.name.toLowerCase() === cityData.name.toLowerCase()
        );
        
        if (exists) {
            return { success: false, message: 'Ciudad ya guardada' };
        }
        
        // Verificar límite
        if (saved.length >= MAX_SAVED_CITIES) {
            return { 
                success: false, 
                message: `Máximo ${MAX_SAVED_CITIES} ciudades permitidas` 
            };
        }
        
        // Agregar nueva ciudad
        saved.push({
            name: cityData.name,
            country: cityData.country,
            temp: cityData.temp,
            icon: cityData.icon,
            savedAt: new Date().toISOString()
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        renderSavedCities();
        
        return { success: true, message: 'Ciudad guardada' };
    } catch (error) {
        console.error('Error al guardar ciudad:', error);
        return { success: false, message: 'Error al guardar' };
    }
}

/**
 * Eliminar ciudad guardada
 */
export function removeCity(cityName) {
    try {
        let saved = getSavedCities();
        saved = saved.filter(city => city.name !== cityName);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        renderSavedCities();
        return { success: true };
    } catch (error) {
        console.error('Error al eliminar ciudad:', error);
        return { success: false };
    }
}

/**
 * Verificar si una ciudad está guardada
 */
export function isCitySaved(cityName) {
    const saved = getSavedCities();
    return saved.some(city => city.name.toLowerCase() === cityName.toLowerCase());
}

/**
 * Renderizar ciudades guardadas en el DOM
 */
export function renderSavedCities() {
    const container = document.getElementById('savedCitiesContainer');
    if (!container) return;
    
    const saved = getSavedCities();
    
    if (saved.length === 0) {
        container.innerHTML = `
            <div class="empty-saved">
                <p>⭐ No tienes ciudades guardadas</p>
                <small>Busca una ciudad y guárdala para acceso rápido</small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = saved.map(city => `
        <div class="saved-city-card" data-city="${city.name}">
            <div class="saved-city-main">
                <div class="saved-city-icon">${city.icon}</div>
                <div class="saved-city-info">
                    <div class="saved-city-name">${city.name}</div>
                    <div class="saved-city-country">${city.country}</div>
                </div>
                <div class="saved-city-temp">${city.temp}°</div>
            </div>
            <button class="remove-city-btn" data-city="${city.name}" title="Eliminar ciudad">
                ×
            </button>
        </div>
    `).join('');
    
    // Event listeners para cards
    container.querySelectorAll('.saved-city-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-city-btn')) {
                const cityName = card.dataset.city;
                searchCityByName(cityName);
            }
        });
    });
    
    // Event listeners para botones de eliminar
    container.querySelectorAll('.remove-city-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cityName = btn.dataset.city;
            removeCity(cityName);
        });
    });
}

/**
 * Función global para buscar ciudad (será implementada en main.js)
 */
let searchCityByName;
export function setSearchFunction(fn) {
    searchCityByName = fn;
}

/**
 * Inicializar módulo
 */
export function initSavedLocations() {
    renderSavedCities();
    console.log('📍 Saved Locations initialized');
}
