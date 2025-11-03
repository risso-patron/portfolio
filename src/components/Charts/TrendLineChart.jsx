import PropTypes from 'prop-types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { transformToLineData, CustomTooltip, hasChartData } from '../../utils/chartHelpers';

/**
 * Gráfico de Líneas - Tendencias Temporales (Últimos 30 días)
 */
export const TrendLineChart = ({ incomes, expenses, days = 30 }) => {
  const data = transformToLineData(incomes, expenses, days);
  const isEmpty = !hasChartData(incomes, expenses);

  return (
    <ChartContainer
      title="Tendencias de los Últimos 30 Días"
      icon="📈"
      isEmpty={isEmpty}
      emptyMessage="No hay transacciones en los últimos 30 días"
      height="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={renderLegendText}
          />
          
          {/* Línea de Ingresos Acumulados */}
          <Line
            type="monotone"
            dataKey="ingresosAcum"
            stroke="#00b894"
            strokeWidth={3}
            dot={{ fill: '#00b894', r: 4 }}
            activeDot={{ r: 6 }}
            name="Ingresos"
            animationBegin={0}
            animationDuration={1000}
          />
          
          {/* Línea de Gastos Acumulados */}
          <Line
            type="monotone"
            dataKey="gastosAcum"
            stroke="#ff7675"
            strokeWidth={3}
            dot={{ fill: '#ff7675', r: 4 }}
            activeDot={{ r: 6 }}
            name="Gastos"
            animationBegin={200}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/**
 * Formato de texto de leyenda
 */
const renderLegendText = (value) => {
  return <span className="text-sm font-medium text-gray-700">{value} Acumulados</span>;
};

TrendLineChart.propTypes = {
  incomes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string
  })).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string
  })).isRequired,
  days: PropTypes.number
};
