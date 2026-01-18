---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tags:
  - default
---

一个简单的C&C++入门教程
<!-- more -->
# C&C++
## C语言
### 简介
C 语言是一种通用的高级语言，最初是由丹尼斯·里奇在贝尔实验室为开发 UNIX 操作系统而设计的。C 语言最开始是于 1972 年在 DEC PDP-11 计算机上被首次实现。

在 1978 年，布莱恩·柯林汉（Brian Kernighan）和丹尼斯·里奇（Dennis Ritchie）制作了 C 的第一个公开可用的描述，现在被称为 K&R 标准。

UNIX 操作系统，C编译器，和几乎所有的 UNIX 应用程序都是用 C 语言编写的。由于各种原因，C 语言现在已经成为一种广泛使用的专业语言。

- 易于学习。
- 结构化语言。
- 它产生高效率的程序。
- 它可以处理底层的活动。
- 它可以在多种计算机平台上编译。
### 简单示例

```C
#include <stdio.h>
 
int main()
{
   /* 我的第一个 C 程序 */
   printf("Hello, World! \n");
   
   return 0;
}
```
### 环境配置

为了在 Windows 上安装 GCC，您需要安装 MinGW。为了安装 MinGW，请访问 MinGW 的主页 [mingw-w64.org](http://mingw-w64.org/)，进入 MinGW 下载页面，下载最新版本的 MinGW 安装程序，命名格式为 MinGW-\<version\>.exe。

当安装 MinGW 时，您至少要安装 gcc-core、gcc-g++、binutils 和 MinGW runtime，但是一般情况下都会安装更多其他的项。

添加您安装的 MinGW 的 bin 子目录到您的 **PATH** 环境变量中，这样您就可以在命令行中通过简单的名称来指定这些工具。

当完成安装时，您可以从 Windows 命令行上运行 gcc、g++、ar、ranlib、dlltool 和其他一些 GNU 工具。

### 数据类型

#### 基础变量
**变量**
- 种类
- 声明
- 使用
```cpp
int a;
char c;
```

| 类型     | 描述                                    |
| ------ | ------------------------------------- |
| char   | 字符型，一个字节（八位）                          |
| int    | 整型，四个字节，取值范围 -2147483648 到 2147483647 |
| flaot  | 单精度浮点数，1位符号，8位指数，23位小数                |
| double | 双精度浮点数，1位符号，11位指数，52位小数               |
| void   | 空                                     |
|        |                                       |

#### 枚举

#### 数组

#### 字符串


#### 变量初始化
当局部变量被定义时，系统不会对其初始化，您必须自行对其初始化。定义全局变量时，系统会自动对其初始化，如下所示：

| 数据类型    | 初始化默认值 |
| ------- | ------ |
| int     | 0      |
| char    | '\0'   |
| float   | 0      |
| double  | 0      |
| pointer | NULL   |


### 常量
**常量的声明与使用**
```cpp
const int a;
```

#### 字符常量

| 转义序列        | 含义            |
| ----------- | ------------- |
| \\\         | \ 字符          |
| \\'         | ' 字符          |
| \\"         | " 字符          |
| \\?         | ? 字符          |
| \\a         | 警报铃声          |
| \\b         | 退格键           |
| \\f         | 换页符           |
| \\n         | 换行符           |
| \\r         | 回车            |
| \\t         | 水平制表符         |
| \\v         | 垂直制表符         |
| \\ooo       | 一到三位的八进制数     |
| \\xhh . . . | 一个或多个数字的十六进制数 |
#### 定义常量
```C
1.一般
#define 常量名 常量值
#define PI 3.14159
2.带数据类型的定义
const 数据类型 常量名 = 常量值;
const int MAX_VALUE = 100;
```

### 存储类
### 运算符
#### 算术运算符

|运算符|描述|实例|
|---|---|---|
|+|把两个操作数相加|A + B 将得到 30|
|-|从第一个操作数中减去第二个操作数|A - B 将得到 -10|
|*|把两个操作数相乘|A * B 将得到 200|
|/|分子除以分母|B / A 将得到 2|
|%|取模运算符，整除后的余数|B % A 将得到 0|
|++|自增运算符，整数值增加 1|A++ 将得到 11|
|--|自减运算符，整数值减少 1|A-- 将得到 9|
#### 关系运算符

|运算符|描述|实例|
|---|---|---|
|==|检查两个操作数的值是否相等，如果相等则条件为真。|(A == B) 为假。|
|!=|检查两个操作数的值是否相等，如果不相等则条件为真。|(A != B) 为真。|
|>|检查左操作数的值是否大于右操作数的值，如果是则条件为真。|(A > B) 为假。|
|<|检查左操作数的值是否小于右操作数的值，如果是则条件为真。|(A < B) 为真。|
|>=|检查左操作数的值是否大于或等于右操作数的值，如果是则条件为真。|(A >= B) 为假。|
|<=|检查左操作数的值是否小于或等于右操作数的值，如果是则条件为真。|(A <= B) 为真。|
#### 逻辑运算符

下表显示了 C 语言支持的所有关系逻辑运算符。假设变量 **A** 的值为 1，变量 **B** 的值为 0，则：

|运算符|描述|实例|
|---|---|---|
|&&|称为逻辑与运算符。如果两个操作数都非零，则条件为真。|(A && B) 为假。|
|\||称为逻辑或运算符。如果两个操作数中有任意一个非零，则条件为真。|(A \| B) 为真。|
|!|称为逻辑非运算符。用来逆转操作数的逻辑状态。如果条件为真则逻辑非运算符将使其为假。|!(A && B) 为真。|
#### 位运算符

位运算符作用于位，并逐位执行操作。

|运算符|描述|实例|
|---|---|---|
|&|对两个操作数的每一位执行逻辑与操作，如果两个相应的位都为 1，则结果为 1，否则为 0。<br><br>按位与操作，按二进制位进行"与"运算。运算规则：<br><br>0&0=0;   <br>0&1=0;    <br>1&0=0;     <br>1&1=1;|(A & B) 将得到 12，即为 0000 1100|
|\||对两个操作数的每一位执行逻辑或操作，如果两个相应的位都为 0，则结果为 0，否则为 1。<br><br>按位或运算符，按二进制位进行"或"运算。运算规则：<br><br>0\|0=0;   <br>0\|1=1;   <br>1\|0=1;    <br>1\|1=1;|(A \| B) 将得到 61，即为 0011 1101|
|^|对两个操作数的每一位执行逻辑异或操作，如果两个相应的位值相同，则结果为 0，否则为 1。<br><br>异或运算符，按二进制位进行"异或"运算。运算规则：<br><br>0^0=0;   <br>0^1=1;   <br>1^0=1;  <br>1^1=0;|(A ^ B) 将得到 49，即为 0011 0001|
|~|对操作数的每一位执行逻辑取反操作，即将每一位的 0 变为 1，1 变为 0。<br><br>取反运算符，按二进制位进行"取反"运算。运算规则：<br><br>~1=-2;   <br>~0=-1;|(~A ) 将得到 -61，即为 1100 0011，一个有符号二进制数的补码形式。|
|<<|将操作数的所有位向左移动指定的位数。左移 n 位相当于乘以 2 的 n 次方。<br><br>二进制左移运算符。将一个运算对象的各二进制位全部左移若干位（左边的二进制位丢弃，右边补0）。|A << 2 将得到 240，即为 1111 0000|
|>>|将操作数的所有位向右移动指定的位数。右移n位相当于除以 2 的 n 次方。<br><br>二进制右移运算符。将一个数的各二进制位全部右移若干位，正数左补 0，负数左补 1，右边丢弃。|A >> 2 将得到 15，即为 0000 1111|

\&、 \| 和 \^ 的真值表如下所示：


| p   | q   | p & q | p \| q | p ^ q |
| --- | --- | ----- | ------ | ----- |
| 0   | 0   | 0     | 0      | 0     |
| 0   | 1   | 0     | 1      | 1     |
| 1   | 1   | 1     | 1      | 0     |
| 1   | 0   | 0     | 1      | 1     |
#### 赋值运算符
下表列出了 C 语言支持的赋值运算符：

|运算符|描述|实例|
|---|---|---|
|=|简单的赋值运算符，把右边操作数的值赋给左边操作数|C = A + B 将把 A + B 的值赋给 C|
|+=|加且赋值运算符，把右边操作数加上左边操作数的结果赋值给左边操作数|C += A 相当于 C = C + A|
|-=|减且赋值运算符，把左边操作数减去右边操作数的结果赋值给左边操作数|C -= A 相当于 C = C - A|
|*=|乘且赋值运算符，把右边操作数乘以左边操作数的结果赋值给左边操作数|C *= A 相当于 C = C * A|
|/=|除且赋值运算符，把左边操作数除以右边操作数的结果赋值给左边操作数|C /= A 相当于 C = C / A|
|%=|求模且赋值运算符，求两个操作数的模赋值给左边操作数|C %= A 相当于 C = C % A|
|<<=|左移且赋值运算符|C <<= 2 等同于 C = C << 2|
|>>=|右移且赋值运算符|C >>= 2 等同于 C = C >> 2|
|&=|按位与且赋值运算符|C &= 2 等同于 C = C & 2|
|^=|按位异或且赋值运算符|C ^= 2 等同于 C = C ^ 2|
|\|=|按位或且赋值运算符|C \|= 2 等同于 C = C \| 2|
#### 杂项运算符 ↦ sizeof & 三元


下表列出了 C 语言支持的其他一些重要的运算符，包括 **sizeof** 和 **? :**。

|运算符|描述|实例|
|---|---|---|
|sizeof()|返回变量的大小。|sizeof(a) 将返回 4，其中 a 是整数。|
|&|返回变量的地址。|&a; 将给出变量的实际地址。|
|*|指向一个变量。|*a; 将指向一个变量。|
|? :|条件表达式|如果条件为真 ? 则值为 X : 否则值为 Y|

#### C 中的运算符优先级

运算符的优先级确定表达式中项的组合。这会影响到一个表达式如何计算。某些运算符比其他运算符有更高的优先级，例如，乘除运算符具有比加减运算符更高的优先级。

例如 x = 7 + 3 * 2，在这里，x 被赋值为 13，而不是 20，因为运算符 * 具有比 + 更高的优先级，所以首先计算乘法 3*2，然后再加上 7。

下表将按运算符优先级从高到低列出各个运算符，具有较高优先级的运算符出现在表格的上面，具有较低优先级的运算符出现在表格的下面。在表达式中，较高优先级的运算符会优先被计算。

|类别|运算符|结合性|
|---|---|---|
|后缀|() [] -> . ++ - -|从左到右|
|一元|+ - ! ~ ++ - - (type)* & sizeof|从右到左|
|乘除|* / %|从左到右|
|加减|+ -|从左到右|
|移位|<< >>|从左到右|
|关系|< <= > >=|从左到右|
|相等|== !=|从左到右|
|位与 AND|&|从左到右|
|位异或 XOR|^|从左到右|
|位或 OR|\||从左到右|
|逻辑与 AND|&&|从左到右|
|逻辑或 OR|\||从左到右|
|条件|?:|从右到左|
|赋值|= += -= *= /= %=>>= <<= &= ^= \|=|从右到左|
|逗号|,|从左到右|

### 判断
**分支语句的种类与使用**
```cpp
if(){

}else if(){

}else{

}
```
C 语言提供了以下类型的判断语句。点击链接查看每个语句的细节。

|语句|描述|
|---|---|
|[if 语句](https://www.runoob.com/cprogramming/c-if.html "C 中的 if 语句")|一个 **if 语句** 由一个布尔表达式后跟一个或多个语句组成。|
|[if...else 语句](https://www.runoob.com/cprogramming/c-if-else.html "C 中的 if...else 语句")|一个 **if 语句** 后可跟一个可选的 **else 语句**，else 语句在布尔表达式为假时执行。|
|[嵌套 if 语句](https://www.runoob.com/cprogramming/c-nested-if.html "C 中的嵌套 if 语句")|您可以在一个 **if** 或 **else if** 语句内使用另一个 **if** 或 **else if** 语句。|
|[switch 语句](https://www.runoob.com/cprogramming/c-switch.html "C 中的 switch 语句")|一个 **switch** 语句允许测试一个变量等于多个值时的情况。|
|[嵌套 switch 语句](https://www.runoob.com/cprogramming/c-nested-switch.html "C 中的嵌套 switch 语句")|您可以在一个 **switch** 语句内使用另一个 **switch** 语句。|
### 循环
**循环语句的种类与使用**
for循环可以理解是横向遍历，backtracking（递归）就是纵向遍历
```cpp
while(){

}

for(){

}

```
#### 循环类型

C 语言提供了以下几种循环类型。点击链接查看每个类型的细节。

|循环类型|描述|
|---|---|
|[while 循环](https://www.runoob.com/cprogramming/c-while-loop.html "C 中的 while 循环")|当给定条件为真时，重复语句或语句组。它会在执行循环主体之前测试条件。|
|[for 循环](https://www.runoob.com/cprogramming/c-for-loop.html "C 中的 for 循环")|多次执行一个语句序列，简化管理循环变量的代码。|
|[do...while 循环](https://www.runoob.com/cprogramming/c-do-while-loop.html "C 中的 do...while 循环")|除了它是在循环主体结尾测试条件外，其他与 while 语句类似。|
|[嵌套循环](https://www.runoob.com/cprogramming/c-nested-loops.html "C 中的嵌套循环")|您可以在 while、for 或 do..while 循环内使用一个或多个循环。|

更多内容：[C while 和 do while 区别](https://www.runoob.com/w3cnote/c-while-and-do-while.html)

  

#### 循环控制语句

循环控制语句改变你代码的执行顺序。通过它你可以实现代码的跳转。

C 提供了下列的循环控制语句。点击链接查看每个语句的细节。

|控制语句|描述|
|---|---|
|[break 语句](https://www.runoob.com/cprogramming/c-break-statement.html "C 中的 break 语句")|终止**循环**或 **switch** 语句，程序流将继续执行紧接着循环或 switch 的下一条语句。|
|[continue 语句](https://www.runoob.com/cprogramming/c-continue-statement.html "C 中的 continue 语句")|告诉一个循环体立刻停止本次循环迭代，重新开始下次循环迭代。|
|[goto 语句](https://www.runoob.com/cprogramming/c-goto-statement.html "C 中的 goto 语句")|将控制转移到被标记的语句。但是不建议在程序中使用 goto 语句。|

### 输入输出
**输入输出**
```cpp
scanf();
printf();
cin >> ;
cout << ;
```
### 指针
**指针**
```cpp
int* p;
```
### 函数
**函数**
构造与使用
形参与实参

### 预处理/头文件
**预处理**
```cpp
#include<stdio>
#define MIX 10005
```
### 结构体的使用
**结构体的使用**
```cpp
struct{
   int a;
   char c;
}
```
### 递归与递推
**递归与递推**
for循环可以理解是横向遍历，backtracking（递归）就是纵向遍历

## C++

### 语言简介
OOA:Object-Oriented Analysis（面向对象分析方法）
OOD:面向对象设计（Object-Oriented Design，OOD）
文件扩展名:所有操作系统的C++源文件拓展名为.cpp，头文件一般用.h，个别操作系统使用.hpp
### 代码示例
```cpp
#include <iostream>
using namespace std;
int main()
{
    cout << "Hello, world!" << endl;
    return 0;
}
```

### 开发环境与工具

#### MSYS2
https://www.msys2.org/

#### Mingw-w64
https://www.mingw-w64.org/

MinGW-W64 下载、安装与配置（支持最新版的GCC，目前 GCC 13.2.0）-CSDN博客：
https://blog.csdn.net/B11050729/article/details/132176767?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522170091368816800192273499%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=170091368816800192273499&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-132176767-null-null.142^v96^pc_search_result_base9&utm_term=MinGW-W64&spm=1018.2226.3001.4187
MinGW-w64安装教程——著名C/C++编译器GCC的Windows版本_yygr的博客-CSDN博客：
https://blog.csdn.net/fengyuyeguirenenen/article/details/129162492

#### VS Code

Visual Studio Code 如何编写运行 C、C++ 程序？_vs cs文件不能直接运行代码妈-CSDN博客：
https://blog.csdn.net/lyw851230/article/details/89352839?spm=1001.2014.3001.5506
Visual Studio Code (VS Code) – C/C++ 入门-CSDN博客：
https://blog.csdn.net/m0_73287396/article/details/128635316
【亲测可用】VsCode配置C语言环境_柒月流火赏心头的博客-CSDN博客：
https://blog.csdn.net/qq_44084784/article/details/128552823

### 语言基础
#### 变量

1. 继承了C语言的所有数据类型

2. 允许变量的定义语句出现在程序的任何位置，使得局部变量的定义位置与使用位置不至太远，增强了程序的可读性，而且也不必在编写某一程序块的开始时就考虑要用到哪些变量。

3. 允许直接使用结构体定义变量

1. 强制类型转换

1. C语言中原有：(数据类型)(表达式)，C++中增加的：数据类型(表达式)

2. int(a)，此时a的类型并未转换，应为：int b = int(a)

1. 动态内存与释放：

1. new运算符：分配堆内存，指针变量 = new 数据类型;

2. delete运算符：delete 指针变量;

1. 作用域运算符::

1. 作用域运算符前不加作用域名为全局作用域

2. 引用

1. 用于在程序的不同部分使用两个以上的变量名指向同一地址

2. 引用运算符为&，声明引用一般形势如下：

1. 数据类型 &引用变量名 = 变量名;

2. 数据类型& 引用变量名 = 变量名;

3. 数据类型 & 引用变量名 = 变量名;

3. const修饰符

1. C语言中一般使用#define来定义常量:#define PI 3.141592653589793

2. C++提高的一种方式：const float PI = 3.141592653589793 ;

3. const可以与指针一起使用，一般情况为三种

1. 指向常量的指针

2. 常指针

3. 指向常量的常指针

4. 字符串：C++提供string类

5. 函数新特性：

1. 

#### 函数

函数重载：要定义的函数与已定义的函数名字相同形参不同，则为重载函数。

函数原型
内联函数
带默认参数的函数
函数重载
函数模板
函数模板
模板函数

#### 函数指针





#### 字符串

```
char site[7] = {'R', 'U', 'N', 'O', 'O', 'B', '\0'};
```

##### 字符串函数

| 1   | strcpy(s1, s2);  <br>复制字符串 s2 到字符串 s1。                                                                                                               |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2   | strcat(s1, s2);  <br>连接字符串 s2 到字符串 s1 的末尾。连接字符串也可以用 + 号，例如:  <br><br>string str1 = "runoob";<br>string str2 = "google";<br>string str = str1 + str2; |
| 3   | strlen(s1);  <br>返回字符串 s1 的长度。                                                                                                                       |
| 4   | strcmp(s1, s2);  <br>如果 s1 和 s2 是相同的，则返回 0；如果 s1<s2 则返回值小于 0；如果 s1>s2 则返回值大于 0。                                                                      |
| 5   | strchr(s1, ch);  <br>返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置。                                                                                               |
| 6   | strstr(s1, s2);  <br>返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置。                                                                                              |
- **String类特性**

```
复制：s1 = s2
连接：s1+s2
大小：s.size()
```
##### CString
(22条消息) CString用法大全_caimagic的专栏-CSDN博客_cstring
https://blog.csdn.net/caimagic/article/details/50734588


- **memset**
`memset` 可以方便地清空一个结构类型的变量或数组。
**例如：**
```cpp
struct sample_struct {
    char csName[16];
    int iSeq;
    int iType;
};
```
对于变量 `struct sample_struct stTest;`，一般情况下，清空 `stTest` 的方法是：
```cpp
stTest.csName[0] = '\0';
stTest.iSeq = 0;
stTest.iType = 0;
```
使用 `memset` 则更为方便：
```cpp
memset(&stTest, 0, sizeof(struct sample_struct));
```
对于数组 `struct sample_struct TEST[10];`，可以使用 `memset` 清空整个数组：
```cpp
memset(TEST, 0, sizeof(struct sample_struct) * 10);
```
 `memset` 函数按字节对内存块进行初始化，因此不能用它将 `int` 数组初始化为 0 和 -1 之外的其他值（除非该值的高字节和低字节相同）。
```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char a[5];
    memset(a, '1', 5);
    for (int i = 0; i < 5; i++)
        cout << a[i] << "";
    system("pause");
    return 0;
}
```
这个程序可以将数组 `a` 中的元素值都设置为字符 `'1'`。这是因为字符型占据的内存大小是 1 字节，`memset` 函数也是以字节为单位进行赋值的，因此输出没有问题。
```cpp
#include <iostream>
#include <cstring>
#include <windows.h>
using namespace std;

int main() {
    int a[5];
    memset(a, 1, 20);
    // 等价于 memset(a, 1, sizeof(a));
    for (int i = 0; i < 5; i++)
        cout << a[i] << "";
    system("pause");
    return 0;
}
```
这个程序试图将数组 `a` 中的元素值设置为 1，却是不可行的。原因在于数组 `a` 是整型的，使用 `memset` 依然是按字节赋值。赋值完成后，每个数组元素的值实际上是 `0x01010101`，即十进制的 `16843009`。
当你使用 `memset(a, 1, 20)` 时，是对 `a` 指向的内存的 20 个字节进行赋值，每个字节都用数字 `1` 去填充。转为二进制后，1 就是 `00000001`，占一个字节。而一个 `int` 元素是 4 字节，因此填充后的值为 `00000001 00000001 00000001 00000001`，转化成十六进制就是 `0x01010101`，即等于 `16843009`，这就是每个 `int` 元素的值。

#### 其它

**声明、定义与初始化**
- 声明：是告诉编译器有这个东西。
- 定义：是告诉编译器这个东西是什么。
例如：
```cpp
void get(); // 函数声明
void get() {} // 函数定义
```
如果函数之前没有被声明过，那么这就是声明+定义。
更容易混淆的：
```cpp
int x = 0; // 定义
int x; // 也是定义
```
对于数据类型，要如何表示声明呢？很简单，加个修饰符即可：
```cpp
extern int x; // 声明 x
```
如何区分声明和定义呢？ 声明可以多次，定义只能有一次。如果某个语句多写一次后报错了，那么该语句肯定是定义，否则就是声明。
在单个文件中写代码时，你不需要关心这两者的区别，但在多文件编程中（所谓的工程），你必须搞清楚它们。
关于初始化：
```cpp
int x;
x = 0; // 这里的 = 0，是赋值
int x = 0; // 这里的 = 0，也是赋值
```
简单来说，出现了 `=` 号，通常就是赋值。
```cpp
int x(0); // 这才是对 x 的初始化
```
尽管看起来区别不大，但最后一种写法在效率和安全性上更优，特别是在处理非内置类型（`struct`/`class`）时，这种优势尤为明显。
引入更重要的概念： 在构造函数中使用成员初始化列表来初始化成员变量，而不是在函数体中对它们赋值！
例如：
```cpp
struct Node {
    int x, y;
    Node(int a, int b) : x(a), y(b) {} // 初始化，好的习惯！
};

struct Node {
    int x, y;
    Node(int a, int b) { x = a; y = b; } // 赋值，不好的习惯！
}
```
使用成员初始化列表的一个好处是：它总是按照成员变量声明的顺序进行初始化。
举个例子：
```cpp
struct A {
    A() { cout << "My name is A()" << endl; }
};
struct B {
    B() { cout << "My name is B()" << endl; }
};
struct Node {
    A x;
    B y;
    Node(A a, B b) : y(b), x(a) {}
};
int main() {
    Node test;
    return 0;
}
```
当你生成一个实例时，无论你是写成 `y(b), x(a)` 还是 `x(a), y(b)`，`Node` 的构造函数都会按照先初始化 `x`，再初始化 `y` 的顺序来完成工作。这种设置可以减少许多麻烦（详情可参见《Effective C++》中的条款04）。

#### 其他
**注释**：段注释：”/*···*/“，单行注释：”//“。
**输入输出：**
	1. 输入：cin >> ;
	2. 输出：cou << ;

### 输入输出
**输入输出**
```cpp
cin >> ;
cout << ;
```
### 面向对象编程
#### 类
#### 其它
**`struct` 和 `class` 的区别**
`struct` 和 `class` 的唯一区别在于：`struct` 的成员默认是 `public` 的，而 `class` 的成员默认是 `private` 的。除此之外，没有其他区别。这就是为什么在《C++ Primer》这样的书中会有这样的描述：
> 如果类是用 `struct` 关键字定义的，则在第一个访问标号之前的成员是公有的；如果类是用 `class` 关键字定义的，则这些成员是私有的。

在这种情况下，无论是用 `struct` 还是 `class` 定义的东西，都可以称为类。

**类中的函数占用内存吗？**
函数肯定会占用内存地址，但函数是代码块而不是变量。所以当你使用 `sizeof(struct/class)` 时，只能测试到成员变量所需的内存空间，函数并不会占用对象的内存空间。
例如：
```cpp
struct Node {
    getDistance();
    // 省略999个成员函数
};
```
如果你创建了一系列的 `Node` 对象，例如 `Node ary[20121205];`，你可能会担心类中的这1000个成员函数会被复制20121205次。但实际上，成员函数与全局变量一样，函数地址是全局已知的，对象的内存空间中无需保存成员函数地址。对成员函数（非虚函数）的调用在编译时就确定了。唯一的不同是，像 `p.getDistance()` 这样的调用会被编译成类似 `getDistance(&p)` 的形式。
因此，在编写类时，基本不需要担心成员函数占用内存空间的问题。

### STL
(Standard Template Library，标准模板库)
#### 简介与示例
C++ STL（标准模板库）是一套功能强大的 C++ 模板类，提供了通用的模板类和函数，这些模板类和函数可以实现多种流行和常用的算法和数据结构，如向量、链表、队列、栈。

C++ 标准模板库的核心包括以下三个组件：
+ 容器（Containers）：容器是用来管理某一类对象的集合。C++ 提供了各种不同类型的容器，比如 deque、list、vector、map 等。
+ 算法（Algorithms）：算法作用于容器。它们提供了执行各种操作的方式，包括对容器内容执行初始化、排序、搜索和转换等操作。
+ 迭代器（iterators）：迭代器用于遍历对象集合的元素。这些集合可能是容器，也可能是容器的子集。

**示例程序**
```cpp
##include <iostream>
##include <vector>
using namespace std;
 
int main()
{
   // 创建一个向量存储 int
   vector<int> vec; 
   int i;
 
   // 显示 vec 的原始大小
   cout << "vector size = " << vec.size() << endl;
 
   // 推入 5 个值到向量中
   for(i = 0; i < 5; i++){
      vec.push_back(i);
   }
 
   // 显示 vec 扩展后的大小
   cout << "extended vector size = " << vec.size() << endl;
 
   // 访问向量中的 5 个值
   for(i = 0; i < 5; i++){
      cout << "value of vec [" << i << "] = " << vec[i] << endl;
   }
 
   // 使用迭代器 iterator 访问值
   vector<int>::iterator v = vec.begin();
   while( v != vec.end()) {
      cout << "value of v = " << *v << endl;
      v++;
   }
 
   return 0;
}
```

#### 容器类型（Containers）

- 序列容器（Sequence Containers）：
    - `vector`：动态数组，可以改变大小。
    - `deque`：双端队列，可以在两端高效插入和删除。
    - `list`：双向链表，支持快速插入和删除。
    - `forward-list`（C++11）：单向链表，比`list`更节省空间。
    - `array`（C++11）：固定大小的数组。

- 关联容器（Associative Containers）：
    - `set`：基于红黑树实现的集合，元素唯一且自动排序。
    - `multiset`：允许重复元素的集合。
    - `map`：键值对集合，键唯一。
    - `multimap`：允许键重复的键值对集合。

- 无序关联容器（Unordered Associative Containers，C++11）：
    - `unordered_set`：基于哈希表实现的集合。
    - `unordered_multiset`：允许重复元素的哈希表集合。
    - `unordered_map`：基于哈希表的键值对集合。
    - `unordered_multimap`：允许键重复的哈希表键值对集合。

- 容器适配器（Container Adapters）：
    - `stack`：后进先出（LIFO）的栈。
    - `queue`：先进先出（FIFO）的队列。
    - `priority_queue`：优先队列，元素可以按照优先级排序。

#### 算法（Algorithms）
##### 常用操作
算法作用于容器，执行各种操作，如排序、搜索和变换。以下是一些常用的STL算法：
- 非修改序列操作：`find`, `find_if`, `find_first_of`
- 修改序列操作：`copy`, `transform`, `replace`
- 排序和联合操作：`sort`, `merge`, `partition`
- 数值操作：`accumulate`, `partial_sum`

- **`sort`**：对范围内的元素进行升序排序。
- **`find`**：在线性容器中查找指定元素。
- **`binary_search`**：在有序序列中进行二分查找。
- **`for_each`**：对范围内的每个元素应用指定操作。
- **`count`**：统计指定值的出现次数。
- **`accumulate`**：对范围内的元素进行累加。
##### 常用操作使用
```cpp
#include <iostream>
#include <vector>
#include <algorithm>  // 包含STL算法
#include <numeric>    // 包含accumulate算法

using namespace std;

int main() {
    // 创建一个 vector 容器
    vector<int> v = {5, 3, 9, 7, 2, 8, 6};

    // 1. sort - 对 vector 进行升序排序
    sort(v.begin(), v.end());
    cout << "After sorting: ";
    for (int i : v) cout << i << " ";  // 输出: 2 3 5 6 7 8 9
    cout << endl;

    // 2. find - 查找元素 6 是否在容器中
    auto it = find(v.begin(), v.end(), 6);
    if (it != v.end()) {
        cout << "Element 6 found at position: " << distance(v.begin(), it) << endl;
    } else {
        cout << "Element 6 not found" << endl;
    }

    // 3. count - 统计元素 8 在容器中出现的次数
    int count8 = count(v.begin(), v.end(), 8);
    cout << "Element 8 occurs " << count8 << " time(s)" << endl;  // 输出: 1

    // 4. reverse - 将容器中的元素逆序排列
    reverse(v.begin(), v.end());
    cout << "After reversing: ";
    for (int i : v) cout << i << " ";  // 输出: 9 8 7 6 5 3 2
    cout << endl;

    // 5. accumulate - 计算容器中所有元素的累加和
    int sum = accumulate(v.begin(), v.end(), 0);
    cout << "Sum of elements: " << sum << endl;  // 输出: 40

    // 6. transform - 对容器中的每个元素进行变换，这里对每个元素加 1
    transform(v.begin(), v.end(), v.begin(), [](int x) { return x + 1; });
    cout << "After adding 1 to each element: ";
    for (int i : v) cout << i << " ";  // 输出: 10 9 8 7 6 4 3
    cout << endl;

    // 7. unique - 移除相邻的重复元素
    vector<int> v2 = {1, 1, 2, 3, 3, 4, 5, 5};
    auto last = unique(v2.begin(), v2.end());
    v2.erase(last, v2.end());  // 移除重复元素后的新大小
    cout << "After removing duplicates: ";
    for (int i : v2) cout << i << " ";  // 输出: 1 2 3 4 5
    cout << endl;

    // 8. lower_bound - 查找大于等于 7 的第一个元素的位置
    auto lower = lower_bound(v.begin(), v.end(), 7);
    if (lower != v.end()) {
        cout << "First element >= 7: " << *lower << endl;  // 输出: 7
    }

    // 9. rotate - 将元素旋转，使第一个元素移到最后
    rotate(v.begin(), v.begin() + 1, v.end());
    cout << "After rotating: ";
    for (int i : v) cout << i << " ";  // 输出: 9 8 7 6 4 3 10
    cout << endl;

    return 0;
}
```
##### sort
```cpp
#include <iostream>
#include <vector>
#include <algorithm>  // 包含sort算法

// 自定义比较函数，用于降序排序
bool customCompare(int a, int b) {
    return a > b;  // 降序排列，返回 true 表示 a 在 b 之前
}

int main() {
    // 创建一个 vector 容器
    std::vector<int> v = {5, 3, 9, 7, 2, 8, 6};

    // 1. 默认升序排序
    std::sort(v.begin(), v.end());
    std::cout << "After ascending sort: ";
    for (int i : v) std::cout << i << " ";  // 输出: 2 3 5 6 7 8 9
    std::cout << std::endl;

    // 2. 使用 greater<> 降序排序
    std::sort(v.begin(), v.end(), std::greater<int>());
    std::cout << "After descending sort (using greater): ";
    for (int i : v) std::cout << i << " ";  // 输出: 9 8 7 6 5 3 2
    std::cout << std::endl;

    // 3. 使用自定义比较函数进行降序排序
    std::sort(v.begin(), v.end(), customCompare);
    std::cout << "After custom descending sort: ";
    for (int i : v) std::cout << i << " ";  // 输出: 9 8 7 6 5 3 2
    std::cout << std::endl;

    // 4. 部分排序（仅对前 5 个元素进行排序）
    std::vector<int> v2 = {10, 30, 20, 40, 50, 60, 70};
    std::sort(v2.begin(), v2.begin() + 5);
    std::cout << "After partial sort (first 5 elements): ";
    for (int i : v2) std::cout << i << " ";  // 输出: 10 20 30 40 50 60 70
    std::cout << std::endl;

    return 0;
}
```
#### 迭代器（Iterators）

迭代器是一种用于遍历容器元素的对象，类似于指针。不同容器支持不同类型的迭代器，STL 中的算法大多数依赖迭代器来操作容器。根据功能，迭代器分为以下几种：
- **输入迭代器**：只读访问数据，支持单向遍历。
- **输出迭代器**：只写操作，支持单向遍历。
- **前向迭代器**：支持读写操作，能前向遍历。
- **双向迭代器**：支持向前和向后遍历。
- **随机访问迭代器**：支持快速随机访问，类似指针，可以进行跳跃访问。

#### vector
- vector是种容器，类似数组，但它的size可以动态改变。
- 和数组一样，vector的元素在内存中连续排列，因此元素的索引将非常快，而且也可以通过指针的偏移来获取vector中的元素。
- 但也因此连续排列，当我们向vector中间插入一个数据时，整个vector的size变大，在内存中就需要重新分配空间，为此vector采用的做法是：vector会分配额外的空间，以适应size的动态增长。因此，包含同样数量元素的vector和数组相比，占用的空间会更大。
- vector最后增加或者删除一个元素，消耗的时间是一个常数值，与vector的size无关。与其他容器（deques、lists、forward_lists）相比，vector在获取元素和对最后一个元素的操作效率上更高；但对于中间元素的操作，性能则相对较差。

**vector常用操作**

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
	// 默认构造函数，创建一个空的 vector
    vector<int> v;
    // 带大小的构造函数，初始化一个给定大小的 vector，所有元素初始值相同
    vector<int> v2(5, 10); // 大小为5，所有元素为10
    // 迭代器区间构造函数，用另一个容器的元素区间来初始化 vector
    vector<int> v3(v2.begin(), v2.end()); // 使用v2的元素初始化v3
    // 拷贝构造函数，用已有 vector 初始化新 vector
    vector<int> v4 = v3; // v4和v3相同

	// vector支持像数组一样随机访问
	cout << v2[5] << endl; // 输出10

    // 使用 push_back 操作将元素添加到 vector 的末尾
    v.push_back(10);  // vector 现在为 {10}
    v.push_back(20);  // vector 现在为 {10, 20}
    v.push_back(30);  // vector 现在为 {10, 20, 30}

    // 显示 vector 的大小和容量
    cout << "Vector size: " << v.size() << endl;       // 输出: Vector size: 3
    cout << "Vector capacity: " << v.capacity() << endl; // 输出: Vector capacity: 3

    // 访问第一个和最后一个元素
    cout << "Front element: " << v.front() << endl; // 输出: Front element: 10
    cout << "Back element: " << v.back() << endl;   // 输出: Back element: 30

    // 使用 pop_back 删除 vector 的最后一个元素
    v.pop_back();  // vector 现在为 {10, 20}

    // 使用 insert 在指定位置插入元素
    v.insert(v.begin() + 1, 15);  // 在索引 1 的位置插入 15，vector 现在为 {10, 15, 20}

    // 使用 erase 删除指定位置的元素
    v.erase(v.begin() + 1);  // 删除索引 1 的元素，vector 现在为 {10, 20}

    // 使用 resize 改变 vector 的大小
    v.resize(5, 100);  // 将大小调整为 5，填充新元素 100，vector 现在为 {10, 20, 100, 100, 100}

    // 使用 reserve 预留内存，增加容量
    v.reserve(10);  // 预留至少 10 个元素的空间
    cout << "Vector capacity after reserve: " << v.capacity() << endl; // 输出: Vector capacity after reserve: 10

    // 使用迭代器遍历 vector
    cout << "Elements in vector: ";
    for (auto it = v.begin(); it != v.end(); ++it) {
        cout << *it << " ";  // 输出 vector 中的所有元素
    }
    cout << endl;  // 输出: Elements in vector: 10 20 100 100 100

    // 清空 vector
    v.clear();  // vector 现在为空

    // 检查 vector 是否为空
    if (v.empty()) {
        cout << "Vector is empty." << endl;  // 输出: Vector is empty.
    } else {
        cout << "Vector is not empty." << endl;
    }

    return 0;
}
```

**常用的构造函数**
- 默认构造函数：创建一个空的 `vector`。
- 带大小的构造函数：初始化一个给定大小的 `vector`，所有元素初始值相同。
- 迭代器区间构造函数：用另一个容器的元素区间来初始化 `vector`。
- 拷贝构造函数：用已有 `vector` 初始化新 `vector`。
```cpp
vector<int> v1;                 // 默认构造函数，空vector
vector<int> v2(5, 10);          // 大小为5，所有元素为10
vector<int> v3(v2.begin(), v2.end());  // 使用v2的元素初始化v3
vector<int> v4 = v3;            // 拷贝构造函数
```

**容量和大小操作**
`vector` 提供了一些成员函数来获取和控制容量（实际分配的内存）和大小（当前元素数量）：
- **`size()`**：返回当前存储的元素个数。
- **`capacity()`**：返回当前分配的内存可以存储的元素个数。
- **`resize()`**：改变 `vector` 的大小，可以增加或减少元素。
- **`empty()`**：判断 `vector` 是否为空。
- **`reserve()`**：预留内存，增加容量以减少频繁的内存分配。

```cpp
vector<int> v(3, 5);   // v为{5, 5, 5}
cout << v.size();      // 输出3
v.resize(5, 10);            // 改变大小为5，v变为{5, 5, 5, 10, 10}
cout << v.capacity();  // 输出capacity（可能比5大）
v.reserve(10);              // 预留至少10个元素的空间，减少扩展操作
```

**元素访问**
除了 `operator[]` 和 `at()`，`vector` 还提供了其他的方式来访问首尾元素：
- **`front()`**：返回第一个元素。
- **`back()`**：返回最后一个元素。
- **`data()`**：返回底层数组的指针，用于和传统 C 风格的数组交互。
```cpp
vector<int> v = {1, 2, 3, 4};
int first = v.front();   // 获取第一个元素，1
int last = v.back();     // 获取最后一个元素，4
int* p = v.data();       // 获取底层数组指针
```

**修改元素**
- **`push_back()`**：在 `vector` 的末尾添加一个元素，扩展大小。
- **`pop_back()`**：删除 `vector` 的最后一个元素，减小大小。
- **`insert()`**：在指定位置插入一个或多个元素。
- **`erase()`**：删除指定位置的一个或多个元素。
- **`clear()`**：清空 `vector` 的所有元素。
- **`emplace()` 和 `emplace_back()`**：在指定位置或末尾直接构造元素，比 `insert()` 和 `push_back()` 更高效。
```cpp
vector<int> v = {1, 2, 3};
v.push_back(4);           // v变为{1, 2, 3, 4}
v.pop_back();             // v变为{1, 2, 3}
v.insert(v.begin() + 1, 5);  // 在索引1处插入5，v变为{1, 5, 2, 3}
v.erase(v.begin() + 2);   // 删除索引2处的元素，v变为{1, 5, 3}
v.clear();                // 清空所有元素，v变为空
```

**迭代器支持**
`vector` 支持迭代器，用于遍历和操作容器。STL 提供了以下几种迭代器：
- **`begin()` 和 `end()`**：返回指向容器首元素和末尾后一个位置的迭代器。
- **`rbegin()` 和 `rend()`**：返回反向迭代器。
- **`cbegin()` 和 `cend()`**：返回只读（`const`）的迭代器。
```cpp
vector<int> v = {1, 2, 3, 4};
for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " ";  // 输出1 2 3 4
}
```
**内存管理**
`vector` 的内存管理由 STL 自动处理，但你也可以手动控制：
- **`shrink_to_fit()`**：将容量调整为与当前大小相同，释放未使用的内存。
- **`allocator_type`**：可以自定义分配器来管理内存。

```cpp
vector<int> v(10, 1);
v.resize(5);
v.shrink_to_fit();  // 将容量缩小为当前大小
```

**其它**
- push_back的工作方式
vector 中push_back的工作方式是这样的：先把当前的n个元素拷贝出来，之后销毁当前所占用的内存，然后new n+1段的连续内存，最后把现在的n+1个元素按原来的顺序放入新的内存空间中。(有人会问，为什么不直接new一个内存，然后放到第n个元素后面？答案很简单：你能保证new的地址和之前的地址是连续的么？ 显然不能，这种做法其实是链表或list的做法)
可是这样一来，显然push_back的效率是n^2的，太可怕了！！！
幸运的是，vector的设计者用了一个很简单的办法就让时间效率得到了质的飞跃：即“空间换时间”。简单的说就是申请比需求更多一些的内存空间，每次push_back的时候，如果还有预留空间，直接把新元素放到预留空间里去，如果不够，则加倍预留空间，即执行一次上面所说的拷贝，销毁，复制等工作，但申请空间时，new 两倍的内存空间，一半用来保存当前的元素，另一半作为预留空间备用。
显然，这样一来，时间复杂度降低为O(nlogn)，空间复杂增加到O(nlogn)，两者都是可以接受的。
测试：
size()返回当前vector里放了多少元素，capacity()返回当前vector的容量，于是一段简单的代码就可以测试出vector的预留空间倍增行为：
```C++
vector <int> vt;
cout<<vt.capacity()<<" "<<vt.size()<<endl;  
for(int i=0;i<66;i++){
    vt.push_back(0);
    cout<<vt.capacity()<<" "<<vt.size()<<endl; 
}
```

#### queue
```cpp
#include <iostream>
#include <queue>

using namespace std;

int main() {
    // 创建一个 queue 容器来存储整数
    queue<int> q;

    // 使用 push 操作将元素加入队列
    q.push(10);  // 队列现在为 {10}
    q.push(20);  // 队列现在为 {10, 20}
    q.push(30);  // 队列现在为 {10, 20, 30}

    // 显示队列的大小
    cout << "Queue size: " << q.size() << endl; // 输出: Queue size: 3

    // 访问队列的第一个和最后一个元素
    cout << "Front element: " << q.front() << endl; // 输出: Front element: 10
    cout << "Back element: " << q.back() << endl;   // 输出: Back element: 30

    // 使用 pop 操作移除队列的第一个元素
    q.pop();  // 队列现在为 {20, 30}

    // 显示移除后的队列的第一个元素
    cout << "Front element after pop: " << q.front() << endl; // 输出: Front element after pop: 20

    // 检查队列是否为空
    if (q.empty()) {
        cout << "Queue is empty." << endl;
    } else {
        cout << "Queue is not empty." << endl; // 输出: Queue is not empty.
    }

    // 再次显示队列的大小
    cout << "Queue size after pop: " << q.size() << endl; // 输出: Queue size after pop: 2

    return 0;
}
```

#### stack
- C++ 的 `stack` 是一个常见的 STL 容器，专门用于解决 "后进先出"（LIFO，Last In First Out）的问题。
- `stack` 是基于底层容器（通常是 `deque` 或 `vector`）实现的封闭容器，提供有限的操作接口，只允许对栈顶进行插入和删除操作。
- 它的特点是操作简单、效率高，它的所有基本操作如 `push`, `pop`, `top`, `empty`, `size` 都是 O(1) 时间复杂度
- 常用于递归问题、深度优先搜索、括号匹配等情境。

```cpp
#include <iostream>
#include <stack>

using namespace std;

int main() {
    // 创建一个 stack 容器来存储整数
    stack<int> s;

    // 使用 push 操作将元素压入栈顶，栈的结构从空变为 `{10, 20, 30}`
    s.push(10);
    s.push(20);
    s.push(30);

    // 显示栈的大小
    cout << "Stack size: " << s.size() << endl;

    // 访问栈顶元素
    cout << "Top element: " << s.top() << endl;

    // 修改栈顶元素的值
    s.top() = 100;
    cout << "Modified top element: " << s.top() << endl;

    // 使用 pop 操作移除栈顶元素
    s.pop();
    cout << "Top element after pop: " << s.top() << endl;

    // 检查栈是否为空
    if (s.empty()) {
        cout << "Stack is empty." << endl;
    } else {
        cout << "Stack is not empty." << endl;
    }

    // 再次显示栈的大小
    cout << "Stack size after pop: " << s.size() << endl;

    return 0;
}
```

#### list
```cpp
#include <iostream>
#include <list>

using namespace std;

int main() {
    // 创建一个 list 容器来存储整数
    list<int> lst;

    // 使用 push_back 操作将元素添加到列表末尾
    lst.push_back(10);  // list 现在为 {10}
    lst.push_back(20);  // list 现在为 {10, 20}
    lst.push_back(30);  // list 现在为 {10, 20, 30}

    // 使用 push_front 操作将元素添加到列表开头
    lst.push_front(5);  // list 现在为 {5, 10, 20, 30}

    // 显示 list 的大小
    cout << "List size: " << lst.size() << endl; // 输出: List size: 4

    // 访问列表的第一个和最后一个元素
    cout << "Front element: " << lst.front() << endl; // 输出: Front element: 5
    cout << "Back element: " << lst.back() << endl;   // 输出: Back element: 30

    // 使用 pop_front 和 pop_back 操作移除第一个和最后一个元素
    lst.pop_front();  // list 现在为 {10, 20, 30}
    lst.pop_back();   // list 现在为 {10, 20}

    // 显示移除后的 list 的第一个和最后一个元素
    cout << "Front element after pop_front: " << lst.front() << endl; // 输出: Front element after pop_front: 10
    cout << "Back element after pop_back: " << lst.back() << endl;    // 输出: Back element after pop_back: 20

    // 使用 insert 在指定位置插入元素
    auto it = lst.begin();   // 指向第一个元素
    ++it;  // 移动迭代器到第二个元素
    lst.insert(it, 15);  // 在第二个位置插入 15，list 现在为 {10, 15, 20}

    // 使用 erase 删除指定位置的元素
    it = lst.begin();
    advance(it, 2);  // 再次移动迭代器到第二个元素
    lst.erase(it);  // 删除第二个元素，list 现在为 {10, 20}

	// 遍历 list 中的所有元素
	cout << "List elements: "; 
	for (int i : lst) { 
		std::cout << i << " "; // 输出: 10 20
	}

    // 反向遍历 list
    std::cout << "List elements in reverse: ";
    for (auto rit = lst.rbegin(); rit != lst.rend(); ++rit) {
        std::cout << *rit << " ";  // 输出: 40 30 20 10 5
    }
    std::cout << std::endl;
	

    // 使用 clear 清空所有元素
    lst.clear();  // list 现在为空

    // 检查列表是否为空
    if (lst.empty()) {
        cout << "List is empty." << endl; // 输出: List is empty.
    } else {
        cout << "List is not empty." << endl;
    }

    return 0;
}
```


#### set
```cpp
#include <iostream>
#include <set>

using namespace std;

int main() {
    // 创建一个 set 容器来存储整数
    set<int> s;

    // 使用 insert 操作插入元素
    s.insert(10);  // set 现在为 {10}
    s.insert(20);  // set 现在为 {10, 20}
    s.insert(30);  // set 现在为 {10, 20, 30}

    // set 自动忽略重复元素的插入
    s.insert(20);  // 插入的20会被忽略，因为 set 不允许重复元素

    // 显示 set 的大小
    cout << "Set size: " << s.size() << endl; // 输出: Set size: 3

    // 使用 find 查找某个元素
    auto it = s.find(20);
    if (it != s.end()) {
        cout << "Element 20 found in set" << endl; // 输出: Element 20 found in set
    } else {
        cout << "Element 20 not found in set" << endl;
    }

    // 使用 count 判断某个元素是否存在
    if (s.count(10)) {
        cout << "Element 10 exists in set" << endl; // 输出: Element 10 exists in set
    } else {
        cout << "Element 10 does not exist in set" << endl;
    }

    // 使用 erase 删除某个元素
    s.erase(20);  // 删除 20，set 现在为 {10, 30}
    cout << "Set size after erasing 20: " << s.size() << endl; // 输出: Set size after erasing 20: 2

    // 使用迭代器遍历 set
    cout << "Elements in set: ";
    for (auto it = s.begin(); it != s.end(); ++it) {
        cout << *it << " ";  // 输出 set 中的所有元素
    }
    cout << endl;  // 输出: Elements in set: 10 30

    // 清空 set 的所有元素
    s.clear();
    
    // 检查 set 是否为空
    if (s.empty()) {
        cout << "Set is empty" << endl; // 输出: Set is empty
    } else {
        cout << "Set is not empty" << endl;
    }

    return 0;
}
```

#### map
```cpp
#include <iostream>
#include <map>

using namespace std;

int main() {
    // 创建一个 map 容器，键为 int，值为 string
    map<int, string> m;

    // 使用 insert 插入键值对
    m.insert(make_pair(1, "Apple"));
    m.insert(make_pair(2, "Banana"));
    m.insert(make_pair(3, "Cherry"));

    // 使用 operator[] 插入或修改元素
    m[4] = "Date";  // 插入键 4 对应的值 "Date"
    m[2] = "Blueberry";  // 修改键 2 的值为 "Blueberry"

    // 显示 map 的大小
    cout << "Map size: " << m.size() << endl;  // 输出: Map size: 4

    // 使用 find 查找某个键
    auto it = m.find(3);  // 查找键 3
    if (it != m.end()) {
        cout << "Element found: " << it->first << " -> " << it->second << endl;  // 输出: Element found: 3 -> Cherry
    } else {
        cout << "Element not found" << endl;
    }

    // 使用 operator[] 直接访问某个元素
    cout << "Value associated with key 4: " << m[4] << endl;  // 输出: Value associated with key 4: Date

    // 使用 erase 删除某个键
    m.erase(2);  // 删除键 2
    cout << "Map size after erasing key 2: " << m.size() << endl;  // 输出: Map size after erasing key 2: 3

    // 使用迭代器遍历 map
    cout << "Elements in map:" << endl;
    for (auto it = m.begin(); it != m.end(); ++it) {
        cout << it->first << " -> " << it->second << endl;
    }

    // 清空 map 中的所有元素
    m.clear();
    cout << "Map size after clear: " << m.size() << endl;  // 输出: Map size after clear: 0

    return 0;
}
```


#### 其它


### 其它
#### WPF
教程：
【1.课程目标】 https://www.bilibili.com/video/BV1hP411W766/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

### 项目实战
教程：
1. 【超级硬核：老秦推荐的15个C++项目来了，可以直接写到简历上！【程序员老秦】】 https://www.bilibili.com/video/BV1nG4y1u7cj/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
2. 分享几款适合初学者的C语言/C++开源项目：
	https://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247485597&idx=1&sn=5e7f53ead683237f017dc352cab591d9&chksm=fddede59caa9574f4adc642b7aa7f77d476d2be3afa04649273f528a43d5c42808a6c32c3f50&scene=0&xtrack=1#rd


### 学习资源
菜鸟教程：
https://www.runoob.com/cplusplus/cpp-tutorial.html
文档：
Reference - C++ Reference
https://cplusplus.com/reference/


## END

