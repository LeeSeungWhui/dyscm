@echo off
cd %~dp0\backend
start /b %~dp0..\..\Python3.12.1\python.exe run.py
cd ..
