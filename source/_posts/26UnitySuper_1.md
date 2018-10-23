---
title: Unity优化_WebGL发布优化
date: 2018-10-23 14:59:59
categories:
  - Unity优化
tags:
  - 发布优化
---

　　本文是记录Unity的优化第一篇：WebGL发布优化。

　　后续将记录其他平台的优化，以及编程中遇到的优化。

<!-- more -->

　　开头分享几个博客链接：

来自印度的：[App Guruz](http://www.theappguruz.com/blog/unity-optimization-initiative) 

Unity社区的两篇文章：

[了解Unity WebGL中的内存](https://blogs.unity3d.com/cn/2016/09/20/understanding-memory-in-unity-webgl/) 

[Unity WebGL内存：Unity Heap](https://blogs.unity3d.com/cn/2016/12/05/unity-webgl-memory-the-unity-heap/) 

　　本文就不重复博文中的细节了。

　　Unity发布WebGL版本，限制是很大的，必须事先定义所需内存，一旦决定，就不能减少或者增加！而且包不能太大，下载速度严重影响启动时间。特别是还有部分API限制。总体上，限制因素很多。当然，如果用2018新特性的，就能动态内存及高压缩。不过，目前还是先从普通版本做起。

　　小游戏是可以发布成WebGL版本的，但是大游戏难度系数很高，特别是画面越精美的。因为要考虑web可以运行在任何低配置的场景，特别是跑在手机32位浏览器。

　　针对Unity发布WebGL，细节有好多，目前我就按照遇到的问题，从初级开始，一个一个分享记录吧。

　　本博客会不定时分享部分官方商店里面的小游戏，同时发布成WebGL版本让大家可以体验。

　　先记录简单发布2D拾荒者遇到的问题吧。

## 疑难解答

### 360打不开

　　该问题在前面的博客有提到，是新版本的Unity编译的包，部分浏览器暂时不支持WebGL2.0的特性，所以识别不了，就不能打开了。

　　只要用老版本的Unity编译发布，就可以使用了。目前我用的是5.4.6f3。发布出来是Release包；再往上的版本发布的是Build包，就得用Chrome和手机浏览器打开了。

### 抛异常--内存不足

　　这个需要细谈。是本篇的重点。

　　Unity发布的这个webgl，运行在浏览器上，是需要事先定义内存的，后面不能减小或者增大。所以得了解你这个程序最少需要多少内存，然后根据2的幂来取值。

![Result pic 1](/contentimg/26/1.png "定义内存大小的地方")


　　那怎么看程序需要多少内存？

#### Profiler

![Result pic 1](/contentimg/26/2.png "Profiler")


　　在memory部分，可以查看当前场景使用了多少内存。一般看Texture和Audio就行，这两个是最大的，加起来的值就是至少需要的内存，往上取2的幂就能大概出一个值了。像图中，大致23m，所以往上取32m就行。

#### gzip解压方式

　　这里还有个办法，就是先编译一次包。然后把Release里的3个包全换成后缀gzip，解压出来，凑起来的大小就是到时在浏览器里的大小。


![Result pic 1](/contentimg/26/3.png "gzip解压后大小 27.6m")


## 优化（重点）

### 删除多余文件

　　第一个，首要的，删除多余文件。

　　可以通过%homepath%\AppData\Local\Unity\Editor\Editor.log，或者是在Console窗口最右边打开。

![Result pic 1](/contentimg/26/4.png "Console窗口最右边")

![Result pic 1](/contentimg/26/5.png "Editor.log")


　　查看该日志，可以看到里面记录了整个编译过程，包里有什么文件，大小等等信息。

### 图片压缩

　　图片压缩在5.x版本的优化选项较少，在2018的就多了，可以选择压缩类型、压缩质量等等参数。

　　5.x的[取消Generate Mip Maps](http://blog.sina.com.cn/s/blog_5b6cb9500102vi6i.html)  ， 因为只是普通的2D图片，不需要3D效果。

![Result pic 1](/contentimg/26/6.png "取消Generate Mip Maps")



然后就是根据自己喜好来调压缩比例了。压缩质量越低，看起来越模糊。

![Result pic 1](/contentimg/26/7.png "最高压缩")

![Result pic 1](/contentimg/26/8.png "保持原质量")



### audio压缩

　　其实也不算压缩，只是修改了音频文件的读取方式而已。

　　首先要找出大文件，一般是背景音乐：

![Result pic 1](/contentimg/26/9.png "找出大文件")


　　这里可以修改的只有一个Load Type选项，一般情况下忽略第一个。第二第三差不多，一般都是建议大文件选第二个（Compressed in memory）；零碎的小文件选第三个（streaming）。区别就是加载时会不会存在延迟，这个在大文件上才会体现出来。

![Result pic 1](/contentimg/26/10.png "audio优化")


　　记住这里选第一个的话，这12个文件，会导致运行时的audio内存高达13m。选stream的话才250kb。差别很大的。

### 其他优化

　　在这个2D小游戏中，剩下其他的优化效果很小，就设置static选项（让系统自动优化）、取消天空盒等等细节。所以暂时不提，等后面3D部分的再说这个优化。

### 编译优化

　　由于这个2D小游戏很简单，没涉及其他的，所以可以直接上编译选项优化了。

　　直接到Player Settings设置：

![Result pic 1](/contentimg/26/11.png "Publishing Settings")


　　Enable Exceptions设为None，启用Data caching。根据前面观察的内存大小，设置一个值（该值后面能在文本文件直接修改，故此处影响小，随便填）。

![Result pic 1](/contentimg/26/12.png "Other Settings")


　　这里只有两个是必须的：

1. 启用“Strip Engine Code”，该项表示剔除不用的dll。

1. 不打印log。


　　其他的看喜好选吧。不是必要设置。然后就可以编译出包了！

![Result pic 1](/contentimg/26/13.png "记录申请内存大小的属性")


## html优化

　　现在可以运行看到效果了，初始是不提供file模式看效果的，这里有篇文件介绍怎么设置Chrome支持file模式运行：

[Unity发布WebGl注意事项](http://www.cnblogs.com/huwenya/p/9547224.html) 

　　细节我就不再提了。下面要说的是怎么让内容居中显示：

　　初始启动，是在左上角的。体验不是很好。但是可以用F12看到，是绘制在canvas上的内容，是可以通过修改html代码来实现居中显示的。

　　html居中显示的方式是：

1. 增加div。
1. 设置style="position: absolute;left:50%;top:50%;margin-left:0px;margin-top:0px;"

　　注意这里有个margin偏移值，因为目前的居中设置，是以该内容的左上角来居中的，所以出来效果是在第四象限的位置。就得让它根据自己的大小来偏1/2过去，就居中了。

　　由于html代码不支持动态计算，所以只能写css脚本了：

``` html
  <div id="contdivc" style="position: absolute;left:50%;top:50%;margin-left:0px;margin-top:0px;">
  <script type='text/javascript'>
    window.onload=function() {
            document.getElementById( "contdivc" ).style.marginLeft = "-"+960/2 + "px";
			document.getElementById( "contdivc" ).style.marginTop = "-"+600/2 + "px";
        }
  </script>
    <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" height="600px" width="960px"></canvas>
</div>
```

　　现在刷新运行，居中了！

　　但是不能每次编译都来这里修改html的呀。怎么处理？

　　回到开头，Unity日志里面其实有提到，是用插件来编译的，这样，是肯定存在一个模版文件的！

　　该模版就在安装目录下：5.4.6f3\Editor\Data\PlaybackEngines\WebGLSupport\BuildTools\WebGLTemplates

![Result pic 1](/contentimg/26/14.png "母板html")


　　那就好办了，直接改该文件就行了：

``` html
  <div id="contdivc" style="position: absolute;left:50%;top:50%;margin-left:0px;margin-top:0px;">
  <script type='text/javascript'>
    window.onload=function() {
            document.getElementById( "contdivc" ).style.marginLeft = "-"+%UNITY_WIDTH%/2 + "px";
			document.getElementById( "contdivc" ).style.marginTop = "-"+%UNITY_HEIGHT%/2 + "px";
        }
  </script>
    <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" height="%UNITY_HEIGHT%px" width="%UNITY_WIDTH%px"></canvas>
</div>
```

文末贴几个我觉得还不错的文章：


[Unity发布WebGl注意事项](http://www.cnblogs.com/huwenya/p/9547224.html)

[Unity 性能优化（力荐）](https://www.cnblogs.com/Jason-c/p/8137193.html)

[unity几种优化建议](https://blog.csdn.net/ElyXiao/article/details/51980863)

[Unity5.3.3 webgl 注意](https://blog.csdn.net/mayzhengxi/article/details/76616864)

[[Unity优化]减少内存占用：贴图优化](https://blog.csdn.net/lyh916/article/details/44115095)

[Unity3d Mesh、Texture、UI 压缩降低内存](https://blog.csdn.net/yuyingwin/article/details/78851312)

[Unity游戏开发性能优化（Sprite优化）](https://blog.csdn.net/qq_33747722/article/details/70544822)

[Unity游戏开发图片纹理压缩方案](https://blog.csdn.net/a673544319/article/details/82142283)

