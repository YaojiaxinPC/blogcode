---
title: Unity发布WebGL---360等部分浏览器不支持
date: 2018-10-22 21:07:59
categories:
  - Unity3D
tags:
  - webgl
  - 环境
---

　　本文介绍三种版本Unity发布WebGL对浏览器的影响问题：

1. 2018.2全新支持WebAssembly，支持内存动态调配，极大压缩包大小。
1. 5.5.0能发布Release版本，但是在360等浏览器上会抛异常；再往上的版本只能发布Build版本。
1. 5.4.6以下版本，发布Release版本，支持360等浏览器运行。

<!-- more -->

　　准备在博客上发一个小游戏demo，结果在360抛异常了，在chrome上是可以的，手机上也行。所以webgl是没问题的，推测是unity编译器的问题。但是搜索上找不到关键字。可能没什么人关注这个问题吧，毕竟都是用在手游上的。

　　通过浏览器调试工具，排查到是缺少“decompress.js”，比较了一下，编译出来".unityweb"后缀的，都是没有“UnityConfig”文件夹。由于不同版本生成的UnityLoader.js不同，调用工具的步骤已经不同了，才导致360等低版本的浏览器打不开新Unity特性的WebGL程序。

![Result pic 1](/contentimg/23/12.png "WebGLSupport目录比较")


　　由于C++方面和编译器有关，好多用2008可以编译，但是2010开始的会抛异常。所以就尝试用5.x的来编译。结果很神奇，出来的包不一样，是Release文件夹！之前用2017是Build文件夹。没想到360竟然这次跑成功了！

　　由此推断是webgl版本问题。接着是一个一个版本的更新看，5.5的更新还有提到gz，后面的没提到，下载了5.6的，编译出来是build；所以再找5.5的，终于是Release，但是360上抛异常了。那往前一个版本，5.4.6，正常运行！

　　下面是3个版本的运行情况：

### 2018.2.13f1-WebAssembly模式

　　由于WebAssembly的比较亮点：包小很多，而且能动态申请内存，可以一开始就申请32m（其他版本的都得申请64m）。这里就选该模式。

![Result pic 1](/contentimg/23/1.png "Chrome控制台输出")

![Result pic 1](/contentimg/23/2.png "文件包大小")

![Result pic 1](/contentimg/23/3.png "浏览器请求情况")


### 2017.4.3f1

　　WebAssembly模式在该版本是测试版，编译出来的包太大，而且运行还抛异常，这里就不提这个。

![Result pic 1](/contentimg/23/4.png "Chrome控制台输出")

![Result pic 1](/contentimg/23/5.png "文件包大小")

![Result pic 1](/contentimg/23/6.png "浏览器请求情况")


### 5.4.6f3

　　能编译出来360正常运行的版本中最新的一个。

![Result pic 1](/contentimg/23/7.png "Chrome控制台输出")

![Result pic 1](/contentimg/23/8.png "文件包大小")

![Result pic 1](/contentimg/23/9.png "浏览器请求情况")


## 结论

　　通过前面三个版本的比较。推荐：

1. 简单的小游戏用5.4.6发布，请求量少，支持的浏览器多；
1. 复杂的游戏用2018.2发布，包压缩率高，动态内存，但是手机上打开会提示请求摄像头权限？（可能存在扫描设备的代码）
1. 中间的版本优势不大。通过Profiler工具的比较，2018的优势>>5.4.6


![Result pic 1](/contentimg/23/10.png "2018内存分配")

![Result pic 1](/contentimg/23/11.png "5.4.6内存分配")


　　两个的代码和设置是一样的，但是Textures相差一倍，Textures是优化中最重要的一个，2018的竟然能帮我们直接优化了一倍。还有Assets的数量，也是一倍的差距。

　　再加上OpenGL ES3.0的优势，所以，复杂点的游戏，还是推荐用2018.2！

　　文末贴一下介绍2018.2的WebAssembly的一个中文链接：

 [Unity 2018.2正式支持WebAssembly](http://forum.china.unity3d.com/thread-32663-1-1.html)


