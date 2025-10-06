---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---

# 数据结构与算法
# 编程工具

**直接使用编译器**：
- g++，编译命令：g++ test1.cpp -o test1 ; test1

**文本编辑器**：
- gvim
- vs code

**IDE**：
- VS

# 编程基础（C/C++语言）

**变量**
- 种类
- 声明
- 使用
```cpp
int a;
char c;
```

**常量的声明与使用**
```cpp
const int a;
```

**输入输出**
```cpp
scanf();
printf();
cin >> ;
cout << ;
```

**分支语句的种类与使用**
```cpp
if(){

}else if(){

}else{

}
```

**循环语句的种类与使用**
for循环可以理解是横向遍历，backtracking（递归）就是纵向遍历
```cpp
while(){

}

for(){

}

```
**指针**
```cpp
int* p;
```
**函数**
构造与使用
形参与实参

**预处理**
```cpp
#include<stdio>
#define MIX 10005
```
**结构体的使用**
```cpp
struct{
	int a;
	char c;
}
```


**递归与递推**
for循环可以理解是横向遍历，backtracking（递归）就是纵向遍历

# 编程进阶：C++ STL
（Standard Template Library，标准模板库）
详见C++教程中的STL


# 算法平台
- Virtual Judge： https://vjudge.net/
- fxw-Codeforce： https://codeforces.com/profile/fxw#
- 首页 - 洛谷 | 计算机科学教育新生态： https://www.luogu.com.cn/

范旭伟的个人主页_牛客网： https://www.nowcoder.com/profile/739910476


ACM 的正确入门方式是什么？ - 知乎： https://www.zhihu.com/question/51727516/answer/127265733
acm吧-百度贴吧--Acm竞赛的世界很奇妙~--ACM国际大学生程序设计竞赛（ACM International Collegiate Programming Contest – ACM-ICPC）是： https://tieba.baidu.com/f?kw=acm&fr=ala0&tpl=5

解决codeforces访问慢的问题_网络_innounce的博客-CSDN博客： https://blog.csdn.net/innounce/article/details/56046715
杭电的前几任ACM集训队队长，我混的最差……： https://mp.weixin.qq.com/s/zMpXK2NhuIr8x4aVLbPiuA


ACM 的正确入门方式是什么？ - 知乎： https://www.zhihu.com/question/51727516/answer/127265733
acm吧-百度贴吧--Acm竞赛的世界很奇妙~--ACM国际大学生程序设计竞赛（ACM International Collegiate Programming Contest – ACM-ICPC）是： https://tieba.baidu.com/f?kw=acm&fr=ala0&tpl=5

解决codeforces访问慢的问题_网络_innounce的博客-CSDN博客： https://blog.csdn.net/innounce/article/details/56046715
杭电的前几任ACM集训队队长，我混的最差……： https://mp.weixin.qq.com/s/zMpXK2NhuIr8x4aVLbPiuA

**VJudge**:
听话的话，看这刘汝佳的那本《算法竞赛入门经典》，挨个把题过一遍，这是我认知范围内（我毕竟没进acm队，学的也一般），感觉对于数据结构和算法联系的最好方式了
**Problem**：
![[Pasted image 20240915151205.png]]
![[Pasted image 20240915151407.png]]
![[Pasted image 20240915151607.png]]
**Status**：
![[Pasted image 20240915152306.png]]
![[Pasted image 20240915152418.png]]
![[Pasted image 20240915152532.png]]
**提交结果状态含义**：
![[Pasted image 20240301101459.png]]


# 算法模板（C/C++）
```cpp
#include<map>
#include<queue>
#include<stack>
#include<cstdio>
#include<string>
#include<cstring>
#include<iostream>
#include<algorithm>
//#include<bits/stdc++.h>

using namespace std;

struct Node
{
	int a,b;
}node, now;

int main(){
	

	return 0;
}
```


## 一些算法前置概念
- 算法是计算机科学的基石，是解决实际问题的手段
- **算法的定义**：算法的形式定义可以看作是任何一个良定义（有穷/确定/可行）的计算过程，以一个或一些值作为输入，产生出一个或一组值作为输出（问题陈述）。
- 算法分析假定的机器模型为随机访问模型 (Random-Access Machine, RAM)，假设指令一条接一条执行，没有并发操作，为简单起见，假设每条指令所需时间均为常量，并且不考虑内存层次的影响。
- 程序=数据结构+算法
- **算法的性质**
	- 输入：有外部提供的量作为算法的输入。
	- 输出：算法产生至少一个量作为输出。
	- 确定性：组成算法的每条指令是清晰，无歧义的。
	- 有限性：算法中每条指令的执行次数是有限的，执行每条指令的时间也是有限的。
	- 可行性: 算法是能够有效解决问题的
	- 算法是若干指令的有穷序列
- **算法分析**
	- 算法分析是指对算法所需的时间和空间等资源进行预测，对设计好的算法进行性能评价
	- 途径：理论/数学上的分析、经验/计算机上的执行情况（仿真模拟）
- **判断算法好坏标准**：正确性、时间效率、空间效率
- **算法复杂度：
	- 一个算法的运行时间是指在特定输入时所执行的步数或基本操作数。
	- 渐进记号：Θ
	- 复杂度对象：数据规模n
	- 渐进效率：n→∞，低阶和常量可以忽略
- 伪代码核心思想：看着伪代码就能写出代码，只不过伪代码会省一些细节

先求蛮力法，一是做基线，二是对后面找好的算法也有帮助

n的阶乘分之一，Σ（1/n！）是一个绝对收敛的幂级数，这个级数的和是常数e。

## 算法复杂度分析

**做算法题什么时候要考虑算法复杂度**？

| 数据规模   | 推荐算法复杂度                        |
| ------ | ------------------------------ |
| ≤ 10⁴  | 线性 (`O(n)`) 或稍差 (`O(n log n)`) |
| ≤ 10⁵  | 必须是 `O(n log n)` 或更优           |
| ≤ 10⁶  | 只能接受 `O(n)`、有些甚至要 `O(1)` 空间    |
| ≤ 10⁷+ | 只能容忍最优的算法和常数优化                 |

## 经验
最开始最好快速把知识点过一遍，不需要学的多好，只需要记住存在某个东西，这个东西是用来做什么的，然后开始大量刷题，然后针对某一类型的题训练等
有时一些题只需知道存在某些东西，就可以轻易解决，解不出来只不过是因为不知道某个简单的工具或者解法而已，或者说，硬解可以，自己从头实现极其繁琐和麻烦，让自己无从下手
不必在一个题上纠结太久，但也不要直接去看答案，必要的思考过程还是要有的，这样才能印象深刻，但纠结太久无意义，有时候有的题一看解法，就明白了知道了有这种解法就会了。

## prompt
给我讲下这道算法题，先给出简洁明了易懂地做题思路，在给出java代码，代码中多些注释帮助我理解：
把这个解答leetcode算法题“第281题 寻找重复数”的java代码改对，并对改动的部分说明原因，要求你在我给的这个代码基础上改，而不是直接给正确答案以及讲解正确代码：

## ————数据结构————

## 数组

例题：
LeetCode：704.二分查找、59.螺旋矩阵Ⅱ

## 堆
**堆的定义**：
堆是一种完全二叉树，即除了最后一层之外，每一层都是满的，并且最后一层的节点都是从左到右依次排列
**堆的种类**：
- 最大堆（Max Heap）：在最大堆中，每个节点的值都大于或等于其子节点的值。也就是说，根节点的值是最大的，子树的根节点也满足这一性质。
- 最小堆（Min Heap）：在最小堆中，每个节点的值都小于或等于其子节点的值。也就是说，根节点的值是最小的，子树的根节点也满足这一性质。
**堆的操作**：
- 插入：将新元素插入堆中，通常是在堆的末尾插入，然后通过上浮操作恢复堆的性质。
- 删除最大（最小）元素：删除最大堆的最大元素或最小堆的最小元素，通常是移除根节点，然后用最后一个元素填补根节点的位置，通过下沉操作恢复堆的性质。
- 堆排序：一种基于堆的数据排序方法。首先将数组构造成最大堆，然后不断取出最大元素并调整堆的结构。
**堆的实现**：堆通常用数组实现，因为它是一种完全二叉树，利用数组下标可以方便地访问父节点和子节点。对于数组中索引为$i$的节点，其左子节点的索引为 $2i+1$，右子节点的索引为 $2i+2$，父节点的索引为 $\frac{i-1}{2}​$。
**堆的性质**：
- 维护最大堆性质要O(lg n)时间
- 从一个无序数组建成一个最大堆要O(n)（不是O(nlgn)）时间
- 堆排序时间是O（nlogn）
- 堆因为交换是可以原地排序

**相关问题**：
- 一亿个找最小的十个数
解决方法：创建一个大小为10的最小堆，用来存储当前最小的十个数，遍历所有的一亿个数，如果最小堆中的元素少于10个，则直接将该数插入堆中，如果最小堆已满（即堆中有10个元素），则比较当前数与堆顶元素（最小堆的根节点）的大小，如果当前数大于堆顶元素，说明当前数不可能是前十个最小的数，不做任何操作，如果当前数小于堆顶元素，则将堆顶元素替换为当前数，并重新调整堆，以保证最小堆的性质。
复杂度分析：初始化最小堆和插入前十个元素的复杂度是$O(10)$，之后对于每个元素的操作复杂度为$O(1og10)$，总的时间复杂度是$(Nlog10)$，其中$N$是数据集的大小，即一亿。由于堆的大小固定为10，所以这个算法的效率很高。
LeetCode：239、347

## 栈

## 链表

环形链表


例题：LeetCode：203.移除链表元素、707.设计链表、206.翻转链表、142.环形链表

## 队列

## 哈希表
**使用哈希表的情况**：
当我们需要查询一个元素是否出现过，或者一个元素是否在集合里的时候，就要第一时间想到哈希法。

**构造方法**：
- 直接定址法
- 除留余数法
- 叠加法
- 随机数法

**哈希冲突**：
- 开放地址法
- 线性探查法
- 平方探查法
- 双散列函数探查法
- 分离链接法

**例题**：
LeetCode：1.两数之和、242.有效的字母异位词、349.两个数组的交集
## 树-java代码

```Java
// 定义二叉树节点
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) {
        this.val = val;
    }
}
// 构建简单的二叉树
TreeNode root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);

// 读取二叉树
//     1
//    / \
//   2   3
//    \
//     4

public static TreeNode buildTree(String[] parts) {
    if (parts.length == 0 || parts[0].equals("null")) return null;

    TreeNode root = new TreeNode(Integer.parseInt(parts[0]));
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int i = 1;

    while (!queue.isEmpty() && i < parts.length) {
        TreeNode node = queue.poll();
        if (!parts[i].equals("null")) {
            node.left = new TreeNode(Integer.parseInt(parts[i]));
            queue.offer(node.left);
        }
        i++;
        if (i < parts.length && !parts[i].equals("null")) {
            node.right = new TreeNode(Integer.parseInt(parts[i]));
            queue.offer(node.right);
        }
        i++;
    }

    return root;
}


// 前序遍历（根 → 左 → 右）：
void preorder(TreeNode root) {
    if (root == null) return;
    System.out.print(root.val + " ");
    preorder(root.left);
    preorder(root.right);
}

// 中序遍历（左 → 根 → 右）：
void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
}

// 后序遍历（左 → 右 → 根）：
void postorder(TreeNode root) {
    if (root == null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.print(root.val + " ");
}

// 层序遍历（BFS）：
Queue<TreeNode> queue = new LinkedList<>();
queue.offer(root);
while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    System.out.print(node.val + " ");
    if (node.left != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
}

```





## 链表-java代码


```Java
// 定义单向链表节点
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) {
        this.val = val;
    }
}

// 创建链表（1 -> 2 -> 3）
ListNode head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

// 读取链表：`1 2 3 4 5` 表示链表 1→2→3→4→5
public static ListNode readList(Scanner sc) {
    String[] parts = sc.nextLine().split(" ");
    ListNode dummy = new ListNode(0);
    ListNode cur = dummy;
    for (String part : parts) {
        cur.next = new ListNode(Integer.parseInt(part));
        cur = cur.next;
    }
    return dummy.next;
}


// 遍历链表
ListNode cur = head;
while (cur != null) {
    System.out.println(cur.val);
    cur = cur.next;
}

// 反转链表
ListNode prev = null;
ListNode cur = head;
while (cur != null) {
    ListNode next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
}

```


## 并查集
并查集（DSU，Disjoint-Set Union），即“不相交集合”，是一种用于处理集合合并和查询等问题的数据结构。

**用途**：它主要用于解决一些集合的动态连接性问题，例如判断两个元素是否属于同一个集合、合并两个集合等。其将编号分别为1…N的N个对象划分为不相交集合，在每个集合中，选择其中某个元素代表所在集合。

**解题思路**：把相连的集合合并起来，然后查找符合条件的集合（所以叫并查集），查找元素是否在有相同父节点来判断两元素是否在同一集合。

**基本操作**
- 初始化： 首先将每个节点的父节点初始化为自身，表示每个节点都是一个独立的集合。
- Find操作： 查找某个节点所属的集合。通常实现中，可以通过不断向上查找父节点直到找到根节点来实现。根节点的特点是其父节点指向自己。
- Union操作： 合并两个集合。首先找到两个集合的根节点，然后将其中一个根节点的父节点指向另一个根节点，从而实现集合的合并。

**优化方法**：
- 路径压缩（Path Compression）： 在Find操作中，除了找到根节点外，还将经过的所有节点的父节点直接指向根节点，从而减少之后的Find操作的时间复杂度。
- 按秩合并（Union by Rank）： 算法复杂度最大的情况为给的点都在一条直线上，找一端的的父节点要遍历所有元素，在Union操作中，将高度较低的树合并到高度较高的树下，从而保持树的平衡，减少Find操作的时间复杂度。

**相关题目**：
HDU：[1232.畅通工程](http://acm.hdu.edu.cn/showproblem.php?pid=1232)

## 图
图的实现：
- 邻接矩阵
- 邻接表












## END