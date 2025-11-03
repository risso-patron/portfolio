import PropTypes from 'prop-types';

/**
 * Componente Card reutilizable con diseño glass morphism
 */
export const Card = ({ children, className = '', title, icon }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-5">
          {icon && <span className="text-3xl">{icon}</span>}
          {title && (
            <h2 className="text-2xl font-semibold text-dark-500">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
};
