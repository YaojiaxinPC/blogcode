---
title: VMWare安装Linux系统和mac系统
date: 2018-10-19 00:04:59
categories:
  - 虚拟机
tags:
  - VMWare
  - Linux
  - Mac
---
	
　　本文记录如何在VM虚拟机中装Linux系统和Mac系统。全文截图解说，打开会比较慢。

<!-- more -->

　　开头贴一下下载链接吧，版本有点老了：

[百度云盘](https://pan.baidu.com/s/1a6BF-GQ2Uwd25h8dw1WWKw)  提取码：y9y9

　　系统就不提供了，可以去msdn等等地方下载。

　　下面开始贴图说明安装过程：

## Mac安装

![Result pic 1](/contentimg/16/1/1.png "使用unlock打补丁")

![Result pic 1](/contentimg/16/1/2.png "VMWare出现mac的选项")

![Result pic 1](/contentimg/16/1/3.png "开始安装")

![Result pic 1](/contentimg/16/1/4.png "选择语言")

![Result pic 1](/contentimg/16/1/5.png "安装初始化界面")

　　第一次装的时候，由于系统磁盘格式问题，会出问题：

![Result pic 1](/contentimg/16/1/6.png "直接选择“重新安装os x”")

![Result pic 1](/contentimg/16/1/7.png "没显示磁盘？？？")

　　所以得返回：（当然一开始就得先搞磁盘，再来安装才对）

![Result pic 1](/contentimg/16/1/8.png "左上角退出安装")

![Result pic 1](/contentimg/16/1/9.png "选择磁盘工具")
　　
![Result pic 1](/contentimg/16/1/10.png "格式化磁盘")

![Result pic 1](/contentimg/16/1/11.png "格式化后出现可识别磁盘")

![Result pic 1](/contentimg/16/1/12.png "回到安装系统界面")

![Result pic 1](/contentimg/16/1/13.png "选择刚才的磁盘开始安装")

![Result pic 1](/contentimg/16/1/14.png "安装开始")

![Result pic 1](/contentimg/16/1/15.png "完成")

![Result pic 1](/contentimg/16/1/16.png "重启，选择语言")

![Result pic 1](/contentimg/16/1/17.png "选择时区")


　　注意中国在右边。

![Result pic 1](/contentimg/16/1/18.png "进入系统界面")

![Result pic 1](/contentimg/16/1/19.png "安装VMtool")


　　右下角，把光驱引用的文件定位到打补丁时增加的darwin文件。具体在安装目录下能找到。

![Result pic 1](/contentimg/16/1/20.png "重新连接光驱")

![Result pic 1](/contentimg/16/1/21.png "选择安装位置")

![Result pic 1](/contentimg/16/1/22.png "完成安装")

![Result pic 1](/contentimg/16/1/23.png "重启")

![Result pic 1](/contentimg/16/1/24.png "开始使用")


## CentOS安装

　　Linux的安装比较无趣。步骤也简单

![Result pic 1](/contentimg/16/2/1.png "VM选择系统")

![Result pic 1](/contentimg/16/2/2.png "选择CentOS系统")

![Result pic 1](/contentimg/16/2/3.png "开始安装")

![Result pic 1](/contentimg/16/2/4.png "磁盘检查")

![Result pic 1](/contentimg/16/2/5.png "选择语言")

![Result pic 1](/contentimg/16/2/6.png "设置")


　　这里得选择安装位置，才能下一步。

![Result pic 1](/contentimg/16/2/7.png "设置密码")

![Result pic 1](/contentimg/16/2/8.png "设置账户")

![Result pic 1](/contentimg/16/2/9.png "完成安装")

![Result pic 1](/contentimg/16/2/10.png "开始使用")

