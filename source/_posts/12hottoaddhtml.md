---
title: Markdown内嵌html文件
date: 2018-10-18 23:59:58
categories:
  - 前端
tags:
  - js
  - skip_render
  - Markdown内嵌html
---
	
　　本文记录如何在Markdown内嵌html文件，并设置hexo忽略编译该html。

<!-- more -->

　　前面一篇博客，我在页面里面嵌入了一个时钟html文件。

　　到底如何实现的呢？

　　刚开始，我是直接引用下面这样的代码：

``` javascripts
<p>
    <div style="width:100%; height:350px;border:none;text-align:center">
		<iframe allowtransparency="yes" frameborder="0" width="300" height="300" src="/contentimg/11/click.html"/>
	</div>
</p>
```

![Result pic 1](/contentimg/12/1.png "直接嵌入iframe")


　　Markdown可以插入外部html：利用iframe标签来实现。

　　实际上，这样还是不行，hexo会自动给该html添加框架的代码，导致实际的效果变成主页嵌套该html代码。

![Result pic 2](/contentimg/12/2.png "主页嵌套html")


　　刚开始没头绪，后面对比文件大小。

![Result pic 3](/contentimg/12/3.png "生成public文件比对")


　　打开看到是加入了框架的代码导致。所以这时候要解决的是怎样让hexo编译的时候忽略该文件不加入框架代码。

　　还好hexo也考虑到这个问题：

![Result pic 4](/contentimg/12/4.png "属性skip_render")


``` java
skip_render: 
 - contentimg/11/click.html
 - 404/404.html
 - README.md
```

　　在这里添加需要忽略编译的文件或文件夹。包括README.md也能这样弄，就不用像我前面的优化博客中提到那样在gulp里面操作复制文件了。

　　文件夹的话是/*。注意设置完后，需要hexo clean，再hexo g。才能看到效果。不然直接hexo g，是不起效的。
