# 📊 Guía de Uso - Gráficos Avanzados

Esta guía explica cómo usar y personalizar los nuevos componentes de gráficos avanzados implementados en la Calculadora de Presupuesto.

## 📁 Archivos Creados

### Componentes de Gráficos (`src/components/Charts/`)

1. **ChartContainer.jsx** - Contenedor reutilizable con estados de carga y vacío
2. **BalanceDonutChart.jsx** - Gráfico de dona para balance general
3. **TrendLineChart.jsx** - Gráfico de líneas para tendencias temporales
4. **CategoryBarChart.jsx** - Gráfico de barras para top categorías
5. **ComparativeChart.jsx** - Gráfico comparativo mes actual vs anterior
6. **index.js** - Exportaciones centralizadas

### Utilidades (`src/utils/`)

7. **chartHelpers.js** - Funciones de transformación de datos y helpers

## 🎨 Componentes Disponibles

### 1. BalanceDonutChart

**Propósito:** Visualiza la proporción entre ingresos y gastos totales.

**Props:**
```jsx
<BalanceDonutChart
  totalIncome={number}    // Total de ingresos
  totalExpenses={number}  // Total de gastos
/>
```

**Características:**
- ✅ Gráfico de dona con colores verde (#00b894) y rojo (#ff7675)
- ✅ Balance central en el medio del gráfico
- ✅ Porcentajes en cada segmento
- ✅ Indicador de superávit/déficit
- ✅ Tooltip con montos formateados
- ✅ Leyenda interactiva

**Ejemplo de uso:**
```jsx
import { BalanceDonutChart } from './components/Charts';

function Dashboard() {
  const { totalIncome, totalExpenses } = useTransactions();
  
  return (
    <BalanceDonutChart
      totalIncome={totalIncome}
      totalExpenses={totalExpenses}
    />
  );
}
```

---

### 2. TrendLineChart

**Propósito:** Muestra la evolución acumulada de ingresos y gastos en el tiempo.

**Props:**
```jsx
<TrendLineChart
  incomes={array}   // Array de ingresos con {id, amount, date}
  expenses={array}  // Array de gastos con {id, amount, date}
  days={number}     // Días a mostrar (default: 30)
/>
```

**Características:**
- ✅ Dos líneas: ingresos (verde) y gastos (rojo)
- ✅ Eje X con fechas de los últimos N días
- ✅ Valores acumulados en eje Y
- ✅ Grid de fondo sutil
- ✅ Puntos interactivos con tooltip
- ✅ Animación suave de entrada

**Ejemplo de uso:**
```jsx
<TrendLineChart
  incomes={incomes}
  expenses={expenses}
  days={30}  // Últimos 30 días
/>
```

---

### 3. CategoryBarChart

**Propósito:** Muestra las categorías de gasto más utilizadas en orden descendente.

**Props:**
```jsx
<CategoryBarChart
  categoryAnalysis={array}  // Análisis de categorías
  topN={number}            // Top N categorías (default: 5)
/>
```

**Características:**
- ✅ Barras horizontales ordenadas de mayor a menor
- ✅ Colores únicos por categoría
- ✅ Labels con montos en el lado derecho
- ✅ Iconos de categoría en eje Y
- ✅ Animación al cargar/actualizar

**Formato de datos esperado:**
```javascript
categoryAnalysis = [
  {
    name: "Alimentación",
    amount: 450.00,
    percentage: 35.5,
    icon: "🍽️"
  },
  // ... más categorías
]
```

**Ejemplo de uso:**
```jsx
const { categoryAnalysis } = useTransactions();

<CategoryBarChart
  categoryAnalysis={categoryAnalysis}
  topN={5}
/>
```

---

### 4. ComparativeChart

**Propósito:** Compara ingresos y gastos del mes actual vs mes anterior.

**Props:**
```jsx
<ComparativeChart
  incomes={array}   // Array completo de ingresos
  expenses={array}  // Array completo de gastos
/>
```

**Características:**
- ✅ Barras agrupadas por tipo (ingresos/gastos)
- ✅ Comparativa automática mes actual vs anterior
- ✅ Indicadores de variación porcentual
- ✅ Código de colores según si la variación es positiva/negativa
- ✅ Tooltip con información detallada

**Ejemplo de uso:**
```jsx
<ComparativeChart
  incomes={incomes}
  expenses={expenses}
/>
```

**Lógica de colores en indicadores:**
- **Ingresos:** Verde si aumentan ↑, Rojo si disminuyen ↓
- **Gastos:** Verde si disminuyen ↓, Rojo si aumentan ↑

---

## 🛠️ Utilidades de Transformación

### chartHelpers.js

Contiene funciones para transformar datos de transacciones al formato requerido por Recharts:

#### `transformToDonutData(totalIncome, totalExpenses)`
Transforma totales en formato para gráfico de dona.

**Retorna:**
```javascript
[
  { name: 'Ingresos', value: 1500, color: '#00b894', percentage: '60.0' },
  { name: 'Gastos', value: 1000, color: '#ff7675', percentage: '40.0' }
]
```

#### `transformToLineData(incomes, expenses, days = 30)`
Agrupa transacciones por fecha y calcula acumulados.

**Retorna:**
```javascript
[
  { date: '1 Nov', ingresos: 100, gastos: 50, ingresosAcum: 100, gastosAcum: 50 },
  { date: '2 Nov', ingresos: 200, gastos: 80, ingresosAcum: 300, gastosAcum: 130 },
  // ... 30 días
]
```

#### `transformToBarData(categoryAnalysis, topN = 5)`
Toma top N categorías ordenadas por monto.

**Retorna:**
```javascript
[
  { name: 'Alimentación', monto: 450, porcentaje: 35.5, color: '#667eea', icon: '🍽️' },
  // ... top 5
]
```

#### `transformToComparativeData(incomes, expenses)`
Compara totales entre mes actual y anterior.

**Retorna:**
```javascript
[
  {
    name: 'Ingresos',
    mesActual: 2000,
    mesAnterior: 1800,
    variacion: '11.1',
    currentMonthName: 'Nov',
    previousMonthName: 'Oct'
  },
  // ... igual para gastos
]
```

#### `CustomTooltip({ active, payload, label, type })`
Componente tooltip personalizado reutilizable.

#### `hasChartData(incomes, expenses)`
Verifica si hay datos suficientes para mostrar gráficos.

---

## 🎯 Integración en App.jsx

**Layout recomendado:**

```jsx
import {
  BalanceDonutChart,
  TrendLineChart,
  CategoryBarChart,
  ComparativeChart
} from './components/Charts';

function App() {
  const {
    incomes,
    expenses,
    totalIncome,
    totalExpenses,
    categoryAnalysis
  } = useTransactions();

  return (
    <div className="space-y-8">
      {/* Grid 2 columnas - Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BalanceDonutChart
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />
        <CategoryChart categoryAnalysis={categoryAnalysis} />
      </div>

      {/* Ancho completo - Tendencias */}
      <TrendLineChart
        incomes={incomes}
        expenses={expenses}
        days={30}
      />

      {/* Grid 2 columnas - Análisis detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryBarChart
          categoryAnalysis={categoryAnalysis}
          topN={5}
        />
        <ComparativeChart
          incomes={incomes}
          expenses={expenses}
        />
      </div>
    </div>
  );
}
```

---

## 🎨 Personalización

### Cambiar Colores

**En chartHelpers.js:**

```javascript
// Colores de balance
const COLORS = {
  income: '#00b894',   // Verde para ingresos
  expense: '#ff7675',  // Rojo para gastos
};

// Colores de categorías (array de 8 colores)
const CATEGORY_COLORS = [
  '#667eea', '#764ba2', '#00b894', '#fdcb6e',
  '#e17055', '#0984e3', '#6c5ce7', '#a29bfe'
];
```

### Cambiar Altura de Gráficos

En cada componente, la prop `height` del `ChartContainer`:

```jsx
<ChartContainer
  title="Mi Gráfico"
  icon="📊"
  height="h-96"  // Cambia: h-64, h-80, h-96, h-screen/2
>
```

Clases disponibles:
- `h-64` - 256px
- `h-80` - 320px
- `h-96` - 384px
- `h-screen/2` - 50% de altura de pantalla

### Personalizar Tooltip

Crea tu propio tooltip:

```jsx
const MiTooltip = ({ active, payload }) => {
  if (!active || !payload) return null;
  
  return (
    <div className="bg-gray-800 text-white p-3 rounded shadow-xl">
      {payload.map((item, i) => (
        <div key={i}>
          <strong>{item.name}:</strong> ${item.value}
        </div>
      ))}
    </div>
  );
};

// Usar en gráfico:
<Tooltip content={<MiTooltip />} />
```

---

## 🚀 Performance

### Optimizaciones Implementadas

1. **Memoización en useTransactions:** 
   - `totalIncome`, `totalExpenses`, `balance`, `categoryAnalysis` usan `useMemo`

2. **Animaciones Progresivas:**
   - Delays escalonados entre gráficos para UX suave

3. **Lazy Loading (Opcional):**
```jsx
import { lazy, Suspense } from 'react';

const TrendLineChart = lazy(() => import('./Charts/TrendLineChart'));

<Suspense fallback={<ChartContainer isEmpty />}>
  <TrendLineChart incomes={incomes} expenses={expenses} />
</Suspense>
```

---

## 📱 Responsive Design

Todos los gráficos usan `ResponsiveContainer` de Recharts:

- **Mobile (< 768px):** 1 columna
- **Tablet (768px - 1024px):** 1-2 columnas
- **Desktop (> 1024px):** 2 columnas en grid

```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Se apilan en mobile, lado a lado en desktop */}
</div>
```

---

## 🐛 Solución de Problemas

### "No hay datos suficientes para mostrar"

**Causa:** No hay transacciones en `incomes` o `expenses`.

**Solución:** Añade al menos una transacción desde el formulario.

### El gráfico no se actualiza

**Causa:** El componente padre no pasa las props actualizadas.

**Solución:** Verifica que `useTransactions()` esté en el componente padre y las props se pasen correctamente.

### Error: "Cannot read property 'map' of undefined"

**Causa:** Props `incomes` o `expenses` son `undefined`.

**Solución:** Inicializa como array vacío:
```jsx
<TrendLineChart
  incomes={incomes || []}
  expenses={expenses || []}
/>
```

### Los colores no se muestran

**Causa:** TailwindCSS no está generando las clases de color.

**Solución:** Usa estilos inline con Recharts:
```jsx
<Cell fill="#00b894" />  // En lugar de className
```

---

## 📊 Ejemplos de Datos

### Datos de Prueba para Desarrollo

```javascript
const mockIncomes = [
  { id: 1, amount: 1500, date: '2025-11-01', description: 'Salario' },
  { id: 2, amount: 200, date: '2025-11-15', description: 'Freelance' }
];

const mockExpenses = [
  { id: 3, amount: 600, category: 'Vivienda 🏠', date: '2025-11-05', description: 'Alquiler' },
  { id: 4, amount: 150, category: 'Alimentación 🍽️', date: '2025-11-10', description: 'Supermercado' },
  { id: 5, amount: 80, category: 'Transporte 🚗', date: '2025-11-12', description: 'Gasolina' }
];
```

---

## 🎓 Recursos Adicionales

- **Recharts Docs:** https://recharts.org/en-US/
- **TailwindCSS:** https://tailwindcss.com/docs
- **React Hooks:** https://react.dev/reference/react

---

**Desarrollado con 💜 por Jorge Luis Risso Patrón**
