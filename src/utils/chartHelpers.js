/**
 * Utilidades para transformación de datos de gráficos
 */

import { formatCurrency, formatDate } from './formatters';

/**
 * Transforma transacciones a formato para gráfico de dona (Balance)
 */
export const transformToDonutData = (totalIncome, totalExpenses) => {
  if (totalIncome === 0 && totalExpenses === 0) {
    return [];
  }

  return [
    {
      name: 'Ingresos',
      value: totalIncome,
      color: '#00b894',
      percentage: totalIncome + totalExpenses > 0 
        ? ((totalIncome / (totalIncome + totalExpenses)) * 100).toFixed(1)
        : 0
    },
    {
      name: 'Gastos',
      value: totalExpenses,
      color: '#ff7675',
      percentage: totalIncome + totalExpenses > 0 
        ? ((totalExpenses / (totalIncome + totalExpenses)) * 100).toFixed(1)
        : 0
    }
  ];
};

/**
 * Transforma transacciones a formato para gráfico de líneas (Tendencias)
 * Agrupa por fecha y acumula ingresos/gastos
 */
export const transformToLineData = (incomes, expenses, days = 30) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  // Crear objeto para mapear datos por fecha
  const dataMap = {};

  // Inicializar todos los días con valores 0
  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateKey = date.toISOString().split('T')[0];
    dataMap[dateKey] = {
      date: formatDate(date, { month: 'short', day: 'numeric' }),
      ingresos: 0,
      gastos: 0,
      ingresosAcum: 0,
      gastosAcum: 0
    };
  }

  // Sumar ingresos por fecha
  incomes.forEach(income => {
    const dateKey = income.date || new Date().toISOString().split('T')[0];
    if (dataMap[dateKey]) {
      dataMap[dateKey].ingresos += income.amount;
    }
  });

  // Sumar gastos por fecha
  expenses.forEach(expense => {
    const dateKey = expense.date || new Date().toISOString().split('T')[0];
    if (dataMap[dateKey]) {
      dataMap[dateKey].gastos += expense.amount;
    }
  });

  // Convertir a array ordenado y calcular acumulados
  const sortedData = Object.keys(dataMap)
    .sort()
    .map(key => dataMap[key]);

  let ingresosAcumulado = 0;
  let gastosAcumulado = 0;

  return sortedData.map(item => {
    ingresosAcumulado += item.ingresos;
    gastosAcumulado += item.gastos;
    return {
      ...item,
      ingresosAcum: ingresosAcumulado,
      gastosAcum: gastosAcumulado
    };
  });
};

/**
 * Transforma análisis de categorías a formato para gráfico de barras
 * Retorna top N categorías ordenadas de mayor a menor
 */
export const transformToBarData = (categoryAnalysis, topN = 5) => {
  if (!categoryAnalysis || categoryAnalysis.length === 0) {
    return [];
  }

  // Ordenar por monto descendente y tomar top N
  const topCategories = [...categoryAnalysis]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, topN);

  return topCategories.map((cat, index) => ({
    name: cat.name,
    monto: cat.amount,
    porcentaje: cat.percentage,
    color: getCategoryColor(index),
    icon: cat.icon
  }));
};

/**
 * Genera datos comparativos entre mes actual y anterior
 */
export const transformToComparativeData = (incomes, expenses) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Calcular mes anterior
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const filterByMonth = (transactions, month, year) => {
    return transactions.filter(t => {
      const date = new Date(t.date || new Date());
      return date.getMonth() === month && date.getFullYear() === year;
    });
  };

  const currentIncomes = filterByMonth(incomes, currentMonth, currentYear);
  const currentExpenses = filterByMonth(expenses, currentMonth, currentYear);
  const previousIncomes = filterByMonth(incomes, previousMonth, previousYear);
  const previousExpenses = filterByMonth(expenses, previousMonth, previousYear);

  const sumAmount = (arr) => arr.reduce((sum, item) => sum + item.amount, 0);

  const currentIncomesTotal = sumAmount(currentIncomes);
  const currentExpensesTotal = sumAmount(currentExpenses);
  const previousIncomesTotal = sumAmount(previousIncomes);
  const previousExpensesTotal = sumAmount(previousExpenses);

  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  return [
    {
      name: 'Ingresos',
      mesActual: currentIncomesTotal,
      mesAnterior: previousIncomesTotal,
      variacion: previousIncomesTotal > 0 
        ? (((currentIncomesTotal - previousIncomesTotal) / previousIncomesTotal) * 100).toFixed(1)
        : 0,
      currentMonthName: monthNames[currentMonth],
      previousMonthName: monthNames[previousMonth]
    },
    {
      name: 'Gastos',
      mesActual: currentExpensesTotal,
      mesAnterior: previousExpensesTotal,
      variacion: previousExpensesTotal > 0 
        ? (((currentExpensesTotal - previousExpensesTotal) / previousExpensesTotal) * 100).toFixed(1)
        : 0,
      currentMonthName: monthNames[currentMonth],
      previousMonthName: monthNames[previousMonth]
    }
  ];
};

/**
 * Colores para categorías en gráficos de barras
 */
const getCategoryColor = (index) => {
  const colors = [
    '#667eea', // Morado principal
    '#764ba2', // Morado oscuro
    '#00b894', // Verde
    '#fdcb6e', // Amarillo
    '#e17055', // Naranja
    '#0984e3', // Azul
    '#6c5ce7', // Morado claro
    '#a29bfe'  // Lavanda
  ];
  return colors[index % colors.length];
};

/**
 * Tooltip personalizado para gráficos
 */
export const CustomTooltip = ({ active, payload, label, type = 'default' }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      {label && <p className="font-semibold text-gray-700 mb-2">{label}</p>}
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(entry.value)}
          </span>
          {entry.payload.percentage && (
            <span className="text-gray-500 text-xs">
              ({entry.payload.percentage}%)
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Verifica si hay datos suficientes para mostrar gráficos
 */
export const hasChartData = (incomes, expenses) => {
  return (incomes && incomes.length > 0) || (expenses && expenses.length > 0);
};
