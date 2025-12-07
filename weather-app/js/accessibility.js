// ==================== ACCESSIBILITY MODULE ====================
// Mejoras de accesibilidad y navegación por teclado
// Jorge Luis Risso Patrón - 2025

/**
 * Configura navegación por teclado mejorada
 */
export function setupKeyboardNavigation() {
    // Escape key para cerrar mensajes de error
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage && errorMessage.style.display === 'block') {
                errorMessage.style.display = 'none';
            }
        }
    });
    
    // Tab trap en loading state (evitar navegar mientras carga)
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.addEventListener('focus', (e) => {
            if (loadingIndicator.style.display === 'block') {
                e.preventDefault();
                const cityInput = document.getElementById('cityInput');
                if (cityInput) cityInput.focus();
            }
        });
    }
    
    // Mejorar navegación en forecast items con flechas
    setupForecastKeyboardNav();
    
    console.log('✅ Navegación por teclado configurada');
}

/**
 * Configura navegación por flechas en el forecast
 */
function setupForecastKeyboardNav() {
    const forecastContainer = document.getElementById('forecastContainer');
    if (!forecastContainer) return;
    
    // Hacer forecast items focusables
    const observer = new MutationObserver(() => {
        const forecastItems = forecastContainer.querySelectorAll('.forecast-item');
        forecastItems.forEach((item, index) => {
            // Hacer items focusables
            item.setAttribute('tabindex', '0');
            
            // Navegación con flechas
            item.addEventListener('keydown', (e) => {
                let targetIndex = -1;
                
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    targetIndex = index + 1;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    targetIndex = index - 1;
                } else if (e.key === 'Home') {
                    targetIndex = 0;
                } else if (e.key === 'End') {
                    targetIndex = forecastItems.length - 1;
                }
                
                if (targetIndex >= 0 && targetIndex < forecastItems.length) {
                    e.preventDefault();
                    forecastItems[targetIndex].focus();
                }
            });
        });
    });
    
    observer.observe(forecastContainer, { childList: true });
}

/**
 * Anuncia cambios importantes a screen readers
 * @param {string} message - Mensaje a anunciar
 * @param {string} priority - 'polite' o 'assertive'
 */
export function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Eliminar después de anunciar
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Configura skip links para navegación rápida
 */
export function setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#weatherDisplay';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.setAttribute('aria-label', 'Saltar navegación e ir al contenido del clima');
    
    // Insertar al inicio del body
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    console.log('✅ Skip links configurados');
}

/**
 * Mejora focus visible para navegación por teclado
 */
export function enhanceFocusVisibility() {
    // Agregar clase al body cuando se usa teclado
    let isUsingKeyboard = false;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            isUsingKeyboard = true;
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        isUsingKeyboard = false;
        document.body.classList.remove('keyboard-nav');
    });
    
    console.log('✅ Focus visibility mejorado');
}

/**
 * Inicializa todas las mejoras de accesibilidad
 */
export function initAccessibility() {
    setupKeyboardNavigation();
    setupSkipLinks();
    enhanceFocusVisibility();
    
    console.log('♿ Módulo de accesibilidad inicializado');
}
