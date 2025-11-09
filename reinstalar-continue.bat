@echo off
echo ====================================
echo REINSTALAR CONTINUE (SI NO FUNCIONA)
echo ====================================
echo.

echo [1/3] Desinstalando Continue...
code --uninstall-extension Continue.continue
timeout /t 3 >nul

echo.
echo [2/3] Instalando Continue nuevamente...
code --install-extension Continue.continue
timeout /t 5 >nul

echo.
echo [3/3] Copiando configuracion...
echo Configuracion ya existe en:
echo %APPDATA%\Code\User\globalStorage\continue.continue\config.json
echo.

echo ====================================
echo CONTINUE REINSTALADO
echo ====================================
echo.
echo AHORA:
echo 1. Cierra VS Code completamente
echo 2. Abre VS Code
echo 3. Presiona Ctrl + L
echo.
pause
