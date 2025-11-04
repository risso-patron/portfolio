import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Card } from '../../components/Shared/Card';
import { Button } from '../../components/Shared/Button';
import { GoalProgress } from './GoalProgress';

/**
 * Componente para gestionar metas financieras
 */
export const GoalManager = ({ goals, onAddGoal, onUpdateProgress, onDeleteGoal, currentBalance }) => {
  const [showForm, setShowForm] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!goalName.trim() || !targetAmount || !targetDate) return;

    const newGoal = {
      id: Date.now(),
      name: goalName.trim(),
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      targetDate,
      createdAt: new Date().toISOString(),
    };

    onAddGoal(newGoal);
    
    // Reset form
    setGoalName('');
    setTargetAmount('');
    setCurrentAmount('');
    setTargetDate('');
    setShowForm(false);
  };

  const handleProgressUpdate = (goalId, newAmount) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal && newAmount >= goal.targetAmount) {
      // Meta alcanzada - mostrar confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    onUpdateProgress(goalId, newAmount);
  };

  // Calcular proyección de cumplimiento
  const calculateProjection = (goal) => {
    if (!goal.currentAmount || goal.currentAmount === 0) {
      return null;
    }

    const daysElapsed = Math.floor(
      (new Date() - new Date(goal.createdAt)) / (1000 * 60 * 60 * 24)
    );
    
    if (daysElapsed === 0) return null;

    const dailyRate = goal.currentAmount / daysElapsed;
    const remaining = goal.targetAmount - goal.currentAmount;
    const daysNeeded = Math.ceil(remaining / dailyRate);
    const projectedDate = new Date();
    projectedDate.setDate(projectedDate.getDate() + daysNeeded);

    const targetDate = new Date(goal.targetDate);
    const isOnTrack = projectedDate <= targetDate;

    return {
      projectedDate,
      daysNeeded,
      isOnTrack,
      dailyRate,
    };
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <Card title="🎯 Metas Financieras">
        <div className="space-y-4">
          {/* Lista de metas */}
          <AnimatePresence mode="popLayout">
            {goals.length > 0 ? (
              <div className="space-y-4">
                {goals.map((goal) => (
                  <GoalProgress
                    key={goal.id}
                    goal={goal}
                    projection={calculateProjection(goal)}
                    onUpdate={(newAmount) => handleProgressUpdate(goal.id, newAmount)}
                    onDelete={() => onDeleteGoal(goal.id)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                <p className="text-lg mb-2">No tienes metas financieras aún</p>
                <p className="text-sm">¡Crea tu primera meta y comienza a ahorrar!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón para mostrar formulario */}
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="w-full"
            >
              + Agregar Nueva Meta
            </Button>
          )}

          {/* Formulario para agregar meta */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3 bg-blue-50 dark:bg-blue-900/20"
              >
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Nombre de la Meta
                  </label>
                  <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="Ej: Vacaciones en Europa, Fondo de Emergencia"
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                      Monto Objetivo ($)
                    </label>
                    <input
                      type="number"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      placeholder="5000"
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                      Monto Actual ($)
                    </label>
                    <input
                      type="number"
                      value={currentAmount}
                      onChange={(e) => setCurrentAmount(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Fecha Objetivo
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Crear Meta
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setGoalName('');
                      setTargetAmount('');
                      setCurrentAmount('');
                      setTargetDate('');
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </>
  );
};

GoalManager.propTypes = {
  goals: PropTypes.array.isRequired,
  onAddGoal: PropTypes.func.isRequired,
  onUpdateProgress: PropTypes.func.isRequired,
  onDeleteGoal: PropTypes.func.isRequired,
  currentBalance: PropTypes.number,
};
