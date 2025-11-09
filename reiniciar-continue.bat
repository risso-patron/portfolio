@echo off
echo ====================================
echo REINICIAR CONTINUE CON MODELO LOCAL
echo ====================================
echo.

echo [1/3] Configuracion creada en:
echo %USERPROFILE%\.continue\config.json
echo.
type "%USERPROFILE%\.continue\config.json"
echo.

echo [2/3] Verificando Ollama...
ollama list
echo.

echo [3/3] AHORA DEBES:
echo.
echo 1. En VS Code, presiona: Ctrl + Shift + P
echo 2. Escribe: "Developer: Reload Window"
echo 3. Presiona Enter
echo.
echo 4. Despues del reload, presiona: Ctrl + L
echo 5. Deberia abrirse Continue con Qwen 2.5 Coder
echo.
echo Si sigue usando Gemini:
echo - Busca el icono de engranaje en Continue
echo - O haz clic donde dice "Gemini 2.0 Flash"
echo - Selecciona "Qwen 2.5 Coder Local"
echo.
pause
