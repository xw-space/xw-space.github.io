---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---
一个简单的JavaSpring&SpringBoot入门教程
<!-- more -->

# Java Spring

## Java Spring
什么是IOC（控制反转）和DI（依赖注入）？
Spring底层的核心容器是如何实现它们的？

### 简介
Spring是一个框架
- **框架**：就是针对某个要实现的目的，已经完成一系列基础代码构建，只要按特定要求去补充完整代码，就可以实现功能。


**Spring** 提供了许多工具、功能和约定，比如处理，简化了开发流程

### 作用


**统一的应用配置**：
- Spring 提供了统一的 **应用配置**（如 `application.properties` 或 `application.yml`），可以集中管理应用的配置。
- 没有 Spring，你可能需要手动读取配置文件（如 `config.properties`），并在代码中进行相应的处理：
```java
Properties properties = new Properties();
properties.load(new FileInputStream("config.properties"));
String dbUrl = properties.getProperty("db.url");
```

**测试支持**：
- Spring 提供了对 **单元测试** 和 **集成测试** 的强大支持，特别是通过 **Spring TestContext Framework** 和 **Mockito** 等集成。
- 没有 Spring，测试环境的搭建变得更复杂，你必须手动创建和管理模拟对象，你需要手动设置测试环境和模拟依赖，工作量大。。
- 使用 `@SpringBootTest` 进行集成测试：
```java
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @Test
    public void testGetAllUsers() {
        List<User> users = userService.getAllUsers();
        assertNotNull(users);
    }
}
```

**事务管理**：
- 在 Spring 中，事务管理是通过声明式事务控制的，Spring 会自动处理事务的开始、提交和回滚。
- 如果没有 Spring，你必须手动管理每个数据库操作的事务，确保每个操作在出现异常时正确回滚。
```java
Connection conn = dataSource.getConnection();
try {
  conn.setAutoCommit(false);
  
  // 执行 SQL 操作
  statement.executeUpdate("INSERT INTO users VALUES (...)");
  
  conn.commit();  // 提交事务
} catch (SQLException e) {
  conn.rollback();  // 发生异常时回滚事务
} finally {
  conn.close();
}
```
### 使用
Spring Initializr： https://start.spring.io/


- Spring主要用于后端开发，后端开发其实就是开发web服务，web服务就是webAPI（应用程序接口），用于接收和响应外部请求（如HTTP请求）。
- Spring Boot Web服务可以被看作是由多个Bean和控制器（Controller）组成的API，它们通过HTTP进行交互。
- Web服务是由Spring控制器（通常是`@RestController`）处理HTTP请求，响应这些请求的数据（例如JSON）。
- Spring会在启动时创建一个HTTP服务器（例如Tomcat、Jetty等），并将它配置为接收HTTP请求。
- HTTP请求：客户端（如浏览器、移动应用或其他服务器）通过HTTP向你的Spring应用发起请求。请求的内容可能是GET、POST、PUT、DELETE等。
- 请求路由：Spring使用`@RequestMapping`或具体的注解（如`@GetMapping`、`@PostMapping`）来将HTTP请求映射到相应的处理方法上。
- 每当请求到达时，Spring会自动将请求路由到正确的控制器方法，然后执行该方法的业务逻辑，最后返回结果给客户端。
- 每个请求都会触发对应的处理方法（在控制器中实现，控制器方法上会标有`@RestController`或`@Controller`注解的类来定义）
- Spring会自动处理请求和响应的映射、转换和管理。
- 响应：处理请求的方法返回一个响应，通常是JSON或HTML格式的响应，Spring会自动将返回值转换为适合的格式并返回给客户端。



示例：在 Spring 中定义一个简单的 API：
```java
@RestController  // 声明这个类是一个 RESTful 控制器
@RequestMapping("/api")  // 根路径是 /api
public class UserController {
    @GetMapping("/users")
    public List<User> getUsers() {
        // 处理 GET 请求，返回用户列表
        return userService.getAllUsers();
    }
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        // 处理 POST 请求，创建新用户
        return userService.createUser(user);
    }
}
```
当客户端请求 `/api/users` 时，Spring 会自动调用 `getUsers()` 方法，返回所有用户的 JSON 数据。当客户端发送一个 POST 请求时，Spring 会调用 `createUser()` 方法来处理请求并创建一个新用户。


### 启动流程

在一个 Java Spring 应用程序中，程序的运行逻辑可以从 **应用启动** 到 **依赖注入**、**Bean 生命周期管理**，直到 **服务的运行与处理** 进行详细讲解。

下面将详细说明 Spring 程序的典型执行流程和各个程序的逻辑。

1. 应用启动
当你启动一个 Spring 应用时，通常是通过 `SpringApplication.run(Application.class, args)` 来启动的。在这个过程中，Spring 做了以下几件事情：
* **加载 Spring 容器**：`SpringApplication.run` 方法会初始化一个 **Spring 上下文**（Spring ApplicationContext），并加载所有的 Bean 和配置。
* **扫描包路径**：Spring 会根据注解 `@ComponentScan` 或 `@SpringBootApplication` 来扫描指定的包路径，查找所有的类，并将符合条件的类注册为 Spring Bean。
* **加载配置**：Spring 会根据 `application.properties` 或 `application.yml` 文件中的配置加载应用的环境、数据库连接、端口、日志等信息。

**2. Bean 的初始化与依赖注入**
* **扫描并注册 Bean**：当 Spring 启动时，它会扫描所有的类并根据注解（如 `@Service`、`@Component`、`@Repository` 等）将其注册为 Bean，管理它们的生命周期。
* **依赖注入**：Spring 会为这些 Bean 注入它们的依赖，常见的方式有：
  * **构造函数注入**：通过构造函数将依赖传入类中。
  * **字段注入（不推荐）**：直接在字段上使用 `@Autowired` 注解。
  * **Setter 注入**：通过 setter 方法进行注入。
例如：
```java
@Service
public class MyService {
    @Autowired
    private MyRepository myRepository;  // 依赖注入
    public void process() {
        myRepository.save();
    }
}
```

**3. Spring Boot 启动流程**
* **`@SpringBootApplication` 注解**：这是 Spring Boot 的核心注解，结合了多个注解，如 `@Configuration`、`@EnableAutoConfiguration` 和 `@ComponentScan`，指示 Spring 启动时执行哪些配置和扫描哪些类。
  ```java
  @SpringBootApplication
  public class MyApplication {
      public static void main(String[] args) {
          SpringApplication.run(MyApplication.class, args);  
          // 启动 Spring Boot 应用
      }
  }
  ```
* **`SpringApplication.run()`**：这个方法启动了整个 Spring 应用，它会创建 Spring 容器（ApplicationContext），加载所有的 Bean，初始化 Web 环境（如果是 Web 应用的话），并调用 `run` 方法执行 `CommandLineRunner` 或 `ApplicationRunner` 接口的 `run()` 方法（如果有实现）。

**4. 生命周期管理**
Spring 管理的 Bean 都有生命周期，它们的生命周期在 Spring 容器的生命周期内自动管理。典型的生命周期步骤如下：
1. Bean 实例化**：Spring 容器根据类的定义创建 Bean 实例。
2. 依赖注入**：Spring 会注入该 Bean 所依赖的其他 Bean（通过构造函数注入、字段注入等方式）。
3. 初始化**：如果 Bean 实现了 `InitializingBean` 接口或使用了 `@PostConstruct` 注解，Spring 会调用 `afterPropertiesSet` 方法或相关的初始化方法。
4. 使用 Bean**：该 Bean 现在可以在应用中使用，处理业务逻辑。
5. 销毁**：当 Spring 容器关闭时，Spring 会销毁所有的 Bean。如果 Bean 实现了 `DisposableBean` 接口，或者使用了 `@PreDestroy` 注解，Spring 会调用销毁方法。


**5. 请求处理与控制器执行**
在 Web 应用程序中，Spring 使用 **DispatcherServlet** 来处理 HTTP 请求。它是一个前端控制器，所有的 HTTP 请求都会被该控制器接收。
* **请求映射**：当请求到达时，`DispatcherServlet` 会将请求分发到相应的控制器（Controller）。控制器方法通常使用 `@RequestMapping` 或更具体的注解（如 `@GetMapping`、`@PostMapping`）来映射 URL 请求。
例如：
```java
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findUserById(id);
    }
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
}
```
* **请求处理**：
  * Spring 会根据请求的 URL 和请求方法（GET, POST 等）匹配到对应的控制器方法。
  * 控制器方法会调用相关的业务逻辑层（如 `Service`）来处理请求。
  * 最后，Spring 会将处理结果返回给客户端（通常是 JSON 或 HTML 格式）。

**6. 异步执行与事件监听**
Spring 提供了支持 **异步执行** 和 **事件监听** 的功能。例如，可以使用 `@Async` 注解来使方法异步执行，或者使用事件发布机制（`ApplicationEventPublisher`）来触发和处理自定义事件。
* **异步执行**：
  ```java
  @Service
  public class MyService {
      @Async
      public CompletableFuture<String> processAsync() {
          // 处理耗时的任务
          return CompletableFuture.completedFuture("Processed");
      }
  }
  ```
* **事件发布**：
  ```java
  @Component
  public class MyEventPublisher {
      
      @Autowired
      private ApplicationEventPublisher eventPublisher;
      
      public void publishEvent() {
          eventPublisher.publishEvent(new CustomEvent(this));
      }
  }
  ```
**7. Spring Boot 应用的退出**
* **关闭 Spring 应用**：当应用执行完毕，或者需要关闭时，Spring 会通过 `SpringApplication.exit()` 或者 JVM 进程退出来关闭应用。
* **销毁 Bean**：在应用关闭时，Spring 会销毁所有的 Bean，并执行销毁方法（如实现 `DisposableBean` 接口或者 `@PreDestroy` 注解的方法）。
**总结：
1. 启动流程**：通过 `SpringApplication.run()` 启动应用，Spring 容器初始化并扫描包路径，注册 Bean。
2. 依赖注入**：Spring 会为管理的 Bean 注入它们所依赖的其他 Bean。
3. 生命周期管理**：Spring 会管理 Bean 的生命周期，包括实例化、依赖注入、初始化、销毁等步骤。
4. 请求处理**：在 Web 应用中，`DispatcherServlet` 会根据请求分发到对应的控制器，控制器执行业务逻辑并返回结果。
5. 事件和异步处理**：Spring 支持事件监听和异步执行，以增强应用的功能。
这种流程保证了 Spring 应用的高效、松耦合和可扩展性。希望这个概述能够帮助你理解 Spring 应用的运行逻辑！

### IOC与DI
IOC-控制反转
IOC（Inversion of Control，控制反转）：
IOC（控制反转）是一种设计思想，指将对象的创建、配置和生命周期管理的控制权由程序代码本身交给外部容器（如Spring容器）来统一管理，通过依赖注入（DI）的方式将Spring容器创建的对象传给需要使用的程序，

目的
- 这样，被管理的对象就不再需要主动去查找或创建其依赖，而是“被动”地从容器中获取，这种控制权的转移即“控制反转”。
开发者不需要手动创建对象，Spring 容器负责创建和管理对象及其生命周期，让开发者能够专注于业务逻辑。

优点
从而降低代码耦合，增强了模块的可复用性和测试性。
- IOC的好处在于代码结构清晰，依赖关系分明，降低了对象之间的耦合度，使得应用程序的模块化和可测试性更强。

**注册 (Registration)**
- 注册是指将某个类或组件告诉 Spring 容器，让 Spring 容器知道某个类的存在，将类或组件放入 Spring 容器的“目录”中，以便容器能够在需要的时候创建和管理它。
- 注册可以通过多种方式完成，例如通过注解（如 `@Component`, `@Service`, `@Repository`）或者 XML 配置文件。


DI-依赖注入
DI（Dependency Injection，依赖注入）

是什么
DI（依赖注入）是IOC的具体实现方式，即容器在运行期间，动态地将某种依赖关系（对象属性）注入到目标对象中。
将 Spring 容器中管理的对象（通常是已注册的组件）注入到其他类中，以便在这些类中使用。
注入的本质是自动为类提供它所依赖的其他对象，而不需要手动创建这些对象。


目的
可以降低代码冗余，降低代码耦合，方便进行单元测试
更加灵活、可维护，便于单元测试
这种方式使得代码更加简洁和易于维护。

- 常用的注入方式包括：
	- **构造函数注入**，在创建对象时，通过构造函数将依赖对象传入，这种方式使依赖关系在对象创建时就被确定，适合于必须且固定的依赖。
	- 属性注入
	- **Setter方法注入**，在创建对象后，通过调用setter方法将依赖对象注入，适合于可选依赖或后期可以修改的依赖。
在 Spring 中，常用的注入方式是通过 `@Autowired` 注解，这个注解会告诉 Spring 容器在创建类的实例时，自动将所需的依赖注入进去。


实现
- IOC容器的具体工作流程是，通过配置文件或注解扫描，Spring容器读取到Bean及其依赖的定义，然后按照依赖关系初始化Bean对象并将其注入到相应的位置。

实现
Spring核心容器主要通过“解析配置元数据（XML或注解） + 反射机制（Reflection） + 工厂模式（BeanFactory）”来实现。
容器启动时解析BeanDefinition元信息并注册到注册表中（底层为ConcurrentHashMap），按需通过反射调用构造器实例化对象，并通过反射或CGLIB进行依赖注入。


没有 **Spring** 的依赖注入机制时，开发者必须手动管理所有对象的创建和依赖：
```java
public class MainApp {
  public static void main(String[] args) {
      // 手动创建对象并注入依赖
      UserRepository userRepository = new UserRepository();
      UserService userService = new UserService(userRepository);
  }
}
```

示例：你可以通过 `@Autowired` 自动注入依赖：
```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;  // 自动注入
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
```







### Spring 容器
，它负责管理应用中的Bean，提供依赖注入，管理Bean的生命周期等功能。它是Spring应用的核心，确保了应用中的组件可以正确交互并自动配置

* **Spring 容器** 会自动管理多个 **Bean**，这些 Bean 可能包含业务逻辑、数据访问、控制器等，它们在整个 Spring 应用程序中协同工作。
* Spring 容器在启动时会自动创建和初始化所有 Bean，并且这些 Bean 会随着 Spring 应用的生命周期一直运行。你可以在这些 Bean 中执行不同的业务逻辑，而 Spring 会管理它们的依赖关系、生命周期等。
* 在 Spring Boot 中，启动应用后，Spring 容器会自动创建并管理这些 Bean，它们负责处理 HTTP 请求、执行业务逻辑等操作。

- **上下文（ApplicationContext）** ：Spring容器。

### @Resource
是 Java 平台标准规范（JSR-250）中定义的注解
位于 `javax.annotation`（在较新的 Jakarta EE 规范中变更为 `jakarta.annotation`）包下。


用于实现控制反转（IoC）容器中的依赖注入（Dependency Injection），即把容器里的某个对象（Bean）赋值给你声明的这个变量。






**基于名称的精确匹配**：Spring 会提取你的变量名（这里是 `myUserDao`），然后去它管理的内部注册表里，找有没有哪个对象的 ID 或名字刚好也叫 `myUserDao`。

**基于类型的兜底匹配** (by-type)：既然名字对不上，Spring 会查看你声明的变量类型（这里是 `UserDao` 类或接口），然后去注册表里找类型匹配的对象。
如果是单例且只有一个 `UserDao` 的实现类，直接赋值，注入成功
比如你有 `UserDaoMySQLImpl` 和 `UserDaoOracleImpl` 两个实现类都在 Spring 容器里。Spring 此时无法判断你要哪一个，直接抛出 `NoUniqueBeanDefinitionException` 崩溃报错。


一旦你加上了 `name = "..."` 属性，`@Resource` 的执行算法就变了：**它会彻底锁死在第一步（基于名称匹配）**。Spring 只会去找名字等于 `userDaoOracleImpl` 的对象，如果找不到，绝对不会去按类型找兜底，而是直接报错。
```java
@Resource(name = "userDaoOracleImpl")
private UserDao myUserDao;
```





### Bean
#### 介绍
* **Bean** 是 Spring 容器中的组件，它们可以是 Web 服务的一部分，也可以是其他服务（如数据库、消息队列等）的部分。
* 
**Bean** 是 Spring 中的核心概念，它是一个由 Spring 容器管理的对象，通常是应用程序中的服务、数据访问层、控制器等。

Spring 容器会在应用启动时创建这些 Bean，并在需要时将它们注入到其他类中。

* 在一个 **Spring Boot 应用** 中，当你启动服务时，Spring 容器会创建和管理多个 Bean。
* 每个 Bean 代表一个组件或服务，它们可以执行各种功能（例如数据库访问、业务逻辑处理、消息传递等）。
* 
**自动管理 Bean**：Spring 会根据注解（如 `@Component`、`@Service`、`@Repository` 等）自动扫描并注册这些 Bean。这些 Bean 被 Spring 管理和维护其生命周期，处理相关的业务逻辑或服务。
**启动 Spring 应用程序时**，Spring 会初始化所有的 Bean，处理它们的依赖，并将它们纳入管理。Spring 提供了一种松耦合的方式，使得这些 Bean 可以彼此协作而不需要明确的依赖关系。



示例：
```java
@Service  // 通过 Spring 管理的 Bean
public class MyService {
    public void performAction() {
        // 执行某些操作
    }
}
```

#### 作用域
Spring中Bean的作用域（Scope）有哪些？在单例Bean中注入原型（Prototype）Bean时，如何保证每次获取的都是新实例？
    
   **核心作用域**：`singleton`（单例，默认）、`prototype`（原型，每次获取创建新实例）、`request`（每个HTTP请求一个实例）、`session`（每个HTTP Session一个实例）、`application`（ServletContext级别）、`websocket`。
   
   **单例注入原型的解决方案**：因为单例Bean只被实例化一次，其内部注入的属性也会在实例化时固化，导致注入的原型Bean变成了“单例”。解决方案如下：
   1. 使用 `@Lookup` 注解**：在单例Bean中定义一个返回该原型Bean的抽象方法或普通方法，并加上 `@Lookup` 注解。Spring底层会使用CGLIB动态代理重写该方法，每次调用时都去容器中主动获取新的原型Bean。
   2. 注入 `ObjectFactory<T>` 或 `ObjectProvider<T>`**：注入这两种工厂接口，在需要使用时调用 `getObject()` 方法从容器中获取新实例。
   3. 实现 `ApplicationContextAware`**：直接注入 `ApplicationContext` 并在需要时手动调用 `getBean()` 获取（不推荐，代码侵入性过强）。


#### 生命周期
Spring容器是如何管理和创建bean实例
请详细描述Spring Bean的完整生命周期（包含实例化、属性赋值、初始化、销毁，以及BeanPostProcessor和各类Aware接口的介入时机）。

方便调试和解决问题

Bean的完整生命周期流程如下：
- **实例化（Instantiation）**：通过反射或CGLIB按BeanDefinition创建对象实例（在内存中分配空间）。
- 通过Bean Definition获取bean的定义信息
- 调用构造函数实例化bean
- **属性赋值（Populate）**：解析依赖，将对应属性和引用注入到对象中。
- bean的依赖注入
- **Aware接口回调**：若实现了相关Aware接口，依次调用 `BeanNameAware`、`BeanClassLoaderAware`、`BeanFactoryAware`、`ApplicationContextAware` 的相关方法注入容器底层组件。
- 处理Aware接口(Bean Name Aware、Bean Factory Aware、Application Context Aware)
- **BeanPostProcessor前置处理**：调用 `postProcessBeforeInitialization`（如 `@PostConstruct` 注解就是在此阶段由对应的处理器解析执行）。
- Bean的后置处理器Bean Post Processor-前置
- **初始化（Initialization）**：先执行 `InitializingBean` 接口的 `afterPropertiesSet()` 方法，再执行自定义的 `init-method` 方法。
- 初始化方法(Initializing Bean、init-method)
- **BeanPostProcessor后置处理**：调用 `postProcessAfterInitialization`（**AOP代理对象通常在此阶段生成**）。
- Bean的后置处理器Bean Post Processor-后置
- **使用**：Bean处于就绪状态，可被业务代码调用。
- **销毁（Destruction）**：容器关闭时，先执行 `@PreDestroy` 注解方法，再执行 `DisposableBean` 的 `destroy()` 方法，最后执行自定义的 `destroy-method` 方法。
- 销毁bean

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100337.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100310.png)


**BeanDefinition**
Spring容器在进行实例化时，会将xml配置的`<bean>`的信息封装成一个BeanDefinition对象，Spring根据BeanDefinition来创建Bean对象，里面有很多的属性用来描述Bean
```java
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl" lazy-init="true"/>
<bean id="userService" class="com.itheima.service.UserServiceImpl" scope="singleton">
    <property name="userDao" ref="userDao"></property>
</bean>
```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100258.png)
- beanClassName：bean 的类名
- initMethodName：初始化方法名称
- properryValues：bean 的属性值
- scope：作用域
- lazyInit：延迟初始化


#### 线程安全



Spring框架中的bean是单例的吗？
```java
@Service
@Scope("singleton")
public class UserServiceImpl implements UserService {
    
}
```
- singleton : bean在每个Spring IOC容器中只有一个实例。
- prototype：一个bean的定义可以有多个实例。 

不是线程安全的

Spring bean并没有可变的状态(比如Service类和DAO类)，所以在某种程度上说Spring的单例bean是线程安全的。

```java

@Controller
@RequestMapping("/user")
public class UserController {

    // 成员方法需考虑线程安全
    private int count;
    
    @Autowired
    private UserService userService;

    @GetMapping("/getById/{id}")
    public User getById(@PathVariable("id") Integer id){
        count++;
        System.out.println(count);
        return userService.getById(id);
    }
}

```

不是线程安全的
Spring框架中有一个@Scope注解，默认的值就是singleton，单例的。
因为一般在spring的bean的中都是注入无状态的对象，没有线程安全问题，如果在bean中定义了可修改的成员变量，是要考虑线程安全问题的，可以使用多例或者加锁来解决



#### 循环依赖
及解决方式

Spring是如何通过“三级缓存”解决单例Bean的循环依赖问题的？具体每一级缓存存放的是什么状态的Bean？如果只有两级缓存行不行？为什么？


**循环依赖是什么**：
循环依赖其实就是循环引用,也就是两个或多个bean互相依赖,形成闭环。比如A依赖于B,B依赖于A
A依赖于B，B依赖于A，注入的方式是构造函数

循环依赖会导致Spring容器在创建Bean时陷入死循环或抛出异常，特别是在构造函数注入的情况下更容易出现这个问题。

**Spring的循环依赖主要有两种情况**：
- 构造函数注入的循环依赖。这种情况下，Spring在创建Bean时发现循环依赖后会抛出异常，因为Spring无法解决通过构造函数注入的循环依赖。
- 由于bean的生命周期中构造函数是第一个执行的，spring框架并不能解决
- 构造函数注入要求所有依赖在实例化Bean时必须完整，所以无法解决这种类型的循环依赖。
- 属性注入的循环依赖。这是Spring可以自动解决的，因为Spring容器会先实例化Bean（即创建Bean的半成品），然后再注入属性。当Spring在创建Bean时遇到循环依赖，它会先创建一个半成品Bean并放入三级缓存中，使其他依赖可以先引用到这个半成品，从而避免循环依赖。


解决循环依赖的建议是，尽量使用属性注入而非构造函数注入。

**Spring的三级缓存机制通过以下缓存解决循环依赖**：Spring通过提前暴露对象引用的方式结合三级缓存解决循环依赖（仅限单例且非构造器注入）。

**三级缓存结构**：
一级缓存 `singletonObjects`单例池，存放已经经历了完整的生命周期，完全初始化好的的成品Bean；作用：限制bean在beanFactory中只存一份，即实现singleton scope
二级缓存 `earlySingletonObjects`缓存早期的bean对象，用于存储生命周期还没走完，实例化但未完全初始化的半成品Bean）；
三级缓存 `singletonFactories`，用于存放Bean工厂对象 `ObjectFactory`，`ObjectFactory`负责创建实例化但未初始化的半成品Bean，并暴露其引用供其他Bean使用。

**运行机制**：
A实例化后，将其ObjectFactory放入三级缓存，注入B时触发B的创建；
B实例化后注入A，从三级缓存获取A的ObjectFactory并执行，生成A的早期引用放入二级缓存并清除三级缓存；
B完成初始化放入一级缓存；
A获取完整的B完成初始化并放入一级缓存。

当一个Bean被创建时，如果发现依赖的Bean未完全初始化，Spring会先尝试从一级缓存获取已初始化的Bean。
如果未找到，Spring再从二级缓存获取实例化但未完全初始化的Bean，
如果还未找到，则通过三级缓存获取Bean工厂对象并创建一个半成品Bean，以满足循环依赖需求。
这样，所有互相依赖的Bean都可以顺利完成初始化。

**只有两级缓存行不行？**：如果系统没有AOP代理需求，两级缓存即可。但如果有AOP，Bean的代理对象通常在初始化后的后置处理器中生成；为了在发生循环依赖时尽早暴露代理对象的引用，而不是原始对象的引用，必须引入三级缓存的 `ObjectFactory` 来延迟触发代理对象的提前生成，从而保证注入给其他Bean的是正确的代理对象，且不破坏正常的Bean生命周期设计。





![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100356.png)
![](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100608.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100403.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100519.png)





![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100706.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223100730.png)

```java
//单实例对象注册器
public class DefaultSingletonBeanRegistry extends SimpleAliasRegistry implements SingletonBeanRegistry {
    private static final int SUPPRESSED_EXCEPTIONS_LIMIT = 100;
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap(256); // 一级缓存
    private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap(16); // 二级缓存
    private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap(16); // 三级缓存
}
```


关于@lazy
Spring中的@Lazy懒加载能否解决循环依赖问题?
https://blog.csdn.net/zzzzzengjf/article/details/141953708

#### BeanFactory和ApplicationContext
BeanFactory和ApplicationContext有什么本质区别？在实际源码中它们是如何协同工作的？

 **本质区别**：
 - `BeanFactory` 是Spring内部最底层的核心接口，提供基础的IOC/DI功能，采用延迟加载（懒加载）策略，即调用 `getBean()` 时才实例化Bean；
 - `ApplicationContext` 是 `BeanFactory` 的子接口，面向开发者，除了包含后者的所有功能，还扩展了AOP集成、国际化（i18n）、事件发布、Environment环境配置等企业级特性，且默认采用预加载策略，在容器启动时就完成所有单例Bean的实例化。
 
 **协同工作机制**：
 在源码中，它们是**组合（委派）关系**。
 `ApplicationContext`（如 `AnnotationConfigApplicationContext` 或 `ClassPathXmlApplicationContext`）内部持有一个 `DefaultListableBeanFactory` 实例。
 `ApplicationContext` 将核心的Bean注册、创建、依赖注入等工作直接委派给底层的 `DefaultListableBeanFactory` 去执行，自身则专注于上下文环境的构建和附加功能的增强。



### AOP面向切面编程
（Aspect-Oriented Programming）面向切面编程
#### 介绍
**资料**：
史上最完整的AOP底层原理 https://www.bilibili.com/video/BV1SY41117zq


请解释AOP中的核心概念（Aspect、Pointcut、Advice、Joinpoint、Weaving）。


**是什么**
AOP称为面向切面编程，用于将那些与业务无关，但却对多个对象产生影响的公共行为和逻辑，抽取并封装为一个可重用的模块，这个模块被命名为“切面”（Aspect）
通过切面（Aspect）和切入点（Pointcut）来定义横切关注点，方便实现事务管理、日志记录等功能。

把一些横切关注点（cross-cutting concerns）从核心业务逻辑中剥离出来，用“切面”的方式独立定义，然后在需要的地方横向织入业务流程。
（我觉得这个定义挺傻逼的，后面那些概念也挺傻逼的，不说人话，其实就是把一些重复用到的又不和业务逻辑有关的代码抽离出来，比如日志记录参数、返回值、耗时等很多地方都会用到，但是日志记录这部分和业务逻辑又不会有关联，只是记录，对于实现这些功能的代码，在某个地方写一次，然后通过一些方式，重复使用）

面向切面编程，用于将那些与业务无关，但却对多个对象产生影响的公共行为和逻辑，抽取公共模块复用，降低耦合


**核心概念**：
- **Aspect（切面）**：封装横切关注点（如日志、事务、权限）的类。
- 切面（Aspect）：一个类，就是封装通用逻辑的模块，里面定义了切点 + 通知。
- **Pointcut（切入点）**：用于定义拦截规则的表达式，决定在哪些具体的Joinpoint上应用增强逻辑。
- 切点（Pointcut）用定义“在哪些方法/类上”织入切面逻辑。
- **Joinpoint（连接点）**：程序执行过程中的特定位置，Spring AOP中仅支持“方法执行”这一级别的连接点。
- **Weaving（织入）**：将Aspect应用到目标对象（Target）并创建代理对象（Proxy）的过程，Spring AOP采用运行时动态织入。
- 织入（Weaving）：把切面逻辑应用到目标对象里的过程就是织入，Spring AOP 一般是基于 动态代理 的织入（JDK Proxy 或 CGLIB Proxy）。
- 目标对象（Target Object）：是被切面增强的实际业务对象。
- 代理（Proxy）是对目标对象的封装。Spring AOP通过代理模式对目标对象进行增强，通常基于JDK动态代理或CGLIB代理实现。
- **Advice（通知/增强）**：切面在特定Joinpoint执行的具体动作（分为前置、后置、环绕、异常、最终通知）。
- 通知（Advice）：定义“在什么时候”织入逻辑，常见类型：
	- `@Before` 方法执行前
	- `@AfterReturning` 方法正常返回后
	- `@AfterThrowing` 方法抛出异常后
	- `@After` 无论成功失败都会执行
	- `@Around` 环绕通知：在目标方法执行前后都可以执行代码，相当于在目标方法外层加了一个“环绕”逻辑。


**工作原理**：
使用aop中的环绕通知+切点表达式（找到要记录日志的方法），通过环绕通知的参数获取请求方法的参数（类、方法、注解、请求方式等），获取到这些参数以后，保存到数据库


**作用/优点**：
- 解耦，降低了模块间的耦合度，将一些通用功能从核心业务逻辑中分离，
- 提高代码的模块化，在不修改核心业务逻辑的情况下增强或修改程序的功能。
- 代码更简洁，减少系统中的重复代码，减少代码冗余。
- 提高代码的可维护性。
- 提高代码的复用性
- 集中管理，提高可维护性。
- 动态拓展，提高可维护性。






**AOP的环绕通知与前置通知有何区别**？
**AOP 的环绕通知（`@Around`）** 和 **前置通知（`@Before`）** 之间的主要区别如下：
- **执行时机不同**：
	- **前置通知（`@Before`）**：在目标方法执行之前执行，不能控制目标方法是否执行。它只在方法调用之前进行处理。
	- **环绕通知（`@Around`）**：它是最强大的通知类型，可以在目标方法执行之前、执行之后以及方法抛出异常时进行控制。环绕通知能够决定是否执行目标方法，并且可以在目标方法执行前后添加额外的逻辑。
- **是否可以控制目标方法的执行**：
	- **前置通知（`@Before`）**：不允许修改目标方法的执行过程，只能执行前置的逻辑，不能决定是否继续执行目标方法。
	- **环绕通知（`@Around`）**：可以控制目标方法的执行。通过 `joinPoint.proceed()` 可以决定是否执行目标方法，或者直接阻止目标方法的执行。例如，环绕通知可以在方法执行之前做判断，决定是否执行目标方法。
- **返回值**：
	- **前置通知（`@Before`）**：没有返回值。它只负责在目标方法之前执行某些逻辑。
	- **环绕通知（`@Around`）**：必须返回一个对象，通常返回目标方法的执行结果。如果没有调用 `proceed()` 方法，则没有返回值。
- **异常处理**：
	- **前置通知（`@Before`）**：如果前置通知抛出异常，会导致目标方法不执行。
	- **环绕通知（`@Around`）**：环绕通知可以处理目标方法抛出的异常，并可以决定是否继续抛出异常，或者返回默认值。
- **使用场景**：
	- **前置通知（`@Before`）**：适用于执行某些操作，比如日志记录、权限校验等，必须在方法执行之前完成的任务。
	- **环绕通知（`@Around`）**：适用于更复杂的场景，如缓存处理、事务管理、性能监控等，需要控制方法执行的时机或者方法的返回值。
- 总结：
	- **前置通知（`@Before`）**：只能在目标方法之前执行，不控制目标方法的执行。
	- **环绕通知（`@Around`）**：在目标方法执行前后都可以控制，能够决定是否执行目标方法，返回值和异常也都可以进行控制。
**总结**：前置通知主要用于方法执行前的操作，而环绕通知提供了更灵活的控制，可以在方法执行前后插入逻辑。


示例代码
**前置通知（`@Before`）**：
```java
@Aspect
@Component
public class MyAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void beforeMethod(JoinPoint joinPoint) {
        System.out.println("Before method execution");
    }
}
```

**环绕通知（`@Around`）**：
```java
@Aspect
@Component
public class MyAspect {
    @Around("execution(* com.example.service.*.*(..))")
    public Object aroundMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Before method execution");
        Object result = joinPoint.proceed();  // 执行目标方法
        System.out.println("After method execution");
        return result;
    }
}
```

#### 使用场景
你在实际项目中，除了常规的日志记录，还利用自定义注解结合AOP实现过哪些具体的业务能力（如接口防刷限流、数据权限过滤、操作审计等）？

**常见的AOP使用场景**：
- **记录操作日志**：打印方法调用参数、返回值、耗时
- 缓存处理
- **权限控制、安全校验**：进入某个方法前校验是否有权限
- **Spring中内置的事务处理**：方法执行过程中出错则回滚
- **异常处理**：统一异常捕获、格式化返回信息
- **性能监控**：方法耗时统计、调用频次统计

- **接口防重提交（幂等校验）**：自定义 `@Idempotent`，利用AOP环绕通知，将用户ID+请求接口URI+参数哈希值作为Key，利用Redis的 `setnx` 指令防止短时间内重复点击。
- **分布式限流**：自定义 `@RateLimiter` 注解（支持配置限流阈值），AOP拦截请求后通过执行Redis Lua脚本（结合令牌桶或滑动窗口算法）实现接口访问频次控制。
- **数据权限动态过滤**：自定义 `@DataPermission` 注解拦截特定业务查询方法，AOP获取当前登录用户的角色与组织架构层级后，通过 `ThreadLocal` 传递给MyBatis的拦截器，动态在原SQL尾部拼接 `where dept_id in (...)` 条件，实现无侵入的数据隔离。

**举例**：
使用举例
记录操作日志思路：获取请求的用户名、请求方式、访问地址、模块名称、登录ip、操作时间，记录到数据库的日志表中
```java
@Around("pointcut()")
public Object around(ProceedingJoinPoint joinPoint) {
    //获取用户名、请求方式、访问结果、登录IP、操作时间
    //保存到数据库（操作日志）
    return null;
}
```

统计所有 Service 方法的执行耗时,当你调用任何 `com.example.service` 包里的方法时，都会自动输出耗时日志，而不需要在每个方法里手写 `System.currentTimeMillis()`：
```java
@Aspect
@Component
public class LogAspect {
    // 切点：匹配 com.example.service 包下所有方法
    @Pointcut("execution(* com.example.service..*(..))")
    public void serviceMethods() {}
    // 环绕通知
    @Around("serviceMethods()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        // 执行原始方法
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        System.out.println(joinPoint.getSignature() + " executed in " + (end - start) + "ms");
        return result;
    }
}
```



#### 底层代理机制
Spring AOP 的底层代理机制
Spring AOP底层的动态代理机制是如何实现的？
JDK动态代理和CGLIB动态代理的核心区别是什么？
Spring Boot 2.x之后默认采用了哪种代理模式？

**底层实现**：
Spring通过 `BeanPostProcessor` 在Bean初始化后介入，解析切入点表达式，若当前Bean被匹配，则通过动态代理生成代理对象放入单例池中替代原对象。

**JDK 动态代理：** 
- JDK动态代理基于反射实现，要求目标类必须实现至少一个接口。
- AOP 在运行期在内存中动态生成一个实现了与目标类相同接口的代理类，在代理类的方法中调用 `InvocationHandler` 的 `invoke` 方法，从而织入切面逻辑。

**CGLIB 代理：** 
- 基于 ASM 字节码生成技术，不要求目标类实现接口。
- 它在运行期在内存中动态生成目标类的一个子类，并重写目标类的方法，在重写的方法中织入切面逻辑。
- 但无法代理 `final` 类或 `final/private` 方法。

**默认模式**：
- Spring Boot 2.0之后默认强制优先使用**CGLIB动态代理**（`spring.aop.proxy-target-class=true`OR`proxyTargetClass=true`）
- 以解决开发者没有为目标类实现接口导致代理生成失败的问题或类型转换异常（ClassCastException）的问题。


#### 嵌套调用

如果同一个类中，有两个方法嵌套调用，内部方法的 AOP 切面，比如：
在同一个类中，方法 A 调用方法 B，方法B上加了AOP 注解。
会生效吗？原因是什么？如何解决？


结论：内部调用时 B 的切面**不会生效**。

**原因**：
- Spring AOP是基于代理对象生效的。
- 外部调用方法A时走的是代理对象，但在方法A内部直接通过 `this.B()`调用方法B时，`this` 指向的是目标对象（Target）本身，没有经过 Spring 容器生成的代理对象，因此绕过了AOP的拦截逻辑。然无法触发代理对象中的增强逻辑。

**解决：** 
- **自我注入**（推荐）：在当前类中使用 `@Autowired` 或 `@Resource` 注入当前类本身（利用Spring处理循环依赖的机制），通过注入的代理对象实例去调用方法B。
- **AopContext上下文**：开启暴露代理配置后，使用 `((CurrentClass)AopContext.currentProxy()).B()` 获取当前线程的代理对象来调用。
- **重构代码**：将方法B抽取到另外一个专门的Service（Bean）中供方法A调用。
- 可以通过 `AopContext.currentProxy()` 获取当前的代理对象再调用 B 方法；
- 或者将方法 B 抽离到另一个 Service 类中；
- 或者在当前类中自己注入自己（Spring 支持循环依赖即可）。


### 事务管理
#### 介绍
Spring 提供了全面的事务管理支持，能确保不同组件间的操作一致性，并支持声明式事务。
其本质是通过AOP功能，对方法前后进行拦截，在执行方法之前开启事务，在执行完目标方法之后根据执行情况提交或者回滚事务。


Spring支持编程式事务管理和声明式事务管理两种方式。
- 编程式事务控制：需使用TransactionTemplate来进行实现，对业务代码有侵入性，项目中很少使用
- 声明式事务管理：声明式事务管理建立在AOP之上的。其本质是通过AOP功能，对方法前后进行拦截，将事务处理的功能编织到拦截的方法中，也就是在目标方法开始之前加入一个事务，在执行完目标方法之后根据执行情况提交或者回滚事务。


示例：

Spring 中的声明式事务：
```java
@Transactional  // 事务管理
public void transferFunds(Account from, Account to, double amount) {
    from.withdraw(amount);
    to.deposit(amount);
}
```

事务管理的本质是AOP：
```java
@Around("pointcut()")
public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    try {
        //开启事务
    //执行业务代码
    Object proceed = joinPoint.proceed();
        //提交事务
    return proceed;
    }catch (Exception e){
        e.printStackTrace();
        //回滚事务
    }
}

@Transactional

```


#### 事务传播行为
**介绍**：
事务传播行为定义了当一个事务方法被另一个事务方法调用时，事务应该如何传播。

例如：methodA事务方法调用methodB事务方法时，methodB是继续在调用者methodA的事务中运行呢，还是为自己开启一个新事务运行，这就是由methodB的事务传播行为决定的。

Spring支持7种传播行为：`REQUIRED`、`SUPPORTS`、`MANDATORY`、`REQUIRES_NEW`、`NOT_SUPPORTED`、`NEVER`、`NESTED`。

**说明**：
- **REQUIRED**（默认）：如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新事务。适用于绝大多数主干业务。
- `Propagation.REQUIRED`（默认）：**含义**：如果当前存在事务，则加入该事务；如果当前没有事务，则新建一个事务。**使用场景**：这是最常用的传播行为，适用于大多数业务方法，确保方法在事务中执行。
- **REQUIRES_NEW**：无论当前是否存在事务，都创建新事务。如果当前存在事务，将其挂起。内层事务与外层事务完全独立，拥有独立的物理连接，提交和回滚互不影响。**场景**：操作日志记录。主业务无论成功与否（甚至发生回滚），日志都必须独立持久化到数据库。
- `Propagation.REQUIRES_NEW`：**含义**：无论当前是否存在事务，都新建一个事务。如果当前存在事务，则挂起当前事务，直到新的事务提交或者回滚才恢复执行。**使用场景**：适用于需要独立事务的场景，比如日志记录、审计等，不希望被外部事务影响。
- `Propagation.SUPPORTS`：**含义**：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务方式执行。**使用场景**：适用于支持事务但不强制要求事务的方法，比如查询操作。
- `Propagation.NOT_SUPPORTED`：**含义**：以非事务方式执行，如果当前存在事务，则挂起当前事务。**使用场景**：适用于不需要事务支持的方法，比如一些只读操作或不需要回滚的操作。
- `Propagation.MANDATORY`：**含义**：如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。**使用场景**：适用于必须要在事务中执行的方法，强制要求调用方提供事务上下文。
- `Propagation.NEVER`：**含义**：以非事务方式执行，如果当前存在事务，则抛出异常。**使用场景**：适用于明确不希望方法在事务中执行的情况，强制要求调用方不能有事务。
- **NESTED**：如果当前存在事务，则在嵌套事务（Savepoint）内执行；如果当前没有事务，则执行与 `REQUIRED` 类似的操作。它是依赖于JDBC的Savepoint机制实现的，共用同一个物理连接。内层事务发生异常回滚，只会回滚到Savepoint，不会导致外层事务回滚；但外层事务回滚，会导致内层嵌套事务一起回滚。**场景**：批量数据导入。导入100条数据，每条数据一个嵌套事务，某一条失败不影响其他99条的正常提交，但如果最外层总控逻辑出错，则全部取消。
- `Propagation.NESTED`：**含义**：如果当前存在事务，则在嵌套事务内执行；如果当前没有事务，则新建一个事务（与 `REQUIRED` 类似）。嵌套事务是外部事务的一部分，它依赖于外部事务。如果外部事务回滚，嵌套事务也会回滚。但嵌套事务可以独立提交或回滚，不会直接影响外部事务。**使用场景**：适用于需要在一个事务中再进行细粒度控制的场景，比如部分操作成功、部分操作失败的情况。


**使用**：
七种事务传播行为是`org.springframework.transaction.annotation.Propagation`枚举中定义的常量。通过设置 `propagation` 属性来指定传播行为，例如：
```java
@Transactional(propagation = Propagation.REQUIRED)
public void methodA() {
    // 业务逻辑
}
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void methodB() {
    // 业务逻辑
}
```


#### 事务失效

生产级排查：请列举至少五种 @Transactional 注解失效的场景，并从AOP代理底层的角度解释为什么会失效。


**同类内部方法调用**
方法A调用同类中的方法B（带有 `@Transactional`）。**AOP原因**：Spring事务基于代理实现。同类内部调用相当于 `this.B()`，直接调用了目标对象的方法，绕过了Spring生成的代理对象，导致事务拦截器无法织入。



**修饰非public方法**
**非public方法导致的事务失效**
非public方法导致的事务失效，改为public
将注解加在 `private`、`protected` 或包可见方法上。**AOP原因**：Spring AOP底层的 `TransactionInterceptor` 在进行切入点匹配时，会严格检查目标方法的修饰符，默认只拦截 `public` 方法。
原因：Spring 为方法创建代理、添加事务通知、前提条件都是该方法是 public 的
解決：改为 public 方法


**异常捕获处理**
**异常被catch吃掉**：在业务代码中使用 `try-catch` 捕获了异常且没有向外层抛出。**AOP原因**：代理对象的事务增强逻辑依赖于捕获到目标方法抛出的异常来触发 `rollback` 操作。如果异常未抛出，AOP会认为方法正常执行完毕，从而执行 `commit`。
异常捕获处理，自己处理了异常，没有抛出，解决：手动抛出
原因：事务通知只有捉到了目标抛出的异常，才能进行后续的回滚处理，如果目标自己处理掉异常，事务通知无法知悉
解決：在catch块添加throw new RuntimeException(e)抛出


**抛出检查异常**
**异常类型不匹配**：
- 抛出检查异常，配置rollbackFor属性为Exception
原因：Spring 默认只会回滚非检查异常
解決：配置rollbackFor属性，`@Transactional(rollbackFor=Exception.class)`
抛出了 `Exception` 等非运行时异常，但未配置 `rollbackFor`。**AOP原因**：Spring默认只在遇到 `RuntimeException` 和 `Error` 时回滚。遇到受检异常时，底层的事务管理器不满足回滚条件。



**Bean未被Spring管理**：
包含 `@Transactional` 的类没有被注册为Spring的Bean（如直接 `new` 出来的对象）。**AOP原因**：没有注入IOC容器，Spring自然无法为其生成AOP动态代理对象。


**数据库引擎不支持**：
如MySQL使用了MyISAM引擎。事务的底层最终是由数据库引擎提供的，若引擎不支持，AOP的 `commit`/`rollback` 指令将无效。



举例说明：
**异常捕获处理**
```java
@Transactional
public void update(Integer from, Integer to, Double money) {
    try {
             //转账的用户不能为空
       Account fromAccount = accountDao.selectById(from);
            //判断用户的钱是否够转账
       if (fromAccount.getMoney() - money >= 0) {
            fromAccount.setMoney(fromAccount.getMoney() - money);
            accountDao.updateById(fromAccount);
            
            //异常
       int a = 1/0;

            //被转账的用户
       Account toAccount = accountDao.selectById(to);
            toAccount.setMoney(toAccount.getMoney() + money);
            accountDao.updateById(toAccount);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}

```

**抛出检查异常**
```java
@Transactional
public void update(Integer from, Integer to, Double money) throws FileNotFoundException {
       //转账的用户不能为空
    Account fromAccount = accountDao.selectById(from);
       //判断用户的钱是否够转账
    if (fromAccount.getMoney() - money >= 0) {
        fromAccount.setMoney(fromAccount.getMoney() - money);
        accountDao.updateById(fromAccount);
        //读取文件
    new FileInputStream("dddd");
        //被转账的用户
     Account toAccount = accountDao.selectById(to);
        toAccount.setMoney(toAccount.getMoney() + money);
        accountDao.updateById(toAccount);
    }
}

```

**非public方法导致的事务失效**
```java
@Transactional(rollbackFor = Exception.class)
void update(Integer from, Integer to, Double money) throws FileNotFoundException {
        //转账的用户不能为空
    Account fromAccount = accountDao.selectById(from);
       //判断用户的钱是否够转账
    if (fromAccount.getMoney() - money >= 0) {
        fromAccount.setMoney(fromAccount.getMoney() - money);
        accountDao.updateById(fromAccount);

        //读取文件
    new FileInputStream("dddd");

        //被转账的用户
    Account toAccount = accountDao.selectById(to);
        toAccount.setMoney(toAccount.getMoney() + money);
        accountDao.updateById(toAccount);
    }
}

```
#### 其它问题
Spring的声明式事务是如何保证多个DAO操作使用同一个数据库连接的？
（提示：TransactionSynchronizationManager 和 ThreadLocal 的底层配合）
Spring通过**事务同步管理器**（`TransactionSynchronizationManager`）和 `ThreadLocal` 机制来实现跨DAO层的连接共享。

其底层工作流如下：
- 当事务切面（如 `TransactionInterceptor`）拦截到事务方法开启事务时，事务管理器（如 `DataSourceTransactionManager`）会从数据源（`DataSource`）中获取一个新的数据库连接。
- 事务管理器将这个物理连接封装成一个 `ConnectionHolder`，并调用 `TransactionSynchronizationManager.bindResource()` 方法，将其绑定到当前线程的 `ThreadLocal` 中。这里的底层数据结构是一个 `ThreadLocal<Map<Object, Object>>`，Key是 `DataSource`，Value是 `ConnectionHolder`。
- 在事务方法执行过程中，无论是MyBatis的 `SqlSession`、Hibernate的 `Session` 还是纯粹的 `JdbcTemplate`，当它们需要获取数据库连接进行CRUD时，底层都会先去查 `TransactionSynchronizationManager`。
- 由于都在同一个线程内，这些DAO操作会从 `ThreadLocal` 中获取到事务开启时绑定的那个 `ConnectionHolder`，从而保证了多个DAO操作复用同一个物理连接，进而身处同一个数据库事务之中。当事务提交或回滚后，管理器会从 `ThreadLocal` 中解绑并释放该连接。


### 常用注解
@SpringBootApplication（主启动类）
@RestController（定义REST控制器）、
@RequestMapping（映射HTTP请求）、
@Autowired（依赖注入）、
@Configuration和@Bean（配置类及组件注册）。
此外还有@Service、@Repository等分层标识注解。


**声明Bean的注解**（标记类/方法为可被 IOC 管理的组件）：
- @Component：通用组件标记（所有被 IOC 管理的类的基础注解）。
- @Service：标记业务层（Service 层）组件（等价于@Component，语义更明确）。
- @Controller：标记 Web 控制器组件（等价于@Component，语义更明确）。
- @Repository：标记数据访问层（DAO 层）组件（等价于@Component，语义更明确，Spring 会自动处理数据访问异常）。
- @Configuration：标记配置类（通常用于声明@Bean方法），等价于传统 Spring 的 XML 配置文件。
- @Bean：声明一个 Bean（标注在方法上，方法返回值会被注册到 IOC 容器）。

**注入 Bean 的注解**（从 IOC 容器中获取 Bean）：
- @Autowired：Spring 原生注入注解（默认按类型注入，可配合@Qualifier按名称指定）；
- @Resource： JSR-250 标准注解（默认按名称注入，无名称时按类型注入，来自javax.annotation）；
- @Qualifier：配合@Autowired使用，指定注入的 Bean 名称（解决同类型多 Bean 的歧义问题）；
- @Primary：标记同类型 Bean 中的“主选” Bean（当@Autowired遇到多 Bean 时优先选择它）；
- @Lazy： 标记 Bean 为延迟加载（默认 IOC 启动时创建 Bean，@Lazy会在首次使用时创建）；
- @Scope：指定 Bean 的作用域（如singleton（默认单例）、prototype（多例）、request（HTTP 请求作用域）等）；


**配置管理注解**：
- @Value：读取单个配置属性（支持 SpEL 表达式），如@Value("${server.port}")；
- @ConfigurationProperties：批量绑定配置到 Java 对象（适用于复杂配置，如prefix="spring.datasource"绑定一组属性）；
- @PropertySource：加载自定义配置文件（默认加载application.properties，可用此注解加载其他文件，如@PropertySource("classpath:my-config.properties")）；
- @EnableConfigurationProperties：启用@ConfigurationProperties标记的类（通常配合@Configuration使用）

**Web开发注解-控制器与请求映射**：
@RestController：RESTful 控制器（等价于@Controller + @ResponseBody，返回数据直接序列化为 JSON/XML）；
@Controller：传统 MVC 控制器（需配合@ResponseBody返回数据，或返回视图）；
@RequestMapping：通用请求映射（可标记类或方法，指定 URL 路径、请求方法等，如@RequestMapping("/user")）；
@GetMapping：@RequestMapping(method = RequestMethod.GET)的简写（处理 GET 请求）；
@PostMapping： 处理 POST 请求（类似@GetMapping）；
@PutMapping：处理 PUT 请求；
@DeleteMapping：处理 DELETE 请求；

**Web开发注解-请求参数与响应**：
@RequestBody： 将请求体（如 JSON）反序列化为 Java 对象（用于 POST/PUT 等带请求体的请求）；
@RequestParam：读取 URL 中的查询参数（如@RequestParam("username") String name）；
@PathVariable：读取 URL 路径中的占位符（如@GetMapping("/user/{id}")配合@PathVariable("id") Long userId）；
@ResponseBody：将返回值序列化为 JSON/XML（通常配合@Controller使用，@RestController已内置此注解）；
@ResponseStatus 设置响应状态码（如@ResponseStatus(HttpStatus.CREATED)返回 201 状态码）；
@CrossOrigin： 解决跨域问题（标记类或方法，指定允许的源、方法等）；

**条件装配注解（自动配置核心）**：
@Conditional： 通用条件装配（需自定义Condition接口实现，很少直接使用）；
@ConditionalOnClass 当类路径中存在指定类时，才加载当前 Bean（如@ConditionalOnClass(DataSource.class)）；
@ConditionalOnMissingClass：当类路径中不存在指定类时，才加载当前 Bean；
@ConditionalOnBean：当 IOC 容器中存在指定 Bean 时，才加载当前 Bean；
@ConditionalOnMissingBean：当 IOC 容器中不存在指定 Bean 时，才加载当前 Bean（用于提供默认实现）；
@ConditionalOnProperty：当配置文件中存在指定属性且值符合条件时，才加载当前 Bean（如@ConditionalOnProperty(prefix="redis", name="enable", havingValue="true")）；
@ConditionalOnResource：当类路径中存在指定资源（如文件）时，才加载当前 Bean；

**拓展功能启用注解（@Enable 系列）**
- @EnableAutoConfiguration： 开启自动配置（@SpringBootApplication已包含此注解）；
- @EnableScheduling：开启任务调度（支持@Scheduled注解）；
- @EnableAsync： 开启异步方法支持（配合@Async使用）；
- @EnableCaching：开启缓存支持（配合@Cacheable、@CachePut等注解）；
- @EnableTransactionManagement： 开启声明式事务支持（配合@Transactional使用）；
- @EnableFeignClients 开启 Feign 客户端（用于微服务远程调用）；


**其它常用注解**
- @Transactional：声明事务（标记方法或类，支持事务隔离级别、传播行为等配置）；
- @Valid/@Validated：开启参数校验（配合javax.validation约束注解，如@NotBlank、@Max）；
- @Profile： 标记 Bean 仅在指定环境（如dev、prod）中生效（通过spring.profiles.active配置）；
- @Import 手动导入其他配置类或 Bean（类似 XML 中的`<import>`）；
- @Aspect 标记 AOP 切面类（配合@Pointcut、@Before等实现切面编程）；

### 其它常用注解

在类上用于实例化Bean：
- @Component
- @Controller
- @Service
- @Repository


- @Autowired： 使用在字段上用于根据类型依赖注入
- @Aspect、@Before、@After、@Around、@Pointcut： 用于切面编程（AOP）
- @Bean： 使用在方法上，标注将该方法的返回值存储到Spring容器中
- @Configuration： 指定当前类是一个 Spring 配置类，当创建容器时会从该类上加载注解
- @ComponentScan： 用于指定 Spring   在初始化容器时要扫描的包
- @Import： 使用@Import导入的类会被Spring加载到IOC容器中
- @Qualifier： 结合@Autowired一起使用用于根据名称进行依赖注入
- @Scope： 标注Bean的作用范围


### 用到的设计模式
- **工厂模式**（Factory Pattern）用于创建对象实例。Spring的IOC容器就是一个工厂模式的实现。它通过配置文件或注解管理Bean的创建和依赖注入，使得开发者不必直接使用`new`关键字创建对象。
- **单例模式**（Singleton Pattern）用于确保一个类只有一个实例。Spring的默认Bean作用域为单例模式，即在整个应用中共享同一个Bean实例。通过这种方式，Spring可以节省内存并提高性能。
- **代理模式**（Proxy Pattern）用于增强或控制对目标对象的访问。Spring AOP（面向切面编程）就大量使用了代理模式。在Spring中，可以通过JDK动态代理或CGLIB代理来创建代理对象，以在不修改原始代码的情况下添加功能，如事务管理和日志记录。
- **模板方法模式**（Template Method Pattern）用于定义算法骨架。Spring的`JdbcTemplate`、`RestTemplate`等模板类使用了模板方法模式，将通用的操作步骤封装起来，开发者只需实现自定义部分即可，这减少了重复代码，提高了代码复用性。
- 装饰器模式（Decorator Pattern）用于动态地给对象添加额外的职责。Spring的`BeanWrapper`、`DataSource`和`Transaction`相关功能都使用了装饰器模式，允许在不改变原始对象的前提下扩展功能。
- 观察者模式（Observer Pattern）用于对象间的消息通知机制。Spring的事件机制使用了观察者模式，例如，ApplicationContext可以发布事件，监听器可以监听并响应这些事件，实现组件之间的松耦合。
- 适配器模式（Adapter Pattern）用于转换不同接口之间的兼容性。Spring MVC中的`HandlerAdapter`将不同类型的处理器（如`Controller`、`HttpRequestHandler`）统一到相同的调用接口上，以支持不同的控制器类型。
- 策略模式（Strategy Pattern）用于动态选择算法。Spring中的`TaskExecutor`、`TransactionManager`等使用了策略模式，让开发者可以根据需求配置不同的执行策略或事务管理策略。
- 责任链模式（Chain of Responsibility Pattern）用于处理请求的多个处理器。Spring Security的过滤器链、Spring MVC的拦截器链都使用了责任链模式，以便多个过滤器或拦截器可以依次处理请求。
通过这些设计模式，Spring实现了高度的解耦和可扩展性，帮助开发者更方便地管理代码复杂性、提高代码的复用性和灵活性。

### 其它

### 学习资料


Spring Framework Overview :: Spring Framework： https://docs.spring.io/spring-framework/reference/overview.html


Spring微服务实战（第2版）
https://weread.qq.com/web/reader/d293298072a35387d299103
名师讲坛：Spring实战开发（Redis+SpringDataJPA+SpringMVC+SpringSecurity）
https://weread.qq.com/web/reader/64532fc071c96a44645204f

## Spring Core

- **Spring Core**是框架的核心，提供了依赖注入（DI）和控制反转（IoC）功能。
- 这是Spring应用的基础，用于管理对象的生命周期和依赖关系。
- 它通过轻量级的容器管理Bean的创建、配置和销毁，帮助开发者实现模块化设计。


## Spring Boot

### 介绍

**是什么**？
是基于Spring的快速开发工具
是Spring框架的子项目，
**Spring Boot** 是 Spring 的一个子项目，
Spring Boot集成了Spring的核心功能和Spring MVC


**做什么**？
通过 **约定优于配置** 的方式快速启动 Web 应用，而无需编写大量的配置文件。
旨在简化 Spring 应用的配置和部署，消除复杂的 XML 配置，
并且通过 **约定优于配置** 的原则让开发者能够快速启动应用程序。
预设的依赖管理



通过自动配置
通过起步依赖（Starters）引入所需的模块，
只需要写一个 `@SpringBootApplication` 注解的主类，Spring Boot 会自动设置所有所需的基础设施
通过简单的注解（如 `@SpringBootApplication`）来快速构建并运行 Web 服务



**特点**：
快速启动和运行Spring应用，不需要复杂的XML配置，
* **快速启动**：帮助你快速启动和运行应用。
无需自己手动配置很多内容。
减少了配置时间。
* Spring Boot 使得创建和配置 Spring 项目变得非常容易，开发者只需要少量的配置就能开始工作，很多基础设置（如数据库连接、Web 配置）都已为你自动配置好。
简化了Spring应用的配置开发过程，
Spring Boot让开发者无需繁琐的XML配置即可快速构建Spring应用
让开发者不需要编写大量的配置代码和样板代码。
使代码更加简洁和易于维护。




用途：
适合构建微服务架构、云原生应用等现代应用。


示例：一个简单的 Spring Boot 启动类：
```java
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```



### 示例
这是一个Java SpringBoot程序简单示例，这是一个简单API，运行后，通过浏览器访问` http://localhost:8080/api/user`,则显示`Hello, World`，访问`http://localhost:8080/api/user?name=John`，则显示`Hello, John`。
按照这个文件结构建文件夹与文件
```
JavaSpringBootDemo
│  pom.xml
│
└─src
    └─main
        └─java
            └─com
                └─example
                    └─demo
                        │  DemoApplication.java
                        │
                        └─controller
                                UserController.java
```
`pom.xml`文件中的内容：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.3.4</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>Javademo1</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>Javademo1</name>
	<description>Demo project for Spring Boot</description>
	<url/>
	<licenses>
		<license/>
	</licenses>
	<developers>
		<developer/>
	</developers>
	<scm>
		<connection/>
		<developerConnection/>
		<tag/>
		<url/>
	</scm>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
	</dependencies>
</project>
```
`DemoApplication.java`文件中的内容：
```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// http://localhost:8080/api/user
// http://localhost:8080/api/user?name=John

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

`UserController.java`文件中的内容：
```java
package com.example.demo.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/user")
    public String getUser(@RequestParam(value = "name", defaultValue = "World") String name) {
        return "Hello, " + name;
    }
}
```


**运行**
- 右键点击“JavaSpringBootDemo”这个文件夹，选择“Open Folder as IntelliJ IDEA Project”用IDEA打开这个文件夹
- 然后先点击`pom.xml`文件，然后在代码编辑区域点击鼠标右键，然后选择Maven-重新加载项目
- 加载完成后，点击`DemoApplication.java`文件，可以通过点击IDEA上边框的绿色三角按钮、代码行旁边的绿色三角按钮、代码编辑区域点击鼠标右键出现的绿色三角按钮，运行`DemoApplication`这个程序
- 运行后，通过浏览器访问` http://localhost:8080/api/user`,则显示`Hello, World`，访问`http://localhost:8080/api/user?name=John`，则显示`Hello, John`


- 为什么即使你没有在代码中显式调用 `UserController`，它仍然可以工作：
	- Spring Boot 通过其自动配置（Auto Configuration）和组件扫描（Component Scan）功能，可以自动找到你定义的 `@RestController` 类并将它注册为一个可处理 HTTP 请求的 Spring MVC 控制器。





### Spring Boot作用


当你启动 Spring Boot 应用时，后台确实启动了一个 Spring 应用程序，它负责处理很多繁琐的任务
Spring Boot 通过自动配置和注解帮你做了大量的底层工作，你才只需编写少量代码，就能实现功能完备的 API 应用。
Spring Boot 通过注解来自动配置应用，进行组件扫描，自动注册控制器、服务、仓库等各种组件。
自动配置 Web 环境和服务器（如嵌入式 Tomcat）。
自动管理依赖注入（Spring IoC 容器），找到并注册所有带注解的组件。
自动映射 HTTP 请求到相应的控制器和方法。
处理异常、响应序列化、请求参数解析等。


**提供嵌入式 Web 服务器**
内置的服务器支持（如Tomcat）、提供了 **内嵌 Web 服务器**（如 Tomcat、Jetty），让你可以不依赖外部服务器，直接在应用中嵌入服务器。
Spring Boot 提供了 **嵌入式 Web 服务器**（如 Tomcat、Jetty、Undertow 等），意味着你可以轻松启动一个 Spring 应用而不需要安装和配置外部 Web 服务器。
* **没有 Spring Boot 时**，你必须手动配置 Web 服务器（如 Tomcat 或 Jetty）。这通常意味着你需要下载和配置 Tomcat 服务器，然后将应用部署到其中。每次开发和测试时，你需要手动启动 Tomcat 并部署你的 Web 应用。
* **示例**：没有 Spring Boot，你可能需要手动配置 Tomcat 服务器，像这样：
* 安装 Tomcat。
* 在 `webapps` 目录中部署 WAR 文件。
* 配置 `server.xml` 文件来设置端口和其他参数。


- **手动配置 Spring 项目**
	- 在没有 Spring Boot 时，使用 **Spring Framework** 开发 Web 应用或企业级应用时，开发者必须手动配置许多组件和设置。你需要配置 Web 服务器、数据源、事务管理、Spring MVC、Spring Security 等。
	- **Spring 配置文件**：没有 Spring Boot，你通常需要编写大量的 **XML 配置** 或通过 Java 类来配置 Spring 的各个组件。这些配置通常会包含数据源、JDBC、事务、视图解析等。
	- 这些配置文件可能很庞大且难以维护，尤其在应用复杂时，配置项会成倍增加。
	- **示例**：没有 Spring Boot，你可能需要编写像下面这样复杂的 XML 配置文件：
 ```xml
 <beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd">
	 <!-- 数据源配置 -->
	 <bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
		 <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
		 <property name="username" value="root"/>
		 <property name="password" value="password"/>
	 </bean>
	 <!-- Spring MVC 配置 -->
	 <bean class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping"/>
	 <bean class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerAdapter"/>
	 <!-- 事务管理器配置 -->
	 <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		 <property name="dataSource" ref="dataSource"/>
	 </bean>
 </beans>
 ```

- **没有自动化的项目设置**
	- **Spring Boot** 提供了一个非常方便的方式来 **自动配置** 项目，自动为你配置了 Web 服务器（Tomcat）、数据源、Spring MVC、事务等。没有 Spring Boot 时，所有这些配置都需要手动设置。
	- **没有自动配置**：你需要自己决定是使用 `Tomcat` 还是 `Jetty`，并在项目中添加相应的配置。如果你的应用有数据库连接，你必须手动配置数据库连接池（如 HikariCP、DBCP 等），并确保应用与数据库连接。
	- **没有启动器**：Spring Boot 的启动器（`spring-boot-starter-web`）可以自动带来 Web 功能和依赖，但没有 Spring Boot，你必须显式地指定和管理项目中的所有依赖。

- **没有统一的配置管理**
	- 在没有 **Spring Boot** 时，你需要手动管理各种配置文件，并确保它们与不同的环境（如开发、测试、生产环境）一致。Spring Boot 提供了一个非常方便的配置管理机制，允许你在不同环境中使用不同的配置。
	- **没有 Spring Boot**：你需要使用 `properties` 或 `xml` 配置文件，并且需要为每个环境手动管理不同的配置文件。这可能会导致配置不一致的情况。
	- **举例**：在生产环境和开发环境中，数据库连接、API 密钥、日志级别等配置可能会不同。如果没有 Spring Boot，你需要手动创建不同的配置文件，并在代码中处理这些配置的切换。


### 自动装配
（Auto Configuration）

剖析 @SpringBootApplication 复合注解，它内部最核心的三个注解分别是什么，各自承担了什么职责？
Springboot中最高频的一道面试题，也是框架最核心的思想


只要在主类上写一个 `@SpringBootApplication`注解，很多东西（Web 容器、数据源、事务、日志、MVC 配置……）就自动准备好了，就有了一堆默认配置
- `@SpringBootApplication` 注解
- `@SpringBootApplication` 是一个组合注解，包含了以下三个重要的注解：
`@SpringBootApplication`这个注解对`@SpringBootConfiguration`、`@EnableAutoConfiguration`、`@ComponentScan`三个注解进行了封装
@SpringBootApplication是以下三个注解的组合：  

- **@SpringBootConfiguration**：继承自 `@Configuration`，将当前类标识为配置类，允许在其中通过 `@Bean` 注册组件，是Spring标准配置注解的封装。
- **`@SpringBootConfiguration`**：相当于 `@Configuration`，表明这是一个配置类。
- @SpringBootConfiguration：该注解与 @Configuration 注解作用相同，用来声明当前也是一个配置类。
- @SpringBootConfiguration：声明当前类是配置类（等价于@Configuration）；  
- 
- **@ComponentScan**：负责扫描当前包及其子包下的 `@Component`、`@Service`、`@Repository`、`@Controller` 等注解，将业务Bean自动注册到IOC容器中。
- **`@ComponentScan`**：启用了组件扫描，这意味着 Spring 会自动扫描当前包及其子包下的所有组件（例如带有 `@Component`、`@Service`、`@Controller`、`@RestController` 等注解的类），并将它们注册为 Spring 的 Bean。你的 `UserController` 类因为有 `@RestController` 注解，会被扫描到并自动注册。
- @ComponentScan：组件扫描，默认扫描当前引导类所在包及其子包。
- @ComponentScan：扫描当前包及子包下的@Component及其衍生注解（如@Service）标记的类，注册为 Bean。

- **@EnableAutoConfiguration**：Spring Boot最核心的注解，通过 `@Import(AutoConfigurationImportSelector.class)` 开启自动装配机制，负责扫描约定目录下的配置类并按需加载。
- **`@EnableAutoConfiguration`**：启用了 Spring Boot 的自动配置，Spring Boot 会根据类路径下的依赖和配置文件自动创建 Bean 并进行配置。例如，Spring Boot 会自动创建 Spring MVC 所需的相关配置。
- @EnableAutoConfiguration：开启自动配置（关键功能，让 Spring Boot 自动加载符合条件的 Bean）；  
- @EnableAutoConfiguration：
	- 是SpringBoot实现自动化配置的核心注解，让“自动装配”生效。
	- 该注解通过@Import注解导入对应的配置选择器。使应用根据类路径中的依赖和配置自动装配所需的Bean，大大简化了配置工作。
	- 它结合`@SpringBootApplication`使用时，会扫描类路径中的所有`spring.factories`文件。
	- `spring-boot-autoconfigure`包中定义了这个文件，列出了多个自动配置类，每个配置类负责特定的功能模块，比如Web、JPA、数据源等。





举个例子：数据源自动配置
- 你在 `pom.xml` 里引入了 `spring-boot-starter-jdbc`
- Spring Boot 会加载 `DataSourceAutoConfiguration`
- 检查：类路径下是否有 `DataSource` 相关类
- 检查：你是否自己定义了 `DataSource` Bean
- 如果没有 → 自动创建一个 HikariCP 连接池，并用 `application.yml` 里的参数初始化

**自动装配原理**
请深入源码级别，详细阐述Spring Boot的自动装配原理。它是如何通过 META-INF/spring.factories（或 Spring Boot 2.7+ 之后的 AutoConfiguration.imports）结合 @Conditional 系列核心注解（如 @ConditionalOnClass、@ConditionalOnMissingBean）实现按需按条件装配的？

加载所有自动配置类
- Spring Boot启动时，`AutoConfigurationImportSelector` 会被调用。其核心逻辑在 `getAutoConfigurationEntry` 方法中，通过 `SpringFactoriesLoader`（2.7之前）或 `ImportCandidates.load`（2.7之后）读取所有Jar包下 `META-INF/spring.factories` 或 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件中记录的全限定名。
	- 读取该项目和该项目引用的Jar包的的classpath路径下META-INF/spring.factories文件中的所配置的类的全类名。
	- Spring Boot 启动时会去 **`META-INF/spring.factories`** 里找配置。里面写着一大堆自动配置类（例如 `DataSourceAutoConfiguration`、`RedisAutoConfiguration`）
	- 当应用启动时，Spring Boot会在`SpringApplication.run()`过程中，利用`SpringFactoriesLoader`加载所有自动配置类，将它们作为候选配置类进行装配。

通过 **@Conditional** 系列注解进行过滤
- 加载后的配置类并不会全部生效，而是通过 **@Conditional** 系列注解进行过滤：
	- `@ConditionalOnClass` 检查类路径下是否存在特定类（判定依赖是否引入）；
	- `@ConditionalOnMissingBean` 检查容器内是否已存在同名或同类型Bean（保证用户自定义Bean优先，实现覆盖）；
	- 只有所有条件注解均匹配，该自动配置类中的 `@Bean` 定义才会被注册到IOC容器。
- Spring Boot将根据条件注解（如`@ConditionalOnClass`、`@ConditionalOnMissingBean`等）检查当前环境，决定哪些Bean需要装配。
	- 这个机制允许应用在类路径中存在某些特定类时自动配置对应的组件，比如在类路径中存在`DataSource`时自动配置数据源。
- 在这些配置类中所定义的Bean会根据条件注解所指定的条件来决定是否需要将其导入到Spring容器中。
	 - 条件判断会有像@ConditionalOnClass这样的注解，判断是否有对应的class文件，如果有则加载该类，把这个配置类的所有的Bean放入spring容器中使用。
	- 条件装配 (@Conditional)，自动配置类里不会强制生效，而是根据条件判断，这样可以做到有则用，无则自动帮你创建默认的 Bean。：
	- `@ConditionalOnClass`：类路径下是否有某个类（比如 JDBC 驱动）
	- `@ConditionalOnMissingBean`：容器里是否已经有你自定义的 Bean
	- `@ConditionalOnProperty`：配置文件里是否启用了某个开关


**自动装配过程**
在加载自动配置类时，Spring Boot根据条件注解中的条件逐步判断。若某个Bean符合所有条件，它将被注册到Spring容器中；如果条件不符合（如缺少相关类或属性），Spring Boot会跳过该Bean的注册。这种条件装配机制使得Spring Boot在不同的场景下能够动态加载不同的配置。

当所有符合条件的Bean加载完成后，Spring Boot还会在`ApplicationContext`中执行进一步的初始化工作，加载配置文件（如`application.properties`）中的属性，将其注入到Bean中，以确保Bean的配置符合实际环境需求。

Spring Boot的自动装配过程利用了`@ConfigurationProperties`注解，可以自动将配置文件中的属性绑定到Bean上，使开发者能够通过配置文件来控制Bean的行为，而无需手动修改代码。
绑定配置 (@ConfigurationProperties)，自动配置类还能把 `application.yml` 里的参数自动绑定到 Bean 上。

总结而言，Spring Boot的自动装配过程通过`@EnableAutoConfiguration`加载自动配置类，使用条件注解筛选合适的Bean并进行装配，最终将符合条件的Bean注册到容器中并配置好它们的属性。整个过程实现了“按需装配”，使得应用能够灵活适应不同环境配置，实现快速开发和轻松扩展。




**自动装配一些资料**

```java
@SpringBootApplication
public class UserApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class,args);
    }
}
```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223101145.png)



EnableAutoConfiguration：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223111811.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223111817.png)
是一个配置类
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223111824.png)
判断是否有对应字节码
判断环境中没有对应的bean
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223111829.png)














### Spring Boot Starter
什么是Spring Boot Starter？
- Spring Boot Starter是Spring Boot是一个结合了众多配置和依赖的依赖包，
**Starter** 是一种服务连接器，它打包了特定功能所需的依赖、初始化代码和自动配置，


工作机制：
- 
- 只需添加一个Starter依赖，Spring Boot就会自动配置和加载相关组件，快速引入并配置各种常见的Spring组件。

作用
- 实现了“开箱即用”。
- 简化依赖管理，开发者无需手动调整大多数细节，从而能够专注于业务开发。

**开发分布式锁Starter流程**：如果你要在公司内部架构组开发一个统一的分布式锁Starter供业务团队引入，请描述完整的开发和配置流程。
- **新建工程**：命名规范通常为 `xxx-spring-boot-starter`，包含两个模块：`autoconfigure`（逻辑实现）和 `starter`（仅依赖管理）。
- **编写配置属性类**：使用 `@ConfigurationProperties(prefix = "lock")` 映射分布式锁的中间件地址（如Redis/ZK）和超时时间。
- **编写核心业务类**：实现分布式锁的具体逻辑（如Redisson操作）。
- **编写自动配置类**：使用 `@AutoConfiguration`，在其中通过 `@Bean` 实例化锁业务类，并增加 `@ConditionalOnProperty` 等条件。
- **注册配置**：在 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 中填入自动配置类的全限定名。
- **发布使用**：业务方只需引入该Starter依赖并在配置文件中填入必要参数，即可直接注入锁服务。



主要组件（常用的Starters）：
- spring-boot-starter-web
	- 用于开发Web应用，包括MVC架构和RESTful接口。
	- 它集成了Spring MVC、Tomcat、Jackson（用于JSON处理）等，
	- 适合快速构建Web应用和API服务。
- spring-boot-starter-data-jpa
	- 它封装了Spring Data JPA和Hibernate等库，
	- 用于JPA（Java持久化API）和数据库操作，提供数据库访问和ORM功能。
	- 简化数据库交互的配置。
- spring-boot-starter-security
	- 用于引入Spring Security的安全功能，提供认证、授权、加密等一系列安全工具，
	- 适合构建安全的Web应用。
- spring-boot-starter-test
	- 包含了JUnit、Mockito和Spring Test等测试框架和工具，
	- 支持单元测试、集成测试和Mock测试，
	- 使得测试配置和运行更加方便。
- spring-boot-starter-thymeleaf
	- 用于集成Thymeleaf模板引擎，
	- 适合构建动态HTML页面的Web应用。
	- 它让视图层能更直观地渲染动态数据。
- spring-boot-starter-actuator
	- 用于监控和管理Spring Boot应用。
	- 它包含了健康检查、性能指标、日志查看等端点，
	- 可以集成到运维和监控工具中。
- spring-boot-starter-amqp
	- 用于AMQP协议的消息传递（如RabbitMQ）。
	- 它封装了Spring AMQP的相关依赖，
	- 适合构建基于消息队列的应用。
- spring-boot-starter-cache
	- 用于引入缓存管理功能。
	- 它支持多种缓存方案（如EhCache、Redis等），
	- 通过缓存加速应用的数据访问。

### 配置文件
Spring Boot启动时的配置文件（application.yml/properties）加载顺序和优先级是怎样的？
**加载优先级（由高到低）**：
- 命令行参数（如 `--server.port=9000`）；
- 操作系统环境变量；
- 外部配置文件（Jar包外的 `config/` 目录 -> Jar包外根目录）；
- 内部配置文件（Jar包内的 `config/` 目录 -> `resources/` 根目录）。同一目录下，`properties` 优先级高于 `yml`。


如何实现多环境配置的动态隔离与灵活切换？
**多环境隔离与切换**：通过命名约定 `application-{profile}.yml`（如 `application-dev.yml`、`application-prod.yml`）实现隔离。在主配置文件 `application.yml` 中使用 `spring.profiles.active: dev` 进行切换，或在生产环境启动脚本中通过 `-Dspring.profiles.active=prod` 动态指定生效的环境配置。



### 启动流程
- Spring Boot的启动流程包含了一系列自动化的初始化步骤，以便迅速启动和配置应用。

- **`main` 方法启动**： 在 `DemoApplication` 中，`main` 方法调用了 `SpringApplication.run(DemoApplication.class, args)`，这会启动 Spring Boot 应用，并触发一系列初始化过程。

- 入口触发：通过 @SpringBootApplication 主类的 main 方法调用 SpringApplication.run()。
- 这一过程从`SpringApplication.run()`方法开始。
- 首先，调用`SpringApplication.run()`方法，这是Spring Boot启动的入口。`SpringApplication`类负责初始化应用上下文并配置相关环境。

- 环境准备：加载配置、激活 Profile，确定应用运行环境。
- `SpringApplication`会准备启动环境，包括系统属性、环境变量、命令行参数和配置文件（如`application.properties`或`application.yml`）等。这个阶段会创建一个`Environment`对象，将各类属性添加到环境中，为后续Bean初始化提供配置数据。

- 上下文创建：根据应用类型（Web/非 Web）实例化对应的 ApplicationContext。
- 随后，`SpringApplication`加载并触发各种`SpringApplicationRunListener`事件，包括启动开始（`starting`）、环境准备（`environmentPrepared`）、上下文准备（`contextPrepared`）、上下文加载（`contextLoaded`）和运行完成（`started`）等阶段。Spring Boot中的一些事件监听器（Listeners）可以订阅这些事件，执行特定的初始化任务。
- 接着，`SpringApplication`会通过`ApplicationContextInitializer`对应用上下文（ApplicationContext）进行进一步初始化操作，例如Bean定义的加载和注册等。然后，它会确定应用使用的具体ApplicationContext实现类型（如`AnnotationConfigApplicationContext`或`ServletWebServerApplicationContext`），并创建相应的实例。

- **自动配置与组件扫描**： Spring Boot 自动配置会根据类路径中的依赖（例如 `spring-boot-starter-web`），自动启用与 Web 相关的配置（如嵌入式的 Tomcat 服务器、Spring MVC 配置等）。同时，`@ComponentScan` 会扫描 `com.example.demo` 包下的所有类，包括 `UserController`。
- **自动配置**：通过 @EnableAutoConfiguration 加载并过滤自动配置类，注册必要 Bean。


- **控制器注册**： Spring Boot 发现了 `UserController` 类上的 `@RestController` 注解，自动将这个控制器注册到 Spring 的 Web 上下文中，并为其绑定对应的 URL 路径（在这个例子中就是 `/api/user`）。
- **容器刷新**：完成 Bean 的注册、实例化和依赖注入，启动内置 Web 服务器（若为 Web 应用）。
- 之后，Spring Boot会扫描、实例化和注册Bean，启动自动配置。通过`@EnableAutoConfiguration`注解，Spring Boot会自动加载类路径中的配置文件和组件。根据`@Conditional`注解的条件检查，Spring Boot将决定加载哪些自动配置类，从而完成应用所需的Bean初始化。
- 启动完成后，Spring Boot会调用`ApplicationRunner`和`CommandLineRunner`接口中的`run`方法，适用于应用启动后需要立即执行的任务。

- **启动嵌入式 Web 服务器**： Spring Boot 的自动配置会启动一个嵌入式的 Tomcat 服务器（默认情况下是 Tomcat，除非你配置了其他的服务器）。服务器会监听指定的端口（默认 8080）。


- **应用就绪**：触发事件通知，执行启动后逻辑（如 CommandLineRunner），最终对外提供服务。
- 在所有Bean加载和初始化完成后，`SpringApplication`触发`ApplicationStartedEvent`和`ApplicationReadyEvent`事件，标识应用已完全启动并可以接受请求。

- **处理 HTTP 请求**： 当你访问 `http://localhost:8080/api/user` 时，嵌入式的 Tomcat 会接收请求，并将其交给 Spring MVC 来处理。Spring MVC 检查是否有控制器映射了该路径，发现 `UserController` 中的 `getUser` 方法对应于 `/api/user` 的 GET 请求，于是调用该方法并返回结果。

- 整个启动流程的目的是自动化和简化配置，使Spring Boot应用能够在几乎无需手动干预的情况下自动配置和运行。通过这一步步的自动化过程，Spring Boot将环境准备、Bean初始化、事件发布等功能串联起来，以便在最短时间内完成应用的启动并提供服务。

### 常用注解

@SpringBootConfiguration： 组合了- @Configuration注解，实现配置文件的功能
@EnableAutoConfiguration： 打开自动配置的功能，也可以关闭某个自动配置的选
@ComponentScan： Spring组件扫描
@Component、@Controller、@Service、@Repository： 使用在类上用于实例化Bean
@Autowired： 使用在字段上用于根据类型依赖注入
@Qualifier： 结合@Autowired一起使用用于根据名称进行依赖注入
@Scope： 标注Bean的作用范围
@Configuration： 指定当前类是一个 Spring 配置类，当创建容器时会从该类上加载注解
@ComponentScan： 用于指定 Spring   在初始化容器时要扫描的包
@Bean： 使用在方法上，标注将该方法的返回值存储到Spring容器中
@Import： 使用@Import导入的类会被Spring加载到IOC容器中
@Aspect、@Before、@After、@Around、@Pointcut： 用于切面编程（AOP）
@RequestMapping： 用于映射请求路径，可以定义在类上和方法上。用于类上，则表示类中的所有的方法都是以该地址作为父路径
@RequestBody： 注解实现接收http请求的json数据，将json转换为java对象
@RequestParam： 指定请求参数的名称
@PathViriable： 从请求路径下中获取请求参数(/user/{id})，传递给方法的形式参数
@ResponseBody： 注解实现将controller方法返回对象转化为json对象响应给客户端
@RequestHeader： 获取指定的请求头数据
@RestController： @Controller + @ResponseBody


Spring Boot的常用注解简化了配置和代码编写，使得Spring应用更加高效和便捷。以下是一些核心注解及其作用：
`@SpringBootApplication`是Spring Boot的核心注解，用于启动Spring Boot应用。它是一个组合注解，包含了`@Configuration`（标识配置类）、`@EnableAutoConfiguration`（自动配置应用上下文）、`@ComponentScan`（自动扫描指定包下的组件），从而简化了应用的启动配置。
`@EnableAutoConfiguration`用于自动配置Spring应用的上下文。Spring Boot根据类路径中的依赖和配置文件的内容，自动配置Bean，大幅减少了手动配置的工作量。它通常已包含在`@SpringBootApplication`中，但也可以单独使用。
`@ComponentScan`用于自动扫描和注册标注了`@Component`、`@Service`、`@Repository`、`@Controller`等注解的类。Spring Boot默认扫描应用启动类所在包及其子包，可以通过该注解的`basePackages`属性自定义扫描路径。
`@RestController`用于定义RESTful控制器，是`@Controller`和`@ResponseBody`的组合，默认将控制器方法的返回值作为HTTP响应体内容（通常为JSON格式），适合构建RESTful API。
`@RequestMapping`用于将HTTP请求映射到控制器方法上。它可以指定请求路径和方法类型（如`GET`、`POST`等），也支持路径参数等，常用于控制器方法的路由映射。
`@GetMapping`、`@PostMapping`、`@PutMapping`、`@DeleteMapping`是`@RequestMapping`的简化版本，分别对应GET、POST、PUT和DELETE请求，适合更精确地定义请求类型，提高代码可读性。
`@Autowired`用于自动注入Bean，将Spring容器中匹配的Bean自动注入到被注解的字段、构造函数或方法中，减少手动注入的代码。Spring Boot会自动根据类型匹配依赖对象，如果有多个候选对象，可以通过`@Qualifier`指定具体Bean名称。
`@Value`用于从配置文件中读取属性值，并注入到Bean的字段中。它可以绑定配置文件中的属性值，例如数据库URL、端口等，通过`@Value("${property.name}")`的方式进行赋值。
@Value("${database.url}")
假设你在 `application.properties` 文件中定义了一个数据库的 URL 配置：
database.url=jdbc:mysql://localhost:3306/mydb
加上这个注解就可以使用它：
```java
@Component
public class MyDatabaseService {
    @Value("${database.url}")
    private String dbUrl;
    public void printDbUrl() {
        System.out.println("Database URL: " + dbUrl);
    }
}
```
- `@Configuration`用于定义配置类，标识该类包含Spring容器的配置Bean定义。`@Configuration`类通常包含若干`@Bean`方法，用于创建和初始化Bean。
- `@Bean`用于定义一个Bean，并将其添加到Spring应用上下文中。可以用于配置类中，通常返回某种类型的对象，Spring容器将管理该对象的生命周期。
- `@Conditional`用于在特定条件下加载Bean。它可以结合不同的条件注解（如`@ConditionalOnProperty`、`@ConditionalOnMissingBean`等）控制Bean的创建和加载，适合根据环境、属性或依赖配置Bean。
- `@Profile`用于在特定环境下启用或禁用Bean。它根据应用的`active profile`来选择性地加载配置，适合根据开发、测试、生产环境的不同设置不同的配置或组件。
- `@EnableScheduling`用于开启Spring的任务调度功能，结合`@Scheduled`注解可以执行定时任务。
- `@EnableAsync`用于开启异步处理功能，结合`@Async`注解可以异步执行方法，提高应用的响应速度和性能。
这些注解简化了开发流程，极大地减少了配置工作，使得Spring Boot开发更加简洁高效。

### @RestController
- `@RestController` 注解
	- **`@RestController`** 是一个特殊的注解，等效于 `@Controller` + `@ResponseBody`，它标记了这个类是一个控制器，并且所有返回值将直接作为 HTTP 响应体返回（而不是视图模板）。
	- 由于 `@RestController` 被扫描并注册为 Spring 的一个 Bean，Spring MVC 会将它与 HTTP 请求映射起来。
	- 这里 `@GetMapping("/api/user")` 将 `/api/user` 这个路径的 GET 请求与 `getUser` 方法关联起来。

### 数据库
#### 初始化数据库数据
- 在Spring Boot中，有几种方式可以在启动时设置初始化数据，这对于需要默认配置、基础数据或测试数据的应用非常有用。以下是常用的几种方法：
- 使用`data.sql`和`schema.sql`文件。Spring Boot支持在类路径下的`data.sql`和`schema.sql`文件中定义SQL语句。`schema.sql`用于定义数据库结构（如表和约束），`data.sql`用于插入初始化数据。Spring Boot会在应用启动时自动执行这些SQL文件，确保数据库结构和数据被初始化。
- 使用`CommandLineRunner`和`ApplicationRunner`接口。这两个接口提供了在应用启动后执行自定义代码的机制，可以实现初始化数据的逻辑。定义一个实现`CommandLineRunner`或`ApplicationRunner`接口的Bean，在其`run`方法中编写初始化代码。Spring Boot启动时会自动执行该方法。
- 使用`@PostConstruct`注解。可以在某个Bean的初始化方法上使用`@PostConstruct`注解来实现数据初始化。当该Bean被实例化并完成依赖注入后，Spring会自动调用该方法。将初始化代码放入该方法，即可在Bean加载时执行。
- 使用`import.sql`文件。在使用Hibernate或JPA时，Spring Boot会自动检测类路径下的`import.sql`文件，并在启动时执行其中的SQL语句。这个文件通常用于数据库的DDL和DML操作。
- 使用`data.sql`和`schema.sql`、`import.sql`文件的方式较为简单，适合于固定结构和数据的初始化。`CommandLineRunner`和`@PostConstruct`适合于需要编程逻辑控制的数据初始化，如复杂的校验或条件判断。
- 总结来说，Spring Boot提供了多种数据初始化方式，可以根据需求选择简单的SQL文件或更灵活的代码初始化方式，以确保在应用启动时有适当的数据支持。

#### 使用 Redis

1. 加 Spring Data Redis 依赖
```xml
<!-- pom.xml -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```
2. 在application.yml中配置 Redis（）
```yaml
spring:
  redis:
    host: localhost
    port: 6379
```
3. 使用 RedisTemplate 操作 Redis
```java
@Autowired
private StringRedisTemplate redisTemplate;

public void demo() {
    redisTemplate.opsForValue().set("username", "martin");
    String value = redisTemplate.opsForValue().get("username");
    System.out.println("从Redis获取用户名：" + value);
}
```

- `StringRedisTemplate` 专门操作字符串
- 可以用 `RedisTemplate<String, Object>` 存储 Java 对象（需配置序列化器）


### 资料
Spring Boot 学习示例： https://github.com/ityouknow/spring-boot-examples

geekidea/spring-boot-plus: :fire: Spring-Boot-Plus is a easy-to-use, high-speed, high-efficient,feature-rich, open source spring boot scaffolding. :rocket:： https://github.com/geekidea/spring-boot-plus
ityouknow/spring-boot-examples: about learning Spring Boot via examples. Spring Boot 教程、技术栈示例代码，快速简单上手教程。： https://github.com/ityouknow/spring-boot-examples
yudaocode/SpringBoot-Labs: 一个涵盖六个专栏：Spring Boot 2.X、Spring Cloud、Spring Cloud Alibaba、Dubbo、分布式消息队列、分布式事务的仓库。希望胖友小手一抖，右上角来个 Star，感恩 1024： https://github.com/yudaocode/SpringBoot-Labs
527515025/springBoot: springboot 框架与其它组件结合如 jpa、mybatis、websocket、security、shiro、cache等： https://github.com/527515025/springBoot


## Spring MVC
### 介绍
**Spring MVC** 是 Spring 框架中专门用于 Web 开发的一个子模块

功能
处理 HTTP 请求并将其路由到相应的控制器方法
**请求路由**、**视图解析** 和 **数据绑定** 
支持丰富的视图模板


特点
基于 **前端控制器模式**（Dispatcher Servlet）
遵循模型-视图-控制器（MVC）设计模式。
将请求处理、视图渲染和业务逻辑分离，通过控制器接收请求，将数据传递到视图层显示

用途：
用于构建MVC（模型-视图-控制器）架构的应用
适合构建RESTful服务和Web应用。






  

### 组件
Spring MVC 的核心组件包括：
* **Controller**：处理 HTTP 请求的类。
* **DispatcherServlet**：前端控制器，用于接收请求并将其分发到适当的 Controller。
* **View Resolver**：将数据渲染到客户端的视图（通常是 HTML、JSON、XML 等）。
* **Model**：封装数据的对象，用于与视图交互。


- **DispatcherServlet**是Spring MVC的前端控制器，用于接收所有的请求并将其转发到适当的处理器。它是整个Spring MVC框架的核心，负责请求的分发和响应的生成。
- **Handler Mapping**（处理器映射器）负责将请求映射到相应的处理器（Controller）。当`DispatcherServlet`收到请求后，`Handler Mapping`会根据请求的URL或其他信息，找到相应的控制器方法。
- **Controller**（控制器）是请求处理的核心组件。控制器包含业务逻辑和请求处理方法，通常使用`@Controller`或`@RestController`注解定义。控制器接收请求数据，处理逻辑，返回数据或视图名。
- **HandlerAdapter**（处理器适配器）是一个适配器接口，负责适配不同类型的处理器。它使得`DispatcherServlet`可以调用不同类型的控制器（例如注解控制器或接口控制器）来处理请求。
- **View Resolver**（视图解析器）负责将控制器返回的视图名解析为具体的视图实现。它决定了视图文件的路径和格式，例如JSP、Thymeleaf、Freemarker等。视图解析器将逻辑视图名转化为具体的视图对象，用于最终的响应呈现。
- **View**（视图）用于呈现最终的响应，通常是HTML页面。Spring MVC支持多种视图模板，如JSP、Thymeleaf、Velocity等，`View`对象通过与模型数据结合生成完整的响应内容。
- **ModelAndView**用于在控制器中封装模型数据和视图名。控制器返回`ModelAndView`对象，以便`DispatcherServlet`将数据和视图传递给视图解析器，生成最终响应。
- **Model**是一个数据容器，用于在控制器和视图之间传递数据。Spring MVC会将控制器方法返回的数据自动添加到`Model`中，使得视图可以访问这些数据。
- **Exception Resolver**（异常解析器）用于处理控制器方法中抛出的异常。它将异常映射到相应的错误视图或错误响应，提供灵活的异常处理机制。
- **MultipartResolver**用于处理文件上传。它将多部分请求解析为上传的文件对象，并将文件数据注入到控制器方法中。
- **LocaleResolver**和**ThemeResolver**分别用于国际化和主题管理。`LocaleResolver`根据请求决定语言环境，`ThemeResolver`允许应用设置和管理不同的主题风格。
这些组件共同构成了Spring MVC的完整框架。通过配置和组合这些组件，Spring MVC可以灵活处理各种Web应用需求。



### 执行流程

**示例**：处理 HTTP 请求的 Spring MVC 控制器：
```java
@Controller
@RequestMapping("/api")
public class UserController {
  @GetMapping("/users")
  public List<User> getUsers() {
	  // 处理 GET 请求，返回用户列表
	  return userService.getAllUsers();
  }
  @PostMapping("/users")
  public User createUser(@RequestBody User user) {
	  // 处理 POST 请求，创建用户
	  return userService.createUser(user);
  }
}
```


Springmvc的执行流程是这个框架最核心的内容
- 视图阶段（老旧JSP等）
- 前后端分离阶段（接口开发，异步）

视图阶段（JSP）

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223101025.png)

前后端分离阶段（接口开发，异步请求）
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223101041.png)

（版本1：视图版本，jsp）

- 用户发送出请求到前端控制器DispatcherServlet
- DispatcherServlet收到请求调用HandlerMapping（处理器映射器）
- HandlerMapping找到具体的处理器，生成处理器对象及处理器拦截器(如果有)，再一起返回给DispatcherServlet。
- DispatcherServlet调用HandlerAdapter（处理器适配器）
- HandlerAdapter经过适配调用具体的处理器（Handler/Controller）
- Controller执行完成返回ModelAndView对象
- HandlerAdapter将Controller执行结果ModelAndView返回给DispatcherServlet
- DispatcherServlet将ModelAndView传给ViewReslover（视图解析器）
- ViewReslover解析后返回具体View（视图）
- DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）
- DispatcherServlet响应用户

（版本2：前后端开发，接口开发）
- 用户发送出请求到前端控制器DispatcherServlet
- DispatcherServlet收到请求调用HandlerMapping（处理器映射器）
- HandlerMapping找到具体的处理器，生成处理器对象及处理器拦截器(如果有)，再一起返回给DispatcherServlet。
- DispatcherServlet调用HandlerAdapter（处理器适配器）
- HandlerAdapter经过适配调用具体的处理器（Handler/Controller）
- 方法上添加了@ResponseBody
- 通过HttpMessageConverter来返回结果转换为JSON并响应

### Interceptor（拦截器）
Spring MVC拦截器（Interceptor）用于在请求进入控制器之前、处理请求之后以及视图渲染之前，插入自定义逻辑。它类似于过滤器，但比过滤器更灵活和精确，能够针对控制器的执行环节提供切入点。拦截器通常用于实现日志记录、权限验证、性能监控等功能，从而提高应用的可扩展性和可维护性。
Spring MVC拦截器通过实现`HandlerInterceptor`接口来定义，并通过重写接口中的三个方法实现不同阶段的逻辑：
`preHandle`方法在请求到达控制器之前执行。它通常用于权限检查、参数验证等操作。如果`preHandle`返回`true`，请求将继续执行；如果返回`false`，请求将被中断，不会进入控制器。
`postHandle`方法在控制器方法执行完毕后执行，但在视图渲染之前调用。它通常用于处理返回数据或添加模型数据。此时可以修改模型数据，以便在视图中展示。
`afterCompletion`方法在视图渲染完成后调用。它适用于清理资源、日志记录等操作。无论请求是否成功处理，`afterCompletion`都会被调用，因此适合放置最终执行的逻辑，如异常处理、清理等。
Spring MVC的拦截器链支持多个拦截器，按配置顺序依次执行。拦截器链允许多个拦截器按顺序处理同一请求，每个拦截器的`preHandle`方法按顺序执行，而`postHandle`和`afterCompletion`方法则按相反顺序执行。
配置拦截器时，可以在`WebMvcConfigurer`的`addInterceptors`方法中注册拦截器，并指定需要拦截的URL模式。例如，拦截所有请求或特定路径下的请求。Spring MVC拦截器可以灵活地应用到不同的URL路径，还可以结合条件过滤特定的请求，满足不同的应用场景需求。

### 常用注解

@RequestMapping： 用于映射请求路径，可以定义在类上和方法上。用于类上，则表示类中的所有的方法都是以该地址作为父路径
@RequestBody： 注解实现接收http请求的json数据，将json转换为java对象
@RequestParam： 指定请求参数的名称
@PathViriable： 从请求路径下中获取请求参数(/user/{id})，传递给方法的形式参数
@ResponseBody： 注解实现将controller方法返回对象转化为json对象响应给客户端
@RequestHeader： 获取指定的请求头数据
@RestController： @Controller + @ResponseBody



- `@Controller`用于定义控制器类，将类标识为Spring MVC的控制器。Spring容器会将带有此注解的类扫描为一个Bean，并用于处理Web请求。
- `@RestController`是`@Controller`和`@ResponseBody`的组合注解，通常用于RESTful API开发。它表示该控制器中的所有方法默认返回JSON或XML等格式的响应数据，而非视图页面。
- `@RequestMapping`用于映射请求URL到指定的控制器类或方法上。可以应用在类和方法级别，并支持配置请求方式（如`GET`、`POST`）、URL路径参数等。方法级的`@RequestMapping`更常见，定义方法与特定URL的映射关系。
- `@GetMapping`、`@PostMapping`、`@PutMapping`、`@DeleteMapping`是`@RequestMapping`的简化注解，分别对应GET、POST、PUT和DELETE请求。适用于更明确的请求方式绑定，增加了代码的可读性和维护性。
- `@RequestParam`用于绑定HTTP请求中的查询参数到方法参数上。可以指定默认值和是否为必填项，常用于GET请求的参数绑定，例如绑定`URL?name=value`中的`name`。
- `@PathVariable`用于绑定URL路径中的变量到方法参数上，常用于RESTful API。例如，`/user/{id}`中的`{id}`可以通过`@PathVariable`绑定到方法参数中。
- `@RequestBody`用于接收请求体中的数据，并将其绑定到方法参数上。通常用于POST请求，配合`@RestController`或`@ResponseBody`注解将JSON格式的数据转换为Java对象。
- `@ResponseBody`用于将控制器方法的返回值直接作为HTTP响应体，常用于返回JSON或XML数据。它可以单独使用在方法上，也可以配合`@Controller`在类上使用。
- `@ModelAttribute`用于将请求参数绑定到模型对象上，并将该对象添加到模型中，便于在视图中访问。可应用在方法和参数上，通常用于表单数据的接收和处理。
- `@SessionAttributes`用于声明需要存储在HTTP会话（Session）中的模型属性。Spring会将指定的属性添加到Session中，适合跨请求保存用户会话数据。
- `@ExceptionHandler`用于定义异常处理方法，捕获并处理控制器中的异常。可以在类或方法上使用，通常配合`@ControllerAdvice`全局异常处理器进行使用。
- `@ControllerAdvice`用于定义全局控制器增强功能，通常用于全局异常处理、数据绑定配置等。带有`@ControllerAdvice`的类可以包含多种增强功能，应用于整个应用的控制器。

### `@FeignClient`
- **`@FeignClient`** 是用于调用其他服务的远程 API，通常在微服务架构中用于服务间通信。
- **用途**：用于创建一个声明式的 HTTP 客户端，通过接口与远程服务通信。
- **典型用法**：调用远程 RESTful 服务（通常是微服务架构中的其他服务）。
- **特性**：通过接口方法定义 HTTP 请求，Feign 自动实现这些接口，并发送请求。
- **示例**：
    
    JAVA
    
    `@FeignClient(name = "customer-service", url = "http://customerservice") public interface CustomerClient {     @GetMapping("/customer/info/{id}")     Customer getCustomerById(@PathVariable("id") Long id); }`
    
- **功能**：简化 HTTP 请求的调用，易于集成负载均衡和熔断器等机制。



### `@RestController`
- **`@RestController`** 是用于暴露本地 API，处理来自客户端的请求。
- **用途**：用于标记一个类为 Spring MVC 的控制器，处理 HTTP 请求并返回数据。
- **典型用法**：定义本地的 RESTful API 服务。
- **特性**：结合 `@RequestMapping`，可以指定 URL 路径和请求方法（GET、POST 等）。
- **示例**：
    
    JAVA
    
    `@RestController @RequestMapping("/customer/info") public class CustomerInfoController {          @GetMapping("/{id}")     public Customer getCustomerById(@PathVariable Long id) {         // 处理逻辑         return customerService.findById(id);     } }`
    
- **功能**：接受 HTTP 请求、处理业务逻辑、返回 JSON/XML 等格式的数据。

## Spring Cloud

### 介绍
- **Spring Cloud**扩展了Spring的功能，专注于分布式系统和微服务架构。它提供了一套解决方案，用于服务发现、负载均衡、配置管理、断路器等，使得开发者能够快速构建可靠的微服务系统。

**Spring Cloud** 提供了一系列用于构建微服务架构的工具和框架，帮助处理分布式系统中的网络请求。它包括服务发现（Eureka）、配置管理（Config Server）、负载均衡（Ribbon）、断路器（Hystrix）等功能，能够使你更容易地构建和管理微服务应用。
**服务间通信**：在微服务架构中，Spring Cloud 使得服务之间可以通过 HTTP 或消息队列进行通信，处理跨服务的网络请求。
**示例**：使用 Spring Cloud 进行服务注册与发现：
```java
@EnableEurekaClient
@SpringBootApplication
public class MyServiceApplication {
  public static void main(String[] args) {
	  SpringApplication.run(MyServiceApplication.class, args);
  }
}
```

### 5大组件
基础的内容考察
回答原则：简单的问题不能答错（一道面试题就能淘汰一个人）新手和老手都要注意

通常情况下：
- Eureka   : 注册中心
- Ribbon  : 负载均衡
- Feign     : 远程调用
- Hystrix :  服务熔断
- Zuul/Gateway  : 网关
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223204421.png)

随着SpringCloudAlibba在国内兴起 , 我们项目中使用了一些阿里巴巴的组件 
- 注册中心/配置中心 Nacos
- 负载均衡 Ribbon
- 服务调用 Feign
- 服务保护 sentinel
- 服务网关 Gateway

### Eureka
Spring Cloud Eureka 是一个基于 Netflix Eureka 的服务发现和注册机制，
是 Spring Cloud 生态系统中的重要组件之一，

用于帮助微服务架构下的应用实现服务发现和自动化注册，从而实现各个服务之间的动态连接。

**Eureka 的基本概念**：
- **Eureka Server**：作为服务注册中心，所有的服务（微服务实例）向它注册并定期上报自己的状态。Eureka Server 维护一个注册表，包含了所有注册的微服务实例信息。
- **Eureka Client**：作为微服务实例，Eureka Client 启动时会向 Eureka Server 注册自己，并定期发送心跳来表明其可用性。同时，它也可以从 Eureka Server 获取其他服务的信息，以便调用其他服务的 API。

**服务注册**：
当一个微服务启动时，Eureka Client 会将自己的信息（如服务名、IP 地址、端口等）注册到 Eureka Server 中。
Eureka Server 会将这些信息存储在注册表中，以供其他服务查询和使用。

**服务发现**：
当一个微服务需要调用另一个服务时，它不是直接访问硬编码的 URL 地址，而是通过 Eureka Server 获取目标服务的实例信息。
这样，每个微服务都可以通过服务名查找到对应的服务地址，从而实现动态服务发现。

**Eureka 的高可用性**：
Eureka 支持集群模式，多个 Eureka Server 实例可以互相同步注册表信息，形成一个高可用的 Eureka 集群。
这种设计确保即使部分服务器出现故障，服务注册和发现仍然可以正常运行。

**客户端负载均衡**：
Eureka 集成了 Spring Cloud Ribbon，可以在客户端进行负载均衡。
当服务调用时，Eureka Client 会从 Eureka Server 获取目标服务的所有实例列表，并通过 Ribbon 选择一个合适的实例进行调用。
这样可以减少单点故障的风险，同时提高系统的响应效率。

**示例**：
1. Eureka Server 配置**：如何快速搭建一个 Eureka Server 作为服务注册中心
   在一个 Spring Boot 应用中配置 Eureka Server：
   ```java
   @SpringBootApplication
   @EnableEurekaServer
   public class EurekaServerApplication {
       public static void main(String[] args) {
           SpringApplication.run(EurekaServerApplication.class, args);
       }
   }
   ```
   配置文件 `application.yml`：
   ```yaml
   server:
     port: 8761
   eureka:
     client:
       register-with-eureka: false
       fetch-registry: false
     instance:
       hostname: localhost
   ```
2. Eureka Client 配置**：一个微服务注册到 Eureka Server 并从中获取其他服务的注册信息
   在另一个微服务应用中，配置它注册到 Eureka Server：
   ```java
   @SpringBootApplication
   @EnableEurekaClient
   public class MicroserviceApplication {
       public static void main(String[] args) {
           SpringApplication.run(MicroserviceApplication.class, args);
       }
   }
   ```
   配置文件 `application.yml`：
   ```yaml
   server:
     port: 8080
   eureka:
     client:
       service-url:
         defaultZone: http://localhost:8761/eureka/
   ```
   通过这种方式，当微服务启动时，它会自动向 Eureka Server 注册，并可以通过服务名来发现其他微服务。
这里有几个关于 Spring Cloud Eureka 的示例，每个示例展示了不同的功能和配置方式，帮助你更好地理解 Eureka 的应用和服务注册发现的工作原理。

**示例 3：Eureka Client 使用 RestTemplate 进行服务间调用**
这个示例展示了如何使用 `RestTemplate` 和 `Eureka Client` 从其他微服务获取数据。
3. 配置一个 Eureka Client，并在 `application.yml` 中设置 Eureka 服务器地址。
4. 在代码中注入 `RestTemplate` 并启用负载均衡：
     ```java
     @SpringBootApplication
     @EnableEurekaClient
     public class ServiceApplication {
         public static void main(String[] args) {
             SpringApplication.run(ServiceApplication.class, args);
         }
         @Bean
         @LoadBalanced
         public RestTemplate restTemplate() {
             return new RestTemplate();
         }
     }
     ```
5. 使用 `RestTemplate` 调用其他服务：
 ```java
 @RestController
 public class ServiceController {
	 @Autowired
	 private RestTemplate restTemplate;
	 @GetMapping("/get-info")
	 public String getInfo() {
		 return restTemplate.getForObject("http://other-service/api/info", String.class);
	 }
 }
 ```
这里使用了 `@LoadBalanced` 注解来启用 Ribbon 负载均衡，使 RestTemplate 能够通过服务名调用其他注册在 Eureka 上的服务。

**示例 4：高可用 Eureka Server 集群**
在微服务系统中，为了保证服务注册中心的高可用性，通常会搭建一个 Eureka 集群。
- **步骤**：
  1. 搭建多个 Eureka Server 实例，并在每个实例的配置中指向其他实例：
     ```yaml
     eureka:
       instance:
         hostname: eureka1
       client:
         service-url:
           defaultZone: http://eureka2:8761/eureka/,http://eureka3:8761/eureka/
     ```
其他 Eureka 实例的配置也相似，只需修改 `hostname` 和指向不同的实例地址。
启动多个 Eureka Server 实例，这些实例会互相同步注册表信息，形成一个高可用的 Eureka 集群。

**示例 5：Feign 客户端集成 Eureka**
这个示例展示了如何结合 Feign 和 Eureka 实现服务间的轻量级 HTTP 调用。
- **步骤**：
  1. 创建一个微服务并配置 Eureka Client。
  2. 添加 `spring-cloud-starter-openfeign` 依赖，并使用 `@EnableFeignClients` 注解启用 Feign。
  3. 定义一个 Feign 客户端接口：
     ```java
     @FeignClient(name = "other-service")
     public interface OtherServiceClient {
         @GetMapping("/api/info")
         String getInfo();
     }
     ```
  4. 在服务中使用这个接口来调用远程服务：
     ```java
     @Service
     public class InfoService {
         @Autowired
         private OtherServiceClient otherServiceClient;
         public String fetchInfo() {
             return otherServiceClient.getInfo();
         }
     }
     ```
这些示例展示了 Spring Cloud Eureka 的基础和一些常见的应用方式。通过这些示例，你可以实现基本的服务注册、服务发现，以及服务间的动态调用，从而构建一个可靠的微服务架构系统。

**总结**：
Spring Cloud Eureka 的服务发现机制简化了微服务之间的通信。它不仅使服务能够自动发现彼此，还支持客户端负载均衡和高可用性，使得微服务架构下的系统更加弹性和可靠。通过 Eureka，微服务架构可以实现自动化和动态的服务注册与发现，减少系统配置和维护的复杂性。




### 服务注册
服务注册和发现是什么意思？Spring Cloud 如何实现服务注册发现？
- 微服务中必须要使用的组件，考察我们使用微服务的程度
- 注册中心的核心作用是：服务注册和发现
- 常见的注册中心：eureka、nocas、zookeeper

我做过的哪个微服务项目，使用了哪个注册中心

Eureka的作用
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223204536.png)

服务注册和发现是什么意思？Spring Cloud 如何实现服务注册发现？

- 我们当时项目采用的eureka作为注册中心，这个也是spring cloud体系中的一个核心组件
- 服务注册：服务提供者需要把自己的信息注册到eureka，由eureka来保存这些信息，比如服务名称、ip、端口等等
- 服务发现：消费者向eureka拉取服务列表信息，如果服务提供者有集群，则消费者会利用负载均衡算法，选择一个发起调用
- 服务监控：服务提供者会每隔30秒向eureka发送心跳，报告健康状态，如果eureka服务90秒没接收到心跳，从eureka中剔除




Nacos的工作流程
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223204626.png)


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251223204606.png)


我看你之前也用过nacos、你能说下nacos与eureka的区别？
- 简历上有体现
- 面试官比较熟悉nacos和eureka
- Nacos与eureka的共同点（注册中心）
	- 都支持服务注册和服务拉取
	- 都支持服务提供者心跳方式做健康检测
- Nacos与Eureka的区别（注册中心）
	- Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式
	- 临时实例心跳不正常会被剔除，非临时实例则不会被剔除
	- Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
	- Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式
- Nacos还支持了配置中心，eureka则只有注册中心，也是选择使用nacos的一个重要原因






### 资料
Spring Cloud教程（非常详细）： https://c.biancheng.net/springcloud/


Spring Cloud微服务和分布式系统实践 https://weread.qq.com/web/reader/2fe329c071e041322feb53d



## Spring Security
安全框架
- **Spring Security**模块为应用程序提供了强大的安全支持，包括认证、授权和基于角色的访问控制。这对于保护应用中的敏感信息至关重要，通过简单的配置实现复杂的安全策略。

**Spring Security** 是一个全面的安全框架，用于处理 Web 应用中的认证、授权、会话管理等。它是 Spring Web 开发中不可或缺的一部分，用于保护网络请求，防止未授权的访问。
**功能**：
- **认证**：验证用户的身份（如登录、SSO）。
- **授权**：根据用户权限控制访问。
- **CSRF、CORS**：处理跨站请求伪造和跨域资源共享等安全问题。
**示例**：配置 HTTP 安全和基本认证：
  ```java
  @Configuration
  @EnableWebSecurity
  public class SecurityConfig extends WebSecurityConfigurerAdapter {
      @Override
      protected void configure(HttpSecurity http) throws Exception {
          http
              .authorizeRequests()
              .antMatchers("/api/**").hasRole("USER")
              .and()
              .httpBasic();  // 基本认证
      }
  }
  ```



**集成安全框架**：**Spring Security** 是 Spring 提供的用于处理认证和授权的框架。如果没有 Spring，开发者需要自己实现用户认证、权限控制、CSRF 防护等安全功能。举例：如果没有 Spring Security，你可能需要自己实现登录系统、会话管理、权限验证等：
```java
public class AuthenticationService {
  public boolean authenticate(String username, String password) {
	  // 手动实现认证逻辑
	  if ("admin".equals(username) && "password".equals(password)) {
		  return true;
	  }
	  return false;
  }
}
```



## Spring Cloud Gateway
### Reactor 模型

底层的 Reactor 模型是如何提升网关吞吐量的？
- 底层基于 Netty 框架，采用非阻塞 I/O（NIO）和 Reactor 响应式编程模型。
- **BossGroup / WorkerGroup 机制：** 少量的 Boss 线程（EventLoop）负责接收客户端的连接请求，建立连接后将其注册到 Worker 线程的 Selector 上。
- **非阻塞多路复用：** Worker 线程负责处理已就绪的 I/O 事件（读写）。线程不需要阻塞等待 I/O 操作完成，而是当网关向后端微服务发起 HTTP 请求时，当前线程被释放去处理其他请求。后端微服务响应返回后，触发回调事件，再由 EventLoop 线程继续处理并返回给客户端。这种设计用极少的线程支撑了海量的并发连接，极大提升了吞吐量。













## Spring WebFlux
**Spring WebFlux（响应式编程** 是 Spring 5 引入的响应式编程框架，主要用于处理异步的、非阻塞的 HTTP 请求。它适用于高并发场景，能够处理大量并发请求而不阻塞线程。

**异步和非阻塞**：与传统的 Spring MVC 相比，Spring WebFlux 使用 **Reactive Streams** 和 **异步处理**，能更高效地处理请求，尤其适用于大规模的网络请求处理。

**示例**：使用 Spring WebFlux 处理 HTTP 请求：
  ```java
  @RestController
  @RequestMapping("/api")
  public class UserController {
      @GetMapping("/users")
      public Flux<User> getUsers() {
          // 返回一个响应式流（异步非阻塞）
          return userService.getAllUsers();
      }
  }
  ```
在这里，`Flux` 是 Spring WebFlux 提供的响应式数据类型，可以异步地流式处理数据。






## Spring Data
- **Spring Data**模块提供了简化的数据访问层方法，支持多种数据库，如关系型数据库（JPA、JDBC）、非关系型数据库（MongoDB、Redis）等。通过Spring Data，开发者可以方便地创建CRUD操作，减少手动编写SQL的工作量。

## 其它

- JDK 动态代理的实现原理是基于接口的，要求目标类必须实现接口
- CGLIB 是通过继承目标类来实现代理的，而`final`类是不能被继承的，因此 CGLIB**无法代理 final 类**
- Spring 中的`@Autowired`注解，底层是通过反射机制来扫描和注入依赖对象的
- Spring AOP 的实现方式包含 JDK 动态代理（针对实现接口的类）和 CGLIB（针对未实现接口的类），以此来实现方法拦截


## END