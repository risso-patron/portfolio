export const darkTheme = {
  name: 'dark',
  
  // Colores principales (más brillantes para dark mode)
  colors: {
    primary: '#818cf8', // Indigo más claro
    secondary: '#a78bfa', // Purple más claro
    accent: '#22d3ee', // Cyan más claro
    success: '#34d399', // Green más claro
    warning: '#fbbf24', // Amber más claro
    error: '#f87171', // Red más claro
    info: '#60a5fa', // Blue más claro
  },
  
  // Backgrounds
  background: {
    primary: '#111827', // Gray 900
    secondary: '#1f2937', // Gray 800
    tertiary: '#374151', // Gray 700
    card: 'rgba(31, 41, 55, 0.9)',
    overlay: 'rgba(0, 0, 0, 0.75)',
  },
  
  // Textos
  text: {
    primary: '#f9fafb', // Gray 50
    secondary: '#d1d5db', // Gray 300
    tertiary: '#9ca3af', // Gray 400
    inverse: '#111827',
  },
  
  // Borders
  border: {
    light: '#374151', // Gray 700
    medium: '#4b5563', // Gray 600
    dark: '#6b7280', // Gray 500
  },
  
  // Shadows (más sutiles en dark mode)
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
  },
  
  // Gradientes (ajustados para dark mode)
  gradients: {
    primary: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
    success: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    warning: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    error: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
  },
};
