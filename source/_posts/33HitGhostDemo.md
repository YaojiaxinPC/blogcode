---
title: 打地鼠类小游戏介绍
date: 2018-11-05 15:02:59
categories:
  - Unity3D
tags:
  - 游戏开发
  - 3D
  - 入门级
  - 小游戏
---

　　本文介绍网络教学视频的一款小游戏[打怪物](http://www.sikiedu.com/my/course/129)  。   

<!-- more -->

![Result pic 1](/contentimg/33/1.png "Hit Ghost")


## 游戏简介

　　该小游戏是3D类型，类似打地鼠。在3x3的笼子中会随机出现怪物，玩家通过枪，对这些怪物进行打击。

## 游戏体验

　　[体验demo](/unitydemo/5/index.html) ，请用Chrome或者手机浏览器打开。

## 游戏制作

　　该游戏需要导入几个怪物模型、枪模型，还有几个怪物贴图材质。

### 1.游戏规则细化

　　写代码前，需要先了解这个游戏怎么玩：

　　类似打地鼠，在3x3的笼子随机出现怪物，每只怪物受到一点打击就会死亡，然后得1分。共4种怪物，每种怪物有4种颜色变形。在随机生成怪物的同时，给怪物赋值不同的外形颜色，让玩家产生这个怪物不是同一只的错觉。

所以规划如下：

1. 3x3的布局，共9个格子会出现怪物。 
1. 共4种怪物，每种怪物都有不同的颜色外形，目前暂时都是4个颜色。
1. 枪固定在一个位置，通过左右和上下转动，来指向怪物。
1. 枪不能无间隔攻击，每次射击后，需要有装弹时间。
1. 定义类来记录怪物信息等参数。


### 2.代码


　　网络教程班的代码不是很好，后面我重写了。应该要考虑设计模式思想来做才行。

#### 怪物管理

　　怪物在这里，实际并不需要考虑外形，都是同一个“被打击一次就死亡”的个体设定，应该抽象成一层。由于这里实际只是换皮，所以连抽象都不用了。直接一个组件来处理。

![Result pic 1](/contentimg/33/2.png "怪物组件")

![Result pic 1](/contentimg/33/3.png "怪物综合管理")


##### 换皮

![Result pic 1](/contentimg/33/4.png "换皮代码")


　　换皮代码不复杂，通过查看模型，了解是更换材质而已。

##### 随机生成

　　由于怪物的死亡动画无法插入执行函数，所以只能在代码写携程，间隔0.8s后设置active为false。利用setactive这个特性，避免频繁生成和销毁。

![Result pic 1](/contentimg/33/5.png "设置集合")


　　各变量意义如下：

1. 由于不同怪物类型id不同，使用字典来保存该对象池。
1. 利用坐标集合positions，提取3x3的9个空间位置，这里也为了动态获取，当变成4x4、5x5时，代码不用改。
1. enemyhold，归属怪物父类，方便查看而已。
1. nowexits，用于记录保存怪物数据，记录当前场景中激活的怪物类型、位置、颜色等信息。
1. enemys，怪物类型集合，怪物都在EnemyControl类中进行了异化处理，在管理类中就不用区别，直接进行集合统一处理。

![Result pic 1](/contentimg/33/6.png "概率生成")

![Result pic 1](/contentimg/33/7.png "处理生成函数")


　　循环每个位置，通过概率，判断是否生成。这里也可以使用其他方案：通过概率确定哪些位置生成。两种方案都可以。

　　怪物生成函数比较讲究，避免冗余函数，结合设计模式思想抽离。切成3部分：

1. 先清空全部怪物，即把全部都setactive为false。
1. 处理怪物位置、怪物类型的函数。
1. 生成怪物的实际函数。


　　由于每个怪物模型的坐标位置影响，这里加入了纠偏坐标vector。每次激活怪物前，检查缓存中是否有同类型的尚未激活的，有就拿出来激活使用，没有才Instantiate生成。


#### 枪控制

　　旋转合理应该使用四元数，不过这里，由于只有2个轴的限制性旋转，普通的欧拉旋转就够了。使用四元数是为了防止3轴情况下的万向锁。

##### 装弹时间

　　直接+=Time.deltaTime，然后计时即可。能进if语句的，再判断是否执行发射，在成功进入发射语句中才将shootTimer置零。

``` java
    shootTimer += Time.deltaTime;
    if (shootTimer >= shootTime)
```

##### 旋转 

　　指绕某个轴进行旋转。这里是水平左右和垂直上下，左右即对应绕Y轴旋转；上下即对应绕X轴旋转。

　　结合具体场景，现在是有鼠标的2D坐标，刚好对应2个值。

共有3种方法。

方法①: 按顺序绕轴旋转 （是个速度响应，用EasyTouch的时候才适合）

``` java
    //保存主相机正前方
    Vector3 mcamera_fwd;
    //相机前和右的叉积，得到垂直这两个轴的向上的Y
    Vector3 mcamera_y;
    //相机前和上的叉积，得到垂直这两个轴的向右的X
    Vector3 mcamera_x;
    mcamera_fwd = Camera.main.transform.forward;
    ////归一化，然后再求叉积
    //mcamera_fwd.Normalize();
    //相机前和右的叉积，得到垂直这两个轴的向上的Y
    mcamera_y = Vector3.Cross(mcamera_fwd, Vector3.right);
    //相机前和上的叉积，得到垂直这两个轴的向右的X
    mcamera_x = Vector3.Cross(mcamera_fwd, Vector3.up);
    //旋转速度
    transform.Rotate(mcamera_y, Input.GetAxis("Mouse X"), Space.World);
    transform.Rotate(mcamera_x, Input.GetAxis("Mouse Y"), Space.World);
```

方法②：使用LookAt，注意Z轴坐标，是取相对主相机的点来转世界坐标。由于笼子位于z=0处，这里主相机和z=0的距离应该取反

``` java
    Vector3 mousePos = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, -Camera.main.transform.position.z));
    transform.LookAt(new Vector3(mousePos.x, mousePos.y, 0));
```


方法③: 属性面板rotation赋值

``` java
    //通过旋转模型，得到范围： 竖直: ⬆-35 ~ ⬇+10 ， 水平: ⬅-30 ~ ➡+30
    //根据鼠标在屏幕上的位置，按比例分配
    //-30~+30
    float xPosPrecent = (Input.mousePosition.x / Screen.width) * 60 - 30;
    if (xPosPrecent > 30f) xPosPrecent = 30f;
    else if (xPosPrecent < -30f) xPosPrecent = -30f;

    //-35~+10 (鼠标坐标，以屏幕左上为原点0，但是计算中是以左下为0，所以要取反)
    float yPosPrecent = (1- Input.mousePosition.y / Screen.height) * 45 - 35;
    if (yPosPrecent > 10f) yPosPrecent = 10f;
    else if (yPosPrecent < -35f) yPosPrecent = -35f;
	
    transform.transform.rotation = Quaternion.Euler(new Vector3(yPosPrecent, xPosPrecent, 0));
```

#### 暂停

>　　Time.timeScale = ispause ? 0 : 1;

　　游戏暂停，关注的是物理动效的暂停，菜单栏等等其他那些应该是正常播放的。所以这里就使用Time.timeScale=0。该属性设置后，打出去的子弹position会停止位移，恢复1后能继续之前的速度移动。

　　该属性影响了FixedUpdate，还有携程。但是不影响Update函数。

　　所以控制怪物和枪的函数应该放在FixedUpdate。相反的，音效等等其他可以在游戏暂停住的时候正常运行的，才可以放在Update，这里也是开关背景音乐选择框能在游戏暂停的时候正常播放背景音乐的原因。

　　注意这时候:

> Time.deltaTime==0 => true

　　所以得使用下面这个计时：

> Time.unscaledDeltaTime

#### 保存数据

　　这里很简单，考虑全需要什么数据，定义成一个类，然后利用json转成字符串，保存起来。下次读取这个字符串来还原场景就行。

　　这里暂只保存到缓存，利用PlayerPrefs来保存。其他保存到服务器端去存入数据库，或者本地文件等等方式都是类似的。就多一个工具类而已。

　　难度在json的dll，牛顿json在webgl下会异常，所以只能手动拼内容，使用simplejson。

![Result pic 1](/contentimg/33/12.png "拼json")



### 压缩优化发布

　　贴图压缩，降低分辨率，打图集，设置音频格式等等常规操作。

#### 模型简单优化

　　这里还有对模型的优化。导入的模型，实际上还带了很多没用上的属性，是可以取消掉的。例如一些没使用的动画效果。

![Result pic 1](/contentimg/33/8.png "门板模型")


　　优化选项：

1. 模型在运行的时候是不会去修改的，所以Read/Write Enabled肯定不用选。
1. mesh compression，按照实际需求，压缩的话得消耗cpu来解压，实际压缩不了多少。建议不压缩。
1. UVs，按照需要进行斟酌。
1. Normals，可以不导入。但是是在不需要场景光照映射情况下。有光照的时候普遍选导入。
1. Tangents，得根据提示来设置，我导的模型提示没有，所以就设为None了。


![Result pic 1](/contentimg/33/9.png "提示信息")


#### Lightmapping

　　在不要求实时灯光的游戏中，可以使用预烘焙。

　　设置light的mode为Baked，然后到lighting面板设置。

![Result pic 1](/contentimg/33/10.png "Lightmapping设置")


　　根据实际情况设置质量。

　　经过代码优化+设置优化，两者差距很大。下图是网络教程中的工程运行时的drawcall，与优化后的工程的比较。

![Result pic 1](/contentimg/33/11.png "性能比较")


　　其中压缩贴图效果最明显，然后就是Lightmapping。代码主要优化的是cpu，以及节省少部分的内存，当然也促进优化了drawcall。

　　优化的重点：drawcall。降低贴图分辨率能极大优化该属性，然后加上代码方面的优化，又能降低。所以总体下来降了将近90%。


工程项目源码： 

[HitGhost](https://github.com/YaojiaxinPC/hexoblog/tree/master/UnityDemo/HitGHOST) 

　　代码还有优化空间，应该抽一个局管理类出来。同时UImanager和gamemanager交叉比较多，可以进行拆分。当然还可以加入EasyTouch、计时、投币等等延伸。

