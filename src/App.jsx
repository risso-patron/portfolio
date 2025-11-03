import { useTransactions } from './hooks/useTransactions';
import { TransactionForm } from './components/Transactions/TransactionForm';
import { TransactionList } from './components/Transactions/TransactionList';
import { BalanceCard } from './components/Dashboard/BalanceCard';
import { CategoryChart } from './components/Dashboard/CategoryChart';
import { Alert } from './components/Shared/Alert';

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

          {/* Listas de transacciones */}
          <TransactionList
            incomes={incomes}
            expenses={expenses}
            onRemoveIncome={removeIncome}
            onRemoveExpense={removeExpense}
          />

          {/* Card de balance */}
          <BalanceCard
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
          />

          {/* Gráfico de categorías */}
          <CategoryChart categoryAnalysis={categoryAnalysis} />
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

