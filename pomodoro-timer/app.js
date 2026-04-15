// ==================== Theme Management ====================
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('pomodoro-theme', newTheme);
    
    themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    themeToggle.querySelector('span:last-child').textContent = 
        newTheme === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
    
    updateChartsTheme();
}

themeToggle.addEventListener('click', toggleTheme);

// Initialize theme
const savedTheme = localStorage.getItem('pomodoro-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
const themeText = themeToggle.querySelector('span:last-child');
if (themeText) themeText.textContent = savedTheme === 'dark' ? 'Modo Oscuro' : 'Modo Claro';

// ==================== View Management ====================
function showView(viewName) {
    const statsView = document.getElementById('statsView');
    const timerView = document.getElementById('timerView');
    const navBtns = document.querySelectorAll('.nav-btn');
    
    if (viewName === 'stats') {
        if (statsView) statsView.classList.add('active');
        if (timerView) timerView.classList.remove('active');
        navBtns[1].classList.add('active');
        navBtns[0].classList.remove('active');
        const headerDesc = document.querySelector('.header-title p');
        if (headerDesc) headerDesc.textContent = 'Panel de Estadísticas';
    } else {
        if (timerView) timerView.classList.add('active');
        if (statsView) statsView.classList.remove('active');
        navBtns[0].classList.add('active');
        navBtns[1].classList.add('active'); // Wait, index 1 is stats
        navBtns[0].classList.add('active');
        navBtns[1].classList.remove('active');
        const headerDesc = document.querySelector('.header-title p');
        if (headerDesc) headerDesc.textContent = 'Técnica Pomodoro';
    }
}

// Global functions for HTML onclick
window.showView = showView;
window.toggleTheme = toggleTheme;

/**
 * 🗑️ Limpia todas las estadísticas y reinicia la app
 */
function clearAllStats() {
    const confirmClear = confirm("¿Estás seguro de que deseas borrar todo el historial? Esta acción no se puede deshacer.");
    
    if (confirmClear) {
        // Preservar solo el tema
        const theme = localStorage.getItem('pomodoro-theme');
        localStorage.clear();
        if (theme) localStorage.setItem('pomodoro-theme', theme);
        
        // Reset de la UI
        loadStats();
        
        // Reset de los gráficos
        if (dailyChart) {
            dailyChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0];
            dailyChart.update();
        }
        if (distributionChart) {
            distributionChart.data.datasets[0].data = [0, 0, 0];
            distributionChart.update();
        }
        
        alert("Estadísticas reiniciadas con éxito.");
        
        // Recargar para limpiar estados de memoria si es necesario
        location.reload();
    }
}
window.clearAllStats = clearAllStats;

// ==================== Charts ====================
let dailyChart, distributionChart;

function getChartColors() {
    const theme = root.getAttribute('data-theme');
    return {
        text: theme === 'dark' ? '#F7F7FF' : '#111827',
        grid: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E5E7EB'
    };
}

function createDailyChart() {
    const canvas = document.getElementById('dailyChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = getChartColors();
    
    dailyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Horas',
                data: [5, 6, 6, 7, 4, 3, 3],
                backgroundColor: '#FF6347',
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A1F3A',
                    titleColor: '#F7F7FF',
                    bodyColor: '#B8B8D1',
                    padding: 12,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 8,
                    ticks: { color: colors.text, stepSize: 2 },
                    grid: { color: colors.grid, drawBorder: false },
                    border: { display: false }
                },
                x: {
                    ticks: { color: colors.text },
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
}

function createDistributionChart() {
    const canvas = document.getElementById('distributionChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Trabajo Profundo', 'Estudio', 'Lectura'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#FF6347', '#4ECDC4', '#FFE66D'],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A1F3A',
                    titleColor: '#F7F7FF',
                    bodyColor: '#B8B8D1',
                    padding: 12,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                }
            }
        }
    });
}

function updateChartsTheme() {
    const colors = getChartColors();
    if (dailyChart) {
        dailyChart.options.scales.y.ticks.color = colors.text;
        dailyChart.options.scales.y.grid.color = colors.grid;
        dailyChart.options.scales.x.ticks.color = colors.text;
        dailyChart.update();
    }
}

// ==================== Timer Logic ====================
let timerInterval;
let isRunning = false;
let currentMode = 'pomodoro';

const modes = {
    'pomodoro': 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60
};

let timeRemaining = modes[currentMode];

// DOM Elements
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const modeBtns = document.querySelectorAll('.mode-btn');
const progressCircle = document.querySelector('.timer-circle-progress');
const focusInput = document.getElementById('focusInput');

// Audio
const alarmAudio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
const clickAudio = new Audio('https://actions.google.com/sounds/v1/ui/click_on.ogg');

// SVG Ring Config
const circumference = 2 * Math.PI * 140; // r=140
if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
}

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timerDisplay) timerDisplay.textContent = timeText;
    
    // 🕒 Dynamic Title update
    document.title = isRunning ? `(${timeText}) Pomodoro Timer` : 'Pomodoro Timer | Luis Risso Patrón';
    
    // 🌀 SVG Ring update
    if (progressCircle) {
        const total = modes[currentMode];
        const offset = circumference - (timeRemaining / total) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        if (startBtn) startBtn.textContent = 'Pausar';
        clickAudio.play().catch(() => {});
        
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                completeSession();
            }
        }, 1000);
    } else {
        pauseTimer();
    }
}

function pauseTimer() {
    isRunning = false;
    if (startBtn) startBtn.textContent = 'Reanudar';
    clearInterval(timerInterval);
    updateDisplay();
}

function completeSession() {
    isRunning = false;
    clearInterval(timerInterval);
    if (startBtn) startBtn.textContent = 'Iniciar';
    alarmAudio.play().catch(() => {});
    playNotification();

    if (currentMode === 'pomodoro') {
        savePomodoro();
    }

    resetTimer();
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    if (startBtn) startBtn.textContent = 'Iniciar';
    timeRemaining = modes[currentMode];
    updateDisplay();
}

// ==================== Stats Persistence ====================
function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

function formatMinutes(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function savePomodoro() {
    const today       = getTodayStr();
    const lastDate    = localStorage.getItem('pomodoro-last-date') || '';
    const yesterday   = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate !== today) {
        localStorage.setItem('pomodoro-today-count',   '0');
        localStorage.setItem('pomodoro-today-minutes', '0');
        const prevStreak = parseInt(localStorage.getItem('pomodoro-streak') || '0');
        localStorage.setItem('pomodoro-streak',
            lastDate === yesterdayStr ? (prevStreak + 1).toString() : '1');
        localStorage.setItem('pomodoro-last-date', today);
    }

    const todayCount = parseInt(localStorage.getItem('pomodoro-today-count')   || '0') + 1;
    const todayMins  = parseInt(localStorage.getItem('pomodoro-today-minutes')  || '0') + 25;
    const totalCount = parseInt(localStorage.getItem('pomodoro-total-count')    || '0') + 1;
    const totalMins  = parseInt(localStorage.getItem('pomodoro-total-minutes')  || '0') + 25;

    localStorage.setItem('pomodoro-today-count',   todayCount.toString());
    localStorage.setItem('pomodoro-today-minutes', todayMins.toString());
    localStorage.setItem('pomodoro-total-count',   totalCount.toString());
    localStorage.setItem('pomodoro-total-minutes', totalMins.toString());

    loadStats();
}

function loadStats() {
    const today    = getTodayStr();
    const lastDate = localStorage.getItem('pomodoro-last-date') || '';
    const isToday  = lastDate === today;

    const todayCount = isToday ? parseInt(localStorage.getItem('pomodoro-today-count')   || '0') : 0;
    const todayMins  = isToday ? parseInt(localStorage.getItem('pomodoro-today-minutes')  || '0') : 0;
    const totalCount = parseInt(localStorage.getItem('pomodoro-total-count')  || '0');
    const totalMins  = parseInt(localStorage.getItem('pomodoro-total-minutes') || '0');
    const streak     = parseInt(localStorage.getItem('pomodoro-streak') || '0');

    const pomodorosTodayEl = document.getElementById('pomodorosToday');
    const timeTodayEl      = document.getElementById('timeToday');
    const streakEl         = document.getElementById('streak');
    if (pomodorosTodayEl) pomodorosTodayEl.textContent = todayCount;
    if (timeTodayEl)      timeTodayEl.textContent      = formatMinutes(todayMins);
    if (streakEl)         streakEl.textContent          = `${streak} 🔥`;

    const statTotal      = document.getElementById('statTotalPomodoros');
    const statTime       = document.getElementById('statTotalTime');
    const statStreak     = document.getElementById('statStreak');
    const statEfficiency = document.getElementById('statDailyEfficiency');
    if (statTotal)      statTotal.textContent      = totalCount;
    if (statTime)       statTime.textContent        = formatMinutes(totalMins);
    if (statStreak)     statStreak.textContent      = `${streak} Días`;
    if (statEfficiency) statEfficiency.textContent  = formatMinutes(todayMins);
}

function playNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('¡Sesión Completada! 🍅', {
            body: currentMode === 'pomodoro' ? '¡Tiempo de un descanso!' : '¡Vuelve al foco!',
            icon: 'icons/tomato.webp'
        });
    }
}

// Event listeners
if (startBtn) startBtn.addEventListener('click', startTimer);
if (resetBtn) resetBtn.addEventListener('click', resetTimer);

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        clickAudio.play().catch(() => {});
        resetTimer();
    });
});

// Initialize
window.addEventListener('load', () => {
    updateDisplay();
    loadStats();
    createDailyChart();
    createDistributionChart();

    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
