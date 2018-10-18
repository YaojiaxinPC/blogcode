---
title: Markdown内嵌前端代码实例--时钟挂件
date: 2018-10-18 23:58:58
categories:
  - 前端
tags:
  - js
  - 时钟挂件
  - Markdown内嵌前端代码  
---
	
　　本文分享一个时钟挂件实例。该部分代码是网上搜索复制来的，非本人版权，请勿用于商业用途。

<!-- more -->

  <p><div style="width:100%; height:350px;border:none;text-align:center"><iframe allowtransparency="yes" frameborder="0" width="300" height="300" src="/contentimg/11/click.html"/></div></p>


  
　　这里利用iframe引用外部html，同时设置

> allowtransparency="yes" frameborder="0"

　　让iframe的背景透明，边框消失。

> div style="width:100%; height:350px;border:none;text-align:center"

　　但是此时的iframe是靠左上的。我想居中，就需要利用div来实现。