---
title: 百度sitemap和谷歌sitemap同时使用不同的url
date: 2018-10-20 00:07:59
categories:
  - 源码分析
tags:
  - hexo源码
---

　　本文分享如果在同一次hexo g中，百度sitemap和谷歌sitemap使用不同的url。

<!-- more -->

　　目前我挂谷歌是挂github的链接，而挂百度使用域名。但是默认配置文件中的url只有一个。这样每次生成，他们都会使用那个默认url。这样得生成两次，分开提交才能做好。

　　真有必要这么麻烦吗？

　　于是我开始找“node_modules”文件夹里面的源码。

　　谷歌的sitemap生成源码里：

![Result pic 1](/contentimg/20/1.png "hexo-generator-sitemap源码")


　　是直接拿到hexo.config.sitemap，然后就是generator.js，这样绕进去找。得绕有点久。那先看看百度那边。

![Result pic 1](/contentimg/20/2.png "hexo-generator-baidu-sitemap源码")

![Result pic 1](/contentimg/20/3.png "baidusitemap.ejs源码")

　　有戏，使用的不是同一个sitemap，然后在baidusitemap.ejs里面又读了一次url！

　　那就好办了，在百度sitemap那里多写一个url就搞定了：

![Result pic 1](/contentimg/20/4.png "baidusitemap下多加一个url")


　　搞定，一次hexo g。两个sitemap的域名是不同的了。
