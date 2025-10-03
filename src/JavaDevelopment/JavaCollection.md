---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---


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
- `Vector`：已过时，线程安全，性能较低。在需要线程安全的场景下，通常推荐使用`ArrayList`配合外部同步或使用`CopyOnWriteArrayList`。
- `CopyOnWriteArrayList`：线程安全的 `ArrayList`，用于并发环境
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

List<String> predefinedList = Arrays.asList("A", "B", "C"); 使用Arrays.asList()快速初始化
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

## END
