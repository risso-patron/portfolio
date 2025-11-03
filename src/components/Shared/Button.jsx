import PropTypes from 'prop-types';

/**
 * Componente Button reutilizable
 */
export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  className = '',
  disabled = false,
}) => {
  const baseStyles = 'px-5 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:scale-105 active:scale-95',
    danger: 'bg-gradient-danger text-white hover:shadow-lg hover:scale-105 active:scale-95',
    secondary: 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'danger', 'secondary']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
