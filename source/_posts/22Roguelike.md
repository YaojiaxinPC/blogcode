---
title: Unity入门官方案例---2D Roguelike
date: 2018-10-21 00:07:59
categories:
  - Unity3D
tags:
  - 游戏开发
  - 2D
  - 入门级
---

　　介绍一下接触到的好的Unity官方作品：[2D Roguelike](https://assetstore.unity.com/packages/essentials/tutorial-projects/2d-roguelike-29825)   。

<!-- more -->


![Result pic 1](/contentimg/22/1.jpg "2D Roguelike")

## 游戏简介

　　该小游戏是2D类型，操作只有上下左右4个方向的移动，每动一下消耗1点能量，能量通过吃到食物补充；场景中有墙阻挡，需要撞4下墙才能销毁该障碍，同时还有怪物追击，被攻击到会大量消耗能量；但是怪物移动速度缓慢。

　　由于场景中的食物是固定的，吃了就没了，所以就设置了一个刷新点：“exit出口”，每到达一次，就能刷新一下全图场景，同时作为天数记录+1天；相应的，存活天数越多，怪物也会越多！

　　目前游戏以天数为关卡记录。

## 游戏体验

  <p><div style="width:100%; height:500px;border:none;text-align:center"><iframe allowtransparency="yes" frameborder="0" width="500" height="500" src="/unitydemo/2/index.html"/></div></p>

## 游戏制作

　　原材料真的很少，才一张图集。里面打包集合了全部墙和地板、人物的贴图。然后就是一些背景音乐了。

### 1.游戏规则细化

　　写代码前，需要先了解要做什么功能。

　　这是一个逃亡游戏，为了限制逃亡，需要加上“移动能量消耗”这个限制；竟然是逃亡，那就有怪物，先用最简单的，降低怪物移动速度（玩家移动两次，怪物才移动一次），怪物接触玩家，玩家损失能量；接下来，场景中需要有障碍物，但是这些障碍物是可以通过消耗能量来击穿，防止堵死。

　　剩下就是全游戏最重要的能量了，设置两种食物，拾取到就增加能量。能量归零，游戏结束。

　　为了简化游戏，把全部对象设置了统一单位移动。全部材料统一单位。全场景10x10单位，减掉外围的一层墙，内部是8x8单位的地板，随机布置障碍物、食物和怪物。

　　增加存活天数为关卡难度设置，天数越多，难度越大；难度以怪物数量来体现。

### 2.代码

　　这个代码架构很不错。使用抽象层，由于怪物和玩家都是一样的移动，一样的碰撞，该部分能通过泛型T抽象出来处理。而碰撞，玩家的碰撞和怪物的碰撞又是一样的逻辑，又可以抽象处理。

![Result pic 1](/contentimg/22/1.png "两个抽象层函数")

　　细节的代码逻辑这里就不提了。这里简单讲讲里面一些知识点吧。

#### RuntimeInitializeOnLoadMethod

　　该特性，实际是让函数在物体在OnLoad的时候自己执行该函数。这里有篇文章[Unity的RuntimeInitializeOnLoadMethod属性初探](https://www.cnblogs.com/meteoric_cry/p/7602122.html)  简单讲。

#### Input.GetAxisRaw

　　Raw不经过处理的，会直接返回-1，0，1。

　　Input.GetAxis则是-1~+1的范围缓慢变化。两者有区别。由于我们限制了单位移动，所以用raw的才适合。

#### float.Epsilon

![Result pic 1](/contentimg/22/2.png "移动动画")


　　这里使用StartCoroutine来处理，防止while卡死线程。注意StartCoroutine和多线程不是同样的概念。但是可以简单理解成另外开一个线程去处理这个一帧一帧移动的动画。判断是否移动到目的的时候，不是用==，而是用float.Epsilon，避免了一些数据溢出的bug。注意,实际上会出现 double 1.0!= 1.0，所以只能会一个很小的范围来判断是否 double 1.0 ≈ 1.0。

#### Physics2D.Linecast

![Result pic 1](/contentimg/22/3.png "射线检测碰撞")


　　游戏中使用的是碰撞器，所以移动前可以事先检查目的单位是否存在碰撞器。但是需要注意，物体自身的碰撞器会先被射线检测到，所以需要提前屏蔽自身的碰撞器，检测后才启用。

#### 输入检测

![Result pic 1](/contentimg/22/4.png "输入检测判断")


　　这里我修改了原来的代码。原来是通过平台处理，移动端使用滑动手势。我觉得不好用，还是统一成单点判断处理。通过判断点击的部位在人物的相对位置来处理。

#### 鼠标点击转化为相对坐标

>  touchEnd = Camera.main.ScreenToWorldPoint(Input.mousePosition);

　　这里，其实整个游戏的坐标，是通过相机上的单位来换算统一成单位坐标的。所以可以直接使用相机的相对坐标来处理。

#### 代码小缺陷处理

　　我发现，当你剩下最后1能量，刚好移动到Exit就为0时，是能加载到下一关，然后就全部不动了。因为这里缺少了判断。

　　由于我使用了游戏结束后重新开始，我改的是下面这里。

![Result pic 1](/contentimg/22/5.png "场景重载时检查playerFoodPoints")



### 3.开始制作游戏

　　这里比较简单，把图集拆开，制作预制体。两个步骤而已。

#### 拆图集

　　拆图集，这里需要了解一个概念：Pixels Per Unit

![Result pic 1](/contentimg/22/6.png "Pixels Per Unit")


　　这里我为什么设置成32？

　　首先，我们看原文件大小：

![Result pic 1](/contentimg/22/7.png "256 x 224")


　　是指位深度？不是这样算。我们数一下图集里面的单元，共7 x 8 。

　　对应：256==》8 & 224 ==》 7

　　刚好整除，得到32像素就是一个图片的单位，也刚好图片都是正方形大小。所以这里的Pixels Per Unit，就是指多少像素一个Unit。

　　这里也有个文章介绍这个 [Unity UGUI 原理篇(二)：Canvas Scaler 縮放核心](http://gad.qq.com/article/detail/21059) 

　　其他优化部分就不记录。因为有另外分开文章记录发布优化。

#### 制作预制体

　　该部分简单，就是拖拖图片而已。注意里面碰撞器是和图片岔开的，偏移一半。

![Result pic 1](/contentimg/22/8.png "碰撞器岔开原单位")


　　为什么要岔开，因为初始状态下，射线检测的出发点，是在左上角。这样一开始就碰到左边的物体了。所以需要岔开。增加一半单位的距离。

#### 整合Scene

![Result pic 1](/contentimg/22/9.png "摄像头的Size")


　　这里有疑问的，就是这个Size的值，应该设多少？

　　这个Size的意义，是显示界面高度的一半，共多少个单位。这里5，得到显示界面的高度是10个单位，正好对应游戏中10x10的比例。

　　为什么不是宽度？这个就得去问官方了。本问不纠结这个问题。

　　为什么开头演示那里是正方形的大小，但是默认工程是长方形的？

　　这个是发布时的设置。

![Result pic 1](/contentimg/22/10.png "发布显示大小")



　　当然，该游戏实际上不用碰撞器也行，因为单位长度都是1，实际可以用数组集合来记录处理。有点像扫雷游戏那样。具体后面分享到扫雷游戏再提这种写法。



























