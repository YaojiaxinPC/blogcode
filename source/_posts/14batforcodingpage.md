---
title: 编写bat自动备份博客到codingpage
date: 2018-10-19 00:02:59
categories:
  - 批处理
tags:
  - 批处理
  - git
---
	
　　本文记录编写bat自动同步博客到codingpage。

<!-- more -->

　　由于gitpage在国内访问没codingpage快，我是把域名挂在codingpage的。但是博客和代码等等都在github那边，平时靠两边复制文件来同步，操作繁琐，便想到了用批处理来做这件事。

　　在github这边，用gitbash生成，提交好后，点击bat，将public目录下的同步到coding。需求是这样的。那怎么实现？

## 方案一

　　新建文件夹codingpage，将public的文件复制到那边，然后提交。这里有问题，需要先清空codingpage文件夹，然后才能复制。写了一下del的处理，发现好麻烦，考虑的东西太多了。

　　所以方案一放弃。

## 方案二

　　还是新建文件夹codingpage，但是是用来init git，让它出来一个.git后缀的文件夹：

![Result pic 1](/contentimg/14/1.png "初始化git文件夹")


　　后面的操作就是把这个.git文件夹复制过去public目录，然后cd进public，git提交。

``` bash
@echo off
echo 'use SSH command，will pull public to coding page'

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
```

[对应git](https://github.com/YaojiaxinPC/blogcode/blob/master/clonetocoding.bat)

　　该方案行得通，而且处理方式简单许多。下面记录一下过程中遇到的问题。

***

　　按照脚本从上到下来记录吧。

　　首先是定义变量：

>  set 变量

　　引用

>  %变量%

　　然后是复制 xcopy，这里会遇到弹窗选择“文件”：“文件夹”的弹窗选择，所以手动加一下追加输入：

>  d|XXXXX

　　d是里面要输入的东西。

　　这样完成了将.git复制到public目录的工作了。得将运行目录定位到public目录。

>  cd /d XXXX

　　codingpage那边不需要CNAME文件，所以删掉它。

>  del 文件

　　剩下的是git操作。

　　先用cmd实验一下git操作：

``` cmd
git --version
git config --list
```


![Result pic 1](/contentimg/14/2.png "检查cmd下能否运行git")

![Result pic 1](/contentimg/14/3.png "cmd下的git")



　　①添加命令：“.”表示全部

>  git add .

　　②同步命令：

>  git pull origin master

　　③提交命令：（后面还得推送才是完整的提交）

>  git commit -m '注释'

　　④推送命令：

>   git push origin master

　　这里我用的是主线，可以根据需要进行修改。

　　那就简单了，直接复制过去批处理。

　　这里遇到的问题蛮多的：

1. 批处理里面不能写多余的空格，特别是路径和变量定义。因为会完整识别出来空格并运用，导致出问题。
1. git commit不加注释，就强制进入VIM模式。所以得加。
1. 单引号 和 双引号 的区别，刚开始一直报错当前文件夹没有可提交的东西，排查到是commit出错，后面排查出来是引号问题。

　　这里搜到一篇比较完整的git批处理：[bat文件方式对git进行操作](http://blog.51cto.com/13717297/2136859) 

　　以及面对VIM模式：[在git bush中如何退出vim编辑器](https://www.cnblogs.com/macliu/p/6062917.html) 

还有运行该bat后，github desktop无法提交，提示：failed to receive handshake

　　其实只要注销重新登录就行的，不过我就去改配置文件，删掉用户信息，提交一遍，再加回去，就正常了。


![Result pic 1](/contentimg/14/4.png "配置文件")

## 写在最后

　　后来发现，其实改配置文件，hexo d的时候能两边一起提交的！

``` cmd
deploy:
  type: git
  message: [message]
  repo:
    github: <repository url>,[branch]
    gitcafe: <repository url>,[branch] 
```

![Result pic 1](/contentimg/14/5.png "实际改主配置文件这里")

![Result pic 1](/contentimg/14/6.png "官网有说明")
