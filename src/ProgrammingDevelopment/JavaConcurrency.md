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
## **基本概念**
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



## 创建线程
**创建线程的方式**：
- 继承 `Thread` 类：通过继承 `Thread` 类并重写其 `run()` 方法来定义线程任务。
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

- 实现 `Runnable` 接口：`Runnable` 是一个函数式接口，可以被用作实现线程执行逻辑。通过实现 `Runnable` 接口并将它传递给 `Thread` 构造器来创建线程。
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




`run()` 方法定义了线程需要执行的任务。它是一个普通的 `public void run()` 方法。
调用 `start()` 方法会使线程进入 **可运行状态**（`Runnable` 状态），然后被 JVM 调度执行。
它会 **调用 `run()` 方法** 来执行线程中的任务。
必须通过调用 `Thread` 对象的 `start()` 方法来启动线程。
`start()` 方法会创建一个新的线程，并且新的线程将会执行 `run()` 方法中的任务。
- 你 **不能直接调用 `run()` 方法** 来启动线程。
    
- 调用 `start()` 会 **异步** 执行 `run()` 方法，即不会阻塞当前线程，新的线程会在后台执行 `run()`。
如果你直接调用 `run()` 方法，那么这并不会创建新线程。它只是 **当前线程执行 `run()` 方法中的任务**，不会创建新线程，也不会异步执行。
如果你直接调用 `run()`，它只是 **同步执行**，即当前线程会直接调用 `run()` 中的代码，**不会启动新线程**。






## 生命周期
**线程的生命周期**：**新建状态**、**可运行状态**、**阻塞状态**、**等待状态** 和 **终止状态**。
- **新建状态**（New）：线程被创建，但尚未开始执行。通过调用 `Thread` 的构造方法来创建线程对象，但未调用 `start()` 方法。
- **可运行状态**（Runnable）：线程已经启动，可以进行调度执行。线程调用 `start()` 方法后会进入可运行状态，系统会分配 CPU 时间片执行任务。
- **阻塞状态**（Blocked）：线程因为某些条件被阻塞，等待某个资源释放。例如调用 `Thread.sleep()`、`wait()` 或者获取锁时，线程会被阻塞，暂时停止执行，直到恢复。
- **等待状态**（Waiting）：线程正在等待某个条件，直到某些外部事件触发它的恢复。例如调用 `join()` 方法时，线程进入等待状态，直到其他线程完成。
- **终止状态**（Terminated）：线程执行完成，或者因异常中止。
**线程状态转换的关系**：**New → Runnable → Running → Blocked/Waiting → Runnable → Terminated**

## 线程同步（Thread Synchronization）
在并发编程中，多个线程可能会访问共享资源，导致数据不一致或错误。为了解决这个问题，需要使用 **线程同步**。



## Synchronized
- `synchronized`是Java中的一个关键字，用来确保同一时刻只有一个线程可以执行某个代码块，防止多个线程同时访问共享资源。用于实现线程同步，确保在并发环境下多个线程对共享资源的安全访问。
- 它通过加锁机制实现
- 一个对象在同一时刻只能被一个线程锁住，因此保证了**同步代码块的互斥性**。
- 避免多个线程**同时读写**同一个变量或对象时，造成 **数据冲突或不一致**
- `synchronized`机制在底层由JVM实现，使用对象监视器（Monitor）来管理锁的获取和释放。尽管`synchronized`是一种简便的同步机制，但其性能可能不如轻量级的`ReentrantLock`，尤其是在高并发环境下。因此，在性能要求较高的场景，可以考虑`ReentrantLock`等更灵活的锁机制。
- `synchronized`的作用主要在于**确保互斥访问和内存可见性**。当一个线程获得锁进入`synchronized`代码块后，其他线程将被阻塞，直到当前线程释放锁；进入`synchronized`块的线程会从主存中读取共享变量的最新值，并在退出时刷新修改结果，保证线程间的变量可见性。
- **对象锁**：`synchronized` 可以锁定某个对象，如果多个线程试图访问同一个对象的同步代码块，它们会依次排队。
    
- **类锁**：`synchronized` 也可以锁定类级别的代码块（通常是 `Class` 对象）。
`synchronized` 语法简单，适合锁范围小、竞争不激烈的场景。

- RPC的CircuitBreakerProvider的getCircuitBreaker用到了这个东西

synchronized可以修饰：静态方法、实例方法、代码块等：
```java
public static synchronized void staticMethod() {
    // 同步静态方法
}

public synchronized void method() {
    // 同步方法
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

## sychronzied和reentranlock的区别

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


## `Lock` 接口
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


## 线程安全

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

**线程安全** 是指一个类在多线程环境中能正常工作，无论多个线程如何 **并发地访问** 和 **修改** 对象的状态，都能保证对象处于一致的状态，并且不会出现异常或数据错误。

线程安全的两种实现方式：
1. **同步**：通过同步技术（如 `synchronized`、`ReentrantLock` 等）来保证同一时刻只有一个线程可以访问共享资源，确保 **原子性** 和 **可见性**。
2. **无锁**：通过使用原子类（如 `AtomicInteger`）、并发容器（如 `ConcurrentHashMap`）等技术，避免加锁，从而提高性能。

线程安全的特征：
- 对 **共享数据的访问** 是 **安全的**，多个线程对数据的访问不会造成数据不一致或错误。
- 线程安全的类可以被 **多个线程同时访问**，但不会引发竞争条件。

**线程安全** 表示对象能够在多个线程并发访问时依然保持正确性，而 **线程同步** 是实现线程安全的一种常见方式。

使用 `synchronized` 是最常见的方式，确保同一时间只有一个线程可以访问共享资源。
使用显式的 `Lock` 接口，如 `ReentrantLock`，提供更多控制选项。
使用 `volatile` 修饰共享变量，保证可见性但不保证原子性。
使用原子类，如 `AtomicInteger`，通过 CAS 算法实现无锁线程安全。
使用并发容器，如 `ConcurrentHashMap`，避免自己加锁。
使用 `ThreadLocal`，每个线程有自己的变量副本，不共享也就避免了线程安全问题。

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



## 线程池
- **线程池**：使用 `ExecutorService` 管理线程。
- 线程池：线程池是系统提前创建好的一组可复用的线程。任务提交到线程池后由空闲线程去执行，避免了频繁创建和销毁线程的开销。
**线程池** 是用于管理和复用线程的技术，可以减少线程创建和销毁的开销，提高性能。Java 提供了 `ExecutorService` 接口和常用的线程池实现。

线程池的优势包括：
可以控制最大并发线程数，防止系统资源耗尽；
可以复用线程，避免重复创建线程的性能开销；
便于管理线程生命周期，统一调度、回收线程；
提高系统响应速度，任务无需等待线程创建。

线程池：Java 提供了几种通过 `Executors` 工厂类创建的常用线程池：
直接使用 `ThreadPoolExecutor` 类自定义线程池参数（核心线程数、最大线程数、队列容量、拒绝策略等），以获得更好的控制。
`newFixedThreadPool`：固定线程数，适合负载稳定的长期任务。
`newCachedThreadPool`：线程数可动态增长，适合处理大量短期异步任务。
`newSingleThreadExecutor`：单线程池，确保任务按顺序执行。
`newScheduledThreadPool`：支持定时和周期性任务的执行。
`newWorkStealingPool`：Java 8 引入，基于 ForkJoinPool 实现，适合并行计算任务。


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

## java提供的并发容器
`ConcurrentHashMap` 在 JDK 8 中基于数组 + 链表 + 红黑树，并配合 CAS 和 synchronized 实现高性能并发。
`CopyOnWriteArrayList` 每次写操作都会复制一份数据，适合读远远多于写的场景。
`ConcurrentLinkedQueue` 是基于非阻塞队列，使用 CAS 操作节点的指针，避免加锁。
`BlockingQueue` 提供阻塞的 put 和 take 操作，广泛用于生产者-消费者模型。
`ConcurrentSkipListMap` 基于跳表结构，支持并发有序映射，适合需要范围查询的高并发场景。


## AQS
AQS（AbstractQueuedSynchronizer）是Java并发包（`java.util.concurrent`）中的一个同步框架，提供了构建锁和同步器的基础。AQS采用FIFO（先进先出）队列机制管理线程的获取和释放，是实现许多高效并发工具类（如`ReentrantLock`、`CountDownLatch`、`Semaphore`等）的核心组件。
AQS通过一个**共享资源状态（state）变量**和**双向队列**来管理线程的访问和同步。以下是AQS的关键原理和工作机制：
**共享资源状态**。AQS维护一个`state`变量，表示同步资源的当前状态。`state`可以是一个计数值或状态标志，用于表示锁的持有情况或资源的剩余数量。具体含义由子类定义，比如在`ReentrantLock`中表示锁的持有次数，在`CountDownLatch`中表示倒计时计数。
**独占模式和共享模式**。AQS支持独占和共享两种访问模式。独占模式下，只有一个线程可以访问资源，适合独占锁（如`ReentrantLock`）。共享模式下，多个线程可以同时获取资源，适合共享资源的并发访问（如`Semaphore`和`CountDownLatch`）。
- 在独占模式下，线程会竞争获取资源。未获得资源的线程会进入等待队列，并被阻塞直到资源可用或超时。
- 在共享模式下，多个线程可以同时访问资源，满足并发性需求。常用于并发信号量和栅栏等场景。
**FIFO等待队列**。AQS内部采用一个FIFO等待队列存放未获取到资源的线程。线程在尝试获取资源失败后，会被加入到该队列并进入等待状态，当资源释放或状态改变时，AQS会唤醒队列中的线程按顺序尝试重新获取资源。
**模板方法**。AQS定义了一套模板方法（如`tryAcquire`、`tryRelease`、`tryAcquireShared`、`tryReleaseShared`等），用于资源的获取和释放。具体的资源操作逻辑由子类实现。例如，`ReentrantLock`实现了独占的获取和释放逻辑，而`Semaphore`实现了共享的获取和释放逻辑。
**原子操作和CAS**。AQS依赖于CAS（Compare-And-Swap）操作和`volatile`关键字来保证资源状态的线程安全性。CAS是AQS实现高效并发的基础，确保了在多线程环境下的原子性操作。通过CAS和`volatile`，AQS在不加锁的情况下实现了状态修改和队列操作。
**Condition支持**。AQS还支持条件队列，通过`ConditionObject`类实现`Condition`接口。条件队列允许线程在特定条件下等待，并在条件满足后被唤醒。每个条件队列与一个锁对象关联，常用于实现高级同步机制。
AQS的工作流程如下：当一个线程尝试获取资源时，AQS判断资源状态并决定是否授予访问权限。如果资源不可用，线程会被加入等待队列并挂起。资源释放时，AQS会唤醒队列中的一个或多个线程并重新判断资源状态。AQS的设计使得各种锁和同步器能够在并发环境下高效工作。
总结来说，AQS通过资源状态管理、双向队列、模板方法和CAS实现了一个通用的、灵活的同步框架，是Java并发包中实现多种同步器的核心基础。


**AQS（AbstractQueuedSynchronizer）** 是 Java 并发包中的一个抽象类，提供了用于构建锁或同步器的基础框架。它是实现锁、信号量、倒计时闩锁等同步器的基础。


AQS 的数据结构

AQS 内部使用 **FIFO 队列** 来保存等待获取锁的线程，通常通过 `Node` 类（一个双向链表节点）来表示每个线程在队列中的状态。每个线程都会被封装成一个 `Node` 节点，当线程无法获取到资源时，它会进入队列等待。

AQS 的成员

AQS 主要有以下几个重要成员：

1. **state**：表示当前同步器的状态，通常用于表示锁是否被占用，或信号量的许可数量等。
    
2. **head**：队列的头节点，指向当前等待的线程队列的头部。
    
3. **tail**：队列的尾节点，指向队列的末尾。
    
4. **condition**：用于实现 `Condition` 类的条件队列（如 `await()`、`signal()` 等方法）。
    

state 的类型
`state` 是一个 `volatile` 类型的 `int` 变量，通常用于表示同步器的当前状态，比如锁的占用情况，信号量的剩余许可数量等。它是一个 32 位的整数，可以通过自定义的方式来定义不同的状态值。


## volatile关键字
`volatile` 是一种轻量级的同步机制，它的作用主要有两个：**可见性** 和 **有序性**
`volatile` 并没有解决线程安全问题，它仅仅保证了变量在多线程间的**可见性**。
第一，保证可见性。一个线程修改了 `volatile` 变量，其他线程可以立即看到这个改动。
在多线程环境下，每个线程都会有自己的工作内存（如 CPU 寄存器、缓存等），线程对变量的修改并不一定会立刻反映到其他线程的工作内存中，这就导致了线程之间的**不一致性**。

**`volatile` 的作用就是解决这个问题：** 它确保了对变量的写操作能立即更新到主内存，**其他线程能看到最新的值**。
示例：
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

第二，禁止指令重排序。它能保证写入操作发生在读操作之前，维护操作顺序。
需要注意的是，`volatile` 不能保证原子性，例如 `count++` 就不是线程安全的。
Java 内存模型（JMM）允许编译器、处理器重排指令，以提高程序执行效率。这样虽然代码是按顺序写的，但执行时可能会出现 **指令重排**，导致程序行为不可预期。

**`volatile`** 可以 **防止指令重排**，尤其是在赋值操作和读取操作之间的重排序。
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
`volatile` 的工作原理

`volatile` 工作的本质是通过内存屏障（memory barrier）来确保 **主内存和工作内存** 之间的同步。内存屏障的作用是防止指令重排，并且强制刷新缓存中的数据。

2.1 **内存屏障和同步**

- **写入屏障（Store Barrier）**：写入屏障强制将工作内存中的值刷新到主内存，确保其他线程可以读取到最新的值。
    
- **读取屏障（Load Barrier）**：读取屏障确保从主内存读取最新的值，避免缓存中的旧数据。
    

`volatile` 通过这两个屏障来保证变量在不同线程间的正确同步。


`volatile` 的局限性

**不保证原子性**

`volatile` 仅保证变量的**可见性**，并不能保证操作的**原子性**。例如对于复合操作（如 `i++`、`x = y + z`），`volatile` 无法保证操作是原子性的。

`private volatile int count = 0;  public void increment() {     count++;  // 不是原子操作 }`

- `count++` 实际上分为 **读取、增加、写入** 3步，这3步操作并不是原子性的，因此如果多个线程同时执行该操作，可能会发生竞争条件（race condition），导致结果错误。
    
- 为了确保 **原子性**，可以使用 `synchronized` 或 `Lock` 来同步代码块，或者使用 Java 提供的 **原子类**（如 `AtomicInteger`）。
    

3.2 **不适用于所有场景**

- `volatile` 适合用于标志位、状态变量等情况。它非常适合用于 **单一变量的控制**，但是对于复杂操作的协调，它并不是最好的选择。
    
- 对于需要保证 **多个线程访问共享资源时的完整性**（如计数、累加等），需要使用 **锁** 或 **原子操作**（如 `AtomicInteger`）。

`volatile` 的使用场景

4.1 **双重检查锁定（Double-Checked Locking）**

`volatile` 在双重检查锁定模式下用于保证 **延迟初始化的线程安全**。常见于懒汉式单例模式的实现中。

`public class Singleton {     private static volatile Singleton instance;      private Singleton() {}      public static Singleton getInstance() {         if (instance == null) {             synchronized (Singleton.class) {                 if (instance == null) {                     instance = new Singleton();                 }             }         }         return instance;     } }`

- 通过 `volatile` 确保了 **instance** 的可见性，防止线程重排。
    

4.2 **标志位**

通常用于控制线程之间的通信或状态标志，确保一个线程对标志的更新能及时反映到其他线程。

`private volatile boolean flag = false;  public void setFlag() {     flag = true; }  public void checkFlag() {     while (!flag) {         // 做一些操作     } }`

- 这里 `flag` 使用 `volatile` 保证了更新后的状态能够立即被其他线程看到。


## ThreadLocal
`ThreadLocal` 是 Java 提供的一种用于 **线程隔离的变量存储机制**。它的作用是让每个线程都拥有自己的变量副本，互不影响。
使用场景包括：
* 每个线程需要独立保存用户信息、数据库连接、日期格式化器等。
* 避免使用全局变量或同步锁带来的线程安全问题。
工作机制是：每个线程内部维护一个 ThreadLocalMap，`ThreadLocal.set()` 和 `get()` 实际是操作这个 map，从而实现线程私有变量。
`ThreadLocal`是Java中的一个用于实现线程本地存储的类，它为每个线程提供独立的变量副本，使变量在不同线程之间相互隔离。`ThreadLocal`非常适合用于在多线程环境中共享的变量且不希望在线程之间相互干扰的场景，例如在每个线程中存储用户会话信息、事务上下文、数据库连接等。
`ThreadLocal`的核心机制是为每个线程创建一个独立的变量副本，这个变量仅对当前线程可见。Java中的`ThreadLocal`变量在每个线程中都会有一个独立的值，确保了变量的线程安全性而无需使用锁来同步访问。下面是`ThreadLocal`的主要方法和工作原理：
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


## END