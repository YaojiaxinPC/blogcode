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
