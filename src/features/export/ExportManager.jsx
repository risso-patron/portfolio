import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '../../components/Shared/Card';
import { Button } from '../../components/Shared/Button';
import { exportToCSV, exportToPDF } from './exportUtils';

/**
 * Componente para exportar datos a CSV/PDF
 */
export const ExportManager = ({ incomes, expenses, categoryAnalysis, totalIncome, totalExpenses, balance }) => {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [includeCharts, setIncludeCharts] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Filtrar transacciones por rango de fechas
  const filterByDateRange = (transactions) => {
    return transactions.filter(t => {
      const date = new Date(t.date);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      return date >= start && date <= end;
    });
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const filteredIncomes = filterByDateRange(incomes);
      const filteredExpenses = filterByDateRange(expenses);
      
      await exportToCSV(filteredIncomes, filteredExpenses, dateRange);
    } catch (error) {
      console.error('Error al exportar CSV:', error);
      alert('Error al exportar CSV. Intenta nuevamente.');
    } finally {
      setExporting(false);
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const filteredIncomes = filterByDateRange(incomes);
      const filteredExpenses = filterByDateRange(expenses);
      
      // Calcular totales filtrados
      const filteredTotalIncome = filteredIncomes.reduce((sum, i) => sum + i.amount, 0);
      const filteredTotalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
      const filteredBalance = filteredTotalIncome - filteredTotalExpenses;
      
      await exportToPDF(
        filteredIncomes,
        filteredExpenses,
        categoryAnalysis,
        {
          totalIncome: filteredTotalIncome,
          totalExpenses: filteredTotalExpenses,
          balance: filteredBalance,
        },
        dateRange,
        includeCharts
      );
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Error al exportar PDF. Intenta nuevamente.');
    } finally {
      setExporting(false);
    }
  };

  // Calcular número de transacciones en el rango
  const filteredCount = filterByDateRange([...incomes, ...expenses]).length;

  return (
    <Card title="📥 Exportar Datos">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Exporta tus transacciones y reportes financieros
        </p>

        {/* Selector de rango de fechas */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Fecha Fin
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none"
            />
          </div>
        </div>

        {/* Info de transacciones */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <span className="font-semibold">{filteredCount} transacciones</span> en el rango seleccionado
          </p>
        </div>

        {/* Opciones de exportación */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm dark:text-gray-200">
              Incluir gráficos en PDF
            </span>
          </label>
        </div>

        {/* Botones de exportación */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleExportCSV}
              disabled={exporting || filteredCount === 0}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {exporting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Exportando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  📊 Exportar CSV
                </span>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleExportPDF}
              disabled={exporting || filteredCount === 0}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {exporting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  📄 Exportar PDF
                </span>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Formatos soportados */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Formatos soportados:
          </p>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• <strong>CSV:</strong> Archivo de Excel con todas las transacciones</li>
            <li>• <strong>PDF:</strong> Reporte profesional con resumen y gráficos</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

ExportManager.propTypes = {
  incomes: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired,
  categoryAnalysis: PropTypes.array.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};
