---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---
一个简单的**Java集合**入门教程
<!-- more -->

# Java集合

## **Collections 工具类**

Java 集合框架主要分为 **`Collection`** (单列集合) 和 **`Map`** (双列集合/键值对) 两大体系。
**Collection 体系**（继承自 `Iterable`）
* **List**（有序、可重复）
	* `ArrayList`：底层数组，查询快，增删慢，线程不安全。
	* `LinkedList`：底层双向链表，查询慢，增删快，线程不安全。
	* `Vector`：底层数组，线程安全（方法加了 synchronized），已淘汰。
	* `Stack`：继承自 Vector，先进后出。
* **Set**（无序、唯一）
	* `HashSet`：底层是 HashMap，无序，性能最好。
		* `LinkedHashSet`：哈希表和链表作为底层，维护插入顺序。
	* TreeSet 红黑树结构
* `TreeSet`：底层是红黑树（TreeMap），自动排序。
* **Queue**（队列）
	* `PriorityQueue`：优先队列，堆结构。
	* `Deque`（双端队列）：
		* `ArrayDeque`：底层数组，栈和队列的首选实现。
		* `LinkedList`：也实现了 Deque 接口。
**Map 体系**（独立接口，不继承 Collection）
* **HashMap**：底层数组 + 链表 + 红黑树，Key 无序，线程不安全。
	* `LinkedHashMap`：哈希表和链表作为底层，维护插入顺序（LRU 算法基础）。
* **TreeMap**：底层红黑树，Key 自动排序。
* **Hashtable**：线程安全，Key/Value 不能为 null，已淘汰。
	* Properties
* **ConcurrentHashMap**（JUC包）：哈希表结构，线程安全的高性能 Map。

- 提供了一系列静态方法来操作或返回集合，如排序、查找、同步包装等。
- **常用方法**：
    - `sort(List<T> list)`：对列表进行排序。
    - `binarySearch(List<? extends Comparable<? super T>> list, T key)`：在已排序的列表中进行二分查找。
    - `synchronizedList(List<T> list)`：返回线程安全的同步列表。
    - `unmodifiableList(List<? extends T> list)`：返回不可修改的列表视图。



## List列表


**简介**：有序的集合。集合中的元素有对应的索引，能够依据索引对元素进行访问、插入和删除操作。允许存在重复元素。

ArrayList底层的实现原理是什么
- 底层数据结构： ArrayList底层是用动态的数组实现的
- 初始容量： ArrayList初始容量为0，当第一次添加数据的时候才会初始化容量为10
- 扩容逻辑： ArrayList在进行扩容的时候是原来容量的1.5倍，每次扩容都需要拷贝数组
- 添加逻辑：
	- 确保数组已使用长度（size）加1之后足够存下下一个数据​	
	- 计算数组的容量，如果当前数组已使用长度+1后的大于当前的数组长度，则调用grow方法扩容（原来的1.5倍）
	- 确保新增的数据有地方存储之后，则将新元素添加到位于size的位置上。​
	- 返回添加成功布尔值。

`ArrayList list=new ArrayList(10)`中的list扩容几次
参考回答：
	该语句只是声明和实例了一个 ArrayList，指定了容量为 10，未扩容 

```java
/**
 * 构造一个具有指定初始容量的空列表。
 * 参数：initialCapacity - 列表的初始容量
 * 抛出：IllegalArgumentException – 如果指定的初始容量为负
 */
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+
                initialCapacity);
    }
}
```

如何实现数组和List之间的转换
参考回答：
- 数组转List ，使用JDK中java.util.Arrays工具类的asList方法
- List转数组，使用List的toArray方法。无参toArray方法返回 Object数组，传入初始化长度的数组对象，返回该对象数组

```java
//数组转List
public static void testArray2List(){
    String[] strs = {"aaa","bbb","ccc"};
    List<String> list = Arrays.asList(strs);
    for (String s : list) {
        System.out.println(s);
    }
}
//List转数组
public static void testList2Array(){
    List<String> list = new ArrayList<String>();
    list.add("aaa");
    list.add("bbb");
    list.add("ccc");
    String[] array = list.toArray(new String[list.size()]);
    for (String s : array) {
        System.out.println(s);
    }
}
```
面试官再问：
- 用Arrays.asList转List后，如果修改了数组内容，list受影响吗
- List用toArray转数组后，如果修改了List内容，数组受影响吗
再答：
- Arrays.asList转换list之后，如果修改了数组的内容，list会受影响，因为它的底层使用的Arrays类中的一个内部类ArrayList来构造的集合，在这个集合的构造器中，把我们传入的这个集合进行了包装而已，最终指向的都是同一个内存地址
- list用了toArray转数组后，如果修改了list内容，数组不会影响，当调用了toArray以后，在底层是它是进行了数组的拷贝，跟原来的元素就没啥关系了，所以即使list修改了以后，数组也不受影响
```java

//数组转List
public static void testArray2List(){
    String[] strs = {"aaa","bbb","ccc"};
    List<String> list = Arrays.asList(strs);
    for (String s : list) {
        System.out.println(s);
    }
    strs[1]="ddd";
    System.out.println("================");
    for (String s : list) {
        System.out.println(s);
    }
}
//List转数组
public static void testList2Array(){
    List<String> list = new ArrayList<String>();
    list.add("aaa");
    list.add("bbb");
    list.add("ccc");
    String[] array = list.toArray(new String[list.size()]);
    for (String s : array) {
        System.out.println(s);
    }
    list.add("ddd");
    System.out.println("================");
    for (String s : array) {
        System.out.println(s);
    }
}
```



**常见实现类**：
- `ArrayList`：基于动态数组实现，查询快，插入和删除慢。适合读取频繁的场景。
- `LinkedList`：基于双向链表实现，插入和删除快，但查询较慢。适合频繁插入和删除的场景。
- `CopyOnWriteArrayList`：线程安全的 `ArrayList`，用于并发环境
- `Vector`：已过时，线程安全，性能较低。在需要线程安全的场景下，通常推荐使用`ArrayList`配合外部同步或使用`CopyOnWriteArrayList`。

**`List`接口的常用方法**：
- `add(E e)`：在列表末尾添加元素。
- `add(int index, E element)`：在指定索引处插入元素。
- `get(int index)`：获取指定索引处的元素。
- `set(int index, E element)`：替换指定索引处的元素。
- `remove(int index)`：移除指定索引处的元素。
- `size()`：返回列表中的元素数量。

**ArrayList的扩容机制**
- 扩容就是创建一个更大的新数组，并把旧数组中的元素拷贝到新数组。
- `ArrayList` 默认初始容量为 10，可以使用 `new ArrayList<>(initialCapacity)` 指定初始容量。
- 当达到容量时，触发扩容机制，新容量等于，初始容量+扩容因子*容量。
- 时间成本：数组拷贝 (`System.arraycopy()`)，时间复杂度为 O(n)。
- 空间成本：新数组占用更大空间，旧数组等待 GC 释放。

**ArrayList和Array的区别**
- 长度：`Array`的长度是固定的，一旦创建就不能改变。`ArrayList`的长度是可变的，会依据元素数量自动扩容。
- 数据类型：`Array`可以存储基本数据类型（如`int`、`char`等）和引用数据类型。`ArrayList`只能存储引用数据类型，若要存储基本数据类型，需使用对应的包装类（如`Integer`、`Character`等）。
- 功能：`Array`基本只能通过索引访问和修改元素。`ArrayList`是一个类，提供了丰富的方法，像添加、删除、查找等操作。
- 性能：`Array` 访问元素更快，索引访问时间复杂度为 O(1)。`ArrayList` 由于可能涉及扩容和元素移动，性能稍逊于数组。
- 插入和删除：`Array` 需要手动管理元素的插入和删除，不提供内置方法。`ArrayList` 提供 `add()`、`remove()` 等方法，内部会自动调整数组大小。
- 内存使用：`Array` 仅存储元素，占用内存较少。`ArrayList` 由于扩容机制，会预留额外空间，可能会浪费部分内存。
- 适用场景：如果数据大小固定且访问频繁，使用 `Array`。如果数据大小不固定且需要灵活操作，使用 `ArrayList`。


**ArrayList 与 LinkedList 的区别**
- **实现方式**：
	- `ArrayList`基于动态数组实现，
	- `LinkedList`基于双向链表实现
- **访问性能方面**：
	- `ArrayList`支持随机访问（按照下标查询），通过索引访问元素的时间复杂度是 O (1)。
	- `LinkedList`不支持随机访问，访问元素需要从头或尾开始遍历链表，时间复杂度是 O (n)。
- 插入和删除性能方面：
	- `ArrayList`在列表末尾插入和删除元素的时间复杂度是 O (1)，但在中间或开头插入和删除元素时，需要移动后续元素，时间复杂度是 O (n)。
	- `LinkedList`在头尾节点增删时间复杂度是O(1)，其他任意位置插入和删除元素的时间复杂度都是 O (n)，虽然只需修改相邻节点的引用，但需要找到插入删除位置啊。
- 内存占用方面：
	- `ArrayList`的内存占用相对较小，仅存储元素，主要是数组本身的开销。
	- `LinkedList`是双向链表，每个节点除了存储元素外，还需要存储额外的引用指针，内存占用相对较大。
- 线程安全
	- ArrayList和LinkedList都不是线程安全的
	- 如果需要保证线程安全，有两种方案：
		- 在方法内使用，局部变量则是线程安全的
		- 使用线程安全的`ArrayList`和`LinkedList`
```
List<Object> syncArrayList = Collections.synchronizedList(new ArrayList<>());
List<Object> syncLinkedList = Collections.synchronizedList(new LinkedList<>());
```
- 适用场景：如果查询操作多，使用 `ArrayList`。如果插入和删除操作多，使用 `LinkedList`。






**ArrayList的序列化**
- ArrayList 本身实现了 Serializable 接口，可以直接被序列化和反序列化
- ArrayList序列化要确保内部对象也实现了 Serializable 。
* 常见的 String、Integer、Double 等都已经是 `Serializable`。
* 如果 `ArrayList` 中包含了不可序列化的对象，序列化会抛出异常：`java.io.NotSerializableException: YourObject`

源码分析
```java
// 说明：以下源码都来源于jdk1.8
List<Integer> list = new ArrayList<Integer>();
list.add(1);
```

// 成员变量

```java
/**
 * 默认初始的容量(CAPACITY)
 */
private static final int DEFAULT_CAPACITY = 10;
/**
 * 用于空实例的共享空数组实例
 */
private static final Object[] EMPTY_ELEMENTDATA = {};
/**
 * 用于默认大小的空实例的共享空数组实例。
 * 我们将其与 EMPTY_ELEMENTDATA 区分开来，以了解添加第一个元素时要膨胀多少
 */
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
/**
 * 存储 ArrayList 元素的数组缓冲区。 ArrayList 的容量就是这个数组缓冲区的长度。
 * 当添加第一个元素时，任何具有 elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA 的空 ArrayList
 * 都将扩展为 DEFAULT_CAPACITY
 * 当前对象不参与序列化
 */
transient Object[] elementData; // non-private to simplify nested class access
/**
 * ArrayList 的大小（它包含的元素数量）
 * @serial
 */
private int size;

// 带初始化容量的构造函数
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+
                                           initialCapacity);
    }
}

// 无参构造函数，默认创建空集合
/**
 * Constructs an empty list with an initial capacity of ten.
 */
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}

// 将collection对象转换成数组，然后将数组的地址的赋给elementData
public ArrayList(Collection<? extends E> c) {
    Object[] a = c.toArray();
    if ((size = a.length) != 0) {
        if (c.getClass() == ArrayList.class) {
            elementData = a;
        } else {
            elementData = Arrays.copyOf(a, size, Object[].class);
        }
    } else {
        // replace with empty array.
        elementData = EMPTY_ELEMENTDATA;
    }
}
```

// 添加和扩容操作(第1次添加数据)

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  
    elementData[size++] = e;
    return true;
}

// 确保内部容量
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}

// 计算容量，DEFAULT_CAPACITY=10
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}


// 如果大于0，说明容量不够，需扩容

private void ensureExplicitCapacity(int minCapacity) {
    modCount++;
    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}


// 扩容方法
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1); // 增加原来容量的1.5倍
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity; // 第一次初始化数组长度
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity); // 数组拷贝
}
```

// 添加和扩容操作(第2至10次添加数据)

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  
    elementData[size++] = e;
    return true;
}
// 确保内部容量
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}
// 计算容量 DEFAULT_CAPACITY=10
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}
// 如果大于0，说明容量不够，需扩容
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}

// 扩容方法
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1); // 增加原来容量的1.5倍

    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity; // 第一次初始化数组长度

    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity); // 数组拷贝

}

```



## List列表-代码
List接口和常用实现类导入
```Java
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Collections;
import java.util.Arrays;
```
创建List
```Java
List<String> list = new ArrayList<>(); // 使用ArrayList

List<String> linkedList = new LinkedList<>(); // 使用LinkedList

List<String> predefinedList = Arrays.asList("A", "B", "C"); 
// 使用Arrays.asList()快速初始化
// 注意：此方法返回的List是固定大小的，不能进行增删操作
```

访问元素
```Java

// 通过索引访问
String element = list.get(0); // 获取第一个元素
// 使用传统的for循环和索引
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}

// 使用增强型for循环遍历
for (String item : list) {
    System.out.println(item);
}

// 使用迭代器
import java.util.Iterator;

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

// 使用forEach方法
list.forEach(System.out::println);

// 使用Java 8的forEach和Lambda表达式
list.forEach(item -> System.out.println(item));


```

操作元素
```Java
// 添加元素
// 在末尾添加元素
list.add("A");
// 添加多个元素
List<String> newElements = Arrays.asList("E", "F");
list.addAll(newElements);
// 在指定位置插入元素
list.add(1, "C"); // 在索引1的位置插入"C"

// 修改元素
// 通过索引修改
list.set(1, "C"); // 将索引1的元素修改为"C"

// 删除元素
通过索引删除
list.remove(0); // 删除第一个元素
// 通过对象删除
list.remove("B"); // 删除第一个匹配"B"的元素
list.remove(list.size() - 1); // 移除最新添加的那个元素

// 删除指定范围内的元素
list.subList(1, 3).clear(); // 删除索引1到2的元素
// 删除所有元素
list.clear();
// 删除多个元素
list.removeAll(Arrays.asList("B", "C"));
// 保留指定的元素
list.retainAll(Arrays.asList("A", "D")); // 仅保留"A"和"D"，其余元素将被删除

// 替换元素
// 替换指定位置的元素
list.set(2, "D"); // 将索引2的元素替换为"D"
// 替换所有匹配的元素
Collections.replaceAll(list, "A", "Z"); // 将所有"A"替换为"Z"

// 排序List
// 使用Collections.sort()
import java.util.Collections;

Collections.sort(list); // 默认升序排序（List元素需实现Comparable接口）
// 使用Collections.sort()与自定义比较器

Collections.sort(list, (s1, s2) -> s2.compareTo(s1)); // 降序排序

// 使用Java 8的sort()方法
list.sort(String::compareTo); // 升序
list.sort((s1, s2) -> s2.compareTo(s1)); // 降序

// 反转List
Collections.reverse(list);

// 批量操作，转换为数组
String[] array = list.toArray(new String[0]);
// new String[0]只是为了告诉toArray方法我们希望返回一个 String 类型的数组，所以设置长度为0，虽然长度为0，但 toArray 方法会根据列表的实际大小创建一个合适大小的 String 数组。也可传入new String[list.size()]，但这种方式就很好


```

查询List

```Java


// 获取大小
int size = list.size();
// 检查是否为空
boolean isEmpty = list.isEmpty();
// 检查是否包含某个元素
boolean contains = list.contains("A");
// 查找元素的索引
int index = list.indexOf("B"); // 返回第一个匹配"B"的索引，不存在则返回-1
int lastIndex = list.lastIndexOf("B"); // 返回最后一个匹配"B"的索引

// 使用containsAll检查是否包含所有元素
List<String> subList = Arrays.asList("A", "C");
boolean containsAll = list.containsAll(subList);

// 统计元素出现次数
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

Map<String, Long> countMap = list.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));


// 查找最大值和最小值
import java.util.Collections;
String max = Collections.max(list); // 最大值
String min = Collections.min(list); // 最小值

// 统计元素出现次数
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

Map<String, Long> countMap = list.stream()
                                 .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));



```
使用Java 8 Stream API进行高级操作
```Java
// 遍历元素
list.stream().forEach(System.out::println);
// 过滤元素
List<String> filtered = list.stream()
                            .filter(s -> s.startsWith("A"))
                            .collect(Collectors.toList());
// 映射元素
List<Integer> lengths = list.stream()
                            .map(String::length)
                            .collect(Collectors.toList());
// 去重
List<String> distinct = list.stream()
                            .distinct()
                            .collect(Collectors.toList());
```
List作为堆栈或队列使用（虽然List接口本身不是专门为堆栈或队列设计的，但可以通过它实现这些数据结构的基本功能。）

```Java
// 使用List作为堆栈（后进先出）
list.add("A"); // push
String top = list.remove(list.size() - 1); // pop
// 使用List作为队列（先进先出）
list.add("A"); // offer
String front = list.remove(0); // poll
// 注意：使用List作为堆栈或队列在性能上可能不是最优的，特别是LinkedList更适合这些用途。推荐使用Stack类或Deque接口的实现类（如ArrayDeque）来实现堆栈和队列。
```

线程安全的List（没怎么碰到过就不要深究怎么回事儿了）
线程安全的List是指在多线程环境下，可以正确处理并发访问和修改的情况，保证数据的一致性和完整性，不会出现数据竞争或数据不一致的问题。
```Java
// 使用Collections.synchronizedList
List<String> synchronizedList = Collections.synchronizedList(new ArrayList<>());

// 使用CopyOnWriteArrayList
import java.util.concurrent.CopyOnWriteArrayList;
List<String> copyOnWriteList = new CopyOnWriteArrayList<>();
```





## Set集合
**Set特点**：元素唯一、无序
**Set 接口的实现类**
- HashSet
    - 基于哈希表实现，不保证元素的顺序。
	- 插入、删除和查找操作具有常数时间的性能。
	- 允许`null`元素。
- LinkedHashSet
    - 继承自`HashSet`，基于哈希表和链表实现，维护元素的插入顺序。
	- 元素按插入顺序迭代。
	- 性能略低于`HashSet`，但提供了有序性。
- TreeSet
    - 基于红黑树实现，元素按自然顺序或指定的比较器排序。
	- 提供有序的集合视图。
	- 插入、删除和查找操作具有对数时间的性能。

- **SortedSet**：扩展了`Set`接口，元素按自然顺序或指定的比较器排序。
    - **主要实现类**：`TreeSet`

**Set的线程安全**
`Set`接口的实现类（如`HashSet`、`LinkedHashSet`、`TreeSet`）都不是线程安全的。
如果需要在多线程环境中使用，可以使用`Collections.synchronizedSet()`方法包装`Set`，或者使用并发集合类如`ConcurrentSkipListSet`。

## Set集合-代码

Set接口和常用实现类导入
```java
import java.util.Set;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.TreeSet;
```
创建Set
```java
// 使用HashSet
Set<String> set = new HashSet<>();
// 使用LinkedHashSet（保持插入顺序）
Set<String> linkedHashSet = new LinkedHashSet<>();
// 使用TreeSet（自动排序）
Set<String> treeSet = new TreeSet<>();

// 获取Set的大小
int size = set.size();

// 遍历Set
// 使用增强型for循环
for (String fruit : set) {
    System.out.println(fruit);
}
// 使用迭代器
import java.util.Iterator;

Iterator<String> iterator = set.iterator();
while (iterator.hasNext()) {
    String fruit = iterator.next();
    System.out.println(fruit);
}
// 使用Java 8的forEach方法
set.forEach(System.out::println);


// 检查元素是否存在
boolean contains = set.contains("Apple"); // true

// 检查子集和超集
Set<String> set1 = new HashSet<>(Arrays.asList("Apple", "Banana"));
Set<String> set2 = new HashSet<>(Arrays.asList("Apple"));

boolean isSubset = set2.containsAll(set1); // false
boolean isSuperset = set1.containsAll(set2); // true

// 将Set转换为数组
String[] array = set.toArray(new String[0]);

// 创建不可变Set（Java 9及以上）
Set<String> immutableSet = Set.of("Apple", "Banana", "Cherry");
// immutableSet 不可修改，任何修改操作都会抛出 UnsupportedOperationException

```

```java
// 添加元素
set.add("Apple");
set.add("Banana");
set.add("Cherry");
// 添加重复元素不会成功
boolean added = set.add("Apple"); // false

// 删除元素
set.remove("Banana"); // 删除指定元素
set.clear(); // 清空整个Set

// 集合操作
// 并集
Set<String> set1 = new HashSet<>(Arrays.asList("Apple", "Banana"));
Set<String> set2 = new HashSet<>(Arrays.asList("Banana", "Cherry"));

// 使用addAll方法
set1.addAll(set2); // set1 现在包含 ["Apple", "Banana", "Cherry"]
// 交集
Set<String> set1 = new HashSet<>(Arrays.asList("Apple", "Banana"));
Set<String> set2 = new HashSet<>(Arrays.asList("Banana", "Cherry"));

// 使用retainAll方法
set1.retainAll(set2); // set1 现在只包含 ["Banana"]
// 差集
Set<String> set1 = new HashSet<>(Arrays.asList("Apple", "Banana"));
Set<String> set2 = new HashSet<>(Arrays.asList("Banana", "Cherry"));

// 使用removeAll方法
set1.removeAll(set2); // set1 现在只包含 ["Apple"]

// 排序Set中的元素
// HashSet 不保证元素的顺序，如果需要有序的 Set，可以使用 LinkedHashSet 或 TreeSet。

// 使用TreeSet自动排序
Set<String> treeSet = new TreeSet<>(Arrays.asList("Banana", "Apple", "Cherry"));
// treeSet 自动按自然顺序排序 ["Apple", "Banana", "Cherry"]
// 使用Comparator自定义排序
Set<String> customSortedSet = new TreeSet<>((s1, s2) -> s2.compareTo(s1));
customSortedSet.addAll(Arrays.asList("Apple", "Banana", "Cherry"));
// customSortedSet 按降序排序 ["Cherry", "Banana", "Apple"]


// 使用Set进行去重操作
// Set 天然具有去重的特性，可以很方便地用于去除集合中的重复元素。

List<String> listWithDuplicates = Arrays.asList("Apple", "Banana", "Apple", "Cherry");
Set<String> uniqueFruits = new HashSet<>(listWithDuplicates);
// uniqueFruits 现在包含 ["Apple", "Banana", "Cherry"]


```

使用Java 8 Stream API进行高级操作
```java
// 过滤元素
Set<String> filtered = set.stream()
                          .filter(fruit -> fruit.startsWith("A"))
                          .collect(Collectors.toSet());
// 映射元素
Set<String> upperCaseFruits = set.stream()
                                  .map(String::toUpperCase)
                                  .collect(Collectors.toSet());
// 去重（对于Set本身已经是去重的，此操作适用于其他集合转换到Set）
List<String> listWithDuplicates = Arrays.asList("Apple", "Banana", "Apple");
Set<String> uniqueFruits = listWithDuplicates.stream().collect(Collectors.toSet());

// 使用Stream API进行过滤和映射
Set<String> fruits = new HashSet<>(Arrays.asList("Apple", "Banana", "Cherry", "Date"));

// 过滤出以'A'开头的水果
Set<String> filtered = fruits.stream().filter(fruit -> fruit.startsWith("A")).collect(Collectors.toSet());
System.out.println("以'A'开头的水果: " + filtered);

// 将水果名称转换为大写
Set<String> upperCaseFruits = fruits.stream().map(String::toUpperCase).collect(Collectors.toSet());
System.out.println("大写水果名称: " + upperCaseFruits);


```







## Queue队列
**Queue 接口的实现类**
- PriorityQueue
    - 基于优先级的队列，基于最小堆实现，元素按照自然顺序或指定的比较器排序。
    - 插入和删除的时间复杂度为 `O(log n)`
	- 默认是最小元素（根据排序规则）位于队列头部，可以使用逆序比较器（`Collections.reverseOrder()` 或 `Comparator.reverseOrder()`）实现最大堆
	- 适用于需要按优先级处理元素的场景，比如Top K、最值问题、调度系统、贪心算法。
- ArrayDeque
    - 基于动态数组实现，支持在两端高效的插入和删除操作。
	- 无容量限制，具有自动扩容机制。
	- 适合作为栈或队列使用，性能优于`Stack`类。
- LinkedList
    - 也可以作为`Queue`使用，基于链表实现，实现先进先出（FIFO）队列。
	- 支持队列操作如`offer`、`poll`、`peek`。
	- 适合需要双端操作的场景（也可作为`Deque`使用）。
- PriorityBlockingQueue
    - 线程安全的优先级队列，适用于并发环境。
	- 元素按优先级排序。
	- 支持阻塞操作，适用于生产者-消费者模型。

`Deque`
**Double-Ended Queue**（双端队列），支持在两端进行插入和删除操作。
- 所在位置：`java.util.Deque`
- 继承关系：`Deque` extends `Queue` extends `Collection`，扩展了`Queue`接口，所以 `Deque` **是 Collection 家族成员**。
- 常见实现类：
    - `ArrayDeque`：基于动态数组实现的高效双端队列。
    - `LinkedList`：也可以作为`Deque`使用。

## Map映射
Map是键值对（key-value pairs）的集合，键不允许重复。

`Map`不是`Collection`的子接口，单独一类，不继承 `Collection`，用于存储键值对，但它是集合框架的重要组成部分。
**Map 接口的实现类**
- HashMap：
	- 基于哈希表实现，存储键值对，不保证映射的顺序。
	- 查询速度快，提供常数时间的性能进行基本操作（`get`和`put`）。
	- 允许一个`null`键和多个`null`值。
- LinkedHashMap
    - 继承自`HashMap`，通过维护一个双向链表来记录插入顺序或访问顺序。
	- 可以按插入顺序或访问顺序迭代元素。
	- 适用于需要有序访问缓存的场景。
- TreeMap
    - 基于红黑树实现，键按自然顺序或自定义的比较器排序。
	- 提供有序的键值对视图。
	- 支持范围查询和有序遍历。
- Hashtable
    - 类似于`HashMap`，但是线程安全的（所有方法都是同步的）。
	- 线程安全，但性能较低。
	- 不允许`null`键和`null`值。
	- 在需要线程安全的场景下，通常推荐使用`ConcurrentHashMap`。
- ConcurrentHashMap
    - 线程安全的哈希表实现，适用于高并发环境。
	- 提供比`Hashtable`更高的并发性能。
	- 支持高并发读取和一定程度的并发写入。
	- 不允许`null`键和`null`值。
- WeakHashMap
    - 一种特殊的`Map`，其键是弱引用（WeakReference），当键不再被强引用时，可以被垃圾回收器回收。
	- 适用于缓存实现，防止内存泄漏。
	- 键被回收后，对应的键值对会被自动移除。
- IdentityHashMap
    - 一种`Map`实现，使用对象的引用相等性（`==`）而不是`equals`方法来比较键。
	- 适用于需要基于对象引用的场景。
	- 不常用，但在特定需求下有用。`

- **SortedMap**：扩展了`Map`接口，键按自然顺序或指定的比较器排序。
    - **主要实现类**：`TreeMap`


**Map的遍历方式**
- 遍历 `entrySet`（推荐）。特点：一次取出键值对，性能最优。
```java
for (Map.Entry<K, V> entry : map.entrySet()) {
    K key = entry.getKey();
    V value = entry.getValue();
}
```
- 遍历 `keySet`，再通过 `get()` 获取 value。缺点：性能较差，`get()` 会重复 hash。
```java
for (K key : map.keySet()) {
    V value = map.get(key);
}
```
- 遍历 `values()`。适用于只关心 value 的场景。
```java
for (V value : map.values()) {
    // 只需要 value
}
```
- 使用 Java 8 的 Lambda 表达式
```java
map.forEach((k, v) -> {
    System.out.println(k + " -> " + v);
});
```

### HashMap

**HashMap的底层实现原理**：
* `HashMap` 底层由 **数组 + 链表/红黑树** 构成。JDK1.8中底层数据结构为数组+链表+红黑树。
* 每个数组槽位是一个桶（bucket），桶中存储一个链表或红黑树。
* 每次插入数据时，通过哈希函数定位到某个 bucket，

**HashMap如何解决哈希冲突**：使用链地址法解决。JDK 1.8 起优化了冲突处理：当链表长度超过 8 且数组长度 ≥ 64 时，链表会转换成红黑树，提高查找效率（从 O(n) 提高到 O(log n)）。
如果存在哈希冲突，则挂链表或红黑树。解决冲突采用链地址法，发生哈希冲突时将元素插入链表尾部；当链表长度大于8且数组总容量大于等于64时，链表转化为红黑树以优化查询。

**HashMap的扩容机制**：
* 默认容量为 16，负载因子为 0.75。
* 当元素个数超过 `容量 × 负载因子` 时触发扩容。
* 扩容时，数组大小变为原来的 2 倍，并重新计算每个键的位置（rehash）。
* JDK 1.8 中，扩容过程优化为“新旧节点交叉复制”，避免死链问题。
* JDK1.8优化了数据迁移过程，通过检查节点hash值参与运算的最高位是0还是1，直接决定元素保留在原索引处还是移动到“原索引 + 旧数组容量”的新位置，避免了重新计算哈希。


**HashMap为什么线程不安全？**
因为它没有对读写操作加锁，
多个线程同时进行 put 或 resize 操作时可能导致：
* **数据覆盖**（put 时覆盖未提交的数据）
* **数据丢失**（多线程 put 导致链表被重写）
* **死循环**（多线程扩容时导致链表形成环）

**HashMap如何实现线程安全**：
* 使用 `Collections.synchronizedMap(map)` 包装。
* 使用 `ConcurrentHashMap` 替代。
* 在方法外手动加锁，如使用 `synchronized` 或 `ReentrantLock`。

**HashMap中的循环链表是如何产⽣的**
这个是 JDK 1.7 的经典并发 bug，在 **JDK 1.8** 中被重写的扩容逻辑解决了。在多线程并发扩容过程中：
* 假设两个线程同时触发 `resize`；
* 链表在 rehash 时被拆开并重新链接；
* 如果线程之间顺序不一致，就可能把链表头指向了自己，形成循环；
* 后续访问会导致 `get()` 死循环，CPU 飙升。



说一下HashMap的实现原理？
HashMap的数据结构： 底层使用hash表数据结构，即数组和链表或红黑树
1. 当我们往HashMap中put元素时，利用key的hashCode重新hash计算出当前对象的元素在数组中的下标 
2. 存储时，如果出现hash值相同的key，此时有两种情况。
   a. 如果key相同，则覆盖原始值；
   b. 如果key不同（出现冲突），则将当前的key-value放入链表或红黑树中 ：链表的长度大于8 且 数组长度大于64转换为红黑树
3. 获取时，直接找到hash值对应的下标，在进一步判断key是否相同，从而找到对应值。

HashMap的jdk1.7和jdk1.8有什么区别
- JDK1.8之前采用的是拉链法，数组+链表。拉链法：将链表和数组相结合。也就是说创建一个链表数组，数组中每一格就是一个链表。若遇到哈希冲突，则将冲突的值加到链表中即可。
- JDK1.8之后采用数组+链表+红黑树，链表长度大于8且数组长度大于64则会从链表转化为红黑树：jdk1.8在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为8） 时并且数组长度达到64时，将链表转化为红黑树，以减少搜索时间。扩容 resize( ) 时，红黑树拆分成的树的结点数小于等于临界值6个，则退化成链表

HashMap的put方法的具体流程

```java
// DEFAULT_INITIAL_CAPACITY   默认的初始容量
// DEFAULT_LOAD_FACTOR        默认的加载因子
// 扩容阈值 == 数组容量  *  加载因子

static class Node<K, V> implements Map.Entry<K, V> {
    final int hash;
    final K key;
    V value;
    HashMap.Node<K, V> next;

    Node(int hash, K key, V value, HashMap.Node<K, V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
static final float DEFAULT_LOAD_FACTOR = 0.75f;
transient HashMap.Node<K,V>[] table;
transient int size;

// HashMap是懒惰加载，在创建对象时并没有初始化数组
// 在无参的构造函数中，设置了默认的加载因子是0.75
Map<String, String> map = new HashMap<>();
map.put("name", "itheima");


public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
}

```

- 判断键值对数组table是否为空或为null，否则执行resize()进行扩容（初始化）
- 根据键值key计算hash值得到数组索引
- 判断`table[i]==null`，条件成立，直接新建节点添加
- 如果`table[i]==null` ,不成立
	- 判断table[i]的首个元素是否和key一样，如果相同直接覆盖value
	- 判断table[i] 是否为treeNode，即table[i] 是否是红黑树，如果是红黑树，则直接在树中插入键值对
	- 遍历table[i]，链表的尾部插入数据，然后判断链表长度是否大于8，大于8的话把链表转换为红黑树，在红黑树中执行插入操 作，遍历过程中若发现key已经存在直接覆盖value
- 插入成功后，判断实际存在的键值对数量size是否超多了最大容量threshold（数组长度*0.75），如果超过，进行扩容。


HashMap的扩容机制
- 在添加元素或初始化的时候需要调用resize方法进行扩容，第一次添加数据初始化数组长度为16，以后每次每次扩容都是达到了扩容阈值（数组长度 * 0.75）
- 每次扩容的时候，都是扩容之前容量的2倍； 
- 扩容之后，会新创建一个数组，需要把老数组中的数据挪动到新的数组中
	- 没有hash冲突的节点，则直接使用 e.hash & (newCap - 1) 计算新数组的索引位置
	- 如果是红黑树，走红黑树的添加
	- 如果是链表，则需要遍历链表，可能需要拆分链表，判断(e.hash & oldCap)是否为0，该元素的位置要么停留在原始位置，要么移动到原始位置+增加的数组大小这个位置上

hashMap的寻址算法
- 计算对象的 hashCode()
- 再进行调用 hash() 方法进行二次哈希， hashcode值右移16位再异或运算，让哈希分布更为均匀
- 最后 (capacity – 1) & hash 得到索引

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

// 扰动算法，是hash值更加均匀，减少hash冲突
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// (n-1)&hash : 得到数组中的索引，代替取模，性能更好
// 数组长度必须是2的n次幂
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
……
if ((p = tab[i = (n - 1) & hash]) == null)
……
}
```

为何HashMap的数组长度一定是2的次幂？
1. 计算索引时效率更高：如果是 2 的 n 次幂可以使用位与运算代替取模
2. 扩容时重新计算索引效率更高： hash & oldCap == 0 的元素留在原来位置 ，否则新位置 = 旧位置 + oldCap

**hashmap在1.7情况下的多线程死循环问题**
jdk7的的数据结构是：数组+链表
在数组进行扩容的时候，因为链表是头插法，在进行数据迁移的过程中，有可能导致死循环
```java

void transfer(Entry[] newTable, boolean rehash) {
    int newCapacity = newTable.length;
    for (Entry<K,V> e : table) {
        while(null != e) {
            Entry<K,V> next = e.next;
            if (rehash) {
                e.hash = null == e.key ? 0 : hash(e.key);
            }
            int i = indexFor(e.hash, newCapacity);
            e.next = newTable[i];
            newTable[i] = e;
            e = next;
        }
    }
}
```
- 变量e指向的是需要迁移的对象
- 变量next指向的是下一个需要迁移的对象
- Jdk1.7中的链表采用的头插法
- 在数据迁移的过程中并没有新的对象产生，只是改变了对象的引用

参考回答：
在jdk1.7的hashmap中在数组进行扩容的时候，因为链表是头插法，在进行数据迁移的过程中，有可能导致死循环

比如说，现在有两个线程
线程一：读取到当前的hashmap数据，数据中一个链表，在准备扩容时，线程二介入
线程二：也读取hashmap，直接进行扩容。因为是头插法，链表的顺序会进行颠倒过来。比如原来的顺序是AB，扩容后的顺序是BA，线程二执行结束。
线程一：继续执行的时候就会出现死循环的问题。
线程一先将A移入新的链表，再将B插入到链头，由于另外一个线程的原因，B的next指向了A，所以B->A->B,形成循环。
当然，JDK 8 将扩容算法做了调整，不再将元素加入链表头（而是保持与扩容前一样的顺序），尾插法，就避免了jdk7中死循环的问题。






### ConcurrentHashMap
ConcurrentHashMap在JDK1.7和1.8中有哪些结构设计上的区别？
**ConcurrentHashMap的底层实现**
- JDK 1.7：使用 **分段锁**（Segment + ReentrantLock），每个 Segment 类似一个小 HashMap，默认分成 16 段，线程只锁一个段，提高并发度。
JDK1.7采用基于ReentrantLock的Segment分段锁+HashEntry数组+链表结构，并发粒度为Segment（默认16段），存在并发瓶颈；


- JDK 1.8（核心）：
	- 去除了 Segment，改为使用 **CAS + synchronized + Node数组 + 链表/红黑树**。
	* `CAS` 操作保障写入原子性（无锁并发 put）。
	* `synchronized` 控制桶节点的同步。
	* 红黑树用于高冲突 bucket 的优化。
	* 支持并发扩容，多个线程可协作迁移数据，提升性能。
JDK1.8彻底抛弃Segment，采用与HashMap相同的Node数组+链表+红黑树结构，将锁粒度细化至每个哈希桶的首节点，通过CAS操作 + `synchronized` 保证并发安全，大大降低了锁冲突概率，并在高冲突场景下利用红黑树提升了查询效率。

## Map映射-代码

```java

Map<Integer, Integer> freqMap = new HashMap<>();
for (int num : nums) {
	freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
}

```

## END
