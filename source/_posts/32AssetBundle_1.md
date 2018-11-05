---
title: AssetBundle打包记录-简单使用
date: 2018-11-05 08:04:59
categories:
  - Unity3D
tags:
  - 游戏开发
  - 游戏优化
  - 入门级
  - 工具使用
---

　　该题目将分几个部分来详细解读。本篇为初级接触篇，简单记录如何ab打包，以及如何获取ab包。

<!-- more -->

　　ab打包，几乎能把全部东西都打包。打包后，可以通过脚本到服务器获取，实现了程序分离动态获取功能。

　　官网[AssetBundles](https://docs.unity3d.com/Manual/AssetBundlesIntro.html)  翻译：


>　　AssetBundle是可以在运行时加载的包含特定于平台的档案文件的资产（模型，纹理，预制，音频剪辑，甚至整个场景）。AssetBundles可以表达彼此之间的依赖关系; 例如，AssetBundle A中的材料可以引用AssetBundle B中的纹理。为了通过网络进行有效交付，可以根据用例要求（LZMA和LZ4）使用内置算法选择压缩AssetBundle。
>　　AssetBundles可用于可下载内容（DLC），减少初始安装大小，加载针对最终用户平台优化的资产，以及减少运行时内存压力。

　　这里有篇[博文](https://www.cnblogs.com/lancidie/p/5878789.html)  还不错。博文中讲得比较详细，下面我就不重复了，就按照使用过程简单记录。

　　目前开发环境是unity2018.2+Hexo（做web服务端）。如果没有弄hexo，可以搞其他web服务端，简单的window自带的IIS，或者安装wordpress，这个window也有，不过得安装部署。

## ab包意义

　　当程序使用ab包技术后，就能动态去服务器获取组件，这样保证了每次使用都是最新的，而且不用强制更新本地软件。这对用户来说很方便，避免了频繁的软件更新提示。当然，实质是后台自动动态更新。

　　第二重要的是，利用动态获取这个特性，可以在程序中根据硬件设备的情况，请求高质量的材质，或者是低质量的材质！也就是说，同一个程序，在低配置的环境下就跑低配版，在高配置环境下就跑高配！

　　现在ab包主要用于更新，添加节日活动等等小更新，以及热更新等等。具体使用情况得根据需求来安排。

## AssetBundles-Browser

　　ab打包，搜索上有很多的教程，很多教写代码的。不过本文不教写这个代码，因为Unity官方已经提供了[AssetBundles-Browser](https://github.com/Unity-Technologies/AssetBundles-Browser)  工具，就没必要自己花多余的时间来处理，而且写出来的东西还没人家的好用。

　　abBrowser工具，使用很方便。从github下载后，把Edit文件夹拖动工程目录下。

![Result pic 1](/contentimg/32/1.png "工具启动位置")


　　该工具有三个界面：

1. 可以查看当前目录全部标志打包的材料，及其分类标志
1. 打包编译设置
1. 导入ab包，查看该包详情

　　具体界面如下：

![Result pic 1](/contentimg/32/2.png "Configure")

![Result pic 1](/contentimg/32/3.png "Build")

![Result pic 1](/contentimg/32/4.png "Inspect")


## 打包标志

![Result pic 1](/contentimg/32/5.png "打包标志")


　　打包操作很方便，只需选中材料后，在Inspector面板底部，在上图位置处进行设置分类即可。

　　难的地方是分类。素材间有依赖关系，不好的分类方式，会造成重复打包，冗余打包。该题目等后面分博文详细介绍，本文暂时不提。

　　在上图中，“AssetBundle”之后，第一个是打包分类目录，第二个是后缀。注意这里没有删除选择，如果分类打错字了，只能重新建分类，然后“Remove Unused Names”。

## 包详情

![Result pic 1](/contentimg/32/6.png "编译出来的包")　


　　可以看到，目录下，同名字下会有个后缀为“.manifest”的文本文件，打开后看到是记录依赖关系、版本和hash信息等。

![Result pic 1](/contentimg/32/7.png "manifest文件")　


　　目前我发现：只有主manifest文件是可以通过代码获取的，其他后缀为manifest的文件，只是让我们手动打开看而已，还没找到能获取打开这些文件的api。

## 代码获取ab包

　　目前我使用2018，api是

> UnityEngine.Networking.UnityWebRequestAssetBundle.GetAssetBundle(uri)

　　步骤是设置该url指向某个具体的文件，然后用该api下载，再

> AssetBundle bundle = UnityEngine.Networking.DownloadHandlerAssetBundle.GetContent(request)

　　然后就能通过budle获取需要的gameobject了。

``` java
    IEnumerator Start()
    {
        string uri = "http://localhost:4000/unitydemo/5/WebGL/" + "clip";

        UnityEngine.Networking.UnityWebRequest request = UnityEngine.Networking.UnityWebRequestAssetBundle.GetAssetBundle(uri);
        yield return request.SendWebRequest();
        AssetBundle bundle = UnityEngine.Networking.DownloadHandlerAssetBundle.GetContent(request);
    
        fire_audioclip = bundle.LoadAsset<AudioClip>("fire.mp3");
        fire_audioclip.LoadAudioData();

        while (fire_audioclip.loadState == AudioDataLoadState.Loading)
        {
            yield return null;
        }

        bundle.Unload(false);        
        request.Dispose();
    }
```

　　注意该过程涉及网络，需要携程处理，不然会阻塞线程。或者是写成异步asyn。

　　上面的步骤是获取没有依赖关系的，实际使用中，很多都是有依赖关系的，所以得获取到manifest文件，了解到依赖关系，然后对应下载材料，再生成，才不会材质丢失。

　　这里目前我只找到获取主manifest。

``` java
    string urlpath = "http://localhost:4000/unitydemo/5/WebGL/";
    string uri = urlpath + "StandaloneWindows";
    string aimitem = "prefabs";
    UnityEngine.Networking.UnityWebRequest request = UnityEngine.Networking.UnityWebRequestAssetBundle.GetAssetBundle(uri);
    yield return request.SendWebRequest();
    AssetBundle bundle = UnityEngine.Networking.DownloadHandlerAssetBundle.GetContent(request);

    AssetBundleManifest assetBundleManifest = bundle.LoadAsset<AssetBundleManifest>("AssetBundleManifest");
    foreach (var item in assetBundleManifest.GetAllAssetBundles())
    {
        if (item.Equals(aimitem))
        {
            foreach (var iitem in assetBundleManifest.GetAllDependencies(item))
            {
                UnityEngine.Networking.UnityWebRequest irequest = UnityEngine.Networking.UnityWebRequestAssetBundle.GetAssetBundle(urlpath + iitem);
                yield return irequest.SendWebRequest();
                AssetBundle ibundle = UnityEngine.Networking.DownloadHandlerAssetBundle.GetContent(irequest);
                ibundle.LoadAllAssets();
                irequest.Dispose();
            }
        }
    }

    UnityEngine.Networking.UnityWebRequest prequest = UnityEngine.Networking.UnityWebRequestAssetBundle.GetAssetBundle(urlpath + aimitem);
    yield return prequest.SendWebRequest();
    AssetBundle pbundle = UnityEngine.Networking.DownloadHandlerAssetBundle.GetContent(prequest);
```

　　首先获取主manifest，然后通过bundle.LoadAsset<AssetBundleManifest>("AssetBundleManifest")获取具体信息。注意这里“AssetBundleManifest”是固定的。

![Result pic 1](/contentimg/32/8.png "主manifest文件")　


　　这个主manifest文件名不固定，但是获取到文件后实例化时使用的"AssetBundleManifest"是固定的。然后读取全部信息，最好存起来到字典里面。然后获取每个子包的依赖关系

> assetBundleManifest.GetAllDependencies(item)

　　注意前面get ab包，只是get到一个文本文件，现在获取这些依赖关系等等信息，也只是string字符串信息，真要使用，是得去下载才能获取使用的。

## 注意事项

### 包成功下载，但是提示格式不支持

> Error: Cannot create FMOD::Sound instance for resource archive:/CAB-4d655a7adf68a182da7b13b4a9413d95/CAB-4d655a7adf68a182da7b13b4a9413d95.resource, (Unsupported file or audio format. )

　　我工程设置为webgl，然后想在电脑上本机调试，用vs附加打断点，结果一直报“找不到资源”/“格式不支持”。打断点进去，包是下载下来了的，大小等等信息也对。后面才意识到，是打包时选择的目标环境影响导致！我用本地调试，就应该归属在window下，而不是看工程设置。修改打包为window平台后，就成功加载文件了。

### webgl慎用ab包

　　本地模式下，能把内存极大压缩（像设置音频为stream模式），但是使用ab包方式，虽然让初次下载包变小了，但是load时候极耗内存，而且加载成功进入后，也是在内存上，导致内存反而变大了。

　　这里我尝试把音频文件打包出去，结果2.9m的文件，打包出来是5m？load下来到内存直接32m？原先stream模式才200k全部。

　　也应该是我技术不到位，操作不当导致。





