import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  analyzeFinances, 
  suggestCategory, 
  predictNextMonthExpenses,
  generateReport,
  detectAnomalies,
  getUsageStats 
} from '../lib/anthropic'

/**
 * Hook personalizado para gestionar todas las features de IA
 * 
 * FEATURES:
 * - Análisis financiero inteligente
 * - Categorización automática
 * - Predicción de gastos
 * - Generación de reportes
 * - Detección de anomalías
 * - Gestión de loading y errores
 * - Caché de respuestas
 */
export const useAIInsights = (transactions = []) => {
  const { user } = useAuth()
  
  // Estados para análisis financiero
  const [analysis, setAnalysis] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState(null)
  
  // Estados para predicciones
  const [predictions, setPredictions] = useState(null)
  const [predicting, setPredicting] = useState(false)
  const [predictionError, setPredictionError] = useState(null)
  
  // Estados para alertas
  const [alerts, setAlerts] = useState([])
  const [alertsLoading, setAlertsLoading] = useState(false)
  const [alertsError, setAlertsError] = useState(null)
  
  // Estados para reporte
  const [report, setReport] = useState(null)
  const [reportLoading, setReportLoading] = useState(false)
  const [reportError, setReportError] = useState(null)
  
  // Estado para categorización
  const [suggestedCategory, setSuggestedCategory] = useState(null)
  const [categorizing, setCategorizing] = useState(false)
  
  /**
   * Analiza las finanzas del usuario
   */
  const runAnalysis = useCallback(async (monthlyTotals = null) => {
    if (!user) {
      setAnalysisError('Debes estar autenticado para usar esta función')
      return
    }

    if (!transactions || transactions.length === 0) {
      setAnalysisError('No hay transacciones para analizar')
      return
    }

    // Verificar si hay API key configurada
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
      setAnalysisError('API de IA no configurada')
      return
    }

    try {
      setAnalyzing(true)
      setAnalysisError(null)
      
      const result = await analyzeFinances(transactions, user.id, monthlyTotals)
      setAnalysis(result)
      
      // Guardar timestamp del último análisis
      localStorage.setItem('lastAnalysis', Date.now().toString())
      
    } catch (error) {
      console.error('Error en análisis:', error)
      setAnalysisError(error.message)
    } finally {
      setAnalyzing(false)
    }
  }, [transactions, user])

  /**
   * Sugiere categoría para una transacción
   */
  const getCategorySuggestion = useCallback(async (description, availableCategories) => {
    if (!description || description.trim().length < 3) {
      setSuggestedCategory(null)
      return
    }

    // Verificar si hay API key configurada
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
      return null
    }

    try {
      setCategorizing(true)
      const suggestion = await suggestCategory(description, availableCategories)
      setSuggestedCategory(suggestion)
      return suggestion
    } catch (error) {
      console.error('Error al sugerir categoría:', error)
      return null
    } finally {
      setCategorizing(false)
    }
  }, [])

  /**
   * Predice gastos del próximo mes
   */
  const predictExpenses = useCallback(async (monthlyData) => {
    if (!user) {
      setPredictionError('Debes estar autenticado para usar esta función')
      return
    }

    // Verificar si hay API key configurada
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
      setPredictionError('API de IA no configurada')
      return
    }

    try {
      setPredicting(true)
      setPredictionError(null)
      
      const result = await predictNextMonthExpenses(monthlyData, user.id)
      setPredictions(result)
      
    } catch (error) {
      console.error('Error en predicción:', error)
      setPredictionError(error.message)
    } finally {
      setPredicting(false)
    }
  }, [user])

  /**
   * Genera reporte en lenguaje natural
   */
  const createReport = useCallback(async (period = 'mensual') => {
    if (!user) {
      setReportError('Debes estar autenticado para usar esta función')
      return
    }

    // Verificar si hay API key configurada
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
      setReportError('API de IA no configurada')
      return
    }

    try {
      setReportLoading(true)
      setReportError(null)
      
      const result = await generateReport(transactions, period, user.id)
      setReport(result)
      
    } catch (error) {
      console.error('Error al generar reporte:', error)
      setReportError(error.message)
    } finally {
      setReportLoading(false)
    }
  }, [transactions, user])

  /**
   * Detecta gastos inusuales y anomalías
   */
  const checkAnomalies = useCallback(async () => {
    if (!user) {
      setAlertsError('Debes estar autenticado para usar esta función')
      return
    }

    if (!transactions || transactions.length === 0) {
      setAlerts([])
      return
    }

    // Verificar si hay API key configurada
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
      setAlerts([])
      return
    }

    try {
      setAlertsLoading(true)
      setAlertsError(null)
      
      const result = await detectAnomalies(transactions, user.id)
      setAlerts(result.alertas || [])
      
      // Guardar timestamp de última verificación
      localStorage.setItem('lastAnomalyCheck', Date.now().toString())
      
    } catch (error) {
      console.error('Error al detectar anomalías:', error)
      setAlertsError(error.message)
    } finally {
      setAlertsLoading(false)
    }
  }, [transactions, user])

  /**
   * Verifica si necesita ejecutar análisis automático
   * (cada 7 días o cuando hay cambios significativos)
   */
  useEffect(() => {
    // No ejecutar si no hay API key configurada
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) return
    
    if (!user || !transactions || transactions.length === 0) return

    const lastCheck = localStorage.getItem('lastAnomalyCheck')
    const now = Date.now()
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000

    // Si nunca se ha chequeado o han pasado 7 días
    if (!lastCheck || (now - parseInt(lastCheck)) > sevenDaysInMs) {
      checkAnomalies()
    }
  }, [transactions, user, checkAnomalies])

  /**
   * Limpia todos los estados
   */
  const clearAll = useCallback(() => {
    setAnalysis(null)
    setPredictions(null)
    setAlerts([])
    setReport(null)
    setSuggestedCategory(null)
    setAnalysisError(null)
    setPredictionError(null)
    setAlertsError(null)
    setReportError(null)
  }, [])

  
  /**
   * Obtiene estadísticas de uso de la IA
   */
  const getStats = useCallback(() => {
    return getUsageStats()
  }, [])

  return {
    // Análisis financiero
    analysis,
    analyzing,
    analysisError,
    runAnalysis,
    
    // Categorización
    suggestedCategory,
    categorizing,
    getCategorySuggestion,
    
    // Predicciones
    predictions,
    predicting,
    predictionError,
    predictExpenses,
    
    // Reportes
    report,
    reportLoading,
    reportError,
    createReport,
    
    // Alertas
    alerts,
    alertsLoading,
    alertsError,
    checkAnomalies,
    
    // Utilidades
    clearAll,
    getStats,
    
    // Estado general
    isAnyLoading: analyzing || predicting || reportLoading || alertsLoading || categorizing,
    hasAnyError: !!(analysisError || predictionError || reportError || alertsError)
  }
}
