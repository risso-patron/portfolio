import PropTypes from 'prop-types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { transformToBarData, CustomTooltip } from '../../utils/chartHelpers';
import { formatCurrency } from '../../utils/formatters';

/**
 * Gráfico de Barras - Top 5 Categorías de Gasto
 */
export const CategoryBarChart = ({ categoryAnalysis, topN = 5 }) => {
  const data = transformToBarData(categoryAnalysis, topN);
  const isEmpty = data.length === 0;

  return (
    <ChartContainer
      title={`Top ${topN} Categorías de Gasto`}
      icon="📊"
      isEmpty={isEmpty}
      emptyMessage="Añade gastos para ver el análisis por categorías"
      height="h-96"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis 
            type="category" 
            dataKey="name"
            tick={renderCustomYAxisTick}
            stroke="#9ca3af"
            width={90}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="monto" 
            radius={[0, 8, 8, 0]}
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
            <LabelList 
              dataKey="monto" 
              position="right" 
              formatter={(value) => formatCurrency(value)}
              className="text-xs font-semibold fill-gray-700"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/**
 * Tick personalizado del eje Y con iconos
 */
const renderCustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        fill="#374151"
        className="text-sm font-medium"
      >
        {payload.value}
      </text>
    </g>
  );
};

CategoryBarChart.propTypes = {
  categoryAnalysis: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    icon: PropTypes.string
  })).isRequired,
  topN: PropTypes.number
};
