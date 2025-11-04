import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Componente para visualizar el progreso de una meta individual
 */
export const GoalProgress = ({ goal, projection, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newAmount, setNewAmount] = useState(goal.currentAmount);

  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = goal.targetAmount - goal.currentAmount;
  const isComplete = percentage >= 100;

  // Calcular días restantes
  const today = new Date();
  const targetDate = new Date(goal.targetDate);
  const daysRemaining = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = daysRemaining < 0;

  // Color de la barra según progreso
  const getProgressColor = () => {
    if (isComplete) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Color del estado
  const getStatusColor = () => {
    if (isComplete) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    if (projection?.isOnTrack) return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
    if (isOverdue) return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
  };

  const handleSaveAmount = () => {
    onUpdate(parseFloat(newAmount));
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white dark:bg-gray-800"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {goal.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Meta: ${goal.targetAmount.toFixed(2)}
          </p>
        </div>
        
        {/* Badge de estado */}
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
          {isComplete ? '✓ Completada' : 
           isOverdue ? '⚠️ Vencida' : 
           projection?.isOnTrack ? '✓ En camino' : '⚠️ Retrasada'}
        </div>
      </div>

      {/* Barra de progreso animada */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <motion.div
            className={`h-full ${getProgressColor()} relative`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Brillo animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
          <span>{percentage.toFixed(1)}% completado</span>
          <span>Faltan: ${remaining.toFixed(2)}</span>
        </div>
      </div>

      {/* Monto actual - Editable */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Ahorrado
          </label>
          {isEditing ? (
            <div className="flex gap-1">
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full px-2 py-1 text-sm border-2 border-blue-500 rounded focus:outline-none dark:bg-gray-700 dark:text-white"
                step="0.01"
                min="0"
                max={goal.targetAmount}
                autoFocus
              />
              <button
                onClick={handleSaveAmount}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                ✓
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                ${goal.currentAmount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Fecha Límite
          </label>
          <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
            <span className="text-sm font-medium dark:text-gray-200">
              {new Date(goal.targetDate).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isOverdue 
                ? `Venció hace ${Math.abs(daysRemaining)} días` 
                : `${daysRemaining} días restantes`}
            </p>
          </div>
        </div>
      </div>

      {/* Proyección */}
      {projection && !isComplete && (
        <div className={`text-xs p-2 rounded ${projection.isOnTrack ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
          {projection.isOnTrack ? (
            <p>
              📈 Vas por buen camino! A este ritmo (${projection.dailyRate.toFixed(2)}/día),
              alcanzarás tu meta el {projection.projectedDate.toLocaleDateString('es-ES')}
            </p>
          ) : (
            <p>
              ⚠️ Necesitas ahorrar ${((goal.targetAmount - goal.currentAmount) / Math.max(daysRemaining, 1)).toFixed(2)}/día
              para alcanzar tu meta a tiempo
            </p>
          )}
        </div>
      )}

      {/* Botón eliminar */}
      <button
        onClick={onDelete}
        className="mt-3 w-full text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
      >
        Eliminar Meta
      </button>
    </motion.div>
  );
};

GoalProgress.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    targetAmount: PropTypes.number.isRequired,
    currentAmount: PropTypes.number.isRequired,
    targetDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  projection: PropTypes.shape({
    projectedDate: PropTypes.instanceOf(Date),
    daysNeeded: PropTypes.number,
    isOnTrack: PropTypes.bool,
    dailyRate: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
