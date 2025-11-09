@echo off
echo ====================================
echo INSTALACION DE CONTINUE + OLLAMA
echo Asistente de IA Local para VS Code
echo ====================================
echo.

echo [PASO 1/5] Instalando Ollama...
echo.
winget install Ollama.Ollama -e --accept-source-agreements --accept-package-agreements

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] No se pudo instalar Ollama
    echo Por favor instala manualmente desde: https://ollama.ai/download
    pause
    exit /b 1
)

echo.
echo [PASO 2/5] Ollama instalado exitosamente!
echo.
echo [IMPORTANTE] Necesitas REINICIAR tu PC para que Ollama funcione
echo.
echo Despues del reinicio, ejecuta: setup-ollama-models.bat
echo.
pause
