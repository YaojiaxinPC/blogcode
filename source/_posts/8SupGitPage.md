---
title: 搭建个人博客心得---个人站点yaojx.net的优化之路
date: 2018-10-18 22:55:58
categories:
  - 编程人生
tags:
  - 域名
  - 个人博客  
---
	
　　本文是记录配置域名转址，以及如何优化gitpage访问等等高级功能的文章。该系列有3篇：1.付费虚拟云主机+WordPress；2.免费github+Hexo；3.个人站点yaojx.net的优化之路。

<!-- more -->
　　整个优化非常坎坷，最后总结，才发现部署到coding就已经达到了优化中的99%。剩下这个1%，花了我99%的时间和精力。

　　本文不废话怎么排查，从什么地方入手。直接根据我优化中的体会来讲。

## 一.转址

### 1.1 理解转址

[域名解析中A记录、CNAME、MX记录、NS记录的区别和联系](https://www.2cto.com/net/201306/221200.html)

[从DNS到github pages自定义域名 -- 漫谈域名那些事](http://winterttr.me/2015/10/23/from-dns-to-github-custom-domain/)

　　上面这两篇文章讲得很详细，介绍了DNS配置中几个选项间的关系。

　　转址的作用，就是当我在浏览器输入A的时候，浏览器自动帮我跳转到B网站（A方式），这里CNAME还添加了将B网站的前缀域名修改为A网站的效果（可配置，当没设置该项时就不会修改域名）。

　　一般情况下，我们只需要设置两个A方式（带www的，和不带www的），然后在page那边设置CNAME。

### 1.2 GoDaddy转址

![Result pic 1](/contentimg/8/1.png "GoDaddy设置转址")


　　这里GoDaddy给我们设置了一个基础的转址，但是不是很好用(起作用慢)。推荐是去修改上面DNS管理。


　　这里我就不截图了，默认项可以保留，默认有几个A和几个CNAME。直接添加新选项，然后TTL设置为自定义“600”。其他默认项暂时没必要删除。

``` bash
A       @     目标ip地址  //@ 相当于 yaojx.net
A       www   目标ip地址  // 如果没这一项，网站就是www.yaojx.net了
```

　　注意TTL设置600最小见效才快。不然得等好几个小时。

### 1.3 dnspod转址（即现在的腾讯云服务）

　　这个不用记录了，直接有“一键”的。就是输入两个ip就行，默认“一键”后，给我们创造了两个A类型的，一个是“www”，另一个是“@”。

　　这里提一下怎么找gitpage和codingpage的ip：

![Result pic 2](/contentimg/8/2.png "找page的ip")


　　直接ping网站，注意这里github的IP会左右变动。但是不影响我们使用A方式转址。图中ip没一致，但是仍然可以转址成功。

### 1.4 GitHub相关配置

[GitHub自定义域疑难解答](https://help.github.com/articles/troubleshooting-custom-domains/)


　　coding那个就不用说明了，和腾讯一样都是一键的。

　　GitHub这边要弄的东西不复杂，就添加一个文件[CNAME](https://github.com/YaojiaxinPC/YaojiaxinPC.github.io/blob/master/CNAME) ，注意没有后缀，五个字母都大写。里面放的是你要跳转的域名。

　　该文件一创建马上生效，你访问YaojiaxinPC.github.io就会跳到CNAME里面的域名yaojx.net然后又回来YaojiaxinPC.github.io，当然这时候前缀已经改为yaojx.net了。（这个过程可以在chrome中捕捉到，所以修改转址后，直接访问YaojiaxinPC.github.io反而耗时。）


　　这里遇到的坑是，刚开始使用GoDaddy，后面改cloudflare，因为都在国外，转址更新见效慢，域名那边没转址对YaojiaxinPC.github.io，导致跳过来gitpage后，是个404，访问YaojiaxinPC.github.io这边，又已经转址到yao.net-->404，构不成一个环。卡了好久，等几个小时后，DNS同步到了后才见效。

　　coding那边就不用，一设置就见效。所以后面我域名都放到DNSPOD上了。

## 二.优化工具

### 2.1 [百度统计](https://tongji.baidu.com/web/welcome) 分析优化内容

![Result pic 3](/contentimg/8/3.png "百度统计情况-githubpage")

![Result pic 4](/contentimg/8/4.png "百度统计情况-codingpage")


　　里面提到的合并js，以及Gzip压缩，都要改大量代码，所以这两项目前我还没去弄。只根据未优化前期提的建议，使用了后面提到的gulp压缩工具而已。同时前期还有提到头像文件太大等等其他建议（头像后面我改成170X170）。

### 2.2 Chrome调试工具使用

![Result pic 5](/contentimg/8/5.png "Chrome调试工具")

　　未优化前期，用Chrome打开，一直提示加载过慢（5S以上），使用默认字体代替，同时提示是ttf文件下载太久。当时就把我引到优化字体的方向上，后面追查了好长时间，发现搞错了。重点在DNS解析和IP。当然，如果有用谷歌字体，这里会有问题的，谷歌被墙，所以在next主题中最好使用本地字体，搜索有提到用360库的，还有github上的ed链接等等那些，效果都一般，还是不使用这些字体好。

![Result pic 6](/contentimg/8/6.png "取消使用谷歌字体")


还有其他一些统计工具，不过实际Chrome的调试工具就已经能完成那些统计了，就不推荐那些工具了。

### 2.3 [站长工具](http://tool.chinaz.com/gzips/)

![Result pic 7](/contentimg/8/7.png "codingpage自带优化")


![Result pic 8](/contentimg/8/8.png "手动优化后的githubpage")

　　第二个图是更新了文章后截的图，大小上是大了一点点（其他东西都是和coding那边一样的），都是使用手动gulp优化后的Gzip压缩（文件只是体积变小，百度统计认的gzip是后缀为gz的压缩文件，意思不同）。但是在上面图中识别出来是不同：codingpage的直接压缩率99.96%？？？同时识别不出来gzip压缩。这样就能解释怎么放那边打开是秒开了。

## 三.Gulp压缩

　　这个是重点，让整个包从15.7m压缩到11.7m。而且整个操作除了安装工具，写一个js脚本外，不用修改工程中的任何东西和代码。不会对原工程造成影响！

### 3.1 安装gulp

### 3.2 编写gulp脚本

### 3.3 gulp作用


## 四.总结

　　划重点，其实如果你部署在codingpage上，本篇文章就不用看了。因为都是秒开的。

　　部署在github上，逼格虽然高了些，但由于服务器在国外，而且没自带加速，优化之路很麻烦：压缩+CDN加速。

　　而压缩，其实就是牺牲cpu解压换来的。目前使用gulp进行初步压缩。复杂的可以直接压缩成gz文件来处理。

　　在我认为，js文件压缩就没必要了，合并js文件还可以，压缩就没必要。图片方面是主要优化对象，而这里，其实还有个[七牛云](https://www.qiniu.com/) 七牛在国内，访问比github快。而且每月有10g的免费额度。

　　注意，这里page的优化，DNS解析权重最大，所以上面提到的合并js，其实就是避免来回的dns解析请求。而IP，github服务器在国外，访问相对国内的coding会慢好多。

　　由于整个page是静态文件，所以好多技术性上的优化（缓存），权重是很小的。

