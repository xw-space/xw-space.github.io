---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---

# JavaServiceDevelopmentTools
## CompletableFuture

用于支持异步编程和处理异步操作的结果，将多个耗时接口/方法异步执行，并并行处理+合并结果，从而显著提升系统整体响应性能。

情景假设：
你有一个电商页面，需要同时获取：
- 商品详情（调用 `productService.getDetail()`）→ 200ms  
- 库存状态（调用 `stockService.getStock()`）→ 300ms  
- 用户评价（调用 `reviewService.getComments()`）→ 400ms  
❌ 串行调用总耗时：`200ms + 300ms + 400ms = 900ms`
✅ 使用 CompletableFuture 并发执行后：`Max(200ms, 300ms, 400ms) = 400ms`

**示例**
模拟一个电商接口：`GET /product/{id}`，它需要：
- 查询商品基本信息（100ms）
- 查询库存状态（200ms）
- 查询用户评价（300ms）
使用 `CompletableFuture` 将它们并发执行，缩短接口总耗时。


📁 项目结构（简化）
```
completablefuture-demo/
├── controller/
│   └── ProductController.java
├── service/
│   ├── ProductService.java
│   ├── StockService.java
│   ├── CommentService.java
│   └── AggregationService.java
├── config/
│   └── AsyncConfig.java
└── DemoApplication.java
```

- 启动类（DemoApplication.java）
```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

- 控制器入口（ProductController.java）
```java
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private AggregationService aggregationService;

    @GetMapping("/{id}")
    public Map<String, String> getProduct(@PathVariable Long id) {
        long start = System.currentTimeMillis();
        Map<String, String> result = aggregationService.loadProductInfo(id);
        long end = System.currentTimeMillis();

        result.put("耗时(ms)", String.valueOf(end - start));
        return result;
    }
}
```

- 各服务模拟类，sleep()模拟耗时
```java
@Service
public class ProductService {
    public String getProduct(Long id) {
        sleep(100);
        return "商品信息 for id=" + id;
    }
}

@Service
public class StockService {
    public String getStock(Long id) {
        sleep(200);
        return "库存充足 for id=" + id;
    }
}

@Service
public class CommentService {
    public String getComments(Long id) {
        sleep(300);
        return "好评如潮 for id=" + id;
    }
}

private void sleep(long ms) {
    try {
        Thread.sleep(ms);
    } catch (InterruptedException ignored) {}
}
```
- 线程池配置类（AsyncConfig.java），我们用这个线程池来执行 `CompletableFuture` 中的异步任务，避免使用默认的 ForkJoinPool。
```java
@Configuration
public class AsyncConfig {
    @Bean
    public Executor asyncExecutor() {
        return new ThreadPoolExecutor(
                4, 10,
                60, TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(100),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.CallerRunsPolicy()
        );
    }
}
```

- 核心聚合服务（AggregationService.java），其中：
	- `supplyAsync()`：异步执行一个任务，`supplyAsync` 是一个封装函数，它把你的任务（Lambda 表达式）封装为 `Runnable`
	- `.join()`：阻塞线程等待直至获取结果（也可以用 `.get()`，`get()` 会抛出 受检异常（`InterruptedException`, `ExecutionException`），所以调用时必须 try-catch，`join()` 会把异常包装成 `CompletionException`（运行时异常） 抛出，不需要强制捕获）
	- `allOf(...).join()`：等待所有任务完成
```java
@Service
public class AggregationService {

    @Autowired
    private ProductService productService;

    @Autowired
    private StockService stockService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private Executor asyncExecutor;

    public Map<String, String> loadProductInfo(Long id) {

        // 任务被提交到你传入的 `executor`（即线程池）中去执行
        // 如果不传线程池，默认是 `ForkJoinPool.commonPool()`
        CompletableFuture<String> productFuture = CompletableFuture.supplyAsync(() -> productService.getProduct(id), asyncExecutor);  
        CompletableFuture<String> stockFuture = CompletableFuture.supplyAsync(() -> stockService.getStock(id), asyncExecutor);  
        CompletableFuture<String> commentFuture = CompletableFuture.supplyAsync(() -> commentService.getComments(id), asyncExecutor);

        // 等待全部完成
        CompletableFuture.allOf(productFuture, stockFuture, commentFuture).join();

        // 汇总结果
        Map<String, String> result = new HashMap<>();
        result.put("product", productFuture.join());
        result.put("stock", stockFuture.join());
        result.put("comments", commentFuture.join());

        return result;
    }
}
```

🚀 测试效果
- 访问：`GET http://localhost:8080/product/1`
- 返回：
```json
{
  "product": "商品信息 for id=1",
  "stock": "库存充足 for id=1",
  "comments": "好评如潮 for id=1",
  "耗时(ms)": "310"
}
```
如果你是串行执行，耗时大约是：100 + 200 + 300 = 600ms
现在是并发，耗时 ≈ 最大那个：300ms 左右 🚀

回调方法：thenAccept、thenApply、thenRun
- `thenApply`：**转换结果**，返回一个新的 `CompletableFuture`。
- `thenRun`：无入参也无返回值，只是执行一段逻辑
- `thenAccept` 是 `CompletableFuture` 的回调方法，它接收一个 `Consumer<T>`（有入参、无返回值），当异步任务完成后，就会自动触发执行，不会返回新的结果，只做“消费”。
- 示例：
```java
import java.util.concurrent.CompletableFuture;

public class ThenAcceptDemo {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> {
            // 异步任务：模拟计算
            sleep(3);
            return "Hello World";
        }).thenAccept(result -> {
            // 拿到结果后做一些操作（打印/保存/调用服务等）
            System.out.println("结果是: " + result);
        });

        System.out.println("主线程先去干别的事...");
    }
}

/// 结果
// 主线程先去干别的事...
// 结果是: Hello World

```




## Drools——规则引擎
**介绍**：
Drools 是一个开源的 Java 规则引擎，由 Red Hat 维护。

**优点**：
- 把业务逻辑用规则来描述，减少在 Java 代码里硬编码的 if-else 大片逻辑
- 业务人员/运营可以直接修改规则，不用改代码、重新发布系统
- 支持复杂的规则推理、条件匹配、优先级控制，
- 高性能，Rete算法对大规模规则匹配非常高效

Drools 不仅仅是个规则引擎，**还支持**：
- 规则引擎（Drools Rule Engine）
- 复杂事件处理（Drools Fusion）
- 流程引擎（jBPM）
- 约束求解（OptaPlanner）


**相比于 if-else的优点**：
- **解耦，方便维护和测试**：业务规则和代码分开管理，规则文件可以独立修改而不需要修改代码，测试也只需要测试规则文件就好。
- **更清晰易懂**：`if-else` 会随着业务的增加变得越来越复杂，代码会变得非常臃肿，而规则文件相对来说更容易理解且容易更改
- **支持复杂的业务场景**：支持更复杂的条件判断、优先级、冲突解决等特性
- **可以动态调整**：可以在不重启应用的情况下动态加载新的规则或更新现有规则


**核心概念**：
- **规则（Rule）**：使用 DRL（Drools Rule Language）文件定义，后缀 `.drl`，一条规则一般由 条件（when） 和 动作（then） 两部分组成。规则名的作用是，可以通过日志或者代码，获得哪条规则被触发了。
- **事实（Fact）**：Drools 处理的对象叫做 事实，就是你的 Java 对象（POJO），规则匹配就是对 Fact 进行模式匹配，找出满足条件的 Fact。
- **工作内存（Working Memory）**：Drools 运行时会有一个 Working Memory，存放所有当前的 Fact。规则引擎通过 Working Memory 进行规则匹配。
- **规则流（Rule Flow）**：可以定义规则之间的 执行顺序，实现复杂流程控制。
- **Session**：Drools 执行规则需要通过一个 KieSession（Knowledge Is Everything Session）。通过 session.insert() 插入 Fact，调用 fireAllRules() 触发规则执行。

**规则文件示例**：
```java
rule "Example Rule"
when
    // 条件部分，匹配事实
    $order : Order(amount > 1000)
then
    // 动作部分，执行逻辑
    $order.setVip(true);
    System.out.println("Set order as VIP");
end
```


**java中使用简单示例**：
```java
// 1️⃣ 创建 KieServices
KieServices kieServices = KieServices.Factory.get();

// 2️⃣ 加载规则文件，创建 KieContainer
KieContainer kieContainer = kieServices.getKieClasspathContainer();

// 3️⃣ 获取 KieSession
KieSession kieSession = kieContainer.newKieSession();

// 4️⃣ 插入 Fact
Order order = new Order(1200);
kieSession.insert(order);

// 5️⃣ 触发规则
kieSession.fireAllRules();

// 6️⃣ 关闭 Session
kieSession.dispose();
```


 **实例演示**：
 例如，假设你有一个计价规则：
- 基础费用。
- 按订单金额的折扣。
- 按订单数量的附加费用。

创建一个订单类（Order）来表示订单对象
```java
public class Order {
    private double amount; // 订单金额
    private int quantity;  // 订单数量
    private double basePrice; // 基础费用

    // Getter and Setter
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(double basePrice) {
        this.basePrice = basePrice;
    }
}
```

规则文件：
```java
// 基础费用规则
rule "Base Pricing"
when
    $order : Order()  // 当有订单时触发
then
    // 设置基础费用
    $order.setBasePrice(50);
end

// 根据订单金额的折扣
rule "Discount Based on Amount"
when
    $order : Order(amount > 100)  // 订单金额大于100
then
    $order.setAmount($order.getAmount() * 0.9);  // 给予10%折扣
end

// 根据订单数量增加附加费用
rule "Extra Fee Based on Quantity"
when
    $order : Order(quantity > 10)  // 订单数量超过10个
then
    $order.setAmount($order.getAmount() + 20);  // 增加20元附加费用
end
```

初始化 Drools 环境，创建 `KieSession` 来加载和执行规则：
```java
import org.drools.core.impl.KnowledgeBaseImpl;
import org.drools.core.spi.KnowledgeBase;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

public class PricingEngine {

    private KieSession kieSession;

    public PricingEngine() {
        // 初始化 Drools 环境
        KieServices kieServices = KieServices.Factory.get();
        KieContainer kieContainer = kieServices.getKieClasspathContainer();
        kieSession = kieContainer.newKieSession("pricingSession");  // 使用从 KieContainer 加载的 session
    }

    public void applyPricingRules(Order order) {
        kieSession.insert(order);  // 将订单对象插入到 Drools 会话中
        kieSession.fireAllRules();  // 执行所有规则
    }
}

```



执行规则引擎,创建一个测试方法来执行计价逻辑：
```java
public class Main {
    public static void main(String[] args) {
        PricingEngine engine = new PricingEngine();
        
        // 创建订单
        Order order = new Order();
        order.setAmount(120);   // 设置订单金额为120
        order.setQuantity(15);  // 设置订单数量为15

        // 应用 Drools 计价规则
        engine.applyPricingRules(order);

        // 输出最终计算后的订单金额
        System.out.println("Final Order Amount: " + order.getAmount());
    }
}

```

动态修改规则：
```java
// 动态加载新的规则集
kieSession.getKieBase().addPackages(newPackage);
kieSession.fireAllRules();
```


## Dubbo——RPC框架
阿里巴巴开源的高性能分布式服务框架

**核心组件**：服务提供者、服务消费者和注册中心。
- 服务提供者在启动时将服务注册到注册中心，
- 服务消费者在需要时从注册中心获取服务的位置信息，实现远程调用。

组成模块：
- 通讯：Dubbo支持多种协议，默认使用Dubbo协议，高性能和低延迟
- 负载均衡：支持多种负载均衡策略：随机、轮询、最少活跃调用、加权等
- 动态代理模式：支持JDK动态代理和Javassist代理
- 注册中心：支持ZooKeeper、Redis等注册中心
- 监控模块：调用链追踪、请求统计和性能监控，提供实时的服务状态数据


## Feign

**RestTemplate（经典手写调用）**
```java
@Autowired
private RestTemplate restTemplate;

public Long doLogin(String code) {
    String url = "http://service-customer/customer/info/login/" + code;
    ResponseEntity<Result> response = restTemplate.getForEntity(url, Result.class);
    Result<Long> result = response.getBody();
    return result.getData();
}
```
- 需要手动拼接 URL。
- 需要自己处理返回值类型转换（泛型还要用 `ParameterizedTypeReference`，代码更啰嗦）。
- 虽然也能配合 Ribbon/LoadBalancer 做服务发现，但写法更麻烦。

**使用feign**：
```java
// 声明接口
@FeignClient(value = "service-customer")
public interface CustomerInfoFeignClient {
    @GetMapping("/customer/info/login/{code}")
    Result<Long> login(@PathVariable String code);
}

// 调用
@Autowired
private CustomerInfoFeignClient customerInfoFeignClient;
public Long doLogin(String code) {
    Result<Long> result = customerInfoFeignClient.login(code);
    return result.getData();
}
```

- 调用远程方法就像调用本地方法一样。
- Feign 自动处理请求路径、参数拼装、返回值反序列化。
- 可直接集成负载均衡（Ribbon 或 Spring Cloud LoadBalancer）+ 熔断降级（Sentinel / Resilience4j）。




## Guava-Retry

Guava-Retry 简介：[guava-retrying](https://github.com/rholder/guava-retrying) 是 Google 开源的一个轻量级 **重试工具库**


**用途**：
- 在 RPC 调用中，使用 Guava-Retry 框架，对实现对白名单上幂等性服务，通过指定的重试策略，进行超时重试机制；Guava-Retry可以灵活配置重试次数、延迟策略、异常类型，实现超时自动重试；白名单为允许重试的幂等性接口；很多成熟的 RPC 框架（如 Dubbo、gRPC）都有内置 Retry 能力

**特点**：

| 特点           | 说明              |
| ------------ | --------------- |
| 支持重试次数限制     | 可以设置最大重试次数      |
| 支持重试间隔策略     | 固定间隔、指数递增、随机间隔等 |
| 支持异常分类重试     | 可以指定遇到哪些异常才重试   |
| 支持同步 or 异步执行 | 主线程等待 or 自定义执行器 |


Guava-Retry 支持非常丰富的**策略组合**：

| 组合       | 示例                                               |
| -------- | ------------------------------------------------ |
| 固定重试间隔   | `fixedWait(200ms)` 每次等待200ms                     |
| 随机重试间隔   | `randomWait(100ms, 500ms)`                       |
| 指数递增重试   | `exponentialWait(100ms, 2)`                      |
| 重试最大次数   | `stopAfterAttempt(5)`                            |
| 重试最大时间   | `stopAfterDelay(1分钟)`                            |
| 遇到特定异常重试 | `retryIfExceptionOfType(TimeoutException.class)` |
| 遇到业务失败重试 | `retryIfResult(res -> !res.isSuccess())`         |
例如：指数递增间隔重试，第一次 100ms，第二次 200ms，第三次 400ms...
```java
.withWaitStrategy(WaitStrategies.exponentialWait(100, 2, TimeUnit.MILLISECONDS))
```


**实践建议**：

| 操作       | 建议                             |
| -------- | ------------------------------ |
| 仅对幂等接口重试 | 严格白名单管理                        |
| 失败原因可控   | 只针对可恢复异常（如 TimeoutException）重试 |
| 设置合理重试次数 | 避免雪崩，通常3-5次合适                  |
| 设置合理超时时间 | 总超时不可太长（比如1-2秒）                |
| 记录重试日志   | 方便定位失败原因和排查问题                  |



**使用**：
- 引入依赖
```xml
<dependency>
    <groupId>com.github.rholder</groupId>
    <artifactId>guava-retrying</artifactId>
    <version>2.0.0</version>
</dependency>
```

- 重试逻辑示例代码：定义允许重试的幂等服务接口列表（白名单），然后写好判断机制：只有在白名单的服务才能重试，然后在一个 `RpcClient`中加上重试
```java

private static final Set<String> RETRY_WHITELIST = new HashSet<>(Arrays.asList(
    "order.queryStatus",
    "user.getProfile",
    "payment.checkOrder"
));

public RpcResponse send(RpcRequest request) {
    if (RETRY_WHITELIST.contains(request.getMethodName())) {
        return sendRequestWithRetry(request);
    } else {
        return sendRequestOnce(request);
    }
}

Retryer<RpcResponse> retryer = RetryerBuilder.<RpcResponse>newBuilder()
    .retryIfExceptionOfType(TimeoutException.class)  // 只有超时异常才重试
    .retryIfResult(response -> response == null || !response.isSuccess()) // 结果为空或失败也重试
    .withStopStrategy(StopStrategies.stopAfterAttempt(3)) // 最多3次
    .withWaitStrategy(WaitStrategies.fixedWait(200, TimeUnit.MILLISECONDS)) // 每次间隔200ms
    .build();

public RpcResponse sendRequestWithRetry(RpcRequest request) {
    try {
        return retryer.call(() -> sendRequestOnce(request)); // 核心：封装实际调用
    } catch (Exception e) {
        throw new RuntimeException("RPC请求重试失败", e);
    }
}
```



## Gradle

Gradle 是另一个现代化的 Java **构建工具**，比 Maven 更灵活、性能更高，支持更多语言。
特点如下：
* 使用 Groovy 或 Kotlin DSL 脚本，比 XML 更简洁。
* 支持增量构建和并行构建。
* 被 Android Studio 默认采用（用于构建 Android 应用）。
* 比 Maven 更适合复杂项目或多语言项目。


## Hutool
Hutool 是国人开发的 **Java 工具库合集**，类似 Java 世界的“小工具百宝箱”。
Hutool 封装了很多原生繁琐的操作，非常适合快速开发，提升代码效率。
常用功能模块包括：
* `StrUtil`：字符串工具类
* `DateUtil`：日期处理
* `HttpUtil`：发送 HTTP 请求
* `FileUtil`：文件操作
* `CaptchaUtil`：验证码生成

## HikariCP
高性能的JDBC连接池
yaml配置：
```yaml
datasource:
	// - **type**: 指定数据源的类型为 `HikariDataSource`，这是 HikariCP 提供的实现类，用于管理数据库连接池。
    type: com.zaxxer.hikari.HikariDataSource
    // - **driver-class-name**: 指定使用 MySQL 的 JDBC 驱动。`com.mysql.cj.jdbc.Driver` 是 MySQL Connector/J 的驱动类，适用于 MySQL 8.0 及以上版本。
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://local:3306/daijia_customer
    username: root
    password: root
    hikari:
      connection-test-query: SELECT 1
      connection-timeout: 60000
      idle-timeout: 500000
      max-lifetime: 540000
      maximum-pool-size: 10
      minimum-idle: 5
      pool-name: GuliHikariPool
```
- **connection-test-query**: 用于测试连接是否有效的 SQL 查询。`SELECT 1` 是一个简单的查询，通常用于快速验证连接的有效性。
- **connection-timeout**: 连接超时时间，单位为毫秒。设置为 `60000` 表示如果在 60 秒内无法获取连接，则会抛出异常。
- **idle-timeout**: 空闲连接超时时间，单位为毫秒。设置为 `500000` 表示连接在空闲 500 秒后会被释放。
- **max-lifetime**: 连接的最大生命周期，单位为毫秒。设置为 `540000` 表示连接在 540 秒后会被关闭并重新创建，以防止潜在的连接泄漏。
- **maximum-pool-size**: 连接池的最大连接数。设置为 `10` 表示连接池最多可以有 10 个连接。
- **minimum-idle**: 连接池中保持的最小空闲连接数。设置为 `5` 表示连接池会尽量保持至少 5 个空闲连接。
- **pool-name**: 连接池的名称，设置为 `GuliHikariPool`，用于标识连接池实例。


## IDEA

**介绍**
【intellij idea】Project Structure 讲解 - hellozay - 博客园： https://www.cnblogs.com/zadomn0920/p/6196962.html
IntelliJ IDEA（七） ：Project Structure - JaJian - 博客园： https://www.cnblogs.com/jajian/p/8081640.html
IntelliJ IDEA 学习笔记 - 常见图标介绍-CSDN博客： https://blog.csdn.net/cgl125167016/article/details/78671232
Icon reference | IntelliJIDEA Documentation： https://www.jetbrains.com/help/idea/symbols.html#file-status

**设置**
- IDEA自己有个简单的构建工具，可通过在设置中勾选`"将IDE构建/运行操作委托给Maven(D)"`，把构建工作还给Maven
- **编辑器-代码样式-Java设置**：
	- 换行和大括号：链式方法的调研：始终换行（默认 不换行）、多行时对齐
	- 大括号位置：在类声明中：下一行（如果换行）


**操作技巧**
- 写的正确但找不到依赖项：关掉IDE，重新打开一下
- IDEA高效使用教程： https://idea.javaguide.cn/tips/efficient-use-guide.html

**使用问题**
- 问题信息乱码：Windows 控制台默认是 GBK 编码，但IDEA 默认用 UTF-8 编译运行 Java 程序，更改IDEA设置或者更换JDK，从 JDK 18 开始，默认编码就是 UTF-8，所以不会再出现 UTF-8/GBK 不一致的问题
- 下载依赖项很慢：解决IDEA中Maven下载依赖包过慢或报错的问题-csdn： https://blog.csdn.net/weixin_40276431/article/details/136250858

**maven**：
- 同步/加载所有 Maven 项目 (Reimport / Reload All Maven Projects)：当修改了 `pom.xml`（新增/删除依赖，修改版本号）或变成了父子模块关系，让pom.xml变化后，让IDEA 会重新读取 Maven 的依赖树，把最新的依赖、插件、模块信息加载到 IDE 里。
- 为所有项目生成源代码并更新文件夹 (Generate Sources and Update Folders)：最好在初次 clone 项目后运行一次，或者IDEA 报错找不到生成的类，但实际编译是可以通过的。
- 下载源代码和/或文档 (Download Sources and/or Documentation)：下载依赖 jar 包对应的 源码（-sources.jar） 和 Javadoc（-javadoc.jar）：第一次接触新依赖时就下载源码和文档，想要阅读第三方库的实现细节（比如 Spring, MyBatis, Guava），鼠标悬停方法时没有 Javadoc 注释



**快捷键**
- (20条消息) Idea快捷键大全（Windows）_Lymanyu的博客-CSDN博客_idea快捷键： https://blog.csdn.net/qq_38963960/article/details/89552704

- **快速导航到类或文件**：按 `Ctrl + N`（Windows/Linux）或 `Cmd + N`（macOS）快速打开类，按 `Ctrl + Shift + N`（Windows/Linux）或 `Cmd + Shift + N`（macOS）快速打开文件。    
- **跳转到方法或变量定义**：将光标放在方法名或变量名上，按 `Ctrl + B`（Windows/Linux）或 `Cmd + B`（macOS）跳转到定义。
- **快速修复（Quick Fix）**：当IDEA检测到错误时，将光标放在错误上，按 `Alt + Enter` 提供修复建议。
- **智能代码补全**：按 `Ctrl + Space`（Windows/Linux）或 `Cmd + Space`（macOS）触发代码补全，IDEA会根据上下文提供相关的变量、方法和类名补全建议。
- **重构代码**：按 `Ctrl + Alt + Shift + T`（Windows/Linux）或 `Cmd + Alt + Shift + T`（macOS）打开重构菜单，你可以进行方法提取、重命名、内联等重构操作。
- **查看代码结构**：按 `Ctrl + F12`（Windows/Linux）或 `Cmd + F12`（macOS）查看当前文件的结构，快速跳转到类、方法、字段等。
- **快速切换分支**：在Git集成下，按 `Ctrl + Alt + Shift + K`（Windows/Linux）或 `Cmd + Alt + Shift + K`（macOS）来快速切换Git分支。
- **快速查看文档**：将光标悬停在方法或类上，按 `Ctrl + Q`（Windows/Linux）或 `Cmd + J`（macOS）查看文档或注释。
- **局部变量高亮**：按 `Ctrl + Shift + F7`（Windows/Linux）或 `Cmd + Shift + F7`（macOS）高亮显示当前方法或类中的所有局部变量。
- **多光标编辑**：按住 `Alt`（Windows/Linux）或 `Option`（macOS）并点击多个位置来添加多个光标，你可以同时编辑多个地方的内容。
- **快速打开最近文件**：按 `Ctrl + E`（Windows/Linux）或 `Cmd + E`（macOS）快速查看和打开最近的文件。
- **代码格式化**：按 `Ctrl + Alt + L`（Windows/Linux）或 `Cmd + Option + L`（macOS）自动格式化当前文件或代码块。
- **调试操作**：按 `Shift + F9`（Windows/Linux）或 `Cmd + F9`（macOS）启动调试，按 `F8` 跳过当前行，按 `F7` 进入当前方法，查看调用堆栈和变量值。
- **查看版本历史**：右键点击文件，选择 `Git → Show History` 来查看文件的版本历史和变更记录
- **智能提示快速修复**：在编写代码时，IDEA会自动提供变量、方法和类名的智能提示，你可以通过 `Ctrl + Space` 强制触发。
- **编辑多行**：按住 `Ctrl`（Windows/Linux）或 `Cmd`（macOS），然后点击多行，IDEA会在多个行上添加光标，可以同时编辑多个位置的内容。
- **使用Live Templates**：IDEA支持代码模板，通过输入快捷缩写并按 `Tab` 键，IDEA会自动扩展为完整的代码块。你可以自定义模板。

## JavaFX——图形化界面
教程视频
- JavaFx快速入门： https://www.bilibili.com/video/BV1pJ411q7yv
- JavaFX视频教程第1课，hello world： https://www.bilibili.com/video/BV1fW41167RP
- JavaFx快速入门_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1pJ411q7yv/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
JavaFX视频教程第1课，hello world_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1fW41167RP/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
JavaFX文本域（输入框） - JavaFX教程™： https://www.yiibai.com/javafx/javafx_textfield.html

## JUnit——单元测试框架


## Log4j——日志
Log4j 目前已被 Log4j2、SLF4J+Logback 组合部分替代，但仍有大量项目使用它。
Log4j 是 Java 最早期、最经典的 日志框架
**主要功能**：打印日志、写入文件、发送到控制台等。

其核心概念包括：
* Logger：日志记录器，定义日志逻辑。
* Appender：输出器，定义日志去哪儿（如文件、控制台、Socket）。
* Layout：格式化器，定义日志显示样式。
* Level：日志级别（如 ERROR、INFO、DEBUG）

## Lomblk
Lombok 是一个 Java 编译期插件，用来自动生成常用代码，比如 getter/setter、构造方法等。
常用注解有：
* `@Getter/@Setter`：自动生成 get/set 方法
* `@ToString`：自动生成 toString()
* `@NoArgsConstructor/@AllArgsConstructor`：自动构造器
* `@Data`：相当于 Getter + Setter + toString + equals + hashCode

## Maven
Maven Repository: Search/Browse/Explore： https://mvnrepository.com/


Maven 是 Java 项目的 构建工具，也是最常用的依赖管理工具。
构建工具的作用是管理项目的依赖和构建过程

主要功能有：
* 

主要功能：
- **依赖管理**：Maven 可以自动下载项目所需的外部依赖库（JAR 包），并确保项目中各个依赖库的版本一致。例如，如果你的项目使用了 Spring Framework，Maven 会自动帮你下载 Spring 的相关 JAR 包。
- **构建生命周期管理**：Maven 会根据 生命周期 来自动执行一系列构建任务（如编译、测试、打包、部署等）。例如，执行 `mvn compile` 命令，就是进入生命周期的编译阶段，Maven编译项目中的所有源代码；执行 `mvn install` 命令，Maven 会依次完成编译、测试、打包、安装等操作；

- **构建和部署**：Maven 还支持构建项目的可执行包（JAR、WAR 文件），并可以将这些包发布到公共仓库或私有仓库。    
- **插件管理**：Maven 提供了丰富的插件来支持其他任务，例如运行单元测试、代码质量检查、文档生成、部署等，使用 `pom.xml` 来声明依赖和插件。

* 常见命令：`mvn clean install`, `mvn package`

生命周期：
- **clean**：清理项目，删除编译后的文件。
- **validate**：验证项目是否正确。
- **compile**：编译源代码。
- **test**：执行单元测试。
- **package**：打包代码（如生成 JAR 或 WAR 文件）。
- **install**：将打包好的文件安装到本地 Maven 仓库。
- **deploy**：将构建结果部署到远程仓库。

使用参数：
-DskipTests：编译测试代码，但不执行测试代码
-Dmaven.test.skip=true：不编译测试代码，也不执行测试代码


pom.xml：
`<scope>` 是**依赖作用范围**，决定了：
- **依赖在编译、测试、运行等阶段是否可用**
- **依赖会不会打进最终的包（jar/war）里**
- **子模块是否会继承**

- `compile`（默认）：如果不写 `<scope>`，就是 `compile`。编译 / 测试 / 运行 都可用。会被打进最终 jar/war。
- `provided`：编译 / 测试可用，运行时不打包。
- `runtime`：编译时不需要，运行时才需要。测试也能用。
- `test`：只在测试阶段生效。不会打进最终包。
- `import`：用来 导入 BOM（Bill of Materials）。不是实际依赖，而是把别的 POM 的依赖管理引入进来。

`<artifactId>spring-boot-dependencies</artifactId>`是 Spring Boot 的 **依赖管理 POM**，专门列出了 Spring Boot 生态里所有常用依赖的版本号（Spring Framework、Jackson、Hibernate、Tomcat、Netty 等几十上百个）。你不用自己一个个去写版本。


`<type>pom</type>`因为 `spring-boot-dependencies` 本质上不是一个 jar 包，而是一个 **POM 文件**。它里面只有 `<dependencyManagement>`，没有源码/字节码。所以这里要指定 `<type>pom`，告诉 Maven 这是一个 POM 类型的 artifact。

- 因为 Spring Boot BOM 已经帮你管好了版本。`spring-boot-starter`、`spring-boot-starter-web`、`spring-boot-starter-test` 不需要出现在父 POM 的 dependencyManagement。子模块需要用时直接 `<dependency>` 声明，不用版本号

## MinIO
**介绍**：
MinIO 是一个高性能的 **对象存储服务器**，可以用来保存图片、视频、日志、备份等大文件，功能和亚马逊的 S3（Simple Storage Service）类似。

**特点**：
* 兼容 S3 接口，可以用 AWS SDK 来访问。
* 支持分布式部署、高可用、冷热数据分层。
* 常用于私有云、容器（如 K8s）中的文件存储。
* 可配合 Spring Boot、前端上传组件使用，轻量而灵活。

MinIO支持大文件断点续传
**资料**：
- 快速了解MinIOn老板说做一个文件服务系统，我直接找了这个开源框架_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1662ZY9ES2/?spm_id_from=333.1387.favlist.content.click&vd_source=2bebef67d77d9a55c602507243628b63

## MongoDB

**简介**：
MongoDB 是一个文档型 NoSQL 数据库，具有高写入能力，适合 “不断写入 + 查询历史 + 数据结构灵活” 的业务场景：

**优点**：
- 实时高频高并发写入能力
- 支持嵌套结构，支持动态拓展字段
- 无需 schema，数据结构灵活（所以其是NoSQL），不要求字段统一，每条数据的结构可以不同，因为同一种信息有个字段可能有，有的字段可能没有
- 支持写入分片（sharding），可以分布式横向扩展，水平扩展（多节点分布式），易扩容
- 天然无事务写入：性能比 MySQL 更高效（适用于不需要强事务的场景），弱事务（适合高性能）
- 支持高效的索引（orderId、timestamp、地理位置等）
- 支持范围查询、排序、聚合管道，以字段为单位，查询语法支持“路径式查询”，可以直接查 `.a.b.c` 结构，查询举例：`db.tracks.find({ "location.coordinates": [116.40, 39.91] })`
- 非常适合做时间序列数据的查询（虽然不是 TSDB，但灵活）

**缺点**：
- 事务支持弱：MongoDB 在 4.0 之前不支持多文档（表）事务，现在虽支持，但性能不如关系型数据库，例如金融系统涉及账户余额+日志+ 扣款流水等的多表一致写入，写入高并发时难保证强一致性。
- 强一致性较弱：默认是最终一致性，副本同步存在延迟，主从切换时可能读到旧数据（除非使用 majority 读写策略）。
- 过度灵活带来数据混乱：不强制 schema，可能导致数据结构不一致、难维护，初期方便，后期有人乱加字段，查询一地鸡毛。
- 索引机制有限：不支持复杂联合索引（如 `A or B and C` 这类复杂查询），优化能力不如 MySQL，写多读少场景还行，分析型查询不如关系型。
- 大文档性能差：BSON 单个文档最大 16MB，嵌套太深或字段过多会拖慢查询，比如保存聊天记录、日志流水要注意文档大小。
- 资源占用高：WiredTiger 存储引擎需要大量内存支撑热数据，数据越多内存压力越大，如果内存不足会导致性能抖动。
- 聚合分析能力不足：聚合功能不如 SQL 灵活，跨集合聚合很难，不适合 OLAP 场景，常需配合 Spark/Hive 做分析。
- 权限与安全机制偏弱：内建权限机制简单，不如关系型数据库成熟，多租户或精细化权限控制往往需要额外封装。
- 写冲突不可控：默认并发写入无行锁，容易出现“最后写覆盖”，多个客户端同时写同一字段可能互相覆盖，适合补偿式事务。
- 生态和兼容性一般：Mongo 查询语法独立，不支持标准 SQL，工具链不统一，很多 BI 工具或数据中台天然支持 MySQL，但对 Mongo 支持较弱。
- 面对长期大量数据表现不加，比如存储巨量日志，每天几十亿条，虽然 MongoDB 可以承受高写入，但历史数据归档麻烦、单表太大后索引性能下降、分片配置复杂、维护难度大
- 

**适合场景**：
- 灵活存储，适合结构变化频繁的数据
 - 写入性能强，适合海量实时数据
- 天生适合 JSON/BSON 结构，如轨迹、日志、用户行为
- 不适合的场景：强依赖事务、多表一致、数据结构变化不多且规则严谨的数据、需要复杂统计/JOIN/子查询、数据量超大（亿级）且结构固定的存储


**结构**：
- 每个 **集合** 类似于关系型数据库中的一张表，每个集合里的文档（Document）就是 JSON/BSON 结构，MongoDB 的设计哲学：文档即数据
```scss
数据库(db) →
    集合(collection) →
        文档(document) →
            BSON → 存入数据页 → 磁盘文件
```

- BSON（Binary JSON） —— 是一种专为机器优化的、类似 JSON 的二进制格式。可以把 MongoDB 想象成是“存储 JSON 的数据库”，只不过它用的是一种叫 BSON 的二进制格式，更高效。一条 MongoDB 记录可以长这样：
```json
{
  "userId": "u123",
  "orderId": "o567",
  "location": {
    "type": "Point",
    "coordinates": [116.397, 39.918]
  },
  "timestamp": "2025-04-25T10:45:00Z"
}
```

- MongoDB 是通过**存储引擎**（默认是 **WiredTiger**）将 BSON 文档写入磁盘。MongoDB 数据文件通常是 `.wt` 文件（WiredTiger 的压缩二进制文件），例如：
```cpp
dbpath/
  ├── collection-1--123456789.wt   // 存储一个集合的所有 BSON 文档
  ├── index-3--987654321.wt        // 索引文件
  └── WiredTiger.wt                // 全局元数据
```


**使用**：
命令行命令：
```bash
show dbs
db.version() #当前db版本
db.getMongo() #查看当前db的链接机器地址
db.help() #帮助
quit() #退出命令行
```

java中操作使用：
- pom.xml引入依赖：
```xml
<dependency>
  <groupId>org.mongodb</groupId>
  <artifactId>mongodb-driver-sync</artifactId>
  <version>4.11.1</version> <!-- 版本可根据需要调整 -->
</dependency>
```

```java
package com.example.mongo_demo;

import com.mongodb.client.*;
import org.bson.Document;

public class MongoDemo {
    public static void main(String[] args) {
        // 1. 创建连接（默认 localhost:27017）
        try (MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            // 2. 获取数据库（没有则自动创建）
            MongoDatabase database = mongoClient.getDatabase("testdb");

            // 3. 获取集合（没有则自动创建）
            MongoCollection<Document> collection = database.getCollection("users");

            // 4. 插入文档
            Document user = new Document("name", "Alice")
                    .append("age", 25)
                    .append("email", "alice@example.com");
            collection.insertOne(user);
            System.out.println("插入完成: " + user.toJson());

            // 5. 查询文档
            Document query = new Document("name", "Alice");
            FindIterable<Document> results = collection.find(query);
            for (Document doc : results) {
                System.out.println("查询结果: " + doc.toJson());
            }

            // 6. 更新文档
            Document update = new Document("$set", new Document("age", 26));
            collection.updateOne(query, update);
            System.out.println("更新完成");

            // 7. 删除文档
            collection.deleteOne(query);
            System.out.println("删除完成");
        }
    }
}
```
输出：
```text
插入完成: { "_id": { "$oid": "64f...." }, "name": "Alice", "age": 25, "email": "alice@example.com" }
查询结果: { "_id": { "$oid": "64f...." }, "name": "Alice", "age": 25, "email": "alice@example.com" }
更新完成
删除完成
```

## MyBatis——ORM工具
ORM（Object-Relational Mapping）
**介绍**：
MyBatis是一个ORM（对象关系映射）框架，用于简化Java应用程序与关系型数据库的交互。


优点：更加灵活和易于管理

其他ORM框架强制使用面向对象的实体模型，允许开发者直接编写SQL语句来控制数据库操作，适用于复杂查询和需要细粒度控制的场景

MyBatis的主要特点是SQL映射，不像，而是。‘
MyBatis适用于需要直接控制SQL、复杂查询和性能优化的场景。

与其他ORM框架相比，它不依赖对象模型而直接面向SQL，简化了映射过程。

在应用中，MyBatis可以与Spring结合，支持注入、事务管理等功能，进一步简化数据库操作。

JDBC 原始写法的问题主要有以下几点：
1. **代码冗长重复**：每次查询都要写连接、关闭、ResultSet 遍历等模板代码。
2. **SQL 与 Java 代码耦合**：SQL 写在 Java 代码中，可读性差。
3. **参数设置麻烦**：PreparedStatement 设置参数容易出错，易写错顺序或类型。
4. **结果集映射繁琐**：手动从 ResultSet 提取每个字段到 Java 对象，费时费力。
5. **无法集中管理 SQL**：难以维护大型项目中的 SQL 语句。


MyBatis 是一种 **半自动化 ORM 框架**，解决上述问题方式如下：
* 把 SQL 从 Java 中抽离到 XML 或注解中，便于维护。
* 自动封装参数和结果，减少 JDBC 样板代码。
* 支持动态 SQL、缓存、插件扩展，灵活且易用。


MyBatis的主要特性包括：
- **灵活的SQL控制**：MyBatis允许开发者手写SQL，确保数据库操作的细粒度控制，特别适合复杂查询或优化要求较高的场景。
- **动态SQL**：MyBatis的XML映射文件支持动态SQL，开发者可以使用`<if>`、`<choose>`、`<foreach>`等标签根据不同条件构建SQL语句，适应复杂的查询需求。
- **自动映射结果集**：MyBatis通过配置，可以将SQL查询结果自动映射到Java对象，支持将数据库字段映射到Java属性中，减少数据转换代码。
- **多种数据库支持**：MyBatis可以配置连接多个不同的数据库，支持多种数据库方言，适合多数据源和分布式数据库的应用。
- **事务管理**：MyBatis支持手动事务管理和与Spring集成的事务管理。在多数据库操作或业务逻辑较为复杂的情况下，可以使用事务来保证数据一致性。

MyBatis的核心组件和工作机制如下：
- **SqlSessionFactory**：这是MyBatis的核心接口，用于创建`SqlSession`对象。通过配置文件`mybatis-config.xml`指定数据库连接信息、映射文件位置和MyBatis的全局配置，创建`SqlSessionFactory`对象以管理会话。
- **SqlSession**：这是MyBatis与数据库交互的接口，包含了查询、更新、删除、提交和回滚等操作。通过`SqlSession`执行映射文件中的SQL语句，每次执行数据库操作都需要一个`SqlSession`实例，通常在操作完成后关闭该实例。
- **Mapper接口**：MyBatis支持将SQL映射到接口方法上，即Mapper接口。Mapper接口是数据库操作的抽象，通过定义接口方法，MyBatis可以自动找到对应的SQL语句并执行。每个Mapper接口的方法与一条SQL语句绑定，便于管理和复用。
- **XML映射文件**：MyBatis使用XML文件管理SQL语句，通过`<mapper>`标签定义数据库操作。XML映射文件通常与Mapper接口一一对应，包含`<select>`、`<insert>`、`<update>`、`<delete>`等标签定义具体的SQL操作。XML映射文件支持动态SQL，使得MyBatis能够在复杂条件下生成不同的SQL语句。

MyBatis的工作流程包括以下步骤：
1. **加载配置文件**：MyBatis在启动时加载配置文件`mybatis-config.xml`，创建`SqlSessionFactory`对象，配置数据库连接、日志等参数。
2. **执行Mapper接口**：通过`SqlSession`对象获取Mapper接口的代理实例，执行Mapper接口方法。MyBatis会根据方法名和参数找到对应的SQL语句，并将参数传入SQL中执行。
3. **映射结果集**：MyBatis在执行SQL语句后，将结果集自动映射到Mapper接口方法的返回类型中，并返回结果。MyBatis的结果映射支持多种映射方式，可以将数据库字段映射到Java对象的属性。

MyBatis初始化过程
MyBatis 初始化主要包含几个步骤：
1. 加载 `mybatis-config.xml` 配置文件。
2. 构建 `SqlSessionFactory`，读取数据源、插件、类型处理器等配置。
3. 加载 mapper 映射文件，构建 SQL 映射关系。
4. 创建 `SqlSession`，从中获取 Mapper 接口的代理对象。
初始化之后，通过 Mapper 调用 SQL，执行结果通过 `ResultHandler` 封装返回。


Mybatis的动态sql
动态 SQL 用于根据不同条件 **动态拼接 SQL 语句**，避免大量 if-else 拼接字符串的操作，极大增强SQL 的可维护性和灵活性。，MyBatis 提供的动态 SQL 标签包括：
* `<if>`：条件判断
* `<choose> <when> <otherwise>`：类似 switch-case
* `<where>`：智能拼接 WHERE，自动忽略多余 and/or
* `<set>`：用于 update 中拼接 set 子句
* `<trim>`：自定义拼接开头、结尾和分隔符
* `<foreach>`：用于遍历集合，构建 in (...) 语句


**Mybatis的懒加载（延迟加载）**
懒加载（延迟加载）是指在需要的时候才加载相关数据，常用于一对多、多对一等关联查询，在需要时才进行这些耗时查询，可以提升性能，但注意使用不当容易引发 N+1 查询问题。
N+1问题：先查主表1次，再从N个结果中每个单独查从表，导致总 SQL 数量 = 1 + N。
MyBatis 中开启懒加载的方式：
- 在配置中 `<settings>` 设置 `lazyLoadingEnabled=true`。
- 在 `<association>` 或 `<collection>` 中使用 `fetchType="lazy"`。



**结果映射**：
MyBatis 在 SQL 执行后，会将数据库返回的结果封装为 Java 对象。封装过程由 `ResultSetHandler` 负责，有以下几种结果映射形式：
- 自动映射：字段名和 Java 属性名一致时，自动封装。
- 手动映射：通过 `<resultMap>` 明确指定字段与属性的对应关系。
- 嵌套映射：一对多、多对一关系可通过嵌套 `resultMap` 或子查询实现。
- 注解映射：使用 `@Results`、`@Result` 注解映射字段。


Mybatis Plugin
MyBatis 提供的插件机制MyBatis Plugin ,基于 JDK 动态代理，通过拦截器（Interceptor）拦截核心执行过程，从而实现SQL 性能监控（记录执行时间）、自动分页（PageHelper）数据脱敏、审计日志等功能，支持拦截的方法有：
* `Executor`：执行 SQL
* `ParameterHandler`：参数处理
* `ResultSetHandler`：结果映射
* `StatementHandler`：SQL 预处理


和ORM框架Hibernate的对比：
* MyBatis 灵活、性能可控、适合复杂 SQL 场景。MyBatis 是 半自动 ORM，你写 SQL，框架帮你绑定参数和封装结果。
* Hibernate 开发快，适合业务逻辑清晰、关系映射稳定的场景。Hibernate 是 全自动 ORM，不需要写 SQL，自动生成 SQL 和管理对象状态。Hibernate 学习曲线更陡，调优难度大。


Mybatis中⼀级缓存和⼆级缓存的区别：
- 一级缓存是 SqlSession 级别 的缓存，默认开启，生命周期是一次数据库会话。是本地缓存，不可跨 Session。相同 SQL 执行第二次时会从缓存读取。一级缓存不能配置。
- 二级缓存是 Mapper 级别 的缓存，需要手动开启，并且缓存可被多个 SqlSession 共享，存储在内存或持久化介质中。是跨 Session 的共享缓存。二级缓存可使用 Ehcache、自定义缓存实现。


MyBatis 接口绑定：底层实现基于 JDK 动态代理 + SQL 映射配置：MyBatis 会基于接口和配置创建一个代理对象，在调用接口方法时动态执行对应的 SQL。有两种方式：
- XML 映射方式（常用）：接口和 XML 一一对应，SQL 写在 XML 文件中。
- 注解方式：在接口上直接写 SQL 注解，如 `@Select`, `@Insert` 等。



Mybatis中Dao接⼝和XML⽂件的SQL如何建⽴关联：MyBatis 会自动为 DAO 创建代理对象，底层通过动态代理调用对应 SQL。MyBatis 使用 **接口与 XML 映射文件的绑定**机制。绑定方式：
* DAO 接口的方法名与 XML 中的 `<select>`、`<insert>` 的 `id` 相同。
* 接口全类名与 XML 文件路径相匹配，可以通过配置 mapper.xml 路径到配置文件或者或通过注解 `@MapperScan` 自动扫描接口，Mapper注册方式






## MyBatis Plus

和Mybatis对比：
- 传统MyBatis需要 `UserMapper.xml` + `<insert|select|update|delete>` + `resultMap`，并且简单 CRUD 也要写 SQL
- 而MyBatis Plus只要继承 `BaseMapper<T>`，立刻获得`insert、selectById、updateById、deleteById、selectList(...)` 等 20+ 个通用方法

MyBatis自己写动态 SQL（`<where> <if> <foreach>`），维护成本高
mby：`QueryWrapper` / `LambdaQueryWrapper` / 链式 `query()/update()`，**无 XML 的动态条件拼接**，Lambda 写法自动感知字段（避免写错列名/属性名）
```java
// 查询：name 模糊，age 在区间内，按 age 降序取前 10
List<User> list = userMapper.selectList(
  new LambdaQueryWrapper<User>()
    .like(User::getName, "Al")
    .between(User::getAge, 18, 30)
    .orderByDesc(User::getAge)
    .last("limit 10")
);

// 更新：把 name='Bob' 的记录 age + 1
userMapper.update(
  null,
  new LambdaUpdateWrapper<User>()
    .eq(User::getName, "Bob")
    .setSql("age = age + 1")
);

// 链式（依赖 Service 或 MP 提供的链式工具）
boolean ok = new LambdaUpdateChainWrapper<>(userMapper)
  .eq(User::getName, "Carol")
  .set(User::getAge, 40)
  .update();

```


mbp的分页器开箱即用
mbp通过一行注解就可以实现逻辑删除（软删），自动拼接逻辑删除条件，避免误查已删除数据


**审计字段自动填充**，不再到处手搓时间戳
```java
public class User {
  @TableId(type = IdType.AUTO) private Long id;
  private String name; private Integer age;

  @TableField(fill = FieldFill.INSERT) private LocalDateTime createTime;
  @TableField(fill = FieldFill.INSERT_UPDATE) private LocalDateTime updateTime;
}

@Component
public class AuditMetaHandler implements MetaObjectHandler {
  @Override public void insertFill(MetaObject meta) {
    strictInsertFill(meta, "createTime", LocalDateTime::now, LocalDateTime.class);
    strictInsertFill(meta, "updateTime", LocalDateTime::now, LocalDateTime.class);
  }
  @Override public void updateFill(MetaObject meta) {
    strictUpdateFill(meta, "updateTime", LocalDateTime::now, LocalDateTime.class);
  }
}
```

MBP扔兼容XML，在复杂 SQL、联表、多子查询时，仍可写 XML，同时复用 Wrapper 的动态条件，MP 的 Wrapper 可作为参数传入 XML，继续享受条件构造带来的灵活性
```xml
<!-- resources/mapper/UserMapper.xml -->
<select id="selectJoin" resultType="com.example.demo.vo.UserOrderVO">
  SELECT u.id, u.name, o.id AS orderId, o.amount
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  <where>
    ${ew.customSqlSegment}   <!-- 允许传入 Wrapper 的动态条件 -->
  </where>
</select>

```

```java
// Mapper
public interface UserMapper extends BaseMapper<User> {
  List<UserOrderVO> selectJoin(@Param(Constants.WRAPPER) Wrapper<User> wrapper);
}

// 调用
List<UserOrderVO> rows = userMapper.selectJoin(
  new QueryWrapper<User>().lambda().ge(User::getAge, 18)
);

```

**升级点**：**能无缝兼容 XML**





**查询条件构造器LambdaQueryWrapper**
`LambdaQueryWrapper` 是 MyBatis-Plus 框架中的一个查询条件构造器，用于编写简洁、类型安全的查询条件。它与 MyBatis-Plus 的 `QueryWrapper` 类似，区别在于使用了 **Lambda 表达式**，可以避免手动输入字段名时可能出现的拼写错误等问题，从而使查询条件更加安全可靠。
使用场景
`LambdaQueryWrapper` 主要用于：
- 构建查询条件，执行简单或复杂的查询操作。
- 避免手写 SQL，提升代码的可读性和安全性。
- 结合 Lambda 表达式进行条件筛选和过滤。
基本用法
以下是 `LambdaQueryWrapper` 的一些常见用法：
1. **基本查询**
   ```java
   LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
   queryWrapper.eq(User::getAge, 25);  // 查询 age 为 25 的用户
   List<User> users = userMapper.selectList(queryWrapper);
   ```
   - `eq` 是等值查询，查询年龄为 25 的用户。
   - `User::getAge` 使用了 Lambda 表达式，表示查询的字段是 `age`。
2. **多条件查询**
   ```java
   LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
   queryWrapper.eq(User::getAge, 25)
               .like(User::getName, "张")   // 模糊查询名字包含"张"的用户
               .gt(User::getSalary, 5000);  // 工资大于5000
   List<User> users = userMapper.selectList(queryWrapper);
   ```
   - `like` 表示模糊查询，名字包含“张”。
   - `gt` 表示大于条件，查询工资大于 5000 的用户。
3. **条件链式调用**
   MyBatis-Plus 的 `LambdaQueryWrapper` 支持链式调用，可以组合多个查询条件：
   ```java
   LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
   queryWrapper.ge(User::getAge, 18)        // 年龄大于等于 18
               .le(User::getAge, 30)        // 年龄小于等于 30
               .between(User::getCreateTime, "2022-01-01", "2023-01-01");  // 创建时间在2022年到2023年之间
   List<User> users = userMapper.selectList(queryWrapper);
   ```
4. **动态条件查询**
   通过 `LambdaQueryWrapper` 可以实现动态条件构建，例如：
   ```java
   LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
   Integer age = null;  // 年龄为空时不会添加此查询条件
   String name = "李";
   queryWrapper.eq(age != null, User::getAge, age)
               .like(StringUtils.isNotBlank(name), User::getName, name);
   List<User> users = userMapper.selectList(queryWrapper);
   ```
   - `eq` 和 `like` 方法的第一个参数是一个布尔值，当条件为 `true` 时才会添加对应的查询条件，这样可以根据实际的输入情况动态构建查询。
5. **排序**
   可以使用 `orderByAsc` 和 `orderByDesc` 方法对查询结果进行排序：
   ```java
   LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
   queryWrapper.orderByAsc(User::getAge);  // 按年龄升序
   List<User> users = userMapper.selectList(queryWrapper);
   ```
6. **指定查询字段**
   默认情况下，`selectList` 会查询表中的所有字段，如果只需要查询部分字段，可以使用 `select` 方法：
   ```java
   LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
   queryWrapper.select(User::getId, User::getName)
               .eq(User::getStatus, 1);  // 只查询ID和名字，状态为1
   List<User> users = userMapper.selectList(queryWrapper);
   ```
7. **分页查询**
   与 MyBatis-Plus 的分页插件结合使用时，`LambdaQueryWrapper` 也可以用于分页查询：
   ```java
   LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
   queryWrapper.eq(User::getStatus, 1);
   Page<User> page = new Page<>(1, 10);  // 当前第1页，每页10条记录
   IPage<User> result = userMapper.selectPage(page, queryWrapper);
   ```
常用的查询方法
- `eq`：等值查询
- `ne`：不等值查询
- `gt`：大于
- `ge`：大于等于
- `lt`：小于
- `le`：小于等于
- `like`：模糊查询
- `in`：查询包含在某个集合中的值
- `between`：在某个范围内
- `isNull` / `isNotNull`：是否为空
- `or`：或者条件
- `orderByAsc` / `orderByDesc`：升序、降序排序
总结
`LambdaQueryWrapper` 提供了便捷、类型安全的条件构造方式，在 MyBatis-Plus 中极大简化了 SQL 查询的编写工作。同时它还支持动态构建查询条件、分页查询、排序等功能，非常适合处理复杂的业务查询场景。



## Nacos

**简介**：**Nacos** 是阿里巴巴开源的一个动态服务发现、配置管理和服务管理平台，适用于构建微服务架构。

**优点**
- **微服务架构**：Nacos 可以高效地管理微服务应用中的服务注册与发现，适合微服务体系结构。
- **多环境配置管理**：Nacos 能集中管理和动态更新多环境的配置，简化了配置管理流程。
- **跨语言支持**：Nacos 支持不同语言的客户端，便于跨语言服务间的协同管理。


**功能**：
- **服务注册与发现**：Nacos 可以像 Eureka、Consul 等服务注册中心一样，通过提供一个中心化的目录来跟踪微服务的实例。Nacos 维护了所有注册到它的服务信息，当一个服务实例启动时，它会向 Nacos 注册自己的信息（ IP 和端口），其他服务可以通过 Nacos 查找和调用它。
- **配置管理**：Nacos 还提供了配置中心功能，可以在其中集中管理应用的配置信息。如果需要更新配置，只需修改 Nacos 中的配置，服务会自动获取新的配置。
- **动态配置推送**：当配置发生变化时，nacos可以立即推送到客户端应用程序，不用客户端定时拉取。传统方法是开发人员需要手动修改配置文件并重启服务。原理是使用一种类似 长轮询（Long Polling）或 WebSocket 的机制将配置变更通知给客户端。
- **动态路由和负载均衡**：Nacos 支持动态的服务路由，可以在服务之间进行智能路由，确保请求被路由到健康的服务实例。它还与 Ribbon 和其他负载均衡器集成，以实现智能负载均衡，确保更高的可靠性和性能。
- **服务健康监测**：传统的配置管理通常是定时拉取配置的方式，也就是说，服务会每隔一定时间去检查配置是否发生了变化。Nacos 提供了健康检查和服务监控功能。它可以定期检查服务实例的健康状况，对服务进行心跳检测，监控服务的可用性状态，如果某个服务实例不可用，则 Nacos 将自动更新注册表，将请求转移到其他健康实例，确保服务的高可用性。
- **命名空间和多环境管理**：Nacos 提供了命名空间（Namespace）管理功能，方便开发者在不同环境（如开发、测试、生产）之间隔离配置信息。此外，它的配置分组（Group）功能允许将相同的配置划分到不同的分组，以实现更加细粒度的管理。
- **版本控制**：可以在 Nacos 控制台中查看配置的历史版本，并在需要时回滚到某个版本。
- **灰度发布**：允许你将新配置逐步推送给部分应用实例，观察效果后再全面发布。
- **集群模式**：Nacos 默认是单机模式，但支持集群模式。通过此实现负载均衡和自动故障转移，高可用；原理是Nacos 集群通过 一致性哈希 来分配服务注册和配置的存储。



**常用组件**
- **Nacos Server**：提供服务注册、配置管理和服务监控的功能。
- **Nacos Client**：用于与 Nacos Server 通信的客户端库，一般集成到各个服务中。



**使用**：
**安装Nacos**：
- 下载，解压，安装安装包
- 或者直接下载docker，在 localhost:8848/nacos 运行，用户名和密码都是nacos

**Spring中使用**：
- **引入依赖**：引入 `spring-cloud-starter-alibaba-nacos-config` 依赖
- **配置 Nacos 连接信息**：在项目的 `application.yml` 或 `application.properties` 文件中配置 Nacos 的服务器地址和命名空间。例如：
```yaml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848  ## Nacos 服务地址
        namespace: your-namespace-id  ## 可选：命名空间 ID
        group: DEFAULT_GROUP          ## 可选：配置组
```
- **服务注册和发现**：在 Spring Boot 的主类中加上`@EnableDiscoveryClient` 注解，启用服务注册与发现
- **使用 @RefreshScope 注解**：通过在配置类或 Bean 上添加这个注解，Spring 可以在 Nacos 中的配置发生变化时自动更新 Bean 的属性。
- **在 Nacos 配置中心创建配置文件**：在 Nacos 控制台中创建对应的数据 ID 和配置内容。通常，Spring Boot 项目使用的配置文件命名规则为 `DataID: ${spring.application.name}.properties`，以便在 Nacos 中进行映射。例如，项目的 `application.yml` 配置会对应到 Nacos 中的 `demo-service.yml` 或 `demo-service.properties`。
- **使用配置值**：在 Spring 项目中，通过 `@Value` 或 `@ConfigurationProperties` 注解可以直接注入从 Nacos 中加载的配置。例如：
```java
@Value("${config.key:defaultValue}")
private String configValue;
```
- **设置配置动态刷新**：配置发布到 Nacos 后，Spring 项目会自动从 Nacos 获取并应用新配置，满足微服务系统的动态更新需求。这种方式允许应用在不重启的情况下更新配置，非常适合动态配置需求较高的场景。通过这种方式，Spring 项目可以灵活、安全地使用 Nacos 配置中心的集中配置管理功能。
- **配置集群模式**：在 `application.properties` 中写入 Nacos 节点信息，例如：
```properties
## 假设你有 3 个 Nacos 实例
nacos.discovery.server-addr=127.0.0.1:8848,127.0.0.2:8848,127.0.0.3:8848
```




## Netty
是一个Java 高性能网络通信框架，封装 NIO、支持异步事件驱动、零拷贝等
Netty 通过 **ChannelHandler** 链式处理入站/出站数据
每个 Channel 对应一个 TCP 连接

- Netty 的 `EventLoop` 本质是一个单线程事件循环，内部封装了 **Selector**。
- EventLoop负责事件轮询和selector，一个 `EventLoop` 绑定多个 `Channel`，并不断轮询它们的 IO 事件。
- 当 `Selector` 检测到某个 Channel 有事件（如 OP_READ 可读），就回调到该 Channel 的 `pipeline` 去处理。
- 支持多 Reactor：BossGroup 处理 accept，WorkerGroup 处理 read/writ

优势：
- NIO，通过一个selector，多路复用，避免每个连接都创建线程
- 复用Channel，建立一次连接，可以多次使用，不用每个连接都new 一个socket，避免频繁创建和销毁 TCP 连接，减小开销，减少端口使用
- Zero-Copy零拷贝传输，
- 支持异步事件，使用 `Future`、`Promise` 等非阻塞处理方式


**代码**：
🔹 服务端 Netty 初始化：
```java
public class NettyRpcServer {
    public void start(int port) {
        EventLoopGroup boss = new NioEventLoopGroup();
        EventLoopGroup worker = new NioEventLoopGroup();

        ServerBootstrap b = new ServerBootstrap();
        b.group(boss, worker)
         .channel(NioServerSocketChannel.class)
         .childHandler(new ChannelInitializer<SocketChannel>() {
             protected void initChannel(SocketChannel ch) {
                 ChannelPipeline p = ch.pipeline();
                 p.addLast(new RpcDecoder()); // 自定义解码器
                 p.addLast(new RpcEncoder()); // 自定义编码器
                 p.addLast(new RpcRequestHandler()); // 业务处理
             }
         });

        b.bind(port).sync();
        System.out.println("RPC服务已启动，监听端口：" + port);
    }
}
```


## Rabbitmq——消息中间件
使用信息：
- rabbitmq management： http://localhost:15672
- java链接地址：127.0.0.1:5672
- 用户名：guest
- 密码：guest

**安装插件**：
```bash
docker cp ./rabbitmq_delayed_message_exchange-3.9.0.ez rabbitmq:/plugins
```

**简介**：
RabbitMQ是一种开源的消息中间件，基于AMQP（Advanced Message Queuing Protocol，高级消息队列协议）协议，用于在分布式系统中实现异步通信。
消息中间件的核心作用是实现消息的生产和消费
作为消息队列系统，用来处理异步事件（如延迟消息推送、超时检查等）；
RabbitMQ在分布式系统中作为消息中间件，实现了可靠的消息传递、灵活的路由策略和高性能的异步通信，是处理高并发和异步任务的有效工具。


**常用场景**：
- 异步处理：用于将耗时的任务异步化，减少主流程阻塞，如订单处理、邮件发送、视频转码、邮件发送等。
- 系统解耦：通过消息队列实现系统模块间的解耦，生产者和消费者不直接调用，减少系统间的依赖，使系统具有更高的灵活性和扩展性。
- 流量削峰：通过缓冲突发请求，将请求分配到不同时间处理，防止系统过载。消息堆积在队列中，慢慢被消费，避免系统被瞬时高流量压垮。
- 事件驱动架构：在微服务中，消息队列用于事件的传播，实现事件驱动的系统架构。
- 消息广播：一条消息发给多个消费者（如通知系统）

**RabbitMQ主要特点**：
- **高性能**
- **可靠性**：支持消息持久化、确认机制（ACK/NACK）和死信队列，确保消息的持久性和安全性。
- **高可用性**：RabbitMQ支持集群和镜像队列机制，确保节点之间的数据冗余，提升可用性。
- **灵活性**：有灵活的路由机制，基于多种类型的交换机，提供丰富的路由策略，适用于复杂的消息传递需求。
- **多种协议支持**：除AMQP外，RabbitMQ还支持MQTT、STOMP等多种协议，方便不同类型的客户端接入。
- **监控与管理**：RabbitMQ提供了Web管理界面和API接口，帮助用户实时监控队列、消息、连接等状态。



**核心组件**
- **Producer（生产者）**：生产者是消息的发送方，负责将消息推送到RabbitMQ中。生产者将消息发送到交换机（Exchange），而不是直接发送到队列，这样可以更灵活地进行消息路由。
- **Exchange（交换机）**：交换机负责将消息路由到一个或多个队列中，基于绑定关系和路由规则分发消息。Routing Key（路由键）是生产者发消息时指定的“消息标签”，交换机根据它判断要发到哪个队列。RabbitMQ支持四种交换机类型：Direct（直连交换机）、Fanout（扇出交换机）、Topic（主题交换机）、Headers（头交换机），每种类型都有不同的路由逻辑：
	- **direct**：按绑定的 routing key 精确匹配
	- **fanout**：广播，发到所有绑定队列
	- **topic**：按规则匹配 routing key（支持通配符）
	- **headers**：按消息头属性路由
- **Queue（队列）**：队列是消息的存储容器，RabbitMQ通过队列实现消息的持久化、消费和重试等功能。队列的特性包括持久化、优先级和延时队列等，确保消息的可靠存储。
- **Consumer（消费者）**：消费者是消息的接收方，从队列中获取消息并进行处理。消费者可以主动拉取消息，也可以通过消息推送的方式实现异步消费。

**工作流程**
- 生产者将消息发送到交换机，并指定路由键。
- 交换机根据路由规则将消息发送到绑定的队列。
- 消费者从队列中获取消息并进行处理，消息在处理完成后被确认（ACK），系统从队列中删除该消息。
- 如果消息消费失败，可以重新投递或移动到死信队列（DLX），确保消息不会丢失。

**消息传递模式**：
- **点对点模式（Direct Exchange）**：生产者发送的消息带有一个特定的路由键，交换机根据该路由键将消息定向发送到匹配的队列。
- **广播模式（Fanout Exchange）**：交换机将消息广播到所有绑定的队列中，适合不需要路由的场景，如日志收集。
- **主题模式（Topic Exchange）**：交换机根据路由键模式将消息路由到匹配的队列，可以实现多层级路由，适用于多级分类的消息传递。
- **基于头部模式（Headers Exchange）**：交换机根据消息的头部属性进行路由，灵活度较高，但性能不如其他模式。

好的，我将你给的内容重新调整为无序列表，并且把单一分点直接与上级合并。以下是修改后的内容：

MQ 如何处理**消息积压**？
- 消息积压通常是 生产消息的速度大于消费速度，导致队列中的消息越来越多。
  - 临时提速  ：增加消费者数量（水平扩展）；提高单个消费者的并发度（多线程 / 异步消费）
  - 限流保护  ：使用 RabbitMQ 的 basic.qos 设定 prefetch count ，避免消费者一次性拉太多数据；从生产端限流，避免无限生产导致内存溢出
  - 过期与丢弃  ：设定 TTL（Time To Live），超过时间的消息直接丢弃；配合死信队列（DLX）做异常处理
  - 分级处理  ：重要消息优先队列  ；普通消息延迟处理或直接丢弃

MQ 如何保证消息不丢失？
  - **消息持久化**  （**持久化不是实时写磁盘**，可能会有极短的丢失风险（crash 发生在写之前）
    - **队列持久化**：创建队列时设定 durable=true  
    - **消息持久化**：`delivery_mode=2`（消息落盘）  
  - **生产确认** 
    - 开启 **Publisher Confirms** 模式（发布确认）  
    - 消息写入 RabbitMQ 内部存储后，才返回 ACK 给生产者
  - **消费确认**  
    - 消费者处理完后，通过 **手动 ACK**（basicAck）确认  
    - 如果消费者崩溃且没 ACK，RabbitMQ 会把消息重新投递给其他消费者


如何防止MQ自己弄丢数据：
- 原因
	- 没有开启持久化  
	- 磁盘或文件系统损坏  
	- 集群数据丢失（网络分区 / 节点故障）
- 应对方案：
	- 开启 镜像队列/Quorum Queue（RabbitMQ 高可用特性）  ：消息会在多个节点复制，单节点宕机不丢数据
	- 定期备份：  用 shovel/federation 或外部备份 MQ 数据
	- 使用 发布确认 + 业务端重试：业务端保留未确认的消息并可重复投递


MQ 如何保证消息的顺序性？
- **保证顺序的条件：**
	- **单一队列**：同一业务 Key 的消息必须发送到同一个队列
	- **单一消费者线程**：一个队列只能由一个线程消费，否则可能乱序
	- **手动 ACK 且按顺序处理**：消费者必须严格按顺序处理并确认
- **可能影响顺序的因素：**
	- 多个消费者同时消费一个队列（并发导致乱序）  
	- 消费失败重试时，后来的消息可能先消费到
- **解决思路：**
	- 按业务 Key 分队列（Hash 分区）
	- 保证同一 Key 的消息只由一个消费者处理
	- 如果要并发消费，可按 Key 分成多个顺序队列



**一般场景：** **订单异步调度**：用户下订单后，可能要等待支付、物流、短信通知等，这些都不是同步立即执行的。如果所有操作同步执行，会影响响应速度、用户体验 ，应当下单成功后立即响应用户，后续步骤通过 MQ 异步处理。
- 用户下单 -> 写入数据库 -> 发送消息到 RabbitMQ（比如 `"order.created"`）
- 消费者监听该消息，异步执行库存扣减、短信通知、物流处理等


**延迟消息推送**：订单未付款提醒场景： 用户下单后，10分钟还未支付，可以发送提醒通知。
实现方法：使用 RabbitMQ 的延迟队列（死信队列）+ TTL
- 发送一条消息进入延迟队列，设置 TTL = 10分钟（消息有效时间）
- 10分钟后消息“过期”，被 RabbitMQ 转发到“死信队列”（Dead Letter Queue）
- 死信队列的消费者拿到消息，执行提醒通知操作（比如发短信、App推送）
为什么我们不直接等到“订单到期时间”再执行操作，而要用“死信队列 + 延迟消息”这种方式？：因为这样耗资源、延迟不精确，数据库压力大，如果一直计时，则一直运行个程序太浪费资源，而如果把计时存入数据库，则轮询数据库也耗费资源，并且可能有延迟

**订单超时处理**（比如未支付自动取消）： 用户下单后 30 分钟还没支付，要自动关闭订单。
解决方案：使用 RabbitMQ 延迟队列 + 死信队列
（注意：延迟队列功能原生 RabbitMQ 不支持，需要配置 死信队列（DLX）+ TTL）
（如果对延迟控制要求更精确，可以考虑用 RabbitMQ 插件 `rabbitmq_delayed_message_exchange`）

- 同样，发一条延迟消息，TTL = 30分钟
- 过期后进入“订单超时处理队列”
- 消费者消费后检查订单状态：如果已支付：忽略；如果未支付：修改订单状态为“已取消”



## Seata

**介绍**：Seata （Simple Extensible Autonomous Transaction Architecture）是阿里开源的分布式事务中间件，是一套开源的分布式事务解决方案，用于确保在多个微服务中操作多个数据库时的数据一致性。

**为什么需要分布式事务**？
比如对于 用户下单 + 库存扣减 + 支付成功 + 修改订单状态 这一系列操作，它们分布在不同服务/数据库中，并且必须要么都成功，要么都失败，否则就会出问题。所以需要分布式事务，让它们“要么都成功，要么全部回滚”。
假如支付成功但订单没写入，使用Seata将自动回滚支付记录；假如扣了库存但订单失败，使用Seata可以自动补回库存；当发生网络抖动，调用中断，Seata会将事务挂起，等网络恢复后自动处理

Seata的优势：
- 分布式操作导致多数据库事务难协调，自动拦截 SQL，统一事务控制
- 部分服务成功导致数据不一致，Seata 自动回滚所有已完成的操作
- 比2PC快，而AT 模式仅在提交/回滚时协调，不锁主流程
- 编码简单，一行注解 `@GlobalTransactional` 搞定整个流程


**Seata的模式**：

| 模式          | 说明                                   |
| ----------- | ------------------------------------ |
| **AT 模式**   | 自动代理数据库操作，适用于 JDBC/MyBatis 项目（最多人用）  |
| **TCC 模式**  | 手写 Try-Confirm-Cancel 接口，适合业务控制度高的场景 |
| **SAGA 模式** | 长事务补偿机制，适用于长流程/异步场景                  |
| **XA 模式**   | 接口级的两阶段提交，和传统数据库 XA 接口兼容             |
**组件简要说明**：
**TC**（Transaction Coordinator）：事务协调器，协调全局事务提交/回滚
**TM**（Transaction Manager）：发起全局事务（通常在订单服务）
**RM**（Resource Manager）：每个服务中的数据库代理，管理本地事务（库存/支付等）


**AT模式的执行流程**：
1️⃣ 全局事务开始：订单服务发起 `@GlobalTransactional`，Seata TC 创建全局事务I
2️⃣ 各服务执行本地事务：Seata 自动拦截 SQL，记录“**原值快照**”（undo_log）用于回滚
3️⃣ 全部成功 → 提交；任一失败 → 回滚：Seata TC 通知所有服务提交/回滚
![[ChatGPT Image 2025年4月25日 17_09_51.png]]


**示例**
**代码使用**
全局事务入口加 `@GlobalTransactional`，Seata 会自动拦截所有数据库操作，帮你记录 undo_log，确保一致性

🎯 场景简述：用户下单（Order Service） → 扣库存（Stock Service） → 分布式事务控制

📁 项目结构
```
seata-demo/
├── common/                  公共实体模块
├── order-service/           下单服务（全局事务发起者）
├── stock-service/           库存服务（资源参与者）
└── seata-server/            外部启动
```


pom.xml加依赖（）：
```xml
<dependency>
  <groupId>io.seata</groupId>
  <artifactId>seata-spring-boot-starter</artifactId>
</dependency>
```


⚙️application.yml 配置TC 地址（Seata Server）（以 order 为例）
```yaml
seata:
  enabled: true
  tx-service-group: my_tx_group
  service:
    vgroup-mapping:
      my_tx_group: default
    grouplist:
      default: 127.0.0.1:8091
  registry:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
```

数据库准备：每个服务的数据库都需要一个 undo_log 表：
```sql
CREATE TABLE `undo_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `branch_id` BIGINT NOT NULL,
  `xid` VARCHAR(100) NOT NULL,
  `context` VARCHAR(128) NOT NULL,
  `rollback_info` LONGBLOB NOT NULL,
  `log_status` INT NOT NULL,
  `log_created` DATETIME NOT NULL,
  `log_modified` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
);
```

公共模块 common
```java
@Data
public class OrderRequest {
    private Long userId;
    private Long productId;
    private Integer count;
}
```

stock-service 库存服务-Controller
```java
@RestController
@RequestMapping("/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping("/decrease")
    public String decrease(@RequestParam Long productId, @RequestParam Integer count) {
        stockService.decrease(productId, count);
        return "success";
    }
}
```

stock-service 库存服务-Service
```java
@Service
public class StockService {

    @Autowired
    private StockMapper stockMapper;

    public void decrease(Long productId, Integer count) {
        stockMapper.decreaseStock(productId, count);
    }
}
```

stock-service 库存服务-Mapper
```java
@Mapper
public interface StockMapper {
    @Update("UPDATE stock SET count = count - #{count} WHERE product_id = #{productId}")
    void decreaseStock(@Param("productId") Long productId, @Param("count") Integer count);
}
```


order-service订单服务-Controller

```java
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public String create(@RequestBody OrderRequest request) {
        orderService.createOrder(request);
        return "success";
    }
}
```

order-service订单服务-Service

```java
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private StockFeignClient stockClient;

    @GlobalTransactional
    public void createOrder(OrderRequest request) {
        orderMapper.insertOrder(request.getUserId(), request.getProductId(), request.getCount());

        // 远程调用扣库存
        stockClient.decrease(request.getProductId(), request.getCount());

        // 模拟异常测试事务
        // int a = 1 / 0;
    }
}
```

order-service订单服务-Mapper

```java
@Mapper
public interface OrderMapper {
    @Update("INSERT INTO orders(user_id, product_id, count, status) VALUES(#{userId}, #{productId}, #{count}, 'CREATED')")
    void insertOrder(@Param("userId") Long userId, @Param("productId") Long productId, @Param("count") Integer count);
}
```


FeignClient
```java
@FeignClient(name = "stock-service")
public interface StockFeignClient {
    @PostMapping("/stock/decrease")
    String decrease(@RequestParam("productId") Long productId, @RequestParam("count") Integer count);
}
```

启动步骤
- 启动 Nacos
- 启动 Seata Server（配置 registry + db store）
- 启动 `order-service` 和 `stock-service`
- 调用 POST `/order/create`，传入 productId 和 count
- 验证订单写入、库存扣减一致性（加异常验证回滚）

🎯效果
正常下单：订单和库存都成功
模拟异常：订单插入会被回滚，库存也不会减少


## Swagger
一个教程： https://developer.aliyun.com/article/1254601?spm=5176.26934562.main.2.3ca15696LdpSiR


启动应用后，默认访问：

- Swagger UI：`http://localhost:8080/swagger-ui/index.html`
    
- OpenAPI JSON：`http://localhost:8080/v3/api-docs`
    
- （多分组时还会有 `/v3/api-docs/{group}`）
    

在 Swagger UI 页面里就能点“Try it out”在线调试请求。
## ThreadPoolExecutor——线程池


## Thymeleaf——模板引擎

thymeleaf官方文档 https://www.thymeleaf.org/documentation.html

添加依赖：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

基本用法：
1. Thymeleaf 使用 `th:*` 属性来表示动态内容，使用 `${}` 来引用上下文变量。
```html
<span th:text="${user.name}">Default Name</span>
```
2. 条件渲染
```html
<img th:if="${isLoggedIn}" th:src="@{/images/user.png}" alt="User">
<img th:unless="${isLoggedIn}" th:src="@{/images/guest.png}" alt="Guest">
```
3. 循环遍历集合。
```html
<ul>
  <li th:each="item : ${items}" th:text="${item.name}"></li>
</ul>
```
4. 动态设置链接和资源路径
```html
<img th:src="@{/path/to/resource/${imageName}.png}">Link</a>
<a th:href="@{~/home}">Home</a>
```
5. 复用片段
```html
<div th:replace="${templateName} :: ${fragmentName}"></div>
同一文件内，“${templateName}”可省略
<!-- fragments.html为要被复用的片段 -->
<div th:fragment="header">
  <h1>Header Content</h1>
</div>
<div th:fragment="footer">
  <p>Footer Content</p>
</div>
<!-- main.html使用被复用的片段 -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
  <title>Thymeleaf Fragment Example</title>
</head>
<body>
  <div th:insert="~{fragments :: header}"></div>
  
  <p>Main Content</p>
  
  <div th:insert="~{fragments :: footer}"></div>
</body>
</html>
```
6. 国际化（可以切换到不同语言）
在不同的“\*.properties”文件中使用相同的键根据不同的语言设置不同的值，再通过编写代码，来实现切换语言的效果
```
## messages_fr.properties
welcome.message=Bienvenue
goodbye.message=Au revoir
## messages_zh_CN.properties
welcome.message=欢迎
goodbye.message=再见
```
要操作的代码：
```html
<p th:text="#{welcome.message}">Welcome</p>
```

## Zookeeper
https://zookeeper.apache.org
简介：
Zookeeper是一个分布式协调应用，可用作注册中心和配置中心，

结构：
比如你有一个服务名叫 `order-service`，它的注册结构如下：
```text
/registry
  └── /order-service
        ├── 192.168.1.101:8080   ← provider1（临时节点）
        ├── 192.168.1.102:8080   ← provider2
        └── ...
```

本地缓存：
客户端通过建立**本地缓存**避免频繁访问 ZK，并使用 **Watcher 监听节点变化（增、删、改）**，实时同步服务列表，当有新增/下线时及时触发事件更新本地数据，在**高并发、海量节点**场景下实现稳定可靠的服务发现机制。


**使用**：
下载地址： https://zookeeper.apache.org/releases.html
- 下载：apache-zookeeper-3.8.3-bin.tar.gz
- 解压：apache-zookeeper-3.8.3-bin.tar.gz
- 进入：apache-zookeeper-3.8.3-bin\conf
- 复制文件：zoo_sample.cfg → zoo.cfg
- 编辑zoo.cfg：
	- tickTime=2000
	- dataDir=D:/zookeeper/data
	- clientPort=2181
- 创建：D:\zookeeper\data
- 进入：apache-zookeeper-3.8.3-bin\bin
- 打开命令行，运行：zkServer.cmd，看输出中是否有：Starting zookeeper ... STARTED，有，就代表运行成功（输出乱七八糟的有很多）
- 再在apache-zookeeper-3.8.3-bin\bin，打开命令行，运行：zkCli.cmd，进入 ZooKeeper 命令行客户端，默认连接 `127.0.0.1:2181`，可输入以下命令，创建一个节点并查看，来测试能否正常使用：
```bash
create /test hello
get /test
ls /
```

## END