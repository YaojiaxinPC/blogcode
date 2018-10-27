---
title: markdown扩展
date: 2018-10-19 00:07:59
categories:
  - markdown扩展
tags:
  - markdown
---

　　本文分享markdown的妙用：插入本地文件。

<!-- more -->

　　前一篇博客，我插入了一个pdf文件。

实际上是这样写的：

![Result pic 1](/contentimg/19/1.png "源文件")



　　还能这样写（使用html，并加入图标）：

``` javascripts
<a id="download" href="/contentimg/18/Office-2019.pdf"><i class="fa fa-download"></i><span> Download PDF </span>
</a>
```

　　这里也放一下pdf转html的一个网站吧，速度蛮快的：

[迅捷PDF在线转换器](http://app.xunjiepdf.com/pdf2html)

　　转化完下载下来是一个压缩包，解压放到工程中，然后到主配置文件修改：

![Result pic 2](/contentimg/19/2.png "_config.yml")


　　提醒hexo忽略编译该文件夹。然后清理整个工程：hexo clean。再生成和发布，就可以使用了。

# 优化版

　　目前这个在移动端无法适配大小。而且如果每个pdf都拿去转html，效率一般般。如果只需要完成电脑端的查看，可以直接

``` html
<p><div style="width:100%; height:950px;border:none;text-align:center"><iframe allowtransparency="yes" frameborder="0" width="100%" height="800" src="filepath.pdf"/></div></p>
```

　　这种做法，实际hexo有个插件已经集成自动转化这种代码。但是不推荐这种做法！理由是iframe+pdf原文件，在手机端打开，不是提示下载，就是提示不支持。

　　但是日常生活中，我们看到那些做得好的网站，是能在线浏览pdf的？都是后台转html？不是，这里有个开源插件：[pdf.js下载](http://mozilla.github.io/pdf.js/getting_started/#download) 源码120+m，有兴趣的前端工程师可以去github下载来看。这个链接是已经build的。拿到手后，修改一些参数后就可以使用了。

![Result pic 2](/contentimg/19/3.png "解压后，全部复制到source目录下")


　　要改的地方只有一个：找到示例中的pdf文件，删掉，同时在viewer.js脚本中找到这个文件的指向，删掉。

![Result pic 2](/contentimg/19/4.png "设为空string")

![Result pic 2](/contentimg/19/5.png "使用示例")


　　然后到配置文件设置不编译这个目录，重新生成，就可以启用了。使用方法是在src中，先定位到该viewer.html，然后传你要显示的pdf给它。这样在电脑端或者移动端，都是可以实时预览，而且下次引用也方便。只需要指定新的pdf目录即可。






