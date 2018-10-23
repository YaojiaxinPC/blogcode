---
title: Unity平台预编译指令
date: 2018-10-23 13:07:59
categories:
  - Unity
tags:
  - 指令
---

　　本文记录Unity的平台预编译指令。

<!-- more -->

[官方文档](https://docs.unity3d.com/Manual/PlatformDependentCompilation.html) 

　　在脚本中，经常看到define指令，具体到底有多少指令？下面简单转载一下官方文档。

<style>
table th:first-of-type {
    width: 200px;
}
</style>


| 定义 | 作用 | 
| ------:| :------ | 
| UNITY_EDITOR | #define指令，用于从游戏代码中调用Unity Editor脚本。 | 
| UNITY_EDITOR_WIN | Windows上编辑器代码的#define指令。 | 
| UNITY_EDITOR_OSX | Mac OS X上编辑器代码的#define指令。 | 
| UNITY_STANDALONE_OSX | #define指令，用于编译/执行专门用于Mac OS X的代码（包括Universal，PPC和Intel架构）。 | 
| UNITY_STANDALONE_WIN | #define指令，用于专门为Windows独立应用程序编译/执行代码。 | 
| UNITY_STANDALONE_LINUX | #define指令，用于专门为Linux独立应用程序编译/执行代码。 | 
| UNITY_STANDALONE | #define指令，用于编译/执行任何独立平台（Mac OS X，Windows或Linux）的代码。 | 
| UNITY_WII | #define指令，用于编译/执行Wii控制台的代码。 | 
| UNITY_IOS | #define指令，用于编译/执行iOS平台的代码。 | 
| UNITY_IPHONE | 已过时。请改用UNITY_IOS。 | 
| UNITY_ANDROID | 适用于Android平台的#define指令。 | 
| UNITY_PS4 | 	用于运行PlayStation 4代码的#define指令。 | 
| UNITY_XBOXONE | 执行Xbox One #define指令代码。 | 
| UNITY_TIZEN | Tizen平台的#define指令。 | 
| UNITY_TVOS | Apple TV平台的#define指令。 | 
| UNITY_WSA | 通用Windows平台 #define指令。此外，NETFX_CORE是在针对.NET Core编译C＃文件和使用.NET 脚本后端时定义的。 | 
| UNITY_WSA_10_0 | 通用Windows平台的#define指令。另外，在针对.NET Core编译C＃文件时定义了WINDOWS_UWP。 | 
| UNITY_WINRT | 与UNITY_WSA相同。 | 
| UNITY_WINRT_10_0 | 相当于UNITY_WSA_10_0 | 
| UNITY_WEBGL | 	WebGL #define指令。 | 
| UNITY_FACEBOOK | Facebook平台的#define指令（WebGL或Windows独立版）。 | 
| UNITY_ADS | #define指令，用于从您的游戏代码中调用Unity Ads方法。5.2及更高版本。 | 
| UNITY_ANALYTICS | 用于调用Unity Analytics的 #define指令为游戏代码方法。5.2及更高版本。 | 
| UNITY_ASSERTIONS | 断言控制进程的#define指令。 | 


　　这里插入一下MarkDown插入表格的技巧：[Markdown 表格之调整宽度技巧](https://blog.csdn.net/maxsky/article/details/54666998)

![Result pic 1](/contentimg/25/1.png "源文件")


还有给定版本号XYZ

>  Unity以下列格式公开三个全局#define指令：UNITY_X，UNITY_X_Y和UNITY_X_Y_Z

例如：Unity 5.0.1指令的示例：

| 定义 | 作用 | 
| ------:| :------ | 
| UNITY_5 | 每个5.XY版本都公开了Unity 5发行版的#define指令。 | 
| UNITY_5_0 | 主要版本Unity 5.0的#define指令，在每个5.0.Z版本中公开。 | 
| UNITY_5_0_1 | Unity 5.0.1次要版本的#define指令。| 


还能以UNITY_X_Y_OR_NEWER格式来有选择地编译代码。

| 定义 | 作用 | 
| ------:| :------ | 
| ENABLE_MONO | 为Mono编写后端#define脚本。 | 
| ENABLE_IL2CPP | 用于IL2CPP的脚本后端#define 。 | 
| ENABLE_DOTNET | 脚本编写后端#define for .NET。 | 
| NETFX_CORE | 在.NET上针对.NET Core类库构建脚本时定义。 | 
| NET_2_0 | 在Mono和IL2CPP上针对.NET 2.0 API兼容级别构建脚本时定义。 | 
| NET_2_0_SUBSET | 在Mono和IL2CPP上针对.NET 2.0 Subset API兼容级别构建脚本时定义。 | 
| NET_4_6 | 在Mono和IL2CPP上针对.NET 4.x API兼容级别构建脚本时定义。| 
| NET_STANDARD_2_0 | 在Mono和IL2CPP上针对.NET Standard 2.0 API兼容级别构建脚本时定义。 | 
| ENABLE_WINMD_SUPPORT | 在IL2CPP和.NET上启用Windows运行时支持时定义。有关详细信息，请参阅[Windows运行时支持](https://docs.unity3d.com/Manual/IL2CPP-WindowsRuntimeSupport.html)  。| 


