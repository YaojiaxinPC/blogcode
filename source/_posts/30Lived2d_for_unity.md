---
title: Live2D插件介绍
date: 2018-10-26 10:07:59
categories:
  - 第三方插件
tags:
  - unity
  - Live2D
---

　　本文介绍如何在Unity中使用二次元风格的[Live2D](http://www.live2d.com/)  。   

<!-- more -->

![Result pic 1](/contentimg/30/1.gif "效果展示")

![Result pic 1](/contentimg/30/1.png "实际三维情况")


　　在一些博客上会遇到网页宠物挂饰，大部分是比较老旧的flash效果，但是现在有个蛮不错的新技术也实现了这个效果，这就是Live2D插件。

　　当然它不仅仅只用在博客上当挂饰，现在那些游戏登陆界面、或者手机app打开缓冲界面，经常会有能动的人物视觉，好多其实都是用该插件实现的！

　　这里放一下两个下载链接：

1. [2.1SDK下载指导文档](http://www.live2d.com/usermanual/cubism2_cn/lets-do-it/my-first-lapp/02.html) 
  
1. [3.0unitypackage包下载指导文档](http://docs.live2d.com/cubism-sdk-tutorials/getting-started/) 

　　请先根据上面链接的教程，对应去下载SDK包。当然也可以去github下载最新包。在GitHubPage中，也刚好有人开源做这个插件的挂饰效果，已经集成在hexo中了。在我置顶博文中，底部的几个链接都有提到这个使用教程。本文只简单根据Unity中使用的情况来介绍该插件。

　　教程网页很人性化，是有中文和英文版本的，图文并茂，虽然部分链接点开需要VPN。这里就不讲复杂的怎么做模型，怎么应用等等。只在下载的两个包的基础上进行简单分析。

![Result pic 1](/contentimg/30/2.png "下载的两个包")


　　如果不会VPN，unitypackage包不要也行，它只是多了部分功能的集成而已（[json转AnimationClip功能](http://docs.live2d.com/cubism-sdk-tutorials/animation/)  等等其他好多功能的集成）。简单的接触，从官网主页下载的2.1sdk包就能正常运行了。

　　在sample里面是几个使用例子。每个都能独立正常运行的。

### 新建工程

![Result pic 1](/contentimg/30/3.png "引用拆解")


　　可以新建工程，复制这些需要的东西来处理。这里也提一下老版本，如果识别不了dll，需要拖出来外面，然后使用面板上的Import new asset重新导入。

　　代码部分就不讲解了，这里简单提一下它的流程吧。

### 运用

![Result pic 1](/contentimg/30/4.png "Create Live2D Canvas")


　　这里是建了一个透明的背景材质，然后通过脚本来Load模型，并贴上去。Load函数在示例程序里面也有了，LAppModelProxy类。就是传model.json的地址给它，然后它找到这个文件后，解析，根据文件里面的记录，去找对应的其他信息：找模型、表情动作参数、声音等等。

![Result pic 1](/contentimg/30/5.png "总信息记录")


　　示例程序这里的动画效果比较少，实际上，在unitypackage包里面就可以看到，是和骨骼动画一样，每一个关节都可以运动的！

　　这里是记录播放该动画时，运行的时间fade，以及变动的键值。

![Result pic 1](/contentimg/30/6.png "动画信息内容")


　　expressins文件夹的4个动画效果，只是其中抽出来的示例动画，实际上只要我们想到，都可以编出来，然后加进去。2.1版本的还是读json，但是官方提倡使用动画机，在3.0就建议直接使用动画机来完成动画的编制了。原理都是找到对应的key，传递新value。就是多了一层解析封装，让动画机能直接调用并修改key的value。

　　这里可以自己封装，在motions里面可以提取key，然后包装，调用L2DMotionManager的startMotionPrio函数。相当于3.0的OnRenderObject自动调用TaskableModel.TryWriteParametersAndParts(Parameters, Parts);


![Result pic 1](/contentimg/30/17.png "2.1修改value函数")

![Result pic 1](/contentimg/30/16.png "3.0修改value函数")

![Result pic 1](/contentimg/30/2.gif "键值修改效果")


　　效果完全和IK动画里面的绑定骨骼是一样的。这里编制动画，就和普通的编UI动画一样。

![Result pic 1](/contentimg/30/3.gif "键值修改效果")


### 发布

　　这个插件在美术方面的玩法比较高级（编制各种动画效果），在程序方面需要写的代码基本没有，因为都封装好了。

　　如果想发布出来，是需要对贴图材质压缩一下的，能从原来的77+M，压缩到后面20+M的。操作不多，就是对贴图使用压缩、设置static等。能节省大半的资源，提倡使用的时候必须进行优化压缩。


　　实例程序中使用了鼠标跟踪、单击、重力传感器，来调用不同的动作（expressions文件夹中的4个，实际只有3个有有效动作）。可以自己修改，使用其他方式来调用。亦或直接找到全部键值，直接做动画。

　　[体验demo](/unitydemo/3/index.html) ，请用Chrome或者手机浏览器打开。

### 改进

　　实际使用当然不是这么简单。这里举例，Lol英雄人物界面，是“底部的背景图”+中间能动的人物+“置顶的技能、血条等数值”。是三层结构的。

　　现在这个demo，直接拖图片进去，是不行的，那个会动的人物永远是置顶的。所以需要结合其他技术来处理。使用Layer吗？尝试了一下，没生效，相机不渲染该layer，人物还是在。找到dll里面设置layer的，直接提示无效，下载老版本的，提示该函数已过期。怎么办？

![Result pic 1](/contentimg/30/7.png "设置Layer")


　　只能去翻说明文档了，幸好找到了。

![Result pic 1](/contentimg/30/8.png "SDK更新日志")


　　回头翻了一下实例工程！原来早就存在了这个功能的示例了。前面太心急，没仔细看示例工程才没发现。

![Result pic 1](/contentimg/30/13.png "通过RenderTexture渲染")


　　新建摄像机，把liv2d拉成为它的子项，然后拖出去main摄像头视野外面。接下来就是弄RenderTexture了。

　　右键新建RenderTexture，按如下设置：其实可以弄成512x512的，再小下去就失真了（为什么是512？因为原图是1024x1024，512损失还没那么明显，256就大了）。

![Result pic 1](/contentimg/30/9.png "新建RenderTexture")

![Result pic 1](/contentimg/30/10.png "新建材质")


　　然后把RenderTexture拖给刚才建的摄像头。这里我选择取消全部layer渲染，culling mask设置为nothing，确保不会有其他东西进来这个摄像头的视觉。

![Result pic 1](/contentimg/30/11.png "赋值摄像头")


　　新建panel，赋值刚才的材质。

![Result pic 1](/contentimg/30/12.png "赋值材质")


　　运行，看到人物终于夹在中间了！

　　但是这时候发现人物的眼睛跟踪鼠标，一直是看往左边的，因为实际的live2d在右边远处。这里就得去修改代码了。

　　这里的问题，就是坐标对应的是真实的Live2d。需要修改参照物为假的panel，或者直接把鼠标位置移过去。我选择了把鼠标点击计算值偏移过去的方案。

![Result pic 1](/contentimg/30/14.png "修改参照物摄像头")

![Result pic 1](/contentimg/30/15.png "偏移鼠标点击位置的值")

![Result pic 1](/contentimg/30/4.gif "修改后效果")















