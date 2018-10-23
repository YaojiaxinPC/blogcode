---
title: 5个简单算法
date: 2018-10-23 08:07:59
categories:
  - 算法
tags:
  - C#
---

　　本文介绍五个算法小题目：

1. 四个不同数字组成互不相等且不重复的三位数。
1. 斐波那契数列。
1. 字符串转整型。
1. 简单逻辑思考题。
1. 数组移动

<!-- more -->

　　分享一下博客上看到的一些算法题：

## 四个数字组成三位数

　　有数字：1、2、3、4，请问能组成多少个互不相同且无重复数字的三位数？请输出这些数字。

### 解法

　　三位数，百位数有4种选择，则十位数有3种选择，从而个位数只有2种选择。共4x3x2=24种情况。

``` java
    int count = 0;
    for (int i = 1; i <= 4; i++)
    {
        for (int j = 1; j <= 4; j++)
        {
            if (i == j) continue;
            for (int k = 1; k <= 4; k++)
            {
                if (j == k || k == i) continue;
 
                count++;
                Console.WriteLine("第{1}种情况：{0}", i * 100 + j * 10 + k, count.ToString("00"));
            }
        }
    }
```

　　如果要写能处理不同输入数字数量的，就得用递归：

``` java
    /// <summary>
    /// 题目：有数字：1、2、3、4，请问能组成多少个互不相同且无重复数字的三位数？请输出这些数字。
    /// </summary>
    public class NumToInt : IGetResult
    {
        public void ConsoleOut()
        {
            List<int> inputlst = new List<int>() { 1, 2, 3, 4 };

            int[] inputnums = inputlst.ToArray();
            List<int> result = NumToIntMethod(inputnums);
            StringBuilder txt = new StringBuilder();
            if (result.Count > 0)
            {
                txt.Append("结果共 " + result.Count + " 个；分别是： ");
                for (int i = 0; i < result.Count; i++)
                {
                    if (i < result.Count - 1) txt.Append(result[i] + "、 ");
                    else
                        txt.Append(result[i]);
                }
            }
            else
            {
                txt.Append("存在重复数字，请重新输入！");
            }

            Console.WriteLine(txt.ToString());
        }

        /// <summary>
        /// 输入有多少数字，组合排序后输出结果
        /// </summary>
        /// <param name="inputnum"></param>
        /// <returns></returns>
        private List<int> NumToIntMethod(int[] inputnum)
        {
            List<int> results = new List<int>();

            //去除重复值
            int[] hassamenum = inputnum.GroupBy(i => i).Select(i => i.Key).ToArray();

            //不存在重复值
            if (hassamenum.Count() == inputnum.Count())
            {
                GetNum(0, inputnum.ToList(),ref results);
            }

            return results;
        }

        /// <summary>
        ///  递归调用
        /// </summary>
        /// <param name="beforenum">前面组合的数字</param>
        /// <param name="leftlst">剔除掉已选数字后的集合</param>
        /// <param name="alllst">全部结果总集合</param>
        private void GetNum(int beforenum, List<int> leftlst, ref List<int> alllst)
        {
            //只剩最后一个数字，表示可以输出结果
            if (leftlst.Count == 1)
            {
                if (!alllst.Contains(beforenum))//检查是否重复，99.9%概率不会重复
                {
                    alllst.Add(beforenum);
                }
                else
                {
                    Console.WriteLine("重复！");
                }
                return;
            }

            for (int i = 0; i < leftlst.Count; i++)
            {
                //将前面的数字组合
                int tmpnum = beforenum * 10 + leftlst[i];
                List<int> tmplst = new List<int>();
                tmplst.AddRange(leftlst);
                //剔除已组合的数字
                tmplst.RemoveAt(i);

                GetNum(tmpnum, tmplst, ref alllst);
            }
        }

    }
```

## [斐波那契数列](https://baike.baidu.com/item/斐波那契数列/99145?fr=aladdin)

　　有一列数：1、1、2、3、5......求第30个数。

### 解法

　　第i个数等于第(i-1)个数+第(i-2)个数。使用递归。

``` java
    private int GetNum(int index)
    {
        if (index <= 0) return 0;
        else if (index <= 2) return 1;
        else
            return (GetNum(index - 1) + GetNum(index - 2));
    }
```

　　这里提一下我们在朋友圈经常看到的一个斐波那契数列应用：[切割巧克力](https://zhidao.baidu.com/question/287761267.html)

　　某人把一个8x8的巧克力切成4块，却能拼成一个5x13的长方形==》64 = 65?!

　　其实这里就是利用了斐波那契数列的这个性质：5、8、13正是数列中相邻的三个项！每个奇数项的平方都比前后两项之积多1，每个偶数项的平方都比前后两项之积少1。加上另一个特性：前一项与后一项之比越来越接近黄金分割。


## 字符串转整型

　　将用户输入的字符串，不用系统api转化为整型。

### 解法

　　依靠ASCII，或者每个char与0的差值，判断是否为数字，是否10之内。

``` java
    private int GetNum(string str)
    {
        int num = 0;
        int gap = 0;
        for (int i = 0; i < str.Length; i++)
        {
            gap = str[i] - '0';
            if (gap < 0 || gap >= 10) return -1;
            num = num * 10 + gap;
        }
        return num;
    }
```

## 逻辑思考题

　　A、B、C、D、E五个学生计划报名参加活动，请根据以下条件判断谁真正参加活动：

1. A参加，B也参加；

1. B和C只有一个人参加；

1. C和D或者都参加，或者都不参加；

1. D和E中至少有一个人参加；

1. 如果E参加，那么A和D也参加。


### 解法

　　1，0为参加或者不参加；设置5个循环进行判断，将条件转化成对应的值判断进行循环。

``` java
    char[] name = { 'A', 'B', 'C', 'D', 'E' };
    int[] value = new int[5];
    for (value[0] = 0; value[0] < 2; value[0]++) // < 2 取0、1两个值
    {
        for (value[1] = 0; value[1] < 2; value[1]++)
        {
            for (value[2] = 0; value[2] < 2; value[2]++)
            {
                for (value[3] = 0; value[3] < 2; value[3]++)
                {
                    for (value[4] = 0; value[4] < 2; value[4]++)
                    {
                        if((value[1]>=value[0]) //B不参加时，A肯定不参加；B参加时，A不一定参加
                            &&(value[1]+value[2]==1)
                            &&(value[2]==value[3])
                            &&(value[3]+value[4] ==1)
                            &&(value[4]==0 
                            ||(value[4] == 1&&value[0] ==1 && value[3] ==1)))
                            {
                            for (int i = 0; i < value.Length; i++)
                                {
                                    if (value[i] == 1)
                                        Console.WriteLine("{0}参加",name[i]);
                                    else
                                        Console.WriteLine("{0}不参加", name[i]);
                                }
                            }
                    }
                }
            }
        }
    }
	
```

　　该逻辑思考题比较有趣，第一次看到这样和代码结合起来的逻辑题。	

## [数组移动](https://www.cnblogs.com/I-am-Betty/p/3611518.html)

　　这个得推荐去链接中的[博客](https://www.cnblogs.com/I-am-Betty/p/3611518.html) 仔细看，想法很新奇的。

这里简单拿一个来讲：

　　把数组元素前后部分交换 MoveFirstPartOfArrayToTheEnd(int[] array, int index) 比如 {1,2,3,4,5,6,7} 3  => {4,5,6,7,1,2,3}

### 解法


　　简单处理：把1-2-3排后面；然后从头开始把剩下的排进去。

``` java
    private void GetNum()
    {
        int index = 3;
        int[] aa = new int[7] { 1, 2, 3, 4, 5, 6, 7 };
        int[] bb = new int[aa.Count()];
        for (int i = 0; i < aa.Count(); i++)
        {
            if (i < index)
            {
                bb[i + (aa.Count() - index)] = aa[i];
            }
            else
            {
                bb[i - index] = aa[i];
            }
        }
        foreach (var item in bb)
        {
            Console.WriteLine(item);
        }
    }
```


　　上面的处理思想一般般，该题主要是了解链接中反转的用法：

1. 分段1，2，3---4，5，6，7

1. 分段反转3，2，1 --- 7，6，5，4

1. 整体反转4，5，6，7，1，2，3

``` java
    private void ReverseNums()
    {
        int[] aa = new int[7] { 1, 2, 3, 4, 5, 6, 7 };
        int[] a1 = new int[3];
        for (int i = 0; i < a1.Count(); i++)
        {
            a1[i] = aa[i];
        }

        int[] a2 = new int[7 - 3];
        for (int i = 0; i < a2.Count(); i++)
        {
            a2[i] = aa[i + a1.Count()];
        }

        var b1 = a1.Reverse().ToArray();
        var b2 = a2.Reverse().ToArray();

        for (int i = 0; i < a1.Count(); i++)
        {
            aa[i] = b1[i];
        }
        for (int i = 0; i < a2.Count(); i++)
        {
            aa[i + a1.Count()] = b2[i];
        }

        var bb = aa.Reverse().ToArray();

        foreach (var item in bb)
        {
            Console.WriteLine(item);
        }
    }
```
		
	
 git代码库: [Codes](https://github.com/YaojiaxinPC/hexoblog/tree/master/AlgorithmDemo)
