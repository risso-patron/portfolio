// ==================== THEME MODULE ====================
// Sistema de temas Dark/Light con persistencia
// Jorge Luis Risso Patrón - 2025

/**
 * Inicializa el sistema de temas
 */
export function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    
    // Cargar tema guardado o usar Dark por defecto
    const savedTheme = localStorage.getItem('weather-app-theme') || 'dark';
    applyTheme(savedTheme);
    
    // Event listener para toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            
            // Guardar preferencia
            localStorage.setItem('weather-app-theme', newTheme);
            
            // Anunciar cambio para screen readers
            announceThemeChange(newTheme);
        });
    }
}

/**
 * Aplica el tema especificado
 * @param {string} theme - 'dark' o 'light'
 */
function applyTheme(theme) {
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.src = 'icons/sun.webp';
            themeIcon.alt = 'Tema claro';
        }
    } else {
        document.body.classList.remove('light-theme');
        if (themeIcon) {
            themeIcon.src = 'icons/moon.webp';
            themeIcon.alt = 'Tema oscuro';
        }
    }
    
    console.log(`🎨 Tema aplicado: ${theme}`);
}

/**
 * Anuncia el cambio de tema para accesibilidad
 * @param {string} theme - Tema aplicado
 */
function announceThemeChange(theme) {
    const message = theme === 'light' ? 'Tema claro activado' : 'Tema oscuro activado';
    
    // Crear anuncio temporal para screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Obtiene el tema actual
 * @returns {string} 'dark' o 'light'
 */
export function getCurrentTheme() {
    return document.body.classList.contains('light-theme') ? 'light' : 'dark';
}
