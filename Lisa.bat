@echo off
cd /d "%~dp0"
set PORT=8000
where py >nul 2>nul && (set PY=py) || (set PY=python)
start "" cmd /c "timeout /t 2 >nul & start http://localhost:%PORT%"
%PY% -m http.server %PORT% || (echo No s'ha trobat Python. Instal.la'l des de python.org. & pause)
