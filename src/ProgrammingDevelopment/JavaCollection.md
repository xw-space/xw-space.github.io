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
- 提供了一系列静态方法来操作或返回集合，如排序、查找、同步包装等。
- **常用方法**：
    - `sort(List<T> list)`：对列表进行排序。
    - `binarySearch(List<? extends Comparable<? super T>> list, T key)`：在已排序的列表中进行二分查找。
    - `synchronizedList(List<T> list)`：返回线程安全的同步列表。
    - `unmodifiableList(List<? extends T> list)`：返回不可修改的列表视图。
## List列表
**简介**：有序的集合。集合中的元素有对应的索引，能够依据索引对元素进行访问、插入和删除操作。允许存在重复元素。
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
- 实现方式：`ArrayList`基于动态数组实现，`LinkedList`基于双向链表实现
- 访问性能方面：`ArrayList`支持随机访问，通过索引访问元素的时间复杂度是 O (1)。`LinkedList`不支持随机访问，访问元素需要从头或尾开始遍历链表，时间复杂度是 O (n)。
- 插入和删除性能方面：`ArrayList`在列表末尾插入和删除元素的时间复杂度是 O (1)，但在中间或开头插入和删除元素时，需要移动后续元素，时间复杂度是 O (n)。`LinkedList`在任意位置插入和删除元素的时间复杂度都是 O (1)，因为只需修改相邻节点的引用。
- 内存占用方面：`ArrayList`的内存占用相对较小，仅存储元素，主要是数组本身的开销。`LinkedList`的每个节点除了存储元素外，还需要额外的引用指针，内存占用相对较大。
- 适用场景：如果查询操作多，使用 `ArrayList`。如果插入和删除操作多，使用 `LinkedList`。


**ArrayList的序列化**
- ArrayList 本身实现了 Serializable 接口，可以直接被序列化和反序列化
- ArrayList序列化要确保内部对象也实现了 Serializable 。
* 常见的 String、Integer、Double 等都已经是 `Serializable`。
* 如果 `ArrayList` 中包含了不可序列化的对象，序列化会抛出异常：`java.io.NotSerializableException: YourObject`
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

**HashMap的底层实现原理**：
* `HashMap` 底层由 **数组 + 链表/红黑树** 构成。
* 每个数组槽位是一个桶（bucket），桶中存储一个链表或红黑树。
* 每次插入数据时，通过哈希函数定位到某个 bucket，如果存在哈希冲突，则挂链表或红黑树。
**HashMap的扩容机制**：
* 默认容量为 16，负载因子为 0.75。
* 当元素个数超过 `容量 × 负载因子` 时触发扩容。
* 扩容时，数组大小变为原来的 2 倍，并重新计算每个键的位置（rehash）。
* JDK 1.8 中，扩容过程优化为“新旧节点交叉复制”，避免死链问题。
**HashMap如何解决哈希冲突**：使用链地址法解决。JDK 1.8 起优化了冲突处理：当链表长度超过 8 且数组长度 ≥ 64 时，链表会转换成红黑树，提高查找效率（从 O(n) 提高到 O(log n)）。
**HashMap为什么线程不安全？**
因为它没有对读写操作加锁，多个线程同时进行 put 或 resize 操作时可能导致：
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
**ConcurrentHashMap的底层实现**
- JDK 1.7：使用 **分段锁**（Segment + ReentrantLock），每个 Segment 类似一个小 HashMap，默认分成 16 段，线程只锁一个段，提高并发度。
- JDK 1.8（核心）：
	- 去除了 Segment，改为使用 **CAS + synchronized + Node数组 + 链表/红黑树**。
	* `CAS` 操作保障写入原子性（无锁并发 put）。
	* `synchronized` 控制桶节点的同步。
	* 红黑树用于高冲突 bucket 的优化。
	* 支持并发扩容，多个线程可协作迁移数据，提升性能。
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

## Map映射-代码

```java

Map<Integer, Integer> freqMap = new HashMap<>();
for (int num : nums) {
	freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
}

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

## END
