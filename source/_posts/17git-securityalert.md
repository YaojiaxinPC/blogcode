---
title: github security alert 解决之路
date: 2018-10-19 00:05:59
categories:
  - github疑难杂症
tags:
  - github
  - security alert
---
	
![Result pic 1](/contentimg/17/1.png "github security alert ")
	

　　本文记录我遇到github的“security alert”时，怎么处理解决。

<!-- more -->

　　邮箱收到这个警告的时候蛮懵的，因为代码什么的没改过。最近做的操作，就是手动修改了“package.json”，以及删除“package-lock.json”文件和“node_modules”整个文件夹。后面重新安装，npm正常跑起来，博客也能正常更新，怎么就突然发警告了？

　　登陆git查看具体警告内容：

![Result pic 2](/contentimg/17/2.png "具体警告内容")


　　原来是提示需要更新插件版本而已。

那就手动更新吧：

``` bash
npm update XXX
```

　　不对，说好的添加文件的提示怎么没出来，直接就回车返回了？

　　那强制更新到某版本

``` bash
npm update XXX@1.2.3
```

　　还是一样？那就只能用install了。

``` bash
npm install XXX@1.2.3
```

![Result pic 4](/contentimg/17/4.png "成功更新")


　　再次提交博客环境工程，这次git不报警告了。

![Result pic 3](/contentimg/17/3.png "问题解决")


最后贴一下“package.json”和“package-lock.json”关系的几个链接吧：

[【前端】简单了解package.json与package-lock.json](https://blog.csdn.net/m18633778874/article/details/81625421) 
 
[package-lock.json的作用](https://www.cnblogs.com/cangqinglang/p/8336754.html) 

　　简单讲就是package.json负责安装我们需要的工具，package-lock.json着负责把那些工具需要的包记录安装起来。由于lock文件很大，东西很多，一般我们不会去看，所以这时候就会遇到一些依赖包版本过低的问题。


![Result pic 5](/contentimg/17/5.png "依赖关系")


