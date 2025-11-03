import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, TRANSACTION_TYPES } from '../constants/categories';
import { validateTransaction } from '../utils/validators';

/**
 * Custom hook para manejar toda la lógica de transacciones (ingresos y gastos)
 * @returns {Object} - Objeto con estados y funciones para manejar transacciones
 */
export const useTransactions = () => {
  // Estados en localStorage
  const [incomes, setIncomes] = useLocalStorage(STORAGE_KEYS.INCOMES, []);
  const [expenses, setExpenses] = useLocalStorage(STORAGE_KEYS.EXPENSES, []);
  
  // Estados locales
  const [filter, setFilter] = useState('all'); // 'all', 'income', 'expense'
  const [alert, setAlert] = useState(null); // { type: 'success'|'error', message: string }

  /**
   * Muestra una alerta temporal
   */
  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  }, []);

  /**
   * Agrega un nuevo ingreso
   */
  const addIncome = useCallback((description, amount) => {
    const validation = validateTransaction({ description, amount });
    
    if (!validation.isValid) {
      showAlert('error', validation.errors[0]);
      return false;
    }

    const newIncome = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type: TRANSACTION_TYPES.INCOME,
      createdAt: new Date().toISOString(),
    };

    setIncomes(prev => [...prev, newIncome]);
    showAlert('success', 'Ingreso agregado exitosamente');
    return true;
  }, [setIncomes, showAlert]);

  /**
   * Agrega un nuevo gasto
   */
  const addExpense = useCallback((description, category, amount) => {
    const validation = validateTransaction({ description, category, amount }, true);
    
    if (!validation.isValid) {
      showAlert('error', validation.errors[0]);
      return false;
    }

    const newExpense = {
      id: Date.now(),
      description: description.trim(),
      category,
      amount: parseFloat(amount),
      type: TRANSACTION_TYPES.EXPENSE,
      createdAt: new Date().toISOString(),
    };

    setExpenses(prev => [...prev, newExpense]);
    showAlert('success', 'Gasto agregado exitosamente');
    return true;
  }, [setExpenses, showAlert]);

  /**
   * Elimina un ingreso
   */
  const removeIncome = useCallback((id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ingreso?')) {
      setIncomes(prev => prev.filter(income => income.id !== id));
      showAlert('success', 'Ingreso eliminado');
    }
  }, [setIncomes, showAlert]);

  /**
   * Elimina un gasto
   */
  const removeExpense = useCallback((id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      showAlert('success', 'Gasto eliminado');
    }
  }, [setExpenses, showAlert]);

  // Cálculos automáticos (memoizados para performance)
  const totalIncome = useMemo(() => {
    return incomes.reduce((sum, income) => sum + income.amount, 0);
  }, [incomes]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const balance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  /**
   * Análisis de gastos por categoría
   */
  const categoryAnalysis = useMemo(() => {
    const categories = {};
    
    expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });

    return Object.entries(categories)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses, totalExpenses]);

  /**
   * Transacciones filtradas
   */
  const filteredTransactions = useMemo(() => {
    const allTransactions = [
      ...incomes.map(inc => ({ ...inc, type: 'income' })),
      ...expenses.map(exp => ({ ...exp, type: 'expense' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (filter === 'income') return allTransactions.filter(t => t.type === 'income');
    if (filter === 'expense') return allTransactions.filter(t => t.type === 'expense');
    return allTransactions;
  }, [incomes, expenses, filter]);

  return {
    // Estados
    incomes,
    expenses,
    filter,
    alert,
    
    // Funciones
    addIncome,
    addExpense,
    removeIncome,
    removeExpense,
    setFilter,
    showAlert,
    
    // Cálculos
    totalIncome,
    totalExpenses,
    balance,
    categoryAnalysis,
    filteredTransactions,
  };
};
