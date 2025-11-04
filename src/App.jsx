import { useState, useEffect, useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTransactions } from './hooks/useTransactions';
import { TransactionForm } from './components/Transactions/TransactionForm';
import { TransactionList } from './components/Transactions/TransactionList';
import { BalanceCard } from './components/Dashboard/BalanceCard';
import { CategoryChart } from './components/Dashboard/CategoryChart';
import { Alert } from './components/Shared/Alert';
import { ThemeToggle } from './components/Shared/ThemeToggle';
import { ProfileMenu } from './components/Auth/ProfileMenu';
import MigrationDialog from './components/MigrationDialog';
import AuthPage from './pages/AuthPage';
import { hasPendingMigration } from './utils/dataMigration';
import { CreditCardManager } from './components/CreditCard/CreditCardManager';
// Nuevos gráficos avanzados
import { BalanceDonutChart } from './components/Charts/BalanceDonutChart';
import { TrendLineChart } from './components/Charts/TrendLineChart';
import { CategoryBarChart } from './components/Charts/CategoryBarChart';
import { ComparativeChart } from './components/Charts/ComparativeChart';
// COMPONENTES DE IA
import { AIInsightsPanel, AIAlerts, PredictiveChart } from './components/AI';
import { useAIInsights } from './hooks/useAIInsights';
// FEATURES PREMIUM
import { GoalManager } from './features/goals/GoalManager';
import { ExportManager } from './features/export/ExportManager';

/**
 * Componente principal de la aplicación con autenticación
 */
function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [showMigration, setShowMigration] = useState(false);
  const [creditCards, setCreditCards] = useState([]);
  const [goals, setGoals] = useState([]);

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

  // Funciones para tarjetas de crédito
  const handleAddCard = (card) => {
    setCreditCards([...creditCards, card]);
    showAlert(`Tarjeta "${card.name}" agregada exitosamente`, 'success');
    return true;
  };

  const handleUpdateDebt = (cardId, newDebt) => {
    setCreditCards(creditCards.map(card =>
      card.id === cardId ? { ...card, debt: newDebt } : card
    ));
  };

  const handleRemoveCard = (cardId) => {
    setCreditCards(creditCards.filter(card => card.id !== cardId));
    showAlert('Tarjeta eliminada', 'success');
  };

  // Funciones para metas financieras
  const handleAddGoal = (goal) => {
    setGoals([...goals, goal]);
    showAlert(`Meta "${goal.name}" creada exitosamente`, 'success');
    return true;
  };

  const handleUpdateGoalProgress = (goalId, newAmount) => {
    setGoals(goals.map(goal =>
      goal.id === goalId ? { ...goal, currentAmount: newAmount } : goal
    ));
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm('¿Estás seguro de eliminar esta meta?')) {
      setGoals(goals.filter(goal => goal.id !== goalId));
      showAlert('Meta eliminada', 'success');
    }
  };

  // HOOK DE IA - Combinar todas las transacciones
  const allTransactions = useMemo(() => {
    return [
      ...incomes.map(t => ({ ...t, type: 'income' })),
      ...expenses.map(t => ({ ...t, type: 'expense' }))
    ];
  }, [incomes, expenses]);

  const aiInsights = useAIInsights(allTransactions, user?.id);

  // ✅ PREPARAR DATOS MENSUALES PARA PREDICCIONES
  const monthlyData = useMemo(() => {
    const months = {};
    
    [...incomes, ...expenses].forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[monthKey]) {
        months[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }
      
      if (transaction.type === 'income' || incomes.includes(transaction)) {
        months[monthKey].income += transaction.amount;
      } else {
        months[monthKey].expense += transaction.amount;
      }
    });
    
    return Object.values(months).sort((a, b) => a.month.localeCompare(b.month));
  }, [incomes, expenses]);

  // Verificar si hay datos pendientes de migración
  useEffect(() => {
    if (user && hasPendingMigration()) {
      setShowMigration(true);
    }
  }, [user]);

  // Mostrar página de autenticación si no hay usuario
  if (!user && !authLoading) {
    return <AuthPage />;
  }

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 md:p-8">
      {/* Diálogo de migración */}
      {showMigration && (
        <MigrationDialog
          onClose={() => setShowMigration(false)}
          onComplete={(count) => {
            showAlert(`${count} transacciones migradas exitosamente`, 'success');
            setShowMigration(false);
            window.location.reload();
          }}
        />
      )}

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
        {/* Header con Profile Menu */}
        <header className="bg-gradient-dark dark:bg-gray-800 text-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-center">
              <h1 className="text-4xl md:text-5xl font-light mb-3">
                Calculadora de Presupuesto Personal
              </h1>
              <p className="text-lg opacity-90">
                Gestiona tus finanzas personales de manera inteligente con IA
              </p>
            </div>
            <div className="ml-4 flex items-center gap-4">
              {/* Toggle Dark Mode */}
              <ThemeToggle />
              
              {/* ✅ ALERTAS DE IA */}
              <AIAlerts
                alerts={aiInsights.alerts}
                loading={aiInsights.checkingAnomalies}
                onRefresh={aiInsights.checkAnomalies}
              />
              <ProfileMenu />
            </div>
          </div>
        </header>

        {/* Main content grid */}
        <div className="space-y-8">
          {/* Card de balance */}
          <BalanceCard
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
          />

          {/* ✅ PANEL DE ANÁLISIS FINANCIERO CON IA */}
          <AIInsightsPanel
            analysis={aiInsights.analysis}
            loading={aiInsights.analyzing}
            error={aiInsights.analysisError}
            onAnalyze={() => aiInsights.runAnalysis({ totalIncome, totalExpenses, balance })}
          />

          {/* FORMULARIOS PARA AGREGAR TRANSACCIONES */}
          <TransactionForm
            onAddIncome={addIncome}
            onAddExpense={addExpense}
          />

          {/* GESTOR DE TARJETAS DE CRÉDITO */}
          <CreditCardManager
            creditCards={creditCards}
            onAddCard={handleAddCard}
            onUpdateDebt={handleUpdateDebt}
            onRemoveCard={handleRemoveCard}
          />

          {/* 🎯 GESTOR DE METAS FINANCIERAS */}
          <GoalManager
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateProgress={handleUpdateGoalProgress}
            onDeleteGoal={handleDeleteGoal}
            currentBalance={balance}
          />

          {/* 📥 EXPORTADOR DE DATOS */}
          <ExportManager
            incomes={incomes}
            expenses={expenses}
            categoryAnalysis={categoryAnalysis}
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

          {/* ✅ GRÁFICO DE PREDICCIONES CON IA */}
          {monthlyData.length >= 2 && (
            <PredictiveChart
              predictions={aiInsights.predictions}
              loading={aiInsights.predicting}
              error={aiInsights.predictionsError}
              onPredict={() => aiInsights.predictExpenses(monthlyData)}
              historicalData={monthlyData}
            />
          )}

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

/**
 * App wrapper con AuthProvider y ThemeProvider
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

