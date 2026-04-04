---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - JVM
  - Java虚拟机
tags:
  - default
---

一个简单的Java虚拟机入门教程
<!-- more -->
# Java Virtual Machine

## JVM介绍

**是什么**：
JVM（Java Virtual Machine  ，Java虚拟机）

**是什么**：Java程序（二进制字节码）的运行环境
**做什么**：负责加载字节码、管理内存（堆、栈、方法区）、执行垃圾回收（GC）。

**好处**：
屏蔽了底层操作系统与硬件的差异
实现“一次编写，到处运行”
自动内存管理，垃圾回收机制

**学习什么**：
- JVM组成
- 运行流程
- 类加载器
- 垃圾回收
- JVM实践

`JVM ↔️ 操作系统 ↔️ 计算机硬件`

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123217.png)


## Java代码编译与执行
简单程序是由 javac 将代码文本变成字节码再 java 跑；

Java 字节码是一种中间指令集，指令格式统一、跨平台。每条指令代表一个操作，例如加载变量、调用方法、跳转等。JVM 会根据这些指令执行相应操作。
例如：
* `iload_1` 表示加载局部变量表中第1个 int 变量。
* `invokevirtual` 表示调用对象的实例方法。

Java 的执行流程是先将 `.java` 源码文件编译为 `.class` 字节码文件，然后由 JVM 解释或编译执行这些字节码。
大致过程：
- 编译器（javac）将 Java 源码编译成字节码。
- 类加载器将字节码加载到 JVM。
- 解释器（Interpreter）**逐条**解释执行字节码（早期方式）。它启动快，适合执行冷代码，但效率相对较低。
- 现代 JVM（如 HotSpot）引入了JIT（即时编译器），JIT会监控哪些代码执行频繁（热点代码），然后将这些“热点代码”编译为本地机器码，直接执行，提高执行效率。
- 还有个**提前编译器**（AOT，Ahead-Of-Time），AOT是指在运行前将字节码提前编译为本地机器码。Java 9 开始支持 AOT，可以加快启动速度、减少解释阶段开销。适合对启动性能要求高的场景，比如微服务。



## JVM 运行时数据区
(Runtime Data Areas)

**总**：程序计数器、Java虚拟机栈、本地方法栈、Java堆、方法区（JDK1.8后实现为元空间）

**分类**：
- **线程私有区域：** 
	- 程序计数器，记录当前线程执行的字节码指令地址
	- Java虚拟机栈：存储局部变量表、操作数栈、动态链接、方法出口等
	- 本地方法栈，为Native方法服务
- **线程共享区域：** 
	- Java堆：存放对象实例和数组，是垃圾收集的主要区域
	- 方法区：存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码等。JDK 1.8后由元空间 Metaspace 实现，使用本地内存


### 程序计数器
- 线程私有
- 用于记录当正在执行的前线程执行的字节码指令的地址（行号）
- 唯一无OOM的区域


### 栈
（Stack）
每个线程都有自己的栈，用来存储局部变量（包括方法参数）和部分方法调用。栈内存是线程私有的，不同线程的栈是隔离的。

什么是虚拟机栈
Java Virtual machine Stacks (java 虚拟机栈)
每个线程运行时所需要的内存，称为虚拟机栈，先进后出
每个栈由多个栈帧（frame）组成，对应着每次方法调用时所占用的内存
每个线程只能有一个活动栈帧，对应着当前正在执行的那个方法
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123537.png)


什么情况下会导致栈内存溢出？
栈帧过多导致栈内存溢出，典型问题：递归调用
栈帧过大导致栈内存溢出


1. 垃圾回收是否涉及栈内存？
垃圾回收主要指就是堆内存，当栈帧弹栈以后，内存就会释放

2. 栈内存分配越大越好吗？
未必，默认的栈内存通常为1024k
栈帧过大会导致线程数变少，例如，机器总内存为512m，目前能活动的线程数则为512个，如果把栈内存改为2048k，那么能活动的栈帧就会减半

3. 方法内的局部变量是否线程安全？
如果方法内局部变量没有逃离方法的作用范围，它是线程安全的
如果是局部变量引用了对象，并逃离方法的作用范围，需要考虑线程安全

```Java
public static void main(String[] args) {
    StringBuilder sb = new StringBuilder();
    sb.append(1);
    sb.append(2);
    new Thread(()->{
        m2(sb);
    }).start();
}
// 线程安全
public static void m1(){
    StringBuilder sb = new StringBuilder();
    sb.append(1);
    sb.append(2);
    System.out.println(sb.toString());
}
// 线程不安全
public static void m2(StringBuilder sb){
    sb.append(3);
    sb.append(4);
    System.out.println(sb.toString());
}
// 线程不安全
public static StringBuilder m3(){
    StringBuilder sb = new StringBuilder();
    sb.append(5);
    sb.append(6);
    return sb;
}
```





### 堆
存储 Java 对象（类实例）。堆是共享的，所有线程都可以访问堆中的对象。

你能给我详细的介绍下堆吗？
线程共享的区域：主要用来保存对象实例，数组等，当堆中没有内存空间可分配给实例，也无法再扩展时，则抛出OutOfMemoryError异常。

组成：年轻代+老年代
年轻代被划分为三部分，Eden区和两个大小严格相同的Survivor区
老年代主要保存生命周期长的对象，一般是一些老的对象

- 年轻代被划分为三部分，Eden区和两个大小严格相同的Survivor区，根据JVM的策略，在经过几次垃圾收集后，任然存活于Survivor的对象将被移动到老年代区间。
- 老年代主要保存生命周期长的对象，一般是一些老的对象
- 元空间保存的类信息、静态变量、常量、编译后的代码
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123449.png)
避免OOM

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123431.png)
Jdk1.7和1.8的区别
1.7中有有一个永久代，存储的是类信息、静态变量、常量、编译后的代码
1.8移除了永久代，把数据存储到了本地内存的元空间中，防止内存溢出



### 堆栈的区别
- 栈内存一般会用来存储局部变量和方法调用，但堆内存是用来存储Java对象和数组的的。堆会GC垃圾回收，而栈不会。
- 栈内存是线程私有的，而堆内存是线程共有的。
- 两者异常错误不同，但如果栈内存或者堆内存不足都会抛出异常。
     - 栈空间不足：java.lang.StackOverFlowError。
     - 堆空间不足：java.lang.OutOfMemoryError。


javap -v  xx.class    打印堆栈大小，局部变量的数量和方法的参数。

线程1
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123339.png)
线程2
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123341.png)


### 方法区
存储类信息、常量、静态变量等。所有线程共享。

能不能介绍一下方法区
- 方法区(Method Area)是各个线程共享的内存区域
- 主要存储类的信息、运行时常量池
- 虚拟机启动的时候创建，关闭虚拟机时释放
- 如果方法区域中的内存无法满足分配请求，则会抛出OutOfMemoryError: Metaspace

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123850.png)

常量池
可以看作是一张表，虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量等信息
`javap -v Application.class`
查看字节码结构（类的基本信息、常量池、方法定义）
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123915.png)


javap -v  xx.class    打印堆栈大小，局部变量的数量和方法的参数。

线程1
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123339.png)
线程2
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123341.png)



运行时常量池
常量池是`·*.class` 文件中的，当该类被加载，它的常量池信息就会放入运行时常量池，并把里面的符号地址变为真实地址
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224123952.png)




### 直接内存
直接内存：并不属于JVM中的内存结构，不由JVM进行管理。是虚拟机的系统内存
常见于 NIO 操作时，用于数据缓冲区，它分配回收成本较高，但读写性能高，不受 JVM 内存回收管理


举例
Java代码完成文件拷贝

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224124025.png)
常规IO的数据拷贝流程
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224124036.png)

NIO数据拷贝流程
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224124047.png)




### 内存结构


**JVM的内存结构**
- **程序计数器**：每个线程独有，记录当前执行的字节码位置。
- **虚拟机栈**：每个线程独有，存储局部变量、方法调用栈帧。
- **本地方法栈（Native Method Stack）**：供 native 方法使用。栈是线程私有的，方法调用时分配栈帧，存储局部变量、参数，方法结束即释放。栈空间小，访问快。
- **堆（Heap）**：所有线程共享，用于存放对象实例，是垃圾回收的重点区域。堆是所有线程共享的，用于存储对象实例，生命周期长。堆空间大，管理复杂；
- **方法区（Metaspace）（Method Area）**：存储类元信息、常量池、静态变量等。

OOM（OutOfMemoryError）：OOM 是指 JVM 内存溢出，即某个内存区域无法再分配新对象时抛出的错误。
常见 OOM 错误类型：
* Java heap space：堆内存不足
* Metaspace（旧 PermGen）：类元数据空间不足
* GC overhead limit exceeded：GC 频繁仍无法回收足够空间


对象结构：
- 对象头：包含哈希码、GC 分代年龄、锁信息等。
- 实例数据：实际字段（变量）值。
- 对齐填充：为保证对象地址对齐的空白区域。

JVM 有两种对象访问方式：
* 句柄方式：对象引用指向句柄表，再由句柄指向对象实例。
* 直接指针方式：引用直接指向对象地址，更快但内存管理复杂。

### 程序方法，变量的存储
| 名称        | 是内存吗？                  | 特点                             | 控制者       | 举例               |
| --------- | ---------------------- | ------------------------------ | --------- | ---------------- |
| 寄存器       | ✅ 是                    | 速度最快、仅CPU能访问                   | 编译器 & CPU | 保存变量临时值、指令地址     |
| 栈         | ✅ 是                    | 快速分配回收、用于函数调用                  | 系统自动      | 局部变量、函数参数、返回地址   |
| 主内存（堆）    | ✅ 是                    | 手动管理、适合大数据结构                   | 程序员控制     | malloc/new 申请的内存 |
| 比较维度      | 栈（Stack）               | 堆（Heap）                        |           |                  |
| **内存位置**  | 由操作系统自动分配，通常从高地址向低地址增长 | 程序主动申请，通常从低地址向高地址增长            |           |                  |
| **分配方式**  | 自动分配和释放（系统控制）          | 手动申请和释放（程序员控制）                 |           |                  |
| **作用对象**  | 函数的局部变量、参数、返回地址        | 动态分配的对象（如大数组、对象实例）             |           |                  |
| **生命周期**  | 随函数调用自动创建，函数结束自动释放     | 程序员决定释放时间（用 `free` 或 `delete`） |           |                  |
| **访问速度**  | 快（连续内存，CPU优化）          | 慢（不连续，需指针寻址）                   |           |                  |
| **是否易出错** | 不容易（系统管理）              | 容易（忘记释放、内存泄漏、野指针等）             |           |                  |
| **空间大小**  | 通常较小（如几 MB）            | 通常较大（如几 GB）                    |           |                  |


## Java内存模型

### 介绍
JMM（Java Memory Model）是Java虚拟机规范中定义的一种抽象的内存模型，用于屏蔽各种硬件和操作系统的内存访问差异，定义了程序中各种变量（线程共享变量）的访问规则。


- JMM把内存分为两块，一块是私有线程的工作区域（工作内存），一块是所有线程的共享区域（主内存）
- **主内存与工作内存：** 线程对变量的操作必须在工作内存中进行，不能直接读写主内存。
* **主内存**：是 Java 虚拟机（JVM）中所有线程共享的内存区域，存储所有变量的值。
* **工作内存**：每个线程有自己的工作内存，线程的操作是通过工作内存进行的。工作内存保存了该线程使用的变量的副本。

- 线程跟线程之间是相互隔离，线程跟线程交互需要通过主内存
- Java内存模型(Java Memory Model，JMM)，定义了共享内存中多线程程序读写操作的行为规范，通过这些规则来规范对内存的读写操作从而保证指令的正确性
Java 内存模型（Java Memory Model，简称 JMM）是 Java 并发编程的核心部分之一，它定义了 **线程如何共享内存** 和 **并发访问时如何同步**。
JMM 是定义程序中各种变量的访问规则，围绕并发过程中的**可见性**、**原子性**和**有序性**展开。
JMM 的目的是保证在多线程环境下，即使不同线程对共享变量的读写，程序也能按照正确的顺序执行。
> **JMM 的关键问题** 就是：如何保证 **线程间对主内存的可见性** 和 **指令的有序性**。



它主要解决了并发编程中的三大核心问题：**可见性**（保证一个线程对共享变量的修改对其他线程立即可见）、**原子性**（保证特定操作序列不可被中断）、**有序性**（通过禁止特定类型的编译器和处理器指令重排序来保证执行顺序）。




![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224174138.png)


### JMM 主要特性
**可见性（Visibility）**：指当一个线程修改了某个变量的值，其他线程能立刻看到该变量的最新值。Java 内存模型通过以下机制来保证可见性：
- **主内存和工作内存之间的同步**：每个线程对共享变量的修改都会刷新到主内存，其他线程也可以读取到这个修改。
- **`volatile` 关键字**：声明变量为 `volatile` 后，JMM 保证对该变量的写入操作 **立即更新主内存**，且所有线程对该变量的读取都会从主内存中读取。

```java
// 使用 `volatile` 可以确保 `flag` 的修改对所有线程可见。
private volatile boolean flag = false;
```


**原子性（Atomicity）**：指某个操作要么全部执行完毕，要么完全不执行。在 Java 中，**基本数据类型的读写**（如 `int`, `boolean`）是原子操作。对于 **复合操作**（如 `i++`，`x = y + z`），它们不是原子操作，会被拆成多个步骤，可能会受到线程的干扰。

解决原子性问题：
* 使用 `synchronized` 或 `Lock` 来保证 **互斥**，即同一时刻只能有一个线程执行相关代码。
* 使用 `AtomicInteger` 等原子类来进行 **无锁的原子操作**。

```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();  // 原子操作，线程安全
```


**有序性（Ordering）**：指程序中语句执行的顺序是否与代码中写的顺序一致。在 Java 中，由于编译器优化、JIT 编译、CPU 优化等原因，指令的执行顺序可能会发生变化。

解决有序性问题：
* 使用 `synchronized` 保证方法或代码块的 **执行顺序**。
* 使用 `volatile` 变量确保对该变量的写操作在多个线程之间的有序性。

```java
// `volatile` 保证了 **写操作** 和 **读操作** 的顺序性。
private volatile boolean flag = false;
```


### **Happens-Before**
判断数据是否存在竞争、线程是否安全的主要依据。

是 JMM 的核心，保证了多线程之间的操作顺序。

Happens-Before（发生在之前）是 JMM 中最重要的原则之一，它用来描述两个操作的顺序关系。两个操作如果满足 **Happens-Before** 关系，那么第一个操作的结果对第二个操作是可见的。常见的 Happens-Before 关系有：

- **程序顺序规则**：一个线程内，前面的操作总是 Happens-Before 后面的操作。
- **锁定规则**：对一个 `lock` 的解锁操作 Happens-Before 同一个锁的加锁操作。
- **volatile 变量规则**：对 `volatile` 变量的写操作 Happens-Before 对同一个 `volatile` 变量的读操作。

```java
private volatile boolean flag = false;

flag = true;  // 写操作
if (flag) {   // 读操作
    // flag 的修改对其他线程可见
}
```


### **`volatile`**
**volatile 关键字：** 
- 是一种轻量级的同步机制
- 修饰要共享的变量，比如类的成员变量、类的静态成员变量
- 保证可见性：防止编译器等优化发生，每次读取前必须从主内存刷新，写入后必须同步回主内存，能够让一个线程对共享变量的修改对另一个线程可见
- 保证有序性：变量在读、写共享变量时加入不同的内存屏障 Memory Barrier，阻止其他读写操作越过屏障，从而达到阻止指令重排序的效果
- 不保证复合操作的原子性：对于复合操作仍然需要使用其他同步机制，如 `synchronized` 或 `Atomic`。

volatile使用技巧：
- 写变量让volatile修饰的变量的在代码最后位置
- 读变量让volatile修饰的变量的在代码最开始位置

使用示例：
```java
private volatile boolean flag = false;  // 保证所有线程对 flag 变量的修改立即可见
```






### volatile关键字
#### 基本介绍
在多线程环境下，每个线程都会有自己的工作内存（如 CPU 寄存器、缓存等），线程对变量的修改并不一定会立刻反映到其他线程的工作内存中，这就导致了线程之间的**不一致性**。

**`volatile` 的作用就是解决这个问题：** 
它确保了对变量的写操作能立即更新到主内存，**其他线程能看到最新的值**。

`volatile` 是一种轻量级的同步机制，它的作用主要有两个：**可见性** 和 **有序性**
`volatile` 并没有解决线程安全问题，它仅仅保证了变量在多线程间的**可见性**。

保证被修饰变量的内存可见性，
并禁止指令重排序优化，但不保证复合操作的原子性。

一个线程修改了 `volatile` 变量，其他线程可以立即看到这个改动。

第二，禁止指令重排序。
Java 内存模型（JMM）允许编译器、处理器重排指令，以提高程序执行效率。这样虽然代码是按顺序写的，但执行时可能会出现 **指令重排**，导致程序行为不可预期。
它能保证写入操作发生在读操作之前，维护操作顺序。

**`volatile`** 可以 **防止指令重排**，尤其是在赋值操作和读取操作之间的重排序。




#### 局限性

`volatile` 的
**不保证原子性**
`volatile` 仅保证变量的**可见性**，并不能保证操作的**原子性**。例如对于复合操作（如 `i++`、`x = y + z`），`volatile` 无法保证操作是原子性的。
需要注意的是，`volatile` 不能保证原子性，例如 `count++` 就不是线程安全的。
```java
private volatile int count = 0;  
public void increment() {     
	count++;  // 不是原子操作 
}
```
- `count++` 实际上分为 **读取、增加、写入** 3步，这3步操作并不是原子性的，因此如果多个线程同时执行该操作，可能会发生竞争条件（race condition），导致结果错误。
- 为了确保 **原子性**，可以使用 `synchronized` 或 `Lock` 来同步代码块，或者使用 Java 提供的 **原子类**（如 `AtomicInteger`）。


**不适用于所有场景**
- `volatile` 适合用于标志位、状态变量等情况。它非常适合用于 **单一变量的控制**，但是对于复杂操作的协调，它并不是最好的选择。
- 对于需要保证 **多个线程访问共享资源时的完整性**（如计数、累加等），需要使用 **锁** 或 **原子操作**（如 `AtomicInteger`）。

#### 工作原理
底层原理：基于汇编指令的 `lock` 前缀和内存屏障（Memory Barrier）实现。
在写 `volatile` 变量时，会在写操作后插入Store Barrier（写屏障），强制将线程本地工作内存中修改后的数据刷新到主内存；在读 `volatile` 变量时，会在读操作前插入Load Barrier（读屏障），强制使本地工作内存中的缓存失效，直接从主内存读取最新值。同时，内存屏障会阻止屏障两侧的指令进行越界重排序。


“可见性”示例：
```java
private volatile boolean flag = false;

public void method() {
    while (!flag) {
        // 其他操作
    }
}

```
- 在上面的例子中，当 `flag` 变量被某个线程修改为 `true` 后，其他线程能立即看到该变化。
- 如果没有 `volatile`，有可能 `flag` 变量的修改在主内存中未同步，导致其他线程一直认为它是 `false`，导致死循环。

“有序性”示例
```java
private volatile int x = 0;
private volatile int y = 0;

public void write() {
    x = 1;  // 写操作
    y = 2;  // 写操作
}

public void read() {
    if (y == 2) {  // 读操作
        System.out.println(x);  // 读操作
    }
}

```
- 在没有 `volatile` 的情况下，编译器可能会对 `x` 和 `y` 的赋值进行重排序，可能先读取到 `x = 1` 后，再读取到 `y = 2`，导致不符合预期的行为。
- 但有了 `volatile` 后，**JVM 保证 `x = 1` 的赋值先于 `y = 2`**，并且在读取时也确保变量的可见性和顺序。



**保证可见性**：
问题分析：主要是因为在JVM虚拟机中有一个JIT（即时编译器）给代码做了优化。
```Java
while (!stop) {
    i++;
}
// 优化👇↓
while (true) {
    i++;
}
```

解决方案一：在程序运行的时候加入vm参数-Xint表示禁用即时编译器，不推荐，得不偿失（其他程序还要使用）
解决方案二：在修饰stop变量的时候加上volatile,当前告诉 jit，不要对 volatile 修饰的变量做优化



**保证有序性**：

`volatile` 工作的本质是通过内存屏障（memory barrier）来确保 **主内存和工作内存** 之间的同步。
内存屏障的作用是防止指令重排，并且强制刷新缓存中的数据。


- **写入屏障（Store Barrier）**：写入屏障强制将工作内存中的值刷新到主内存，确保其他线程可以读取到最新的值。
- **读取屏障（Load Barrier）**：读取屏障确保从主内存读取最新的值，避免缓存中的旧数据。
`volatile` 通过这两个屏障来保证变量在不同线程间的正确同步。

```Java
int x;
int y;

@Actor
public void actor1() {
    x = 1;
    y = 1;
}

@Actor
public void actor2(II_Result r) {
    r.r1 = y;
    r.r2 = x;
}
```
（注解@Actor保证方法内的代码在同一个线程下执行）

情况一：先执行actor2获取结果→0,0
情况二：先执行actor1中的第一行代码，然后执行actor2获取结果→0,1
情况三：先执行actor1中所有代码，然后执行actor2获取结果→1,1
情况四：先执行actor1中第二行代码，然后执行actor2获取结果（已经发生了指令重排序）→1,0

在变量上添加volatile，禁止指令重排序，则可以解决问题
```Java
int x;
volatile int y;

@Actor
public void actor1() {
    x = 1;
    y = 1;
}

@Actor
public void actor2(II_Result r) {
    r.r1 = y;
    r.r2 = x;
}
```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224174726.png)

```Java
volatile int x;
int y;

@Actor
public void actor1() {
    x = 1;
    y = 1;
}

@Actor
public void actor2(II_Result r) {
    r.r1 = y;
    r.r2 = x;
}

```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224174755.png)



#### **使用场景**

**基本使用案例**：用 volatile 修饰共享变量
```java

static boolean stop = false;
public static void main(String[] args) {
    new Thread(() -> {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        stop = true;
        System.out.println(Thread.currentThread().getName()+"：modify stop to true...");
    },"t1").start();

    new Thread(() -> {
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(Thread.currentThread().getName()+"："+stop);
    },"t2").start();

    new Thread(() -> {
        int i = 0;
        while (!stop) {
            i++;
        }
        System.out.println("stopped... c:"+ i);
    },"t3").start();
}

```

**双重检查锁定（Double-Checked Locking）**
`volatile` 在双重检查锁定模式下用于保证 **延迟初始化的线程安全**。常见于懒汉式单例模式的实现中。
- 通过 `volatile` 确保了 **instance** 的可见性，防止线程重排。
`public class Singleton {     private static volatile Singleton instance;      private Singleton() {}      public static Singleton getInstance() {         if (instance == null) {             synchronized (Singleton.class) {                 if (instance == null) {                     instance = new Singleton();                 }             }         }         return instance;     } }`

    


**标志位**
通常用于控制线程之间的通信或状态标志，确保一个线程对标志的更新能及时反映到其他线程。
- 这里 `flag` 使用 `volatile` 保证了更新后的状态能够立即被其他线程看到。
`private volatile boolean flag = false;  public void setFlag() {     flag = true; }  public void checkFlag() {     while (!flag) {         // 做一些操作     } }`





## 类加载机制

### 执行过程
类加载机制、类装载的执行过程

- 类加载只会进行一次，除非卸载类或重新加载
- 整个生命周期包括了7个阶段：加载、验证、准备、解析、初始化、使用和卸载
- 验证、准备和解析这三个部分统称为连接（linking）


* **加载** (Loading)： 查找和导入class文件，读取字节码文件，生成 Class 对象。通过类的全限定名获取定义此类的二进制字节流，转化为方法区的运行时数据结构，在堆中生成 `java.lang.Class` 对象。
* **验证** (Verification)：确保Class文件的字节流符合当前虚拟机规范要求（包括文件格式、元数据、字节码和符号引用验证）。检查格式、结构、依赖是否合法。保证加载类的准确性。保证系统安全。
* **准备** (Preparation)：为类的静态变量分配内存并初始化为默认值。
* **解析** (Resolution)：将类中（常量池内）的符号引用转换为直接引用（内存地址或偏移量）。
* **链接** (Linking)：验证 (Verification)、准备 (Preparation)、解析 (Resolution)
* **初始化** (Initialization)： 执行类构造器 `<clinit>()` 方法，执行静态代码块，为静态变量赋值，真正初始化类变量和其他资源。根据程序员通过程序制定的主观计划去初始化类变量和其他资源。
- **使用**：JVM 开始从入口方法开始执行用户的程序代码
- **卸载**：当用户程序代码执行完毕后，JVM便开始销毁创建的Class对象。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162434.png)


**加载**
通过类的全名，获取类的二进制数据流。 
解析类的二进制数据流为方法区内的数据结构（Java类模型） 
创建java.lang.Class类的实例，表示该类型。作为方法区这个类的各种数据的访问入口 


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162340.png)

**验证**

验证类是否符合 JVM规范，安全性检查

(1)文件格式验证
(2)元数据验证		
(3)字节码验证	
以上为格式检查，如：文件格式是否错误、语法是否错误、字节码是否合规
(4)符号引用验证
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162344.png)



**准备**
为类变量分配内存并设置类变量初始值
- static变量，分配空间在准备阶段完成（设置默认值），赋值在初始化阶段完成
- static变量是final的基本类型，以及字符串常量，值已确定，赋值在准备阶段完成
- static变量是final的引用类型，那么赋值也会在初始化阶段完成
```Java
public class Application {
    static int b = 10;
    static final int c = 20;
    static final String d = "hello";
    static final Object obj = new Object();
}

```

**解析**
把类中的符号引用转换为直接引用
比如：方法中调用了其他方法，方法名可以理解为符号引用，而直接引用就是使用指针直接指向方法。

方法的机器指令：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162611.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162615.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162618.png)

**初始化**
对类的静态变量，静态代码块执行初始化操作
- 如果初始化一个类的时候，其父类尚未初始化，则优先初始化其父类。
- 如果同时包含多个静态变量和静态代码块，则按照自上而下的顺序依次执行。

**使用**
JVM 开始从入口方法开始执行用户的程序代码
调用静态类成员信息（比如：静态字段、静态方法）
使用new关键字为其创建对象实例

### 类加载器

**类加载器**：类加载器负责将 `.class` 字节码文件加载到 JVM 内存中。加载机制支持**双亲委派模型**。
- 类加载器：用于装载字节码文件(.class文件)

类加载器
JVM只会运行二进制文件，类加载器的作用就是将字节码文件加载到JVM中，从而让Java程序能够启动起来。


- 启动类加载器(BootStrap ClassLoader)：加载JAVA_HOME/jre/lib目录下的库，加载 rt.jar
- 扩展类加载器(ExtClassLoader)：主要加载JAVA_HOME/jre/lib/ext目录中的类
- 应用类加载器(AppClassLoader)：用于加载classPath下的类
- 自定义类加载器(CustomizeClassLoader)：自定义类继承ClassLoader，实现自定义类加载规则。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224124150.png)


### 双亲委派模型
什么是双亲委派模型(Double Parent Delegation)？

双亲委派模型是一种类加载机制。
当一个类加载器收到类加载请求时，它首先不会自己尝试去加载这个类，而是将请求委派给父类加载器去完成，依次向上一直委派到顶层的启动类加载器（Bootstrap ClassLoader）。只有当父加载器在它的搜索范围中找不到该类时，子加载器才会尝试自己去加载。

设计原因：
保证基础类的安全性，防止Java核心API（如 `java.lang.Object`）的安全性，被用户自定义的同名类篡改或覆盖。
保证基础类的全局唯一性，避免类的重复加载，当父类已经加载后则无需重复加载，保证唯一性。


Tomcat是如何打破双亲委派模型的？
- **JDBC的SPI机制**：
	- 核心接口（如 `java.sql.Driver`）由启动类加载器加载，但具体的数据库驱动实现类在第三方厂商的Jar包中，启动类加载器无法触及。
	- 因此，DriverManager通过获取**线程上下文类加载器**（Thread Context ClassLoader，通常是Application ClassLoader）来加载具体的驱动实现类。实现父加载器调用子加载器的代码
- 这是一种父类加载器请求子类加载器完成类加载的行为，打破了双亲委派自下而上的委派规则。

JDBC的SPI机制是如何打破双亲委派模型的？
- **Tomcat**：为了实现不同Web应用之间的类库隔离，Tomcat自定义了 `WebappClassLoader` 并重写了 `loadClass` 方法。
- 它会优先加载当前Web应用目录（`/WEB-INF/classes` 和 `/WEB-INF/lib`）下的类，如果找不到再委派给父类加载器，这直接颠覆了双亲委派中“优先委派给父类”的逻辑。

举例，保证类库API不会被修改：
由于是双亲委派的机制，java.lang.String的在启动类加载器得到加载，因为在核心jre库中有其相同名字的类文件，但该类中并没有main方法。这样就能防止恶意篡改核心API库。
```Java
package java.lang;
public class String {
    public static void main(String[] args) {
        System.out.println("demo info");
    }
}
```
此时执行main函数，会出现异常，在类 java.lang.String 中找不到 main 方法
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224124239.png)





## 垃圾回收
VM 使用自动内存管理机制，最核心的是 **垃圾回收（GC）**。

### 对象存活判定
什么时候可以被垃圾器回收
JVM是如何判断一个对象是否可以被回收的？
GC Roots具体包含哪些类型的对象？

如果一个或多个对象没有任何的引用指向它了，那么这个对象现在就是垃圾
如果定为了垃圾，则有可能会被垃圾回收器回收。



判断对象是否存活。定位垃圾的方式有两种
- 引用计数法（旧）
- 可达性分析算法（Reachability Analysis）（新）


**引用计数法**：
- 一个对象被引用了一次，在当前的对象头上递增一次引用次数，如果这个对象的引用次数为0，代表这个对象可回收
- 当对象间出现了循环引用的话，则引用计数法就会失效，引发内存泄露


**可达性分析算法** (Reachability Analysis)
以GC Roots为起始点，根据引用关系向下搜索，搜索走过的路径称为引用链（Reference Chain）。如果某个对象到GC Roots间没有任何引用链相连，则证明此对象不可用，可以被回收。
GC Roots主要包含以下类型：虚拟机栈（栈帧中的本地变量表）中引用的对象、方法区中类静态属性引用的对象、方法区中常量引用的对象、本地方法栈中JNI（即Native方法）引用的对象、Java虚拟机内部的引用（如基本数据类型对应的Class对象、常驻异常对象等）、所有被同步锁（synchronized）持有的对象。

- 现在的虚拟机采用的都是通过可达性分析算法来确定哪些内容是垃圾。
- Java  虚拟机中的垃圾回收器采用可达性分析来探索所有存活的对象
- 扫描堆中的对象，看是否能够沿着 GC Root 对象 为起点的引用链找到该对象，找不到，表示可以回收
- 以 GC Roots（虚拟机栈中引用的对象、方法区静态属性/常量引用的对象、本地方法栈中 JNI 引用的对象等）为起点向下搜索，不可达的对象即可回收。
- 哪些对象可以作为 GC Root ?
	- 虚拟机栈（栈帧中的本地变量表）中引用的对象
	- 方法区中类静态属性引用的对象
	- 方法区中常量引用的对象
	- 本地方法栈中 JNI（即一般说的 Native 方法）引用的对象



**引用计数法失效案例**：
```Java
public class Demo {
    Demo instance;
    String name;
    public Demo(String name){
        this.name = name;
    }
}

Demo a = new Demo("a");
Demo b = new Demo("b");
a.instance = b;
b.instance = a;

a = null;
b = null;

```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162839.png)


**可达性分析算法示例**：

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224162914.png)
X,Y这两个节点是可回收的

```Java
public static  void main(String[] args) {
    Demo demo = new Demo();
    demo = null;
}

public static Demo a;
public static  void main(String[] args) {
    Demo b = new Demo();
    b.a = new Demo();
    b = null;
}

public static final Demo a = new Demo();
public static  void main(String[] args) {
    Demo demo = new Demo();
    demo = null;
}
```

### 四种引用
强引用、软引用、弱引用、虚引用

强引用、软引用、弱引用、虚引用的区别?
强引用：只要所有 GC Roots 能找到，就不会被回收
软引用：需要配合SoftReference使用，当垃圾多次回收，内存依然不够的时候会回收软引用对象
弱引用：需要配合WeakReference使用，只要进行了垃圾回收，就会把弱引用对象回收
虚引用：必须配合引用队列使用，被引用对象回收时，会将虚引用入队，由 Reference Handler 线程调用虚引用相关方法释放直接内存



强引用：只有所有 GC Roots 对象都不通过【强引用】引用该对象，该对象才能被垃圾回收
GC Root →User对象：`User user = new User();`

软引用：仅有软引用引用该对象时，在垃圾回收后，内存仍不足时会再次出发垃圾回收
GC Root →SoftReference对象---→User对象：
```Java
User user = new User();
SoftReference softReference = new SoftReference(user);

```
弱引用：仅有弱引用引用该对象时，在垃圾回收时，无论内存是否充足，都会回收弱引用对象
GC Root →WeakReference对象---→User对象：
```Java
User user = new User();
WeakReference weakReference = new WeakReference(user);

```
延伸话题：ThreadLocal内存泄漏问题
```Java
static class Entry extends WeakReference<ThreadLocal<?>> {
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v; //强引用，不会被回收
    }
}

```
虚引用：必须配合引用队列使用，被引用对象回收时，会将虚引用入队，由 Reference Handler 线程调用虚引用相关方法释放直接内存
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164200.png)

```Java
User user = new User();
ReferenceQueue referenceQueue = new ReferenceQueue();
PhantomReference phantomReference = new PhantomReference(user,queue);

```











### 经典垃圾回收算法
* 标记-清除 (Mark-Sweep)： 
	* 分为标记存活对象和清除死亡对象两个阶段。
	* 根据可达性分析算法得出的垃圾进行标记，对这些标记为可回收的内容进行垃圾回收
	* 优点是实现简单，不需要移动对象；效率高，
	* 缺点是执行效率不稳定（随对象数量增长而降低），且会产生大量不连续的内存碎片。但会产生内存碎片，让内存不连续。
- 标记-复制（Mark-Copy）：
	- 将内存按容量划分为大小相等的两块，每次只使用其中一块。存活对象复制到另一块，再清理已使用过的内存。
	- 将原有的内存空间一分为二，每次只用其中的一块，将存活对象都向内存另一端移动，然后将该内存空间清空，交换两个内存的角色。
	- 优点：
		- 优点是实现简单、运行高效、无内存碎片；
		- 在垃圾对象多的情况下，效率较高
		- 清理后，内存无碎片
	- 缺点：
		- 缺点是可用内存缩减为原来的一半（或需配合Survivor区调配），且在对象存活率较高时复制开销极大。
		- 对象需要移动，效率低。
		- 分配的2块内存空间，在同一个时刻，只能使用一半，内存使用率较低
	- 年轻代 Survivor 区使用此算法，Eden:Survivor0:Survivor1 = 8:1:1
* 标记-整理 (Mark-Compact)： 
	* 标记过程与“清除”算法一样，但后续将所有存活对象向内存空间一端移动，然后直接清理掉边界以外的内存。
	* 优点是无内存碎片，内存利用率高；移动存活对象，解决碎片问题
	* 缺点是移动存活对象并更新引用是一项极重的操作，必须暂停用户线程（Stop The World），效率最低。解决了标记清除算法的碎片化的问题，同时，标记压缩算法多了一步，对象移动内存位置的步骤，其效率也有有一定的影响。
	* 老年代常用



**标记清除算法**
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163137.png)


**标记整理算法**
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163111.png)


**复制算法**
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163128.png)


### 分代垃圾回收算法
- 分代回收：
	- 收集（新生代、老年代）来优化回收效率。对象分配在堆中，年轻对象先进入 Eden 区；若经历多次 GC 后仍存活，则晋升到老年代。



一、堆的区域划分
- 堆被分为了两份：新生代和老年代【1：2】
- 对于新生代，内部又被分为了三个区域。Eden区，幸存者区survivor(分成from和to)【8：1：1】
二、对象回收分代回收策略
- 新创建的对象，都会先分配到eden区
- 当伊甸园内存不足，标记伊甸园与 from（现阶段没有）的存活对象
- 将存活对象采用复制算法复制到to中，复制完毕后，伊甸园和 from 内存都得到释放
- 经过一段时间后伊甸园的内存又出现不足，标记eden区域to区存活的对象，将其复制到from区
- 当幸存区对象熬过几次回收（最多15次），晋升到老年代（幸存区内存不足或大对象会提前晋升）

MinorGC、 Mixed GC 、 FullGC的区别是什么
- MinorGC【young GC】发生在新生代的垃圾回收，暂停时间短（STW）
- Mixed GC 新生代 + 老年代部分区域的垃圾回收，G1 收集器特有
- FullGC： 新生代 + 老年代完整垃圾回收，暂停时间长（STW），应尽力避免



工作机制

在java8时，堆被分为了两份：新生代和老年代【1：2】
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163233.png)

对于新生代，内部又被分为了三个区域。
伊甸园区Eden，新生的对象都分配到这里
幸存者区survivor(分成from和to)
Eden区，from区，to区【8：1：1】

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163241.png)
- 新创建的对象，都会先分配到eden区
- 当伊甸园内存不足，标记伊甸园与 from（现阶段没有）的存活对象
- 将存活对象采用复制算法复制到 to 中，复制完毕后，伊甸园和 from 内存都得到释放
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163300.png)
- 经过一段时间后伊甸园的内存又出现不足，标记eden区域to区存活的对象，将存活的对象复制到from区
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163338.png)

- 当幸存区对象熬过几次回收（最多15次），晋升到老年代（幸存区内存不足或大对象会导致提前晋升）
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163347.png)

MinorGC【young GC】发生在新生代的垃圾回收，暂停时间短（STW）
Mixed GC 新生代 + 老年代部分区域的垃圾回收，G1 收集器特有
FullGC： 新生代 + 老年代完整垃圾回收，暂停时间长（STW），应尽力避免

名词解释
STW（Stop-The-World）：暂停所有应用程序线程，等待垃圾回收的完成







### 垃圾回收器

- G1（Garbage First），经典收集器，是 Java 7 引入的垃圾回收器，目标是低延迟、高吞吐。它将堆划分为多个 Region，不再区分 Eden/Old 明确边界，通过并发标记、复制回收等机制，按需收集。支持并发标记、可预测 GC 停顿时间，适合大堆内存和延迟敏感应用。

* 主流垃圾回收器
    * CMS (Concurrent Mark Sweep)： 以获取最短回收停顿时间为目标。包含四个步骤：初始标记（STW）、并发标记、重新标记（STW）、并发清除。缺点是对 CPU 敏感，且产生内存碎片，可能导致 Concurrent Mode Failure 从而退化为 Serial Old。
    * G1 (Garbage-First)： 将堆划分为多个大小相等的 Region，跟踪每个 Region 里面的垃圾堆积的价值大小，在后台维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的 Region。包含：初始标记、并发标记、最终标记、筛选回收。

**G1垃圾回收器与CMS的最大区别**：1. **空间整合**：G1整体基于“标记-整理”算法，局部（两个Region之间）基于“复制”算法，不会产生内存碎片。2. **可预测的停顿**：G1建立可预测的停顿时间模型，能够让使用者明确指定在一个长度为M毫秒的时间片段内，消耗在垃圾收集上的时间不得超过N毫秒，G1会根据此目标优先回收价值收益最大的Region。

在jvm中，实现了多种垃圾收集器，包括：
- 串行垃圾收集器：Serial GC、Serial Old GC
- 并行垃圾收集器：Parallel Old GC、ParNew GC
- CMS（并发）垃圾收集器：CMS GC，作用在老年代
- G1垃圾收集器，作用在新生代和老年代




**串行垃圾收集器**
Serial和Serial Old串行垃圾收集器，是指使用单线程进行垃圾回收，堆内存较小，适合个人电脑
- Serial 作用于新生代，采用复制算法
- Serial Old 作用于老年代，采用标记-整理算法
垃圾回收时，只有一个线程在工作，并且java应用中的所有线程都要暂停（STW），等待垃圾回收的完成。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163457.png)

**并行垃圾收集器**
Parallel New和Parallel Old是一个并行垃圾回收器，JDK8默认使用此垃圾回收器
- Parallel New作用于新生代，采用复制算法
- Parallel Old作用于老年代，采用标记-整理算法
垃圾回收时，多个线程在工作，并且java应用中的所有线程都要暂停（STW），等待垃圾回收的完成。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163516.png)

**CMS（并发）垃圾收集器**
CMS全称 Concurrent Mark Sweep，是一款并发的、使用标记-清除算法的垃圾回收器，该回收器是针对老年代垃圾回收的，是一款以获取最短回收停顿时间为目标的收集器，停顿时间短，用户体验就好。其最大特点是在进行垃圾回收时，应用仍然能正常运行。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163553.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163545.png)






### CMS垃圾回收器
讲一讲CMS垃圾回收器的工作流程，它可能会引发什么严重问题（如Concurrent Mode Failure）？
CMS（Concurrent Mark Sweep）是一种以获取最短回收停顿时间为目标的回收器。

工作流程分为四个步骤：
- **初始标记**（STW，仅标记GC Roots能直接关联的对象，速度极快）、
- **并发标记**（与用户线程并发执行，进行整个GC Roots Tracing）、
- **重新标记**（STW，修正并发标记期间因用户程序继续运行而导致标记变动的那一部分记录）、
- **并发清除**（与用户线程并发执行，清理死亡对象）。

**可能引发的严重问题**：Concurrent Mode Failure（并发模式失败）。由于CMS在并发清理阶段用户线程仍在运行，会产生新的“浮动垃圾”，且CMS基于标记-清除算法会产生内存碎片。当老年代没有足够连续空间分配给大对象，或者老年代预留的空间无法满足并发期间程序的分配需求时，就会触发该错误，导致JVM临时冻结用户线程，退化使用Serial Old收集器进行老年代的完全STW垃圾收集，造成极长的停顿。


### G1垃圾回收器

**内存划分**：
G1打破了传统的物理分代，将整个Java堆划分为多个大小相等的独立区域（Region），每个Region可以根据需要扮演Eden、Survivor或Old空间，此外还有专门存储大对象的Humongous区域。

**回收过程**：包含年轻代GC（Young GC）、并发标记周期（初始标记、根区域扫描、并发标记、最终标记、清理阶段）和混合收集（Mixed GC，回收所有年轻代和部分回收价值最高的老年代Region）。


- 应用于新生代和老年代，在JDK9之后默认使用G1
- 划分成多个区域，每个区域都可以充当 eden，survivor，old， humongous，其中 humongous 专为大对象准备
- 采用复制算法
- 响应时间与吞吐量兼顾
- 分成三个阶段：新生代回收、并发标记、混合收集
- 如果并发失败（即回收速度赶不上创建新对象速度），会触发 Full GC
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163636.png)

Young Collection(年轻代垃圾回收)
- 初始时，所有区域都处于空闲状态
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163746.png)
- 创建了一些对象，挑出一些空闲区域作为伊甸园区存储这些对象
- 当伊甸园需要垃圾回收时，挑出一个空闲区域作为幸存区，用复制算法复制存活对象，需要暂停用户线程
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163654.png)
- 随着时间流逝，伊甸园的内存又有不足
- 将伊甸园以及之前幸存区中的存活对象，采用复制算法，复制到新的幸存区，其中较老对象晋升至老年代
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163719.png)
Young Collection + Concurrent Mark (年轻代垃圾回收+并发标记)  
- 当老年代占用内存超过阈值(默认是45%)后，触发并发标记，这时无需暂停用户线程
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163821.png)
- 并发标记之后，会有重新标记阶段解决漏标问题，此时需要暂停用户线程。
- 这些都完成后就知道了老年代有哪些存活对象，随后进入混合收集阶段。此时不会对所有老年代区域进行回收，而是根据暂停时间目标优先回收价值高（存活对象少）的区域（这也是 Gabage First 名称的由来）。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163835.png)

Mixed  Collection (混合垃圾回收)  
混合收集阶段中，参与复制的有 eden、survivor、old
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163851.png)
复制完成，内存得到释放。进入下一轮的新生代回收、并发标记、混合收集
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163901.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224163909.png)



### 跨代引用
什么是跨代引用？JVM是如何通过记忆集（Remembered Set）和卡表（Card Table）解决跨代引用问题的？
**跨代引用**是指某个内存区域（如老年代）中的对象引用了另一个内存区域（如新生代）中的对象。在进行Minor GC时，为了确定新生代对象是否存活，除了扫描年轻代的GC Roots，还必须扫描老年代来排查跨代引用，这会导致全堆扫描，效率极低。**解决方案**：JVM引入了**记忆集**（Remembered Set）这种数据结构，用于记录从非收集区域指向收集区域的指针集合。**卡表**（Card Table）是记忆集的具体实现方式。它将堆内存划分成一个个大小固定的内存块（卡页，Card Page），并维护一个字节数组（卡表）。如果某个卡页内的对象存在跨代引用（如老年代对象引用了新生代对象），则将卡表数组对应的元素标记为1（称为“脏卡”）。发生Minor GC时，垃圾收集器只需扫描卡表中被标记为“脏卡”的内存区域，从而避免了扫描整个老年代，大幅提升了GC效率。



## JVM调优
### JVM参数设置
jar包部署在启动参数设置
war包部署在tomcat中设置

**jar包部署在启动参数设置**：通常在linux系统下直接加参数启动springboot项目
- 例如：`nohup java -Xms512m -Xmx1024m -jar xxxx.jar --spring.profiles.active=prod &`
- nohup  :  用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行
- 参数 `&`  ：让命令在后台执行，终端退出后命令仍旧执行。

**war包部署在tomcat中设置**：修改TOMCAT_HOME/bin/catalina.sh文件
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164253.png)




### JVM 调优参数
oracle官网的详细说明： https://www.oracle.com/java/technologies/javase/vmoptions-jsp.html 


请列举你熟悉的JVM调优核心参数及其实际应用场景（如-Xms, -Xmx, -Xmn, -XX:MetaspaceSize等）。
- `-Xms` 和 `-Xmx`：设置堆的初始和最大内存。场景：通常设置为相同值（如 `-Xms4g -Xmx4g`），以避免应用运行期间堆内存频繁扩容和收缩带来的系统抖动与性能开销。
- `-Xmn`：设置年轻代大小。场景：直接影响Minor GC的频率和对象晋升老年代的概率，高并发短生命周期对象多的场景需适当调大。
- `-XX:MetaspaceSize`：设置元空间初始大小。场景：默认值通常较小（约21MB），应用启动时加载大量类极易触发Full GC进行扩容，建议线上环境直接调大（如设为256M）。
- `-XX:MaxTenuringThreshold`：对象晋升老年代的年龄阈值。场景：针对存在较多中等生命周期对象的场景，可适当调大以将其留在年轻代被清理，减轻老年代压力。
- `-XX:+UseG1GC`：启用G1垃圾收集器。场景：适用于大内存（通常超8G）且对停顿时间（`-XX:MaxGCPauseMillis`）有严格要求的系统。

对于JVM调优，主要就是调整年轻代、老年代、元空间的内存空间大小及使用的垃圾回收器类型。

- 设置堆空间大小：`-Xms` / `-Xmx`
- 虚拟机栈的设置
- 年轻代中Eden区和两个Survivor区的大小比例
- 年轻代晋升老年代阈值
- 设置垃圾回收器类型
- 年轻代大小：`-Xmn`
- 设置老年代大小
- 元空间大小：`-XX:MetaspaceSize` / `-XX:MaxMetaspaceSize`




**设置堆空间大小**
设置堆的初始大小和最大大小
```Java
-Xms：设置堆的初始化大小
-Xmx：设置堆的最大大小

-Xms:1024
-Xms:1024k
-Xms:1024m
-Xms:1g

```
- 不指定单位，默认为字节
- 指定单位，按照指定的单位设置
- 为了防止垃圾收集器在初始大小和最大大小之间自动扩展而产生额外的时间，通常把最大、初始大小设置为相同的值。
- 堆空间设置多少合适？
	- 最大大小的默认值是物理内存的1/4，初始大小是物理内存的1/64
	- 堆太小，可能会频繁的导致年轻代和老年代的垃圾回收，会产生stw，暂停用户线程
	- 堆内存大肯定是好的，存在风险，假如发生了fullgc,它会扫描整个堆空间，暂停用户线程的时间长
	- 设置参考推荐：尽量大，也要考察一下当前计算机其他程序的内存使用情况

**虚拟机栈的设置**
虚拟机栈的设置：每个线程默认会开启1M的内存，用于存放栈帧、调用参数、局部变量等，但一般256K就够用。通常减少每个线程的堆栈，可以产生更多的线程，但这实际上还受限于操作系统。

-Xss   对每个线程stack大小的调整,-Xss128k

**年轻代中Eden区和两个Survivor区的大小比例**
设置年轻代中Eden区和两个Survivor区的大小比例。该值如果不设置，则默认比例为8:1:1。通过增大Eden区的大小，来减少YGC发生的次数，但有时我们发现，虽然次数减少了，但Eden区满的时候，由于占用的空间较大，导致释放缓慢，此时STW的时间较长，因此需要按照程序情况去调优。
-XXSurvivorRatio=8，表示年轻代中的分配比率：survivor:eden = 2:8



**年轻代晋升老年代阈值**，默认为15，取值范围0-15
-XX:MaxTenuringThreshold=threshold


**设置垃圾回收收集器**
通过增大吞吐量提高系统性能，可以通过设置并行垃圾回收收集器。

-XX:+UseParallelGC
-XX:+UseParallelOldGC
-XX:+UseG1GC




## JVM问题排查
性能监控与故障定位

解决线上 CPU 飙升或 OOM 的思路。

* 常用排查命令
    * `jps`：查看Java进程及PID。
    * `jstat`：监视类装载、内存、垃圾收集等运行数据（如 `jstat -gcutil <pid>`）。
    * `jinfo`：实时查看和调整虚拟机各项参数。
    * `jmap`：生成堆转储快照（dump文件），命令如 `jmap -dump:format=b,file=heap.hprof <pid>`。
    * `jstack`：生成虚拟机当前时刻的线程快照（排查死锁、死循环）。

* 高频排查场景分析
    * CPU 100% 排查思路： `top` 找出高占用进程 -> `top -Hp <pid>` 找出高占用线程 -> 将线程ID转为16进制 -> 使用 `jstack <pid>` 查找对应的 16进制线程号，定位具体代码行。
    * OOM 排查思路： 查看错误日志区分是 Heap Space 还是 Metaspace OOM -> 使用 `jmap` 导出 dump 文件 -> 使用 MAT (Memory Analyzer Tool) 或 JProfiler 分析 dump 文件，找到占用内存最大的实例（GC Roots 引用链），定位内存泄漏代码。现代排查多使用 Arthas 工具。

### JVM工具

**命令工具**
- jps：进程状态信息。
- jstack：查看java进程内线程的堆栈信息。通过 `jstat -gc <PID>` 实时监控GC状态，若发现老年代内存（O列）持续增长且Full GC（FGC列）次数飙升，初步判定存在泄漏。
- jmap：查看堆转信息。通过 `jmap -histo:live <PID>` 快速在线查看内存中实例数量最多、占用最大的类，辅助快速定位；或用于生成dump文件。
- jhat：堆转储快照分析工具。
- jstat：JVM统计监测工具。
- **Arthas（阿尔萨斯）**：线上排查利器。常用命令组合：使用 `dashboard` 实时总览系统整体的CPU、内存和线程状况；遇到内存飙升时，使用 `heapdump` 导出快照；如果伴随CPU升高，使用 `thread -n 3` 抓取最耗CPU的线程堆栈；针对疑似引发泄漏的方法，使用 `watch` 或 `trace` 动态观测方法的入参、返回值及执行耗时，无需重启服务即可完成深度诊断。



**可视化工具**
- jconsole：用于对jvm的内存，线程，类 的监控
- VisualVM：能够监控线程，内存情况

**jps**
进程状态信息
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164609.png)

**jstack**
`jstack [option] <pid>`
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164614.png)

**jmap**
用于生成堆转内存快照、内存使用情况
```


jmap -heap pid   显示Java堆的信息
jmap -dump:format=b,file=heap.hprof pid
- format=b表示以hprof二进制格式转储Java堆的内存
- file=<filename>用于指定快照dump文件的文件名。
```

知识小贴士
它是一个进程或系统在某一给定的时间的快照。比如在进程崩溃时，甚至是任何时候，我们都可以通过工具将系统或某进程的内存备份出来供调试分析用。dump文件中包含了程序运行的模块信息、线程信息、堆栈调用信息、异常信息等数据，方便系统技术人员进行错误排查。

**jstat**
是JVM统计监测工具。可以用来显示垃圾回收信息、类加载信息、新生代统计信息等。
①：总结垃圾回收统计
jstat -gcutil pid
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164715.png)
②：垃圾回收统计
jstat -gc pid
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164722.png)

**jconsole**
用于对jvm的内存，线程，类 的监控，是一个基于 jmx 的 GUI 性能监控工具
打开方式：java 安装目录 bin目录下 直接启动 jconsole.exe 就行
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164737.png)


**VisualVM**
能够监控线程，内存情况，查看方法的CPU时间和内存中的对 象，已被GC的对象，反向查看分配的堆栈

打开方式：java 安装目录 bin目录下 直接启动 jvisualvm.exe就行
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164746.png)
监控程序运行情况
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164752.png)
查看运行中的dump
Dump文件是进程的内存镜像。可以把程序的执行状态通过调试器保存到dump文件中
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164800.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164803.png)



### 内存泄露排查思路

如果发生OOM（Out of Memory），你通常的处理流程和使用的排查分析工具是什么？
- 保护现场：依赖JVM启动时配置的 `-XX:+HeapDumpOnOutOfMemoryError` 和 `-XX:HeapDumpPath` 参数自动生成的Heap Dump文件，并保留当时的系统监控图表。
- 快速恢复：将故障节点从网关/负载均衡摘除，保留现场（或直接重启服务）以快速恢复线上业务。
- 定位OOM类型：查看日志确认是 `Java heap space`（堆内存溢出）、`Metaspace`（元空间溢出）、还是 `unable to create new native thread`（无法创建新线程）。
- 深度分析：使用MAT或JProfiler加载Dump文件，分析对象的保留集（Retained Set），排除弱引用和软引用，追踪强引用链至GC Roots，定位导致内存溢出的具体对象（如未分页的巨量数据库查询结果、未清理的ThreadLocal变量等）。
- 验证：在测试环境复现并压测修复后的代码。
* 

内存泄漏通常是指堆内存，通常是指一些大对象不被回收的情况
1、通过jmap或设置jvm参数获取堆内存快照dump
2、通过工具， VisualVM去分析dump文件，VisualVM可以加载离线的dump文件
3、通过查看堆信息的情况，可以大概定位内存溢出是哪行代码出了问题
4、找到对应的代码，通过阅读上下文的情况，进行修复即可



![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164821.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164828.png)
获取堆内存快照dump
VisualVM去分析dump文件
通过查看堆信息的情况，定位内存溢出问题


1、通过jmap指定打印他的内存快照dump(Dump文件是进程的内存镜像。可以把程序的执行状态通过调试器保存到dump文件中)

使用jmap命令获取运行中程序的dump文件
jmap -dump:format=b,file=heap.hprof pid
使用vm参数获取dump文件
有的情况是内存溢出之后程序则会直接中断，而jmap只能打印在运行中的程序，所以建议通过参数的方式的生成dump文件
-XX:+HeapDumpOnOutOfMemoryError-XX:HeapDumpPath=/home/app/dumps/

2、通过工具， VisualVM去分析dump文件，VisualVM可以加载离线的dump文件
文件-->装入--->选择dump文件即可查看堆快照信息
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164858.png)

3、通过查看堆信息的情况，可以大概定位内存溢出是哪行代码出了问题
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164905.png)

4、找到对应的代码，通过阅读上下文的情况，进行修复即可



### CPU飙高排查方案
线上系统CPU突然飙升到100%，请给出你完整的排查和定位思路。
- 使用 `top -c` 定位CPU占用最高的Java进程ID（PID）。
- 使用 `top -Hp <PID>` 定位该进程下CPU占用最高的线程ID（TID）。
- 将十进制的TID转换为十六进制（执行 `printf "%x\n" <TID>`）。
- 使用 `jstack <PID> | grep -A 20 <十六进制TID>` 提取该线程的堆栈信息。
- 分析堆栈日志：若是业务线程，则直接定位具体业务代码行数（排查死循环、复杂正则表达式、频繁自旋死锁等）；若是GC线程，则说明系统可能在频繁发生Full GC导致CPU资源被回收线程耗尽，需转入OOM或GC排查流程。


- 使用top命令查看占用cpu的情况
- 通过top命令查看后，可以查看是哪一个进程占用cpu较高
- 使用ps命令查看进程中的线程信息
- 使用jstack命令查看进程中哪些线程出现了问题，最终定位问题


使用top命令查看占用cpu的情况


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164934.png)

通过top命令查看后，可以查看是哪一个进程占用cpu较高，上图所示的进程为：40940

查看进程中的线程信息
```
ps H -eo pid,tid,%cpu | grep 40940

```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224164949.png)

通过以上分析，在进程40940中的线程40950占用cpu较高

4.可以根据线程 id 找到有问题的线程，进一步定位到问题代码的源码行号
jstack 40940   此处是进程id
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224165056.png)
40940为十进制
十进制转换为十六进制：`printf "%x\n" 40955`
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224165048.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224165001.png)
（其中nid为十六进制）

### 频繁发生Full GC

如何排查和解决线上系统频繁发生Full GC的问题？
- 收集GC表现：使用 `jstat -gcutil <PID> 1000` 观察各区域内存使用率和GC频率，或查看GC日志。
- 确认Full GC触发原因：如果老年代使用率持续上升且Full GC后不下降，说明存在内存泄漏或大对象持续分配；如果是元空间（Metaspace）频繁扩容或主动调用 `System.gc()` 也会触发。
- 导出Dump快照：执行 `jmap -dump:live,format=b,file=heap.bin <PID>`。
- 离线分析：使用MAT（Memory Analyzer Tool）加载Dump文件，通过Dominator Tree（支配树）和Histogram（直方图）查找Retained Heap最大的对象，顺着GC Roots引用链定位到具体的泄漏类和代码。
- 修复与调优：修复代码逻辑，或调整JVM参数（如增大老年代空间、调大元空间初始值 `-XX:MetaspaceSize` 避免早期频繁扩容）。

## 相关资料
运维-容器化java应用进程内存使用问题排查与jvm调优 https://blog.51cto.com/u_11555417/14449300

深入理解Java虚拟机：JVM高级特性与最佳实践（第3版） ： https://weread.qq.com/web/reader/cf1320d071a1a78ecf19254


## END