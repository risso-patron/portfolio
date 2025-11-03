# 💰 Calculadora de Presupuesto Personal

Aplicación web moderna para gestión de finanzas personales construida con React, Vite y TailwindCSS. Permite llevar un control detallado de ingresos y gastos con análisis por categorías y visualización de datos.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Características

- ✅ **Gestión de Ingresos y Gastos**: Añade, visualiza y elimina transacciones fácilmente
- 📊 **Análisis por Categorías**: 8 categorías predefinidas con visualización en gráfico circular
- 💾 **Persistencia de Datos**: Almacenamiento local con sincronización automática entre pestañas
- 📱 **Diseño Responsive**: Interfaz adaptable a dispositivos móviles, tablets y desktop
- 🎨 **UI Moderna**: Diseño con gradientes morados/azules, glass morphism y animaciones suaves
- ⚡ **Validación en Tiempo Real**: Validación de formularios con feedback inmediato
- 📈 **Balance Automático**: Cálculo instantáneo de balance con indicadores visuales
- 🔔 **Notificaciones**: Alertas toast para confirmación de acciones

## 🚀 Demo

🔗 **[Ver Demo en Vivo](https://luisitorisso.github.io/budget-calculator-react/)** *(próximamente)*

## 📸 Capturas

*[Las capturas se agregarán después del despliegue]*

## 🛠️ Tecnologías

### Core
- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Build tool y dev server ultrarrápido
- **TailwindCSS 3** - Framework CSS utility-first

### Dependencias
- **Recharts** - Biblioteca de gráficos para visualización de datos
- **PropTypes** - Validación de tipos en componentes React

### Herramientas de Desarrollo
- **PostCSS** - Procesador CSS
- **Autoprefixer** - Prefijos CSS automáticos
- **ESLint** - Linting de código JavaScript

## 💡 Estructura del Proyecto

```
budget-calculator-react/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── BalanceCard.jsx      # Tarjeta de resumen financiero
│   │   │   └── CategoryChart.jsx    # Gráfico de categorías
│   │   ├── Shared/
│   │   │   ├── Alert.jsx            # Notificaciones toast
│   │   │   ├── Button.jsx           # Botón reutilizable
│   │   │   └── Card.jsx             # Tarjeta con glass morphism
│   │   └── Transactions/
│   │       ├── TransactionForm.jsx  # Formularios de ingreso/gasto
│   │       ├── TransactionList.jsx  # Lista de transacciones
│   │       └── TransactionItem.jsx  # Item individual
│   ├── constants/
│   │   └── categories.js            # Categorías y constantes
│   ├── hooks/
│   │   ├── useLocalStorage.js       # Hook de persistencia
│   │   └── useTransactions.js       # Lógica de negocio
│   ├── utils/
│   │   ├── formatters.js            # Formateadores de datos
│   │   └── validators.js            # Validadores de entrada
│   ├── App.jsx                      # Componente principal
│   ├── index.css                    # Estilos globales
│   └── main.jsx                     # Punto de entrada
├── tailwind.config.js               # Configuración Tailwind
├── postcss.config.js                # Configuración PostCSS
└── vite.config.js                   # Configuración Vite
```

## 📦 Instalación

### Prerrequisitos

- Node.js 16+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Luisitorisso/budget-calculator-react.git
cd budget-calculator-react
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🎮 Uso

### Añadir un Ingreso
1. En la sección "Nuevo Ingreso", ingresa la descripción (ej: "Salario mensual")
2. Ingresa el monto (ej: "1500")
3. Presiona Enter o haz clic en "Añadir Ingreso"

### Añadir un Gasto
1. En la sección "Nuevo Gasto", ingresa la descripción (ej: "Alquiler")
2. Ingresa el monto (ej: "600")
3. Selecciona una categoría (ej: "Vivienda 🏠")
4. Presiona Enter o haz clic en "Añadir Gasto"

### Eliminar una Transacción
- Haz clic en el botón "Eliminar" (🗑️) junto a cualquier ingreso o gasto

### Ver Análisis
- El balance se actualiza automáticamente en la tarjeta superior
- El gráfico circular muestra la distribución de gastos por categoría
- Las barras de progreso indican el porcentaje de cada categoría

## 🎓 Aprendizajes

Durante la construcción de este proyecto, aprendí:

- **Custom Hooks Complejos**: Creación de hooks personalizados (`useTransactions`, `useLocalStorage`) para encapsular lógica de negocio reutilizable
- **Gestión de Estado Avanzada**: Manejo de múltiples estados relacionados (ingresos, gastos, filtros, alertas) con hooks de React
- **Persistencia con LocalStorage**: Implementación de sincronización automática entre pestañas usando eventos de storage
- **Arquitectura de Componentes**: Organización modular con separación de responsabilidades (Shared, Dashboard, Transactions)
- **TailwindCSS Avanzado**: Configuración personalizada de temas, gradientes y animaciones
- **Validación de Datos**: Implementación de validadores reutilizables con manejo de errores detallado
- **Visualización de Datos**: Integración de Recharts para gráficos interactivos con customización
- **PropTypes**: Validación de props en componentes para desarrollo más seguro
- **Optimización con useMemo**: Memoización de cálculos complejos para mejor rendimiento

## 🔮 Próximas Mejoras

- [ ] Filtrado por fechas (hoy, esta semana, este mes)
- [ ] Exportación de datos a CSV/PDF
- [ ] Modo oscuro
- [ ] Gráficos de tendencias temporales
- [ ] Edición de transacciones existentes
- [ ] Categorías personalizables
- [ ] Múltiples presupuestos/cuentas
- [ ] Metas de ahorro
- [ ] Recordatorios de gastos recurrentes
- [ ] PWA (Progressive Web App)

## 🧪 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Genera build optimizado
npm run preview      # Previsualiza build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🌐 Despliegue

### GitHub Pages

1. **Configurar base en vite.config.js**
```javascript
export default defineConfig({
  base: '/budget-calculator-react/',
  // ...
})
```

2. **Generar build**
```bash
npm run build
```

3. **Desplegar a gh-pages**
```bash
npm run deploy
```

### Netlify

1. Conectar repositorio en Netlify
2. Configurar build:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automático en cada push

## 🎨 Categorías de Gastos

| Categoría | Emoji | Color |
|-----------|-------|-------|
| Vivienda | 🏠 | Azul |
| Alimentación | 🍽️ | Verde |
| Transporte | 🚗 | Naranja |
| Entretenimiento | 🎬 | Rosa |
| Salud | ⚕️ | Rojo |
| Educación | 📚 | Morado |
| Servicios | 💡 | Amarillo |
| Otros | 📦 | Gris |

## 👤 Autor

**Jorge Luis Risso Patrón**

- GitHub: [@Luisitorisso](https://github.com/Luisitorisso)
- Portfolio: [jorge-luis-risso-patron-dev.netlify.app](https://jorge-luis-risso-patron-dev.netlify.app)
- Email: luisrissopa@gmail.com
- LinkedIn: [Jorge Luis Risso Patrón](https://www.linkedin.com/in/jorge-luis-risso-patr%C3%B3n/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

⭐ **Si te gustó este proyecto, dale una estrella en GitHub!** ⭐

Desarrollado con 💜 en Panamá 🇵🇦
