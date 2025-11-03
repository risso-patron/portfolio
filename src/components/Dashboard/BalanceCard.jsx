import PropTypes from 'prop-types';
import { Card } from '../Shared/Card';
import { formatCurrency } from '../../utils/formatters';

/**
 * Componente BalanceCard - Muestra el balance con indicador visual
 */
export const BalanceCard = ({ totalIncome, totalExpenses, balance }) => {
  // Calcular porcentaje para la barra de progreso
  const percentage = totalIncome > 0 ? Math.max(0, (balance / totalIncome) * 100) : 0;
  const isPositive = balance >= 0;

  return (
    <Card className="bg-gradient-dark text-white col-span-full">
      <h2 className="text-xl font-medium mb-6 opacity-90">📊 Resumen Financiero</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Ingresos */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 transform transition-transform hover:scale-105">
          <div className="text-sm opacity-80 mb-2">Total Ingresos</div>
          <div className="text-3xl font-bold">{formatCurrency(totalIncome)}</div>
        </div>

        {/* Total Gastos */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 transform transition-transform hover:scale-105">
          <div className="text-sm opacity-80 mb-2">Total Gastos</div>
          <div className="text-3xl font-bold">{formatCurrency(totalExpenses)}</div>
        </div>

        {/* Balance */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 transform transition-transform hover:scale-105">
          <div className="text-sm opacity-80 mb-2">Balance</div>
          <div className={`text-3xl font-bold ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
            {formatCurrency(balance)}
          </div>
          
          {/* Barra de progreso */}
          <div className="mt-3 w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isPositive ? 'bg-gradient-success' : 'bg-gradient-danger'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

BalanceCard.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};
