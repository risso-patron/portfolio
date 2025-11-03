/**
 * Valida que una descripción no esté vacía
 * @param {string} description - Descripción a validar
 * @returns {boolean} - true si es válida
 */
export const validateDescription = (description) => {
  return typeof description === 'string' && description.trim().length > 0;
};

/**
 * Valida que una cantidad sea un número positivo
 * @param {number|string} amount - Cantidad a validar
 * @returns {boolean} - true si es válida
 */
export const validateAmount = (amount) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0;
};

/**
 * Valida que una categoría esté en la lista de categorías permitidas
 * @param {string} category - Categoría a validar
 * @param {Array} allowedCategories - Lista de categorías permitidas
 * @returns {boolean} - true si es válida
 */
export const validateCategory = (category, allowedCategories) => {
  return allowedCategories.some(cat => cat.value === category);
};

/**
 * Valida un objeto de transacción completo
 * @param {Object} transaction - Transacción a validar
 * @param {string} transaction.description - Descripción
 * @param {number} transaction.amount - Cantidad
 * @param {string} transaction.category - Categoría (opcional para ingresos)
 * @param {boolean} requireCategory - Si la categoría es requerida
 * @returns {Object} - { isValid: boolean, errors: Array }
 */
export const validateTransaction = (transaction, requireCategory = false) => {
  const errors = [];

  if (!validateDescription(transaction.description)) {
    errors.push('La descripción no puede estar vacía');
  }

  if (!validateAmount(transaction.amount)) {
    errors.push('La cantidad debe ser mayor a 0');
  }

  if (requireCategory && !transaction.category) {
    errors.push('Debe seleccionar una categoría');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitiza un string para evitar XSS
 * @param {string} str - String a sanitizar
 * @returns {string} - String sanitizado
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
