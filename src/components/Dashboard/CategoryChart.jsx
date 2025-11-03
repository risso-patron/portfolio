import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '../Shared/Card';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { EXPENSE_CATEGORIES } from '../../constants/categories';

/**
 * Colores para el gráfico de categorías
 */
const COLORS = ['#667eea', '#764ba2', '#2ecc71', '#3498db', '#e74c3c', '#f39c12', '#1abc9c', '#95a5a6'];

/**
 * Componente CategoryChart - Gráfico de análisis por categorías
 */
export const CategoryChart = ({ categoryAnalysis }) => {
  if (!categoryAnalysis || categoryAnalysis.length === 0) {
    return (
      <Card title="Gastos por Categoría" icon="📊" className="col-span-full">
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">📊</p>
          <p>Sin gastos por categoría</p>
        </div>
      </Card>
    );
  }

  // Preparar datos para Recharts
  const chartData = categoryAnalysis.map((item) => {
    const category = EXPENSE_CATEGORIES.find(cat => cat.value === item.category);
    return {
      name: category?.label || item.category,
      value: item.amount,
      percentage: item.percentage,
      icon: category?.icon || '📦',
    };
  });

  /**
   * Custom label para el gráfico
   */
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card title="Gastos por Categoría" icon="📊" className="col-span-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico circular */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => `${entry.payload.icon} ${value}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lista de categorías */}
        <div className="space-y-3">
          <h3 className="font-semibold text-dark-500 mb-4">Desglose detallado</h3>
          {categoryAnalysis.map((item, index) => {
            const category = EXPENSE_CATEGORIES.find(cat => cat.value === item.category);
            return (
              <div 
                key={item.category}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{category?.icon || '📦'}</span>
                  <span className="font-medium text-dark-500">{item.category}</span>
                </div>
                
                {/* Barra de progreso */}
                <div className="flex-1 mx-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>

                <div className="text-right min-w-[120px]">
                  <div className="font-bold text-dark-500">{formatCurrency(item.amount)}</div>
                  <div className="text-sm text-gray-500">{formatPercentage(item.percentage)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

CategoryChart.propTypes = {
  categoryAnalysis: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};
