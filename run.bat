@echo off

REM Roda no modo development
call venv\Scripts\activate

uvicorn app:app --reload
