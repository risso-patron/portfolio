@echo off
echo ====================================
echo DESCARGANDO MODELOS DE IA LOCAL
echo ====================================
echo.

echo [1/4] Verificando que Ollama este instalado...
ollama --version
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Ollama no esta instalado o no se encuentra en PATH
    echo Por favor:
    echo 1. Reinicia tu PC
    echo 2. Ejecuta este script nuevamente
    pause
    exit /b 1
)

echo.
echo [2/4] Descargando DeepSeek Coder 6.7B (recomendado)...
echo Este modelo pesa ~4GB y puede tardar varios minutos
echo.
ollama pull deepseek-coder:6.7b

if %errorlevel% neq 0 (
    echo.
    echo [ADVERTENCIA] No se pudo descargar deepseek-coder:6.7b
    echo Intentando con modelo mas ligero...
    ollama pull deepseek-coder:1.3b
)

echo.
echo [3/4] Descargando modelo de embeddings...
echo Este modelo mejora la comprension del codigo (~274MB)
echo.
ollama pull nomic-embed-text

echo.
echo [4/4] Verificando modelos instalados...
ollama list

echo.
echo ====================================
echo INSTALACION COMPLETA!
echo ====================================
echo.
echo Ya puedes usar Continue en VS Code:
echo 1. Presiona Ctrl + L para abrir el chat
echo 2. Pregunta: "Ayudame con mi codigo JavaScript"
echo 3. Empieza a codear y veras sugerencias automaticas
echo.
echo Si quieres probar el modelo directamente:
echo   ollama run deepseek-coder:6.7b "Escribe una funcion de fibonacci"
echo.
pause
