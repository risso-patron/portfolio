import { useTransactions } from './hooks/useTransactions';
import { TransactionForm } from './components/Transactions/TransactionForm';
import { TransactionList } from './components/Transactions/TransactionList';
import { BalanceCard } from './components/Dashboard/BalanceCard';
import { CategoryChart } from './components/Dashboard/CategoryChart';
import { Alert } from './components/Shared/Alert';
// Nuevos gráficos avanzados
import { BalanceDonutChart } from './components/Charts/BalanceDonutChart';
import { TrendLineChart } from './components/Charts/TrendLineChart';
import { CategoryBarChart } from './components/Charts/CategoryBarChart';
import { ComparativeChart } from './components/Charts/ComparativeChart';

/**
 * Componente principal de la aplicación
 */
function App() {
  const {
    incomes,
    expenses,
    alert,
    addIncome,
    addExpense,
    removeIncome,
    removeExpense,
    showAlert,
    totalIncome,
    totalExpenses,
    balance,
    categoryAnalysis,
  } = useTransactions();

  return (
    <div className="min-h-screen p-5 md:p-8">
      {/* Alert global */}
      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message}
          onClose={() => showAlert(null)}
        />
      )}

      {/* Container principal */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-gradient-dark text-white rounded-2xl p-8 mb-8 text-center shadow-xl">
          <h1 className="text-4xl md:text-5xl font-light mb-3">
            Calculadora de Presupuesto Personal
          </h1>
          <p className="text-lg opacity-90">
            Gestiona tus finanzas personales de manera inteligente
          </p>
        </header>

        {/* Main content grid */}
        <div className="space-y-8">
          {/* Formularios de entrada */}
          <TransactionForm 
            onAddIncome={addIncome}
            onAddExpense={addExpense}
          />

          {/* Card de balance */}
          <BalanceCard
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
          />

          {/* Sección de Gráficos Avanzados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico de Dona - Balance General */}
            <BalanceDonutChart
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />

            {/* Gráfico de Categorías Original (mejorado) */}
            <CategoryChart categoryAnalysis={categoryAnalysis} />
          </div>

          {/* Gráfico de Tendencias - Ancho completo */}
          <TrendLineChart
            incomes={incomes}
            expenses={expenses}
            days={30}
          />

          {/* Gráficos de Barras y Comparativa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top 5 Categorías de Gasto */}
            <CategoryBarChart
              categoryAnalysis={categoryAnalysis}
              topN={5}
            />

            {/* Comparativa Mensual */}
            <ComparativeChart
              incomes={incomes}
              expenses={expenses}
            />
          </div>

          {/* Listas de transacciones */}
          <TransactionList
            incomes={incomes}
            expenses={expenses}
            onRemoveIncome={removeIncome}
            onRemoveExpense={removeExpense}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-white/80 text-sm">
          <p>© 2025 Budget Calculator | Desarrollado con React + Vite + TailwindCSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

