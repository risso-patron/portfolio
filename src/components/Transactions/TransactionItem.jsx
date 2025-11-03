import PropTypes from 'prop-types';
import { Button } from '../Shared/Button';
import { formatCurrency } from '../../utils/formatters';
import { EXPENSE_CATEGORIES } from '../../constants/categories';

/**
 * Componente TransactionItem - Item individual de transacción
 */
export const TransactionItem = ({ transaction, type, onRemove, index }) => {
  const isIncome = type === 'income';
  const category = EXPENSE_CATEGORIES.find(cat => cat.value === transaction.category);

  return (
    <div 
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:translate-x-1 transition-all duration-300 animate-slide-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex-1">
        <div className="font-semibold text-dark-500">{transaction.description}</div>
        {!isIncome && transaction.category && (
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <span>{category?.icon || '📦'}</span>
            <span>{transaction.category}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className={`font-bold text-lg ${isIncome ? 'text-accent-green' : 'text-accent-red'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        
        <Button
          variant="danger"
          onClick={onRemove}
          className="px-3 py-2 text-sm"
        >
          ×
        </Button>
      </div>
    </div>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['income', 'expense']).isRequired,
  onRemove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
