---
title: 简单算法---求素数
date: 2018-10-24 10:07:59
categories:
  - 算法
tags:
  - C#
---

　　本文以“判断101-200之间有多少个素数”介绍求素数的7种解法：

1. 遍历每个值进行相除。
1. 取开方根，只遍历2~开方根。
1. 间隔6个数只取2个值计算，结合开方根。
1. 从头开始，保存每个素数，遍历时只需要判断是否能让集合中的素数整除。
1. 保存素数，结合开方根优化。
1. 简单线性筛法。
1. 优化版线性筛法。


<!-- more -->

　　该题较简单，但是没想到仔细想的时候发现解法这么多。

　　首先需要了解什么是素数：只能被1和本身整除的整数，就是素数。

## 最基础解法：遍历每个值相除

　　这是刚接触到题目时，每个人第一个想到的解法：用2~(该数-1)来除，如果都不能整除，这个数就是素数。

``` java
    /// <summary>
    /// 简单处理，一个一个数字去除
    /// </summary>
    /// <param name="beginnum"></param>
    /// <param name="endnum"></param>
    /// <returns></returns>
    private int SimpleGetNum(int beginnum, int endnum)
    {
        int i, j;
        int counts = 0;
        for (i = beginnum; i <= endnum; i++)
        {
            for (j = 2; j < i; j++)
            {
                //判断是否能整除
                if (i % j == 0)
                    break;
            }

            //判断前面的循环是否会提前break，提前break时，j < k ；有break说明能获得整除
            if (j >= i && i != 0 && i != 1)
            {
                counts++;
            }
        }
        return counts;
    }
```

　　但是，这里存在大量多余的判断。

## 遍历2~开方根

　　思想：一个数=前面某个数 X n ，推断出来，肯定存在“某个数” < n，或者 n< “某个数”。这样最极端的情况，就是n=这个“某个数”，得到数 = n<sup>2</sup>；所以我们只需要除前面这n个数，后面的操作都是重复的，就可以不除了。

``` java
    /// <summary>
    /// 结合算法思想处理，最多人使用的方式
    /// </summary>
    /// <param name="beginnum"></param>
    /// <param name="endnum"></param>
    /// <returns></returns>
    private int NormalGetNum(int beginnum, int endnum)
    {
        int i, j, k;
        int counts = 0;
        for (i = beginnum; i <= endnum; i++)
        {
            k = (int)Math.Sqrt(i);
            for (j = 2; j <= k; j++)
            {
                //判断是否能整除
                if (i % j == 0)
                    break;
            }
            //判断前面的循环是否会提前break，提前break时，j < k ；有break说明能获得整除
            if (j >= k && i != 0 && i != 1)
            {
                counts++;
            }
        }
        return counts;
    }
```

## 间隔6个数只取2个值计算  

　　该解法是看到这个博客[判断质数/素数——我知道的最快的方法](https://blog.csdn.net/songyunli1111/article/details/78690447)  才想到的。通过观察，2、3包揽了几乎绝大部分的合数。

　　所有数可以大致以如下方式表示：


| ... | 6x, | 6x+1, |6x+2, |6x+3, |6x+4, |6x+5, |6x+6|==> |
|------|------| ------|------| ------|------| ------|------| ------|
| ==> | 6(x+1), | 6(x+1)+1, |6(x+1)+2, |6(x+1)+3, |6(x+1)+4, |6(x+1)+5, |6(x+1)+6|... |


　　其中6x, 6x+2, 6x+3, 6x+4都是合数，剩下 6x+1, 6x+5才存在素数的可能性。故实际，每6个数，只需要检查两个数！

``` Java
    /// <summary>
    /// 令x≥1，将大于等于5的自然数表示如下：
    /// ··· 6x，6x+1，6x+2，6x+3，6x+4，6x+5，6(x+1），6(x+1)+1 ···
    /// 故只需要判断6x+1和6x+5两个数，再间隔6个数再次判断
    /// </summary>
    /// <param name="beginnum"></param>
    /// <param name="endnum"></param>
    /// <returns></returns>
    private int SuperNormalGetNum(int beginnum, int endnum)
    {
        int i, j, k;
        int counts = 0;
        bool isnofrime = false;
        for (i = beginnum; i <= endnum; i++)
        {
            if (i % 6 != 1 && i % 6 != 5)
                continue;
            isnofrime = false;
            k = (int)Math.Sqrt(i);
            for (j = 5; j <= k; j += 6)
            {
                //判断是否能整除
                if (i % j == 0 || i % (j + 2) == 0)
                {
                    isnofrime = true;
                    break;
                }
            }
            if (!isnofrime)
            {
                counts++;
            }
        }
        return counts;
    }
```

## 用前面存在的素数来遍历判断

　　合数能被素数整除，但是素数不能被其他素数整除。所以只需要保存前面获取的素数，后面的数直接除前面这些素数，不能整除，就也是素数！

``` java
    /// <summary>
    /// 从2开始，获取素数，保存起来，给后面的数判断素数，一直判断到最大值。
    /// </summary>
    /// <param name="beginnum"></param>
    /// <param name="endnum"></param>
    /// <returns></returns>
    private int ListGetNum(int beginnum, int endnum)
    {
        int i, j, counts;
        List<int> primelts = new List<int>();
        //加入第一个素数2
        primelts.Add(2);
        for (i = 3; i <= endnum; i++)
        {
            for (j = 0; j < primelts.Count; j++)
            {
                //能整除，不是素数
                if (i % primelts[j] == 0)
                {
                    break;
                }
                else if (j == primelts.Count - 1)
                {
                    primelts.Add(i);
                    break;
                }
            }
        }
        counts = 0;
        for (i = 0; i < primelts.Count; i++)
        {
            if (primelts[i] >= beginnum)
            {
                counts++;
            }
        }
        return counts;
    }
```

## 结合开方根用前面存在的素数来遍历判断

　　上面的方法同样存在重复判断，实际上当除以的素数大于开方根的时候，后面的素数就更加不可能了，该数直接可以断定是素数了。he = su1 x su2，当su1< sqrt(he)时，su2 > sqrt(he);当su1>sqrt(he)时，su< sqrt(he)，这里就重复了。所以当前面一段找不到结果，后面的肯定也找不到。

``` java
    /// <summary>
    /// 从2开始，获取素数，保存起来，给后面的数判断素数，一直判断到最大值。
    /// </summary>
    /// <param name="beginnum"></param>
    /// <param name="endnum"></param>
    /// <returns></returns>
    private int ListGetNum(int beginnum, int endnum)
    {
        int i, j, counts, k;
        List<int> primelts = new List<int>();
        //加入第一个素数2
        primelts.Add(2);
        for (i = 3; i <= endnum; i++)
        {
            k = (int)Math.Sqrt(i) + 1;
            for (j = 0; j < primelts.Count; j++)
            {
                if (primelts[j] > k)
                {
                    primelts.Add(i);
                    break;
                }
                //能整除，不是素数
                if (i % primelts[j] == 0)
                {
                    break;
                }
                else if (j == primelts.Count - 1)
                {
                    primelts.Add(i);
                    break;
                }
            }
        }
        counts = 0;
        for (i = 0; i < primelts.Count; i++)
        {
            if (primelts[i] >= beginnum)
            {
                counts++;
            }
        }
        return counts;
    }
```

## 简单线性筛法

　　从头开始，剩下的最小的数肯定是素数，然后根据这个数，翻倍剔除掉剩下集合中的合数；最后转移该素数，继续轮回执行。执行到整个集合为空为止，全部素数已经转移出来。

``` java
    /// <summary>
    /// 简单线性筛法
    /// 从头开始，取到一个素数后，将后面对应该素数的合数全部删掉。
    /// 这样每一轮，剩下最小的那个数肯定是素数。
    /// </summary>
    /// <param name="beginnum"></param>
    /// <param name="endnum"></param>
    /// <returns></returns>
    private int FilterNum(int beginnum, int endnum)
    {
        Dictionary<int, bool> allnums = new Dictionary<int, bool>();
        int mininum = 2;
        //按照顺序排放
        for (int i = mininum; i <= endnum; i++)
        {
            allnums.Add(i, false);
        }
        List<int> primelst = new List<int>();
        while (allnums.Count >= 1)
        {
            mininum = allnums.ElementAt(0).Key;
            //第一个数是最小的，肯定是素数
            allnums.Remove(mininum);
            primelst.Add(mininum);
            //int会溢出，需要设置为double才能防止溢出
            for (int i = mininum; (double)i * mininum <= endnum; i++)
            {
                //将该素数对应的合数全部删除
                allnums.Remove((int)(double)i * mininum);
            }
        }
        for (int i = 0; true; i++)
        {
            if (primelst[0] < beginnum) primelst.RemoveAt(0);
            else break;
        }
        return primelst.Count;
    }
```

　　这里可以用递归，但是数字大的时候会内存溢出。所以我取消了递归的方式。同时还得注意int溢出的问题，会出现46957*91467==48623为true的现象。因为int有最大值，超过就会循环取值了，正转负，负转正。


## 优化版线性筛法

　　上面的解法同样存在重复操作。理想情况，一个数只用剔除一次。

　　该解法是看到这个文章[线性筛法求素数的原理与实现](https://wenku.baidu.com/view/4881881daaea998fcc220e99.html)  才想到的。

这里讲解一下：

　　 合数 = A x B，当A/B又是合数时，重复下去，合数 = ...x...x素数 ==> 最大素数 x 第二大素数 x ... x 最小素数 

　　 所以只要我们找到最小素数，把它当做B，而A又唯一（递增的i），该合数就唯一确定了。

``` java

    /// <summary>
    /// 改进FilterNum存在重复操作的缺点
    /// </summary>
    /// <param name="beginnum"></param>
    /// <param name="endnum"></param>
    /// <returns></returns>
    private int SuperFilterNum(int beginnum, int endnum)
    {
        Dictionary<int, bool> allnums = new Dictionary<int, bool>();
        List<int> primelst = new List<int>();
        //先将所有数设为素数 
        for (int i = 0; i <= endnum; i++)
        {
            allnums[i] = false;
        }
        for (int i = 2; i <= endnum; i++)
        {
            if (!allnums[i])
            {
                //false为素数
                primelst.Add(i);
            }
            // j =0  ==> primelst[0] ==> 2 * i <= endnum 过滤掉后面一半的数, 因为 合数 = A x B ，必定存在 A(或者B) <= 二分之一 ，
            // 所以实际排查前面二分之一的值时 , 后面二分之一的也已经把合数去掉了
            for (int j = 0; j < primelst.Count && primelst[j] * i <= endnum; j++)
            {
                // 用已获得的素数 x index , 排查出对应唯一确定的合数 
                allnums[primelst[j] * i] = true;
                // 重点！通过查找最小素数，防止了重复操作
                // 合数 = A x B，当A/B又是合数时，重复下去，合数 = ...x...x素数 ==> 最大素数 x 第二大素数 x ... x 最小素数 
                // i % primelst[j] 就break，说明已经找到最小素数（j从0开始++）
                // 此时break，合数 = i x 最小素数primelst[j] ，能唯一定位到该合数。不会存在重复定位该合数
                // 举例：合数12 (有两种定位方式)== 4 x 3 ==> 2 x 2 x3
                //                              == 6 x 2 => 3 x 2 x 2 
                // 实际i=4的时候，定位的是8=4x2就break；不会去定位12=4x3
                // i=6的时候，才定位12；
                //
                //同理，合数18 == 6x3 ==> 2x3x3
                //             == 9x2 ==> 3x3x2
                //i=6，定位12就break；等到i=9才来定位18
                if (i % primelst[j] == 0)
                    break;
            }
        }
        while (primelst[0] < beginnum)
        {
            primelst.RemoveAt(0);
        }
        return primelst.Count;
    }
	
```

　　结尾得提一下，上面的算法，三个优化版本，在数据量不大的情况下（十万左右），线性筛选法优势不大，间隔6的那种最快；但是当达到百万以上，线性是最快的！

![Result pic 1](/contentimg/28/4.png "3千万")

![Result pic 1](/contentimg/28/1.png "3百万")

![Result pic 1](/contentimg/28/2.png "3十万")

![Result pic 1](/contentimg/28/3.png "3万")


　　每次运行的时间都会有一点点的区别。注意是毫秒，千分之一秒。所以上面的数据出来是超级快的。


 git代码库: [Codes](https://github.com/YaojiaxinPC/hexoblog/tree/master/AlgorithmDemo)
