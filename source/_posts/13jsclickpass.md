---
title: 修改蜘蛛网悬浮于顶层
date: 2018-10-19 00:01:59
categories:
  - 前端
tags:
  - js
  - canvas-nest
---
	
　　本文记录我如何修改当前主题NexT中引用的canvas-nest的一些细节。

<!-- more -->

　　默认NexT主题，蜘蛛网是跟随鼠标运动的，但是我感觉那样不好玩，如果静置的话，会变成一个圈，不好看。然后我浏览了一下整个目录结构，找到

![Result pic 1](/contentimg/13/1.png "引用目录结构")


　　看到有[canvas-nest](https://github.com/hustcc/canvas-nest.js) 还有[fancybox](http://fancybox.net/)  。

　　canvas-nest：蜘蛛网的实现js代码。

　　fancybox：淡入淡出功能模块。

　　于是我就想到把蜘蛛网的鼠标部分代码去掉。引入fancybox的淡入淡出动画，点击的时候出现“赞”的图标。

　　“赞”部分的代码如下：

``` javascripts
$(document).bind("click",function(e){var $i = $("<a style='border:none;border-bottom:0px'>").prepend("<img src='/images/redhand.png'/>");var x=e.pageX,y=e.pageY;$i.css({"z-index":99999,  
 "top":y-15,"left":x,"position":"absolute","color":"red"});$("body").append($i);$i.animate({"top":y-180,"opacity":0},1500,function(){$i.remove();});e.stopPropagation();});
```

　　然后又想到把蜘蛛网放到顶层

>  zIndex=99

　　结果发现这时候鼠标不能选中代码和文字进行复制了。推测是canvas层挡住了，所以得给它设置穿透：

>  pointer-events:none;


[pointer-events](http://www.css88.com/book/css/properties/user-interface/pointer-events.htm)

![Result pic 2](/contentimg/13/2.png "pointer-events")

