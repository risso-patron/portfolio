import PropTypes from 'prop-types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { transformToComparativeData, CustomTooltip } from '../../utils/chartHelpers';
import { formatCurrency } from '../../utils/formatters';

/**
 * Gráfico Comparativo - Mes Actual vs Mes Anterior
 */
export const ComparativeChart = ({ incomes, expenses }) => {
  const data = transformToComparativeData(incomes, expenses);
  const isEmpty = data.length === 0 || (data[0].mesActual === 0 && data[0].mesAnterior === 0);
  
  // Obtener nombres de meses para la leyenda
  const currentMonth = data[0]?.currentMonthName || 'Mes Actual';
  const previousMonth = data[0]?.previousMonthName || 'Mes Anterior';

  return (
    <ChartContainer
      title="Comparativa Mensual"
      icon="📅"
      isEmpty={isEmpty}
      emptyMessage="Necesitas transacciones en al menos dos meses"
      height="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<ComparativeTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => {
              if (value === 'mesActual') return currentMonth;
              if (value === 'mesAnterior') return previousMonth;
              return value;
            }}
          />
          
          <Bar 
            dataKey="mesAnterior" 
            fill="#cbd5e1" 
            radius={[8, 8, 0, 0]}
            animationBegin={0}
            animationDuration={800}
          />
          <Bar 
            dataKey="mesActual" 
            radius={[8, 8, 0, 0]}
            animationBegin={200}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.name === 'Ingresos' ? '#00b894' : '#ff7675'}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Indicadores de variación */}
      <div className="mt-4 grid grid-cols-2 gap-4 px-4">
        {data.map((item, index) => (
          <VariationIndicator 
            key={index}
            name={item.name}
            variation={parseFloat(item.variacion)}
            color={item.name === 'Ingresos' ? '#00b894' : '#ff7675'}
          />
        ))}
      </div>
    </ChartContainer>
  );
};

/**
 * Tooltip personalizado con información de variación
 */
const ComparativeTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const variation = parseFloat(data.variacion);

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm mb-1">
          <div 
            className="w-3 h-3 rounded" 
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Variación:</span>
          <span className={`font-bold ${variation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {variation >= 0 ? '+' : ''}{variation}%
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Indicador de variación porcentual
 */
const VariationIndicator = ({ name, variation, color }) => {
  const isPositive = variation >= 0;
  const isIncome = name === 'Ingresos';
  
  // Para ingresos: positivo es bueno, para gastos: negativo es bueno
  const isGood = isIncome ? isPositive : !isPositive;

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
      <div className="w-1 h-12 rounded" style={{ backgroundColor: color }} />
      <div className="flex-1">
        <p className="text-xs text-gray-500">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          {isPositive ? (
            <svg className={`w-4 h-4 ${isGood ? 'text-green-600' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className={`w-4 h-4 ${isGood ? 'text-green-600' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          <span className={`text-sm font-bold ${isGood ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{variation}%
          </span>
        </div>
      </div>
    </div>
  );
};

ComparativeChart.propTypes = {
  incomes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string
  })).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string
  })).isRequired
};
