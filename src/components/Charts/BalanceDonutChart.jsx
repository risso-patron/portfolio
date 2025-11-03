import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { transformToDonutData, CustomTooltip } from '../../utils/chartHelpers';
import { formatCurrency } from '../../utils/formatters';

/**
 * Gráfico de Dona - Balance General (Ingresos vs Gastos)
 */
export const BalanceDonutChart = ({ totalIncome, totalExpenses }) => {
  const data = transformToDonutData(totalIncome, totalExpenses);
  const isEmpty = data.length === 0;
  const balance = totalIncome - totalExpenses;

  return (
    <ChartContainer
      title="Balance General"
      icon="💰"
      isEmpty={isEmpty}
      emptyMessage="Añade ingresos o gastos para ver tu balance"
      height="h-96"
    >
      <div className="relative h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
              label={renderCustomLabel}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={renderLegend}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Balance central en el centro de la dona */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(balance))}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {balance >= 0 ? 'Superávit' : 'Déficit'}
            </p>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
};

/**
 * Label personalizado para cada segmento
 */
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percentage }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#374151"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-sm font-semibold"
    >
      {percentage}%
    </text>
  );
};

/**
 * Formato de leyenda personalizada
 */
const renderLegend = (value, entry) => {
  return (
    <span className="text-sm font-medium text-gray-700">
      {value}: {formatCurrency(entry.payload.value)}
    </span>
  );
};

BalanceDonutChart.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired
};
