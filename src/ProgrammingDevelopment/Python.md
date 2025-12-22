---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---
一个简单的Python入门教程
<!-- more -->
# Python

## Pycharm
Pycharm 常用快捷键 - 暮良文王 - 博客园：
https://www.cnblogs.com/liangmingshen/p/9297381.html

## 基础语法
变量、循环、分支等，略


## 命名规范
- 变量名和函数名通常使用小写字母，并在单词之间使用下划线连接。
- 常量通常用全大写字母表示，单词之间用下划线分隔。
- 类名通常使用首字母大写的驼峰命名法，其中每个单词的首字母大写，没有下划线
- 模块名（文件名）和包名（文件夹名）通常使用小写字母，并且可以使用下划线分隔单词
**起名原则**：
- 确保名称能够准确地描述变量、函数或类的用途
- 除非是计数器（如 `i`, `j`, `k`），否则应尽量避免使用单个字符的变量名，应选择具有描述性的名称
- 避免过长的名称，使代码难以阅读



- 类：使用首字母大写单词串，例如MyClass、ClassName。内部类使用额外的前导下划线，例如\_MyClass、\_ClassName。
- 函数和方法：单词小写，多个单词用下划线连接，如method_name。
- 函数参数：
	- 单词小写，多个单词用下划线连接，如function_parameter_name。
	- 如果一个函数的参数名称和保留的关键字冲突，则参数名后缀一个下划线，如random_。

- 全局变量：
	- 对于from M import \*导入语句，如果想阻止导入模块内的全局变量可以使用旧有的规范，在全局变量上加一个前导的下划线，如_var_name。
	- 应避免使用全局变量。

- 普通变量：单词小写，多个单词用下划线连接，如color、this_is_a_variable。注意：

- 不论是类成员变量还是全局变量，均不使用 m 或 g 前缀。
- 私有类成员使用单一下划线前缀标识。
- 变量名不应带有类型信息，因为Python是动态类型语言。如 iValue、names_list、dict_obj 等都是不好的命名。
- 常量：常量名所有字母大写，由下划线连接各个单词如MAX_OVERFLOW，TOTAL。

- 异常：以“Error”作为后缀。

- 文件名：全小写,可使用下划线

- 包：应该是简短的、小写的名字。如果下划线可以改善可读性可以加入，如mypackage。

- 模块：与包的规范同，如mymodule。

- 缩写：命名应当尽量使用全拼写的单词，缩写的情况有如下两种：

- 常用的缩写，如XML、ID等，在命名时也应只大写首字母，如XmlParser。
- 命名中含有长单词，对某个单词进行缩写。这时应使用约定成俗的缩写方式。例如：function 缩写为 fn text 缩写为 txt object 缩写为 obj count 缩写为 cnt number 缩写为 num，等。
- 前导后缀下划线：

- 一个前导下划线：表示非公有。
- 一个后缀下划线：避免关键字冲突。
- 两个前导下划线：当命名一个类属性引起名称冲突时使用。
- 两个前导和后缀下划线：“魔”(有特殊用图)对象或者属性，例如__init__或者__file__。绝对不要创造这样的名字，而只是使用它们。注意：关于下划线的使用存在一些争议。
- 特定命名方式：主要是指 xxx 形式的系统保留字命名法。项目中也可以使用这种命名，它的意义在于这种形式的变量是只读的，这种形式的类成员函数尽量不要重载。如 class Base(object): def init(self, id, parent = None): self.id = id self.parent = parent def message(self, msgid): 其中 id、parent 和 message 都采用了系统保留字命名法。

- Python推荐使用蛇形命名法，因为 Python 是蟒蛇啊，理所当然是用蛇形命名……

- 综合各方面考虑，驼峰式命名法比较好，优势明显，事实上，目前使用驼峰式命名法的人也真的越来越多了。


## list
 `list` 的一些常用方法：
- `list.append(x)`: 在列表的末尾添加一个元素 `x`。
- `list.extend(iterable)`: 将可迭代对象 `iterable` 中的所有元素添加到列表的末尾。
- `list.insert(i, x)`: 在索引 `i` 的位置插入元素 `x`。
- `list.remove(x)`: 删除列表中第一个值为 `x` 的元素。
- `list.pop([i])`: 删除列表中索引为 `i` 的元素，并返回它。如果不提供索引，则默认删除并返回最后一个元素。
- `list.clear()`: 从列表中删除所有元素，相当于 `del list[:]`。
- `list.index(x[, start[, end]])`: 返回列表中第一个值为 `x` 的元素的索引。可以指定搜索的起始和结束位置。
- `list.count(x)`: 返回元素 `x` 在列表中出现的次数。
- `list.sort(key=None, reverse=False)`: 对列表中的元素进行排序。
- `list.reverse()`: 反转列表中元素的顺序。

 `list` 的一些方法内部，在内部使用，在常规编程中，通常直接使用方法而不是直接调用这些属性。：
- `list.__add__(other)`: 实现加法操作，例如 `list + other`。
- `list.__contains__(x)`: 实现成员测试操作，例如 `x in list`。
- `list.__delitem__(idx)`: 实现通过索引删除项目，例如 `del list[idx]`。
- `list.__getitem__(idx)`: 实现通过索引获取项目，例如 `list[idx]`。
- `list.__len__()`: 返回列表的长度，例如 `len(list)`。
- `list.__mul__(n)`: 实现乘法操作，例如 `list * n`。
- `list.__reversed__()`: 实现反转操作，例如 `reversed(list)`。


## 字符串

**原始字符串（raw string）**：字符串前加 `r` 或 `R` ，字符串中的反斜杠（`\`）被解释为普通字符，而不是转义字符
例如：
- 用于文档字符串（docstring）或多行字符串注释，当这些字符串包含特殊字符（如反斜杠）时，可以避免不必要的转义。
- 在正则表达式中，反斜杠用于转义特殊字符。使用原始字符串可以减少转义字符的数量，使正则表达式更易读。
```python
import re
pattern = r"\d+\.\d+"
match = re.search(pattern, "The price is 12.34 dollars.")
print(match.group()) ： 输出: 12.34  
```

**格式化字符串（f-string）**，`f` 或 `F` ：字符串中可以包含花括号 `{}`，花括号中可以放置变量名、表达式或其他内容。Python 3.6 及以上版本引入

例如：
```python
name = "Kimi"
age = 4
message = f"My name is {name} and I am {age} years old."
print(message) ： 输出：My name is Kimi and I am 4 years old.
```

## 字典
**查看字典中的一两个键值对的方法**
```python
my_dict = {'a': 1, 'b': 2, 'c': 3, 'd': 4}

## 方法1. 查看单个键值对
print(my_dict['a'])  ## 输出: 1

## 方法2. 获取前两个键值对
for idx, (key, value) in enumerate(my_dict.items()):
    if idx < 2:
        print(f"{key}: {value}")

## 方法3. 将字典转换为列表，并获取前两个键值对
print(list(my_dict.items())[:2])  ## 输出: [('a', 1), ('b', 2)]
```

## filter()
`filter(function, iterable)`：
`function`是一个返回布尔值的函数，用于判断每个元素是否满足某种条件。
适用于需要**根据某种条件筛选元素**的场景.
```python
## 过滤出大于 2 的数字
numbers = [1, 2, 3, 4, 5]
result = filter(lambda x: x > 2, numbers)

## 转换为列表输出结果
print(list(result))  ## 输出: [3, 4, 5]

```

## map()
`map(function, iterable)`：
`function`是一个函数，将应用到 `iterable` 中的每个元素。
适用于需要**对每个元素进行转换**的场景
```python
## 将每个元素乘以 2
numbers = [1, 2, 3, 4]
result = map(lambda x: x * 2, numbers)

## 转换为列表输出结果
print(list(result))  ## 输出: [2, 4, 6, 8]

```

## zip()

**作用**：返回一个迭代器（不是列表），每次返回一个由输入各个可迭代对象中对应元素组成的元组。

**使用**：
```python
## 基本语法
zip(iter1, iter2, ...) 

a = [1, 2, 3]
b = ['a', 'b', 'c']
c = [True, False, True]

## 多个可迭代对象
print(list(zip(a, b, c))) 
## 输出：[(1, 'a', True), (2, 'b', False), (3, 'c', True)]

names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]

## 两个列表配对
print(list(zip(names, scores))) 
## 输出：[('Alice', 85), ('Bob', 92), ('Charlie', 78)]


## 把两个列表组合成键值对字典
print(dict(zip(names, scores))) 
## 输出：{'Alice': 85, 'Bob': 92, 'Charlie': 78}

## 同时遍历多个列表
for name, score in zip(names, scores):
    print(f"{name}: {score}")

```
注意：
- 如果输入的对象长度不同，`zip()` 会自动以最短的长度为准截断
- 解压（和 zip 相反）：用 `*`

## iter()与迭代器
把一个东西转化为迭代器

迭代器本身会自动迭代：
```python
lst = [10, 20, 30]           ## lst 是一个“可迭代对象”
it = iter(lst)               ## 用 iter() 创建一个“迭代器”

print(next(it))  ## 输出 10
print(next(it))  ## 输出 20
print(next(it))  ## 输出 30
print(next(it))  ## 报错：StopIteration
```

迭代器只有调用 `next()` 才会真正取出下一个元素，**不占用大量内存**（适合处理大数据流）
迭代器只能遍历一次，用完就没了（不像 list 可多次访问）
常见用途：文件逐行读、生成器、DataLoader、TensorFlow Dataset、zip/map/filter

## \*和 \*\*

\*用于解包序列类型，比如列表、元组、集合、字符串等，将序列中的元素逐个提取出来
```python
pairs = [('x', 1), ('y', 2), ('z', 3)]
letters, numbers = zip(*pairs)

print(letters)  ## ('x', 'y', 'z')
print(numbers)  ## (1, 2, 3)
```


 \*\*用于字典解包，将字典的键值对展开为**关键字参数**（`key=value` 形式）。
函数参数传递
```python
def func(a, b, c):
    print(a, b, c)

kwargs = {"a": 1, "b": 2, "c": 3}
func(**kwargs)  ## 等价于 func(a=1, b=2, c=3)
```

函数定义中的关键字参数收集：
```python
def func(**kwargs):  ## 收集所有关键字参数到字典 kwargs
    print(kwargs)

func(a=1, b=2)  ## 输出: {'a': 1, 'b': 2}
```

## next()
next(x)：取x的第一个值

## 长度len、size、shape？
- 使用 `len` 获取Python序列类型（如列表、字符串、元组）的长度。
- 使用 `size` 获取NumPy数组或Pandas `DataFrame`/`Series` 中元素的总数。
- 使用 `shape` 获取NumPy数组或Pandas `DataFrame`/`Series` 的维度信息。


## Python语法糖

Python小技巧
- 显示python之禅：
import this
- 变量交换：
a = 1
b = 2
a, b = b, a
- 字符串格式化：
tmp1 = "cd"
tmp2 = "ghi"
tmp3 = "lmno"
​
print("ab" + tmp1 + "ef" + tmp2 + "jk" + tmp3)
print("ab %s ef %s jk %s " % (tmp1, tmp2, tmp3))
print("ab {} ef {} jk {} ".format(tmp1, tmp2, tmp3))
print("ab {0} ef {1} jk {2} ".format(tmp1, tmp2, tmp3))
print(f"ab {tmp1} ef {tmp2} jk {tmp3} ")
- Yield语法
def function():
    a = 1
b = 2
    yiled a
    return a + b
无需return语句返回函数中元素
- 列表解析式
a = []
b = [x.upper() for x in a]   ： 把列表a中所有元素变为大写
c = [x for x in fruit if x.startswith("a")]   ： 挑出列表a中所有元素以“a”开头的单词
- 遍历
for i, x in enumerate(list)   ： i为元素索引值，x为元素值
for i, x in enumerate(reversed(list))   ： 反向遍历
for i, x in enumerate(sorted(list))   ： 排序遍历
- 字典合并
a = {}
b = {}
c = {**a, **b}
- 三元运算符
x = " " if  >  else 
- 序列解包
x.split()
- with语句执行完毕后自动关闭进程
with   as   :



## 函数

- **函数名前加下划线**（例如 `_remove_edge_index`）通常表示这个函数是**内部使用的**，即它是模块、类或文件内部的私有成员。
- **参数类型、参数默认值和函数返回值**：在`def size_repr(key: Any, value: Any, indent: int = 0) -> str:`这段代码中，`: Any`代表类型注解，`=0`指定了默认值，`-> str`是函数的返回类型注解，表示该函数应该返回的是一个字符串。


**参数**

**\*\*kwargs**：
接受任意数量的关键字参数,并以字典的形式存储在 `kwargs` 变量中。
**例子1**：正常使用
```Python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, job="Engineer")
## 输出：
name: Alice
age: 30
job: Engineer
```
**例子2**：在这短代码中：`arg1` 是一个普通的位置参数，`*args` 接收多余的位置参数，`**kwargs` 接收多余的关键字参数
```Python
## 代码：
def example(arg1, *args, **kwargs):
    print(f"arg1: {arg1}")
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

example(1, 2, 3, name="Bob", age=25)
## 输出：
arg1: 1
args: (2, 3)
kwargs: {'name': 'Bob', 'age': 25}
```
**例子3**：`**kwargs` 也可以用来将一个字典中的键值对传递给函数作为关键字参数，在这个例子中，字典 `info` 中的键值对被展开并传递给函数 `greet` 作为关键字参数。
```python
## 代码：
def greet(name, age):
    print(f"Hello, my name is {name} and I am {age} years old.")
info = {"name": "Charlie", "age": 28}
greet(**info)
## 输出：
Hello, my name is Charlie and I am 28 years old.
```




## 命名行参数

**`-u`**：禁用标准输入、标准输出和标准错误流的缓冲
- 如果没有使用 `-u`，在某些情况下，标准输出（如 `print` 输出）会被缓冲，直到程序结束或缓冲区满时才会显示。
- 当你使用 `-u` 启动脚本时，每次 `print` 或标准输出的操作会立即被写入终端或文件，不会等到缓冲区满才输出。
**适用场景**：
-  实时打印日志信息：在处理日志时，如果希望每次记录的日志都能立即显示（而不是等待一段时间后才显示），可以使用 `-u`。
- 交互式会话：在交互式程序中，`-u` 确保输入和输出能实时交互。

`-m`：
- 运行模块：当你用 `python -m` 启动 Python 时，Python 会寻找模块并执行它，而不是直接运行一个文件。
- 运行包：如果模块是包的一部分，你可以使用 `python -m` 来运行包中的某个模块，允许你通过包的结构运行 Python 文件。



## argparse
```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--name', type=str, help='Your name')
parser.add_argument('--age', type=int, help='Your age')
args = parser.parse_args()

print(f"Hello {args.name}, you are {args.age} years old.")

## 运行：python script.py --name Alice --age 25

```







## click——获取命令行参数

装饰器风格

```python
import click

@click.command()
@click.option('--name', type=str, help='Your name')
@click.option('--age', type=int, help='Your age')
def greet(name, age):
    print(f"Hello {name}, you are {age} years old.")

if __name__ == '__main__':
    greet()

## 运行：python script.py --name Alice --age 25

```

例子：
```python
@click.command()
@click.argument('dgl_graph_path', type=click.Path())
```
`@click.command()` 是一个装饰器，用来定义命令行接口中的参数。使用这个装饰器，你可以为你的命令行程序添加位置参数，这些参数在命令行中按顺序传递。
`@click.argument()`：定义要获得的变量
一些属性：
`click.Path(exists=True)`：这个类型说明参数应该是一个有效的文件路径，并且文件必须存在。也就是说，程序会在运行时检查这个路径指向的文件是否存在。没有`exists=True`的话，程序可能会创建或覆盖文件
`type=click.INT`指定参数为整数
default=100指定了参数的默认值。
`required=False`，表示这个参数是否是必需的。`False` 意味着用户可以选择不提供这个参数，程序在这种情况下会使用默认值。


## 警告
- **制表符和空格的混用可能会引发 `IndentationError`**

**代码消除警告**：
需要在 **import torchdata** 之前执行
```python
import warnings
warnings.simplefilter("ignore")
warnings.filterwarnings("ignore", category=UserWarning)
```
- **`"ignore"`**：表示忽略指定类型的警告，不显示在终端或日志中。
- **`category=UserWarning`**：指定忽略 `UserWarning` 级别的警告（即用户代码触发的非严重警告）。

运行时消除警告：
```shell
python -W ignore Network_feature_extraction.py
python -W "ignore::UserWarning" Network_feature_extraction.py
```


## import
import看似简单，实则埋坑不少 | Python 易错点_哔哩哔哩_bilibili https://www.bilibili.com/video/BV1p3DVY6E5A/?vd_source=2bebef67d77d9a55c602507243628b63


**情况1：文件在两个同级文件夹下**
```text
project/
│
├── folder1/
│   └── file1.py
│
├── folder2/
│   └── file2.py
└── main.py
```
**方法 1**: 使用相对导入（适用于包结构）
想从 `folder1/file1.py` 中导入 `file2.py`，可以在 `folder1/file1.py` 中使用相对导入：`from ..folder2 import file2`
然后确保在 `main.py` 中运行时使用包结构：`python -m project.main
**方法 2**: 修改 `sys.path``
```python
## file1.py
import sys
import os

## 将父目录添加到 sys.path 中
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'folder2')))

## 现在你可以导入 folder2 中的文件
import file2

## 现在可以导入 folder2 中 file2 的函数
from file2 import your_function

## 使用 your_function 函数
your_function()
```
**方法 3**: 使用 `importlib` 动态导入
```python
## file1.py
import sys
import os
import importlib.util

## 获取 file2 的绝对路径
file2_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'folder2', 'file2.py'))

## 动态加载 file2 模块
spec = importlib.util.spec_from_file_location("file2", file2_path)
file2 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(file2)

## 现在你可以使用 file2 中的函数或类
file2.your_function()
```


**方法 4**: 使用相对导入（适用于包结构的项目）
```txt
project/
│
├── folder1/
│   ├── __init__.py
│   └── file1.py
│
├── folder2/
│   ├── __init__.py
│   └── file2.py
└── main.py
```

在 `folder1/file1.py` 中使用相对导入导入 `folder2/file2.py` 中的函数：
```python
## folder1/file1.py
from ..folder2.file2 import your_function

## 使用 your_function 函数
your_function()

```
确保你的项目结构包含 `__init__.py` 文件，并且在运行时以模块的方式启动：`python -m project.main`

方法 4: 使用 `PYTHONPATH` 环境变量（适用于开发环境）
```bash
export PYTHONPATH=$PYTHONPATH:/path/to/your/project/folder2
python folder1/file1.py
```

**情况2**：
```text
project/
│
├── folder/
│   ├── file2.py  ## 你要导入的文件
│   └── file3.py  ## 你要导入的文件
└── file1.py      ## 你要运行的文件

```

方法 1：修改 `sys.path` 动态导入
```python
## file1.py
import sys
import os

## 将 folder 文件夹的绝对路径添加到 sys.path 中
sys.path.append(os.path.join(os.path.dirname(__file__), 'folder'))

## 从 file2 和 file3 导入函数
from file2 import function_from_file2
from file3 import function_from_file3

## 使用导入的函数
function_from_file2()
function_from_file3()

```
方法 2：使用 `importlib` 动态导入（更灵活）
```python
## file1.py
import importlib
import os

## 动态导入 file2 和 file3
file2 = importlib.import_module('file2', os.path.join(os.path.dirname(__file__), 'folder'))
file3 = importlib.import_module('file3', os.path.join(os.path.dirname(__file__), 'folder'))

## 使用导入的函数
file2.function_from_file2()
file3.function_from_file3()

```

3适用于包结构的示例
```text
project/
│
├── folder/
│   ├── __init__.py
│   ├── file2.py  ## 你要导入的文件
│   └── file3.py  ## 你要导入的文件
└── __init__.py
└── file1.py      ## 你要运行的文件

```

```python
## file1.py
from folder.file2 import function_from_file2
from folder.file3 import function_from_file3

## 使用导入的函数
function_from_file2()
function_from_file3()

```
`python -m project.file1`




## 包结构
**包（Package）** 是一个包含多个模块的目录，里面可以包含多个 Python 文件（模块），也可以包含其他子包。
包结构的关键特征是，目录中必须包含一个特殊的文件 `__init__.py`（可以是空文件），用来标识该目录是一个 Python 包，而不是普通的文件夹。

包的作用：
我感觉回答的这个问题没有什么，他说避免命名冲突和可以模块复用，但是普通文件夹也可以做到的，为什么弄个包结构呢，但是，如果使用`import`导入的话，就需要这么做，记住就行了




## pip

简介：
pip是Python语言中用于安装和管理软件包的包管理工具。它可以帮助用户在Python环境中轻松地安装、升级、卸载和管理各种第三方软件包。pip通常与Python一起安装，并且是Python社区中最常用的包管理工具之一。通过pip，用户可以方便地获取并使用来自Python软件包索引（PyPI）的数千个软件包，从而扩展Python的功能和应用范围。


各种包信息相关的网站： https://pypi.org/

`pip` 的配置文件默认位于：
	- Linux/macOS: `~/.pip/pip.conf` 或 `~/.config/pip/pip.conf`
	- Windows: `%APPDATA%\pip\pip.ini`


**常用命令**：
- 清除缓存：`pip cache purge`
- 查看某个特定包的安装信息，包括版本号：`pip show 包名`
- 从指定目录安装本地包：pip install 包名 --no-deps --find-links 指定目录

- 察看一个python模块的依赖：pip show <module_name>

- 生成requirements.txt依赖文件：`pip freeze > requirements.txt`
- 使用requirements.txt依赖文件安装包：`pip install -r requirements.txt` 



**pip的源**
- 查看当前pip源：`pip config list`
- 临时更改pip的源：`pip install -i <新的源地址> <要安装的软件包>`
- 备份当前pip配置到一个文件中：`pip config list > pip_config_backup.txt`
- 设置新的源（以清华大学为例）：
	`pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`
	`pip config set global.index-url http://mirrors.aliyun.com/pypi/simple`
	常见的源包括：
	- 清华大学：https://pypi.tuna.tsinghua.edu.cn/simple
	- 阿里云：http://mirrors.aliyun.com/pypi/simple/
	- 豆瓣：http://pypi.douban.com/simple/


**临时设置代理**：运行以下命令，将 `<proxy_host>` 和 `<proxy_port>` 替换为你的代理服务器地址和端口：
```bash
pip install --upgrade pip --proxy=http://<proxy_host>:<proxy_port>
```
​

​全局设置代理​​：
- ​**​Windows​**​:
    - 打开“控制面板” -> “系统和安全” -> “系统” -> “高级系统设置” -> “环境变量”。
    - 添加以下两个环境变量：
        - 变量名：`HTTP_PROXY`，变量值：`http://<proxy_host>:<proxy_port>`
        - 变量名：`HTTPS_PROXY`，变量值：`http://<proxy_host>:<proxy_port>`
- ​**​Linux/macOS​**​:  
    在终端中运行以下命令：
    ```bash
    export HTTP_PROXY=http://<proxy_host>:<proxy_port>
    export HTTPS_PROXY=http://<proxy_host>:<proxy_port>
    ```
然后重新运行 `pip install --upgrade pip`。




**如何察看包的依赖**：通过pipdeptree
pip install pipdeptree
pipdeptree --packages 包名
pipdeptree --packages 包名 --json > dependencies.json


下载包及其依赖：pip download 包名 -d 包所在目录
安装下载的包及其依赖：pip install 包名 --download 包所在目录



```bash
pip show pandas
Name: pandas
Version: 1.3.3
Summary: Powerful data structures for data analysis, time series, and statistics
Home-page: https://pandas.pydata.org
Author: The pandas development team
Author-email: pandas-dev@python.org
License: BSD
Location: /path/to/python/site-packages
Requires: numpy, pytz, python-dateutil
Required-by: some-other-package
```

使用 `pipdeptree` 工具
```bash
## 安装
pip install pipdeptree

## 运行
pipdeptree

## 将以树形结构显示**所有**模块和它们的依赖
allennlp==2.10.1
├── base58 [required: >=2.1.1, installed: 2.1.1]
├── cached-path [required: >=1.1.3,<1.2.0, installed: 1.1.6]
│   ├── boto3 [required: >=1.0,<2.0, installed: 1.36.26]
│   │   ├── botocore [required: >=1.36.26,<1.37.0, installed: 1.36.26]

## 如果你只想查看某个模块的依赖，可以指定模块名：
pipdeptree -p <module_name>

```

查看 `setup.py` 文件,通常它会列出该模块的依赖项。
```python
from setuptools import setup

setup(
    name='your_module',
    version='1.0',
    install_requires=[
        'numpy>=1.17.3',
        'pandas>=1.3.0',
        'requests',
    ],
)

```

许多项目会在 `requirements.txt` 或 `pyproject.toml` 文件中列出它们的依赖项。



- 下载包后不删除：`pip install some_package --no-clean`
- 默认保留 `*.whl` 文件，通过设置 `PIP_NO_CLEAN` 环境变量：`export PIP_NO_CLEAN=true`
- 默认保留 `*.whl` 文件，通过设置通过 `pip.conf` 配置文件：在 `pip` 的配置文件（如 `~/.pip/pip.conf` 或 `~/.config/pip/pip.conf`）中添加以下内容：
```ini
[global]
no-clean = true
```




使用问题：
访问 PyPI 报错：`WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1007)'))': /simple/certifi/`
解决办法：关掉clash verge-设置-系统代理设置-始终使用默认绕过



## Conda
**文档**：
Anaconda入门— Anaconda文档： https://docs.anaconda.com/anaconda/user-guide/getting-started/

**安装**：
Miniconda — Conda documentation： https://docs.conda.io/en/latest/miniconda.html
Index of /anaconda/miniconda/ | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror： https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/



**换国内源**：
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda- 
forge 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/ 

终端临时更改源：`export CONDA_CHANNEL_OVERRIDE=<新的源地址>`

恢复默认源地址：conda config --remove-key channels




**常用命令**

- 显示所有已经创建的环境：conda info -e 、 conda env list 
- 退出环境：source deactivate
- 查看安装源：conda config --show channels


导出环境配置：`conda env export > environment.yml`
使用编辑后的 YAML 文件创建新环境：​`conda env create -f environment.yml`


Linux下，激活 Conda：source ~/.bashrc
启用自动激活 `base` 环境：conda config --set auto_activate_base true
禁用自动激活 `base` 环境：conda config --set auto_activate_base false

察看包的依赖：
conda install -c conda-forge conda-tree
conda-tree depends dgl



- conda --version：查看conda版本，验证是否安装
- conda create -n env_name package_name：创建名为env_name的新环境，并在该环境下安装名为package_name 的包，可以指定新环境的版本号，例如：conda create -n python2 python=python2.7 numpy pandas，创建了python2环境，python版本为2.7，同时还安装了numpy pandas包
- conda list：查看所有已经安装的包
- conda remove --name env_name –all：删除环境
- source activate env_name：切换至env_name环境
- conda update conda：更新至最新版本，也会更新其它相关包
- conda update --all：更新所有包
- conda update package_name：更新指定的包
- conda create --name new_env_name --clone old_env_name：复制old_env_name为new_env_name
- conda install package_name：在当前环境中安装包
- conda install --name env_name package_name：在指定环境中安装包
- conda remove -- name env_name package：删除指定环境中的包
- conda remove package：删除当前环境中的包
- conda create -n tensorflow_env tensorflow
- conda activate tensorflow_env：conda 安装tensorflow的CPU版本
- conda create -n tensorflow_gpuenv tensorflow-gpu
- conda activate tensorflow_gpuenv：conda安装tensorflow的GPU版本
- conda env remove -n env_name：采用第10条的方法删除环境失败时，可采用这种方法
- conda install --use-local  \*\*\*.tar.bz2：conda：安装本地包
- conda config --set show_channel_urls yes：设置搜索时显示通道地址


## 文件处理

- **确认路径**
```python
import os

## 获取当前脚本的目录路径
current_dir = os.path.dirname(os.path.abspath(__file__))
print(current_dir)

##  获取当前工作目录
current_working_dir = os.getcwd()
print(current_working_dir)

## 列出目标目录下的文件夹
items = os.listdir(target_path)

## 拼接文件名和路径
item_path = os.path.join(target_path, item)

```


(51条消息) python对文件夹进行操作_python 文件夹_傻傻的小丫头的博客-CSDN博客：
https://blog.csdn.net/qq_52764364/article/details/129650796
(50条消息) python 移动文件或文件夹操作_m0_37670057的博客-CSDN博客：
https://blog.csdn.net/m0_37670057/article/details/124631123
(1条消息) python 文件、文件夹详细操作_日入上万-CSDN博客_python文件夹：
https://blog.csdn.net/weixin_44239490/article/details/86252212
在Python中，**文件操作** 是非常常见的任务。Python提供了内置的函数和方法来进行文件的读写操作。以下是Python文件操作的常用方法和技巧。

- **打开文件 (`open()` 函数)**

`open()` 函数用于打开文件，默认是只读模式。它会返回一个文件对象，之后可以通过文件对象来进行文件的读写操作。

常用参数：

- **文件路径**：`file` 参数，用于指定文件的路径。
- **模式**：
  - `'r'`：只读模式（默认），文件必须存在。
  - `'w'`：写模式，文件不存在会创建，存在则清空内容。
  - `'a'`：追加模式，文件不存在会创建，存在则在文件末尾追加内容。
  - `'x'`：排他性创建模式，文件不存在则创建，存在则报错。
  - `'b'`：二进制模式，如 `'rb'`、`'wb'`，用于处理非文本文件，如图片、音频等。
  - `'t'`：文本模式（默认），可以与其他模式组合使用。
  - `'+'`：读写模式，允许同时读写文件，如 `'r+'`、`'w+'`。

- **读取文件内容**

`read()`：一次性读取整个文件内容

```python
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()
    print(content)
```

- **`file.read()`**：读取文件的所有内容并返回为一个字符串。如果文件很大，这可能会占用大量内存。

`readline()`：逐行读取文件

```python
with open('example.txt', 'r', encoding='utf-8') as file:
    line = file.readline()   读取第一行
    print(line)
```

- **`file.readline()`**：每次调用都会读取文件中的一行，返回字符串。

`readlines()`：读取所有行，并返回列表

```python
with open('example.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()
    print(lines)   每一行是列表中的一个元素
```

- **`file.readlines()`**：将文件中的所有行作为列表返回，每一行作为一个列表项。

- **写入文件**

`write()`：写入内容

```python
with open('example.txt', 'w', encoding='utf-8') as file:
    file.write("Hello, World!")
```

- **`file.write()`**：将指定的字符串写入文件。如果文件处于 `'w'` 模式，原内容将被覆盖。

`writelines()`：写入多行

```python
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open('example.txt', 'w', encoding='utf-8') as file:
    file.writelines(lines)
```

- **`file.writelines()`**：接受一个字符串列表，将其写入文件，不会自动添加换行符。

- **追加模式**

`a` 模式：追加内容

```python
with open('example.txt', 'a', encoding='utf-8') as file:
    file.write("This is appended text.\n")
```

- **`'a'` 模式**：打开文件并将光标移动到文件末尾，追加新的内容。

- **关闭文件**

通常你会使用 `with` 语句来管理文件操作，它可以自动关闭文件，无需显式调用 `close()`。但是，如果你不使用 `with` 语句，则需要手动关闭文件：

```python
file = open('example.txt', 'r', encoding='utf-8')
content = file.read()
file.close()   手动关闭文件
```

- **文件定位与操作**

`tell()`：获取当前文件指针位置

```python
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read(5)   读取前5个字符
    position = file.tell()   获取当前指针位置
    print(position)   输出指针位置
```

`seek()`：移动文件指针

```python
with open('example.txt', 'r', encoding='utf-8') as file:
    file.seek(10)   将文件指针移动到第10个字符处
    content = file.read()
    print(content)
```

- **`seek(offset, whence)`**：`offset` 是要移动的字节数，`whence` 是参考位置（`0` 表示文件开头，`1` 表示当前位置，`2` 表示文件末尾）。

- **文件检测**

`os` 模块：检查文件是否存在、删除文件等

```python
import os

 检查文件是否存在
if os.path.exists('example.txt'):
    print("文件存在")
else:
    print("文件不存在")

 删除文件
if os.path.exists('example.txt'):
    os.remove('example.txt')
    print("文件已删除")
```

- **二进制文件操作**

处理图片、音频等非文本文件时，可以使用二进制模式 (`'rb'`、`'wb'`)。

读取二进制文件

```python
with open('image.png', 'rb') as file:
    data = file.read()   读取二进制数据
```

写入二进制文件

```python
with open('copy_image.png', 'wb') as file:
    file.write(data)   将二进制数据写入新文件
```

- **文件模式总结**

| 模式 | 含义 |
| ---- | ---- |
| `'r'` | 只读模式，文件必须存在 |
| `'w'` | 写模式，清空原文件内容，文件不存在则创建 |
| `'a'` | 追加模式，文件不存在则创建 |
| `'r+'` | 读写模式，文件必须存在 |
| `'w+'` | 读写模式，清空原文件内容，文件不存在则创建 |
| `'a+'` | 读写模式，在文件末尾追加，文件不存在则创建 |
| `'b'` | 以二进制模式处理文件，适用于非文本文件 |

- **文件的上下文管理**

`with` 语句用于上下文管理，它会自动处理文件的打开和关闭操作，确保在程序结束后文件资源被释放，避免手动调用 `close()`。

示例：

```python
with open('example.txt', 'w', encoding='utf-8') as file:
    file.write("Using 'with' ensures that the file is closed properly.")
```

- **处理大文件**

如果文件非常大，直接使用 `read()` 可能会导致内存问题。你可以逐行读取文件来节省内存：

```python
with open('large_file.txt', 'r', encoding='utf-8') as file:
    for line in file:
        process(line)   逐行处理
```

总结：

- **`open()`**：用于打开文件。
- **`read()`、`readline()`、`readlines()`**：用于读取文件内容。
- **`write()`、`writelines()`**：用于写入文件。
- **`with` 语句**：用于自动管理文件的打开和关闭。
- **`seek()` 和 `tell()`**：用于定位文件指针。
- **`os` 模块**：用于文件操作（如删除文件、检查文件是否存在）。



## 异步

- **await**：在 异步函数（`async def`）内部使用，用来等待一个异步操作完成。

一个不错的例子：
```python
import asyncio

async def async_task(name, seconds):
    print(f"开始任务 {name}")
    await asyncio.sleep(seconds)  ## 假设这是一个耗时的异步操作
    print(f"完成任务 {name}，耗时 {seconds} 秒")

asyncio.run(async_task("Z", 2))
## 只运行一个任务，任务不管早晚都会执行耗时任务

async def main():
    await asyncio.gather(
        async_task("A", 2),
        async_task("B", 2),
        async_task("C", 2)
    )

asyncio.run(main())
## 运行多个任务，使用 asyncio.gather 并发执行
## 就能看出来，耗时操作不会阻塞其他任务的执行
```


## Jupyter Notebook

- 打开Jupyter Notebook：`Jupyter Notebook`
- 查看jupyter notebook官方帮助：`jupyter notebook --help`或`jupyter notebook -h`
- 查看Jupyter Notebook的配置文件所在位置：`jupyter notebook --generate-config`
- 在jupyter 上 增加内核(bash_kernel)：`pip install bash_kernel` 或 `python -m bash_kernel.install`
- 查看安装内核的位置：`jupyter kernelspec list`
- 安装内核：`python -m ipykernel install --user`
- 删除内核：`jupyter kernelspec remove kernelname`


资料：
(3条消息) Windows修改jupyter默认工作路径_呆萌的代Ma-CSDN博客_jupyter修改默认路径： https://blog.csdn.net/weixin_35757704/article/details/90051869
jupyter 快捷键 - Lowell - 博客园： https://www.cnblogs.com/liuweida/p/11997065.html
Jupyter Notebook介绍、安装及使用教程 - 简书： https://www.jianshu.com/p/91365f343585/
如何在Jupyter Notebook中使用Python虚拟环境？ - 简书： https://www.jianshu.com/p/afea092dda1d

## OS






## asyncio
`asyncio` 是 Python 标准库中的一个模块，用于编写异步 I/O 操作的代码。它允许你以非阻塞的方式执行 I/O 密集型任务，并且通过协程（coroutines）和事件循环（event loop）来管理任务的并发执行。
核心概念

1. **协程（coroutines）**：

   * 协程是可以暂停执行并在之后恢复的函数，使用 `async def` 定义。
   * 通过 `await` 关键字可以等待协程完成，而不阻塞程序。

2. **事件循环（Event Loop）**：

   * 事件循环是异步编程的核心，它会调度并管理协程的执行。`asyncio` 提供了 `asyncio.run()` 来启动事件循环，执行任务。

3. **任务（Tasks）**：

   * 任务是协程的封装，表示一个正在执行的协程。
   * 使用 `asyncio.create_task()` 来创建并调度协程任务。

4. **异步 I/O**：

   * `asyncio` 使得 I/O 操作（如网络请求、文件操作）异步化，在 I/O 操作等待时不会阻塞其他任务的执行。

示例代码：

```python
import asyncio

# 定义一个协程
async def say_hello():
    print("Hello")
    await asyncio.sleep(1)  # 模拟 I/O 操作
    print("World")

# 运行协程
async def main():
    await asyncio.gather(say_hello(), say_hello())  # 同时运行两个协程

# 启动事件循环
asyncio.run(main())
```

`asyncio` 的优势

* **高效的并发**：通过事件循环和协程，能够在 I/O 密集型任务中提高并发性能，避免了线程切换的开销。
* **简洁的代码**：相比传统的回调函数，使用 `async/await` 可以写出更清晰、易于理解的代码。

总结：

`asyncio` 提供了一种高效、非阻塞的方式来处理并发 I/O 操作，特别适用于需要高并发的网络编程、爬虫等场景。通过协程和事件循环，程序可以在等待 I/O 操作时做其他任务，极大地提高了性能。















## Appium——手机自动化
【Appium + Python 手机自动化】 https://www.bilibili.com/video/BV1Fj42197Bc/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## Django

教程：
xyjw/diango-vue：
https://github.com/xyjw/diango-vue?tab=readme-ov-file
Django 教程 | 菜鸟教程：
https://www.runoob.com/django/django-tutorial.html
开始 | Django 文档 | Django：
https://docs.djangoproject.com/zh-hans/4.0/intro/
Django 文档 | Django 文档 | Django：
https://docs.djangoproject.com/zh-hans/2.0/

【【WebSocket通信】搭建自己的即时聊天室 Django + Channels + Vue】 https://www.bilibili.com/video/BV1CV411m7Yq/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## ECharts
【2023最新：ECharts 数据可视化大屏项目】 https://www.bilibili.com/video/BV1yu411E7cm/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## Flask
高并发和异步没有flask支持好

**安装**：`pip install flask`
**简单示例**：
```python
from flask import Flask 

app = Flask(__name__)

### 创建了网址 /show/info 和 函数index 的对应关系
### 以后用户在浏览器上访问 /show/info，网站自动执行 index

@app.route("/show/info")
def index():
    return "中国联通"

if __name__ == '__main__':
    app.run()
```
**返回网页**：
```python
from flask import Flask,render_template

app = Flask(__name__)

@app.route("/show/info")
def index():
   ：## Flask内部会自动打开这个文件，并读取内容，将内容给用户返回。
   ：## 默认：去当前项目目录的templates文件夹中找。
    return render_template("index.html")
if __name__ == '__main__':
    app.run()
```

**判断请求**：
```
@app.route('/register', methods=['GET', "POST"])
def register():
    if request.method == "GET":
        return render_template('register.html')
```

**资料**：
欢迎来到 Flask 的世界 — Flask 文档 (2.0.x)：
https://flask-zh.readthedocs.io/
TaleLin/lin-cms-flask: 🎀A simple and practical CMS implememted by Flask：
https://github.com/TaleLin/lin-cms-flask
Flask - Reviews, Pros &amp; Cons | Companies using Flask：
https://stackshare.io/flask
最快入门Python_Flask框架详细教学，从入门到实践，通俗易懂、简单明了！！_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1pb4y1m78N/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
Flask搭建YOLOv5最新支持上传视频图片检测的目标检测平台_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1eu411r7Qu/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
Flask 实现登录功能 - 知乎：
https://zhuanlan.zhihu.com/p/226731276
Python|Flask实现登录功能：
https://mp.weixin.qq.com/s?__biz=MzI5MTQ5NDY1MA==&mid=2247492104&idx=1&sn=8ca9212af7d37eb50d32ac89510fd84a&chksm=ec0d6d9ddb7ae48b9604d39e304c81a5b9a6e3e5b59147c826f621174d6dce1023735301d091&scene=27
flask - 标签 - renpingsheng - 博客园：
https://www.cnblogs.com/renpingsheng/tag/flask/
Flask搭建微电影视频网站 - 吾星喵乐分享：
https://blog.starmeow.cn/feature/3/
GayanRuchiranga/Flask-File-Manager：
https://github.com/GayanRuchiranga/Flask-File-Manager
Python-flask视频网站搭建_哔哩哔哩_bilibili：
https://www.bilibili.com/video/av93184431/
Flask之flask-SQLAlchemy的使用 - 百度文库：
https://wenku.baidu.com/view/c5fe0928874769eae009581b6bd97f192279bf03.html
欢迎来到 Flask 的世界 — Flask 中文文档 (2.0.2)：
https://dormousehole.readthedocs.io/en/latest/
狗书——第一、二章记录 - 知乎：
https://zhuanlan.zhihu.com/p/54523678
hzt1234hf/CloudDisk: 基于Flask和React实现的网页端云网盘：
https://github.com/hzt1234hf/CloudDisk
alex-lt-kong/file-manager: A web-based file manager developed using Python(Flask) and ReactJS：
https://github.com/alex-lt-kong/file-manager
sixhobbits/flask-crud-app: The code for my tutorial on CodeMentor about building a Flask CRUD web app：
https://github.com/sixhobbits/flask-crud-app
python_flask_nebula: nebula-个人云盘系统 python-flask 后台：
https://gitee.com/onezilc/python_flask_nebula?_from=gitee_search
异想之旅轻量网盘服务-精简版: 用Flask开发的网页端网盘服务，适合新手。：
https://gitee.com/yxzlwz/netdisk-server?_from=gitee_search
(38条消息) flask微视频网站（环境准备）_Roy_Allen的博客-CSDN博客：
https://blog.csdn.net/Roy_Allen/article/details/120930018
(38条消息) Flask实现个人博客系统（附源码）_小马 同学的博客-CSDN博客_flask博客源码：
https://blog.csdn.net/qq_40205116/article/details/110265729
GitHub - rickyyangrui/Flask_Movie_Site: 用Flask构建一个微电影视频网站：
https://github.com/rickyyangrui/Flask_Movie_Site
GitHub - istarmeow/FlaskMovie: Flask微电影网站开发：前端+后台：
https://github.com/istarmeow/FlaskMovie
GitHub - keepwonder/SGManager: 一个基于python3+flask的个人图书电影管理搜索系统：
https://github.com/keepwonder/SGManager
Flask Web开发：基于Python的Web应用开发实战 (豆瓣)：
https://book.douban.com/subject/26274202/
HelloFlask - Flask 资源集合地：
https://helloflask.com/
欢迎来到 Flask 的世界 — Flask 中文文档 (2.0.2)：
https://dormousehole.readthedocs.io/en/latest/index.html
PythonWeb框架 Flask_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV14v411K7p3?p=2&spm_id_from=pageDriver
史上最简单的 Python Flask 框架搭建 -Python：
http://www.uml.org.cn/python/2019072321.asp
快速入门 — Flask 文档 - 脚本之家在线手册：
http://shouce.jb51.net/flask0.10/quickstart.html
Flask入门系列(一)–Hello World | 思诚之道：
http://www.bjhee.com/flask-1.html
pythonFlask框架学习 - 简书：
https://www.jianshu.com/p/6452596c4edb
python flask框架详解 - 哔哩哔哩：
https://www.bilibili.com/read/cv10145187/

【最快入门Python_Flask框架详细教学，从入门到实践，通俗易懂、简单明了！！】 https://www.bilibili.com/video/BV1pb4y1m78N/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
【千锋教育Flask2框架从入门到精通，Python全栈开发必备教程】 https://www.bilibili.com/video/BV1mc411j7jT/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef


(38条消息) ImportError: cannot import name ‘BaseResponse‘ from ‘werkzeug.wrappers‘_今天的砖依旧烫手的博客-CSDN博客：
https://blog.csdn.net/m0_51973071/article/details/124111746
python - ModuleNotFoundError: No module named &##39;flask_bootstrap&##39; - Stack Overflow：
https://stackoverflow.com/questions/58312207/modulenotfounderror-no-module-named-flask-bootstrap
(37条消息) AttributeError module ‘time‘ has no attribute ‘clock‘ 解决方法_叶庭云的博客-CSDN博客：
https://blog.csdn.net/fyfugoyfa/article/details/113887935
(38条消息) 关于ImportError: cannot import name ‘MigrateCommand‘ from ‘flask_migrate‘解决_YZL40514131的博客-CSDN博客：
https://blog.csdn.net/YZL40514131/article/details/122954381
google cloud platform - Error &quot;from itsdangerous import json as _json ImportError: cannot import name &##39;json&##39; from &##39;itsdangerous&##39;&quot; - Server Fault：
https://serverfault.com/questions/1094062/error-from-itsdangerous-import-json-as-json-importerror-cannot-import-name-j
(39条消息) keyError:255 （Python连接数据库时）出错的解决办法：_qiongyugaohan的博客-CSDN博客：
https://blog.csdn.net/qiongyugaohan/article/details/82633344
Microsoft Visual C++ 14.0 or greater is required. Get it with &quot;Microsoft C++ Build Tools&quot;的解决办法 - 知乎：
https://zhuanlan.zhihu.com/p/471661231
找不到满足要求的版本pkg-resources == 0.0.0 - VoidCC：
http://cn.voidcc.com/question/p-tmgrfobh-ba.html
(37条消息) python 报错 ModuleNotFoundError: No module named &##39;MySQLdb&##39;_daiqinge的博客-CSDN博客：
https://blog.csdn.net/daiqinge/article/details/88529195
(37条消息) Exception: Install ‘email_validator‘ for email validation support._御前吹水的博客-CSDN博客：
https://blog.csdn.net/not_so_bad/article/details/120936176
python - ImportError: cannot import name &##39;Markup&##39; from &##39;jinja2&##39; - Stack Overflow：
https://stackoverflow.com/questions/71645272/importerror-cannot-import-name-markup-from-jinja2
(39条消息) ubuntu 安装mysqlclient报错ERROR: Failed building wheel for mysqlclient解决办法_echo_g的博客-CSDN博客：
https://blog.csdn.net/weixin_43143281/article/details/103662107


## Gradio

**使用**
安装：`pip install gradio`
简单示例：
```Python
import gradio as gr 
def greet(name): 
	return "Hello name
demo = gr. Interface(fn=greet, inputs="text", outputs="text")

demo.launch()
```
引入gradio库，以gr名称使用。创建一个名为greet的函数，实现传入name，输出Hello + 你的名字的功能。创建使用gr的Interface创建一个实例，传入三个参数fn是方法名称，输入是文本控件、输出也是文本控件，将该实例赋值购给demo。调用demo.launch()方法即可将我们的函数转化为前端应用。 
**更改输入框样式**：
```
import gradio as gr

def greet(name):
    return "Hello " + name + "!"

demo = gr.Interface(fn=greet, inputs=gr.Textbox(lines=2, placeholder="在这里填写你的名字"), outputs="text")

demo.launch()
```
在构建Interface实例时，我们使用Textbox的类替换字符串，可以通过组件属性对输入框进行定制。在这里我们将输入框调节成为两行，并添加默认的文字提示。
**多输入输出**：
```
import gradio as gr


def greet(name, is_morning, temperature):
    salutation = "早上好" if is_morning else "晚上好"
    greeting = f"{salutation} {name}， 今天的温度是 {temperature} （华氏度）"
    celsius = (temperature - 32) * 5 / 9
    return greeting, round(celsius, 2)


demo = gr.Interface(
    fn=greet,
    inputs=["text", "checkbox", gr.Slider(0, 100)],
    outputs=["text", "number"],
)
demo.launch() 

```
当有多个输入与输出时，Interface的输入输出参数传入控件列表，注意保证控件类型与我们需要包装的函数类型一致。

**以图像作为输入输出**：
```
import numpy as np
import gradio as gr


def sepia(input_img):
    sepia_filter = np.array([
        [0.393, 0.769, 0.189],
        [0.349, 0.686, 0.168],
        [0.272, 0.534, 0.131]
    ])
    sepia_img = input_img.dot(sepia_filter.T)
    sepia_img /= sepia_img.max()
    return sepia_img


demo = gr.Interface(sepia, gr.Image(), "image")
demo.launch()
```
输入一张图像，对其进行灰褐色变换，然后输出图像，图像控件的定义既可以使用gr.Image()，也可以使用"image"字符串。

**学习资料**
>https://www.bilibili.com/read/cv19914089/
>https://www.bilibili.com/video/BV1P24y117ZP

Gradio简明教程_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1P24y117ZP/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
【手把手带你实战YOLOv5-入门篇】YOLOv5 Gradio搭建Web GUI_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1LP411Z7nk/?spm_id_from=333.788&vd_source=2bebef67d77d9a55c602507243628b63


## logging
```Python
import logging
import time
import os

## 设置日志格式
log_format = "%(asctime)s - %(levelname)s - %(message)s"

## 设置日志保存文件夹
log_dir = 'logs'
os.makedirs(log_dir, exist_ok=True)

## 获取当前运行脚本的文件名（不带路径和扩展名）
script_name = os.path.splitext(os.path.basename(__file__))[0]

## 创建日志文件名，包含运行程序名和时间戳
log_filename = os.path.join(
    log_dir,
    f"{script_name}_{time.strftime('%Y%m%d_%H%M%S')}.log"
)

## 配置 logging
logging.basicConfig(
    level=logging.INFO,  ## 设置日志等级
    format=log_format,
    handlers=[
        logging.FileHandler(log_filename, encoding='utf-8'),  ## 输出到文件
        logging.StreamHandler()  ## 输出到控制台
    ]
)



## 示例日志输出
logging.debug("这是调试信息（debug）")    ## 默认不会显示，除非 level 设置为 DEBUG
logging.info("这是普通信息（info）")
logging.warning("这是警告信息（warning）")
logging.error("这是错误信息（error）")
logging.critical("这是严重错误信息（critical）")
```




## PyQT

YOLOv5检测界面-PyQt5实现_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1sQ4y1C7Vk/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63




(29条消息) Qt Designer中布局工具的使用_qt designer中的layouts怎么用的_qiu_xingye的博客-CSDN博客：
https://blog.csdn.net/qiu_xingye/article/details/113901402
(29条消息) QT学习笔记（十四）：QLayout的属性介绍_qt layoutleftmargin_Leon_Chan0的博客-CSDN博客：
https://blog.csdn.net/Vichael_Chan/article/details/100138499
(29条消息) PyQt(Python+Qt)学习随笔：布局控件layout的layoutSizeConstraint属性_setsizeconstraint_LaoYuanPython的博客-CSDN博客：
https://blog.csdn.net/LaoYuanPython/article/details/102940602?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7EPayColumn-1-102940602-blog-100138499.235%5Ev32%5Epc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7EPayColumn-1-102940602-blog-100138499.235%5Ev32%5Epc_relevant_default_base3&utm_relevant_index=1
(29条消息) qtdesigner页面布局_qt designer 布局_fresh_nam的博客-CSDN博客：
https://blog.csdn.net/fresh_nam/article/details/126265190
(29条消息) Qt第二十一章：Qt Designer 之 布局_qt designer 布局_苍穹之跃的博客-CSDN博客：
https://blog.csdn.net/wenxingchen/article/details/127923870
Qt以及Qt Designer怎样加入资源文件 - Python - E度笔记：
http://www.edbiji.com/doccenter/showdoc/188/nav/3336.html
介绍 - PyQt 中文教程：
https://maicss.gitbook.io/pyqt-chinese-tutoral/pyqt5/index
Python Qt 简介 | 白月黑羽：
https://www.byhy.net/tut/py/gui/qt_01/
Python Qt 图形界面编程 - PySide2 PyQt5 PyQt PySide_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1cJ411R7bP/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63




Javacr/PyQt5-YOLOv5: PyQt5 implementation of YOLOv5 GUI：
https://github.com/Javacr/PyQt5-YOLOv5

基于深度学习的高精度浣熊检测识别系统（PyTorch+Pyside6+模型） - 哔哩哔哩：
https://www.bilibili.com/read/cv24051601?spm_id_from=333.999.0.0
基于YOLOv5的目标检测系统详解（附MATLAB GUI版代码） - 哔哩哔哩：
https://www.bilibili.com/read/cv23465645?spm_id_from=333.999.0.0
基于深度学习的水果检测与识别系统（Python界面版，YOLOv5实现） - 哔哩哔哩：
https://www.bilibili.com/read/cv23463416?spm_id_from=333.999.0.0
yolov5 +pyqt5 实现图形界面代码解析 - 知乎：
https://zhuanlan.zhihu.com/p/506267198?utm_id=0
YOLOv5检测界面-PyQt5实现_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1sQ4y1C7Vk/?spm_id_from=333.1245.recommend_more_video.3&vd_source=2bebef67d77d9a55c602507243628b63

当YOLO遇上PyQt 【临时抱佛脚必备系列】_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1qu411C7Ab/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
毕设基于yolo的目标检测，深度学习matlab项目，车辆识别+交通标识识别_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1GR4y1N75j/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
【手把手带你实战YOLOv5-入门篇】YOLOv5 Pyside6可视化界面_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1dP411f7kX/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
毕设有救了手把手教你搭建yolov7 pyqt5界面检测系统 cpu环境运行yolov7 pyqt界面_哔哩哔哩_bilibili：
https://www.bilibili.com/video/BV1UT411H7Cm/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
(24条消息) 手把手教你使用YOLOV5训练自己的目标检测模型-口罩检测-视频教程_yolov5模型训练_肆十二的博客-CSDN博客：
https://blog.csdn.net/ECHOSON/article/details/121939535
(28条消息) 【人工智能】基于YOLOv5+PyQt5开发的可视化人数检测系统【附项目报告+演示视频+完整代码】_远哥挺乐的博客-CSDN博客：
https://yuan425.blog.csdn.net/article/details/124563016
当YOLOv5碰上PyQt5 - 迷途小书童的Note迷途小书童的Note：
https://xugaoxiang.com/2021/06/30/yolov5-pyqt5/
图像化工具打包yolov5，生成可执行文件exe - 迷途小书童的Note迷途小书童的Note：
https://xugaoxiang.com/2021/10/13/yolov5-to-exe/
Jai-wei/YOLOv8-PySide6-GUI: YoloSide - YOLOv8 GUI By PySide6：
https://github.com/Jai-wei/YOLOv8-PySide6-GUI
YoloV5可视化上位机 - 赛博智能车论坛：
https://www.protodrive.xyz/d/38-yolov5ke-shi-hua-shang-wei-ji


- 【2024版 PyQt6 Python桌面开发 视频教程(无废话版) 玩命更新中~】 https://www.bilibili.com/video/BV11C4y1P7fj/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
- 【Python Qt 图形界面编程 - PySide2 PyQt5 PyQt PySide】 https://www.bilibili.com/video/BV1cJ411R7bP/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## re——正则表达式

Python中通过内置的 `re` 模块来处理正则表达式。`re` 模块提供了多种函数来处理字符串的模式匹配、搜索和替换。

常用的 `re` 模块函数：

- **`re.match()`**：
   - 用于从字符串的起始位置进行匹配，如果匹配成功则返回匹配对象，否则返回 `None`。
   - 例子：
   ```python
   import re
   result = re.match(r'hello', 'hello world')
   print(result)  <re.Match object>
   ```

- **`re.search()`**：
   - 在字符串中搜索第一个匹配的模式，无论它的位置在哪里。
   - 例子：
   ```python
   import re
   result = re.search(r'world', 'hello world')
   print(result)  <re.Match object>
   ```

- **`re.findall()`**：
   - 返回所有与正则表达式匹配的结果，并以列表形式返回。
   - 例子：
   ```python
   import re
   result = re.findall(r'\d+', '123 abc 456 def')
   print(result)  ['123', '456']
   ```

- **`re.sub()`**：
   - 用于替换字符串中符合正则表达式的部分，可以指定替换的字符串。
   - 例子：
   ```python
   import re
   result = re.sub(r'\d+', 'number', '123 abc 456 def')
   print(result)  'number abc number def'
   ```

- **`re.split()`**：
   - 用于根据正则表达式匹配的部分将字符串分割成列表。
   - 例子：
   ```python
   import re
   result = re.split(r'\s+', 'Hello   World  Python')
   print(result)  ['Hello', 'World', 'Python']
   ```

- **`re.compile()`**：
   - 编译正则表达式模式，返回一个 `Pattern` 对象，可以复用这个对象来提高性能。
   - 例子：
   ```python
   import re
   pattern = re.compile(r'\d+')
   result = pattern.findall('123 abc 456 def')
   print(result)  ['123', '456']
   ```

正则表达式中的分组

通过使用圆括号 `()`，你可以将正则表达式中的一部分进行分组。分组可以让你提取字符串中的子部分。

例子：

```python
import re

匹配日期格式，提取年月日
pattern = r'(\d{4})-(\d{2})-(\d{2})'
result = re.search(pattern, 'Today is 2023-10-08')
if result:
    year, month, day = result.groups()
    print(f'Year: {year}, Month: {month}, Day: {day}')
```

输出：
```
Year: 2023, Month: 10, Day: 08
```

在这个例子中，`(\d{4})` 提取4位的年份，`(\d{2})` 提取2位的月份和日期。

常见正则表达式应用

- **匹配电子邮件地址**：
   ```python
   import re
   pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
   email = "example@test.com"
   if re.match(pattern, email):
       print("Valid email")
   ```

- **匹配电话号码**：
   ```python
   import re
   pattern = r'\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
   phone_number = "+1 (123) 456-7890"
   if re.match(pattern, phone_number):
       print("Valid phone number")
   ```


## Streamlit
Streamlit 部署 YOLOv5 目标检测 - 迷途小书童的Note迷途小书童的Note： https://xugaoxiang.com/2021/08/27/yolov5-streamlit/






## Selenium
python万字博文教你玩嗨selenium库，建议收藏！_selenium好玩_主打Python的博客-CSDN博客：
https://blog.csdn.net/weixin_54733110/article/details/119027005?spm=1001.2014.3001.5506
(3条消息) Windows修改jupyter默认工作路径_呆萌的代Ma-CSDN博客_jupyter修改默认路径：
https://blog.csdn.net/weixin_35757704/article/details/90051869
jupyter 快捷键 - Lowell - 博客园：
https://www.cnblogs.com/liuweida/p/11997065.html
Jupyter Notebook介绍、安装及使用教程 - 简书：
https://www.jianshu.com/p/91365f343585/
如何在Jupyter Notebook中使用Python虚拟环境？ - 简书：
https://www.jianshu.com/p/afea092dda1d
(2 封私信 / 58 条消息) python自动健康信息填报 - 搜索结果 - 知乎：
https://www.zhihu.com/search?type=content&q=python%E8%87%AA%E5%8A%A8%E5%81%A5%E5%BA%B7%E4%BF%A1%E6%81%AF%E5%A1%AB%E6%8A%A5
Selenium 与 ChromeDriver - 简书：
https://www.jianshu.com/p/31c8c9de8fcd
selenium实现自动健康填报 | YangYH408：
https://yangyh408.me/2020/03/18/selenium%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A8%E5%81%A5%E5%BA%B7%E5%A1%AB%E6%8A%A5/


- 【Python + Selenium Web自动化 2022更新版教程 自动化测试 软件测试 爬虫】 https://www.bilibili.com/video/BV1Z4411o7TA/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## Tkinter

Tkinter教程（非常详细）：
http://c.biancheng.net/tkinter/
python开发GUI-----tkinter详细教程 - 知乎：
https://zhuanlan.zhihu.com/p/569960987
(24条消息) Python-Tkinter 基础教程_python tkinter教程_CS_Hoyun的博客-CSDN博客：
https://blog.csdn.net/sinat_28631741/article/details/119676023
(24条消息) Python Tkinter教程（一）——tkinter编程基本步骤、窗口基本属性及Toplevel控件的使用_小康2022的博客-CSDN博客：
https://blog.csdn.net/weixin_62651706/article/details/122815819


## tqdm
```Python
from tqdm import tqdm
import time

a = [(1,2), (3,4), (5,6), (7,8)]
b = {("a","b"), ("c","d"), ("e","f"), ("g","h")}
a_list = list(a)
b_list = list(b)

tasks = range(100)
for c, d in tqdm(a_list):
    print(c, d)
   ： time.sleep(0.1)

for task in tqdm(a, desc="Processing", ncols=100, ascii=True):
   ： 模拟每个任务的处理时间
    print("task:", task)
    time.sleep(0.1)
```

## uvicorn
`uvicorn` 是一个基于 Python 的 **ASGI 服务器**，常用于运行 **FastAPI** 或 **Starlette** 等框架编写的 Web 应用。
它类似于 `gunicorn` 之于 Flask/Django 的 WSGI 应用，但支持异步。

启动：
```python
uvicorn app:app --reload
## `app:app` = `文件名:变量名` → `app.py` 里的 `app` 对象
## `--reload` = 热重载（代码改动后自动重启），开发阶段常用
uvicorn app:app --host 0.0.0.0 --port 8080 --workers 4
## `--host 0.0.0.0` → 对外网开放访问（默认只监听本机）
## `--port 8080` → 指定端口
## `--workers 4` → 启动 4 个进程（生产环境常用）
## `--reload` → 开发模式下热重启
```

## Venv
(24条消息) Python创建、退出虚拟环境(venv、virtualenv、virtualenvwrapper)_posionLight的博客-CSDN博客_virtualenv退出环境：
https://blog.csdn.net/weixin_43463712/article/details/90210108?spm=1001.2101.3001.6650.3&depth_1-

## networkx
图有图属性、节点属性和边属性




```Python
import networkx as nx

## 创建一个空的无向图
G = nx.Graph()

## 添加节点
G.add_node(1)
G.add_nodes_from([2, 3])

## 添加边
G.add_edge(1, 2)
G.add_edges_from([(2, 3), (3, 1)])

print(G.nodes) ： 输出所有节点
print(G.edges) ： 输出所有边

## 为图添加属性
G.graph['name'] = 'My Graph'
G.graph['description'] = 'This is a graph of social network'

## 查看图的属性
print(G.graph)

## 添加节点，并为其设置属性
G.add_node(1, name='Alice', age=30, role='admin')
G.add_node(2, name='Bob', age=25, role='user')

## 查看某个节点的属性
print(G.nodes[1]) ： 输出节点 1 的属性

## 获取某个节点的特定属性
print(G.nodes[1]['name']) ： 输出 'Alice'

## 查看所有节点及其属性
print(G.nodes(data=True))

## 修改节点 1 的属性 
G.nodes[1]['age'] = 31

## 批量添加节点及其属性
G.add_nodes_from([
    (3, {'name': 'Charlie', 'age': 35, 'role': 'moderator'}),
    (4, {'name': 'David', 'age': 28, 'role': 'user'})
])

## 添加一条边，并设置属性
G.add_edge(1, 2, weight=5.0, relation='friend')

## 查看边的属性
print(G.edges[1, 2])

## 获取某条边的特定属性
print(G.edges[1, 2]['weight'])

## 批量添加边及其属性
G.add_edges_from([
    (1, 3, {'weight': 2.5, 'relation': 'colleague'}),
    (2, 4, {'weight': 3.1, 'relation': 'neighbor'})
])

## 修改边 (1, 2) 的属性
G.edges[1, 2]['weight'] = 10.0

## 查看所有边及其属性
print(G.edges(data=True))


## 获取所有节点及其属性
for node, attr in G.nodes(data=True):
    print(f"Node {node} has attributes {attr}")

## 获取所有边及其属性
for u, v, attr in G.edges(data=True):
    print(f"Edge between {u} and {v} has attributes {attr}")


## 转换为dgl图
G_dgl = dgl.from_networkx(G_nx, node_attrs=['name'])




```

**图的存储与合并**
```python

import networkx as nx

## 创建两个图，并分别添加一些节点和边
G1 = nx.Graph()
G1.add_edge('9606.ENSP00000000233', '9606.ENSP00000257770', weight=311)

G2 = nx.Graph()
G2.add_edge('9606.ENSP00000211287', '9606.ENSP00000276079', weight=161)

## 使用字典存储图，图的名字作为键
graphs = {'protein_graph_1': G1, 'protein_graph_2': G2}

## 通过名字找到两张图
graph1 = graphs['protein_graph_1']
graph2 = graphs['protein_graph_2']

## 合并两个图
merged_graph = nx.compose(graph1, graph2)

## 打印合并后图的节点和边
print(f"Merged graph has {merged_graph.number_of_nodes()} nodes and {merged_graph.number_of_edges()} edges.")

## 保存 NetworkX 图为 gpickle 文件
nx.write_gpickle(G, 'networkx_graph.gpickle') 

## 加载保存的图数据 
networkx_graph = nx.read_gpickle('networkx_graph.gpickle')

## 保存为 GraphML 格式，常用于图可视化工具
nx.write_graphml(G, 'networkx_graph.graphml')
## 保存为边列表文件
nx.write_edgelist(G, 'networkx_graph.edgelist')

## 保存和加载以图名字命名的字典
graph_dict = {
    'networkx_graph_1': nx.Graph(),
    'networkx_graph_2': nx.Graph(),
}

with open('graph_dict.pkl', 'wb') as f: 
	pickle.dump(graph_dict, f)

with open('graph_dict.pkl', 'rb') as f: 
	loaded_graph_dict = pickle.load(f)

```

## 爬虫

requist库，访问库（相当于urllib）获取网页代码
lxml库，解析库：分析网页代码
re——正则表达式

requests库:发送http请求,获取响应数据

Scrapy库:适用于大规模快速爬取

其他技术:各种反爬、×path、bs4、正则表送式、pyduery


## 软件打包
Hypackpy 打包 -- 简单粗暴，但是粗中有细
https://www.bilibili.com/video/BV1u5noepE9a


## 学习资料
Effective Python：编写高质量Python代码的90个有效方法（原书第2版）： https://weread.qq.com/web/reader/c2932f9072620d81c29c1ed
Python Tutor - Visualize Python, Java, C, C++, JavaScript, TypeScript, and Ruby code execution： https://pythontutor.com/


精通Python自动化编程： https://weread.qq.com/web/reader/4c132b60722d207d4c18b19

## END

