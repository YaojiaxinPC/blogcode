---
title: 搭建个人博客心得---配置主题Next
date: 2018-10-18 23:55:58
top: 99
categories:
  - 编程人生
tags:
  - js
  - 前端技术
  - 个人博客  
---
	
　　本文是记录如何修改配置Next，增加百度统计功能、评论区、RSS、爬虫等模块。是在前面几篇文章的扩展记录。

　　注意这些第三方插件，当我们的博客布在github和coding两边时，数据是可以共用的！只要id和key是同样，在服务供应商那边记录域名和网站后，就可以顺利共用数据。

<!-- more -->
　　
[***Next的使用说明***](http://theme-next.iissnan.com/getting-started.html#avatar-setting)

　　开头先贴官方配置说明。这里的头像位置、昵称等等，请通过这个官方配置说明链接来配置。本文只分享官方文档里面难的部分，以及文档里面没有的部分。记住配置文件“：”后面需要打空格，然后才加内容！

　　注意，打开这些第三方服务，会拖慢网站打开速度，请酌情使用。

　　[官方指导链接](http://theme-next.iissnan.com/third-party-services.html#algolia-search) 

## 评论系统&文章阅读量统计功能

　　因为文章访问数量那个系统我用的[leancloud](https://leancloud.cn/)  ，发现配置文件里面刚好也支持它，我就也用的这个服务。

　　官方文档里面有提到这个阅读理解统计的：

[为NexT主题添加文章阅读量统计功能](https://notes.doublemine.me/2015-10-21-为NexT主题添加文章阅读量统计功能.html#%E9%85%8D%E7%BD%AELeanCloud)  

　　一起凑合着看吧。由于它支持我们改数据，所以我就使用它了。（没事可以偷偷上去改个阅读量999999！）

![Result pic 1](/contentimg/9/8.png "创建应用")

![Result pic 1](/contentimg/9/9.png "官方教程")

![Result pic 1](/contentimg/9/10.png "Counter以及Comment")

　　注意，第一次创建应用，在这里添加class，需要等2分钟，所以要耐心等。另外，免费版的，不能删除class，所以别加太多了。注意这里：评论的是Comment，文章阅读量的是Counter。

　　然后就是去获取key和id。这里不能直接鼠标拉选，不过可以右键，定位到元素，然后在代码里面找到这个字符串，就能复制了。

![Result pic 1](/contentimg/9/13.png "获取key和id")

![Result pic 1](/contentimg/9/14.png "修改配置文件valine")

![Result pic 1](/contentimg/9/15.png "修改配置文件leancloud_visitors")


　　最后，千万记得要去“安全中心”设置“web安全域名”！因为这个id和key是明文，谁都能抓取到的！

![Result pic 1](/contentimg/9/16.png "接口屏蔽非安全域名的调用，这会造成网页加载超级慢")


　　还可以设置邮件提醒[Valine 评论系统中的邮件提醒设置](https://github.com/xCss/Valine/wiki/Valine-评论系统中的邮件提醒设置) 

## [百度统计](http://tongji.baidu.com/) 

　　文档里面说得很简略，下面我就介绍一下详细的过程。

![Result pic 1](/contentimg/9/1.png "百度统计")

　　怎么打开？

![Result pic 1](/contentimg/9/3.png "指导文档说明情况")

![Result pic 1](/contentimg/9/2.png "在这里")

![Result pic 1](/contentimg/9/4.png "在配置文件这里")

　　先在百度统计那边复制key，然后到配置文件里面ctrl f找到baidu_analytics 字段，打一个空格后把key复制进去。hexo clean，再生成，让html重新编译，会自动加代码进去的。

![Result pic 1](/contentimg/9/6.png "F12查看代码")


　　如果不会，可以直接发布。然后到百度统计那边检查。

![Result pic 1](/contentimg/9/5.png "百度统计自检查")


## 内容分享服务

![Result pic 1](/contentimg/9/7.png "不支持https")

　　第一个JiaThis，搜索有新闻说已经关闭分享服务了。第三个好像是国外，搞推特的，国内访问应该比较慢，也不考虑。后面找了Mob，但是不支持https，所以也用不了。

　　剩下一个百度，结果，打开后发现很丑，还只能分享图片，不能整篇文章分享（得改代码）。所以我就没开该项。请自取哈。

![Result pic 1](/contentimg/9/31.png "取消注释该两项即可")

![Result pic 1](/contentimg/9/30.png "百度分析效果")


　　分享的效果也不好，点击后调整的界面不好看。

## [字数统计&阅读时长](https://www.cnblogs.com/php-linux/p/8418518.html)

![Result pic 1](/contentimg/9/17.png "配置文件post_wordcount")


　　里面已经内置了，开启就能使用了。但是单纯改配置文件，数字是显示不出来的，得添加插件：

>  npm install hexo-wordcount --save -dev

　　安装完成后，hexo clean；hexo g。启动服务就能看到效果了。如果想像我这边一样加文字：

　　到目录：/themes/next/layout/_macro/post.swig

　　用记事本打开后搜索post_wordcount：


![Result pic 1](/contentimg/9/18.png "添加字和分钟")
　　
![Result pic 1](/contentimg/9/19.png "效果")


## [RSS](https://www.jianshu.com/p/a79422ab2013)

>  npm install hexo-generator-feed --save -dev

　　然后到主配置文件最底下添加：

``` cmd 
# Extensions
plugins:
    hexo-generator-feed
#Feed Atom
feed:
    type: atom
    path: atom.xml
    limit: 20
```

![Result pic 1](/contentimg/9/20.png "添加RSS生成配置")


　　这个插件的作用是统计记录你的文章，生成一个xml格式的文件atom.xml。别人通过订阅分析你这个文件变动来了解你文章的更新情况。

![Result pic 1](/contentimg/9/22.png "简书上博主分享的操作")

## [百度sitemap](https://blog.csdn.net/heqiangflytosky/article/details/54863166) 

>  npm install hexo-generator-baidu-sitemap --save -dev

![Result pic 1](/contentimg/9/23.png "百度sitemap情况")

　　在百度里面搜索site:域名。检验是否被百度收录。如果没有的，需要进行登记。这里google的操作比较简单。

　　百度的，由于被github屏蔽爬虫，所以只能考虑放coding上面。coding的免费玩家，是会强制301转址的，所以这时候放百度验证，是无法成功的，百度验证不会像浏览器那样跳转识别，在说明那里也提到：“如果存在转址，请暂时取消”。

![Result pic 1](/contentimg/9/24.png "coding要求")


　　那怎么玩？只能想办法完成这个coding要求了。加图标的话，布局上没想到怎么改。所以我选择加文字版：

![Result pic 1](/contentimg/9/25.png "coding要求文字版")

![Result pic 1](/contentimg/9/26.png "coding要求文字版效果")


　　刚开始还去翻代码，结果发现原来NexT考虑到这个问题了，直接给我们加在配置文件里面，只需要去设置这个属性就行，不用改代码。

![Result pic 1](/contentimg/9/27.png "修改配置文件位置")


　　这里会遇到一个问题，当你把coding那边那个代码复制过来时，hexo g会报错！原来是由于没换行的概念，hexo读配置属性，是根据“：+空格”来判断的，所以只需要把那个空格删掉，它就不识别成属性，就不会报错。

　　接下来就是等通过验证然后来搞百度收录了。

[百度收录链接](http://zhanzhang.baidu.com/linksubmit/url) 

　　收录前需要进行的[验证网站所有权](http://zhanzhang.baidu.com/site/siteadd)  。就是上面提到的验证。

　　这里有三种方式可以做到：挂文件/在html加代码/CNAME。推荐第一种，因为第二种就直接明文了。当然，最后我还是用了第三种，CNAME，只需要去dns服务商那边设置就行了，马上就生效了，不用等coding过检。

### 挂文件

　　就是把密码文件下载下来后，放在source根目录，然后到主配置文件找skip_render属性：

``` html
skip_render: 
 - baidu_verify_XXXXXX.html
```

　　防止hexo添加代码到该密码文件，百度爬虫才能识别到该文件。


### 加代码

　　找到文件\themes\next\layout\_partials\head.swig。然后直接在这里的空白处插入代码。

![Result pic 1](/contentimg/9/28.png "在head插入代码")


　　百度统计那边功能蛮多的，不过现在博客暂时还没收录，等收录后体验下其他的功能。

　　在配置好后，到配置文件启用：

``` cmd
baidusitemap:
  path: baidusitemap.xml
```

　　再到百度提交收录：

![Result pic 1](/contentimg/9/46.png "提交百度收录")


　　建议开启百度自动推送，就sitemap左边那个。代码已经集成在Next了，只要开启主题配置文件的属性“baidu_push”：

![Result pic 1](/contentimg/9/50.png "百度自动推送")


## Google收录

>  npm install hexo-generator-sitemap --save -dev

　　开vpn，[Google站长工具](https://www.google.com/webmasters/tools/home?hl=zh-CN)  类似百度收录的操作，都是下载密码html文件，放在根目录，然后到主配置文件添加忽略编译属性。

　　好处是github没有屏蔽google，所以直接用github那边的挂谷歌。而且他们都是国外的，所以挂github的话，比挂国内的coding对搜索排名要有利。

![Result pic 1](/contentimg/9/29.png "马上过检")

　　在配置好后，到配置文件启用：

``` cmd
#sitemap
sitemap:
  path: sitemap.xml
```

　　同样要去提交收录。但是超级快，一下就能在谷歌搜索到了。


## 其他第三方服务

![Result pic 1](/contentimg/9/32.png "目标目录")


　　到该目录下，列了目前NexT集成的第三方服务，可以根据文件名来选择要不要开启，都是在配置文件里面能找到开启选项的。其实这里的作用，就是把全部js脚本放在这里，然后用一个配置文件属性，判断要不要加这个脚本到html里面。


## 其他优化

　　第三方的东西我目前只加了这些，其他就是代码上的修改了。

### 文章末尾添加“---end---”

　　打开themes\next\layout\_macro\post.swig，找到“wechat_subscriber”的地方，这个就是文章结尾时，“请加我好友”的图标所在的地方。复制如下代码：

``` html
    {% if not is_index %}
	<div style="text-align:center;color: #ccc;font-size:20px;">-------------------------------------------------------- The End --------------------------------------------------------</div>
	{% endif %}
```

　　这里文字大小和长度，请根据自己喜好进行修改。

　　或者是使用hr写法。注意这里[文本文字在DIV中垂直水平居中显示](https://blog.csdn.net/lunhui1994_/article/details/79085805)  

``` html
    {% if not is_index %}
	<div style="height:85px;line-height:85px;text-align:center;color:#ccc;font-size:20px"><hr size="7" color="coral" style="vertical-align:middle;float:left" width="40%"> The End <hr size="7" color="coral" style="vertical-align:middle;float:right" width="40%"><br style="clear:both"/></div>
	{% endif %}
```

　　但在手机端效果不行，换行了。

### 取消打赏的文字摇晃

　　自带的摇晃太魔性了，建议去掉。到位置：next/source/css/_common/components/post/post-reward.styl ，搜“animation”：

``` java
加“/*  */”
```

![Result pic 1](/contentimg/9/35.png "屏蔽代码")


### 浏览页面的时候显示当前浏览进度

　　到主题配置文件，搜scrollpercent，改为true。

![Result pic 1](/contentimg/9/36.png "显示浏览进度")


　　还可以放到左边：修改scrollpercent上方的b2t为true。


![Result pic 1](/contentimg/9/37.png "浏览进度显示在左边")

![Result pic 1](/contentimg/9/38.png "两个修改项")


### fork me on github

#### 右上角

　　到[GitHub Corners](http://tholman.com/github-corners/)  选择喜欢的样式，复制代码。然后定位到next/layout/_layout.swig，搜索headband。将代码贴在下面：


![Result pic 1](/contentimg/9/39.png "右边实例")


### 左上角

　　到[Fork_me_on_GitHub](https://blog.github.com/2008-12-19-github-ribbons/)  选样式，像上面一样操作。当然也可以自己根据实际情况微调。


### 将标签前缀“#”换为图标 <i class="fa fa-tag"></i>

　　到next/layout/_macro/post.swig，搜索 

``` java
rel="tag"
```

``` java
将 #号 换成<i class="fa fa-tag"></i>
```

![Result pic 1](/contentimg/9/40.png "修改#为图标")

![Result pic 1](/contentimg/9/41.png "效果")



### 添加加载页面

![Result pic 1](/contentimg/9/42.png "加载进度条")


　　在next的配置文件搜“pace-theme”：这里我这个是pace-theme-center-atom，还有其他一堆可以选。

![Result pic 1](/contentimg/9/43.png "加载进度条设置")


### 添加站内搜索

>  npm install hexo-generator-searchdb --save

　　这里可能下载不下来，按照我前面说copy怎么下载那样，在npm失败后，会显示一个html，拿到百度云离线下载，下下来后，用记事本打开，搜version，找到最新版本，然后看barl的下载链接，再复制到百度云离线下载，然后当做本地文件来安装，就能安装了。

　　到主配置文件最后添加：

``` bash
#表示站内搜索
search:  
    path: search.xml
    field: post
    format: html
    limit: 10000
```

　　然后到NexT配置文件搜索“local_search”，启动enable：

![Result pic 1](/contentimg/9/44.png "启动站内搜索")


### 修改访问URL路径

　　默认情况下是年月日一串很长的url路径。是在主配置文件进行的修改：搜索“permalink”

>  permalink: :category/:title/   #分类/标题

![Result pic 1](/contentimg/9/45.png "修改访问url路径")



### [添加文章置顶功能](https://blog.csdn.net/qwerty200696/article/details/79010629) 

　　现在应该都是新版本了，所以直接介绍新版本的方式：

先卸载老插件，然后装新插件：

``` bash
npm uninstall hexo-generator-index --save
npm install hexo-generator-index-pin-top --save -dev
```

　　然后在文章开头加 “top: 数字”

![Result pic 1](/contentimg/9/47.png "置顶设置")


　　这样就能看的效果了。不过推荐加一下置顶图标在前面：

　　打开next/layout/_macro/post.swig，搜索
``` html
<div class="post-meta">
```

　　然后加入如下代码：

``` cmd
    {% if post.top %}
        <i class="fa fa-thumb-tack"></i>
        <font color=#222>置顶</font>
        <span class="post-meta-divider">|</span>
    {% endif %}
```

![Result pic 1](/contentimg/9/48.png "添加置顶图标")

![Result pic 1](/contentimg/9/49.png "置顶效果")　　

### [添加coding部分的一键复制功能](https://yfzhou.coding.me/2018/08/27/Hexo-Next%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%EF%BC%88%E4%BB%A3%E7%A0%81%E5%9D%97%E5%A4%8D%E5%88%B6%E5%8A%9F%E8%83%BD%EF%BC%89/) 

　　本博客没启用该功能，具体请访问该链接：[添加coding部分的一键复制功能](https://yfzhou.coding.me/2018/08/27/Hexo-Next%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%EF%BC%88%E4%BB%A3%E7%A0%81%E5%9D%97%E5%A4%8D%E5%88%B6%E5%8A%9F%E8%83%BD%EF%BC%89/)  

　　由于有中文，该链接通过中文转码处理，如果失效，请通过域名查找。

### 添加Robot和nofollow

　　新建robots.txt文件在source根目录下：

```  cmd
#hexo robots.txt
User-agent: *

Allow: /
Allow: /archives/
Allow: /categories/
Allow: /tags/
Allow: /about/

Disallow: /404/
Disallow: /contentimg/
Disallow: /css/
Disallow: /images/
Disallow: /js/
Disallow: /lib/



Sitemap: http://yaojx.net/search.xml
Sitemap: http://yaojx.net/sitemap.xml
Sitemap: http://yaojx.net/baidusitemap.xml
```

　　当没这个文件时，默认全部内容可以爬，这个文件就是告诉那些可以爬，那些不行。

>  npm install hexo-autonofollow --save

　　当文章中有链接时，爬虫会顺着链接爬出去。所以得加这个nofollow。

　　安装完后，到主配置文件最底下添加：

``` cmd
nofollow:
    enable: true
    exclude:
        - yaojx.net
```

　　然后就是去百度站长提交robot文件了。

### qq点击后直接开打联系我的窗口

　　该功能使用的是腾讯的开放接口：

![Result pic 1](/contentimg/9/51.png "next配置文件设置")　　


``` html
http://wpa.qq.com/msgrd?v=3&uin=659771655&site=qq&menu=yes
```

　　uin改成自己的qq就行了。


这里有几篇文章是讲怎么修改整个主题的，重点推荐：
[基于Hexo搭建个人博客——进阶篇(从入门到入土)](http://yangbingdong.com/2017/build-blog-hexo-advanced/) 
[Hexo搭建GitHub博客—打造炫酷的NexT主题--高级(四)](https://segmentfault.com/a/1190000016527304) 
[Hexo+Next个人博客主题优化](https://www.colabug.com/1840493.html) 
 
















