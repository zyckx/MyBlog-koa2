@echo off 
echo "��ѡ�����ݿ�����·����"
echo "1. Ĭ��·��"
echo "2. �Զ���·��"
set /p choice=���������֣�
if %choice%==1 goto cmd1
if %choice%==2 goto cmd2

:cmd1
set dbpath="E:\mongodb-windows-x86_64-6.0.1\dbdata"
mongod.exe --dbpath "%dbpath%"

:cmd2
set /p dbpath=���������ݿ�·����
mongod.exe --dbpath "%dbpath%"
pause