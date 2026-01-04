// ==================== CHARTS MODULE ====================
// Gráficos de temperatura con Chart.js
// Luis Risso Patrón - 2026

let tempChart = null;

/**
 * Crea el gráfico de temperatura
 */
export function createTemperatureChart(canvasEl, forecastData, unit = 'C') {
    if (!canvasEl || !forecastData) return;
    
    // Destruir gráfico anterior
    if (tempChart) {
        tempChart.destroy();
    }
    
    // Preparar datos (primeros 8 items del forecast)
    const labels = forecastData.slice(0, 8).map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
    });
    
    const temps = forecastData.slice(0, 8).map(item => 
        Math.round(item.main.temp)
    );
    
    const ctx = canvasEl.getContext('2d');
    
    // Detectar tema
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#e9ecef' : '#2c3e50';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperatura (°${unit})`,
                data: temps,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#3b82f6',
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
                    backgroundColor: isDark ? 'rgba(15, 20, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: gridColor,
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
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return value + '°';
                        }
                    },
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColor,
                        maxRotation: 45,
                        minRotation: 0
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Actualiza el gráfico cuando cambia el tema
 */
export function updateChartTheme() {
    if (!tempChart) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#e9ecef' : '#2c3e50';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    tempChart.options.scales.y.ticks.color = textColor;
    tempChart.options.scales.x.ticks.color = textColor;
    tempChart.options.scales.y.grid.color = gridColor;
    tempChart.options.plugins.tooltip.backgroundColor = isDark ? 'rgba(15, 20, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    tempChart.options.plugins.tooltip.titleColor = textColor;
    tempChart.options.plugins.tooltip.bodyColor = textColor;
    tempChart.options.plugins.tooltip.borderColor = gridColor;
    
    tempChart.update();
}

/**
 * Destruye el gráfico
 */
export function destroyChart() {
    if (tempChart) {
        tempChart.destroy();
        tempChart = null;
    }
}
