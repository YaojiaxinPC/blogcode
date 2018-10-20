---
title: 搭建个人博客心得---github+Hexo
date: 2018-10-16 23:55:58
categories:
  - 编程人生
tags:
  - 个人博客  
---
	
　　本文是记录如何安装环境，发布初版个人GitPage网页。该系列有3篇：1.付费虚拟云主机+WordPress；2.免费github+Hexo；3.个人站点yaojx.net的优化之路。

<!-- more -->
　　这个比较好玩，逼格高好多，网速也快了好多。是利用GitHub的[GitPage](https://pages.github.com/)  技术，把自己通过Hexo工具编译出来的静态html文件放在帐号共享项目中，就能让别人通过“用户名.github.io”固定连接来访问你的这些html网页。后面加上DNS转址功能把那串固定连接隐藏掉，基本别人就看不出来你这个网站是主机承载还是gitpage了。

## 一.环境准备

　　首先当然是：注册[GitHub](https://github.com/)  帐号，当然，国内的[Coding](https://coding.net/) 也行，就是[Coding Pages](https://coding.net/help/doc/coding-service/coding-pages-introduction.html) 。最终我采用的方案是布到GitHub，同时备份一份到Coding，国内访问就用Coding，ping只有50，秒开。GitHub优化到最后，DNS解析始终突破不了，因为它的服务器是在国外。 

### 1.1 安装Node.js

　　[Nodejs官网](https://nodejs.org/en/)

　　[Nodejs下载](http://nodejs.cn/download/)

　　[Nodejs安装教程](https://segmentfault.com/a/1190000004947261)

![Result pic 1](/contentimg/7/1.png "Node安装检验")

``` cmd
node -v
```

### 1.2 安装Git

　　[Git下载](https://git-scm.com/download/)

　　安装完成git后，在桌面创建一个快捷方式，这时候点击启动后，里面的路径会是C盘下的。为了使用方便，我们是希望它直接cd到博客所在的目录，可以按照下面这样改：删除“--cd-to-home”、“%HOMEDRIVE%%HOMEPATH%”；添加博客目录到“起始位置”。

![Result pic 2](/contentimg/7/2.png "Git小窍门")

　　检验安装情况：

![Result pic 3](/contentimg/7/3.png "npm版本检查")

``` bash
npm -v
```

　　我当时遇到“bash: npm: command not found”。后面搜索到是没安装好，只能在cmd下使用，需要在gitbash里面再装。

　　需要输入命令“ git clone --recursive git://github.com/isaacs/npm.git”，然后再输入“cd npm”，“node cli.js install npm -gf”

``` bash
git clone --recursive git://github.com/isaacs/npm.git
cd npm
node cli.js install npm -gf
```


[windows git bash npm: command not found](https://blog.csdn.net/daocaoren92wq/article/details/64444532)

### 1.3 安装Hexo

　　先选个文件夹作为博客文件存储。这里我选“D:\source\yaojiaxinpc”。

　　打开gitbash，cd到这个目录。安装hexo：输入指令“npm install hexo-cli -g ”。

　　等它下载安装好后，输入指令“hexo init”。当然后面可以加文件夹的名字。不加就默认装在当前目录。

``` bash
//安装hexo
npm install hexo-cli -g

//查看hexo版本
hexo -v

//初始化hexo
hexo init
//会下载文件到当前目录，生成node_modules等文件夹
```

![Result pic 6](/contentimg/7/6.png "hexo安装")


![Result pic 4](/contentimg/7/4.png "npm工具保存目录")


　　后期文件夹中的“node_modules”目录，都是从这里的cmd运行编译过去的。


## 二.初次建站

### 2.1 Hexo建站

　　这里贴一下[npm主页](https://www.npmjs.com/) 。上面好东西蛮多，工具类等等。

　　说明文档：[What is npm?](https://docs.npmjs.com/getting-started/what-is-npm)

![Result pic 7](/contentimg/7/7.png "初始化完成hexo")

　　站址文件生成指令：

``` bash
hexo g  //hexo generate
```

![Result pic 8](/contentimg/7/8.png "生成Public文件夹")


　　这时候目录下会多出来一个Public文件夹。里面的东西就是我们需要的网站文件，到时发布到网上的也是这里的东西（不是整个工程，就Public目录下的文件直接上传就行，不然会报错。）

![Result pic 5](/contentimg/7/5.png "上传整个工程导致的错误")


![Result pic 10](/contentimg/7/10.png "快捷方式出权限问题")


　　***这里我也遇到“hexo Permission denied”的问题，是权限问题，但是由于是运行在windows系统，不是sudo，也不是unsafe和SSH密钥问题。最后解决的方法是：打开gitbash的源文件，cd到新目录重新上面部署的步骤，运行完，快捷方式那个就正常了***

### 2.2 本地站址访问

``` bash
hexo s  //hexo server
```

![Result pic 9](/contentimg/7/9.png "本地启动html服务")

### 2.3 目录结构说明

![Result pic 11](/contentimg/7/11.png "主目录下文件")


　　第一个“node_modules”，都是工具里面的东西，不用关注，当作编译工具看待吧，就是根据“package.json”里面记录的要安装的工具，安装到这个目录底下。

　　重点关注的是“_config.yml”文件，然后就是“themes”，主题目录，接着是“source”：放博文和图片等等其他东西的地方。

　　“public”是生成html等最终产物的地方，到时提交这个目录里面的东西上去就行，推荐用GitHub DeskTop，或者SVN提交。厉害的也可以用gitbash。

　　“scaffolds”目录，就一些模版而已。可以在gitbash里面打：

``` bash
hexo new pagename
```

![Result pic 12](/contentimg/7/12.png "指令生成页面md文件")


## 三.发布Page

### 3.1.1 GitHub准备


　　这里可以弄SSH密钥后，设置成gitbash来直接“hexo d”就上传public文件目录。也可以手动拖文件到GitHub DeskTop里上传。而拉到网页上的话，github是支持的，但是coding不支持多文件。

　　注意要先安装插件：

>  npm install hexo-deployer-git --save

　　下面记录SSH key方式，因为这种方式可以直接gitbash界面操作，可以在执行完“hexo g”后直接“hexo d -m 'comment message'”就部署上去，很方便。

　　登陆github个人主页，个人头像下拉-->Settings-->SSH and GPG keys-->New SSH key

![Result pic 13](/contentimg/7/13.png "New SSH Key")


　　然后回到电脑上，生成key文件：

``` bash
ssh-keygen -t rsa -C "git邮箱"
```

　　连续3次回车就行，就会生成key文件。在系统当前用户目录下(开启查看隐藏文件) %homepath%\.ssh

![Result pic 14](/contentimg/7/14.png "key文件")


　　将id_rsa.pub文件以文本方式打开。打开之后全部复制到key中。

　　然后就可以回gitbash测试情况：

``` bash
ssh -T git@github.com

yes
```

![Result pic 15](/contentimg/7/15.png "检查连接")


``` bash
git config --global user.name "git用户名"
git config --global user.email "git邮箱"
```

　　还没结束，还需要到“_config.yml”文件进行对应的配置：

![Result pic 16](/contentimg/7/16.png "配置提交目录和分支")


　　记住，这里使用的是SSH，所以repository也应该用SSH目录下的。

![Result pic 17](/contentimg/7/17.png "repository地址")

　　在github desktop中，这里才是用https下的地址。两个使用的是不同的协议的。

　　同时注意是主线master。


### 3.1.2 GitPage访问

　　到浏览器中输入YaojiaxinPC.github.io (用户名.github.io)。就可以看了。

这里也记录一下gitpage的一些细节吧。

![Result pic 18](/contentimg/7/18.png "创建代码库")


　　刚注册好后，点击头像左边的“+”，新建目录“New repository”。根据gitpage推荐，是“用户名”+github.io，当然也可以起其他名字，只是起其他名字的话，就变成三级域名了，前缀会自动给你加“用户名.github.io”，后面的才是“/”+你这里起的名字。

![Result pic 19](/contentimg/7/19.png "page设置选项")

　　在这个页面往下拉，到图中这里，就是设置你的page是关联哪个代码库的，所以是可以更改的。第一次弄的时候，可以到这里选Theme，然后根据步骤自动生成一个页面来试试看效果。


　　再往下的，就是删库功能项了。
　　
　　剩下的，就是一点点修改，本地看效果后，更新上来看外网效果了。


### 3.2.1 Coding准备

　　这里也讲讲国内的coding吧。

　　和github差距还是蛮大的，不过好在国内访问快。现在和TX联手了，收费项目也变多了。商业用途用它还不错，但是个人非盈利的就不好说了。不过还是多多支持国产吧。这里还是得感谢coding的，gitpage那边，整优化搞了两三天，都不理想，访问最快2s起步（还是半夜3、4点的才能达到这个效果），后面还是挂到coding这边，就能秒开了。
　　
![Result pic 20](/contentimg/7/20.png "coding开启page")


### 3.2.2 Coding Pages访问

　　coding做得比gitpage好的地方还是有的，在dns转址上，极其方便，还加了https访问。这点得给个赞。

![Result pic 21](/contentimg/7/21.png "coding设置page")


　　这里的设置和gitpage的是一样的，不过更好操作一些。而且还没项目名字限制，想起什么名字都行。


## 四.Hexo更换Themes


　　到这里，其实已经可以自己做博客放上去了。不过，作为一个非前端人员，而我又觉得初始版面不好看，怎么处理？幸好hexo早考虑到这个，给了好多皮肤让我们换。

　　[Hexo主题官网](https://github.com/hexojs/hexo/wiki/Themes)


### 更换Next主题

　　我比较喜欢头像挂左边的，加上搜索教程的时候，都是推荐[yilia](https://github.com/litten/hexo-theme-yilia) 的。所以一开始是用的这个主题。

``` bash
hexo clean //删除public目录（建议每次生成都要执行该删除指令，防止冲突）
git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
```

　　这里的操作，其实就是去github上拷贝一个皮肤下来，放到目录“themes/yilia”。所以其实你也可以手动去网页上下载zip，然后解压到themes目录下就行。

　　下载好themes后，修改主配置文件：

![Result pic 22](/contentimg/7/22.png "修改主配置文件应用新皮肤")

　　该部分另外开一个文章详细说明。

　　结尾贴一下几篇Markdown的介绍网址吧。

　　当然还有个中文前面隔开两个空格的小窍门：英文输入法下，切全角，然后两下空格。

[Cmd Markdown 编辑阅读器](https://www.zybuluo.com/mdeditor#fnref:code)

[MaHua 在线markdown编辑器](http://mahua.jser.me/)

[Markdown 基本语法](https://wizardforcel.gitbooks.io/markdown-simple-world/2.html)

[Markdown 语法整理大集合2017](https://segmentfault.com/a/1190000010223222)
