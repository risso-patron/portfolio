import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Shared/Card';
import { Button } from '../Shared/Button';
import { EXPENSE_CATEGORIES } from '../../constants/categories';

/**
 * Componente TransactionForm - Formularios para agregar ingresos y gastos
 */
export const TransactionForm = ({ onAddIncome, onAddExpense }) => {
  // Estados para ingresos
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  // Estados para gastos
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Vivienda');
  const [expenseAmount, setExpenseAmount] = useState('');

  /**
   * Manejar submit de ingreso
   */
  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const success = onAddIncome(incomeDescription, incomeAmount);
    if (success) {
      setIncomeDescription('');
      setIncomeAmount('');
    }
  };

  /**
   * Manejar submit de gasto
   */
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const success = onAddExpense(expenseDescription, expenseCategory, expenseAmount);
    if (success) {
      setExpenseDescription('');
      setExpenseAmount('');
    }
  };

  /**
   * Manejar tecla Enter
   */
  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'income') {
        handleIncomeSubmit(e);
      } else {
        handleExpenseSubmit(e);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Formulario de Ingresos */}
      <Card title="Ingresos" icon="💰">
        <form onSubmit={handleIncomeSubmit} className="space-y-4">
          <div>
            <label htmlFor="incomeDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <input
              type="text"
              id="incomeDescription"
              value={incomeDescription}
              onChange={(e) => setIncomeDescription(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'income')}
              placeholder="Ej: Salario, Freelance"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="incomeAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad ($)
            </label>
            <input
              type="number"
              id="incomeAmount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'income')}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Agregar Ingreso
          </Button>
        </form>
      </Card>

      {/* Formulario de Gastos */}
      <Card title="Gastos" icon="💳">
        <form onSubmit={handleExpenseSubmit} className="space-y-4">
          <div>
            <label htmlFor="expenseDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <input
              type="text"
              id="expenseDescription"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'expense')}
              placeholder="Ej: Renta, Comida"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="expenseCategory" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="expenseCategory"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all bg-white"
            >
              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="expenseAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad ($)
            </label>
            <input
              type="number"
              id="expenseAmount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'expense')}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Agregar Gasto
          </Button>
        </form>
      </Card>
    </div>
  );
};

TransactionForm.propTypes = {
  onAddIncome: PropTypes.func.isRequired,
  onAddExpense: PropTypes.func.isRequired,
};
