@echo off
echo ====================================
echo VERIFICACION DE CONTINUE + OLLAMA
echo ====================================
echo.

echo [1/4] Verificando Ollama...
ollama --version
if %errorlevel% neq 0 (
    echo [X] Ollama NO esta instalado
    goto :error
) else (
    echo [OK] Ollama instalado
)

echo.
echo [2/4] Verificando modelos descargados...
ollama list
if %errorlevel% neq 0 (
    echo [X] No hay modelos instalados
    goto :error
) else (
    echo [OK] Modelos encontrados
)

echo.
echo [3/4] Probando modelo Qwen 2.5 Coder...
echo Pregunta: "Escribe hola mundo en JavaScript"
echo.
ollama run qwen2.5-coder:1.5b "Escribe solo el codigo de hola mundo en JavaScript, sin explicaciones"

if %errorlevel% neq 0 (
    echo [X] Error al ejecutar el modelo
    goto :error
)

echo.
echo [4/4] Verificando configuracion de Continue...
if exist "%APPDATA%\Code\User\globalStorage\continue.continue\config.json" (
    echo [OK] Continue configurado correctamente
) else (
    echo [X] Continue no esta configurado
    goto :error
)

echo.
echo ====================================
echo TODO FUNCIONA CORRECTAMENTE!
echo ====================================
echo.
echo Continue esta listo para usar:
echo.
echo 1. Presiona Ctrl + L en VS Code
echo 2. Pregunta: "Ayudame con mi codigo JavaScript"
echo 3. Para autocompletar: escribe codigo y presiona Tab
echo.
echo Modelo activo: Qwen 2.5 Coder 1.5B (rapido y ligero)
echo.
pause
exit /b 0

:error
echo.
echo ====================================
echo HUBO ERRORES EN LA CONFIGURACION
echo ====================================
echo.
echo Revisa CONTINUE-LOCAL-SETUP.md para solucionarlo
pause
exit /b 1
