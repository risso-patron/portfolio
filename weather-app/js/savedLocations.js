// ==================== SAVED LOCATIONS MODULE ====================
// Gestión de ubicaciones favoritas con LocalStorage
// Luis Risso Patrón - 2026

const STORAGE_KEY = 'weatherApp_savedLocations';
const MAX_LOCATIONS = 5;

/**
 * Obtiene las ubicaciones guardadas
 * @returns {Array} Array de ubicaciones
 */
export function getSavedLocations() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error leyendo ubicaciones guardadas:', error);
        return [];
    }
}

/**
 * Guarda una nueva ubicación
 * @param {Object} location - {name, country, lat, lon}
 * @returns {boolean} true si se guardó exitosamente
 */
export function saveLocation(location) {
    try {
        const locations = getSavedLocations();
        
        // Verificar si ya existe
        const exists = locations.some(loc => 
            loc.name.toLowerCase() === location.name.toLowerCase()
        );
        
        if (exists) {
            console.log('📍 Ubicación ya guardada');
            return false;
        }
        
        // Verificar límite
        if (locations.length >= MAX_LOCATIONS) {
            console.warn(`⚠️ Máximo de ${MAX_LOCATIONS} ubicaciones alcanzado`);
            return false;
        }
        
        // Agregar nueva ubicación
        locations.push({
            name: location.name,
            country: location.country || '',
            lat: location.lat,
            lon: location.lon,
            savedAt: Date.now()
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
        console.log('✅ Ubicación guardada:', location.name);
        return true;
    } catch (error) {
        console.error('Error guardando ubicación:', error);
        return false;
    }
}

/**
 * Elimina una ubicación guardada
 * @param {string} locationName - Nombre de la ubicación
 * @returns {boolean} true si se eliminó
 */
export function removeLocation(locationName) {
    try {
        const locations = getSavedLocations();
        const filtered = locations.filter(loc => 
            loc.name.toLowerCase() !== locationName.toLowerCase()
        );
        
        if (filtered.length === locations.length) {
            console.log('📍 Ubicación no encontrada');
            return false;
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        console.log('🗑️ Ubicación eliminada:', locationName);
        return true;
    } catch (error) {
        console.error('Error eliminando ubicación:', error);
        return false;
    }
}

/**
 * Verifica si una ubicación está guardada
 * @param {string} locationName - Nombre de la ubicación
 * @returns {boolean}
 */
export function isLocationSaved(locationName) {
    const locations = getSavedLocations();
    return locations.some(loc => 
        loc.name.toLowerCase() === locationName.toLowerCase()
    );
}

/**
 * Renderiza la lista de ubicaciones guardadas
 * @param {HTMLElement} container - Contenedor DOM
 * @param {Function} onLocationClick - Callback al hacer click
 */
export function renderSavedLocations(container, onLocationClick) {
    if (!container) return;
    
    const locations = getSavedLocations();
    
    if (locations.length === 0) {
        container.innerHTML = `
            <div class="saved-locations-empty">
                <p>No hay ubicaciones guardadas</p>
                <small>Busca una ciudad y haz click en el ícono ⭐ para guardarla</small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = locations.map(loc => `
        <div class="saved-location-item" data-location="${loc.name}">
            <div class="saved-location-info">
                <div class="saved-location-name">${loc.name}</div>
                <div class="saved-location-country">${loc.country}</div>
            </div>
            <button class="saved-location-remove" data-location="${loc.name}" aria-label="Eliminar ${loc.name}">
                ×
            </button>
        </div>
    `).join('');
    
    // Event listeners
    container.querySelectorAll('.saved-location-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('saved-location-remove')) {
                const locationName = item.dataset.location;
                onLocationClick(locationName);
            }
        });
    });
    
    container.querySelectorAll('.saved-location-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const locationName = btn.dataset.location;
            if (removeLocation(locationName)) {
                renderSavedLocations(container, onLocationClick);
            }
        });
    });
}

/**
 * Obtiene el botón de guardar/eliminar ubicación
 * @param {string} currentCity - Ciudad actual
 * @returns {string} HTML del botón
 */
export function getSaveButtonHTML(currentCity) {
    const isSaved = isLocationSaved(currentCity);
    
    return `
        <button 
            class="save-location-btn ${isSaved ? 'saved' : ''}" 
            id="saveLocationBtn"
            aria-label="${isSaved ? 'Eliminar de favoritos' : 'Guardar en favoritos'}"
            title="${isSaved ? 'Eliminar de favoritos' : 'Guardar en favoritos'}">
            ${isSaved ? '⭐' : '☆'}
        </button>
    `;
}
