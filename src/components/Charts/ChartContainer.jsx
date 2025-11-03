import PropTypes from 'prop-types';
import { Card } from '../Shared/Card';

/**
 * Contenedor común para todos los gráficos
 * Maneja loading, estados vacíos y estructura consistente
 */
export const ChartContainer = ({ 
  title, 
  icon, 
  children, 
  isEmpty = false,
  isLoading = false,
  emptyMessage = "No hay datos suficientes para mostrar este gráfico",
  height = "h-80"
}) => {
  return (
    <Card title={title} icon={icon}>
      <div className={`${height} w-full`}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : isEmpty ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <div className="h-full w-full">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * Skeleton de carga para gráficos
 */
const LoadingSkeleton = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="space-y-4 w-full px-8">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      <div className="h-32 bg-gray-200 rounded animate-pulse mt-8" />
    </div>
  </div>
);

/**
 * Estado vacío para gráficos sin datos
 */
const EmptyState = ({ message }) => (
  <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
    <svg 
      className="w-16 h-16 mb-4" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
      />
    </svg>
    <p className="text-sm font-medium">{message}</p>
    <p className="text-xs mt-2 text-center max-w-xs">
      Añade algunas transacciones para ver tus estadísticas aquí
    </p>
  </div>
);

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  isEmpty: PropTypes.bool,
  isLoading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  height: PropTypes.string
};
