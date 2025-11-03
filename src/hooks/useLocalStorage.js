import { useState, useEffect } from 'react';

/**
 * Custom hook para manejar localStorage de manera reactiva
 * @param {string} key - Clave de localStorage
 * @param {any} initialValue - Valor inicial si no existe en localStorage
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
  // Pasamos una función de inicialización a useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Obtener del localStorage por clave
      const item = window.localStorage.getItem(key);
      // Parsear el JSON almacenado o devolver initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el estado y localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función (como en useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error al guardar en localStorage key "${key}":`, error);
    }
  };

  // Sincronizar con cambios en otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Error al sincronizar localStorage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
};
