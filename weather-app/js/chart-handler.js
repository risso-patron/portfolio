// ==================== CHART HANDLER MODULE ====================
// Gestión del gráfico de temperatura con Chart.js
// Luis Risso Patrón - 2026

let temperatureChart = null;

/**
 * Crear o actualizar gráfico de temperatura
 */
export function createTemperatureChart(forecastData, unit = 'metric') {
    const canvas = document.getElementById('temperatureChart');
    if (!canvas) {
        console.error('Canvas no encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (temperatureChart) {
        temperatureChart.destroy();
    }
    
    // Procesar datos del forecast
    const forecastList = forecastData.list || forecastData;
    const chartData = forecastList.slice(0, 8).map(item => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        
        return {
            label: `${day}/${month} ${hours}:00`,
            temp: Math.round(item.main.temp)
        };
    });
    
    const labels = chartData.map(item => item.label);
    const temperatures = chartData.map(item => item.temp);
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    
    // Determinar símbolo de unidad
    const unitSymbol = unit === 'metric' ? 'C' : 'F';
    
    // Obtener tema actual
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#e9ecef' : '#2c3e50';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    // Configuración del gráfico
    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperatura (°${unitSymbol})`,
                data: temperatures,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: isDark ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y}°${unit}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: minTemp - 2,
                    max: maxTemp + 2,
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return value + '°';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: textColor,
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 8
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    };
    
    // Crear nuevo gráfico
    temperatureChart = new Chart(ctx, config);
    console.log('📊 Temperature chart created');
}

/**
 * Actualizar gráfico cuando cambia el tema
 */
export function updateChartTheme() {
    if (temperatureChart) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#e9ecef' : '#2c3e50';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        const bgColor = isDark ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        
        temperatureChart.options.plugins.tooltip.backgroundColor = bgColor;
        temperatureChart.options.plugins.tooltip.titleColor = textColor;
        temperatureChart.options.plugins.tooltip.bodyColor = textColor;
        
        temperatureChart.options.scales.y.grid.color = gridColor;
        temperatureChart.options.scales.y.ticks.color = textColor;
        temperatureChart.options.scales.x.ticks.color = textColor;
        
        temperatureChart.update();
    }
}

/**
 * Destruir gráfico
 */
export function destroyChart() {
    if (temperatureChart) {
        temperatureChart.destroy();
        temperatureChart = null;
    }
}
