@echo off
setlocal

REM Lancer le serveur Node.js dans /api
echo Lancement du serveur Node.js...
cd /d "%~dp0api" || exit /b
start /B cmd /c "node ./bin/www > node.log 2>&1"
set NODE_PID=%PROCESS_ID%

REM Lancer le serveur web dans ./frontend
echo Lancement du serveur web...
cd /d "%~dp0frontend" || exit /b
start /B cmd /c "serve -s build > npm.log 2>&1"
set FRONTEND_PID=%PROCESS_ID%

REM Attendre quelques secondes pour donner le temps aux serveurs de démarrer
timeout /t 5 /nobreak

REM Déterminer le port du serveur web (par défaut c'est 8080)
for /f "tokens=2 delims=:" %%i in ('findstr /i "port:" package.json') do set PORT=%%i
if not defined PORT set PORT=3000

REM Ouvrir le navigateur à l'URL dynamique
echo Ouverture du navigateur à http://localhost:%PORT%...
start http://localhost:%PORT%

REM Fonction pour arrêter les serveurs (sous Windows, on utilise taskkill)
:cleanup
echo Arrêt des serveurs...
taskkill /F /PID %NODE_PID% >nul 2>&1
taskkill /F /PID %FRONTEND_PID% >nul 2>&1

REM Intercepter le signal de fermeture du terminal
trap cleanup EXIT

REM Garder le script en cours d'exécution
wait %NODE_PID%
wait %FRONTEND_PID%

endlocal
