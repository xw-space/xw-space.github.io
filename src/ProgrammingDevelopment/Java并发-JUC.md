---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - Java并发
tags:
  - default
---
一个简单的**Java并发**入门教程

<!-- more -->

# Java并发

## Java 并发

Java并发编程是Java中实现多线程并行处理的技术，它能够提升程序的响应性、利用多核CPU资源并加快任务执行效率。Java并发编程的核心在于有效管理线程、任务调度、数据共享和同步。以下是Java并发编程中的一些关键概念和工具：
- **线程（Thread）**：线程是程序中最小的执行单位，每个线程都有独立的执行路径和上下文。Java通过继承`Thread`类或实现`Runnable`接口来创建线程。线程的并发执行能加速任务处理，但需要注意线程的状态管理和资源共享。
- **线程池（Thread Pool）**。线程池是一种线程管理机制，通过复用固定数量的线程来避免频繁创建和销毁线程的开销。Java提供了`Executor`框架，支持创建多种线程池（如固定线程池、缓存线程池、单线程池等），适用于不同的并发任务需求。`ThreadPoolExecutor`是一个灵活且功能强大的线程池类。
- **同步（Synchronization）**。同步是用于控制多个线程对共享资源的访问，避免线程间数据冲突。Java的` synchronized`关键字可以加锁方法或代码块，确保同一时间只有一个线程可以访问。`ReentrantLock`类是更灵活的同步机制，它支持重入锁、超时等待和中断机制。
- **并发容器**。Java提供了一些线程安全的集合类和容器，便于在并发环境下共享数据。常见的并发容器包括`ConcurrentHashMap`（线程安全的哈希表）、`CopyOnWriteArrayList`（适合读多写少的列表）和`BlockingQueue`（适合任务队列的实现）。
- **原子类（Atomic Classes）**。Java并发包中的原子类（如`AtomicInteger`、`AtomicReference`等）支持原子操作，避免加锁而保证线程安全。它们通过CAS（Compare-And-Swap）底层机制实现，适合轻量级的数值或对象操作。
- **Future和Callable**。`Callable`接口类似于`Runnable`，但可以返回结果或抛出异常。`Future`对象用于异步计算的结果，提供了检查任务状态、获取结果的方法。Java中的`ExecutorService`框架支持提交`Callable`任务并返回`Future`对象。
- **Fork/Join框架**。`ForkJoinPool`是Java并发包中的一个框架，适合将任务分成多个子任务并行执行，特别适用于递归分治算法。`ForkJoinTask`支持任务的分割和结果合并，提升了处理大规模任务的效率。
- **锁机制**。除了`ReentrantLock`外，Java还提供了`ReadWriteLock`（读写锁）和`StampedLock`（带时间戳的锁），它们适合读多写少的场景，可以同时允许多个线程并发读取数据。Java中的`Condition`类可以配合锁使用，实现类似信号量的等待通知机制。
- **并发工具类**。Java并发包中的`CountDownLatch`、`CyclicBarrier`、`Semaphore`、`Exchanger`等工具类帮助协调多个线程。`CountDownLatch`用于等待一组线程执行完毕；`CyclicBarrier`让一组线程相互等待至某个状态再继续；`Semaphore`限制线程数量；`Exchanger`让两个线程交换数据。
- **CompletableFuture**。Java 8引入的`CompletableFuture`类，支持异步编程，通过链式方法组合多个异步任务，提高任务并发处理的灵活性。它可以方便地实现多任务依赖、异常处理等。
- **Volatile关键字**。`volatile`用于确保变量的可见性。它使得一个线程对变量的更新可以立即对其他线程可见，但不保证操作的原子性。`volatile`适合轻量级的读写操作。
Java并发编程提供了丰富的工具和机制来管理线程、同步资源和控制并发流程，能有效提升应用的性能和响应能力。但并发编程也带来了复杂性，如线程安全、死锁、资源争用等问题，开发时需要合理设计和调试。

## 线程
### 线程和进程
- 线程是 **程序执行的最小单位**，是 CPU 进行调度和执行的基本单位。
- 在 Java 中，**线程是在 JVM 中执行任务的独立控制流**，每个线程都拥有自己的栈空间，但共享进程中的数据。
- **进程**：是资源分配的最小单位，每个进程都有自己的内存空间、代码、数据和系统资源。每个进程可以有多个线程，线程间共享进程的内存空间和资源。‘

- 一个普通的java的helloworld程序是一个进程，内部运行着一个main主线程，但其实同时还运行一些相关的线程，比如GC线程。
- 如果是Spring boot程序也是一个进程，运行一个main主线程，以及更多的协助线程，比如Tmocat容器线程等
- 进程都运行在java虚拟机中。线程是运行单位，进程是资源单位。不能有线程没有进程，但一个进程可以有很多线程。

**如何察看运行线程**：
* Linux/macOS: `ps -ef | grep java`
* Windows: 任务管理器中会看到一个 Java 进程
- 通过代码，打印运行时线程信息，在代码中添加：
```java
Set<Thread> threadSet = Thread.getAllStackTraces().keySet();
System.out.println("当前线程数：" + threadSet.size());
for (Thread t : threadSet) {
    System.out.println("线程名：" + t.getName());
}
```



### 生命周期
**线程包括哪些状态**：新建（NEW）、可运行（RUNNABLE）、阻塞（BLOCKED）、等待（ WAITING ）、时间等待（TIMED_WALTING）、终止（TERMINATED）

线程的状态可以参考JDK中的Thread类中的枚举State：
```Java
public enum State {
    NEW, //尚未启动的线程的线程状态
    RUNNABLE, //可运行线程的线程状态。
    BLOCKED, //线程阻塞等待监视器锁的线程状态。
    WAITING, //等待线程的线程状态
    TIMED_WAITING, //具有指定等待时间的等待线程的线程状态
    TERMINATED; //已终止线程的线程状态。线程已完成执行
}
```

**线程的生命周期**：**新建状态**、**可运行状态**、**阻塞状态**、**等待状态** 和 **终止状态**。
- **新建状态**（New）：线程被创建，但尚未开始执行。通过调用 `Thread` 的构造方法来创建线程对象，但未调用 `start()` 方法。
- **可运行状态**（Runnable）：线程已经启动，可以进行调度执行。线程调用 `start()` 方法后会进入可运行状态，系统会分配 CPU 时间片执行任务。
- **阻塞状态**（Blocked）：线程因为某些条件被阻塞，等待某个资源释放。例如调用 `Thread.sleep()`、`wait()` 或者获取锁时，线程会被阻塞，暂时停止执行，直到恢复。
- **等待状态**（Waiting）：线程正在等待某个条件，直到某些外部事件触发它的恢复。例如调用 `join()` 方法时，线程进入等待状态，直到其他线程完成。
- **终止状态**（Terminated）：线程执行完成，或者因异常中止。
**线程状态转换的关系**：**New → Runnable → Running → Blocked/Waiting → Runnable → Terminated**

**线程状态之间是如何变化的**
- 创建线程对象是新建状态
- 调用了start()方法转变为可执行状态
- 线程获取到了CPU的执行权，执行结束是终止状态
- 在可执行状态的过程中，如果没有获取CPU的执行权，可能会切换其他状态
	- 如果没有获取锁（synchronized或lock）进入阻塞状态，获得锁再切换为可执行状态
	- 如果线程调用了wait()方法进入等待状态，其他线程调用notify()唤醒后可切换为可执行状态
	- 如果线程调用了sleep(50)方法，进入计时等待状态，到时间后可切换为可执行状态

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224173413.png)



### 线程创建

共有四种方式可以创建线程，分别是：
- 继承Thread类
- 实现runnable接口
- 实现Callable接口
- 线程池创建线程

runnable 和 callable 有什么区别？：
- Runnable 接口run方法没有返回值
- Callable接口call方法有返回值，是个泛型，和Future、FutureTask配合可以用来获取异步执行的结果
- Callable接口的call()方法允许抛出异常；而Runnable接口的run()方法的异常只能在内部消化，不能继续上抛


继承 `Thread` 类：通过继承 `Thread` 类并重写其 `run()` 方法来定义线程任务。
```java
class MyThread extends Thread {
    // run方法中定义线程执行的任务
    @Override
    public void run() {
        System.out.println("Thread is running!");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread t = new MyThread();
        // `start()` 方法启动线程，内部会调用 `run()` 方法
        t.start();
    }
}
```

实现 `Runnable` 接口：
- `Runnable` 是一个函数式接口，可以被用作实现线程执行逻辑。通过实现 `Runnable` 接口并将它传递给 `Thread` 构造器来创建线程。
- 使用 `Runnable` 的好处：可以将任务与线程分离，使得任务可以在多个线程之间共享。
```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running using Runnable!");
    }
}

public class Main {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();  // 启动线程
    }
}
```
- start(): 用来启动线程，通过该线程调用run方法执行run方法中所定义的逻辑代码。start方法只能被调用一次。
- run(): 封装了要被线程执行的代码，可以被调用多次。

- `run()` 方法定义了线程需要执行的任务。它是一个普通的 `public void run()` 方法。
- 你 **不能直接调用 `run()` 方法** 来启动线程。
- 如果你直接调用 `run()` 方法，那么这并不会创建新线程。它只是 **当前线程执行 `run()` 方法中的任务**，不会创建新线程，也不会异步执行。
- 如果你直接调用 `run()`，它只是 **同步执行**，即当前线程会直接调用 `run()` 中的代码，**不会启动新线程**。
- 必须通过调用 `Thread` 对象的 `start()` 方法来启动线程。
- 调用 `start()` 方法会使线程进入 **可运行状态**（`Runnable` 状态），然后被 JVM 调度执行。
- 它会 **调用 `run()` 方法** 来执行线程中的任务。
- 调用 `start()` 会 **异步** 执行 `run()` 方法，即不会阻塞当前线程，新的线程会在后台执行 `run()`。
- `start()` 方法会创建一个新的线程，并且新的线程将会执行 `run()` 方法中的任务。

实现Callable接口
```Java
public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println(Thread.currentThread().getName());
        return "ok";
    }
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 创建MyCallable对象
	    MyCallable mc = new MyCallable() ;
        // 创建FutureTask
	    FutureTask<String> ft = new FutureTask<String>(mc) ;
        // 创建Thread对象
	    Thread t1 = new Thread(ft) ;
		Thread t2 = new Thread(ft) ;
        // 调用start方法启动线程
	    t1.start();
        // 调用ft的get方法获取执行结果
	    String result = ft.get();
        // 输出
	    System.out.println(result);
    }
}

```

线程池创建线程
```Java
public class MyExecutors implements Runnable{
    @Override
    public void run() {
        System.out.println("MyRunnable...run...");
    }
    public static void main(String[] args) {
        // 创建线程池对象
	    ExecutorService threadPool = Executors.newFixedThreadPool(3);
       threadPool.submit(new MyExecutors()) ;
        // 关闭线程池
	    threadPool.shutdown();
    }
}
```



### 顺序执行
新建 T1、T2、T3 三个线程，如何保证它们按顺序执行？

可以使用线程中的join方法解决
join()      等待线程运行结束

小例子：
t.join()
阻塞调用此方法的线程进入timed_waiting
直到线程t执行完成后，此线程再继续执行

```Java
Thread t1 = new Thread(() -> {
    System.out.println("t1");
}) ;
Thread t2 = new Thread(() -> {
    try {
        t1.join();                          // 加入线程t1,只有t1线程执行完毕以后，再次执行该线程
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    System.out.println("t2");
}) ;
Thread t3 = new Thread(() -> {
    try {
        t2.join();                              // 加入线程t2,只有t2线程执行完毕以后，再次执行该线程
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    System.out.println("t3");
}) ;
// 启动线程
t1.start();
t2.start();
t3.start();

```

### 线程阻塞-wait、sleep
wait和sleep

**共同点**：wait() ，wait(long) 和 sleep(long) 的效果都是让当前线程暂时放弃 CPU 的使用权，进入阻塞状态

**不同点**：
- 方法归属不同
	- sleep(long) 是 Thread 的静态方法
	- 而 wait()，wait(long) 都是 Object 的成员方法，每个对象都有
- 醒来时机不同
	- 执行 sleep(long) 和 wait(long) 的线程都会在等待相应毫秒后醒来
	- wait(long) 和 wait() 还可以被 notify 唤醒，wait() 如果不唤醒就一直等下去
	- 它们都可以被打断唤醒
- 锁特性不同（重点）
	- wait 方法的调用必须先获取 wait 对象的锁，而 sleep 则无此限制
	- wait 方法执行后会释放对象锁，允许其它线程获得该对象锁（我放弃 cpu，但你们还可以用）
	- 而 sleep 如果在 synchronized 代码块中执行，并不会释放对象锁（我放弃 cpu，你们也用不了）

### 线程唤醒-notify
notify()和 notifyAll()

- notifyAll：唤醒所有wait的线程
- notify：只随机唤醒一个 wait 线程


### 线程停止
如何停止一个正在运行的线程？
有三种方式可以停止线程
- 使用退出标志，使线程正常退出，也就是当run方法完成后线程终止
- 使用stop方法强行终止（不推荐，方法已作废）
- 使用interrupt方法中断线程
	- 打断阻塞的线程（ sleep，wait，join ）的线程，线程会抛出InterruptedException异常
	- 打断正常的线程，可以根据打断状态来标记是否退出线程

## Java内存模型

### 介绍
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


## 线程安全与同步
### 概念

**线程安全** 是指一个类在多线程环境中能正常工作，无论多个线程如何 **并发地访问** 和 **修改** 对象的状态，都能保证对象处于一致的状态，并且不会出现异常或数据错误。

线程安全的两种实现方式：
- **同步**：通过同步技术（如 `synchronized`、`ReentrantLock` 等）来保证同一时刻只有一个线程可以访问共享资源，确保 **原子性** 和 **可见性**。
- **无锁**：通过使用原子类（如 `AtomicInteger`）、并发容器（如 `ConcurrentHashMap`）等技术，避免加锁，从而提高性能。

线程安全的特征：
- 对 **共享数据的访问** 是 **安全的**，多个线程对数据的访问不会造成数据不一致或错误。
- 线程安全的类可以被 **多个线程同时访问**，但不会引发竞争条件。

**线程安全** 表示对象能够在多个线程并发访问时依然保持正确性，而 **线程同步** 是实现线程安全的一种常见方式。


在并发编程中，多个线程可能会访问共享资源，导致数据不一致或错误。为了解决这个问题，需要使用 **线程同步**。


**线程同步** 是指在多线程程序中，确保多个线程在访问共享资源时 **不会发生冲突**，**资源的访问是按照一定顺序进行的**。线程同步的目的是确保 **多个线程对共享资源的访问是串行的**，即同一时刻只有一个线程可以操作某个共享资源。

主要机制：
- **`synchronized` 关键字**：通过对方法或代码块加锁，来保证同一时刻只有一个线程能访问被锁定的代码块。
- **`Lock` 接口（如 `ReentrantLock`）**：提供了比 `synchronized` 更加灵活的控制，支持可中断的锁定、尝试锁定、超时锁定等功能。
- **`volatile` 关键字**：虽然 `volatile` 主要是解决可见性问题，但它在某些场景下也能起到同步的作用（例如，单例模式中的双重检查锁定）。

目的：确保**多个线程对共享资源的访问有序**，避免出现 **竞争条件**（race condition）。

**线程同步** 是 **协调多个线程** 对共享资源的访问，避免并发冲突的一种机制，它主要通过加锁的方式来保证互斥性。
```java
class Counter {
    private int count = 0;

    // synchronized 确保同一时刻只有一个线程可以访问该方法
    public synchronized void increment() {
        count++;
    }
}
```


- 使用 `synchronized` 是最常见的方式，确保同一时间只有一个线程可以访问共享资源。
- 使用显式的 `Lock` 接口，如 `ReentrantLock`，提供更多控制选项。
- 使用 `volatile` 修饰共享变量，保证可见性但不保证原子性。
- 使用原子类，如 `AtomicInteger`，通过 CAS 算法实现无锁线程安全。
- 使用并发容器，如 `ConcurrentHashMap`，避免自己加锁。
- 使用 `ThreadLocal`，每个线程有自己的变量副本，不共享也就避免了线程安全问题。

**使用原子类（如 `AtomicInteger`）**

作用：

原子类（如 `AtomicInteger`）通过底层的 **CAS（Compare-And-Swap）** 算法来实现 **无锁线程安全**，提供线程安全的基本操作，如递增、递减、比较更新等。

使用方式：
```java
AtomicInteger count = new AtomicInteger(0);
// 原子递增
count.incrementAndGet();
// 原子比较和设置
count.compareAndSet(0, 1);
```

优点：
* **无锁**：不需要加锁，CAS 操作通过硬件级别的指令来保证原子性，性能更高。
* **原子操作**：对于多线程并发执行的操作，能够保证线程安全。

适用场景：

* 适用于 **单个变量的原子操作**，如计数器、标志位等场景。
* 高并发场景下无需加锁的情况，性能更好。

---

5. **使用并发容器（如 `ConcurrentHashMap`）**

作用：

并发容器（如 `ConcurrentHashMap`）是为了在多线程环境中提供线程安全的集合操作。`ConcurrentHashMap` 在高并发场景下，提供 **分段锁机制**，允许多个线程并发访问不同的段，避免了全表锁。

使用方式：

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key1", 1);
map.put("key2", 2);

Integer value = map.get("key1");
```

优点：

* **高并发访问**：支持多个线程并发地访问不同的键值对。
* **性能优化**：通过分段锁（segment locks）将操作分散在多个线程之间，减少锁的竞争。

适用场景：

* 高并发下需要 **线程安全的容器**，比如处理并发的缓存、计数器等。

---

6. **使用 `ThreadLocal`**

作用：

`ThreadLocal` 提供了每个线程都有自己的 **局部变量副本**，避免了共享内存，从而避免了线程安全问题。每个线程通过 `ThreadLocal` 获取到的是该线程的独立副本。

使用方式：

```java
ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);

public void increment() {
    threadLocal.set(threadLocal.get() + 1);
}
```

优点：

* **线程隔离**：每个线程都有自己的变量副本，互不干扰，避免了线程安全问题。
* **性能**：避免了同步的开销，适合需要在每个线程中存储独立数据的场景。

适用场景：
* **线程隔离的场景**：比如每个线程需要独立的数据库连接、用户信息等。
* 适用于 **每个线程都需要自己的独立变量副本**，而不需要与其他线程共享变量。

1. **线程同步** 是通过对共享资源加锁、控制线程执行顺序来避免并发冲突的手段，目的是保证线程 **互斥** 访问共享资源。
    
2. **线程安全** 是一种类的性质，表示该类在多线程环境下能够正常工作，无论有多少个线程并发执行，都能保证对象的状态一致性。
    
3. **线程同步** 是 **实现线程安全** 的一种手段，但并不是所有线程安全的类都需要使用同步技术。有些类通过 **无锁** 技术（如 CAS）也可以实现线程安全。
    

**常见的线程安全实现**：

- 使用 **同步机制（`synchronized`、`Lock`）** 来确保共享资源的 **互斥访问**。
    
- 使用 **原子类（如 `AtomicInteger`）** 和 **并发容器（如 `ConcurrentHashMap`）** 来实现 **无锁线程安全**。

### 三大根本问题
导致并发程序出现问题的根本原因，主要源于‌多线程环境下对共享资源的并发访问‌，结合现代计算机系统的优化机制，具体可归结为以下三大核心问题：

‌并发编程的三大根本问题‌
‌原子性（Atomicity）问题‌
指一个或多个操作在执行过程中‌不应被线程调度机制中断‌。若复合操作（如 count++）被拆分为多条 CPU 指令（读取 → 修改 → 写入），在多线程交替执行时，可能导致中间状态暴露，从而产生错误结果。
‌典型场景‌：两个线程同时对共享变量自增，最终结果小于预期。

‌可见性（Visibility）问题‌
当一个线程修改了共享变量的值，‌其他线程可能无法立即看到该修改‌。这是由于每个 CPU 核心有独立缓存，线程可能操作的是本地缓存副本，而非主内存中的最新值。
‌典型场景‌：一个线程设置标志位 stop = true，另一个线程仍在循环中读取旧值 false，导致无法退出。

‌有序性（Ordering）问题‌
为提升性能，‌编译器、CPU 可能对指令进行重排序‌，只要不改变单线程语义。但在多线程环境下，这种重排序会破坏代码逻辑顺序，引发不可预期行为。
‌典型场景‌：对象初始化过程中，引用赋值被提前到构造完成前，导致其他线程看到未初始化完全的对象。


### 三大核心问题

导致并发程序出现问题的根本原因，主要源于‌**多线程环境下对共享资源的并发访问**‌，结合现代计算机系统的优化机制，具体可归结为以下三大核心问题


三大特性
导致并发程序出现问题的根本原因是什么
(Java程序中怎么保证多线程的执行安全)

Java并发编程三大特性
- 原子性
- 可见性
- 有序性

原子性：一个线程在CPU中操作不可暂停，也不可中断，要不执行完成，要不不执行
```Java
int ticketNum = 10;
public void getTicket(){
    if(ticketNum <= 0){
        return ;
    }
    System.out.println(Thread.currentThread().getName()+"抢到一张票,剩余:"+ticketNum);
     // 非原子性操作
    ticketNum--;
}

public static void main(String[] args) {
    TicketDemo demo = new TicketDemo();
    for(int i=0;i<20;i++){
        new Thread(demo::getTicket).start();
    }
}

```

不是原子操作，怎么保证原子操作呢？
1.synchronized：同步加锁
2.JUC里面的lock：加锁
```Java
int ticketNum = 10;
public synchronized void getTicket(){
    if(ticketNum <= 0){
        return ;
    }
    System.out.println(Thread.currentThread().getName()+"抢到一张票,剩余:"+ticketNum);
     // 非原子性操作
    ticketNum--;
}

public static void main(String[] args) {
    TicketDemo demo = new TicketDemo();
    for(int i=0;i<20;i++){
        new Thread(demo::getTicket).start();
    }
}

```

内存可见性：让一个线程对共享变量的修改对另一个线程可见
```Java
public class VolatileDemo {

    private static boolean flag = false;
    public static void main(String[] args) throws InterruptedException {
        new Thread(()->{
            while(!flag){
            }
            System.out.println("第一个线程执行完毕...");
        }).start();
        Thread.sleep(100);
        new Thread(()->{
            flag = true;
           System.out.println("第二线程执行完毕...");
        }).start();
    }
}

```

解决方案
- synchronized
- volatile
- LOCK

有序性
指令重排：处理器为了提高程序运行效率，可能会对输入代码进行优化，它不保证程序中各个语句的执行先后顺序同代码中的顺序一致，但是它会保证程序最终执行结果和代码顺序执行的结果是一致的
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
解决方案
volatile

导致并发程序出现问题的根本原因是什么
1. 原子性     synchronized、lock
2. 内存可见性   volatile、synchronized、lock
3. 有序性     volatile



### CAS
（Compare And Swap），比较再交换
是一种无锁并发控制技术，常用于优化性能。

一种乐观锁的思想，在无锁情况下保证线程操作共享数据的原子性。

一个当前内存值V、旧的预期值A、即将更新的值B，当且仅当旧的预期值A和内存值V相同时，将内存值修改为B并返回true，否则什么都不做，并返回false。
如果CAS操作失败，通过自旋的方式等待并再次尝试，直到成功



- CAS使用到的地方很多：AQS框架、AtomicXXX类
- CAS的底层是调用的Unsafe类中的方法，都是操作系统提供的，其他语言实现
- 在操作共享变量的时候使用的自旋锁，效率上更高一些

- 因为没有加锁，所以线程不会陷入阻塞，效率较高
- 如果竞争激烈，重试频繁发生，效率会受影响

乐观锁和悲观锁的区别
- CAS  是基于乐观锁的思想：最乐观的估计，不怕别的线程来修改共享变量，就算改了也没关系，我吃亏点再重试呗。
- synchronized  是基于悲观锁的思想：最悲观的估计，得防着其它线程来修改共享变量，我上了锁你们都别想改，我改完了解开锁，你们才有机会。





CAS 是一种基于硬件的原子操作，常用于并发编程中确保原子性。在 Java 中，`AtomicInteger`、`AtomicLong` 等类使用 CAS 来实现无锁的原子操作。

```java
AtomicInteger count = new AtomicInteger(0);
count.compareAndSet(0, 1);  // 比较并交换
```




自旋锁：
```Java
// 需要不断尝试
while(true){
    int 旧值A = 共享变量V; 
    int 结果B = 旧值 + 1; 
    if (compareAndSwap(旧值, 结果)) {
        // 成功，退出循环
  }
}
```


在JUC（ java.util.concurrent ）包下实现的很多类都用到了CAS操作
- AbstractQueuedSynchronizer（AQS框架）
- AtomicXXX类


CAS 底层依赖于一个 Unsafe 类来直接调用操作系统底层的 CAS 指令
ReentrantLock中的一段CAS代码
```Java
protected final boolean compareAndSetState(int expect, int update) {
    return STATE.compareAndSet(this, expect, update);// 当前值，期望的值，更新后的值
}

```


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224174317.png)







### AQS
Abstract Queued Synchronizer，抽象队列同步器。
- 是多线程中的队列同步器。
- 是一种锁机制，
**AQS（AbstractQueuedSynchronizer）** 是 Java 并发包中的一个抽象类，
AQS（AbstractQueuedSynchronizer）是Java并发包（`java.util.concurrent`）中的一个同步框架，
是Java并发包中实现多种同步器的核心基础。



提供了用于构建锁或同步器的基础框架。
提供了构建锁和同步器的基础。
它是做为一个基础框架使用的，像ReentrantLock、Semaphore都是基于AQS实现的
是实现许多高效并发工具类（如`ReentrantLock`、`CountDownLatch`、`Semaphore`等）的核心组件。
它是实现锁、信号量、倒计时闩锁等同步器的基础。
它是构建锁或者其他同步组件的基础框架


- AQS内部维护了一个先进先出的双向队列，队列中存储的排队的线程
- 在AQS内部还有一个属性state，这个state就相当于是一个资源，默认是0（无锁状态），如果队列中的有一个线程修改成功了state为1，则当前线程就相等于获取了资源
- 在对state修改的时候使用的cas操作，保证多个线程修改的情况下原子性
AQS采用FIFO（先进先出）队列机制管理线程的获取和释放，
AQS通过一个**共享资源状态（state）变量**和**双向队列**来管理线程的访问和同步。
以下是AQS的关键原理和工作机制：
- **共享资源状态**。AQS维护一个`state`变量，表示同步资源的当前状态。`state`可以是一个计数值或状态标志，用于表示锁的持有情况或资源的剩余数量。具体含义由子类定义，比如在`ReentrantLock`中表示锁的持有次数，在`CountDownLatch`中表示倒计时计数。
- **独占模式和共享模式**。AQS支持独占和共享两种访问模式。独占模式下，只有一个线程可以访问资源，适合独占锁（如`ReentrantLock`）。共享模式下，多个线程可以同时获取资源，适合共享资源的并发访问（如`Semaphore`和`CountDownLatch`）。
- 在独占模式下，线程会竞争获取资源。未获得资源的线程会进入等待队列，并被阻塞直到资源可用或超时。
- 在共享模式下，多个线程可以同时访问资源，满足并发性需求。常用于并发信号量和栅栏等场景。
- **FIFO等待队列**。AQS内部采用一个FIFO等待队列存放未获取到资源的线程。线程在尝试获取资源失败后，会被加入到该队列并进入等待状态，当资源释放或状态改变时，AQS会唤醒队列中的线程按顺序尝试重新获取资源。
- **模板方法**。AQS定义了一套模板方法（如`tryAcquire`、`tryRelease`、`tryAcquireShared`、`tryReleaseShared`等），用于资源的获取和释放。具体的资源操作逻辑由子类实现。例如，`ReentrantLock`实现了独占的获取和释放逻辑，而`Semaphore`实现了共享的获取和释放逻辑。
- **原子操作和CAS**。AQS依赖于CAS（Compare-And-Swap）操作和`volatile`关键字来保证资源状态的线程安全性。CAS是AQS实现高效并发的基础，确保了在多线程环境下的原子性操作。通过CAS和`volatile`，AQS在不加锁的情况下实现了状态修改和队列操作。
- **Condition支持**。AQS还支持条件队列，通过`ConditionObject`类实现`Condition`接口。条件队列允许线程在特定条件下等待，并在条件满足后被唤醒。每个条件队列与一个锁对象关联，常用于实现高级同步机制。
AQS通过资源状态管理、双向队列、模板方法和CAS实现了一个通用的、灵活的同步框架，

AQS 的数据结构
AQS 内部使用 **FIFO 队列** 来保存等待获取锁的线程，通常通过 `Node` 类（一个双向链表节点）来表示每个线程在队列中的状态。每个线程都会被封装成一个 `Node` 节点，当线程无法获取到资源时，它会进入队列等待。

AQS 的成员
AQS 主要有以下几个重要成员：
- **state**：表示当前同步器的状态，通常用于表示锁是否被占用，或信号量的许可数量等。
- **head**：队列的头节点，指向当前等待的线程队列的头部。
- **tail**：队列的尾节点，指向队列的末尾。
- **condition**：用于实现 `Condition` 类的条件队列（如 `await()`、`signal()` 等方法）。
    

state 的类型
`state` 是一个 `volatile` 类型的 `int` 变量，通常用于表示同步器的当前状态，比如锁的占用情况，信号量的剩余许可数量等。它是一个 32 位的整数，可以通过自定义的方式来定义不同的状态值。

AQS的工作流程如下：
当一个线程尝试获取资源时，AQS判断资源状态并决定是否授予访问权限。如果资源不可用，线程会被加入等待队列并挂起。资源释放时，AQS会唤醒队列中的一个或多个线程并重新判断资源状态。AQS的设计使得各种锁和同步器能够在并发环境下高效工作。



AQS常见的实现类
ReentrantLock           阻塞式锁
Semaphore                信号量
CountDownLatch      倒计时锁



AQS与Synchronized的区别
synchronized，关键字，c++ 语言实现，悲观锁，自动释放锁，锁竞争激烈都是重量级锁，性能差，
AQS，java 语言实现，悲观锁，手动开启和关闭，锁竞争激烈的情况下，提供了多种解决方案，

多个线程共同去抢这个资源是如何保证原子性的呢？
cas设置 state 状态，保证操作的原子性

AQS是公平锁吗，还是非公平锁？
新的线程与队列中的线程共同来抢资源，是非公平锁
新的线程到队列中等待，只让队列中的head线程获取锁，是公平锁

AQS的工作流程：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224174943.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224175022.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224175039.png)






### `final`
* 在 Java 中，`final` 关键字修饰的变量会在对象创建时被赋值，并且无法修改。
* 这意味着 **`final` 修饰的引用** 在多个线程之间具有 **稳定性** 和 **可见性**。

```java
private final int[] arr = new int[10];  // 引用不可变，但数组内容可以改变
```


### `synchronized`
`Synchronized` 是 Java 中实现线程同步的关键字


作用：
* 同一个时刻只有一个线程可以访问被 `synchronized` 修饰的代码块或方法。当一个线程进入同步代码块时，其他线程不能访问同步代码块，直到当前线程释放锁；
- 进入`synchronized`块的线程会从主存中读取共享变量的最新值，并在退出时刷新修改结果，保证线程间的变量可见性。
* 防止多个线程同时访问共享资源。；
- `synchronized`的作用主要在于**确保互斥访问和内存可见性**。



确保在并发环境下多个线程对共享资源的安全访问。
- 避免多个线程**同时读写**同一个变量或对象时，造成 **数据冲突或不一致**
- 保证了**同步代码块的互斥性**。


- 尽管`synchronized`是一种简便的同步机制，但其性能可能不如轻量级的`ReentrantLock`，尤其是在高并发环境下。
- 因此，在性能要求较高的场景，可以考虑`ReentrantLock`等更灵活的锁机制。

- **对象锁**：`synchronized` 可以锁定某个对象，如果多个线程试图访问同一个对象的同步代码块，它们会依次排队。
- **类锁**：`synchronized` 也可以锁定类级别的代码块（通常是 `Class` 对象）。
- `synchronized` 语法简单，适合锁范围小、竞争不激烈的场景。

- RPC的CircuitBreakerProvider的getCircuitBreaker用到了这个东西

synchronized可以修饰：静态方法、实例方法、代码块等：
```java
synchronized (object) {
    // 同步代码
}

public synchronized void method() {
    // 同步方法
}

public static synchronized void staticMethod() {
    // 同步静态方法
}



public void method() {
    synchronized (this) {
        public void method() {
        // 同步代码块
		}
    }
}

// `synchronized (this)`表示使用当前实例作为锁对象。此外，也可以使用其他对象作为锁，例如`Class`对象或自定义的锁对象
public void method() {
    synchronized (SomeClass.class) {
        // 使用类对象作为锁
    }
}
```

### synchronized的底层原理

- 它通过加锁机制实现
- `synchronized`机制在底层由JVM实现，使用对象监视器（Monitor）来管理锁的获取和释放。

- Synchronized【对象锁】采用互斥的方式让同一时刻至多只有一个线程能持有【对象锁】
- 它的底层由monitor实现的，monitor是jvm级别的对象（ C++实现），线程获得锁需要使用对象（锁）关联monitor
- 在monitor内部有三个属性，分别是owner、entrylist、waitset
- 其中owner是关联的获得锁的线程，并且只能关联一个线程；entrylist关联的是处于阻塞状态的线程；waitset关联的是处于Waiting状态的线程




基本使用回顾
Synchronized【对象锁】采用互斥的方式让同一时刻至多只有一个线程能持有【对象锁】，其它线程再想获取这个【对象锁】时就会阻塞住

```Java
public class TicketDemo {
    
    static Object lock = new Object();
    int ticketNum = 10;
    public void getTicket() {
        synchronized (lock){
            if (ticketNum <= 0) {
                return;
            }
            System.out.println(Thread.currentThread().getName() + "抢到一张票,剩余:" + ticketNum);
            // 非原子性操作
       ticketNum--;
        }
    }

    public static void main(String[] args) {
        TicketDemo ticketDemo = new TicketDemo();
        for (int i = 0; i < 20; i++) {
            new Thread(() -> {
                ticketDemo.getTicket();
            }).start();
        }
    }

}

```
Monitor
```Java
public class SyncTest {

    static final Object lock = new Object();
    static int counter = 0;
    public static void main(String[] args) {
        synchronized (lock) {
            counter++;
        }
    }
}

```
javap -v xx.class   查看class字节码信息
class反汇编
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224173713.png)
Monitor 被翻译为监视器，是由jvm提供，c++语言实现
Owner：存储当前获取锁的线程的，只能有一个线程可以获取
EntryList：关联没有抢到锁的线程，处于Blocked状态的线程
WaitSet：关联调用了wait方法的线程，处于Waiting状态的线程
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224173743.png)


synchronized关键字的底层原理-进阶

Monitor实现的锁属于重量级锁，你了解过锁升级吗？

Monitor实现的锁属于重量级锁，里面涉及到了用户态和内核态的切换、进程的上下文切换，成本较高，性能比较低。
在JDK 1.6引入了两种新型锁机制：偏向锁和轻量级锁，它们的引入是为了解决在没有多线程竞争或基本没有竞争的场景下因使用传统锁机制带来的性能开销问题。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224173835.png)


对象的内存结构
在HotSpot虚拟机中，对象在内存中存储的布局可分为3块区域：对象头（Header）、实例数据（Instance Data）和对齐填充
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224173848.png)

MarkWord
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224173856.png)
（01、00、11是lock标识，占2位）
hashcode：25位的对象标识Hash码
age：对象分代年龄占4位
biased_lock：偏向锁标识，占1位 ，0表示没有开始偏向锁，1表示开启了偏向锁
thread：持有偏向锁的线程ID，占23位
epoch：偏向时间戳，占2位
ptr_to_lock_record：轻量级锁状态下，指向栈中锁记录的指针，占30位
ptr_to_heavyweight_monitor：重量级锁状态下，指向对象监视器Monitor的指针，占30位

每个 Java 对象都可以关联一个 Monitor 对象，如果使用 synchronized 给对象上锁（重量级）之后，该对象头的Mark Word 中就被设置指向 Monitor 对象的指针

**轻量级锁**
在很多的情况下，在Java程序运行时，同步块中的代码都是不存在竞争的，不同的线程交替的执行同步块中的代码。这种情况下，用重量级锁是没必要的。因此JVM引入了轻量级锁的概念。

```Java
static final Object obj = new Object();
public static void method1() {
    synchronized( obj ) {
        // 同步块 A
        method2();
    }
}
public static void method2() {
    synchronized( obj ) {
    // 同步块 B
    }
}

```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224174002.png)



轻量级锁
加锁流程
1. 在线程栈中创建一个Lock Record，将其obj字段指向锁对象。
2. 通过CAS指令将Lock Record的地址存储在对象头的mark word中，如果对象处于无锁状态则修改成功，代表该线程获得了轻量级锁。
3. 如果是当前线程已经持有该锁了，代表这是一次锁重入。设置Lock Record第一部分为null，起到了一个重入计数器的作用。
4. 如果CAS修改失败，说明发生了竞争，需要膨胀为重量级锁。
解锁过程
5. 遍历线程栈,找到所有obj字段等于当前锁对象的Lock Record。
6. 如果Lock Record的Mark Word为null，代表这是一次重入，将obj设置为null后continue。
7. 如果Lock Record的 Mark Word不为null，则利用CAS指令将对象头的mark word恢复成为无锁状态。如果失败则膨胀为重量级锁。

偏向锁
轻量级锁在没有竞争时（就自己这个线程），每次重入仍然需要执行 CAS 操作。
Java 6 中引入了偏向锁来做进一步优化：只有第一次使用 CAS 将线程 ID 设置到对象的 Mark Word 头，之后发现
这个线程 ID 是自己的就表示没有竞争，不用重新 CAS。以后只要不发生竞争，这个对象就归该线程所有

```Java
static final Object obj = new Object();
public static void m1 () {
    synchronized (obj) {
        // 同步块 A
        m2();
    }
}
public static void m2 () {
    synchronized (obj) {
        // 同步块 B
        m3();
    }
}
public static void m3 () {
    synchronized (obj) {
        
    }
}

```

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224174057.png)

Monitor实现的锁属于重量级锁，你了解过锁升级吗？

Java中的synchronized有偏向锁、轻量级锁、重量级锁三种形式，分别对应了锁只被一个线程持有、不同线程交替持有锁、多线程竞争锁三种情况。

重量级锁，底层使用的Monitor实现，里面涉及到了用户态和内核态的切换、进程的上下文切换，成本较高，性能比较低。
轻量级锁，线程加锁的时间是错开的（也就是没有竞争），可以使用轻量级锁来优化。轻量级修改了对象头的锁标志，相对重量级锁性能提升很多。每次修改都是CAS操作，保证原子性
偏向锁，一段很长的时间内都只被一个线程使用锁，可以使用了偏向锁，在第一次获得锁时，会有一个CAS操作，之后该线程再获取锁，只需要判断mark word中是否是自己的线程id即可，而不是开销相对较大的CAS命令


一旦锁发生了竞争，都会升级为重量级锁

* `Synchronized` 锁升级过程： 无锁 -> 偏向锁（记录线程ID） -> 轻量级锁（CAS自旋） -> 重量级锁（操作系统 Mutex Lock）。




### `Lock`
java加锁：什么是加锁？就是在代码中添加一些关键字，有了这些关键字，就代表给代码的一部分上了所，至于怎么加，不同的锁有不同的特性。

`Lock` 接口比 `synchronized` 提供了更多的控制选项。`ReentrantLock` 是 `Lock` 接口的一个常用实现，它提供了比 `synchronized` 更灵活的锁定机制。

`Lock` 提供了比 `synchronized` 更灵活的方式来控制线程同步。

优点：
- **可中断的锁**：`ReentrantLock` 支持 **中断锁等待**，可以避免死锁。
- **尝试加锁**：可以通过 `tryLock()` 来尝试获取锁，避免死锁。
- **公平锁**：可以通过构造 `ReentrantLock(true)` 来实现**公平锁**，保证线程按请求顺序获得锁。
    

适用场景：
- 需要对锁进行更精细控制的场景（例如超时、可中断锁、定时锁）。
- 相比 `synchronized`，适用于多个线程争抢同一个资源时，尤其是在高并发的环境下。


`ReentrantLock` 是 `Lock` 接口的常用实现，提供了更强大的功能（如尝试锁定、超时锁定等）。

`synchronized` 是最基础的内置锁，写法简单，性能在现代 JVM 中已优化得较好。
`ReentrantLock` 是可重入的显式锁，它支持中断锁等待、公平性、尝试加锁等灵活功能。
`ReadWriteLock` 是读写分离锁，读可以并发，写是独占的，适合读多写少的场景。
`StampedLock` 是 Java 8 引入的锁，它支持乐观读，提高性能，但使用较复杂。
`SpinLock` 是一种线程不会阻塞而是持续尝试获取锁的方式，适合锁占用时间非常短的场景。


Java线程锁的特点/性能和使⽤场景
`ReentrantLock` 更灵活，适合复杂同步需求，比如需要响应中断或者设置超时。
`ReadWriteLock` 用于读多写少的场合，能显著提升读取效率。
`StampedLock` 支持乐观读锁，进一步优化高并发读的性能，适合读远大于写的场景。
`SpinLock` 适用于非常短时间的锁操作，比如 CPU 密集型计算中临界区很短的情况。



```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class Counter {
    private int count = 0;
    private Lock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock(); // 一定要在 finally 块里释放锁
        }
    }
}

```

### `ReentrantLock`
`ReentrantLock` 是 Java 提供的一个互斥锁，相比 `synchronized`，它提供了更强大的功能：

* 可以尝试加锁，超时加锁等；
* 支持中断加锁。
* 还可以配合 `Condition` 实现类似 `wait()` 和 `notify()` 的功能。

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // 执行任务
} finally {
    lock.unlock();
}
```


ReentrantLock的实现原理
* `ReentrantLock`： 基于 AQS 实现，支持公平锁与非公平锁，支持可中断获取锁。

ReentrantLock翻译过来是可重入锁，相对于synchronized它具备以下特点：
- 可中断
- 可以设置超时时间
- 可以设置公平锁
- 支持多个条件变量
- 与synchronized一样，都支持重入
```Java
//创建锁对象
ReentrantLock lock = new ReentrantLock();
try {
    // 获取锁
    lock.lock();
} finally {
    // 释放锁
    lock.unlock();
}

```
ReentrantLock主要利用CAS+AQS队列来实现。它支持公平锁和非公平锁，两者的实现类似
构造方法接受一个可选的公平参数（默认非公平锁），当设置为true时，表示公平锁，否则为非公平锁。公平锁的效率往往没有非公平锁的效率高，在许多线程访问的情况下，公平锁表现出较低的吞吐量。

查看ReentrantLock源码中的构造方法：
```Java
public ReentrantLock() {
    sync = new NonfairSync();
}

public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
abstract static class Sync extends AbstractQueuedSynchronizer {
    
}
```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224175143.png)

- 线程来抢锁后使用cas的方式修改state状态，修改状态成功为1，则让exclusiveOwnerThread属性指向当前线程，获取锁成功
- 假如修改状态失败，则会进入双向队列中等待，head指向双向队列头部，tail指向双向队列尾部
- 当exclusiveOwnerThread为null的时候，则会唤醒在双向队列中等待的线程
- 公平锁则体现在按照先后顺序获取锁，非公平体现在不在排队的线程也可以抢锁

ReentrantLock的实现原理
- ReentrantLock表示支持重新进入的锁，调用 lock 方 法获取了锁之后，再次调用 lock，是不会再阻塞
- ReentrantLock主要利用CAS+AQS队列来实现
- 支持公平锁和非公平锁，在提供的构造器的中无参默认是非公平锁，也可以传参设置为公平锁


### synchronized和Lock对比
有什么区别 ? 

- 语法层面
	- synchronized 是关键字，源码在 jvm 中，用 c++ 语言实现
	- Lock 是接口，源码由 jdk 提供，用 java 语言实现
	- 使用 synchronized 时，退出同步代码块锁会自动释放，而使用 Lock 时，需要手动调用 unlock 方法释放锁
- 功能层面
	- 二者均属于悲观锁、都具备基本的互斥、同步、锁重入功能
	- Lock 提供了许多 synchronized 不具备的功能，例如公平锁、可打断、可超时、多条件变量
	- Lock 有适合不同场景的实现，如 ReentrantLock， ReentrantReadWriteLock(读写锁)
- 性能层面
	- 在没有竞争时，synchronized 做了很多优化，如偏向锁、轻量级锁，性能不赖
	- 在竞争激烈时，Lock 的实现通常会提供更好的性能

### sychronzied和reentranlock对比
的区别

`Synchronized` 和 `ReentrantLock` 都是 Java 中用于实现线程同步的工具，它们的功能类似，都用于控制多线程访问共享资源时的同步性。然而，它们有一些关键的区别：

1. **锁的类型**

* **Synchronized**：`synchronized` 是一个关键字，用于标记方法或者代码块，保证同一时刻只有一个线程能够执行标记了 `synchronized` 的代码段。它实现的是一种隐式的锁机制，锁是对象级别的，每个对象都有一个锁。
* **ReentrantLock**：`ReentrantLock` 是 `java.util.concurrent.locks` 包中的一个类，提供了比 `synchronized` 更灵活的锁机制。它是显式锁，可以通过 `lock()` 和 `unlock()` 方法手动控制。

2. **可重入性**

* **Synchronized**：`synchronized` 是可重入的（Reentrant）。如果一个线程已经获得了某个对象的锁，它可以再次获取该锁，不会导致死锁。这是因为同一个线程可以多次进入 `synchronized` 的方法或代码块。
* **ReentrantLock**：`ReentrantLock` 也是可重入的。当一个线程获取到 `ReentrantLock` 后，它可以多次获取锁而不会被阻塞。

3. **锁的释放**

* **Synchronized**：`synchronized` 锁由 JVM 自动管理，锁定和解锁由 JVM 完成。每当进入一个同步代码块时，JVM 会自动获取锁，而当方法或代码块执行完毕时，JVM 会自动释放锁。
* **ReentrantLock**：`ReentrantLock` 需要手动释放锁。开发者必须显式调用 `unlock()` 方法来释放锁，否则会导致死锁。

4. **支持公平锁**

* **Synchronized**：`synchronized` 锁是非公平的，线程获取锁的顺序是随机的。
* **ReentrantLock**：`ReentrantLock` 支持公平锁和非公平锁。如果创建 `ReentrantLock` 时传入 `true`，则使用公平锁，意味着等待时间最长的线程会优先获取锁。默认是非公平锁，意味着线程竞争锁的顺序是随机的。

5. **中断响应**

* **Synchronized**：`synchronized` 在等待锁时无法响应中断。如果一个线程被阻塞在 `synchronized` 锁上，它无法被中断。
* **ReentrantLock**：`ReentrantLock` 在获取锁时可以响应中断。你可以使用 `lockInterruptibly()` 方法来尝试获取锁，如果线程在等待锁时被中断，它会抛出 `InterruptedException`，这样可以更灵活地控制线程的中断。

6. **条件变量（Condition）**

* **Synchronized**：`synchronized` 通过 `wait()`、`notify()` 和 `notifyAll()` 方法来实现线程间的协调和通信，但这些方法只能在同步块中使用。
* **ReentrantLock**：`ReentrantLock` 提供了 `Condition` 类，支持比 `wait()` 和 `notify()` 更复杂的线程间通信。例如，使用 `Condition` 可以实现多个线程等待不同的条件。

7. **性能**

* **Synchronized**：在旧版本的 Java 中，`synchronized` 的性能相对较低，因为它是通过 JVM 来管理的，存在一定的性能开销。但从 Java 5 开始，JVM 对 `synchronized` 做了优化，在许多情况下性能已经大大提高。
* **ReentrantLock**：`ReentrantLock` 通常在高竞争的环境下比 `synchronized` 更有效，因为它允许更细粒度的控制（如可中断的锁、条件变量等），但它的性能也与具体的使用方式有关。

总结

| 特性   | `Synchronized`                       | `ReentrantLock`              |
| ---- | ------------------------------------ | ---------------------------- |
| 锁类型  | 隐式锁                                  | 显式锁                          |
| 可重入性 | 是                                    | 是                            |
| 锁释放  | 自动                                   | 需要手动调用 `unlock()`            |
| 公平性  | 非公平锁                                 | 支持公平锁和非公平锁                   |
| 中断响应 | 不支持                                  | 支持（使用 `lockInterruptibly()`） |
| 条件变量 | 通过 `wait()`、`notify()`、`notifyAll()` | 通过 `Condition`               |
| 性能   | 优化后表现良好                              | 在高竞争环境下通常更高效                 |

选择使用 `Synchronized` 还是 `ReentrantLock` 取决于具体的需求。如果需要较为简单的同步控制，`synchronized` 足够用。如果需要更精细的锁控制、更高效的资源利用、或者支持中断和条件变量等高级功能，那么 `ReentrantLock` 更加合适。


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




### java的死锁

死锁：一个线程需要同时获取多把锁，这时就容易发生死锁
举例：
```Java
Object A = new Object();
Object B = new Object();
Thread t1 = new Thread(() -> {
    synchronized (A) {
        System.out.println("lock A");
        try {
            sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        synchronized (B) {
            System.out.println("lock B");
            System.out.println("操作...");
        }
    }
}, "t1");

Thread t2 = new Thread(() -> {
    synchronized (B) {
        System.out.println("lock B");
        try {
            sleep(500);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        synchronized (A) {
            System.out.println("lock A");
            System.out.println("操作...");
        }
    }
}, "t2");
t1.start();
t2.start();


```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224180749.png)
此时程序并没有结束，这种现象就是死锁现象...线程t1持有A的锁等待获取B锁，线程t2持有B的锁等待获取A的锁。
**如何进行死锁诊断**？

当程序出现了死锁现象，我们可以使用jdk自带的工具：jps和 jstack
- jps：输出JVM中运行的进程状态信息
- jstack：查看java进程内线程的堆栈信息

解决步骤如下
第一：查看运行的线程

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224180806.png)

第二，使用jstack查看线程运行的情况，下图是截图的关键信息
运行命令：jstack -l 46032
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224180815.png)

其他解决工具，可视化工具
- jconsole
	- 用于对jvm的内存，线程，类 的监控，是一个基于 jmx 的 GUI 性能监控工具
	- 打开方式：java 安装目录 bin目录下 直接启动 jconsole.exe 就行
- VisualVM：故障处理工具
	- 能够监控线程，内存情况，查看方法的CPU时间和内存中的对 象，已被GC的对象，反向查看分配的堆栈
	- 打开方式：java 安装目录 bin目录下 直接启动 jvisualvm.exe就行


**如何进行死锁诊断**？
- 当程序出现了死锁现象，我们可以使用jdk自带的工具：jps和 jstack
- jps：输出JVM中运行的进程状态信息
- jstack：查看java进程内线程的堆栈信息，查看日志，检查是否有死锁
     - 如果有死锁现象，需要查看具体代码分析后，可修复
- 可视化工具jconsole、VisualVM也可以检查死锁问题



## ThreadLocal
### 介绍
`ThreadLocal` 是 Java 提供的一种用于 **线程隔离的变量存储机制**。它的作用是让每个线程都拥有自己的变量副本，互不影响。
`ThreadLocal`是Java中的一个用于实现线程本地存储的类，它为每个线程提供独立的变量副本，使变量在不同线程之间相互隔离。
ThreadLocal是多线程中对于解决线程安全的一个操作类，它会为每个线程都分配一个独立的线程副本从而解决了变量并发访问冲突的问题。ThreadLocal 同时实现了线程内的资源共享
ThreadLocal本质来说就是一个线程内部存储类，从而让多个线程只操作自己内部的值，从而实现线程数据隔离


`ThreadLocal`非常适合用于在多线程环境中共享的变量且不希望在线程之间相互干扰的场景，例如在每个线程中存储用户会话信息、事务上下文、数据库连接等。
使用场景包括：
* 每个线程需要独立保存用户信息、数据库连接、日期格式化器等。
* 避免使用全局变量或同步锁带来的线程安全问题。


工作机制是：每个线程内部维护一个 ThreadLocalMap，`ThreadLocal.set()` 和 `get()` 实际是操作这个 map，从而实现线程私有变量。
`ThreadLocal`的核心机制是为每个线程创建一个独立的变量副本，这个变量仅对当前线程可见。Java中的`ThreadLocal`变量在每个线程中都会有一个独立的值，确保了变量的线程安全性而无需使用锁来同步访问。

**主要方法和工作原理**：
`set(T value)`方法用于将变量的值存储到当前线程的`ThreadLocal`副本中。每个线程对`ThreadLocal`调用`set()`方法时都会在自己的线程上下文中存储独立的值。
`get()`方法用于获取当前线程中`ThreadLocal`变量的值。如果当前线程没有设置过该值，`get()`方法会返回默认值（通过重写`initialValue()`方法来设置），或者返回`null`。
`initialValue()`方法用于设置`ThreadLocal`变量的初始值。默认实现返回`null`，可以通过重写此方法为每个线程设置初始值。调用`get()`时，如果当前线程的`ThreadLocal`变量未设置值，则自动调用`initialValue()`初始化。
`remove()`方法用于删除当前线程的`ThreadLocal`变量，以防止内存泄漏。当线程执行完任务后，建议手动调用`remove()`来清理`ThreadLocal`变量，尤其是在使用线程池时。
在每个线程内部，`ThreadLocal`变量的副本存储在一个`ThreadLocalMap`结构中，该结构是每个线程特有的。`ThreadLocalMap`将`ThreadLocal`实例作为键，线程局部变量的值作为值，保证了每个线程拥有自己的变量副本，这种隔离特性避免了并发访问冲突。

**使用场景**
- **用户会话信息**。在Web应用中，每个请求的线程可以使用`ThreadLocal`来存储用户会话信息，以避免在线程间传递参数。
- **数据库连接管理**。每个线程可以持有一个数据库连接，通过`ThreadLocal`确保每个线程在操作时使用自己的连接而不会被其他线程干扰。
- **事务管理**。在多线程环境中，通过`ThreadLocal`存储事务对象，以确保事务的隔离性和一致性。
- **对象缓冲**。一些临时对象或缓存对象可以通过`ThreadLocal`在每个线程中独立存储，以减少创建对象的开销和减少内存占用。

**注意事项**
`ThreadLocal`虽然提供了简便的线程本地存储，但在使用时要注意内存泄漏问题。尤其是在线程池环境中，线程复用可能导致`ThreadLocal`变量无法被及时清理，最终可能会引发内存泄漏。为避免这种问题，建议在线程任务完成后，显式调用`ThreadLocal`的`remove()`方法，清除当前线程中的变量。
`ThreadLocal`通过为每个线程维护独立的副本，实现了高效的线程安全，是Java中重要的线程本地存储工具，在多线程应用场景下非常实用。


谈谈你对ThreadLocal的理解
- ThreadLocal 可以实现【资源对象】的线程隔离，让每个线程各用各的【资源对象】，避免争用引发的线程安全问题
- ThreadLocal 同时实现了线程内的资源共享
- 每个线程内有一个 ThreadLocalMap 类型的成员变量，用来存储资源对象
	- a)调用 set 方法，就是以 ThreadLocal 自己作为 key，资源对象作为 value，放入当前线
	- 程的 ThreadLocalMap 集合中
	- b)调用 get 方法，就是以 ThreadLocal 自己作为 key，到当前线程中查找关联的资源值
	- c)调用 remove 方法，就是以 ThreadLocal 自己作为 key，移除当前线程关联的资源值
- ThreadLocal内存泄漏问题
	- ThreadLocalMap 中的 key 是弱引用，值为强引用； key 会被GC 释放内存，关联 value 的内存并不会释放。建议主动 remove 释放 key，value

案例：使用JDBC操作数据库时，会将每一个线程的Connection放入各自的ThreadLocal中，从而保证每个线程都在各自的 Connection 上进行数据库的操作，避免A线程关闭了B线程的连接。


### 基本使用





**ThreadLocal基本使用**
- set(value) 设置值
- get() 获取值
- remove() 清除值
```Java
static ThreadLocal<String> threadLocal = new ThreadLocal<>();

public static void main(String[] args) {
    new Thread(() -> {
        String name = Thread.currentThread().getName();
        threadLocal.set("itcast");
        print(name);
        System.out.println(name + "-after remove : " + threadLocal.get());
    }, "t1").start();
    new Thread(() -> {
        String name = Thread.currentThread().getName();
        threadLocal.set("itheima");
        print(name);
        System.out.println(name + "-after remove : " + threadLocal.get());
    }, "t2").start();
}

static void print(String str) {
    //打印当前线程中本地内存中本地变量的值
    System.out.println(str + " :" + threadLocal.get());
    //清除本地内存中的本地变量
    threadLocal.remove();
}

```

### 源码解析
**ThreadLocal的实现原理&源码解析**
ThreadLocal本质来说就是一个线程内部存储类，从而让多个线程只操作自己内部的值，从而实现线程数据隔离
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224182038.png)

set方法
```Java
public void set(T value) {
    //获取当前线程对象
  Thread t = Thread.currentThread();
    //根据当前线程对象，获取ThreadLocal中的ThreadLocalMap
    ThreadLocalMap map = getMap(t);
    //如果map存在
  if (map != null)
       //执行map中的set方法，进行数据存储
    map.set(this, value);
   else
       //否则创建ThreadLocalMap，并存值
    createMap(t, value);
}

// createMap(t, value);
void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue);
}

ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
    //内部成员数组，INITIAL_CAPACITY值为16的常量
  table = new Entry[INITIAL_CAPACITY];

    //位运算，结果与取模相同，计算出需要存放的位置
  int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1);
    table[i] = new Entry(firstKey, firstValue);
    size = 1;
    setThreshold(INITIAL_CAPACITY);
}

```

get方法/remove方法
```Java
public T get() {
    Thread t = Thread.currentThread();
    //根据线程对象，获取对应的ThreadLocalMap
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        //获取ThreadLocalMap中对应的Entry对象
    ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            //获取Entry中的value
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}

private Entry getEntry(ThreadLocal<?> key) {
    //确定数组下标位置
  int i = key.threadLocalHashCode & (table.length - 1);
    //得到该位置上的Entry
    Entry e = table[i];
    if (e != null && e.get() == key)
        return e;
    else
        return getEntryAfterMiss(key, i, e);
}

```

### 内存泄漏

面试官：你对ThreadLocal理解的挺深的，你知道ThreadLocal的内存泄露问题吗？
ThreadLocal-内存泄露问题

Java对象中的四种引用类型：强引用、软引用、弱引用、虚引用
强引用：最为普通的引用方式，表示一个对象处于有用且必须的状态，如果一个对象具有强引用，则GC并不会回收它。即便堆中内存不足了，宁可出现OOM，也不会对其进行回收
```Java
User user = new User();

```
弱引用：表示一个对象处于可能有用且非必须的状态。在GC线程扫描内存区域时，一旦发现弱引用，就会回收到弱引用相关联的对象。对于弱引用的回收，无关内存区域是否足够，一旦发现则会被回收
```Java
User user = new User();
WeakReference weakReference = new WeakReference(user);

```
每一个Thread维护一个ThreadLocalMap，在ThreadLocalMap中的Entry对象继承了WeakReference。其中key为使用弱引用的ThreadLocal实例，value为线程变量的副本
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224182300.png)






## 并发容器
### 常用并发容器

- `ConcurrentHashMap` 在 JDK 8 中基于数组 + 链表 + 红黑树，并配合 CAS 和 synchronized 实现高性能并发。
- `CopyOnWriteArrayList` 每次写操作都会复制一份数据，适合读远远多于写的场景。
- `ConcurrentLinkedQueue` 是基于非阻塞队列，使用 CAS 操作节点的指针，避免加锁。
- `BlockingQueue` 提供阻塞的 put 和 take 操作，广泛用于生产者-消费者模型。
- `ConcurrentSkipListMap` 基于跳表结构，支持并发有序映射，适合需要范围查询的高并发场景。


### Concurrent Hash Map 
ConcurrentHashMap 是一种线程安全的高效Map集合
底层数据结构：
- JDK1.7底层采用分段的数组+链表实现
- JDK1.8 采用的数据结构跟HashMap1.8的结构一样，数组+链表/红黑二叉树。

**JDK1.7中ConcurrentHashMap**
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224180940.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224180949.png)

在JDK1.8中，放弃了Segment臃肿的设计，数据结构跟HashMap的数据结构是一样的：数组+红黑树+链表
采用 CAS + Synchronized来保证并发安全进行实现
- CAS控制数组节点的添加
- synchronized只锁定当前链表或红黑二叉树的首节点，只要hash不冲突，就不会产生并发的问题 , 效率得到提升
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181003.png)

聊一下ConcurrentHashMap 

1. 底层数据结构：
	- JDK1.7底层采用分段的数组+链表实现
	- JDK1.8 采用的数据结构跟HashMap1.8的结构一样，数组+链表/红黑二叉树
- 加锁的方式
	- JDK1.7采用Segment分段锁，底层使用的是ReentrantLock
	- JDK1.8采用CAS添加新节点，采用synchronized锁定链表或红黑二叉树的首节点，相对Segment分段锁粒度更细，性能更好



## 线程池
### 介绍
**是什么**：
线程池 是用于管理和复用线程的技术，
是系统提前创建好的一组可复用的线程。


**如何实现**：
使用 `ExecutorService` 管理线程。
- 任务提交到线程池后由空闲线程去执行，避免了频繁创建和销毁线程的开销。

**作用、优势**：
可以减少线程创建和销毁的开销，提高性能。Java 提供了 `ExecutorService` 接口和常用的线程池实现。

可以控制最大并发线程数，防止系统资源耗尽；
可以复用线程，避免重复创建线程的性能开销；
便于管理线程生命周期，统一调度、回收线程；
提高系统响应速度，任务无需等待线程创建。


### 线程池创建


**不建议用Executors创建线程池**
参考阿里开发手册《Java开发手册-嵩山版》
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181701.png)


示例：
```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(4); // 创建一个固定线程数的线程池

        executorService.submit(() -> {
            System.out.println("Task 1 executed by " + Thread.currentThread().getName());
        });

        executorService.submit(() -> {
            System.out.println("Task 2 executed by " + Thread.currentThread().getName());
        });

        executorService.shutdown(); // 关闭线程池
    }
}
```
- `Executors.newFixedThreadPool(int n)`：创建一个固定大小的线程池。
- `submit()`：提交一个任务到线程池执行。
- `shutdown()`：关闭线程池，停止接收新的任务。




### 线程池的种类有哪些


Java 提供了几种通过 `Executors` 工厂类创建的常用线程池：
直接使用 `ThreadPoolExecutor` 类自定义线程池参数（核心线程数、最大线程数、队列容量、拒绝策略等），以获得更好的控制。
`newFixedThreadPool`：固定线程数，适合负载稳定的长期任务。
`newCachedThreadPool`：线程数可动态增长，适合处理大量短期异步任务。
`newSingleThreadExecutor`：单线程池，确保任务按顺序执行。
`newScheduledThreadPool`：支持定时和周期性任务的执行。
`newWorkStealingPool`：Java 8 引入，基于 ForkJoinPool 实现，适合并行计算任务。



在java.util.concurrent.Executors类中提供了大量创建连接池的静态方法，常见就有四种
1. 创建使用固定线程数的线程池

```Java
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>());
}

```
- 核心线程数与最大线程数一样，没有救急线程
- 阻塞队列是LinkedBlockingQueue，最大容量为Integer.MAX_VALUE
适用于任务量已知，相对耗时的任务

2.  单线程化的线程池，它只会用唯一的工作线程来执行任 务，保证所有任务按照指定顺序(FIFO)执行
```Java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}

```
- 核心线程数和最大线程数都是1
- 阻塞队列是LinkedBlockingQueue，最大容量为Integer.MAX_VALUE
适用于按照顺序执行的任务

3. 可缓存线程池
```Java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}

```
- 核心线程数为0
- 最大线程数是Integer.MAX_VALUE
- 阻塞队列为SynchronousQueue:不存储元素的阻塞队列，每个插入操作都必须等待一个移出操作。
适合任务数比较密集，但每个任务执行时间较短的情况

4. 提供了“延迟”和“周期执行”功能的ThreadPoolExecutor。

```Java
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,new DelayedWorkQueue());
}
public ScheduledThreadPoolExecutor(int corePoolSize,
                                   ThreadFactory threadFactory) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue(), threadFactory);
}
public ScheduledThreadPoolExecutor(int corePoolSize,
                                   RejectedExecutionHandler handler) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue(), handler);
}
public ScheduledThreadPoolExecutor(int corePoolSize,
                                   ThreadFactory threadFactory,
                                   RejectedExecutionHandler handler) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue(), threadFactory, handler);
}

```

线程池的种类有哪些
newFixedThreadPool：创建一个定长线程池，可控制线程最大并发数，超出的线程会在队列中等待
newSingleThreadExecutor：创建一个单线程化的线程池，它只会用唯一的工作线程来执行任 务，保证所有任务按照指定顺序(FIFO)执行
newCachedThreadPool：创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空闲线程，若无可回收，则新建线程
newScheduledThreadPool：可以执行延迟任务的线程池，支持定时及周期性任务执行




### 说一下线程池的核心参数

* 七大核心参数： `corePoolSize` (核心线程数), `maximumPoolSize` (最大线程数), `keepAliveTime` (空闲存活时间), `unit` (时间单位), `workQueue` (任务队列), `threadFactory` (线程工厂), `handler` (拒绝策略)。


```Java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler)

```
- corePoolSize 核心线程数目
- maximumPoolSize 最大线程数目 = (核心线程+救急线程的最大数目)
- keepAliveTime 生存时间 - 救急线程的生存时间，生存时间内没有新任务，此线程资源会释放
- unit 时间单位 - 救急线程的生存时间单位，如秒、毫秒等
- workQueue - 当没有空闲核心线程时，新来任务会加入到此队列排队，队列满会创建救急线程执行任务
- threadFactory 线程工厂 - 可以定制线程对象的创建，例如设置线程名字、是否是守护线程等
- handler 拒绝策略 - 当所有线程都在繁忙，workQueue 也放满时，会触发拒绝策略
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181319.png)

如果核心或临时线程执行完成任务后会检查阻塞队列中是否有需要执行的线程，如果有，则使用非核心线程执行任务

1.AbortPolicy：直接抛出异常，默认策略；
2.CallerRunsPolicy：用调用者所在的线程来执行任务；
3.DiscardOldestPolicy：丢弃阻塞队列中靠最前的任务，并执行当前任务；
4.DiscardPolicy：直接丢弃任务；


### 如何确定核心线程数

IO密集型任务
一般来说：文件读写、DB读写、网络请求等
核心线程数大小设置为2N+1

CPU密集型任务
一般来说：计算型代码、Bitmap转换、Gson转换等
核心线程数大小设置为N+1

查看机器的CPU核数
```Java
public static void main(String[] args) {
       //查看机器的CPU核数
    System.out.println(Runtime.getRuntime().availableProcessors());
}

```

如何确定核心线程数
参考回答：
① 高并发、任务执行时间短 →（ CPU核数+1 ），减少线程上下文的切换
② 并发不高、任务执行时间长
IO密集型的任务 → (CPU核数 * 2 + 1)
计算密集型任务 →（ CPU核数+1 ）
③ 并发高、业务执行时间长，解决这种类型任务的关键不在于线程池而在于整体架构的设计，看看这些业务里面某些数据是否能做缓存是第一步，增加服务器是第二步，至于线程池的设置，设置参考（2）





### 执行流程
（线程池的执行原理知道嘛）

* 执行流程： 提交任务 -> 若核心线程未满则创建新线程 -> 若满则放入队列 -> 若队列满且未达最大线程数则创建非核心线程 -> 若都满则执行拒绝策略（如 `AbortPolicy`, `CallerRunsPolicy` 等）。



### 常见阻塞队列

workQueue - 当没有空闲核心线程时，新来任务会加入到此队列排队，队列满会创建救急线程执行任务

- ArrayBlockingQueue：基于数组结构的有界阻塞队列，FIFO。
- LinkedBlockingQueue：基于链表结构的有界阻塞队列，FIFO。
- DelayedWorkQueue ：是一个优先级队列，它可以保证每次出队的任务都是当前队列中执行时间最靠前的
- SynchronousQueue：不存储元素的阻塞队列，每个插入操作都必须等待一个移出操作。

ArrayBlockingQueue的LinkedBlockingQueue区别
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181407.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181422.png)




### ThreadPoolExecutor


### 线程池使用场景
（CountDownLatch、Future）
(你们项目中哪里用到了线程池)


CountDownLatch
CountDownLatch（闭锁/倒计时锁）用来进行线程同步协作，等待所有线程完成倒计时（一个或者多个线程，等待其他多个线程完成某件事情之后才能执行）
其中构造参数用来初始化等待计数值
await() 用来等待计数归零
countDown() 用来让计数减一
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181729.png)

**多线程使用场景一**（ es数据批量导入）
在我们项目上线之前，我们需要把数据库中的数据一次性的同步到es索引库中，但是当时的数据好像是1000万左右，一次性读取数据肯定不行（oom异常），当时我就想到可以使用线程池的方式导入，利用CountDownLatch来控制，就能避免一次性加载过多，防止内存溢出
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181741.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181749.png)


**多线程使用场景二（数据汇总）**

在一个电商网站中，用户下单之后，需要查询数据，数据包含了三部分：订单信息、包含的商品、物流信息；这三块信息都在不同的微服务中进行实现的，我们如何完成这个业务呢？

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181823.png)

在实际开发的过程中，难免需要调用多个接口来汇总数据，如果所有接口（或部分接口）的没有依赖关系，就可以使用线程池+future来提升性能

报表汇总
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181831.png)

多线程使用场景三（异步调用）
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181838.png)
异步保存👇↓
（在线程池中获取一个新的线程执行）
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224181855.png)


你们项目哪里用到了多线程
- 批量导入：使用了线程池+CountDownLatch批量把数据库中的数据导入到了ES(任意)中，避免OOM
- 数据汇总：调用多个接口来汇总数据，如果所有接口（或部分接口）的没有依赖关系，就可以使用线程池+future来提升性能
- 异步线程（线程池）：为了避免下一级方法影响上一级方法（性能考虑），可使用异步线程调用下一个方法（不需要下一级方法返回值），可以提升方法响应时间




### 限制执行线程数

如何控制某个方法允许并发访问线程的数量
在多线程中提供了一个工具类Semaphore，信号量。在并发的情况下，可以控制方法的访问量
- 创建Semaphore对象，可以给一个容量
- acquire()可以请求一个信号量，这时候的信号量个数-1
- release()释放一个信号量，此时信号量个数+1

如何控制某个方法允许并发访问线程的数量
Semaphore信号量，是JUC包下的一个工具类，底层是AQS，我们可以通过其限制执行的线程数量
使用场景：
通常用于那些资源有明确访问数量限制的场景，常用于限流 。

Semaphore使用步骤
- 创建Semaphore对象，可以给一个容量
- semaphore.acquire()： 请求一个信号量，这时候的信号量个数-1（一旦没有可使用的信号量，也即信号量个数变为负数时，再次请求的时候就会阻塞，直到其他线程释放了信号量）
- semaphore.release()：释放一个信号量，此时信号量个数+1
```Java
// 1. 创建 semaphore 对象
Semaphore semaphore = new Semaphore(3);
// 2. 10个线程同时运行
for (int i = 0; i < 10; i++) {
    new Thread(() -> {
        try {
            // 3. 获取许可
       semaphore.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        try {
            System.out.println("running...");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("end...");
        } finally {
            // 4. 释放许可
       semaphore.release();
        }
    }).start();
}

```



## END