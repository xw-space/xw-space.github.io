---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---
一些Java服务开发工具的介绍
<!-- more -->

# Java Service Dev Tools

## Feign—服务调用
### 介绍
**是什么**：
Feign 是 Spring Cloud 中用于简化 HTTP 客户端调用的一个声明式 HTTP 客户端库。

**作用**：让使用者只需像调用本地接口一样调用远程 API。

**原理**：Feign 允许你通过在简单的接口上加注解的方式来定义 HTTP 请求方式

**优点**
- 简洁性：无需手动编写大量的代码来发出 HTTP 请求和处理响应，隐藏了底层复杂的网络请求逻辑。
- **自动序列化和反序列化**：Feign 可以自动将请求和响应数据序列化为 JSON、XML 或其他格式，并将响应反序列化为 Java 对象。
- **与 Spring 集成良好**：与 Spring Boot 和 Spring Cloud 无缝集成。通过与 Eureka、Ribbon、Hystrix 等其他 Spring Cloud 组件结合，Feign 可以支持服务发现、负载均衡和容错。
- 强大的扩展能力：支持自定义的序列化、反序列化逻辑和请求拦截器。

**常见用途**
- **微服务之间的通信**
- **服务发现**：与 Eureka 等服务发现工具结合，Feign 可以通过服务名称自动找到服务的实例，实现负载均衡和自动故障转移。
- **简化 API 网关开发**：在 API 网关中，可以通过 Feign 来代理内部服务的接口，方便地转发请求。


### **用法**
- **引入Feign依赖**
```xml
<dependency>
   <groupId>org.springframework.cloud</groupId>
   <artifactId>spring-cloud-starter-openFeign</artifactId>
</dependency>
```
- **定义 Feign 接口**
- Feign 接口就像是服务的代理，主要通过注解定义。可以使用 `@FeignClient` 注解来声明一个 Feign 客户端，并通过方法上的注解来定义 HTTP 请求。
- Spring 会为每个 `@FeignClient` 注解的接口创建一个动态代理类，并将其注册到 Spring 的上下文中。
- 当你调用这个接口的方法时，实际调用的是由 Feign 生成的代理对象，而这个对象会根据你定义的注解和配置来执行相应的 HTTP 请求。
- 下面这个例子中，`@FeignClient(name = "user-service")` 表示这个 Feign 客户端将调用名为 `user-service` 的服务，而 `@GetMapping` 注解指定了它将进行一个 `GET` 请求来获取用户信息。
```java
@FeignClient(name = "user-service")
public interface UserClient {
   @GetMapping("/api/user/{id}")
   User getUserById(@PathVariable("id") Long id);
}
```
- **启用 Feign**
- 在主启动类中，使用 `@EnableFeignClients` 注解启用 Feign 客户端。
- 在 Spring Boot 项目中使用`@EnableFeignClients` 注解时，Spring 自动扫描指定包路径（如果未指定路径，则扫描当前包及其子包）下所有带有`@FeignClient` 注解的接口，将这些接口代理为 Spring 容器中的 Bean，这样就可以在其他地方通过依赖注入来使用它们。
```java
@SpringBootApplication
@EnableFeignClients(basePackages = "com.example.demo.clients")
public class FeignApplication {
   public static void main(String[] args) {
	   SpringApplication.run(FeignApplication.class, args);
   }
}
```
- **请求参数和头信息**：Feign 支持通过注解传递请求参数和头信息。例如，你可以通过 `@RequestParam` 传递查询参数，通过 `@RequestHeader` 设置请求头。
```java
@FeignClient(name = "user-service")
public interface UserClient {
   @GetMapping("/api/user")
   User getUser(@RequestParam("name") String name, @RequestHeader("Authorization") String token);
}
```
- **请求构建**：
	- 当我们调用 Feign 接口的方法时，例如`userService.getUserById(1L)` ，Feign 的代理对象会捕获这个方法调用。
	- Feign 根据接口方法上的注解（如 `@GetMapping`、`@PostMapping` 等）来构建一个 HTTP 请求。它会替换路径中的参数，设置请求方法（GET、POST 等）、请求头和请求体等。
- **HTTP 请求执行**：
    - Feign 使用 HTTP 客户端（如 Apache HttpClient 或 OkHttp）执行构建好的 HTTP 请求。
    - Feign 默认使用 `JDK HttpURLConnection`，但可以通过配置切换到其他 HTTP 客户端。
    - Feign 将请求发送到指定的服务地址（如 `http://localhost:8080`），并等待服务的响应。
- **响应处理**：
    - 收到远程服务的响应后，Feign 会根据接口方法的返回类型解析响应数据。比如，如果返回类型是 `User`，Feign 会自动将响应体解析为 `User` 对象（假设返回的是 JSON 数据）。
    - Feign 使用 Jackson 或其他 JSON 解析库将响应体转化为 Java 对象，并返回给调用方。
- **错误处理与重试机制**：
    - 如果请求失败，Feign 可以通过配置重试策略或错误处理器（`ErrorDecoder`）来处理错误。例如，可以设置在请求失败时重试多次，或者捕获特定的 HTTP 错误代码并执行相应的逻辑。
- **容错机制**：Feign 可以与 Hystrix 集成，提供服务降级功能，当远程服务不可用时，自动调用备用逻辑。
```java
@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {
   @GetMapping("/api/user/{id}")
   User getUserById(@PathVariable("id") Long id);
}

@Component
public class UserClientFallback implements UserClient {
   @Override
   public User getUserById(Long id) {
	   return new User(); // 返回一个默认用户对象
   }
}
```
### **如果没有Feign**

- 经典手写调用-老方法：RestTemplate
- 需要手动拼接 URL。
- 需要自己处理返回值类型转换（泛型还要用 `ParameterizedTypeReference`，代码更啰嗦）。
- 虽然也能配合 Ribbon/LoadBalancer 做服务发现，但写法更麻烦。
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

- **使用Feign**
- 调用远程方法就像调用本地方法一样。
- Feign 自动处理请求路径、参数拼装、返回值反序列化。
- 可直接集成负载均衡（Ribbon 或 Spring Cloud LoadBalancer）+ 熔断降级（Sentinel / Resilience4j）。
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



## MyBatis—ORM框架

### 介绍

**介绍**：MyBatis是一个半自动化ORM（Object-Relational Mapping，对象关系映射）框架，用于简化Java应用程序与关系型数据库的交互。
MyBatis适用于需要直接控制SQL、复杂查询和性能优化的场景。


JDBC 原始写法的问题主要有以下几点：
1. **代码冗长重复**：每次查询都要写连接、关闭、ResultSet 遍历等模板代码。
2. **SQL 与 Java 代码耦合**：SQL 写在 Java 代码中，可读性差。
3. **参数设置麻烦**：PreparedStatement 设置参数容易出错，易写错顺序或类型。
4. **结果集映射繁琐**：手动从 ResultSet 提取每个字段到 Java 对象，费时费力。
5. **无法集中管理 SQL**：难以维护大型项目中的 SQL 语句。


特点/优点：
* 更加灵活和易于管理
* 把 SQL 从 Java 中抽离到 XML 或注解中，便于维护。
* 自动封装参数和结果，减少 JDBC 样板代码。
* 支持缓存、插件扩展，灵活且易用。
- **灵活的SQL控制**：MyBatis允许开发者手写SQL，确保数据库操作的细粒度控制，特别适合复杂查询或优化要求较高的场景。
- **自动映射结果集**：MyBatis通过配置，可以将SQL查询结果自动映射到Java对象，支持将数据库字段映射到Java属性中，减少数据转换代码。
- **动态SQL**：MyBatis的XML映射文件支持动态SQL，开发者可以使用`<if>`、`<choose>`、`<foreach>`等标签根据不同条件构建SQL语句，适应复杂的查询需求。
- **多种数据库支持**
- **事务管理**：MyBatis支持手动事务管理和与Spring集成的事务管理。



和ORM框架Hibernate的对比：
* MyBatis 灵活、性能可控、适合复杂 SQL 场景。MyBatis 是 半自动 ORM，你写 SQL，框架帮你绑定参数和封装结果。
* Hibernate 开发快，适合业务逻辑清晰、关系映射稳定的场景。Hibernate 是 全自动 ORM，不需要写 SQL，自动生成 SQL 和管理对象状态。Hibernate 学习曲线更陡，调优难度大。



### 使用

流程一览：
- 设置好MyBatis配置文件：mybatis-config.xml加载运行环境和映射文件
- 构造会话工厂SqlSessionFactory
- 会话工厂创建SqlSession对象（包含了执行SQL语句的所有方法）
- 操作数据库的接口，Executor执行器，同时负责查询缓存的维护
- Executor接口的执行方法中有一个MappedStatement类型的参数，封装了映射信息
- 输入参数映射
- 输出结果映射
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223112151.png)


详细步骤：
1. 引入依赖 (pom.xml)
```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.15</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

2. 加载 `mybatis-config.xml` 核心配置文件。
```xml
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="UserMapper.xml"/>
    </mappers>
</configuration>
```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223112117.png)


3. **Mapper接口**：MyBatis支持将SQL映射到接口方法上，即Mapper接口。Mapper接口是数据库操作的抽象，通过定义接口方法，MyBatis可以自动找到对应的SQL语句并执行。每个Mapper接口的方法与一条SQL语句绑定，便于管理和复用。

实体类
```java
public class User {
    private Integer id;
    private String name;
    
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```
Mapper 接口
```java
public interface UserMapper {
    User selectUser(int id);
}
```


4. SQL 映射文件 (UserMapper.xml)
- **XML映射文件**：MyBatis使用XML文件管理SQL语句，通过`<mapper>`标签定义数据库操作。XML映射文件通常与Mapper接口一一对应，包含`<select>`、`<insert>`、`<update>`、`<delete>`等标签定义具体的SQL操作。XML映射文件支持动态SQL，使得MyBatis能够在复杂条件下生成不同的SQL语句。
```xml
<mapper namespace="UserMapper">
    <select id="selectUser" resultType="User">
        SELECT * FROM users WHERE id = #{id}
    </select>
</mapper>
```


5. 核心执行逻辑
- 通过配置文件`mybatis-config.xml`指定数据库连接信息、映射文件位置和MyBatis的全局配置，创建`SqlSessionFactory`对象以管理会话。


- 通过读取配置文件`mybatis-config.xml`中的数据源、插件、类型处理器等配置，构建 `SqlSessionFactory`。
- 通过`SqlSessionFactory`创建 `SqlSession`。**SqlSessionFactory**：MyBatis的核心接口，用于创建`SqlSession`对象。
- 通过`SqlSession`对象获取Mapper接口的代理实例。**SqlSession**：MyBatis与数据库交互的接口，通过`SqlSession`执行映射文件中的SQL语句。每次执行数据库操作都需要一个`SqlSession`实例，实例由SqlSessionFactory创建，通常在操作完成后关闭该实例。
- 通过 Mapper 调用 SQL
- MyBatis在执行SQL语句后，将结果集自动映射到Mapper接口方法的返回类型中，并返回结果
- 
```java
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import java.io.InputStream;
public class Main {
    public static void main(String[] args) throws Exception {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            User user = mapper.selectUser(1);
            System.out.println(user.getName());
        }
    }
}
```

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223112125.png)




### 其它问题

SQL 映射文件 (UserMapper.xml)的 #{} 与 ${} 的底层区别
* `#{}`：底层实现为 JDBC 的 `PreparedStatement`。MyBatis 会将其替换为 `?` 占位符，调用 `setXxx` 方法为占位符设值。此机制可有效防止 SQL 注入，是参数传递的首选。
* `${}`：底层实现为 Statement 的字符串拼接。MyBatis 会直接将参数的文本内容替换到 SQL 语句中。该方式存在 SQL 注入风险，仅适用于无法使用占位符的场景（如动态表名、动态列名、ORDER BY 子句的字段名）。




Mybatis的动态sql
MyBatis 提供了基于 OGNL (Object-Graph Navigation Language) 表达式的动态 SQL ， 用于根据不同条件 **动态拼接 SQL 语句**，避免大量 if-else 拼接字符串的操作，用于在 XML 中构建复杂的条件逻辑，极大增强SQL 的可维护性和灵活性。

，MyBatis 提供的动态 SQL 标签包括：
* `<if>`：条件判断，常用于 WHERE 子句中的可选参数拼接。
* `<choose>, <when>, <otherwise>`：类似于 Java 中的 switch-case 语句。
* `<where>`：智能处理 WHERE 关键字。如果内部有条件成立，则插入 WHERE 关键字，并自动去除条件前多余的 AND 或 OR。
* `<set>`：用于 UPDATE 语句，智能插入 SET 关键字，并去除结尾多余的逗号。
* `<foreach>`：用于遍历集合，常用于构建 IN 条件子句或批量插入语句。




**结果映射**：
MyBatis 在 SQL 执行后，会将数据库返回的结果封装为 Java 对象。封装过程由 `ResultSetHandler` 负责，有以下几种结果映射形式：
- 自动映射：字段名和 Java 属性名一致时，自动封装。
- 手动映射：通过 `<resultMap>` 明确指定字段与属性的对应关系。
- 嵌套映射：一对多、多对一关系可通过嵌套 `resultMap` 或子查询实现。
- 注解映射：使用 `@Results`、`@Result` 注解映射字段。

ResultMap 高级映射
当数据库表的列名与 Java 对象的属性名不一致，或者需要进行复杂的关联查询（一对一、一对多）时，必须使用 `<resultMap>` 进行显式配置。
* `id` 标签定义主键映射，提高 MyBatis 内部实例化对象的性能。
* `result` 标签定义普通字段映射。
* `association` 用于配置一对一或多对一的复杂类型属性映射。
* `collection` 用于配置一对多的集合类型属性映射。


**插件 (Interceptor) 机制**
MyBatis 允许开发者在已映射语句执行过程中的某一点进行拦截调用。，通过拦截器（Interceptor）拦截核心执行过程
底层通过 JDK 动态代理实现
从而实现SQL 性能监控（记录执行时间）、自动分页（PageHelper）数据脱敏、审计日志等功能，常用于实现物理分页、性能监控、统一的审计日志等功能。
可以拦截的对象包括 `Executor`、`StatementHandler`、`ParameterHandler` 和 `ResultSetHandler`。
* `Executor`：执行 SQL
* `ParameterHandler`：参数处理
* `ResultSetHandler`：结果映射
* `StatementHandler`：SQL 预处理


MyBatis 接口绑定：底层实现基于 JDK 动态代理 + SQL 映射配置：MyBatis 会基于接口和配置创建一个代理对象，在调用接口方法时动态执行对应的 SQL。有两种方式：
- XML 映射方式（常用）：接口和 XML 一一对应，SQL 写在 XML 文件中。
- 注解方式：在接口上直接写 SQL 注解，如 `@Select`, `@Insert` 等。




Mybatis中Dao接⼝和XML⽂件的SQL如何建⽴关联：MyBatis 会自动为 DAO 创建代理对象，底层通过动态代理调用对应 SQL。MyBatis 使用 **接口与 XML 映射文件的绑定**机制。绑定方式：
* DAO 接口的方法名与 XML 中的 `<select>`、`<insert>` 的 `id` 相同。
* 接口全类名与 XML 文件路径相匹配，可以通过配置 mapper.xml 路径到配置文件或者或通过注解 `@MapperScan` 自动扫描接口，Mapper注册方式





**Mybatis的懒加载（延迟加载）**
延迟加载：在需要用到数据时才进行加载，不需要用到数据时就不加载数据。
常用于一对多、多对一等关联查询，在需要时才进行这些耗时查询，可以提升性能

但注意使用不当容易引发 N+1 查询问题。N+1问题：先查主表1次，再从N个结果中每个单独查从表，导致总 SQL 数量 = 1 + N。

延迟加载默认是关闭的
MyBatis 中开启懒加载的方式：
- 在配置中 `<settings>` 设置 `lazyLoadingEnabled=true`。
- 在 `<association>` 或 `<collection>` 中使用 `fetchType="lazy"`。

延迟加载的原理：
1. 使用CGLIB创建目标对象的代理对象
2. 当调用目标方法user.getOrderList()时，进入拦截器invoke方法，发现user.getOrderList()是null值，执行sql查询order列表
3. 把order查询上来，然后调用set方法`user.setOrderList(List<Order> orderList) `设置属性值，接着继续查询目标方法，完成user.getOrderList()方法的调用

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223112233.png)






**一级、二级缓存**

缓存机制
缓存机制就是把查到的数据保存起来，如果再执行相同的查询，就不再去查了，直接去读缓存。
MyBatis 内置了两级缓存以降低数据库访问压力。

* 一级缓存（本地缓存）：
* 作用域为 `SqlSession`。在同一个 SqlSession 中执行相同的 SQL 查询，第一次会查询数据库并写入缓存，后续直接从缓存读取。生命周期是一次数据库会话。一旦执行了增删改（DML）操作或调用了 `clearCache()`，该 SqlSession 的一级缓存会被清空。一级缓存默认开启。不可跨 Session。相同 SQL 执行第二次时会从缓存读取。一级缓存不能配置。
基于 PerpetualCache 的 HashMap 本地缓存
当Session进行flush或close之后，该Session中的所有Cache就将清空

* 二级缓存（全局缓存）：作用域为 Mapper 的 `namespace`。跨 SqlSession 共享。需要在映射文件中通过 `<cache/>` 标签手动显式开启，并且实体类必须实现 `Serializable` 接口。存储在内存或持久化介质中。当 SqlSession 提交或关闭时，一级缓存中的数据才会被刷入二级缓存。
也是采用 PerpetualCache，HashMap 存储

Mybatis的二级缓存什么时候会清理缓存中的数据：当某一个作用域(一级缓存 Session/二级缓存Namespaces)的进行了新增、修改、删除操作后，默认该作用域下所有 select 中的缓存将被 clear。

```java
<settings>
    <setting name="cacheEnabled" value="true
</settings>
```
使用`<cache/>`标签让当前mapper生效二级缓存




## MyBatis Plus—ORM框架
### 介绍
和Mybatis对比，**MyBatis-Plus** 与原生 **MyBatis** 的主要区别：
- 传统MyBatis需要 `UserMapper.xml` + `<insert|select|update|delete>` + `resultMap`，并且简单 CRUD 也要写 SQL
- 而MyBatis Plus只要继承 `BaseMapper<T>`，立刻获得`insert、selectById、updateById、deleteById、selectList(...)` 等 20+ 个通用方法
- **简化开发**：
    - **MyBatis-Plus** 提供了大量的封装，减少了手动编写 SQL 的工作，例如常用的增删改查操作可以通过方法自动生成。
    - **MyBatis** 需要手动编写 SQL 语句和映射文件，开发工作量较大。
- **自动化功能**：
    - **MyBatis-Plus** 提供了自动分页、自动填充、乐观锁等功能，减少了很多重复的代码。
    - **MyBatis** 没有这些自动化功能，需要开发者自己实现。
- **增强的 CRUD 操作**：
    - **MyBatis-Plus** 提供了 `BaseMapper` 接口，集成了通用的 CRUD 操作方法。
    - **MyBatis** 需要自己编写 SQL 语句，进行 CRUD 操作。
- **代码生成器**：
    - **MyBatis-Plus** 提供了代码生成器，可以根据数据库表自动生成实体类、Mapper 接口、XML 映射文件等。
    - **MyBatis** 需要手动编写这些类。

### 使用


只需要试验接口集成BaseMapper，然后就可以用：
```java
package com.atguigu.mp.mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}

package com.atguigu.mp;

@SpringBootTest
public class CRUDTests {
    @Resource
    private UserMapper userMapper;

    @Test
    public void testSelectList() {
        List<User> userList = userMapper.selectList(null);
        userList.forEach(System.out::println);
    }
}

```


**UserMapper** 是接口
`UserMapper` 继承了 **`BaseMapper<User>`**，并且 **MyBatis-Plus** 会在运行时动态生成该接口的实现类，实现类是通过 **MyBatis** 的 **动态代理** 创建的，因此你无需手动编写实现类。
`BaseMapper` 是 MyBatis-Plus 提供的一个通用 Mapper，里面包含了常见的 CRUD 方法（如 `selectList`、`insert`、`update` 等）。




MyBatis自己写动态 SQL（`<where> <if> <foreach>`），维护成本高
mby：`QueryWrapper` / `LambdaQueryWrapper` / 链式 `query()/update()`，无 XML 的动态条件拼接，Lambda 写法自动感知字段（避免写错列名/属性名）
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




MBP**仍兼容XML**，在复杂 SQL、联表、多子查询时，仍可写 XML，同时复用 Wrapper 的动态条件，MP 的 Wrapper 可作为参数传入 XML，继续享受条件构造带来的灵活性
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



### LambdaQueryWrapper

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


## Kafka—消息队列
### 如何保证消息不丢失

使用Kafka在消息的收发过程都会出现消息丢失  , Kafka分别给出了解决方案
- 生产者发送消息到Brocker丢失
- 消息在Brocker中存储丢失
- 消费者从Brocker接收消息丢失
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203035.png)
**生产者发送消息到Brocker丢失**
- 设置异步发送
```Java
//同步发送
RecordMetadata recordMetadata = kafkaProducer.send(record).get();
//异步发送
kafkaProducer.send(record, new Callback() {
    @Override
    public void onCompletion(RecordMetadata recordMetadata, Exception e) {
        if (e != null) {
            System.out.println("消息发送失败 | 记录日志");
        }
        long offset = recordMetadata.offset();
        int partition = recordMetadata.partition();
        String topic = recordMetadata.topic();
    }
});


```

消息重试

```Java
//设置重试次数
prop.put(ProducerConfig.RETRIES_CONFIG,10);

```


消息在Brocker中存储丢失
发送确认机制acks
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203147.png)

确认机制	说明
acks=0，生产者在成功写入消息之前不会等待任何来自服务器的响应,消息有丢失的风险，但是速度最快
acks=1（默认值），只要集群首领节点收到消息，生产者就会收到一个来自服务器的成功响应
acks=all，只有当所有参与赋值的节点全部收到消息时，生产者才会收到一个来自服务器的成功响应

消费者从Brocker接收消息丢失

- Kafka 中的分区机制指的是将每个主题划分成多个分区（Partition）
- topic分区中消息只能由消费者组中的唯一一个消费者处理，不同的分区分配给不同的消费者（同一个消费者组）

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203245.png)

消费者默认是自动按期提交已经消费的偏移量，默认是每隔5s提交一次
如果出现重平衡的情况，可能会重复消费或丢失数据

禁用自动提交偏移量，改为手动
- 同步提交
- 异步提交
- 同步+异步组合提交
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203310.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203313.png)


Kafka是如何保证消息不丢失
需要从三个层面去解决这个问题：
- 生产者发送消息到Brocker丢失
	- 设置异步发送，发送失败使用回调进行记录或重发
	- 失败重试，参数配置，可以设置重试次数
- 消息在Brocker中存储丢失
    - 发送确认acks，选择all，让所有的副本都参与保存数据后确认
- 消费者从Brocker接收消息丢失
	- 关闭自动提交偏移量，开启手动提交偏移量
	- 提交方式，最好是同步+异步提交

Kafka中消息的重复消费问题如何解决的
- 关闭自动提交偏移量，开启手动提交偏移量
- 提交方式，最好是同步+异步提交
- 幂等方案

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203357.png)


### 如何保证消费顺序性
应用场景：
- 即时消息中的单对单聊天和群聊，保证发送方消息发送顺序与接收方的顺序一致
- 充值转账两个渠道在同一个时间进行余额变更，短信通知必须要有顺序

消费者从Brocker接收消息丢失
topic分区中消息只能由消费者组中的唯一一个消费者处理，所以消息肯定是按照先后顺序进行处理的。但是它也仅仅是保证Topic的一个分区顺序处理，不能保证跨分区的消息先后处理顺序。 所以，如果你想要顺序的处理Topic的所有消息，那就只提供一个分区。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203424.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203434.png)
Kafka是如何保证消费的顺序性

问题原因：
一个topic的数据可能存储在不同的分区中，每个分区都有一个按照顺序的存储的偏移量，如果消费者关联了多个分区不能保证顺序性
解决方案：
- 发送消息时指定分区号
- 发送消息时按照相同的业务设置相同的key
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203459.png)

### 高可用机制
集群模式
分区备份机制
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203523.png)

- Kafka 的服务器端由被称为 Broker 的服务进程构成，即一个 Kafka 集群由多个 Broker 组成
- 这样如果集群中某一台机器宕机，其他机器上的 Broker 也依然能够对外提供服务。这其实就是 Kafka 提供高可用的手段之一

分区备份机制
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203551.png)
- 一个topic有多个分区，每个分区有多个副本，其中有一个leader，其余的是follower，副本存储在不同的broker中
- 所有的分区副本的内容是都是相同的，如果leader发生故障时，会自动将其中一个follower提升为leader

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203622.png)

ISR（in-sync replica）需要同步复制保存的follower
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203610.png)
如果leader失效后，需要选出新的leader，选举的原则如下：
第一：选举时优先从ISR中选定，因为这个列表中follower的数据是与leader同步的
第二：如果ISR列表中的follower都不行了，就只能从其他follower中选取


Kafka的高可用机制有了解过嘛
可以从两个层面回答，第一个是集群，第二个是复制机制
- 集群：一个kafka集群由多个broker实例组成，即使某一台宕机，也不耽误其他broker继续对外提供服务
- 复制机制：
	- 一个topic有多个分区，每个分区有多个副本，有一个leader，其余的是follower，副本存储在不同的broker中
	- 所有的分区副本的内容是都是相同的，如果leader发生故障时，会自动将其中一个follower提升为leader，保证了系统的容错性、高可用性

解释一下复制机制中的ISR
ISR（in-sync replica）需要同步复制保存的follower
分区副本分为了两类，一个是ISR，与leader副本同步保存数据，另外一个普通的副本，是异步同步数据，当leader挂掉之后，会优先从ISR副本列表中选取一个作为leader
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203717.png)


### 数据清理机制
Kafka文件存储机制
数据清理机制
存储结构：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203819.png)


.index  索引文件
.log 数据文件
.timeindex 时间索引文件

为什么要分段？
- 删除无用文件方便，提高磁盘利用率
- 查找数据便捷


日志的清理策略有两个
1. 根据消息的保留时间，当消息在kafka中保存的时间超过了指定的时间，就会触发清理过程
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203917.png)
2. 根据topic存储的数据大小，当topic所占的日志文件大小大于一定的阈值，则开始删除最久的消息。需手动开启
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203921.png)

Kafka数据清理机制了解过嘛
Kafka存储结构
- Kafka中topic的数据存储在分区上，分区如果文件过大会分段存储segment
- 每个分段都在磁盘上以索引(xxxx.index)和日志文件(xxxx.log)的形式存储 
- 分段的好处是，第一能够减少单个文件内容的大小，查找数据方便，第二方便kafka进行日志清理。
日志的清理策略有两个：
- 根据消息的保留时间，当消息保存的时间超过了指定的时间，就会触发清理，默认是168小时（ 7天）
- 根据topic存储的数据大小，当topic所占的日志文件大小大于一定的阈值，则开始删除最久的消息。（默认关闭）
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223203939.png)


### 高性能的设计
- 消息分区：不受单台服务器的限制，可以不受限的处理更多的数据
- 顺序读写：磁盘顺序读写，提升读写效率
- 页缓存：把磁盘中的数据缓存到内存中，把对磁盘的访问变为对内存的访问
- 零拷贝：减少上下文切换及数据拷贝
- 消息压缩：减少磁盘IO和网络IO
- 分批发送：将消息打包批量发送，减少网络开销

零拷贝
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223204007.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223204013.png)








## Rabbitmq—消息队列

### 介绍



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
为什么选择 RabbitMQ？
- **可靠性**：RabbitMQ 提供消息持久化、确认机制和消息重试，确保消息不丢失。
- **高可用性**：支持集群模式和镜像队列，提高系统的可用性和容错能力。
- **丰富的消息模式**：支持工作队列、发布/订阅、路由等消息模式，灵活应对不同场景。
- **易于集成**：与 Spring 等框架集成简便，支持多种编程语言。

**死信队列与延迟队列的区别是什么？**
- **死信队列（DLX）**：用于存放无法正常消费的消息（如过期、拒绝、队列已满等情况）。
- **延迟队列**：通过 TTL 设置消息延迟投递，在指定时间后再投递消息到正常队列。RabbitMQ 本身没有直接支持延迟队列，但可以通过插件或死信队列实现。

如何避免消息丢失或重复消费？
- **消息持久化**：将消息和队列设置为持久化，确保服务器崩溃时消息不会丢失。
- **消息确认**：消费者应使用 **`ack`** 确认机制，确保消息已成功处理，未确认的消息会重新投递。
- **幂等性设计**：确保消费端逻辑在接收到重复消息时不会产生不一致的结果。




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

### 使用

使用信息：
- rabbitmq management： http://localhost:15672
- java链接地址：127.0.0.1:5672
- 用户名：guest
- 密码：guest

**安装插件**：
```bash
docker cp ./rabbitmq_delayed_message_exchange-3.9.0.ez rabbitmq:/plugins
```

### 如何保证消息不丢失
RabbitMQ 是如何保证消息的可靠投递的？请从生产者确认（Publisher Confirms）、消息持久化、以及消费者手动 ACK 三个方面进行技术说明。
- **生产者确认（Publisher Confirms / Returns）：** 开启 Confirm 模式，当消息成功到达 Exchange 时，MQ 回调 ConfirmCallback 确认；若路由不到 Queue，触发 ReturnCallback 回调。可以在回调中处理发送失败的消息并存入数据库进行重试补偿。
- **消息持久化：** 必须保证 Exchange、Queue 和 Message 三者同时设置为持久化（`delivery_mode=2`），确保 RabbitMQ 宕机重启后消息不丢失。
- **消费者手动 ACK：** 关闭自动 ACK（`acknowledge-mode: manual`）。消费者在业务逻辑成功执行完毕（且本地事务提交）后，才显式调用 `channel.basicAck()`。若业务异常，调用 `basicNack()` 将消息重新入队或丢入死信队列。



- 开启生产者确认机制，确保生产者的消息能到达队列
- 开启持久化功能，确保消息未消费前在队列中不会丢失
- 开启消费者确认机制为auto，由spring确认消息处理成功后完成ack
- 开启消费者失败重试机制，多次重试失败后将消息投递到异常交换机，交由人工处理



异步发送（验证码、短信、邮件…）
MYSQL和Redis , ES之间的数据同步
分布式事务
削峰填谷
…
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223201918.png)
生产者确认机制
RabbitMQ提供了publisher confirm机制来避免消息发送到MQ过程中丢失。消息发送到MQ以后，会返回一个结果给发送者，表示消息是否处理成功
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223201947.png)

消息失败之后如何处理呢？
- 回调方法即时重发
- 记录日志
- 保存到数据库然后定时重发，成功发送后即刻删除表中的数据

消息持久化
MQ默认是内存存储消息，开启持久化功能可以确保缓存在MQ中的消息不丢失。
交换机持久化：
```java
@Bean
public DirectExchange simpleExchange(){
    // 三个参数：交换机名称、是否持久化、当没有queue与其绑定时是否自动删除 
    return new DirectExchange("simple.direct", true, false);
}


```


队列持久化：
```java
@Bean
public Queue simpleQueue(){
    // 使用QueueBuilder构建队列，durable就是持久化的
    return QueueBuilder.durable("simple.queue").build();
}


```


消息持久化，SpringAMQP中的的消息默认是持久的，可以通过MessageProperties中的DeliveryMode来指定的：
```java
Message msg = MessageBuilder
        .withBody(message.getBytes(StandardCharsets.UTF_8)) // 消息体
        .setDeliveryMode(MessageDeliveryMode.PERSISTENT) // 持久化 
        .build();
```

消费者确认：
RabbitMQ支持消费者确认机制，即：消费者处理消息后可以向MQ发送ack回执，MQ收到ack回执后才会删除该消息。而SpringAMQP则允许配置三种确认模式：
- manual：手动ack，需要在业务代码结束后，调用api发送ack。
- auto：自动ack，由spring监测listener代码是否出现异常，没有异常则返回ack；抛出异常则返回nack
- none：关闭ack，MQ假定消费者获取消息后会成功处理，因此消息投递后立即被删除
我们可以利用Spring的retry机制，在消费者出现异常时利用本地重试，设置重试次数，当次数达到了以后，如果消息依然失败，将消息投递到异常交换机，交由人工处理
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202110.png)



### 重复消费问题
网络抖动
消费者挂了

解决方案：
- 每条消息设置一个唯一的标识id
- 幂等方案：【 分布式锁、数据库锁（悲观锁、乐观锁） 】
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202528.png)


适用于任何MQ：
- Kafka
- RabbitMQ
- RocketMQ
- …

### 死信交换机
RabbitMQ中死信交换机 ? (RabbitMQ延迟队列有了解过嘛)

延迟队列=死信交换机+TTL（生存时间）


延迟队列：进入队列的消息会被延迟消费的队列
场景：超时订单、限时优惠、定时发布
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202507.png)

当一个队列中的消息满足下列情况之一时，可以成为死信（dead letter）：
- 消费者使用basic.reject或 basic.nack声明消费失败，并且消息的requeue参数设置为false
- 消息是一个过期消息，超时无人消费
- 要投递的队列消息堆积满了，最早的消息可能成为死信
如果该队列配置了dead-letter-exchange属性，指定了一个交换机，那么队列中的死信就会投递到这个交换机中，而这个交换机称为死信交换机（Dead Letter Exchange，简称DLX）。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202555.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202553.png)

TTL，也就是Time-To-Live。如果一个队列中的消息TTL结束仍未消费，则会变为死信，ttl超时分为两种情况：
- 消息所在的队列设置了存活时间
- 消息本身设置了存活时间
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202608.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202614.png)
延迟队列插件
- DelayExchange插件，需要安装在RabbitMQ中
- RabbitMQ有一个官方的插件社区，地址为：https://www.rabbitmq.com/community-plugins.html 
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202623.png)
DelayExchange的本质还是官方的三种交换机，只是添加了延迟功能。因此使用时只需要声明一个交换机，交换机的类型可以是任意类型，然后设定delayed属性为true即可。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202629.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202631.png)

RabbitMQ中死信交换机 ? (RabbitMQ延迟队列有了解过嘛)

- 我们当时一个什么业务使用到了延迟队列（超时订单、限时优惠、定时发布…）
- 其中延迟队列就用到了死信交换机和TTL（消息存活时间）实现的
- 消息超时未消费就会变成死信（死信的其他情况：拒绝被消费，队列满了）

延迟队列插件实现延迟队列DelayExchange
- 声明一个交换机，添加delayed属性为true
- 发送消息时，添加x-delay头，值为超时时间
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202653.png)

### 消息堆积
RabbitMQ如果有100万消息堆积在MQ , 如何解决(消息堆积怎么解决)

当生产者发送消息的速度超过了消费者处理消息的速度，就会导致队列中的消息堆积，直到队列存储消息达到上限。之后发送的消息就会成为死信，可能会被丢弃，这就是消息堆积问题

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202725.png)

解决消息堆积有三种种思路：
- 增加更多消费者，提高消费速度
- 在消费者内开启线程池加快消息处理速度
- 扩大队列容积，提高堆积上限

惰性队列
惰性队列的特征如下：
- 接收到消息后直接存入磁盘而非内存
- 消费者要消费消息时才会从磁盘中读取并加载到内存
- 支持数百万条的消息存储
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202743.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202745.png)


RabbitMQ如果有100万消息堆积在MQ , 如何解决(消息堆积怎么解决)
解决消息堆积有三种种思路：
- 增加更多消费者，提高消费速度
- 在消费者内开启线程池加快消息处理速度
- 扩大队列容积，提高堆积上限，采用惰性队列
	- 在声明队列的时候可以设置属性x-queue-mode为lazy，即为惰性队列
	- 基于磁盘存储，消息上限高
	- 性能比较稳定，但基于磁盘存储，受限于磁盘IO，时效性会降低

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202814.png)

### 高可用机制
- 在生产环境下，使用集群来保证高可用性
- 普通集群、镜像集群、仲裁队列

普通集群
普通集群，或者叫标准集群（classic cluster），具备下列特征：
- 会在集群的各个节点间共享部分数据，包括：交换机、队列元信息。不包含队列中的消息。
- 当访问集群某节点时，如果队列不在该节点，会从数据所在节点传递到当前节点并返回
- 队列所在节点宕机，队列中的消息就会丢失

镜像集群
镜像集群：本质是主从模式，具备下面的特征：
- 交换机、队列、队列中的消息会在各个mq的镜像节点之间同步备份。
- 创建队列的节点被称为该队列的主节点，备份到的其它节点叫做该队列的镜像节点。
- 一个队列的主节点可能是另一个队列的镜像节点
- 所有操作都是主节点完成，然后同步给镜像节点
- 主宕机后，镜像节点会替代成新的主
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202855.png)
仲裁队列
仲裁队列：仲裁队列是3.8版本以后才有的新功能，用来替代镜像队列，具备下列特征：
- 与镜像队列一样，都是主从模式，支持主从数据同步
- 使用非常简单，没有复杂的配置
- 主从同步基于Raft协议，强一致
```Java
@Bean
public Queue quorumQueue() {
    return QueueBuilder
            .durable("quorum.queue") // 持久化 
            .quorum() // 仲裁队列
            .build();
}
```
RabbitMQ的高可用机制有了解过嘛

- 在生产环境下，我们当时采用的镜像模式搭建的集群，共有3个节点
- 镜像队列结构是一主多从（从就是镜像），所有操作都是主节点完成，然后同步给镜像节点
- 主宕机后，镜像节点会替代成新的主（如果在主从同步完成前，主就已经宕机，可能出现数据丢失）
那出现丢数据怎么解决呢？
我们可以采用仲裁队列，与镜像队列一样，都是主从模式，支持主从数据同步，主从同步基于Raft协议，强一致。
并且使用起来也非常简单，不需要额外的配置，在声明队列的时候只要指定这个是仲裁队列即可
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223202957.png)

### 消息幂等性

- **消息幂等性如何实现？**
- **唯一标识**：为每条消息生成唯一标识（如订单ID），消费端根据此标识判断消息是否已处理。
- **数据库锁**：使用数据库的唯一约束（例如订单号唯一）来避免重复处理。
- **幂等操作**：确保消费操作是幂等的，例如在更新状态时检查当前状态是否符合要求。



## Zookeeper—服务发现/注册
https://zookeeper.apache.org
### 介绍
Zookeeper是一个分布式协调应用，可用作注册中心和配置中心，
- **Zookeeper** 适合高可靠、高一致性的场景。

结构：
比如你有一个服务名叫 `order-service`，它的注册结构如下：
```text
/registry
  └── /order-service
        ├── 192.168.1.101:8080   ← provider1（临时节点）
        ├── 192.168.1.102:8080   ← provider2
        └── ...
```


**为什么选择 Zookeeper 作为注册中心，而不是 Etcd 或 Nacos？**
- **高可靠性和一致性**：Zookeeper 基于 ZAB 协议（Zookeeper Atomic Broadcast），提供强一致性，适合高可靠性要求的场景。
- **成熟度**：Zookeeper 已经在许多大规模分布式系统中得到了广泛应用，成熟稳定。
- **分布式协调能力**：Zookeeper 提供了丰富的分布式协调功能，除了服务注册与发现，还能用于分布式锁、选举等功能。
- **Etcd/Nacos** 主要在 Kubernetes 和微服务场景中广泛使用，相对 Zookeeper 可能在高并发和大规模场景下性能不如 Zookeeper。

**服务注册和发现的流程是怎样的？客户端如何从注册中心获取可用服务？**
- **服务注册**：
	- 服务启动时，将服务信息（如地址、端口、权重等）注册到 Zookeeper 的某个特定节点（如 `/services/service-name`）。
	- 服务健康检查：服务在注册后定期更新其在 Zookeeper 中的状态，保证注册信息的有效性。
- **服务发现**：
	- 客户端通过查询 Zookeeper 中的服务节点（如 `/services/service-name`）来获取可用服务列表。
	- 客户端可设置 **Watcher** 来监听服务节点的变化，一旦有新服务注册或旧服务下线，客户端会被通知。


**如何避免频繁访问 Zookeeper 带来的性能压力？**
- **客户端缓存**：客户端可以缓存服务节点信息，定期更新而非每次都查询 Zookeeper。
- **Watchers 使用**：使用 Watchers 监听节点变化，避免频繁的查询。
- **合理的 TTL**：为服务节点设置适当的 TTL（过期时间），减少 Zookeeper 的查询负担。
- **批量查询**：通过一次性查询多个服务节点的信息，减少请求次数。


本地缓存：
客户端通过建立**本地缓存**避免频繁访问 ZK，并使用 **Watcher 监听节点变化（增、删、改）**，实时同步服务列表，当有新增/下线时及时触发事件更新本地数据，在**高并发、海量节点**场景下实现稳定可靠的服务发现机制。


有哪些容灾设计？
- **高可用部署**：Zookeeper 通常部署为一个 **集群**，以保证服务可用性。如果一个节点宕机，集群中的其他节点会接管请求，保证高可用性。
- **客户端重试机制**：客户端应实现重试机制，当无法连接到 Zookeeper 时，客户端可以尝试连接集群中的其他节点。
- **备份机制**：可以通过 **多注册中心** 配置，将服务注册信息同步到多个注册中心（如 Nacos、Consul 等）以保证服务发现的容灾能力。






### **使用**
下载地址： https://zookeeper.apache.org/releases.html
- 下载：apache-zookeeper-3.8.3-bin.tar.gz
- 解压：apache-zookeeper-3.8.3-bin.tar.gz
- 进入：apache-zookeeper-3.8.3-bin\conf
- 复制文件：zoo_sample.cfg → zoo.cfg

- 编辑zoo.cfg：
	- tickTime=2000
	- dataDir=D:/zookeeper/data
	- clientPort=2181

- 创建：<code>D:\zookeeper\data</code>
- 进入：<code>apache-zookeeper-3.8.3-bin\bin</code>
- 打开命令行，运行：zkServer.cmd，看输出中是否有：Starting zookeeper ... STARTED，有，就代表运行成功（输出乱七八糟的有很多）

- 再在<code>apache-zookeeper-3.8.3-bin\bin</code>，打开命令行，运行：zkCli.cmd工具，进入 ZooKeeper 命令行客户端，默认连接 `127.0.0.1:2181`，可输入以下命令，创建一个节点并查看，来测试能否正常使用（这个节点就和文件夹路径似的）：
```bash
create /test hello
get /test
ls /
```

### 节点类型

ZooKeeper的ZNode节点有哪几种类型？
    
**节点类型**：四大基础类型为持久节点（Persistent）、临时节点（Ephemeral）、持久顺序节点（Persistent Sequential）、临时顺序节点（Ephemeral Sequential）。（注：3.5+版本后新增了容器节点和TTL节点）。

### Watcher机制
如何利用ZooKeeper的临时顺序节点加上Watcher机制实现分布式锁？
**分布式锁实现逻辑**：1. 在Zookeeper中创建一个持久的父节点（如 `/lock`）。2. 多个客户端并发竞争锁时，都在 `/lock` 下创建**临时顺序节点**（如 `/lock/seq-001`, `/lock/seq-002`。临时节点保证客户端宕机锁自动释放防死锁；顺序保证了排队顺序）。3. 客户端获取 `/lock` 下的所有子节点，并判断自己创建的节点是不是序号**最小**的。4. 如果是最小的，代表获取锁成功。5. **重点（防惊群效应）**：如果不是最小的，客户端不应该监听父节点，而是找到比自己序号**刚好小1**的那个节点，并在该节点上注册一个 **Watcher监听器**。6. 当拿到锁的客户端执行完业务断开连接，其对应的最小节点被删除，刚好触发排在它后面的那个客户端的 Watcher。被唤醒的客户端再次检查自己是否成了最小节点，进而获取锁。

### ZAB协议

深入解析ZooKeeper的ZAB（Zookeeper Atomic Broadcast）协议。在崩溃恢复阶段，它是如何选举出新Leader并保证数据不丢失的？
    
ZAB协议是专为ZooKeeper设计的崩溃恢复与原子广播协议。**数据标识**：ZAB引入了全局唯一的事务ID（ZXID），它是一个64位数字，高32位代表 Epoch（纪元/任期，每次换届加1），低32位代表 Counter（单调递增的事务计数器）。**崩溃恢复与选举**：当Leader宕机或失去多数派支持时，集群进入恢复模式。选举规则严格按照：**Epoch 更大者胜出 -> Epoch 相同则 ZXID 更大者胜出 -> ZXID 相同则 Server ID（myid）更大者胜出**。这种规则确保了拥有最新、最完整事务日志的节点必然被推举为新Leader。**数据同步与防丢失**：新Leader当选后，不会立即对外服务，而是进入数据同步阶段。它会比对Follower的ZXID，把缺失的事务（在旧Leader那里已提交但Follower没收到的）同步给Follower。对于旧Leader崩溃前提出但**未得到多数派确认的半拉子事务**，新Leader会根据其较旧的Epoch将其直接丢弃，从而保证了集群状态的一致性和数据的绝对正确。
### 网络脑裂

如果微服务集群发生网络脑裂（Network Partition），ZooKeeper会表现出什么行为？对业务链路有什么影响？
**网络脑裂**指由于网络故障，一个完整的集群被物理分割成了两个或多个互不连通的子集群。
**ZooKeeper（CP系统）表现**：由于强依赖半数以上节点（Quorum）存活，处于**少数派**那一侧的机房ZK节点将无法进行Leader选举，整个少数派集群直接瘫痪，**拒绝提供任何读写服务**；多数派一侧正常工作。**业务影响**：少数派机房的微服务将彻底丧失注册中心，新实例无法注册，旧实例无法发现，导致该机房内部的业务链路中断，哪怕服务本身是存活的。


## Nacos

### 介绍
**简介**：**Nacos** 是阿里巴巴开源的一个动态服务发现、配置管理和服务管理平台，适用于构建微服务架构。



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




**优点**
- **微服务架构**：Nacos 可以高效地管理微服务应用中的服务注册与发现，适合微服务体系结构。
- **多环境配置管理**：Nacos 能集中管理和动态更新多环境的配置，简化了配置管理流程。
- **跨语言支持**：Nacos 支持不同语言的客户端，便于跨语言服务间的协同管理。
- **动态配置管理**，无需重启应用。
- **服务发现**和健康检查，支持微服务架构。
- **易用性强**，支持多种配置格式和实时更新。
- 可以热更新计费参数

**组件**
- **Nacos Server**：提供服务注册、配置管理和服务监控的功能。
- **Nacos Client**：用于与 Nacos Server 通信的客户端库，一般集成到各个服务中。

与 **Apollo**、**Consul** 比较：
- **Nacos** 支持配置管理和服务发现，Apollo 仅做配置管理，Consul 更侧重服务发现。
- **Nacos** 更易与 Spring Cloud 集成。

为什么不直接用spring cloud的注册中心，还用Nacos呢？



### 安装


**安装Nacos**：
- 下载，解压，安装安装包
- 或者直接下载docker，默认未8848端口，在 localhost:8848/nacos 运行，用户名和密码都是nacos

**二进制包单机模式启动指令：**
* **Linux / macOS:** 运行 `sh startup.sh -m standalone`
* **Windows:** 运行 `cmd startup.cmd -m standalone`
* 

**客户端配置示例：** 引入 `spring-cloud-starter-alibaba-nacos-discovery` 依赖后，在 `application.yml` 中声明：
```YAML
spring:
  application:
    name: user-service
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```

### 服务发现/注册-知识
服务注册与发现
(Registry)
微服务架构中，各服务实例的网络坐标（IP 和端口）会动态变化。Nacos 提供了基于 DNS 和基于 RPC 的服务发现机制，解决“服务提供者在哪里”的问题。

**技术实现机制：**
- **服务注册 (Register)：** 服务提供者 (Provider) 启动时，通过 Nacos Client SDK 向 Nacos Server 发送 REST 请求，注册自身的元数据信息（如 IP、端口、权重、健康状态等）。
- **健康检查 (Heartbeat)：** 对于临时实例，客户端默认每 5 秒向服务端发送一次心跳包。若 Nacos Server 在 15 秒内未收到心跳，会将实例标记为不健康；若 30 秒未收到，则直接将该实例从可用服务列表中剔除。
- **服务发现 (Discovery)：** 服务消费者 (Consumer) 定期（默认 10 秒）从 Nacos Server 拉取最新的服务实例列表，并缓存在本地内存中。发起远程调用时，结合本地负载均衡组件（如 Spring Cloud LoadBalancer）从缓存列表中选择一个健康实例发起请求。

Nacos 在作为服务注册中心时，底层是如何实现服务实例的健康检查的（临时实例与持久化实例的区别）？
- **临时实例（Ephemeral=true）：** 采用**客户端主动心跳**机制。客户端（微服务）定时向 Nacos 服务端发送心跳维持活性。服务端如果在 15 秒内没收到心跳，会将实例标记为不健康；30 秒没收到，则将其从服务列表中剔除。适用于 AP 架构模式（Distro 协议）。
- **持久化实例（Ephemeral=false）：** 采用**服务端主动探测**机制。Nacos 服务端主动发起 TCP 或 HTTP 探活请求来检查实例状态。即使探测失败，实例也不会被剔除，只会标记为不健康。适用于 CP 架构模式（Raft 协议）。

Nacos作为注册中心，它的临时实例和持久化实例在底层健康检查机制和CAP理论倾向上有什么不同？
**健康检查机制**：临时实例采用**客户端主动心跳上报**机制（默认5秒一次），若服务端15秒未收到心跳则标记为不健康，30秒未收到则直接剔除；持久化实例采用**服务端主动探测**机制（TCP/HTTP探测），即使探测失败将实例标记为不健康，服务端也**永远不会剔除**该实例。**CAP理论倾向**：临时实例对应 **AP模型**（可用性+分区容错性），底层采用自研的 Distro 协议进行节点间的异步数据复制，优先保证服务发现的高可用；持久化实例对应 **CP模型**（一致性+分区容错性），底层采用 Raft 协议，强依赖多数派选举和日志复制，优先保证集群内注册数据的一致性。


### 配置中心-使用
(Config Center)

Nacos 允许将系统中各个微服务的配置文件集中提取到 Nacos Server 端进行统一存储和管理，并支持配置的动态下发，服务无需重启即可应用新配置。
**技术实现机制：**
* **长轮询 (Long Polling) 监听：** Nacos Client 启动后，会与 Server 端建立 HTTP 长轮询连接。Client 会携带本地缓存配置的 MD5 值发送给 Server 端进行比对。
* **动态热刷新：** 当开发者在 Nacos 控制台修改了配置，Server 端会更新对应 Data ID 的数据，并响应挂起的长轮询请求。Client 接收到变更通知并拉取新配置后，在 Spring 环境中触发 `EnvironmentChangeEvent`，结合 `@RefreshScope` 注解通过反射机制动态更新 Bean 的属性值。

**客户端配置示例：**
- **引入依赖**：引入 `spring-cloud-starter-alibaba-nacos-config` 依赖
- **配置 Nacos 连接信息**：
在项目的 `application.yml` 或 `application.properties` 文件中配置 Nacos 的服务器地址和命名空间。例如：
在 `bootstrap.yml`（注意：由于需要在 Spring 容器初始化前加载，文件优先级必须高于 application.yml）中声明：
```yaml
spring:
  application:
    name: user-service
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml
		namespace: your-namespace-id  # 可选：命名空间 ID
        group: DEFAULT_GROUP          # 可选：配置组
```
- **服务注册和发现**：在 Spring Boot 的主类中加上`@EnableDiscoveryClient` 注解，启用服务注册与发现

- **在 Nacos 配置中心创建配置文件**：在 Nacos 控制台中创建对应的数据 ID 和配置内容。通常，Spring Boot 项目使用的配置文件命名规则为 `DataID: ${spring.application.name}.properties`，以便在 Nacos 中进行映射。例如，项目的 `application.yml` 配置会对应到 Nacos 中的 `demo-service.yml` 或 `demo-service.properties`

- **使用配置值**：在 Spring 项目中，通过 `@Value` 或 `@ConfigurationProperties` 注解可以直接注入从 Nacos 中加载的配置。例如：
```java
@Value("${config.key:defaultValue}")
private String configValue;
```

- **使用 @RefreshScope 注解**：通过在配置类或 Bean 上添加这个注解，Spring 可以在 Nacos 中的配置发生变化时自动更新 Bean 的属性。

```java
@RestController
@RefreshScope // 核心注解，开启该类的配置热刷新能力
public class ConfigController {
    @Value("${custom.database.timeout}")
    private String dbTimeout;
}
```

- **设置配置动态刷新**：配置发布到 Nacos 后，Spring 项目会自动从 Nacos 获取并应用新配置，满足微服务系统的动态更新需求。这种方式允许应用在不重启的情况下更新配置，非常适合动态配置需求较高的场景。通过这种方式，Spring 项目可以灵活、安全地使用 Nacos 配置中心的集中配置管理功能。

- **配置集群模式**：在 `application.properties` 中写入 Nacos 节点信息，例如：
```properties
# 假设你有 3 个 Nacos 实例
nacos.discovery.server-addr=127.0.0.1:8848,127.0.0.2:8848,127.0.0.3:8848
```


Nacos配置中心的客户端是如何感知到服务端配置发生变更的？请详细解释其底层的长轮询（Long Polling）机制。

Nacos 采用的是**长轮询机制**（Push与Pull的结合体）。客户端向服务端发起拉取配置的 HTTP 请求，并携带一个超时时间（默认30秒）。服务端收到请求后，会比对客户端携带的配置 MD5 值。1. **如果发生变更**：服务端立即返回最新配置，连接结束。2. **如果未变更**：服务端**不会立即返回**，而是利用 Servlet 3.0 的异步处理机制（AsyncContext）将该请求挂起，放入一个延时任务队列中（最长等待约29.5秒）。在这段挂起期内，如果运维人员在控制台修改了该配置，服务端会触发 DataChangeEvent 事件，立刻找到对应被挂起的客户端请求，写入最新配置并提前返回。如果在 29.5 秒内一直没有变更，服务端返回状态告知无变更，客户端收到后会**立刻发起下一次长轮询**。这种机制既做到了准实时的配置推送，又避免了短轮询带来的无效网络开销和服务器 CPU 飙升。





### 集群架构
**Nacos 高可用集群架构设计是如何设计的？：**
- 集群采用无中心节点的对等架构（Leader-Follower 主要体现在 CP 协议的 Raft 选举上）。
- 为了实现高可用，通常前端挂载一层 VIP（Virtual IP）或 Nginx 等负载均衡器，微服务客户端配置 VIP 地址，由负载均衡器将请求分发到不同的 Nacos 节点。
- 针对持久化数据（如配置信息和持久化实例信息），Nacos 集群必须配置共享的外部数据库（通常是 MySQL 集群主从架构），以保证各 Nacos 节点的数据一致性，而非依赖 Nacos 自带的内嵌 Derby 数据库。


**网络脑裂问题**
如果微服务集群发生网络脑裂（Network Partition），Nacos会表现出什么行为？对业务链路有什么影响？
**网络脑裂**指由于网络故障，一个完整的集群被物理分割成了两个或多个互不连通的子集群。
**Nacos（AP模式，临时实例）表现**：Nacos基于去中心化的 Peer-to-Peer 同步。发生脑裂后，两边机房的Nacos节点都不会停止工作，而是各自选出自己的临时Leader（或独立运行）。它们各自维护自己机房内的服务实例信息。**业务影响**：属于“降级”状态。机房A的服务只能发现机房A的其他服务并互相调用，机房B同理。虽然全局数据不一致了（无法跨机房调用），但**最大限度地保证了业务链路的存活**（所谓的“可用性优先”）。当网络恢复后，Nacos会自动进行数据合并修复。

### 其它

**如何实现热更新**？


**如何防止 Nacos 单点故障？**
- **集群部署**：通过部署多个 Nacos 实例，形成集群，避免单点故障。
- **数据复制**：配置 Nacos 集群中的每个节点进行数据同步，确保节点间数据一致性。
- **负载均衡**：使用负载均衡器（如 Nginx 或 LVS）将请求分发到多个 Nacos 实例。
- **服务发现高可用**：Nacos 集群配置多节点，确保即使某个节点宕机，其他节点依然能提供服务。
- **持久化配置**：启用 Nacos 的数据持久化，确保配置数据不会丢失。




## Seata—分布式事务
### 介绍
**介绍**：Seata （Simple Extensible Autonomous Transaction Architecture）是阿里开源的分布式事务中间件，是一套开源的分布式事务解决方案，

用于确保在多个微服务中操作多个数据库时的数据一致性。

**为什么需要分布式事务**？
比如对于“用户下单 + 库存扣减 + 支付成功 + 修改订单状态”这一系列操作，它们分布在不同服务/数据库中，并且必须要么都成功，要么都失败，否则就会出问题。
所以需要分布式事务，保证它们“要么都成功，要么全部回滚”。

**作用**：
- 假如支付成功但订单没写入，使用Seata将自动回滚支付记录；
- 假如扣了库存但订单失败，使用Seata可以自动补回库存；
- 当发生网络抖动，调用中断，Seata会将事务挂起，等网络恢复后自动处理

Seata的优势：
- 分布式操作导致多数据库事务难协调，自动拦截 SQL，统一事务控制
- 部分服务成功导致数据不一致，Seata 自动回滚所有已完成的操作
- 比2PC快，而AT 模式仅在提交/回滚时协调，不锁主流程
- 编码简单，一行注解 `@GlobalTransactional` 搞定整个流程

### 基础内容
**Seata的模式**：
- **AT模式**：自动代理数据库操作，适用于JDBC/MyBatis项目（最多人用）
- **TCC模式**：手写Try-Confirm-Cancel接口，适合业务控制度高的场景
- **SAGA模式**：长事务补偿机制，适用于长流程/异步场景
- **XA模式**：接口级的两阶段提交，和传统数据库XA接口兼容

**组件简要说明**：
**TC**（Transaction Coordinator）：事务协调器，协调全局事务提交/回滚
**TM**（Transaction Manager）：发起全局事务（通常在订单服务）
**RM**（Resource Manager）：每个服务中的数据库代理，管理本地事务（库存/支付等）

### 2PC

经典2PC（两阶段提交）存在哪些致命缺陷（如同步阻塞、单点故障、数据不一致）？Seata是如何解决这些痛点的？
    
**经典2PC缺陷**：
- **同步阻塞**：在整个两阶段执行期间（从一阶段准备到二阶段提交或回滚），所有参与的数据库节点必须始终持有本地数据库的排他锁，导致并发性能极差。
- **单点故障**：协调者（TM）若在第二阶段宕机，参与者（RM）将一直阻塞并锁定资源，无法释放。
- **数据不一致**：在二阶段若发生网络分区，只有部分节点收到了Commit指令，会导致整个分布式系统的数据不一致。

**Seata的解决方案（以AT模式为例）**：Seata将长事务拆解为本地短事务。在一阶段，业务SQL执行完毕后，Seata会**直接提交本地事务并释放本地数据库锁**，从而彻底解决了同步阻塞问题，极大地提升了吞吐量；同时，Seata引入了高可用的独立TC（事务协调器）集群组件来解决单点问题；二阶段仅负责轻量级的异步清理（Commit）或基于一阶段记录的Undo Log进行反向补偿（Rollback），以最终一致性代替了强一致性。

### AT模式
两阶段提交

请详细剖析Seata AT模式的完整工作流：
- **全局事务开始**：订单服务发起 `@GlobalTransactional`，Seata TC 创建全局事务
- **一阶段（执行与拦截）：** 
	- 拦截SQL生成前后镜像（Undo Log）和获取本地锁/全局锁
	- 各服务执行本地事务：Seata 自动拦截 SQL，记录“**原值快照**”（undo_log）用于回滚
	- Seata 的 RM（资源管理器）代理数据源拦截业务 SQL。
	- 解析 SQL 语义，找到要更新的业务数据，在业务数据被更新前，将其保存为“before image”；
	- 执行业务 SQL 更新数据；
	- 将更新后的数据保存为“after image”。
	- 最后将前后镜像以及业务 SQL 组成一条回滚日志（`undo_log`），与业务 SQL 在同一个本地事务中提交。到当前数据库的 `undo_log` 表中
	- 这样保证了一阶段的原子性，并释放本地锁。
	- 在提交本地事务前，RM向TC申请该记录的**全局锁**（由表名+主键组成）。若申请不到则重试，重试超时则回滚本地事务。6. 获取到全局锁后，将业务数据和Undo Log在一个本地事务中提交，**释放本地锁**。7. 向TC汇报一阶段完成。
- **二阶段（提交或回滚）：** 
- ； 回滚：
    - **如果全部任务成功 → 提交（Commit）：** 
	    - TC（事务协调器）下发 commit 全局提交指令，
	    - RM 收到指令后，快速返回成功，并将该分支事务放入一个异步任务队列中，，由后台线程批量、异步地删除对应的 Undo Log 记录即可。
    - **如果任一任务失败 →回滚（Rollback）：** 
	    - Seata TC 通知所有服务提交/回滚
	    - TC 下发 rollback 全局回滚指令，
	    - RM 收到指令后，开启一个本地事务
	    - 通过 XID 和 Branch ID 找到相应的 `undo_log`记录。
	    - 在执行补偿前，RM会先校验当前数据库的数据是否与“after image”，如果不一致，说明发生脏写，需人工介入；
	    - 如果一致，则根据“before image”生成逆向 SQL（如将 `UPDATE` 改回原值，`INSERT` 改为 `DELETE`） 并执行，还原业务数据。
	    - 最后删除 `undo_log` 并释放全局锁。

如果遇到全局锁冲突或分支事务长时间不提交，你们是如何处理的？

### TCC模式
Seata的TCC模式与AT模式有什么本质区别？在设计TCC的Try、Confirm、Cancel接口时，必须保证哪三大核心原则（幂等性、空回滚、防悬挂）？请结合代码逻辑解释如何防悬挂。
 **本质区别**：AT模式是“无侵入”的，底层通过代理数据源自动生成补偿日志，依赖于关系型数据库的事务机制；TCC（Try-Confirm/Cancel）模式是“强侵入”的，属于业务级分布式事务，完全不依赖底层数据库的本地事务，适用于跨库、Redis操作或外部RPC调用。开发者需手动编写三个阶段的业务逻辑：Try（资源预留/冻结）、Confirm（实际扣减）、Cancel（解冻/补偿）。
**三大核心原则**：
1. **幂等性**：Confirm 和 Cancel 可能会因网络波动被TC重试调用，代码必须通过状态机或唯一流水号保证多次执行效果等同于一次。
2. **空回滚**：当 Try 阶段因为网络拥堵导致超时，TC判定全局失败触发 Cancel，但此时RM其实并未执行过 Try（没有预留资源）。Cancel 逻辑必须识别出这种情况并直接返回成功，不能去盲目释放根本不存在的资源。
3. **防悬挂（核心）**：悬挂是指 Cancel 比 Try 先执行（网络超时导致TC先发了Cancel，随后迟到的Try请求才到达RM）。如果在Try中无脑冻结资源，这些资源将永远无法被Confirm或Cancel，造成永久锁定。**防悬挂代码逻辑**：通常引入一张 `tcc_tx_log`（事务控制表）。在 Cancel 执行时，除了处理正常的补偿，还必须写入一条事务状态记录（`tx_id, status='CANCELLED'`）。在 Try 接口的开头，必须先查询这张表是否存在当前 `tx_id` 且状态为 `CANCELLED` 的记录；如果存在，说明 Cancel 已经提前执行过，Try 接口必须直接拒绝执行并抛出异常，从而成功拦截迟到的请求。

### 全局锁

在Seata AT模式下，什么是全局锁（Global Lock）？它是如何解决分布式事务中的“脏读”和“脏写”问题的？
**全局锁**是维护在TC（服务端）侧的一种锁资源，本质上是记录修改行特征的字符串（通常按 `表名:主键` 拼接）。**防脏写**：所有受Seata管理的全局事务，在一阶段提交本地事务前，必须拿到全局锁。如果事务A拿到了全局锁，事务B在一阶段尝试修改同一行数据时，会因为拿不到全局锁而在本地一直重试直至超时回滚。这保证了并发修改时，后一个事务必须等前一个全局事务完成（释放全局锁）才能进行，避免了脏写。**防脏读**：由于一阶段本地事务已提交，如果不加干预，默认隔离级别是“读未提交”（Read Uncommitted）。为了实现“读已提交”（Read Committed），业务侧需使用 `SELECT ... FOR UPDATE` 语句。Seata代理该语句时，不仅会加本地共享锁，还会去TC检查并**等待获取全局锁**。只有当之前的全局事务彻底提交或回滚释放了全局锁，该SELECT语句才能执行并返回数据，从而避免了脏读。


### 问题处理
- **全局锁冲突机制：** AT 模式在修改本地记录前必须拿到全局锁。如果拿不到，会进行重试（受限于 `@GlobalTransactional` 的重试配置或默认的 `lockRetryInterval` 和 `lockRetryTimes`）。超时未拿到则抛出异常，触发本地事务回滚。
    
- **长时间不提交：** Seata TC 会对超时的全局事务进行监控。如果达到超时时间（`timeoutMills`），TC 会主动驱动该全局事务进行回滚，向各参与者下发 rollback 请求，清理全局锁。如果出现极端死锁或脏写导致回滚失败，通常需要报警系统介入，人工通过 Seata 控制台或查表进行补偿处理。

如果在AT模式二阶段准备执行回滚时，发现数据库记录已经被其他非Seata管理的本地事务修改了（发生了脏写），Seata的默认处理机制是什么？你有什么干预方案？
**默认处理机制**：当二阶段收到Rollback指令时，RM会比对当前数据库中真实的数据与 Undo Log 中的 `after_image`。如果不一致，说明在全局事务的一阶段提交后，有绕过Seata的“野蛮本地事务”修改了该数据。此时，Seata会认为补偿操作已不安全，**默认会停止回滚**，抛出异常，并将该分支事务的状态标记为 `PhaseTwo_RollbackFailed_Unretryable`（回滚失败且不可重试），同时保留全局锁，以防止数据进一步被破坏。
**干预方案**：1. **人工介入**：根据Seata抛出的告警，DBA人工比对业务日志和 Undo Log 中的 Before/After Image，手动编写SQL进行数据修复，并在Seata控制台清理遗留的全局锁和事务记录。2. **事前规避（最佳实践）**：这是架构管理问题。必须确保微服务架构中，所有可能修改该表数据的接口和后台定时任务，都纳入Seata的管控体系（即使是单表操作，也要加上 `@GlobalLock` 注解使其遵循全局锁规则），从根本上杜绝“野事务”的出现。


### **实际示例**
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




## xxl-job—任务调度
### 介绍


优点：
- **简单易用**：XXL-JOB 配置简单，界面友好，能够快速上手。
- **轻量级**：与 Quartz 和 Elastic-Job 相比，XXL-JOB 更轻量，无需复杂配置，适合中小型项目。
- **Web 控制台**：提供丰富的管理控制台，支持任务管理、调度管理、日志查看等，简化运维管理。
- **高可用性**：支持集群部署，支持任务的失败重试、任务调度的分布式管理。
- **任务分片与失败重试**：支持任务分片和失败重试机制，确保任务稳定执行。

相比于JDK原生的 Timer 或 Spring的 @Scheduled，XXL-Job等分布式调度框架解决了单体定时任务的哪些核心痛点？
1. **高可用与单点故障**：单体任务随应用宕机而失效。XXL-Job支持集群部署，调度中心与执行器均可横向扩展，消除单点风险。2. **任务统一管理**：解决了任务分散在代码中、无法动态修改触发时间、无法手动执行或暂停的问题。3. **任务弹性扩容与负载均衡**：单机性能有上限。分布式框架支持将任务路由至不同机器，支持并行处理。4. **完善的监控告警与日志追溯**：提供了可视化界面查看执行状态、耗时统计及失败重试机制，支持日志集中存储与查看。5. **避免重复执行**：在集群环境下，通过分布式锁保证同一时刻只有一个节点在执行特定任务。

**与 Quartz 和 Elastic-Job 的比较**：
- **XXL-JOB vs Quartz**：
- **简易性**：XXL-JOB 提供更简洁的配置和管理界面，而 Quartz 配置相对复杂，适合复杂调度需求。
- **集成性**：XXL-JOB 对 Spring Boot 的集成更为友好，Quartz 集成相对麻烦。
- **XXL-JOB vs Elastic-Job**：
- **轻量性**：XXL-JOB 更轻量，Elastic-Job 功能更全面，但也更复杂，适合大规模的分布式任务调度。
- **界面管理**：XXL-JOB 提供更易用的 Web 控制台，而 Elastic-Job 的控制台较为简单，且配置较为复杂。
- 总结：XXL-JOB 更适合中小型项目，提供简单易用的管理控制台，适合快速集成，而 Quartz 和 Elastic-Job 更适合大型、复杂的分布式任务调度系统。

### 使用
**如何使用xxl-job**
- **添加依赖**：在 `pom.xml` 中添加 XXL-JOB 依赖：
```xml
<dependency>
<groupId>com.xxl.job</groupId>
<artifactId>xxl-job-core</artifactId>
<version>2.3.0</version>
</dependency>
```
- **配置执行器**：在 `application.yml` 中配置 XXL-JOB 执行器：
```yaml
xxl:
  job:
admin:
  addresses: http://localhost:8080/xxl-job-admin
executor:
  appname: xxl-job-executor
  logpath: /data/applogs/xxl-job/jobhandler/
```
- **创建任务处理类**：使用 `@XxlJob` 注解标记任务方法：
```java
@XxlJob("myJobHandler")
public void execute() {
// 任务逻辑
}
```
- **注册任务**：在 XXL-JOB 管理后台添加任务，选择执行器和任务处理类。
- **管理后台**：运行 XXL-JOB 管理后台，通过浏览器访问 `http://localhost:8080/xxl-job-admin`。

### 分片广播

详细说明XXL-Job的“分片广播”路由策略。在处理千万级表数据的定时清洗任务时，你的业务代码是如何利用分片参数（分片总数和当前分片项）实现多台机器并发提速的？
**分片广播**是指调度中心在触发任务时，会将该任务广播给集群内所有注册的执行器节点，每个节点会接收到两个核心参数：`index`（当前执行器序号，从0开始）和 `total`（执行器总数）。**业务实现**：在千万级数据的清洗场景中，通常采用“取模分片”逻辑。业务SQL或分批查询逻辑会根据主键（ID）进行分片：`SELECT * FROM table WHERE id % total = index`。这样，每一台机器只负责处理属于自己那一部分的数据。例如有3台机器，机器0处理 `id % 3 = 0` 的数据，机器1处理 `id % 3 = 1` 的数据，以此类推，从而实现真正的并行处理，处理速度随机器数量线性提升。
    - 

### 通讯机制
XXL-Job调度中心与执行器之间的通讯机制是怎样的？如果调度中心发生宕机，正在运行的任务会受到影响吗？
    
**通讯机制**：XXL-Job采用基于自研的轻量级RPC（底层为Netty + HTTP）进行通讯。调度中心作为客户端，向执行器内置的HTTP服务器发送调度请求；执行器执行完毕后，异步回调调度中心的HTTP接口上报结果。同时，执行器会定期向调度中心发送心跳以保持注册状态。**宕机影响**：如果调度中心宕机，**正在运行的任务不会受到影响**，因为任务逻辑是在执行器的独立线程池中执行的。但由于调度中心负责触发新任务和接收回调，宕机期间将无法触发下一次任务，且当前任务执行完毕后的结果无法即时反馈到调度中心（直至调度中心恢复）。

### 阻塞处理
任务积压处理：当某个定时任务的执行耗时过长，导致下一次调度时间到达时上一次任务还未结束，XXL-Job提供了哪几种阻塞处理策略（单机串行、丢弃后续调度、覆盖之前调度）？底层是如何实现的？
    
1. **单机串行（默认）**：调度请求进入执行器的FIFO队列，按顺序等待前一个任务执行完再执行。
2. **丢弃后续调度**：若当前任务正在运行，直接忽略并丢弃后续发来的调度请求。
3. **覆盖之前调度**：终止（Interrupt）正在运行的旧任务线程，并立即开始执行新任务。
**底层实现**：执行器内部为每个JobId维护了一个独立的 `JobThread` 线程和一个 `LinkedBlockingQueue` 任务队列。
- **串行**：不断将任务放入队列，线程从队列 `take()` 执行。
- **丢弃**：执行前检查该JobId对应的线程是否正在繁忙，若是则直接返回失败。
- **覆盖**：先调用旧线程的 `interrupt()`，然后重新创建一个新的 `JobThread` 启动。


### 高可用
如何保证XXL-Job调度中心自身的高可用？多个调度中心节点之间是如何防止同一个任务被重复调度的？（提示：数据库排他锁）。
**高可用**：调度中心支持集群部署，通常前端挂载Nginx进行负载均衡。多个节点共享同一个数据库。**防止重复调度**：调度中心底层并没有使用复杂的分布式协调（如Zookeeper），而是利用数据库的**排他锁（Exclusive Lock）**。在调度任务前，调度节点会尝试执行：`SELECT * FROM xxl_job_lock WHERE lock_name = 'schedule_lock' FOR UPDATE`。由于数据库事务的隔离性，只有一个节点能获取到该行锁，该节点获取锁后开始扫描任务表并触发调度，处理完毕后提交事务释放锁。其他节点因获取不到锁而直接跳过，从而保证了在集群环境下任务调度逻辑的原子性。


故障处理
如果执行推送任务的节点宕机了，XXL-JOB 是如何处理故障转移和任务防丢的？
故障转移与防丢： XXL-JOB 支持“故障转移”路由策略。当调度中心向某个执行器下发任务失败时（网络异常或节点宕机），会自动尝试路由到下一个健康的执行器节点。调度中心本身的高可用则通过基于数据库表锁（排他锁）的集群机制实现，避免多节点重复调度。


## Dubbo—RPC框架
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


## Netty—网络通信框架
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

**为什么选择 Netty 而不是直接使用 Java NIO 或 MINA？**
- **简化开发**：Netty 提供了更高层次的抽象和封装，避免了直接使用 Java NIO 时需要处理的复杂细节，如缓冲区管理、连接管理等。
- **高性能**：Netty 在 I/O 处理方面做了高度优化，具有更低的延迟和更高的吞吐量。
- **可扩展性和灵活性**：Netty 提供了丰富的扩展点和自定义处理能力（如自定义编解码器、处理器等），能够满足各种复杂的网络需求。
- **活跃社区与支持**：Netty 拥有活跃的开发者社区和完善的文档支持，相比 Java NIO 和 MINA 更容易上手和维护。

**Netty 是如何实现高性能的异步通信的？**
- **异步 I/O**：Netty 使用非阻塞的 I/O 操作，通过 `Channel` 监听事件并处理（例如读/写就绪），避免了传统同步阻塞 I/O 带来的性能瓶颈。
- **事件驱动**：通过事件循环（`EventLoop`）来处理 I/O 事件，实现高度的并发处理。
- **高效的内存管理**：Netty 通过内存池和零拷贝机制减少了不必要的内存分配和复制，提高了性能。


**如何设计 Netty 的 ChannelPipeline？有哪些 Handler？**
- **设计 Pipeline**：`ChannelPipeline` 是 Netty 中处理消息的核心组件，用于顺序执行多个 **`ChannelHandler`** 来处理 I/O 事件。
- **常见 Handler**：
- **ByteToMessageDecoder**：将字节流解码为消息对象。
- **MessageToByteEncoder**：将消息对象编码为字节流。
- **IdleStateHandler**：检测连接是否空闲，用于实现心跳检测。
- **LoggingHandler**：用于记录日志。
- **业务逻辑处理**：自定义的 `ChannelHandler` 来处理具体业务逻辑（如协议解析、消息处理等）。
 
**Netty 的线程模型是怎样的？BossGroup 和 WorkerGroup 各自职责是什么？**
- **BossGroup**：负责接收客户端的连接请求，创建新的 `Channel`。
- **WorkerGroup**：负责处理已经接入的连接，执行数据读写操作。
- **线程模型**：Netty 使用事件驱动模型，BossGroup 和 WorkerGroup 都是事件循环器 (`EventLoopGroup`)，每个 `EventLoop` 负责一个或多个 I/O 事件的处理。

**Netty 的 Zero-Copy 是什么？在什么情况下能提升性能？**
- **Zero-Copy**：通过直接操作操作系统的 I/O 缓冲区而不需要额外的内存拷贝，从而提高数据传输效率。
- **提升性能的场景**：主要应用于大文件的读取和写入，避免了多次数据拷贝和内存分配，提高了磁盘和网络 I/O 性能。

**客户端的连接池是如何实现和维护的？**
- **连接池管理**：通过池化技术（如 **Apache Commons Pool**）管理客户端与服务的连接。连接池维护一定数量的空闲连接，并能按需创建和销毁连接。
- **最大连接数和最小连接数**：设置连接池的最大连接数和最小连接数，根据业务需求动态调整。
- **连接有效性检查**：定期检查连接是否有效，避免使用失效连接。
- **负载均衡**：在多节点环境下，连接池结合负载均衡策略，分配请求到不同节点。
- 负载均衡定义：当有多个服务实例可用时，客户端按一定策略选择其中一个实例，主要是未来分散各服务器的压力，提高性能和容错。


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


## JUnit—单元测试框架

## Log4j—日志
Log4j 目前已被 Log4j2、SLF4J+Logback 组合部分替代，但仍有大量项目使用它。
Log4j 是 Java 最早期、最经典的 日志框架
**主要功能**：打印日志、写入文件、发送到控制台等。

其核心概念包括：
* Logger：日志记录器，定义日志逻辑。
* Appender：输出器，定义日志去哪儿（如文件、控制台、Socket）。
* Layout：格式化器，定义日志显示样式。
* Level：日志级别（如 ERROR、INFO、DEBUG）

## CompletableFuture




用于支持异步编程和处理异步操作的结果，将多个耗时接口/方法异步执行，并并行处理+合并结果，从而显著提升系统整体响应性能。
CompletableFuture 支持并行执行多个远程调用，比如账单生成和轨迹上传，可以减少总耗时。

CompletableFuture 异步编排为什么不用 MQ？
代驾结束时的任务（生成账单、上传轨迹、推送消息）是 强实时同步 的，需要在用户支付前完成，不适合 MQ 异步。




**CompletableFuture 与传统线程池异步提交有何不同？**
- **CompletableFuture**：更高层次的异步处理，支持链式调用、异常处理、组合任务等，适用于复杂的异步操作。
- **传统线程池**：通过 `ExecutorService.submit()` 提交任务，无法直接处理返回值或管理任务的执行链。
- 异步编排用于支付、数据处理等场景。
- **CompletableFuture** 更灵活、可链式操作。


**如何在异步任务中捕获异常并处理？**
- 使用 `exceptionally()` 或 `handle()` 方法处理异常：
- 捕获异常用 `exceptionally()` 处理。
```java
CompletableFuture.supplyAsync(() -> {
	// 执行任务
	}).exceptionally(ex -> {
	// 处理异常
	return null;
});
```

**CompletableFuture 的 join() 和 get() 有什么区别？**
- **join()**：抛出 **`CompletionException`** 包裹原始异常。
- **get()**：直接抛出原始异常（`InterruptedException` 或 `ExecutionException`）。
- `join()` 包裹异常，`get()` 抛出原始异常。

**如果多个异步调用依赖关系复杂，你如何编排？**
- 使用 **`thenCompose()`** 和 **`thenCombine()`** 来串联和组合多个异步任务。
- 用 `thenCompose()` 和 `thenCombine()` 处理复杂依赖关系。
```java
CompletableFuture<String> result = 
CompletableFuture.supplyAsync(() -> "Hello")
             .thenCompose(s -> CompletableFuture.supplyAsync(() -> s + " World"))
             .thenCombine(CompletableFuture.supplyAsync(() -> "!"), (a, b) -> a + b);
```


情景问题：当司机结束代驾服务时，要进行非常多的步骤，比如：获取订单信息 1s、计算防止刷单 0.5s、计算订单实际里程 0.5s、计算订单实际代驾费用 1s，数据的获取都需要远程调用，要花费很多时间，这不能接受，但如果使用多个线程并行完成这些操作，那么就可以快很多

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




## Drools—规则引擎
**介绍**：
Drools 是一个开源的 Java 规则引擎，由 Red Hat 维护。

Drools 不仅仅是个规则引擎，**还支持**：
- 规则引擎（Drools Rule Engine）
- 复杂事件处理（Drools Fusion）
- 流程引擎（jBPM）
- 约束求解（OptaPlanner）


**优点**：
- 把业务逻辑用规则来描述，减少在 Java 代码里硬编码的 if-else 大片逻辑
- 业务人员/运营可以直接修改规则，不用改代码、重新发布系统
- 支持复杂的规则推理、条件匹配、优先级控制，
- 高性能，Rete算法对大规模规则匹配非常高效
- **规则引擎**：Drools 提供强大的规则引擎，能够灵活处理复杂的业务规则。
- **可扩展性**：支持动态加载和修改规则，易于扩展和维护。
- **高效的决策引擎**：采用 Rete 算法，处理大量规则时效率高。
- **规则与代码分离**：将业务逻辑与应用程序代码分离，规则更易管理和修改。
- **集成简便**：易于与 Java 系统集成，支持 BPMN、PMML 等标准。
- **支持复杂推理**：可以处理复杂的规则链、条件和推理，适合动态决策和业务流程。
- 相比硬编码或策略模式，计费规则（起步价、里程费、夜间附加费、时长费等）往往变动频繁且受地域、时间段影响。硬编码会导致每次规则调整都需要修改代码、重新发版。
- Drools 将业务逻辑（代码）与业务规则（DRL 文件）完全解耦，提供专用的模式匹配算法（Rete 算法及其变种 Phreak 算法），在复杂规则计算下性能优于大量的 `if-else`。

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


Drools 规则变更后如何动态加载？
在 **Drools** 中，规则变更后可以通过以下方式动态加载：
- **使用 KieContainer 重新加载规则**：
	- 创建新的 `KieContainer` 实例，加载更新后的规则文件。
	- 获取新的 `KieSession` 来执行更新后的规则。
- **代码示例**：
```java
KieServices kieServices = KieServices.Factory.get();
KieContainer kieContainer = kieServices.newKieContainer(kieServices.newReleaseId("com.example", "rules", "1.0"));
KieSession kieSession = kieContainer.newKieSession();
```
- **重新加载**：
- 规则文件更新后，重新加载 `KieContainer` 和 `KieSession`。


## Lomblk
Lombok 是一个 Java 编译期插件，用来自动生成常用代码，比如 getter/setter、构造方法等。
常用注解有：
* `@Getter/@Setter`：自动生成 get/set 方法
* `@ToString`：自动生成 toString()
* `@NoArgsConstructor/@AllArgsConstructor`：自动构造器
* `@Data`：相当于 Getter + Setter + toString + equals + hashCode





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



**为什么使用 Guava-Retry 框架？相比自己实现重试逻辑有什么优势？**
- **Guava-Retry** 提供了简洁、可靠的重试机制，内置多种重试策略和配置，避免了自己实现复杂的重试逻辑。
- **优势**：
	- **简化代码**：减少重复的重试代码，并且支持灵活配置。
	- **多种重试策略**：如固定间隔、指数退避等，不需要手动实现。
	- **可扩展性强**：可以轻松集成到现有系统，并支持自定义重试条件。



Guava-Retry 支持非常丰富的**策略组合**：
- 固定重试间隔：`fixedWait(200ms)`每次等待200ms
- 随机重试间隔：`randomWait(100ms,500ms)`
- 指数递增重试：`exponentialWait(100ms,2)`
- 重试最大次数：`stopAfterAttempt(5)`
- 重试最大时间：`stopAfterDelay(1分钟)`
- 遇到特定异常重试：`retryIfExceptionOfType(TimeoutException.class)`
- 遇到业务失败重试：`retryIfResult(res->!res.isSuccess())`


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



## JavaFX—图形化界面
教程视频
- JavaFx快速入门： https://www.bilibili.com/video/BV1pJ411q7yv
- JavaFX视频教程第1课，hello world： https://www.bilibili.com/video/BV1fW41167RP
- JavaFx快速入门_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1pJ411q7yv/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
JavaFX视频教程第1课，hello world_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1fW41167RP/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
JavaFX文本域（输入框） - JavaFX教程™： https://www.yiibai.com/javafx/javafx_textfield.html
## JRebel
Java 热部署工具（让修改代码后不用重启服务）。

* `/rebel.xml` 和 `rebel.xml`
* 含义： JRebel 的配置文件，指定了哪些类路径需要被监控热部署。
* 作用： 通常是本地生成的，不需要提交。
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


## Swagger
一个教程： https://developer.aliyun.com/article/1254601?spm=5176.26934562.main.2.3ca15696LdpSiR


启动应用后，默认访问：

- Swagger UI：`http://localhost:8080/swagger-ui/index.html`
    
- OpenAPI JSON：`http://localhost:8080/v3/api-docs`
    
- （多分组时还会有 `/v3/api-docs/{group}`）
    

在 Swagger UI 页面里就能点“Try it out”在线调试请求。


## 前端

### Thymeleaf—模板引擎

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




# END