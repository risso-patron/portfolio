import PropTypes from 'prop-types';
import { useEffect } from 'react';

/**
 * Componente Alert para mostrar mensajes de éxito/error
 */
export const Alert = ({ type = 'success', message, onClose }) => {
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  const styles = {
    success: 'bg-green-100 border-green-500 text-green-800',
    error: 'bg-red-100 border-red-500 text-red-800',
    info: 'bg-blue-100 border-blue-500 text-blue-800',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  if (!message) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 animate-fade-in`}>
      <div className={`${styles[type]} border-l-4 p-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}>
        <span className="text-xl font-bold">{icons[type]}</span>
        <p className="flex-1 font-medium">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xl hover:scale-110 transition-transform"
            aria-label="Cerrar"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']),
  message: PropTypes.string,
  onClose: PropTypes.func,
};
