---
title: WallBall小游戏介绍
date: 2018-10-28 21:07:59
categories:
  - Unity3D
tags:
  - 游戏开发
  - 2D
  - 入门级
  - 小游戏
---

　　本文介绍Unity商店的一款小游戏[Wall Ball](https://assetstore.unity.com/packages/templates/packs/wall-ball-49573)  。   

<!-- more -->

![Result pic 1](/contentimg/31/1.jpg "Wall Ball")


## 游戏简介

　　该小游戏是3D类型，主角是一个小球，通过在独木桥地板上滚动逃亡生存，地板会下沉掉落，所以小球得一直向前滚动。

　　玩家通过点击屏幕，指导小球左右2个方向的变换，帮助它安全踏上地板逃亡，同时一路收集小星星攒积分。伴随着逃亡之路的还有场景光线的变换，会有日夜更替，所以玩家要小心晚上会看不清道路而失足掉落。

## 游戏体验

　　[体验demo](/unitydemo/4/index.html) ，请用Chrome或者手机浏览器打开。

## 游戏制作

　　只有一些UI的图标，还有小球的数字8贴图。其他东西都可以在unity内部创建。

### 1.游戏规则细化

　　写代码前，需要先了解这个游戏怎么玩：

　　这是一个逃亡游戏，主角所待的地板会不断往下掉，所以只能不停的往前跑。为了增强游戏感，特地设置了独木桥类型的前路，主角只要跑错方向就会掉下无尽深渊。为了加大难度，增加了昼夜替换，晚上的时候光线变暗。同时为了防止逃亡久了后的精神麻痹现象，增加了建筑材料的颜色变幻的设定。

　　玩家可以通过点击屏幕，操作小球前面的方向是向左还是向右。同时路上会有小星星，收集能增加积分。积分用来记录玩家挑战最佳值。

所以规划如下：

1. 地板在小球滚过后会下落消失；同时在尽头会随机在左边或者右边生成新地板，并且一次只能生成紧凑的一块。 
1. 设定时间间隔，控制环境灯光的变化，分白天的正常亮度+晚上的黑暗情况。
1. 增加地板颜色的变化设定。
1. 地板上有小星星，碰到就加积分。游戏结束要保存积分，最后统计玩家积分，汇总出挑战最高分。
1. 小球受向下的力，踩不到地板就掉下去，游戏结束。
1. 玩家点击屏幕，控制变换小球向左或者向右。

### 2.代码


　　这个游戏代码架构不是很好，由于游戏简单，所以使用的是最简单的直接写代码的方式，直接高效。一个脚本对应一个功能，同时有一个管理全局的总脚本。在生成地板的地方有bug，不是按照数量来生成，而是固定间隔生成，会导致出现数量只增不减的情况---》当小球不滚动时，这时不会有地板消失，但是地板生成是照旧的。所以本文不对代码进行详解。

#### PlayerPrefs

　　在电脑上，是直接保存到注册表，在浏览器上，保存成cookies。原本以为发布成webgl得修改，写js来完成这个操作，没想到能正常执行。

![Result pic 1](/contentimg/31/2.png "playerprefs")


#### Rigidbody.velocity

![Result pic 1](/contentimg/31/3.png "Rigidbody.velocity")


　　这里控制小球滚动，不是通过position++。而是给小球施加一个力。注意，x/y/z ==》右/上/前，这里x=》右，z=》前。向下就是对应y，所以这里给小球y轴一个向下的重力Physics.gravity.y。

　　游戏中的向左向右，就单独在x或者z轴上施加。通过一个bool值来判断应该加那个方向上的力就行。

　　另外要注意，施加力，必须在FixedUpdate上进行。不能在Update等其他地方。不然会出现抖动跳跃的现象。


### 3.开始制作游戏

　　工程中，素材比较不规则，作者是通过Unity的Packing系统打包图集。鉴于这个游戏可以记录的东西少，这里就分享一下怎么使用工具打包图集吧。

#### TexturePackerGUI

　　惯例，排序一下图片，排除掉特殊的图片。

![Result pic 1](/contentimg/31/4.png "图片排序")

![Result pic 1](/contentimg/31/5.png "特殊图片")


　　很明显，“8.jpg”必须搞出来。

![Result pic 1](/contentimg/31/6.png "排除特殊图片")


　　但是这里还有一张不太适合，放进去后导致右边大量的留白。可以通过直接在图集中选中，来知道是哪一张。

![Result pic 1](/contentimg/31/7.png "找到不合适的图")


　　去掉不合适的后，剩下的就可以打包成一个图了。不过，实际使用中的打包，是将一起用的图打包成一个图集，体积权重较低。

![Result pic 1](/contentimg/31/8.png "操作流程")

![Result pic 1](/contentimg/31/9.png "data format")

![Result pic 1](/contentimg/31/10.png "发布")


　　发布出来是两个，一个png（带透明通道）+一个“.tpsheet”后缀的文件，用记事本格式打开，是记录每张照片的位置信息。

![Result pic 1](/contentimg/31/11.png "tpsheet内容")


　　将这两个文件直接导入unity。然后回到unity，添加插件[TexturePackerImporter](https://assetstore.unity.com/packages/tools/sprite-management/texturepacker-importer-16641) 。这时候你会发现，前面导入的图集，unity自动切好了。

![Result pic 1](/contentimg/31/12.png "使用情况")


　　上面是直接拖到面板使用的。但是如果想代码里面使用呢。平时是Resources.Load(path)；但是会发现这时候不知道path是哪个才对。

　　但是这时候是用Resources.LoadAll(path)！

![Result pic 1](/contentimg/31/13.png "代码读取图片")


　　load这个图集，返回的不是集合，也无法使用。必须loadall后才能获取到，然后再来找到对应名字的。

#### 制作预制体

略

#### 整合Scene

略

### 压缩优化发布

略

### 追加

　　在电脑上跑的时候没注意，发布上去后，在手机点开，结果浏览器奔溃了？？？

　　推测fps值太高了，卡掉浏览器。

#### 设置FPS

　　FPS，就是控制每秒调用多少次Update的。调用次数越多，cpu越高，同时说明代码越流畅，中间没明显卡顿。在电脑上，fps是越高越好的，但是移动端就不行了，要控制在稳定的值。webgl建议越低越好。

　　这里计算方式，用一个int，每次update的时候++；然后计算程序运行时间，相除。最好是用一个间隔，保证两个数都是比较小的容易除的数字。

　　属性设置就一条代码：

>          Application.targetFrameRate = 50;

![Result pic 1](/contentimg/31/14.png "同时需要注意这里的设置")


　　同时要去修改这里。设置为Don't Sync。不然上面的代码就不起作用了。

　　但是没效果，还是闪退。而且设置后，反而报错

>  rendering without using requestAnimationFrame for the main loop

　　搜了一下[论坛](https://forum.unity.com/threads/rendering-without-using-requestanimationframe-for-the-main-loop.373331/)  。禁用代码设置fps，就不会报这个错了。

#### 原因

　　想到当前页面有浮动蜘蛛网脚本，该脚本耗cpu。应该是抢占了。所以独立跳转出去。

　　同时修改代码。原来的是不断instantiate，这样会消耗大量cpu，换成数组来保存，然后SetActive来控制显示与消失。

　　问题解决。不会奔溃了。也不用设置fps。

修改代码：

　　一开始就生成50个，tile+gem，然后如果这个tile有概率挂有星星，就通过var gem = this.transform.Find("GemHolder");找到gem，然后SetActive。

　　注意每次开局都要把全部set false。同时要注意这个集合，要从头到尾，再从头到尾，不能跳。不然会出现断层。注意被set false的物体，是不能自己激活自己的，需要外面来激活它。

[三种查找物体的方式](https://blog.csdn.net/w1594731007/article/details/71216169)  

