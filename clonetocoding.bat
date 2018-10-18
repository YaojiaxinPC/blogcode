@echo off
echo 'use SSH command£¬will pull public to coding page'

set publicdir=D:\source\blogcode\public\.git
set publicd=D:\source\blogcode\public
set aimdir=D:\source\yaojiaxinpc\.git

echo aimdir is %aimdir%
echo publicdir is %publicdir%

echo d|xcopy %aimdir%\* %publicdir% /s /c /y

echo done

echo ***********************************************
echo ***********************************************
echo ***************start  to  commit***************
echo ***********************************************
echo ***********************************************

cd /d %publicd%
echo gitdone

del CNAME

echo git pull origin master
echo but this useless because it's backups.so it won't done.

git add .
echo add all file to git...

set "year=%date:~0,4%"
set "month=%date:~5,2%"
set "day=%date:~8,2%"
set "hour_ten=%time:~0,1%"
set "hour_one=%time:~1,1%"
set "minute=%time:~3,2%"
set "second=%time:~6,2%"

if "%hour_ten%" == " " (
    set cmitmessage=%year%%month%%day%0%hour_one%%minute%%second%
) else (
    set cmitmessage=%year%%month%%day%%hour_ten%%hour_one%%minute%%second%
)

git commit -m "%cmitmessage%"
echo use time for message, commiting... 

git push origin master -f
 
echo git push done!
pause>nul



