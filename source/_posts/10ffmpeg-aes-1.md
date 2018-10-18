---
title: ffmpeg-简单AES加解密记录
date: 2018-10-18 23:57:58
categories:
  - 编程人生
tags:
  - 视频处理
  - 工具使用
  - ffmpeg  
---
	
　　本文记录如何将浏览器中的视频缓存文件合并成一个mp4文件。该方式使用ffmpeg。视频片段为m3u8格式。

<!-- more -->
***

　　视频分段缓存技术之中的一种格式m3u8，据说是苹果开发的。而这里由于有ffmpeg工具，运用起来很快捷，当然也可以自己写代码集成一个播放器。本文暂时只记录简单的运用ffmpeg工具加解密和播放。代码集成等后面有空再分享。

观摩这项技术时参考的几篇文章分享如下：

[使用ffmpeg转码m3u8并播放](https://blog.csdn.net/psh18513234633/article/details/79312607)

[hls协议（最清晰的讲解）](https://blog.csdn.net/weiyuefei/article/details/70257616)

[流媒体开发之--HLS--M3U8解析(2): HLS草案](https://blog.csdn.net/newarow/article/details/82805672)

[ffmpeg Cheatsheet](https://gist.github.com/larvata/95df619df7109d8b74d2b965a3266354#file-ffmpeg-cheatsheet-md)

[使用ffmpeg视频切片并加密](https://www.cnblogs.com/codeAB/p/9184266.html)

[ffmpeg分解视频文件并加密](https://blog.csdn.net/cnhome/article/details/73250495)

[FFmpeg之ffplay命令使用](https://blog.csdn.net/xuyankuanrong/article/details/77529468)

还有一些cmd操作：

[CMD批处理循环，太强大了](https://blog.csdn.net/xhhjin/article/details/7373524)

[copy /b 命令无缝合并多个文件](http://www.360doc.com/content/14/0212/22/9849466_352039289.shtml)

　　当然还有其他很多参考过的网页，但是都很散，有用信息不多，暂不分享那些网页。

　　这项技术运用在很多浏览器上，所以想找东西练手，还是蛮多的（某些想下载但是没提示下载的视频，实际上是放在缓存文件夹里面，然后本地加载拼起来的）。

这里我就简单分享一下如何自己用ffmepg对一个视频加密，以及解密该视频。

目前我接触到3种情况：

1.  未加密的视频，用PotPlayer可以直接打开观看；

1.  有AES的key，没IV（其实就是使用了默认值），部分有两个m3u8；

1.  有AES的key和IV，就是下面将要分享的操作。

　　目前要使用的工具，首先必须要有[ffmepg](https://www.ffmpeg.org/download.html) ，下载成已经Build好的包，不然自己来生成比较麻烦，当然，有兴趣可以下载代码来看，是开源的。


![Result pic 1](/contentimg/10/1.png "下载ffmpeg") 


　　生成key部分我使用了[Openssl](http://gnuwin32.sourceforge.net/packages/openssl.htm)  ，功能超级多，但是本文只用到简单的生成随机密码。好像是我下载不对，操作发现不支持hex，所以后面生成hex部分得写一下代码处理，当然也有网页生成，数据库生成，这里就不写明了。

![Result pic 2](/contentimg/10/2.png "下载openssl") 


　　然后就是准备一个视频。我这次下载了这些东西：

![Result pic 3](/contentimg/10/3.png "全部所需东西") 


　　接下来就开始动手：（实际不用Openssl也行，直接手动写几个编码当密码就行）

![Result pic 4](/contentimg/10/4.png "缓存目录结构")


　　通过上面推荐的链接，大家应该知道是主要m3u8文件，然后附带的ts文件（可以不写后缀，就是些视频片段，可以在播放器中打开观看），key（会改变视频片段的编码，导致无法播放）。

　　这里的m3u8可以用播放器打开，正常是会报错的，因为视频片段被AES加密了编码模式，所以普通读取出来不是正常的头，就报错了。

![Result pic 5](/contentimg/10/5.png "无法打开加密文件")

　　如果你遇到的m3u8没有加密，那这里是打开可以播放的。上面那些ts也是可以直接播放器打开的。

　　一般情况下，m3u8文件可能需要进行修改。就是当你操作的是手机端，把缓存搞在电脑上转码时（或者从C盘缓存目录拷贝出来时），里面的路径是不对的，里面记录的是绝对路径，需要修改。像下面图片，手机拷过来后是手机上的绝对路径，用记事本ctrl + H，该成电脑上的当前路径后就能用了（或者删掉变成相对路径）。

![Result pic 6](/contentimg/10/6.png "修改路径")


现在从头开始做吧。

　　目前我们手上只有一个test.mp4，先介绍不加密的方式分段生成m3u8。

## 无加密方式生成m3u8

　　新建一个文件夹来放置后面要生成的ts文件。

　　先用管理员身份运行cmd：

　　cd到ffmpeg.exe所在的地方（不过我推荐是cd到要生成文件的地方，然后ffmpeg.exe弄成全路径来执行，效率会高一些）。

　　例如我test.mp4在D:\aa\bb目录下：

　　这样我在cmd中输入：

``` cmd
ffmpeg.exe -y -i D:\aa\bb\test.mp4 -hls_time 6 -hls_playlist_type vod -hls_segment_filename "D:\aa\bb\file%d" D:\aa\bb\playlist.m3u8
```

　　-hls_time  是每一段视频多长时间

　　-hls_segment_filename   分段生成在哪里，命名规则%d

　　以及结尾的m3u8输出路径

![Result pic 7](/contentimg/10/7.png "处理无加密方式片段")


　　目录下已经生成分段文件+m3u8文件了，由于这里没有加密，所以分段文件可以用播放器直接打开。当然也可以直接打开m3u8文件。

![Result pic 8](/contentimg/10/8.png "无加密playlist.m3u8")


这里插播一下ffplay的使用：

![Result pic 9](/contentimg/10/9.png "使用ffplay播放视频")


　　指令中要注意的就是路径，从前面我们知道是m3u8中记录是用相对路径，所以需要把cmd移到该目录下，然后用ffplay的全路径 + -allowed_extensions ALL （就是允许全部后缀模式，否则没后缀的不让播放） +m3u8 + 回车

``` cmd
D:\aa\ffmpeg-4.0.2-win64-static\bin\ffplay.exe -allowed_extensions ALL playlist.m3u8
```

　　既然提到分段，那就有合并了。

　　由于这里没有使用加密，所以可以直接把全部ts文件合并成一个文件就行。

　　可以cmd直接合并，但是需要提前处理命名规则，因为cmd按字符比较的，01和1是两种不同的概念，这里可以写个循环处理改命名，然后再用cmd的copy /b * new.mp4。

　　cmd代码不好写。所以推荐还是用ffmpeg。

代码如下：合并并转码成mp4格式
``` cmd
D:\aa\ffmpeg-4.0.2-win64-static\bin\ffmpeg.exe -allowed_extensions ALL -i playlist.m3u8 -acodec copy -vcodec copy -f mp4 output.mp4
```

![Result pic 10](/contentimg/10/10.png "合并并转码成mp4格式")


## 加密方式生成m3u8

　　有了前面那些截图，这里的操作其实就是多了写密码步骤而已，其他大部分一样，所以这里就不再截图了。

　　加密，目前我看的是AES。概念那些大家有空去了解一下，这里只分享一下怎么用。

具体步骤是：[使用ffmpeg视频切片并加密](https://www.cnblogs.com/codeAB/p/9184266.html)  

　　然后里面一些参数，其实在源文件里面已经有了，可以找这些文档来弄明白设置什么参数：

![Result pic 11](/contentimg/10/11.png "源文件说明文档")


　　这里我多分享一下直接用一个key来加密怎么操作吧。就是手上有一个密码+一个视频，弄到最后是一个放密码的文本文件，然后就是ts+m3u8，没有IV。

　　其实就是前面步骤中，enc.keyinfo中第三行的IV删掉就行。

　　同时步骤一中用openssl生成key的，改成：新建文本文件，写入密码后保存，然后删掉后缀当key。

其他照旧：

``` cmd 
D:\aa\ffmpeg-4.0.2-win64-static\bin\ffmpeg.exe -y -i test.mp4 -hls_time 6 -hls_key_info_file k0.keyinfo -hls_playlist_type vod -hls_segment_filename "file%d" playlist.m3u8
```

![Result pic 12](/contentimg/10/12.png "加密方式m3u8文件")


　　密码文件k0，用openssl生成的话，打开是乱码的，自己写入的就不会乱码，使用起来暂时未发现区别：

![Result pic 13](/contentimg/10/13.png "密码文件")


　　加密方式生成的ts文件，你会发现无法用播放器打开，只能用ffplay打开（打开方式同无加密一样的代码，都是直接传入m3u8文件即可）。

　　这样解密方式，实际也和前面一样，都是围绕m3u8，是否有key，实际都是内部处理的。

这里可能会遇到问题的是，网上的都是说EXT-X-KEY这里的是http，实际都可以，找得到文件就行。然后就是开头提的两个m3u8的，这个就溜一点：

　　改EXT-X-KEY的文件地址为key的本地地址后，发现这样去转是失败的（提示找不到ts文件），这时可以把下面的一堆ts信息，换成另一个m3u8里面的ts信息，就可以转换了。我遇到的情况，是第一个ts信息是本地文件，第二个是一个找不到的路径的文件（但是这个带key，第一个不带），修改成本地文件后，除了#EXTINF的数字不同外，其他都一样（文件也能找到了），结果还是报错，就把那个m3u8的ts信息都复制过来（#EXTINF的数字保持一样），本个m3u8只保留EXT-X-KEY这里的URI="k0"，其他都是用另一个m3u8的，就可以转换了。

