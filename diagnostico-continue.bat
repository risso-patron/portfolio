@echo off
echo ====================================
echo DIAGNOSTICO DE CONTINUE
echo ====================================
echo.

echo [1/5] Verificando Ollama...
ollama --version
echo.

echo [2/5] Verificando modelos...
ollama list
echo.

echo [3/5] Probando conexion con Ollama...
curl -s http://localhost:11434/api/tags
echo.
echo.

echo [4/5] Verificando extension Continue...
code --list-extensions | findstr -i continue
echo.

echo [5/5] Verificando archivo de configuracion...
if exist "%APPDATA%\Code\User\globalStorage\continue.continue\config.json" (
    echo [OK] Config encontrado:
    type "%APPDATA%\Code\User\globalStorage\continue.continue\config.json"
) else (
    echo [ERROR] Config no encontrado
)

echo.
echo ====================================
echo INSTRUCCIONES SIGUIENTES:
echo ====================================
echo.
echo 1. REINICIA VS Code completamente
echo 2. Presiona Ctrl + L
echo 3. Si ves un panel a la derecha, funciona
echo 4. Escribe: "Hola, ayudame con mi codigo"
echo.
echo Si NO ves nada al presionar Ctrl + L:
echo - Busca el icono de Continue en la barra lateral
echo - O presiona Ctrl + Shift + P y escribe "Continue"
echo.
pause
