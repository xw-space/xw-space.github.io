---
icon: pen-to-square
date: 2025-10-01
oeder: 0
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---

一个简单的Java基础入门教程
<!-- more -->

# Java基础

## 下载安装
下载地址-Oracle: https://www.oracle.com/java/technologies/downloads/?utm_source=chatgpt.com



## Java版本

**JavaSE**：
- JavaSE（Java Standard Edition）标准版，提供基础组件。
- JavaSE 适用于桌面应用和基础的 Java ，比如开发小型软件，如桌面应用、控制台应用、工具软件等。
- JavaSE 包括：
	- 核心库：包括集合框架、IO（输入/输出）、网络、多线程、并发处理等。
	- Java 语言的基本功能：如类、接口、继承、多态、异常处理等。
	- GUI（图形用户界面）开发：如 AWT（Abstract Window Toolkit）和 Swing 框架，用于开发桌面应用程序。
	- Java 虚拟机（JVM）：Java 程序运行的环境，提供跨平台能力。
	- 标准工具：如 javac（Java 编译器）、java（Java 启动器）等。

**JavaEE**：
- JavaEE（Java Enterprise Edition）企业版，扩展了 JavaSE，提供了企业级开发所需的各种 API 和运行时环境。
- JavaEE 主要用于开发大型的企业级应用，如电商平台、金融系统、政府应用等。
- JavaEE 包括：
	- Servlet 和 JSP（JavaServer Pages）：用于开发动态 Web 应用程序。
	- EJB（Enterprise JavaBeans）：用于开发可重用的业务逻辑组件。
	- JPA（Java Persistence API）：用于对象关系映射（ORM），简化数据库操作。
	- JMS（Java Message Service）：用于消息传递，实现异步通信。
	- JAX-RS 和 JAX-WS：用于开发 RESTful 和 SOAP Web 服务。
	- 依赖注入（CDI）：用于管理对象的生命周期和依赖关系。
	- 安全性：提供企业级的安全机制，如身份验证、授权等。
	- 事务管理：确保数据一致性和完整性。

**版本号问题**：
- (14条消息) JAVA版本号的问题 Java版本号与JDK版本_renhq-CSDN博客_jdk版本号： https://blog.csdn.net/qq_37499840/article/details/89041335
- (14条消息) JDK的版本号解惑_bisal的专栏-CSDN博客： https://bisal.blog.csdn.net/article/details/118947676
- (14条消息) java的版本_JAVA各版本的区别_weixin_39549899的博客-CSDN博客： https://blog.csdn.net/weixin_39549899/article/details/114024858

## JDK、JAR

JDK 是 Java Development Kit 的缩写，意为 Java 开发工具包。
它包含：
* 编译器（javac）
* Java 核心类库（如 java.lang、java.util）
* JVM 运行时（JRE）
* 开发工具（如 javadoc、javap、jconsole）
JDK 是开发 Java 程序的完整环境。

JAR 文件

## IDEA

### **介绍**
IDEA官方文档 https://www.jetbrains.com.cn/help/idea/getting-started.html

【intellij idea】Project Structure 讲解 - hellozay - 博客园： https://www.cnblogs.com/zadomn0920/p/6196962.html
IntelliJ IDEA（七） ：Project Structure - JaJian - 博客园： https://www.cnblogs.com/jajian/p/8081640.html
IntelliJ IDEA 学习笔记 - 常见图标介绍-CSDN博客： https://blog.csdn.net/cgl125167016/article/details/78671232
Icon reference | IntelliJIDEA Documentation： https://www.jetbrains.com/help/idea/symbols.html#file-status

### **设置**
- IDEA自己有个简单的构建工具，可通过在设置中勾选`"将IDE构建/运行操作委托给Maven(D)"`，把构建工作还给Maven
- **编辑器-代码样式-Java设置**：
	- 换行和大括号：链式方法的调研：始终换行（默认 不换行）、多行时对齐
	- 大括号位置：在类声明中：下一行（如果换行）


### **快捷键**
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

### 高级断点
掌握条件断点（Condition Breakpoints，只在特定变量值时停下）、异常断点（Exception Breakpoints，抛出特定异常时自动拦截）。

### 动态执行
熟练使用 Evaluate Expression (Alt+F8) 在调试期动态修改变量值或执行方法，以验证逻辑分支。
### 依赖管理
maven
借助 Maven Helper 等插件，通过图形化界面快速找出并 Exclude 掉冲突的 jar 包。

- 同步/加载所有 Maven 项目 (Reimport / Reload All Maven Projects)：当修改了 `pom.xml`（新增/删除依赖，修改版本号）或变成了父子模块关系，让pom.xml变化后，让IDEA 会重新读取 Maven 的依赖树，把最新的依赖、插件、模块信息加载到 IDE 里。
- 为所有项目生成源代码并更新文件夹 (Generate Sources and Update Folders)：最好在初次 clone 项目后运行一次，或者IDEA 报错找不到生成的类，但实际编译是可以通过的。
- 下载源代码和/或文档 (Download Sources and/or Documentation)：下载依赖 jar 包对应的 源码（-sources.jar） 和 Javadoc（-javadoc.jar）：第一次接触新依赖时就下载源码和文档，想要阅读第三方库的实现细节（比如 Spring, MyBatis, Guava），鼠标悬停方法时没有 Javadoc 注释



### **操作技巧**
- 写的正确但找不到依赖项：关掉IDE，重新打开一下
- IDEA高效使用教程： https://idea.javaguide.cn/tips/efficient-use-guide.html

### 文件与文件夹/.idea
- `.idea` 文件夹是 IntelliJ IDEA 用来存储项目级配置信息的目录。
- `.idea` 目录下的文件绝大多数是 XML 格式。这些文件定义了项目如何构建、如何编译、依赖库在哪里、代码风格是什么等等。
- 当 IDEA 采用Directory-based format（基于目录的格式） 管理项目时（这是目前的默认和推荐方式），它会创建这个目录。旧版本使用`.ipr` 单文件格式。


`workspace.xml` (最特殊的文件)：用户个人的工作区状态。
* 技术用途：恢复你个人的开发环境上下文。
* 窗口布局（Project 栏宽窄、打开了哪些 Tool Window）。
* 打开的编辑器标签页历史（你上次关机前停留在哪个代码文件）。
* 光标位置、本地查找记录。
* ChangeLists：本地暂存的代码修改列表。
* 绝对不能提交。因为它包含大量与代码逻辑无关的机器绝对路径和个人操作习惯，提交后会造成严重的冲突。
* `/workspace.xml`
	* 含义： 存储你个人的工作区配置。
	* 作用： 比如你打开了哪些文件、窗口大小、断点打在哪里、上次运行的配置等。这是最需要被忽略的文件之一。

**`modules.xml`**：
项目的“骨架”描述文件。它告诉 IDEA 这个项目由哪些模块（Module）组成。IDEA 启动时读取此文件，根据路径去加载各个模块的详细配置。包含 `<modules>` 标签，内部列出了当前项目所有 `.iml` 文件的路径。
* 示例内容：
```xml
<modules>
  <module fileurl="file://$PROJECT_DIR$/my-app.iml" filepath="$PROJECT_DIR$/my-app.iml" />
</modules>
```

**`misc.xml`**：杂项配置，包含关键的项目级设置。
* Project SDK：定义项目使用的 JDK 版本（如 Java 17）和类型。
* Output Path：定义项目编译输出的根目录（通常是 `out` 目录，虽然后来 Maven/Gradle 项目多用 `target`/`build`，但此配置依然存在）。
* 示例内容：
```xml
<component name="ProjectRootManager" version="2" languageLevel="JDK_17" project-jdk-name="17" ...>
  <output url="file://$PROJECT_DIR$/out" />
</component>
```


`compiler.xml`：定义 Java 编译器的行为。
* Compiler Configuration：指定使用哪种编译器（Javac, Eclipse ECJ 等）。
* Bytecode Version：指定每个模块编译后的 `.class` 文件兼容的 Java 版本（Target Bytecode Version）。
* Annotation Processing：Lombok 或 MapStruct 等注解处理器的配置开关。
* 技术用途：这是导致“本地运行没问题，线上报错 `Unsupported major.minor version`”的常见原因之一。它控制了 javac 的 `-target` 和 `-source` 参数。
* 示例内容：
```xml
<component name="CompilerConfiguration">
  <annotationProcessing>
    <profile default="true" name="Default" enabled="true" />
  </annotationProcessing>
  <bytecodeTargetLevel target="17" />
</component>
```


`encodings.xml`：字符集编码设置。定义项目、特定文件或 Properties 文件的编码格式（通常是 UTF-8）。




`vcs.xml`：版本控制系统映射配置。定义项目的根目录对应哪个 VCS 工具（Git, SVN, Mercurial）。
* 示例内容：
```xml
<mapping directory="$PROJECT_DIR$" vcs="Git" />
```

* `*.iml` 和 `//.iml`
	* 含义： IDEA 的模块（Module）配置文件。
	* 作用： 描述项目的依赖路径等。在现代 Maven/Gradle 项目中，这些文件是可以随时自动生成的，通常建议忽略，保持仓库整洁。


* `/dataSources/` 和 `/dataSources.local.xml`
	* 含义： IDEA 右侧 "Database" 面板的配置信息。
	* 作用： 这里面通常包含你连接数据库的 URL、驱动版本，甚至加密后的数据库密码。必须忽略，否则会泄露敏感信息。


* `/shelf/`
	* 含义： 存放 IDEA "Shelve Changes"（搁置修改）功能的临时文件。
	* 作用： 当你不想提交代码但又想切分支时，把代码“搁置”在本地，生成的临时文件就在这里。
* `/httpRequests/`
	* 含义： IDEA 自带的 HTTP Client（类似于 Postman 的工具）的请求历史和响应缓存。
	* 作用： 避免把你本地测试接口的临时结果提交上去。

`libraries/`：存放项目依赖的第三方库（Jar包）的元数据。每个 XML 文件对应一个依赖库，定义了该库的 `CLASSES`（Jar包路径）、`SOURCES`（源码路径）和 `JAVADOC`（文档路径）。
* 注意：在 Maven/Gradle 项目中，这个文件夹的内容是根据 `pom.xml`/`build.gradle` 自动生成的。
* 技术用途：让 IDEA 知道当你写 `import org.apache.commons...` 时，应该去磁盘的哪个位置加载类文件，以及当你按 `Ctrl+Click` 时去哪里找源码。

`runConfigurations/`：共享的运行/调试配置。XML 文件，定义了 Main 类、VM 参数（`-Xms`）、环境变量、Program Arguments 等。
* 默认情况下，Run Configuration 存储在 `workspace.xml` 中（不共享）。
* 如果在 IDEA 运行配置里勾选了 "Store as project file"，配置就会被提取到这个文件夹中。
* 场景：团队共享统一的启动参数，方便新人一键启动服务。


`codeStyles/`：代码格式化规则。缩进是用 Tab 还是空格、括号是否换行、Import 的排序规则等。
* 技术用途：通过 `Project.xml` 里的 Scheme 引用，确保团队成员按下 `Ctrl+Alt+L` 格式化代码时，结果是一致的。

`inspectionProfiles/`：代码检查（Lint）规则。定义哪些警告是 Error，哪些是 Warning，哪些忽略（例如：拼写检查是否开启，是否允许魔法值）。




### **使用问题**
- 问题信息乱码：Windows 控制台默认是 GBK 编码，但IDEA 默认用 UTF-8 编译运行 Java 程序，更改IDEA设置或者更换JDK，从 JDK 18 开始，默认编码就是 UTF-8，所以不会再出现 UTF-8/GBK 不一致的问题
- 下载依赖项很慢：解决IDEA中Maven下载依赖包过慢或报错的问题-csdn： https://blog.csdn.net/weixin_40276431/article/details/136250858


## Eclipse
### 文件与文件夹含义

* `//.settings/`：Eclipse 的各种插件和编译器设置。
* `//.project`：Eclipse 的项目描述文件（类似 IDEA 的 `.iml`）。
* `//.classpath`：Eclipse 的依赖路径配置。
* `//.externalToolBuilders/`：Eclipse 外部构建工具配置。

## Maven
* Maven 核心机制与依赖原则：
    * 生命周期： 清晰理解 Clean、Compile、Test、Package、Install、Deploy 阶段，执行后续阶段会自动触发前面的阶段。
    * 依赖冲突解决： 理解 Maven 的“最短路径优先”和“第一声明优先”原则。熟练在 `<dependency>` 中使用 `<exclusions>` 标签解决常见的日志框架冲突（如 slf4j 冲突）或版本不一致问题。

Download Apache Maven – Maven
https://maven.apache.org/download.cgi

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


## Gradle

Gradle 是另一个现代化的 Java **构建工具**，比 Maven 更灵活、性能更高，支持更多语言。
特点如下：
* 使用 Groovy 或 Kotlin DSL 脚本，比 XML 更简洁。
* 支持增量构建和并行构建。
* 被 Android Studio 默认采用（用于构建 Android 应用）。
* 比 Maven 更适合复杂项目或多语言项目。


## 基础中的基础

### 程序运行

简单程序是由 javac 将代码文本变成字节码再 java 跑；


项目的话，是 
Maven（或 Gradle）先把项目（和依赖）编译/准备好，再由 java 用正确的 classpath 去运行。
点 Run 时，IDE 就是在背后帮你执行「编译这一步 + 拼好 classpath 再执行 java」这两件事。


### 输出-代码
**输出**：
```Java
// 输出内容，不换行。
System.out.print("Hello");
// 输出内容，并自动换行。
System.out.println("Hello");
// 格式化输出
int age = 25;
double d = 1.2345;
System.out.printf("Name: %s, Age: %d\t", name, age);
// 输出：Name: Tom, Age: 25
String name = "Tom";
System.out.printf("小数：%f只保留2位是：%.2f\n", d, d);
// 小数：1.234500只保留2位是：1.23
```

### 数据类型

**基本数据类型**
基本数据类型直接表示变量的值，它们存储的是实际的数据值。
整型：byte、short、int、long
浮点型：float、double
布尔型：boolean
字符型：char
对应的包装类为Byte、Short、Integer、Long、Float、Double、Character、Boolean
int：表示整数类型，占4个字节，范围大约是 -2^31 到 2^31-1。
float：表示单精度浮点数，占4个字节。常用于需要小数的场合，精度较低。
double：表示双精度浮点数，占8个字节。用于需要更高精度的小数。
char：表示单个字符，占2个字节，用Unicode表示字符。
boolean：表示布尔类型，只有两个值：true和false，占1个字节。
byte：占1个字节，表示范围从 -128 到 127，适用于需要节省内存的情况。
short：占2个字节，表示范围从 -32,768 到 32,767。
long：占8个字节，表示较大的整数范围。

**基础数据类型的转换**
自动类型转换：小->大byte-->short--> int--> long-->float-->double
强制类型转换：大->小 小类型 变量名 =（大类型）值
注意：自增/自减运算符、复合赋值运算符底层做了优化，内部自动强制类型转换；如：++，--，+=，-=，.....

**引用数据类型**
引用数据类型是指对象类型，它存储的是对象的引用（地址），而不是实际的数据。
类（Class）：可以包含属性、方法、构造方法等。
接口（Interface）：用于定义一组约定，类可以实现接口。
数组（Array）：固定大小的数据集合，可以存储多个相同类型的元素。

**包装类型**
为了在对象环境中使用基本类型，Java提供了对应的包装类型。基本类型直接存储数据值，在栈上分配内存，占用固定的内存空间，包装类型是对象动态分配内存，在堆上创建，包含额外的信息，例如方法和字段，同时也占用更多的内存空间。
不过Java提供了自动装箱（autoboxing）和拆箱（unboxing）的功能，使得基本类型和包装类型之间的转换更加方便。

**自动装箱和自动拆箱**
自动装箱是指将基本类型转换为对应的包装类型，而自动拆箱是指将包装类型转换为对应的基本类型。这些转换通常由编译器自动处理。
自动装箱
Integer intValue
42；//将基本类型int自动转换为Integer包装类型自动拆箱
int primitiveValue intValue；
/将Integer包装类型自动转换为基本类型int装箱其实就是调用了包装类的valueof（）方法，拆箱其实就是调用了xxxValue（）方法。
注意：
所有整型包装类对象之间值的比较使用equals方法比较。

### 数组Arrays
所在位置：`java.util.Arrays`
**工具类**，里面全是 `static` 方法（比如 `sort()`、`asList()`、`binarySearch()`）。
主要作用是操作 **数组**（`array`），和集合不一样。

提供了一些方法将数组转换为集合：
- `asList(T... a)`：将数组转换为固定大小的`List`。注意：返回的`List`是由原数组支持的，修改会影响原数组，且大小固定，不能添加或删除元素。

```java
// 数组相关的包
import java.util.Arrays;
// 声明数组
int[] arr = new int[5];
int[] arr = new int[]{1, 2, 3, 4, 5};
// 声明二维数组
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
// 填充数组
Arrays.fill(arr, 10);
// 获得数组的大小
int length = arr.length;
// 遍历数组
for (int element : arr) {
    System.out.println(element);
}
// 数组排序
Arrays.sort(arr);
// 判断两个数组是否相等
boolean isEqual = Arrays.equals(arr1, arr2); 
// 复制数组的两种方式（可指定长度）
int[] src = {1, 2, 3, 4, 5};
int[] dest = new int[5];
System.arraycopy(src, 0, dest, 0, src.length);
int[] dest = Arrays.copyOf(src, src.length);
// 克隆数组（完全复制一个一模一样的）
int[] clonedArr = arr.clone();
// 将数组转换为List
List<String> list = Arrays.asList(arr);
// 将数组转换为String
String str = Arrays.toString(arr); 
// 将数组转换为Set
Set<String> set = new HashSet<>(Arrays.asList(arr));
```

### Char-代码

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


// 声明字符变量
char ch1 = 'A'; // 直接赋值一个字符
char ch2 = 65;  // 使用ASCII码值赋值（A的ASCII码是65）
char ch3 = '\u0041'; // 使用Unicode编码赋值（\u0041表示'A'）
char ch = '\n'; // 换行符

// 使用 == 比较字符的Unicode值
boolean isEqual = (ch1 == ch2); // false

// 使用Character.compare()方法
int comparison = Character.compare(ch1, ch2); // 返回 -表示ch1 < ch2


// 获取char数组的长度,这个相当于属性，在算法中，如果将一个string转换为char[]，使用char[].lenght比string.length快一些
char[] charArray = char [11]; 
char[] charArray = testString.toCharArraay(); 
int length = charArray.length;


```


**字符变量内容转换**：
```java
// 转换为大写
char upperCh = Character.toUpperCase(ch); // 'A'

// 转换为小写
char lowerCh = Character.toLowerCase(ch); // 'a'

// 字符转数字
char digitChar = '7';
int digit = Character.getNumericValue(digitChar); // 7
int asciiDigit = (int) digitChar; // 55

// 数字转字符
int number = 8;
char charFromNumber = (char) (number + '0'); // '8'
// 注意：Character.getNumericValue(char) 可以处理不同进制的数字字符（如罗马数字、汉字数字等），而直接转换仅适用于0-9的阿拉伯数字。

// 字符转字符串
String str1 = String.valueOf(ch); // "A"
String str2 = Character.toString(ch); // "A"

```

**检查字符变量内容**：
```java
char ch = 'A';

// 检查是否是字母
boolean isLetter = Character.isLetter(ch); // true

// 检查是否是数字
boolean isDigit = Character.isDigit(ch); // false

// 判断字符是否为字母或数字
boolean isLetterOrDigit = Character.isLetterOrDigit(ch); // true

// 检查是否是空白字符
boolean isWhitespace = Character.isWhitespace(ch); // false

// 检查是否是大写字母
boolean isUpperCase = Character.isUpperCase(ch); // true

// 检查是否是小写字母
boolean isLowerCase = Character.isLowerCase(ch); // false

// 检查是否是字母或数字
boolean isLetterOrDigit = Character.isLetterOrDigit(ch); // true


// 综合检查字符串类型
int type = Character.getType(ch);
switch(type) {
    case Character.UPPERCASE_LETTER:
        System.out.println("大写字母");
        break;
    case Character.LOWERCASE_LETTER:
        System.out.println("小写字母");
        break;
    case Character.DECIMAL_DIGIT_NUMBER:
        System.out.println("数字");
        break;
    // 其他类型...
    default:
        System.out.println("其他字符");
}

```

### String

**String存储的底层原理**
`String`底层是通过一个被`final`修饰的字符数组来存储字符内容，这样做是为了保证字符串对象内部的字符内容不能被修改，从而提高安全性和性能。
```java
// 在 JDK 8 及以前：
private final char[] value;
// 在 JDK 9 以后优化为：
private final byte[] value;
private final byte coder; // 标记是 LATIN-1 还是 UTF-16
```
**字符串的不可变性**
- `String`类被 `final` 修饰，是一个不可变类。
- String类不能被继承，也不能被重写
* 目的：
	* 提高安全性
	* 保证字符串的不可变性，
	* 防止子类破坏常量池、哈希缓存等内部逻辑；

**保证字符串的不可变性的原因**：
- 安全性：如网络地址、文件路径、反射中类名等，若能被修改，可能造成安全漏洞。
- 线程安全：不可变对象天生线程安全，不需要同步机制。
- 性能优化：通过字符串常量池可以复用字符串对象，避免重复创建。
- 支持哈希缓存：`String` 缓存了 `hashCode`，若可变会导致 HashMap 出错。
- 
**String/StringBuffer/StringBuilder的对比**
* **String**：是不可变，每次修改都会创建新对象；适合不频繁变化的字符串。
* 底层封装了被final修饰的数组（JDK9前为char[]，JDK9后为byte[]）
* **StringBuilder**：可变，非线程安全，但性能更高，适合单线程下频繁拼接。底层数组无final修饰，容量不足时会进行动态扩容（通常为原容量2倍+2）并在原地修改。非线程安全，但单线程环境下性能最高。
* **StringBuffer**：可变，线程安全（方法有同步锁），适合多线程场景。底层数组无final修饰，容量不足时会进行动态扩容（通常为原容量2倍+2）并在原地修改。由 `synchronized` 修饰，线程安全但性能较低；
* **拼接性能对比**：`StringBuilder` > `StringBuffer` > `String`（最慢）。

**字符串常量池**
- 字符串常量池（String Constant Pool）是 JVM 中专门存放字符串字面量的内存区域。
- 使用双引号创建的字符串才会进入常量池，而`new String("hello")` 会创建两个对象（堆 + 常量池），可以通过 `intern()` 方法将堆中的字符串添加到常量池中。
	- 这种方式创建一个堆是做什么用的？

- 示例：
```java
String a = "hello";
String b = "hello";
System.out.println(a == b); // true，指向常量池中同一个对象
```
**字符串的拼接过程**：
- 编译期优化（常量表达式）：
```java
// 原始
String a = "hello" + "world"; 
// 编译时直接优化为：
String a = "helloworld";
```
- 运行时拼接（变量参与）：
```java
// 原始
String b = "hello";
String c = b + "world";
// 实际编译器会变为：
new StringBuilder().append(b).append("world").toString();
```
- 如果频繁拼接字符串，应使用 `StringBuilder` 来避免创建大量临时对象。

### String-使用

**String类的常见方法**
* `length()`：返回字符串长度
* `charAt(int index)`：获取某个位置的字符
* `substring(int start, int end)`：截取子串
* `equals()` / `equalsIgnoreCase()`：比较字符串
* `startsWith()` / `endsWith()`：判断前缀/后缀
* `contains()`：是否包含某个子串
* `indexOf()` / `lastIndexOf()`：查找字符或字符串位置
* `replace()`：替换字符或子串
* `split()`：按正则表达式分割
* `trim()`：去除首尾空白字符
* `toCharArray()`：转为字符数组
* `valueOf()`：静态方法，转为字符串
* `intern()`：将字符串放入常量池中


**字符串内容操作**：
```java
// 创建字符串
String str1 = "Hello";
String str2 = new String("World");

// 获取字符串长度
int length = str.length();



// 字符串转字符（取第一个字符）
String s = "Hello";
char firstChar = s.charAt(0); // 'H'


// 遍历字符串中的字符
String s = "Hello";
// 使用for循环和charAt()
for (int i = 0; i < s.length(); i++) {
    char ch = s.charAt(i);
    System.out.println(ch);
}
// 使用增强型for循环（需要将字符串转换为字符数组）
for (char ch : s.toCharArray()) {
    System.out.println(ch);
}

// 字符替换
String s = "Hello World";
String replaced = s.replace('o', 'a'); // "Hella Warld"

// 大小写转换 
toUpperCase 方法：将字符串转换为大写。
String lower = "hello";
String upper = lower.toUpperCase();

// toLowerCase 方法：将字符串转换为小写。
String upperCase = "WORLD";
String lowerCase = upperCase.toLowerCase();

// 检查字符串是否仅包含特定字符
String s = "ABC123";
boolean isOnlyLettersAndDigits = s.chars().allMatch(Character::isLetterOrDigit); // true
String s2 = "ABC@123";
boolean isOnlyLettersAndDigits2 = s2.chars().allMatch(Character::isLetterOrDigit); // false


// 过滤出所有字母并转换为大写
String s = "Hello World!";
List<Character> letters = s.chars()
                           .filter(Character::isLetter)
                           .mapToObj(c -> (char) Character.toUpperCase(c))
                           .collect(Collectors.toList());
System.out.println(letters); // 输出 [H, E, L, L, O, W, O, R, L, D]

// 字符串拼接
String greeting = "Hello" + " " + "World";
String result = str1.concat(str2);


// 字符串比较
boolean isEqual = str1.equals(str2);
boolean isEqualIngnoreCase = str1.equalsIngnoreCase(str2); // 忽略大小写


// compareTo 方法：按字典顺序比较字符串，返回一个整数。
int comparison = strA.compareTo(strC);


// indexOf 方法：查找指定字符或子字符串首次出现的索引。
String sentence = "Java is fun";
int index = sentence.indexOf("is");

// lastIndexOf 方法：查找指定字符或子字符串最后一次出现的索引。
int lastIndex = sentence.lastIndexOf("a");


// 字符串截取 使用 substring 方法截取字符串的一部分。
String original = "HelloWorld";
String subStr1 = original.substring(5);
String subStr2 = original.substring(0, 5); // 左闭右开，输出“Hello”


// 字符串替换 使用 replace 方法替换字符串中的字符或子字符串。
String input = "Hello Java";
String replaced = input.replace("Java", "Python");

// 字符串分割 使用 split 方法根据指定的分隔符将字符串分割成字符串数组。
String csv = "apple,banana,orange";
String[] fruits = csv.split(",");

// 去除首尾空格 使用 trim 方法去除字符串首尾的空格。
String withSpaces = "  Hello  ";
String trimmed = withSpaces.trim();


// 字符串构建
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String finalString = sb.toString();

// 插入和删除操作
StringBuilder mutableStr = new StringBuilder("Hello");
mutableStr.insert(2, "XX");
mutableStr.delete(2, 4);

// String 转成 Integer的两个方法：
Integer.parseInt(String s)
Integer.valueOf(String s)
```

### 命名规范
- 总体命名规范
- 类名需要使用大驼峰命名法(UpperCamelCase)风格。
- 方法名、参数名、成员变量、局部变量需要使用小驼峰命名法(lowerCamelCase)。
- 测试方法名、常量、枚举名称需要使用蛇形命名法(snake_case) ，比如test_get_user()、TIME_LIMIT。并且，测试方法名称要求全部小写，常量以及枚举名称需要全部大写。
- 项目文件夹名称使用串式命名法(kebab-case)，比如dubbo-registry。
- 包名统一使用小写，尽量使用单个名词作为包名，各个单词通过 "." 分隔符连接，并且各个单词必须为单数。
- 抽象类命名使用 Abstract 开头。如：public abstract class AbstractClient extends AbstractEndpoint{}。
- 异常类命名使用 Exception 结尾。如：public class NoSuchMethodException extends RuntimeException{}。
- 测试类命名以它要测试的类的名称开始，以 Test 结尾。如：public class AnnotationUtilsTest{}。
- 包名命名规范
- Java的包名由小写单词组成，包的路径符合所开发的系统模块的定义，以便通过包名可得知其属于哪个模块，从而方便到对应包里找相应的实现类。

- 常规包名

- 为了保障每个Java Package命名的唯一性,在Java编程规范中要求开发人员在自己定义的包名前加上唯一的前缀.由于互联网上的域名称是不会重复的,所以多数开发人员采用自己公司在互联网上的域名称作为自己程序包的唯一前缀.例如 : com.sun.swt...

- 公司项目 com : 公司项目,copyright由项目发起的公司所有. 包名 : com.公司名.项目名.模块名..
- 团队项目 team : 团队项目,指由团队发起,并由该团队开发的项目,copyright属于该团队所有. 包名 : team.团队名.项目名.模块名..
- 自定义包名

- 一般公司命名为com.公司名.项目名.模块名....那我们个人的项目又怎么命名呢?个人的英语单词有individual、personal、private、one-man,进一步对以上四个单词词意进行分析并在保证了唯一性,继而使用每个单词的前4个字母作为前缀,与com也做了区分.示例如下所示:

- indi : 个体项目,指个人发起,但非自己独自完成的项目,可公开或私有项目,copyright主要属于发起者. 包名 :indi.发起者名.项目名.模块名..
- pers : 个人项目,指个人发起,独自完成,可分享的项目,copyright主要属于个人.包名 : pers.个人名.项目名.模块名..
- priv : 私有项目,指个人发起,独自完成,非公开的私人使用的项目,copyright属于个人.包名 : priv.个人名.项目名.模块名..
- onem : 与indi相同，推荐使用indi.

### java数据结构如何获取大小长度
总结：
- 数组是 `.length` → 它是一个属性（field）
- 字符串是 `.length()` → 它是一个方法
- 集合类（List、Set、Map）用 `.size()`

| 类型 / 类名           | 示例对象                   | 获取大小/长度的方式     | 用法是否加括号 | 说明与注意事项                       |
| ----------------- | ---------------------- | -------------- | ------- | ----------------------------- |
| 数组（Array）         | `int[] arr`            | `arr.length`   | ❌ 不加括号  | 是一个字段（属性），返回数组元素个数            |
| 字符串（String）       | `String s`             | `s.length()`   | ✅ 要加括号  | 是一个方法，返回字符串中字符的数量             |
| StringBuilder     | `StringBuilder sb`     | `sb.length()`  | ✅ 要加括号  | 返回当前字符序列的长度（不同于数组的 `.length`） |
| StringBuffer      | `StringBuffer sb`      | `sb.length()`  | ✅ 要加括号  | 同上                            |
| ArrayList         | `List<Integer> list`   | `list.size()`  | ✅ 要加括号  | 方法，返回列表中元素的数量                 |
| LinkedList        | `LinkedList<String> l` | `l.size()`     | ✅ 要加括号  | 同上                            |
| HashSet / TreeSet | `Set<String> set`      | `set.size()`   | ✅ 要加括号  | 方法，返回集合中不重复元素的数量              |
| HashMap / TreeMap | `Map<K, V> map`        | `map.size()`   | ✅ 要加括号  | 方法，返回键值对的数量                   |
| Stack / Queue     | `Stack<T> stack`       | `stack.size()` | ✅ 要加括号  | 方法，返回栈中元素的数量                  |

### 基础语法

### 输入-Scanner-代码
**输入**：
```Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 读取一个字符串
        String name = scanner.nextLine();
        // 读取一个整数，注意，它不会吃掉换行符
        int age = scanner.nextInt();
        // 读取一个浮点数
        double score = scanner.nextDouble();
		
		System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Score: " + score);
        
        // 读取整数数组：1 2 3 4 5
		String[] parts = sc.nextLine().split(" ");
		int[] nums = new int[parts.length];
		for (int i = 0; i < parts.length; i++) {
		    nums[i] = Integer.parseInt(parts[i]);
		}
        
        // 读取二维数组矩阵
		// 3 3
		// 1 2 3
		// 4 5 6
		// 7 8 9
		Scanner sc = new Scanner(System.in);
		int rows = sc.nextInt();
		int cols = sc.nextInt();
		int[][] matrix = new int[rows][cols];
		for (int i = 0; i < rows; i++) {
		    for (int j = 0; j < cols; j++) {
		        matrix[i][j] = sc.nextInt();
		    }
		}

        scanner.close();
    }
}
```

### java的包

在 Java 里，同包 = 同命名空间，同一个 package 下的类互相可见，直接用类名就能用。
只有别的 package 里的类才需要 import（或用全限定名）。


### java命令行参数

`-cp` / `-classpath`：加载的类和资源的路径，多个路径用分隔符：Windows用 **`;`**、Linux/Mac 用 **`:`**

## 面向对象编程（OOP）


**内容一览**：
- **类与对象**：理解类的定义、实例化对象、成员变量和成员方法。
- **封装**：通过访问修饰符（private, public, protected）来实现数据的保护。
- **继承**：通过 `extends` 关键字实现类的继承，子类继承父类的方法和属性。
- **多态**：通过方法的重载和重写实现多态性。
- **抽象类与接口**：`abstract` 关键字的使用，接口的定义与实现
- **面向对象的三大特征**：封装、继承、多态


- **面向对象和面向过程的区别**：
	- 面向对象编程（OOP）和面向过程编程是两种不同的编程范式。
	- 面向对象会先抽象出具有状态、行为的对象，然后用对象执行方法的方式解决问题，强调封装、继承和多态，更容易扩展和维护，因为修改一个对象不会影响到其他对象，适合处理复杂的系统。
	- 面向过程将系统视为一系列的过程或函数，通过调用这些过程来完成任务。强调的是算法和流程，如果需要修改一个过程，可能会影响到调用这个过程的其他地方，更适合简单的、线性的任务。



### 类与对象
**类（Class）**：是对象的模板或蓝图，定义了对象的属性和行为。
**构造方法**：用于初始化对象。构造方法与类名相同，没有返回值。
**方法重载（Method Overloading）**：在同一个类中，可以定义多个方法名相同但参数不同的方法。方法的返回类型不同不会构成重载。
**this关键字**：指代当前对象的引用。它常用于区分成员变量和局部变量。
**static关键字**：表示静态成员，属于类而非实例，静态方法可以直接通过类调用，而不需要实例化对象。
**静态变量**：静态变量是被static关键字修饰的变量，被类的所有实例对象共享。静态变量通过类名来访问。
**Java访问权限**：在Java中，访问权限通过访问修饰符来控制。主要的访问修饰符有四个：public、protected、default（默认修饰符）和private，这些修饰符可以用于类、变量、方法和构造方法。
- public：表示对所有类可见。一个类如果被声明为public，那么它可以被其他任何类访问。
- protected：表示对同一包内的类和所有子类可见。子类可以访问父类中声明为protected的成员，而不管子类与父类是否在同一包中。
- default：如果没有使用任何访问修饰符（即没有写public、protected、private），则默认为包级别访问。这意味着只有同一包中的类可以访问。
- private表示对同一类内可见。私有成员只能在声明它们的类中访问。

内部类：内部类是定义在另一个类内部的类，内部类可以访问外部类的成员变量，甚至是私有的。，分为四种类型：
- 成员内部类：非静态类，依赖外部类实例。
- 静态内部类：使用 `static` 修饰，可以独立访问。
- 局部内部类：定义在方法或代码块中。
- 匿名内部类：没有名字的内部类，常用于函数式接口实现。


代理类



### 深拷贝和浅拷贝

浅拷贝：
只复制基本的值
如果字段是基本数据类型，那么就复制其值；
如果字段是引用类型，复制的是引用而不是实际对象。
浅拷贝通常通过clone方法实现


深拷贝：
创建一个新对象，并递归复制原对象中的所有引用类型的字段指向的对象，而不是将引用复制过去共享使用。
新对象和原对象中的引用类型字段引用的是两组不同的对象。
深拷贝可以通过手动实现clone方法、序列化和反序列化，或者使用第三方库来实现。

### 简述三大特性
* 封装、继承、多态。
* 封装用于隐藏实现细节暴露接口（例如实体类私有化字段并提供getter/setter，保护数据一致性）；
* 继承用于代码复用并抽取共性（例如抽取包含创建时间、更新时间的BaseEntity基类）；
* 多态用于实现同一接口的不同策略（例如定义PayService接口，由WechatPayServiceImpl和AliPayServiceImpl分别实现，运行时根据条件动态绑定，符合开闭原则）。


### 封装
**封装（Encapsulation）**：通过访问修饰符（如private、protected、public）隐藏对象的内部实现，只暴露必要的接口（方法）。
- private：仅在当前类中访问。
- protected：在当前类、同包的类以及子类中访问。
- public：在任何地方都可以访问。

### 继承
**继承（Inheritance）**：子类可以继承父类的属性和方法。使用`extends`关键字实现继承。
- **super关键字**：指代父类的对象，可以通过它访问父类的成员和构造方法。
- **方法重写（Method Overriding）**：
	- 子类重写父类的方法，修改其实现。
	- 必须保持方法签名一致（方法名、参数列表、返回值类型等）。
	- 构造方法不能重写。因为构造方法需要和类保持同名，而重写的要求是子类方法要和父类方法保持同名。如果允许重写构造方法的话，那么子类中将会存在与类名不同的构造方法，这与构造方法的要求是矛盾的。
- **方法重载**：与方法重写不同，方法重载是在同一类中方法名相同但参数不同。

### 多态
（Polymorphism）

- 多态就是指同一个行为（方法）在不同情况下，表现出不同行为的能力。
- 所谓不同情况，就是：参数列表不同or对象类型不同
- 重载和重写就是多态在java中两种重要表现形式

- 编译时多态是通过方法的重载在编译阶段确定调用的方法。
- 运行时多态是通过方法的重写在程序运行时确定调用的方法，实现动态绑定。

#### 重载和重写

- **重载（overloading）**：
	- 一个类中可以有多个名称相同的方法，这些方法的访问修饰符和返回类型可以相同也可以不同，但参数列表不同（参数的类型、个数、顺序），程序编译阶段虚拟机根据参数列表匹配使用哪个函数。
	- 这种机制让函数按需有多种实现方式。
	- 因为是在编译阶段根据参数列表匹配函数，所以是编译时多态（静态多态）。
- **重写（overriding）**：
	- 在父子类或接口与实现类中，子类可以定义一个与父类中某个方法方法签名完全相同的方法，即方法名、参数列表和返回类型都必须相同，从而覆盖父类方法，或者实现接口的抽象方法。从而让方法有更具体的功能。
	- 
	- 
	- 重新定义父类中已经定义的方法，
	- 
	- 本质是子类方法覆盖了父类方法。
	- 要求方法签名全部相同，
	- 重写的方法访问权限（访问修饰符）要大于等于父类
	- 子类方法返回值和抛出异常范围需小于等于父类，即子类方法可以不抛出异常或抛出父类异常的子类，不能抛出比父类方法更多的异常，
	- 运行期根据对象实际类型匹配函数（动态多态），属于运行时多态。





#### 接口
（Interface）

**定义**：接口是实际定义了一组约定，接口通过`interface`关键字定义，一个类可以通过`implements`关键字表明要实现的接口，并要实现接口中的所有抽象方法。接口支持多继承，一个类可以实现多个接口，这也解决了Java不支持多继承的问题。。

**使用接口的好处**：代码清晰、借助多态性实现解耦、扩展性好、更容易测试（详细请看后面的例子）

- 接口是一种抽象类型，它定义了一组只有方法签名,但没有实现的抽象方法。


**接口和抽象类的区别**

抽象类是对事物的抽象，可包含普通成员变量、构造器和具体实现方法；
接口是对行为的规范，JDK8前仅能包含抽象方法和常量。

- 定义：
	- 抽象类是一个类，可以包含抽象方法和具体方法。抽象类不能直接实例化，通常需要子类继承并实现其中的抽象方法。
	- 接口中只能包含常量（static final变量）和抽象方法；

- 继承：Java中不支持多继承，一个类只能继承一个抽象类。 一个类可以实现多个接口；
- 构造器：
	- 接口不能包含构造器，因为接口不能被实例化。
	- 类实现接口时，必须实现接口中定义的所有方法；
	- 抽象类可以包含构造器，当子类实例化时，会调用父类的构造器。
- 访问修饰符：
	- 接口中的方法默认是public abstract的，接口中的变量默认是public static final的。
	- 抽象类中的抽象方法默认是protected的，具体方法的访问修饰符可以是 public、protected或 private。

* 当需要定义通用骨架并复用部分代码时选用抽象类（模板方法模式）；
* 当需要定义标准规范、扩展不同层级类的附加能力时选用接口（策略模式）。

**使用匿名类快速创建一个实现接口的对象**：
```java
interface MyInterface {
    void sayHello();
}
/* 
// 通过实现类创建对象
class MyClass implements MyInterface {
    public void sayHello() {
        System.out.println("Hello from MyClass");
    }
}
public class Main {
    public static void main(String[] args) {
        MyInterface obj = new MyClass(); // ✅ 合法
        obj.sayHello();
    }
}
*/
// 通过匿名内部类实现接口并创建对象
public class Main {
    public static void main(String[] args) {
        MyInterface obj = new MyInterface() {
		    public void sayHello() {
		        System.out.println("Hello from anonymous class");
		    }
		};
        obj.sayHello();
    }
}
```


举例1（简单）：Animal是接口，Dog是实现Animal接口的类
```java
interface Animal {
    void speak();
    // void eat();
}
class Dog implements Animal {
    public void speak() {
        System.out.println("Woof!");
    }
    public void eat() {
        System.out.println("emmm!");
    }
}
public class Main {
    public static void main(String[] args) {
        Animal myPet = new Dog();  // 接口作为变量类型
        Dog myDog = new Dog();  // Dog 类作为变量类型
        myPet.speak();  // 输出：Woof!
        // myPet.eat();
        myDog.eat();
    }
}
```


**举例说明接口设计的好处**：
场景：假如你正在开发一个电商平台，对于支付功能，你要为用户开发多种付款方式，比如信用卡、PayPal 和银行转账。

在没有接口的情况下，你可能会这样设计：
```java
// 设计三种支付类
public class CreditCardPayment {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}
public class PayPalPayment {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using PayPal.");
    }
}
public class BankTransferPayment {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Bank Transfer.");
    }
}
// 在订单处理类中，根据需要使用这些支付类：
public class OrderService {
    public void processOrder(String paymentType, double amount) {
        if (paymentType.equals("CreditCard")) {
            CreditCardPayment payment = new CreditCardPayment();
            payment.pay(amount);
        } else if (paymentType.equals("PayPal")) {
            PayPalPayment payment = new PayPalPayment();
            payment.pay(amount);
        } else if (paymentType.equals("BankTransfer")) {
            BankTransferPayment payment = new BankTransferPayment();
            payment.pay(amount);
        } else {
            System.out.println("Invalid payment type.");
        }
    }
}
```
这样设计存在的问题：
- 扩展性差：如果以后需要添加新的支付方式，例如比特币支付，你需要修改 `OrderService` 类中的 `processOrder` 方法，增加新的 `else if` 分支。
- 代码重复：每次新增一个支付方式，你都需要在多个地方添加类似的代码。
- 测试困难：如果你想在单元测试中测试 `OrderService`，你可能需要引入所有这些支付类。这使得测试复杂且难以维护。


现在，假设我们使用接口来设计这个支付系统：
```java
// 首先定义一个支付接口：
public interface Payment {
    void pay(double amount);
}

// 然后，让每个支付方式实现这个接口：
public class CreditCardPayment implements Payment {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}
public class PayPalPayment implements Payment {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using PayPal.");
    }
}
public class BankTransferPayment implements Payment {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Bank Transfer.");
    }
}

// 修改 `OrderService` 类，让它依赖于 `Payment` 接口，而不是具体的支付实现
public class OrderService {
    // 这是一个接口类型的引用，它可以引用任何实现了 `Payment` 接口的对象。
    private Payment payment;
    public OrderService(Payment payment) {
        this.payment = payment;
    }
    public void processOrder(double amount) {
        payment.pay(amount);
    }
}

public class Main {
    public static void main(String[] args) {
	    // 创建了 `CreditCardPayment` 类的一个实例，而 `CreditCardPayment` 是 `Payment` 接口的一个实现类。
        Payment payment = new CreditCardPayment();  
        // 或 new PayPalPayment(), new BitcoinPayment(), etc.
        OrderService orderService = new OrderService(payment);
        orderService.processOrder(100.0);
    }
}

```

这样做的优点：
- 代码清晰：`OrderService` 类不需要知道每种支付方式的细节，只需依赖 `Payment` 接口。
- 借助多态性实现解耦：你可以通过依赖注入或工厂模式来为`OrderService` 提供不同的支付方式，而不需要修改 `OrderService` 的代码。
- 扩展性好：如果想添加新的支付方式，例如比特币支付，只需实现 `Payment` 接口即可，不需要修改 `OrderService` 类的代码。例如：
```java
public class BitcoinPayment implements Payment {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Bitcoin.");
    }
}
```
- 更容易测试：在测试中，你可以创建 `Payment` 接口的模拟实现（mock），而不需要实际依赖具体的支付实现。这使得测试更简单且更快。
```java
public class MockPayment implements Payment {
    @Override
    public void pay(double amount) {
        System.out.println("Mock payment of " + amount);
    }
}
public class OrderServiceTest {
    public static void main(String[] args) {
        Payment mockPayment = new MockPayment();
        OrderService orderService = new OrderService(mockPayment);
        orderService.processOrder(100.0);  // Outputs: Mock payment of 100.0
    }
}
```

可以设置默认接口方法：
```java
interface Flyable{
	default void flyo ()
		System.out.print("Flyable");
	}
}
```



#### 抽象类和抽象方法
**抽象（Abstraction）**：通过抽象类或接口，只提供方法签名而不实现细节，让具体实现留给子类。

- **abstract类**：不能直接实例化，必须由子类继承并实现其中的抽象方法。
- **abstract方法**：没有方法体的方法，子类必须实现该方法。

abstract 关键字：
abstract 修饰方法
1.抽象方法，不用实现，在具体的子类中实现
2.若子类未实现抽象方法，仍然要定义为抽象类2、abstract 修饰类
抽象类，包含一个或多个抽象方法（也可以一个也不包含）
抽象类也可以包含字段和具体方法
提高程序清晰度
1.父类中定义抽象方法，子类中具体实现2，变量定义为父类（抽象类）类型，具体实现（new）子类类型（上转型）
方法调用，通过父类变量（多态，动态绑定）

- 抽象类不能被实例化(初学者很容易犯的错)，如果被实例化，就会报错，编译无法通过。只有抽象类的非抽象子类可以创建对象。
    
- 抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类。
    
- 抽象类中的抽象方法只是声明，不包含方法体，就是不给出方法的具体实现也就是方法的具体功能。
    
- 构造方法，类方法（用 static 修饰的方法）不能声明为抽象方法。
    
- 抽象类的子类必须给出抽象类中的抽象方法的具体实现，除非该子类也是抽象类。


- 如果一个类包含抽象方法，那么该类必须是抽象类。
- 任何子类必须重写父类的抽象方法，或者声明自身为抽象类。




## 异常处理

### 错误和异常
`Throwable` 是 Java 所有错误和异常的根类，它有两个直接子类：
* `Error`：系统级严重错误，程序无法控制；
* `Exception`：程序可捕获并处理的异常。
开发中主要关注 `Exception`，而不是 `Error`。


**Error**（错误）
`Error` （错误）是 `Throwable` 的子类，表示 **严重问题**，程序一般无法恢复。它们通常是虚拟机层面的问题，比如内存溢出，不建议程序员去捕获。
常见的错误包括：
* `OutOfMemoryError`
* `StackOverflowError`

Exception（异常）
`Exception` （异常）也是 `Throwable` 的子类，表示**程序运行中的异常事件**。
Java通过异常机制处理程序中的错误，保证程序的健壮性。
* `Exception` 表示程序级别的问题，可以捕获和恢复，比如文件未找到、空指针等。
异常的两类：
* **编译时异常（checked exception）**：如 `IOException`、`SQLException`，必须用 try-catch 或 throws 处理。
* **运行时异常（unchecked exception）**：如 `NullPointerException`、`ArrayIndexOutOfBoundsException`，不强制处理，但仍应避免。

**常见异常类型**
- **NullPointerException**：访问空对象时抛出。
- **ArrayIndexOutOfBoundsException**：数组下标越界时抛出。
- **ClassNotFoundException**：类未找到时抛出。
- **IOException**：输入输出异常。

**自定义异常类**
 
**异常处理机制**：
Java 的异常处理是基于“**抓（catch）与抛（throw）**”模型的：
* **捕获（catch）**：程序通过 try-catch 语句捕获异常对象并进行处理。
如果当前方法不处理异常，可以通过 `throws` 把异常向上抛给调用者。
Java 使用 **异常捕获和抛出机制（try-catch-finally）** 来处理异常
- **try**：可能发生异常的代码快，使用 `try` 块包裹可能出错的代码；
- **catch**：捕获异常的代码块，如果发生特定类型的异常，则进入`catch` 块处理；
- **finally**：无论是否抛出异常，都会执行的代码块，通常用于资源的释放。

* **抛出（throw）**：当程序发生异常时，系统会自动创建异常对象并抛出，也可以使用 `throw` 手动抛出异常。
另外也可以使用 `throws` 将异常抛给方法调用者。
**throws与throw**
- **throw**：用于显式抛出异常。
- **throws**：用于方法声明，表示该方法可能抛出异常，调用该方法时需要处理该异常。



### final、finally、finalize的区别
（1）final就是不可变的意思，可以修饰变量、方法和类。修饰变量时，这个变量必须初始化，所以也称为常量。

（2）finally是异常处理的一部分，只能用在try/catch中，并且附带一个语句块表示这段语句一定会被执行，无论是否抛出异常。

（3）finalize是java.lang.Object中的方法，也就是每一个对象都有这个方法，一个对象的finalize方法只会调用一次，调用了不一定被回收，因为只有对象被回收的时候才会被回收，就会导致前面调用，后面回收的时候出现问题，不推荐使用。

## 注解——常用注解

@**AllArgsConstructor**：生成一个全参构造函数

@**Bean**：用于方法上，告诉 Spring 容器将该方法的返回值作为一个 bean（对象）进行管理。

@**Builder**：生成一个Builder模式的实现，运行通过链式调用来构建对象，比如：
`User user = User.builder.id(1).userName("Name").sex(true).build();`


@**Component**：将类标记为 Spring 的组件（Bean）

@**ConfigurationProperties**(prefix = "wx.miniapp")：通过指定`prefix`属性（这里是 "wx.miniapp"），Spring 会将配置文件中以该前缀开头的属性值绑定到被注解的类的相应属性上。
例如，在下面这个例子中，Spring 会自动将 `wx.miniapp.appid` 和 `wx.miniapp.secret` 的值绑定到 `WxMiniAppConfig` 类中，便于后续直接使用：
- 配置文件 (`application.yml` 或 `application.properties`)：
```yaml
wx:
  miniapp:
    appid: your-app-id
    secret: your-secret
```
- Java 类：
```java
import org.springframework.stereotype.Component;
import org.springframework.boot.context.properties.ConfigurationProperties;
@Component
@ConfigurationProperties(prefix = "wx.miniapp")
public class WxMiniAppConfig {
    private String appid;
    private String secret;
    // Getter 和 Setter
    public String getAppid() {
        return appid;
    }
    public void setAppid(String appid) {
        this.appid = appid;
    }
    public String getSecret() {
        return secret;
    }
    public void setSecret(String secret) {
        this.secret = secret;
    }
}
```

**@Data**：来自Lombok，相当于组合了多个注解：@Getter、@Setter、@ToString、@EqualAndHashCode和@RequirArgsConstructor，自动为类生成以下内容，大大减少样板代码，Getter 和 Setter 方法、`toString()` 方法、`equals()` 和 `hashCode()` 方法、tostring方法、一个无参构造器（如果没有其他构造器存在）

**@GetMapping ("/login/{code}")**：用于方法上，表示该方法处理 HTTP GET 请求，并且请求的路径是`/login/{code}`。其中`{code}`是一个路径变量，可以在方法参数中通过`@PathVariable`注解来获取。

@**NoArgsConstructor**：自动生成一个无参构造函数

@**PathVariable**：获取由@GetMapping注解的处理GET请求的方法的HTTP路径中的路径变量

## 注解——自定义注解
自定义注解如何传递与使用参数？
**定义注解时传递参数**：  
在注解中可以定义参数，方法调用时传入这些参数。
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyCustomAnnotation {
    String value() default "default";
    int count() default 1;
}
```

**在方法上使用注解时传递参数**：
```java
@MyCustomAnnotation(value = "Hello", count = 5)
	public void myMethod() {
	// 方法逻辑
}
```


## 反射
**概念**：通过类的对象动态获取类的信息（比如字段、方法、构造函数等），以及动态调用类的方法



## 泛型
**概念**：在写代码时不指定具体的数据类型，而是使用字母`T`、`K`等占位置，在使用时，根据具体使用情况，设置数据类型，让代码具有更强的灵活性和适用性

**泛型擦除**：在编译时，泛型被替换为具体的数据类型

在 Java 中，如果编译器能推断出泛型类型（这里通过参数`data`的类型自动推断），可以省略尖括号中的具体类型（即写成`new Result<>(...)`而非`new Result<T>(...)`）。

## I/O流

**概念**
I/O流代表的是“传输数据的通道”，是用于 读取（Input）和写入（Output）数据 的一系列类，比如从控制台读取输入的通道，从socket接收数据的通道，从磁盘文件中读取数据的通道


I/O和Java数据类型的区别：java数据类型是用来存储数据的
I/O流本身不是用来存储数据的，而是用来传输的数据的，可以使用java的数据类型接收传输的数据。


- 字节流 InputStream / OutputStream → 二进制数据
- 字符流 Reader / Writer → 文本、字符
- 带 Buffer 的读写效率高，优先使用 BufferedXxx
- 对象/数据类型用 ObjectStream/DataStream


**关闭流**，建议推荐使用 Java 7+ 的 **try-with-resources** 自动关闭：
```java
try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```


IO流的四个超级父类、抽象基类：
● InputStream：字节输入流，以字节的方式读取数据。
● OutputStream：字节输出流，以字节的方式输出数据。
● Reader：字符输入流，以字符的方式读取数据。
● Writer：字符输出流，以字符的方式输出数据。


**字节流**
可以处理所有类型数据，尤其是二进制数据，适合处理：图片、音频、视频、PDF、网络字节流等

包括：
- 输入流`InputStream`：
	- `FileInputStream`
	- `BufferedInputStream`
- 输出流`OutputStream`:
	- `FileOutputStream`
	- `BufferedOutputStream`

示例，读取文件：
```java
FileInputStream fis = new FileInputStream("test.txt");
int b;
while ((b = fis.read()) != -1) {
    System.out.print((char) b);  // 注意要转成字符
}
fis.close();
```

**字符流**
专门处理文本文件，自动按编码转换,适合处理：纯文本文件（.txt、.xml、.csv 等）

包括：
- 输入流`Reader`
	- `FileReader`
	- `BufferedReader`
- 输出流`Writer`
	- `FileWriter`
	- `BufferedWriter`

示例，写入文件：
```java
FileWriter fw = new FileWriter("output.txt");
fw.write("Hello, Java I/O!");
fw.close();
```

**其它流**
例如：

| 流类型                    | 说明                      |
| ---------------------- | ----------------------- |
| `ObjectInputStream`    | 用于反序列化对象                |
| `ObjectOutputStream`   | 用于序列化对象                 |
| `DataInputStream`      | 读取 Java 基本类型（int、long等） |
| `ByteArrayInputStream` | 内存中读取/写入字节流             |
| `PipedInputStream`     | 管道流：线程之间通信用             |

示例，使用缓冲流：
```java
BufferedReader br = new BufferedReader(new FileReader("input.txt"));
String line;
while ((line = br.readLine()) != null) {
    System.out.println(line);
}
br.close();
```



## File文件操作

**获取文件或目录信息**
获取File对象的文件、路径、绝对路径、规范路径、父目录名、父目录名对应的file对象
判断file对象是否存在、是否可读、是否可写、是否隐藏、是否是文件、是否是目录、最后修改时间（毫秒值）、文件长度（如果是目录返回不确定）

**操作文件**
创建、创建临时文件、删除文件、删除临时文件、重命名

**操作目录**
创建目录、在父目录不存在的情况下创建目录、列出当前目录下的目录的文件、列出当前目录下的目录的文件的File对象、根据指定滤波器筛选文件和目录，返回抽象路径名数组、列出可用的文件系统根、删除空目录、在同一盘符下移动目录


**文件读写**：
```Java
// 使用 BufferedReader 读取文本文件
BufferedReader reader = new BufferedReader(new FileReader("data.txt"));
String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}
reader.close();

// 使用 BufferedWriter 写入文本
BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"));
writer.write("Hello, Java I/O!");
writer.newLine(); // 换行
writer.close();

// 读写字节（如图片、音频）
FileInputStream in = new FileInputStream("input.jpg");
FileOutputStream out = new FileOutputStream("copy.jpg");
byte[] buffer = new byte[1024];
int len;
while ((len = in.read(buffer)) != -1) {
    out.write(buffer, 0, len);
}
in.close();
out.close();


```







## Lambda 表达式
Java 8 新特性




## **函数式接口**
**定义**：一个接口它可以有多个 `default` 方法（默认实现）以及多个 `static` 方法（工具方法），但 **只有一个抽象方法**，就叫函数式接口。
Java 8 引入了 **Lambda 表达式**，Lambda 必须依附在“函数式接口”上。

举例：
```Java
// 自定义函数式接口示例：
@FunctionalInterface
public interface MyCalculator {
	// 唯一抽象方法
    int calculate(int a, int b);

    // 可以有默认方法
    default void show() {
        System.out.println("这是一个计算器接口");
    }
}
/*
// 传统 匿名类 写法
public class Test {
    public static void main(String[] args) {
        MyCalculator add = new MyCalculator() {
            @Override
            public int calculate(int a, int b) {
                return a + b;
            }
        };
        System.out.println(add.calculate(5, 3)); // 8
    }
}
*/
// Java 8 Lambda 写法：
// Lambda 表达式 `(a, b) -> a + b` 就是 `calculate(int a, int b)` 的实现。
public class Test {
    public static void main(String[] args) {
        MyCalculator add = (a, b) -> a + b;
        MyCalculator multiply = (a, b) -> a * b;

        System.out.println(add.calculate(5, 3));      // 8
        System.out.println(multiply.calculate(5, 3)); // 15
    }
}
```

Java 在 `java.util.function` 包里内置了很多常用的函数式接口：
* **`Predicate<T>`**：接收一个参数，返回 `boolean`
```java
Predicate<String> isEmpty = s -> s.isEmpty();
System.out.println(isEmpty.test(""));   // true
```
* **`Function<T, R>`**：接收一个参数，返回一个结果
```java
Function<String, Integer> strLength = s -> s.length();
System.out.println(strLength.apply("hello")); // 5
```
* **`Consumer<T>`**：接收一个参数，不返回值
```java
Consumer<String> printer = s -> System.out.println("打印: " + s);
printer.accept("Java");  // 打印: Java
```
* **`Supplier<T>`**：无参数，返回一个值
```java
Supplier<Double> randomSupplier = () -> Math.random();
System.out.println(randomSupplier.get());
```

使用举例，要过滤字符串列表里长度大于 3 的元素：
```java
import java.util.*;
import java.util.function.Predicate;

public class Test {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("a", "ab", "abcd", "hello", "hi");

        // 使用内置函数式接口 Predicate
        Predicate<String> lengthGreaterThan3 = s -> s.length() > 3;

        list.stream()
            .filter(lengthGreaterThan3)   // 传入函数式接口
            .forEach(System.out::println); // abcd hello
    }
}

```

## Stream-链式调用
原则：连续的 `.方法名()` 调用，是在处理**前一个方法返回的结果对象**

经典 Stream 示例：

```java
List<String> result = stringCollection.stream()
                                      .filter(s -> s.startsWith("A"))
                                      .sorted()
                                      .map(String::toUpperCase)
                                      .collect(Collectors.toList());
```

这段代码可以拆解成这样理解：

1. `stringCollection.stream()` → 把集合变成 `Stream<String>`
2. `.filter(...)` → 过滤流中的元素，返回新 `Stream`
3. `.sorted()` → 排序流中的元素，返回新 `Stream`
4. `.map(...)` → 转换每个元素，返回新 `Stream`
5. `.collect(...)` → 收集流，最终变成 `List<String>`

```
原始集合
   ↓ .stream()
流对象（Stream）
   ↓ .filter(...)
过滤后流
   ↓ .sorted()
排序后流
   ↓ .map(...)
转换后流
   ↓ .collect(...)
最终结果（List）
```

## Java网络编程


## 数据库

### JDBC
（Java Database Connectivity）

好的，下面我将对上一个回答中所有 **JDBC 示例代码** 进行逐段讲解，并把**每一行都加上详细注释**，你可以拿去运行也可以理解其中的坑和细节。

---

【1】查询单条记录（selectById）

```java
public User selectById(long id) throws Exception {
    Connection conn = null;           // JDBC连接对象
    PreparedStatement ps = null;      // 预编译 SQL 对象
    ResultSet rs = null;              // 结果集对象

    try {
        // 建立连接（参数可从配置中读取）
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");

        // 编写预编译 SQL，防止 SQL 注入
        ps = conn.prepareStatement("SELECT id,name,age FROM users WHERE id=?");
        ps.setLong(1, id); // 把方法参数设置给第一个问号

        // 执行查询
        rs = ps.executeQuery();

        // 处理结果
        if (rs.next()) {
            User u = new User();  // 创建实体对象
            u.setId(rs.getLong("id"));        // 从列名取值
            u.setName(rs.getString("name"));  // getString 对应 VARCHAR
            u.setAge(rs.getInt("age"));       // getInt 对应 INT
            return u;
        }

        return null;  // 没查到
    } finally {
        // JDBC 使用后一定要关闭资源，顺序是 ResultSet → Statement → Connection
        if (rs != null) rs.close();
        if (ps != null) ps.close();
        if (conn != null) conn.close();
    }
}
```

**讲解重点**：

- 用 `PreparedStatement` 防止 SQL 注入。
    
- 每次用完必须手动关闭 `ResultSet`、`PreparedStatement`、`Connection`。
    
- 没有 ORM，字段映射全靠你手动写 `rs.getXxx("列名")`。
    
- 不支持事务，需要手动开启、提交或回滚。
    

---

【2】插入一条记录 + 主键回填

```java
public void insertUser(User user) throws Exception {
    // JDBC URL、用户名、密码
    String url = "jdbc:mysql://localhost:3306/test";
    String username = "root";
    String password = "123456";

    // SQL 语句使用 ? 占位符进行参数绑定
    String sql = "INSERT INTO users(name, age) VALUES(?, ?)";

    // 获取连接并设置自动提交为 false（可选）
    try (Connection conn = DriverManager.getConnection(url, username, password);
         // 指定返回生成的主键
         PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

        // 参数绑定
        ps.setString(1, user.getName());   // 第一个参数 name
        ps.setInt(2, user.getAge());       // 第二个参数 age

        // 执行更新（插入）
        ps.executeUpdate();

        // 获取数据库自动生成的主键值（如果有的话）
        try (ResultSet rs = ps.getGeneratedKeys()) {
            if (rs.next()) {
                long id = rs.getLong(1);   // 主键一般是第一列
                user.setId(id);            // 回填给对象
            }
        }
    }
}
```

**讲解重点**：

- 插入语句需要通过 `RETURN_GENERATED_KEYS` 才能拿到自增主键。
    
- 使用 `try-with-resources` 可自动释放资源。
    
- JDBC 不支持主键自动注入，需要你手动设置回对象中。
    

---

【3】查询多条记录（selectAll）

```java
public List<User> selectAll() throws Exception {
    List<User> list = new ArrayList<>();

    // 连接数据库
    try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");
         PreparedStatement ps = conn.prepareStatement("SELECT id, name, age FROM users");
         ResultSet rs = ps.executeQuery()) {

        // 遍历结果集，一行一行转成 Java 对象
        while (rs.next()) {
            User u = new User();
            u.setId(rs.getLong(1));          // 可用下标，也可用列名（更推荐列名）
            u.setName(rs.getString(2));
            u.setAge(rs.getInt(3));
            list.add(u);
        }
    }

    return list;
}
```

**讲解重点**：

- 多条结果要用 `while (rs.next())`。
    
- `rs.getXxx(int)` 下标从 1 开始，但不推荐；推荐 `rs.getXxx("列名")`。
    
- 所有字段转换都是**手动映射**，字段变动维护困难。
    

---

【4】手动事务控制（commit / rollback）

```java
public void transfer(User u1, User u2) throws Exception {
    // 模拟一个同时插入两个用户的事务操作

    Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");
    try {
        conn.setAutoCommit(false);  // 关闭自动提交，开始事务

        String sql = "INSERT INTO users(name, age) VALUES(?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, u1.getName());
            ps.setInt(2, u1.getAge());
            ps.executeUpdate();

            ps.setString(1, u2.getName());
            ps.setInt(2, u2.getAge());
            ps.executeUpdate();
        }

        conn.commit();  // 成功，手动提交
    } catch (Exception e) {
        conn.rollback();  // 出现异常，回滚事务
        throw e;
    } finally {
        conn.close();  // 关闭连接
    }
}
```

**讲解重点**：

- JDBC 默认是自动提交模式，必须手动关闭才能控制事务。
    
- 所有 SQL 执行必须在 `setAutoCommit(false)` 后进行。
    
- 必须明确 `commit` 和 `rollback`，否则可能导致数据不一致。
    
- 没有 Spring 的 `@Transactional` 那样的自动支持。
    

---

【5】动态 SQL 构造（WHERE 条件可选）

```java
public List<User> search(Integer minAge, String nameLike) throws Exception {
    StringBuilder sql = new StringBuilder("SELECT id, name, age FROM users WHERE 1=1");

    // 构建 SQL 条件语句（动态拼接）
    if (minAge != null) {
        sql.append(" AND age >= ?");
    }
    if (nameLike != null && !nameLike.isEmpty()) {
        sql.append(" AND name LIKE ?");
    }

    try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");
         PreparedStatement ps = conn.prepareStatement(sql.toString())) {

        // 设置参数值（注意参数位置）
        int i = 1;
        if (minAge != null) {
            ps.setInt(i++, minAge);
        }
        if (nameLike != null && !nameLike.isEmpty()) {
            ps.setString(i++, "%" + nameLike + "%");
        }

        try (ResultSet rs = ps.executeQuery()) {
            List<User> list = new ArrayList<>();
            while (rs.next()) {
                User u = new User();
                u.setId(rs.getLong("id"));
                u.setName(rs.getString("name"));
                u.setAge(rs.getInt("age"));
                list.add(u);
            }
            return list;
        }
    }
}
```

**讲解重点**：

- 手写拼接 SQL 比较繁琐，还要注意参数顺序和索引号。
    
- 如果字段很多，维护拼接逻辑很痛苦。
    
- 这是 MyBatis 动态 SQL `<if>`、`<where>` 的主要替代对象。
    

---

【6】批量插入（PreparedStatement 批处理）

```java
public void insertBatch(List<User> users) throws Exception {
    String sql = "INSERT INTO users(name, age) VALUES(?, ?)";

    try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");
         PreparedStatement ps = conn.prepareStatement(sql)) {

        for (User u : users) {
            ps.setString(1, u.getName());
            ps.setInt(2, u.getAge());
            ps.addBatch();  // 加入批处理队列
        }

        ps.executeBatch();  // 执行所有批处理语句
    }
}
```

**讲解重点**：

- `addBatch()` 会缓存语句，统一 `executeBatch()` 提交。
    
- 批处理不自动提交事务，如需保障一致性，建议搭配 `conn.setAutoCommit(false)` 和 `conn.commit()`。
    
- JDBC 批处理效率高，但不支持主键回填或复杂映射。
    

---

总结

|功能|JDBC 实现|需要手动做的事情|
|---|---|---|
|数据库连接|`DriverManager.getConnection`|手动管理连接、关闭资源|
|参数绑定|`ps.setXxx()`|防止 SQL 注入，但繁琐|
|结果映射|`rs.getXxx()`|全手动映射字段|
|事务控制|`conn.setAutoCommit(false)`|需自己写 `commit/rollback`|
|动态 SQL|`StringBuilder` 拼接|参数位序很容易出错|
|批处理|`addBatch()/executeBatch()`|无主键回填，无类型转换|
|主键回填|`ps.getGeneratedKeys()`|手动填充回 Java 对象|

---

如果你有自己写的 JDBC 模板代码，我可以帮你改写成 MyBatis 的 mapper + XML，节省大量样板逻辑。需要我给你改一下试试吗？



### java管理事务的方式

**基于注解的方式**
可以在方法或者类上添加`@Transactional`注解，表示该类中的所有方法或者该类都将在事务中执行，然后可以通过`@Transactional`注解的属性来配置事务的行为，例如传播行为、隔离级别、超时时间等：
- 配置事务管理器：在 Spring 的配置文件（如`applicationContext.xml`）中配置事务管理器。通常使用`DataSourceTransactionManager`来管理基于 JDBC 的事务。
```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager"> <property name="dataSource" ref="dataSource"/> 
</bean>
```
- 启用事务注解驱动：在配置文件中启用事务注解驱动，以便 Spring 能够识别`@Transactional`注解。
```xml
<tx:annotation-driven transaction-manager="transactionManager"/>
```
- 加注解：
```java
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 30)
public void addUser(User user) {
    // 添加用户逻辑
}
```


**编程式事务管理**



**使用`TransactionTemplate`**
`TransactionTemplate`是一种编程式事务管理的方式，可以通过它来执行事务操作。
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
@Service
public class UserService {
    @Autowired
    private TransactionTemplate transactionTemplate;
    @Autowired
    private UserRepository userRepository;
    public void addUser(User user) {
        transactionTemplate.execute(status -> {
            try {
                userRepository.save(user);
            } catch (Exception e) {
                status.setRollbackOnly();
                throw e;
            }
            return null;
        });
    }
}
```
使用`PlatformTransactionManager`：`PlatformTransactionManager`是 Spring 事务管理的核心接口，可以通过它来手动管理事务。
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
@Service
public class UserService {
    @Autowired
    private PlatformTransactionManager transactionManager;
    @Autowired
    private UserRepository userRepository;
    public void addUser(User user) {
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
        try {
            userRepository.save(user);
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            throw e;
        }
    }
}
```
**基于 XML 配置的方式**
- **配置事务管理器**：在 Spring 的配置文件（如`applicationContext.xml`）中配置事务管理器。通常使用`DataSourceTransactionManager`来管理基于 JDBC 的事务。
```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
```
- **启用事务注解驱动**：在配置文件中启用事务注解驱动，以便 Spring 能够识别`@Transactional`注解。
```xml
<tx:annotation-driven transaction-manager="transactionManager"/>
```

### Java中保证事务的例子
事务管理确保了事务的四个基本特性，即 ACID 特性：
1. **原子性（Atomicity）**：事务中的所有操作要么全部成功执行，要么全部不执行。如果事务中的任何一个操作失败，整个事务都会回滚到事务开始前的状态。
- 例如，在使用 JDBC 连接数据库时，可以使用`Connection`对象的`setAutoCommit(false)`方法开启事务，然后在一系列操作完成后，使用`commit()`方法提交事务，如果出现异常则使用`rollback()`方法回滚事务。
```java
try {
    connection.setAutoCommit(false);
    // 执行一系列数据库操作
    statement.executeUpdate(sql1);
    statement.executeUpdate(sql2);
    connection.commit();
} catch (SQLException e) {
    connection.rollback();
    throw e;
}
```
- 使用事务管理器：在使用框架如 Spring 时，可以利用其提供的事务管理器来实现事务的原子性。在被`@Transactional`注解标记的方法中，Spring 会自动管理事务，出现异常时自动回滚。
2. **一致性（Consistency）**：事务执行前后，数据库必须保持一致的状态。事务不能破坏数据库的完整性约束（如唯一性约束、外键约束等）。
例如，在创建表时，可以指定字段的约束条件。
```sql
CREATE TABLE my_table (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    foreign key (other_table_id) references other_table(id)
);
```
- . 业务逻辑验证：在应用程序的业务逻辑层，进行数据验证和业务规则的检查。例如，在一个订单处理系统中，确保订单总金额与商品价格和数量的计算结果一致。
```java
public class OrderService {
    public void createOrder(Order order) {
        double totalAmount = calculateTotalAmount(order);
        if (totalAmount!= order.getTotalAmount()) {
            throw new IllegalArgumentException("订单总金额不一致");
        }
        // 保存订单到数据库
    }
}
```
1. **隔离性（Isolation）**：多个事务并发执行时，每个事务都应该像在单个用户环境下执行一样，不受其他事务的影响。不同的隔离级别（如读未提交、读已提交、可重复读、串行化）提供了不同程度的隔离性。
例如，在使用 JDBC 连接时，可以使用`Connection`对象的`setTransactionIsolation()`方法设置隔离级别。
```java
connection.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
```
2. 使用数据库锁：数据库通常提供不同类型的锁机制，如行锁、表锁等，可以用来控制并发事务对数据的访问。在某些复杂的业务场景下，可以考虑使用数据库锁来确保隔离性。但要注意锁的使用可能会影响性能，需要谨慎使用。
3. 使用框架提供的隔离级别设置：在使用 Spring 等框架时，可以通过配置事务管理器来设置事务的隔离级别。
```java
@Transactional(isolation = Isolation.SERIALIZABLE)
public void doSomething() {
    // 业务逻辑代码
}
```
1. **持久性（Durability）**： 一旦事务成功提交，其对数据库的更改就会永久保存，即使发生系统崩溃或断电等故障，事务的更改也不会丢失。
- **事务管理涉及以下具体操作**：
- 事务的开始（Begin）：开始一个新的事务。在声明式事务管理中，通常是通过 @Transactional 注解来隐式地开始事务。
- 事务的提交（Commit）：当事务中的所有操作都成功执行后，事务会被提交，所有更改将被永久保存到数据库中。
- 事务的回滚（Rollback）：如果事务中的任何操作失败，事务会被回滚，所有更改将被撤销，数据库将恢复到事务开始前的状态。
- 事务的传播行为（Propagation）：控制事务在方法调用时的行为。例如，REQUIRED 表示如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。
- 事务的隔离级别（Isolation Level）：控制事务之间的隔离程度。例如，READ_COMMITTED 表示一个事务只能读取另一个事务已经提交的数据。
- 事务的超时时间（Timeout）：设置事务的超时时间。如果事务在指定的时间内未完成，事务将被自动回滚。
**简单的示例**
- 在这个例子中，`@Transactional`注解确保了`addUserAndCreateOrder`方法中的所有数据库操作都在一个事务中执行。
- 如果`userRepository.save(user)`成功执行，但`orderRepository.save(order)`抛出异常，整个事务将被回滚，用户和订单都不会被保存到数据库中。
```java
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Transactional
    public void addUserAndCreateOrder(User user, Order order) {
        try {
            // 添加用户
            userRepository.save(user);
            // 创建订单
            order.setUserId(user.getId());
            orderRepository.save(order);
        } catch (Exception e) {
            // 如果任何操作失败，事务将自动回滚
            throw e;
        }
    }
}
```



## JDK动态代理
功能：在运行时创建一个实现了指定接口的代理对象，所有方法调用都会被转发到你提供的 `InvocationHandler` 中处理。

**作用**：
屏蔽网络通信的复杂性

**名称解释**：
- 动态，就是根据接口动态生成接口的代理对象，不用像静态代理那样，为每一个接口写死一个代理类
- 名称中带上"JDK"是因为，这是 Java 官方（JDK）内置提供的一种基于接口的运行时代理机制，并且为了区分CGLIB动态代理和ByteBuddy、Javassist 等其他代理库

**依赖**：它来自于 JDK 标准库中的两个核心类：
`java.lang.reflect.Proxy`
`java.lang.reflect.InvocationHandler`：JDK 动态代理的核心机制，当你调用某个代理对象的方法时，会触发 `invoke` 方法执行，而不是直接执行真正的逻辑。

**常见用途**：远程调用、AOP、权限控制、懒加载、Mock测试

**一般形式**：
```java
Object proxy = Proxy.newProxyInstance(
    类加载器,
    接口数组,
    InvocationHandler实现
);
```
调用上述代码，然后获得的 `proxy` 是一个 “实现了你指定接口”的对象，但它里面没有真正的实现类，而是所有方法都会被转发到你写的 `InvocationHandler.invoke()` 方法中执行。


举例：
```java
// 你本来有个接口
public interface HelloService {
    void sayHello(String name);
}

// 动态代理实现
public class HelloServiceHandler implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("调用方法：" + method.getName());
        System.out.println("参数：" + Arrays.toString(args));
        return null;
    }
}


// 创建代理对象
HelloService proxy = (HelloService) Proxy.newProxyInstance(
        HelloService.class.getClassLoader(),
        new Class[]{HelloService.class},
        new HelloServiceHandler()
);

// 使用代理对象
proxy.sayHello("张三");  // 实际执行的是 invoke() 方法

```

```txt

%输出结果：
调用方法：sayHello
参数：[张三]

%过程：
接口 HelloService
   ↓
Proxy.newProxyInstance(...)  ← InvocationHandler 实现类
   ↓
动态生成 Proxy 类，实现 HelloService 接口
   ↓
调用 proxy.sayHello("张三")
   ↓
进入 invoke(proxy, method, args) 方法中
```



## Future
**介绍**：
`future` 是 Java 并发包 (`java.util.concurrent`) 提供的**一个接口**，用来表示一个**异步计算的结果**。  
它的作用是：你提交一个任务到线程池后，不必等它执行完就能拿到一个 `Future` 对象，后面可以用这个对象获取结果、检查任务状态、取消任务等。

使用示例：
```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

System.out.println("任务提交了，我先干别的事");

// 阻塞等待任务完成并拿结果
Integer result = future.get();
System.out.println("任务结果: " + result);

executor.shutdown();
```

常用方法：

| 方法                                      | 作用           |
| --------------------------------------- | ------------ |
| `get()`                                 | 阻塞等待结果返回     |
| `get(timeout, unit)`                    | 等待指定时间，超时抛异常 |
| `cancel(boolean mayInterruptIfRunning)` | 取消任务         |
| `isDone()`                              | 判断任务是否完成     |
| `isCancelled()`                         | 判断任务是否被取消    |






## Math
是 Java 标准库中的类，提供数学运算的常用方法（取整、随机数、幂运算等）
`Math` 是 Java 提供的一个**数学工具类**，包含大量**静态方法**，用于执行基本的数学运算。
在 `java.lang` 包下，无需导入即可使用。



**示例：**
```java
int max = Math.max(10, 20);      // 20
double r = Math.sqrt(9.0);       // 3.0
double pi = Math.PI;             // 3.141592...
```



**常见的 `Math` 方法：**
* `Math.abs(x)`：返回绝对值
* `Math.max(a, b)` / `Math.min(a, b)`：求最大/最小值
* `Math.pow(a, b)`：a 的 b 次幂
* `Math.sqrt(x)`：平方根
* `Math.round(x)`：四舍五入
* `Math.floor(x)`：向下取整
* `Math.ceil(x)`：向上取整
* `Math.random()`：生成 0～1 之间的随机数
* `Math.sin(x)` / `Math.cos(x)`：三角函数（参数是弧度）


## Object
特点：`Object` 是 Java 所有类的根类，所有类默认都继承它。
**Object类的常见方法**
* `equals()`：判断两个对象是否“相等”
* `hashCode()`：返回对象的哈希值
* `toString()`：返回对象的字符串表示
* `getClass()`：返回对象的运行时类
* `clone()`：创建对象副本（需实现 `Cloneable` 接口）
* `finalize()`：对象被 GC 前调用（已过时）
* `wait()`, `notify()`, `notifyAll()`：线程通信方法，配合同步锁使用
**\=\=和equals()的区别**
- `==` 是比较两个对象的引用是否相同，也就是是否指向同一块内存地址。
- `equals()` 默认实现与 `==` 类似，但多数类（如 `String`、`Integer`）都重写了它，变为值比较。
- 举例：
```java
String a = new String("abc");
String b = new String("abc");
a == b        // false：不同对象
a.equals(b)   // true：内容相同
```
**hashCode()和equals()的关系**
- hashCode 和 equals 都用于集合类的对象比较。
* 两个对象进行 `equals()` 比较相等，它们进行 `hashCode()` 比较也一定相等。
* 反之不成立：`hashCode` 相同不一定 `equals` 相等。
* 所以，先判断 hashCode，相同再判断 equals，可以提高查找效率。
**为什么要重写hashCode()和equals()**
* 如果只重写了 `equals()` 而不重写 `hashCode()`，即使两个对象逻辑上相等，它们 hash 值不一样，集合查找会失败。
* 如果重写不一致，会破坏集合的正确性，导致找不到 key、数据丢失等问题。

## Wrapper
是 Java 标准库中的类，基本数据类型的包装类（Integer, Double 等）
包装类是 Java 为每种基本数据类型提供的**类类型封装**，使得基本类型可以像对象一样使用。

| 基本类型      | 包装类         |
| --------- | ----------- |
| `int`     | `Integer`   |
| `double`  | `Double`    |
| `boolean` | `Boolean`   |
| `char`    | `Character` |
| `long`    | `Long`      |
| `float`   | `Float`     |
| `byte`    | `Byte`      |
| `short`   | `Short`     |
这些都位于 `java.lang` 包中，**默认自动导入**，可以直接使用。

**包装类的作用：**
* 可以作为对象使用（基本类型不能调用方法）；
* 可以用于泛型、集合等只接受对象的场合；
* 提供了很多便捷的静态方法（如 `Integer.parseInt()`）；
* 支持 **自动装箱/拆箱**（Java 5 引入）：
```java
Integer i = 10;     // 自动装箱：int → Integer
int j = i + 5;      // 自动拆箱：Integer → int
```


## 系统学习网站
- Java教程 - 廖雪峰的官方网站： https://www.liaoxuefeng.com/wiki/1252599548343744
- How2J 的 Java教程： https://how2j.cn/
- 动力节点投稿视频-动力节点视频分享-哔哩哔哩视频： https://space.bilibili.com/76542346/video
- 黑马程序员投稿视频-黑马程序员视频分享-哔哩哔哩视频： https://space.bilibili.com/37974444/video?tid=0&special_type=&pn=1&keyword=&order=pubdate
- 尚硅谷投稿视频-尚硅谷视频分享-哔哩哔哩视频： https://space.bilibili.com/302417610/video
- Java 全栈知识点问题汇总（上） | Java 全栈知识体系： https://www.pdai.tech/md/interview/x-interview.html
- [Javadoop](https://www.javadoop.com/)：一个写Java相关知识的博主


## 学习资料


小傅哥，我觉得偏底层，比较难，有种为了难而难，都不讲基础。。。哦，仔细看了下，有基础，这个是一篇篇大播客文章的形式组织的，我觉得很不好： https://bugstack.cn/md/java/interview/2020-07-28-%E9%9D%A2%E7%BB%8F%E6%89%8B%E5%86%8C%20%C2%B7%20%E5%BC%80%E7%AF%87%E3%80%8A%E9%9D%A2%E8%AF%95%E5%AE%98%E9%83%BD%E9%97%AE%E6%88%91%E5%95%A5%E3%80%8B.html



- 新版Java面试专题视频教程，java八股文面试全套真题+深度详解（含大厂高频面试真题）_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1yT411H7YK/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
- 史上最全的Java程序员学习路线(Java学习者必备)10分钟让你了解Java程序要需要学习的那些知识_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1K4411r7DP/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
- 我肝了一周，Java从基础到项目教程，Java全栈学习路线，帮你省去培训机构的2万块钱。_java nio selector 组播-CSDN博客： https://blog.csdn.net/mengchuan6666/article/details/118816713?spm=1001.2014.3001.5501
- Java程序员学习路线图_黑马程序员2024版java学习路线： https://yun.itheima.com/subject/javamap/index.html?hm-pc-dh$bz
- AobingJava/JavaFamily: 【Java面试+Java学习指南】 一份涵盖大部分Java程序员所需要掌握的核心知识。： https://github.com/AobingJava/JavaFamily
- Java程序员学习路线图_黑马程序员2024版java学习路线： https://yun.itheima.com/subject/javamap/index.html?hm-pc-dh$bz
- Java学习路线目录索引(持续更新中)_Java_白骆驼的博客-CSDN博客： https://blog.csdn.net/m0_37989980/article/details/103987924
- Java开发学习路线 | ProcessOn免费在线作图,在线流程图,在线思维导图： https://www.processon.com/view/link/5eb6a1b0e401fd16f4283225#map
- Java学到什么水平能够出去找工作！！_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1TK4y187Ak/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63



## END
