---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tags:
  - default
---

# JavaProjectPractice

- Java项目知识-ProcessOn： https://www.processon.com/mindmap/677cec50e077601644367110


## 流程规范
🧭 开发全流程总览
```
需求评审 → 技术设计 → 开发 → 提交代码 → 代码评审 → 测试 → 上线发布 → 版本归档
```
✅ 总结：程序开发流程结构图
```
需求分析 → 技术设计 → 编码实现 → 提交合并 → 测试验证 → 发布上线 → 版本归档
       ↘—— 代码规范 ——↗     ↘—— 代码评审 ——↗      ↘—— 灰度+监控 ——↗
```
**相关资料**：
- 【大厂开发流程规范：少年不知班滋味，为装实习强说愁】 https://www.bilibili.com/video/BV1g4VzzLEgJ/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
- 如何设计负责一个项目 UP主：玄米4S 投稿日期：4-20 www.bilibili.com/video/BV1Zw4m117z8/
**1️⃣ 需求阶段**

| 步骤         | 内容                               |
| ---------- | -------------------------------- |
| 产品经理编写 PRD | 明确功能点、交互、接口需求                    |
| 需求评审会议     | 开发、测试、产品三方沟通，消除误解                |
| 拆解任务       | 把大需求拆成多个开发任务，写入需求文档或任务系统（如 Jira） |
任务系统是团队用来分配、跟踪、协作完成开发任务的工具。它就像一个“项目管理的看板”，列出所有要开发的功能、BUG、文档、测试项，每个人认领一块来做。
一张任务的结构长这样：
| 字段   | 内容                    |
| ---- | --------------------- |
| 标题   | 登录功能开发                |
| 描述   | 完成用户登录接口、校验逻辑、错误提示等   |
| 状态   | 待开始 / 开发中 / 已完成 / 已上线 |
| 指派人  | 你                     |
| 截止时间 | 5 月 20 日              |
**2️⃣ 技术设计阶段**
| 步骤                   | 内容                               |
| -------------------- | -------------------------------- |
| 架构师/开发 Leader 拟定设计文档 | 包括接口定义、数据库表结构、模块职责等              |
| 技术评审                 | 确保设计可行、易维护、性能合格                  |
| 工时预估                 | 为排期做准备（敏捷迭代，通常为 1\~2 周一个 Sprint） |
Sprint 是什么？
**Sprint 是敏捷开发中一轮“固定周期的开发计划”**，可理解为“开发回合”，通常为 1~2 周。
|阶段|说明|
|---|---|
|Sprint Planning|计划这一轮开发做哪些功能|
|Sprint 中|每天 Standup，汇报进度|
|Sprint End|提交代码、测试、上线|
|Sprint 回顾|哪些做得好，哪些要改进|
**3️⃣ 开发阶段（编码）**
| 规范    | 内容                                   |
| ----- | ------------------------------------ |
| 分支规范  | 每个功能点一个 `feature/xxx` 分支             |
| 提交规范  | 使用语义化提交：`feat:` `fix:` `refactor:` 等 |
| 编码规范  | 严格遵循团队代码规范（如阿里 Java 规范）              |
| 单元测试  | 新增逻辑需配套测试代码，代码覆盖率达标                  |
| 自动化构建 | 使用 Maven/Gradle/NPM 等打包工具，确保构建成功     |
语义化提交是什么？（feat / fix / refactor）
语义化提交就是**在 Git 提交信息中加上有意义的前缀**，让团队清晰知道每次改动干了什么。
例如：
git commit -m "feat: 添加用户注册接口"
git commit -m "fix: 修复登录密码校验失败问题"
git commit -m "refactor: 重构 userService 结构"
| 前缀          | 含义         | 举例        |
| ----------- | ---------- | --------- |
| `feat:`     | 新功能        | 添加上传头像接口  |
| `fix:`      | 修 Bug      | 修复表单提交失败  |
| `refactor:` | 重构代码（功能不变） | 优化循环结构    |
| `docs:`     | 改文档        | 改 API 注释  |
| `style:`    | 样式变更       | 改按钮颜色     |
| `test:`     | 加单测        | 添加用户登录的测试 |
**4️⃣ 提交与代码管理（Git）**
| 规范          | 内容                                                |
| ----------- | ------------------------------------------------- |
| Git Flow    | 遵循 `main/dev/feature` 分支管理规范                      |
| 提交前检查       | 本地运行单测、eslint、formatter                           |
| 合并方式        | 禁止直接 push main，使用 Pull Request / Merge Request 合并 |
| Code Review | 每次提交必须经至少 1 人评审，平台如 GitHub/GitLab 支持              |
单测 / ESLint / Formatter 是什么？
- 单测（单元测试，Unit Test）是指对一个“函数/模块”的输入输出写代码进行自动验证。
- ESLint（JavaScript）/ Checkstyle（Java）是一种“代码风格/语法规范检查工具”，强制你写出干净、统一的代码，让团队统一代码风格，方便协作。比如变量名不能用 `a1`、不能多空格、不能缺少 `;`
- Formatter（格式化工具）自动帮你排版代码、加缩进、对齐 `{}`、统一引号等。
**5️⃣ 测试阶段**
| 步骤     | 内容                             |
| ------ | ------------------------------ |
| 自测     | 开发完成后，需自测核心功能是否正常              |
| QA 测试  | 测试环境上线，测试人员验证功能、边界、异常流程        |
| Bug 修复 | 与测试对接，修复所有 blocker/critical 问题 |
| 测试用例归档 | 测试用例需记录并回归使用                   |
blocker / critical这是测试用语，表示**Bug 的严重程度等级**：
| 等级          | 意思                 | 示例            |
| ----------- | ------------------ | ------------- |
| 🟥 Blocker  | 阻塞上线，**不修不能上线**    | 登录页面报错，无法进入系统 |
| 🟧 Critical | 严重问题，**功能可用但错误明显** | 提交表单成功了但提示失败  |
| 🟨 Major    | 重要但可延后             | 页面卡顿、样式错位     |
| 🟩 Minor    | 小问题                | 字体大小不统一、拼写错误  |
6️⃣ 上线发布
| 步骤   | 内容                                 |
| ---- | ---------------------------------- |
| 上线计划 | 写好发布单，注明功能、涉及模块、回滚方案               |
| 发布方式 | 手动部署 / Jenkins / Docker / k8s 自动部署 |
| 灰度发布 | 对部分用户放量，验证稳定后再全量推送                 |
| 回滚机制 | 保留上一版本镜像或代码，确保出错能快速回滚              |
7️⃣ 运维监控与版本归档
| 步骤   | 内容                             |
| ---- | ------------------------------ |
| 日志监控 | 使用 ELK、Prometheus、Sentry 等监控系统 |
| 报错告警 | 异常报警通知到人（钉钉/飞书/企业微信）           |
| 版本记录 | 每次上线记录版本号、变更内容、操作人             |
| 归档文档 | 技术文档、测试报告、发布说明归档备查             |
ELK / Prometheus / Sentry 这些是**系统监控工具**，上线后**实时收集日志、异常、性能、状态**：
| 工具                                        | 作用                 | 举例                           |
| ----------------------------------------- | ------------------ | ---------------------------- |
| 📊 ELK（Elasticsearch + Logstash + Kibana） | 搜集 + 存储 + 可视化日志    | 搜索异常日志、画出请求图表                |
| 🔍 Prometheus                             | 监控系统指标（CPU、内存、请求数） | 配合 Grafana 展示图表              |
| 🛠 Sentry                                 | 实时捕捉报错，记录调用栈、用户、页面 | 突然前端报错、后端 NullPointer 会自动发通知 |
🧠 团队规范补充建议
| 项目                    | 说明                            |
| --------------------- | ----------------------------- |
| Code Review Checklist | 评审关注点：命名清晰、逻辑正确、异常处理、注释、重复代码  |
| 日常 Standup（敏捷）        | 每日早会说进度、问题、下一步                |
| Wiki 文档               | 用语雀、Confluence、Notion 等管理知识沉淀 |
| 权限管理                  | 数据库权限、发布权限、分支合并权限按角色控制        |

## 项目结构

**架构分层**
- **Controller（控制层）**：负责处理用户请求，将请求转发到Service层，并将处理结果返回给用户。控制层接收请求数据、调用Service层并格式化响应数据。主要使用Spring的`@RestController`等注解，将请求路由到对应的处理方法。
- **Service（业务逻辑层）**：负责处理核心业务逻辑，将DAO层的数据进一步加工处理，避免直接在Controller层与数据库交互。
- **DAO（Data Access Object）层**：负责与数据库交互，处理数据的增、删、改、查操作。主要包含实体类和数据库操作代码。比如，在Spring项目中，DAO层通常使用Spring Data JPA、MyBatis等ORM工具，将数据库操作封装在数据访问对象中。

**文件结构**
标准的 Java 项目结构通常包括以下几个重要部分：
```
my-project/
├── src/
│   ├── main/
│   │   ├── java/               ## 主应用程序源代码
│   │   ├── resources/          ## 资源文件，如配置文件、静态文件等
│   ├── test/
│   │   ├── java/               ## 测试代码
│   │   ├── resources/          ## 测试资源文件
├── target/                     ## 编译后的文件，构建输出目录
├── lib/                        ## 外部库（jar文件）
├── pom.xml / build.gradle      ## 构建工具文件 (Maven/Gradle)
├── README.md                   ## 项目的描述文件
└── .gitignore                  ## Git 忽略文件
```
解释：
- **`src/`**：源代码目录，包含实际的应用代码和资源文件。
    - **`main/`**：包含项目的主要源代码。
        - **`java/`**：Java源代码，通常按照包名的结构进行组织。
        - **`resources/`**：存放非代码资源文件，如配置文件、模板文件等。
    - **`test/`**：包含测试代码。
        - **`java/`**：测试类的源代码，通常与 `src/main/java` 的结构相同。
        - **`resources/`**：存放测试用的资源文件。
- **`target/`**：这个文件夹由构建工具（如 Maven 或 Gradle）生成的目录，包含编译后的`.class`字节码文件、打包后的 JAR 文件以及临时文件。
- **`lib/`**：存放外部库的目录，在使用 Maven 或 Gradle 时，库文件通常不需要手动管理，通过依赖管理自动下载，并存储在本地仓库中。
- **`pom.xml` / `build.gradle`**：构建工具的配置文件，分别用于 Maven 和 Gradle。它们定义了项目的构建过程、依赖项等。
- **`README.md`**：项目的描述文件，包含项目的简介、功能、安装和使用说明等。
- **`.gitignore`**：Git 忽略文件，用于告诉 Git 哪些文件和目录不需要纳入版本控制。

**源代码目录的主要内容**
**`src/main/java/`**：这个目录包含应用程序的主要业务逻辑，通常按照包结构来组织。

例如，一个电商项目可能会有如下的包结构：
```
src/main/java/
├── com/
│   ├── atguigu/
│   │   ├── ecommerce/
│   │   │   ├── controller/        ## 控制器层，处理请求
│   │   │   ├── service/           ## 服务层，处理业务逻辑
│   │   │   ├── repository/       ## 数据访问层，通常使用 DAO 或 JPA
│   │   │   └── model/             ## 实体类（POJO）
│   │   └── util/                  ## 工具类
```

- **`controller/`**：处理用户请求和响应。
- **`service/`**：实现核心业务逻辑。
- **`repository/`**：与数据库或外部数据源交互。
- **`model/`**：定义数据结构和实体类。
- **`util/`**：包含一些通用的工具类。


**项目资源目录**
**`src/main/resources/`**：包含应用程序所需的非源代码文件，通常包括：
- 配置文件（例如：`application.properties`、`application.yml`）
- 静态文件（如：HTML、CSS、JS 文件）
- 模板文件（如：Thymeleaf、FreeMarker 等）
- 日志配置文件（如：log4j、slf4j）
    
示例：
```
src/main/resources/
├── application.properties  ## Spring Boot 配置文件
├── static/                 ## 静态资源文件（如图片、CSS、JS）
└── templates/              ## HTML 模板文件（如 Thymeleaf）
```

**测试文件目录**
- **`src/test/java/`**：包含单元测试代码和测试逻辑，通常结构和 `src/main/java` 一样。为了方便测试，通常会有与主代码结构相同的包结构，以便在测试类中直接访问相关类。
示例：
```
src/test/java/
├── com/
│   ├── atguigu/
│   │   ├── ecommerce/
│   │   │   ├── service/        ## 测试服务层
│   │   │   └── controller/     ## 测试控制器层
```



**一些组织原则** 
- **遵循 SOLID 原则**：通过遵循面向对象的设计原则（如 SOLID 原则），确保代码的可维护性和扩展性。
- **清晰的模块化**：在较大的项目中，分模块管理各个业务功能模块，每个模块有自己的业务层、数据访问层、接口层等。这样可以提高代码的可维护性和可扩展性。
- **配置与代码分离**：将配置文件（如数据库连接、应用程序配置）与代码分离。Spring Boot 项目通常使用 `application.properties` 或 `application.yml` 来进行配置管理。


**一些知识点**：
划分包的好处：做出逻辑上的区分、提供命名空间，避免类名冲突、控制类的访问权限





## 项目构建
**构建**（Build）是指将源代码转换为用户可以运行或部署的形式（比如可执行的应用程序或软件包）的过程。

为什么需要构建工具，直接用**Java 编译器**（`javac`）编译不行吗？
虽然**Java 编译器**（`javac`）负责编译，但一个项目中，有那么多源代码，一个个编译非常繁琐，使用构建工具就是将这个过程自动化，并且，编译源代码只是构建这个过程的整个生命周期的一部分，除了自动编译源代码，构建工具还负责：下载并管理所有外部依赖、使用JUnit的TestNG等测试框架运行单元测试和集成测试等、进行打包，生成最终的可执行 JAR 或 WAR 文件、部署应用

需要构建工具的理由：
**自动化和高效**：手动执行每一个构建步骤（编译、测试、打包等）既繁琐又容易出错。构建工具通过自动化这些步骤，节省了时间并减少了人为错误。
**依赖管理**：现代应用程序往往依赖于大量的外部库。构建工具帮助你管理这些依赖，确保它们的版本一致性，并自动下载所需的依赖包。
**自动化测试**：构建工具支持 自动化测试，可以在构建的过程中自动执行单元测试和集成测试，确保代码的质量。
**持续集成和交付**：在现代开发流程中，构建工具常常与 持续集成（CI） 系统（如 Jenkins、GitLab CI）配合使用，实现自动化的构建、测试和部署流程。
**跨平台支持**：构建工具可以确保项目在不同的操作系统和环境下都能成功构建和运行。你只需要运行构建命令，工具会自动处理不同操作系统之间的差异。


**构建工具**
- **Maven**：常见的构建工具
- **Gradle**：另一个现代化的构建工具，它也支持自动化构建、依赖管理等功能，不仅限于 Java，适用于 Java、Kotlin、Android 等多种开发语言。于 **DSL**（领域特定语言）来配置构建任务，比 Maven 更灵活，支持增量构建。
- **Ant**：较老的构建工具，基于 XML 配置，逐步被 Maven 和 Gradle 所取代。


## 项目测试

Spring Boot 和许多构建工具（如 Maven 和 Gradle）会假设测试类位于 `src/test/java` 目录下，并在构建时将该目录下的文件识别为测试源代码。

这通常可以通过在 `pom.xml` 或 `build.gradle` 文件中配置源代码路径来实现。

* **Maven** 配置示例：
```xml
<build>
   <testSourceDirectory>src/main/tests</testSourceDirectory>
</build>
```
* **Gradle** 配置示例：

```groovy
sourceSets {
   test {
	   java {
		   srcDirs = ['src/main/tests']
	   }
   }
}
```

- **IDE配置**：使用的是 IDE（如 IntelliJ IDEA 或 Eclipse），你可能需要手动配置项目的测试源路径，以便 IDE 能够识别并运行测试类。

## 项目部署
```txt
开发完成 → 打包构建 → 配置环境 → 上传服务器 → 启动运行 → 配置监控/守护 → 配置域名/HTTPS
```
总结：Java 项目部署步骤

| 步骤  | 内容                        |
| --- | ------------------------- |
| 1   | 构建打包（`mvn package`）       |
| 2   | 安装 JDK，准备服务器              |
| 3   | 上传 `.jar` 或 `.war` 到服务器   |
| 4   | 启动程序（`java -jar xxx.jar`） |
| 5   | 后台运行（`nohup` / `systemd`） |
| 6   | 配置 Nginx 反向代理             |
| 7   | 设置守护与自动重启                 |
| 8   | 配置域名和 HTTPS               |
🧠 补充建议：

| 任务       | 工具推荐                                    |
| -- | -- |
| 自动化部署    | Jenkins / GitHub Actions / GitLab CI    |
| 监控日志     | ELK / Loki / Promtail                   |
| 容器化部署    | Docker + Dockerfile + Docker Compose    |
| 生产环境配置分离 | application-prod.yml 配合 Spring Profiles |
**1️⃣ 代码开发完成 ✅**
* 确认代码运行正常，本地测试通过。
* 使用如 Maven、Gradle 管理依赖。
**2️⃣ 打包构建项目（构建产物）**
**JAR 或WAR包是什么？**
- JAR（Java ARchive） 就像 Java 语言的“EXE”，是一种可运行的打包格式。
* `.jar` = 把你写的 `.java` 源文件编译成 `.class` 字节码文件，然后打包成一个压缩文件，里面可能还包含配置、资源、第三方依赖等。
* 它是 Java 程序的最终可执行文件，可以在任何装了 JDK 或 JRE 的系统上运行
```bash
java -jar myApp.jar
```
* 类似的东西还有：
  * Windows 的 `.exe`
  * Python 的 `.pyc` / `.whl`
  * Node.js 的 `.js` 启动文件
**为什么要打包？**
🔧 平时直接运行源代码 `.java`：
* 只能本地运行
* 不包含依赖
* 不利于部署
打包成 `.jar` 后的好处：
✅ 可独立运行  一个文件就能跑，方便部署到服务器
✅ 包含依赖   所有用到的类库都能一起打包进去 
✅ 更安全更规范 不泄露源码、不担心版本混乱   
✅ 可用于部署  运维/上线部署的标准方式
**JAR包 和 WAR包 的区别**
`.jar`：打包好能直接吃的“外卖便当”
`.war`： 做菜材料打包好，但需要你有“厨房”（Tomcat）

| 对比项     | `.jar`（Java ARchive）        | `.war`（Web ARchive）                   |
| ------- | --------------------------- | ------------------------------------- |
| 📦 包含内容 | Java 程序、依赖                  | Java Web 应用（Servlet、HTML、JSP、Web.xml） |
| 🧰 运行方式 | 直接运行（`java -jar xxx.jar`）   | 需要部署到 Web 容器（如 Tomcat）                |
| 🎯 使用场景 | Spring Boot、桌面工具、独立服务       | 传统 Web 项目，如 JSP、Servlet、Spring MVC    |
| 🛠 部署依赖 | 自带 Web 服务器（内嵌 Jetty/Tomcat） | 依赖外部容器（如 Tomcat、Jetty）                |
| 🗃 项目结构 | 灵活自由                        | 必须有 `WEB-INF/`, `web.xml` 等结构         |
| ⏱ 启动方式  | 一条命令立即跑起来                   | 复制到 Tomcat 的 `webapps/` 下重启容器         |
例如：
* `Spring Boot` 项目 → 默认打成 `.jar`，**内嵌服务器，独立运行**
* `Spring MVC + JSP` 项目 → 打成 `.war`，**部署到外部 Tomcat**
**JAR包和WAR包的部署区别**

| 步骤        | JAR 包部署                        | WAR 包部署                           |
| --------- | ------------------------------ | --------------------------------- |
| 打包命令      | `mvn package` 或 `gradle build` | 同上，但生成 `.war`                     |
| 运行方式      | `java -jar app.jar`            | 拷贝到 Tomcat 的 `webapps/`，启动 Tomcat |
| Web 容器    | 不需要（自带）                        | 需要（Tomcat、Jetty、WebLogic 等）       |
| 启动速度      | 快，一条命令跑                        | 慢，要启动整个容器                         |
| 现代化       | ✅ Spring Boot 推荐方式             | ❌ 传统，正逐渐淘汰（除大型老项目）                |
| DevOps 支持 | 容易容器化（Docker）                  | 不灵活，依赖环境                          |
**不同的打包工具**：
**Maven**：最常见的 Java 构建工具，依赖管理清晰、广泛使用      
**Gradle**： 配置更灵活、语法更现代（Groovy 或 Kotlin DSL）
**Ant**（过时） 老一代构建工具，很少用了
它们的目标都是：帮你把项目打成 `.jar` 或 `.war` 包，区别只在于使用方式不同。
**Maven 和 Gradle 的详细区别**：
Maven 更传统稳定、适合初学者；Gradle 更现代灵活，适合复杂项目。

| 对比项        | Maven                    | Gradle                               |
| ---------- | ------------------------ | ------------------------------------ |
| 📦 配置文件格式  | XML (`pom.xml`)          | Groovy / Kotlin DSL (`build.gradle`) |
| ⛏ 构建速度     | 较慢，尤其大项目                 | 更快（支持增量构建、缓存）                        |
| 🧩 插件生态    | 非常成熟，主流 Java 项目都用        | 新一些，但现代化，扩展强                         |
| 💬 可读性     | 配置清晰但冗长                  | 简洁、逻辑性强，像写脚本                         |
| 📚 学习曲线    | 更容易上手                    | 更灵活但稍复杂                              |
| 🌍 使用场景    | Spring Boot、传统项目、企业项目广泛用 | Android 项目首选，现代微服务也多用                |
| 📦 多模块项目支持 | 支持，但配置较繁琐                | 更适合复杂多模块项目                           |
**使用两种打包工具打包**：
使用 Maven，生成 `target/xxx.jar` 或 `xxx.war`：
```bash
mvn clean package
```
使用 Gradle，生成 `build/libs/xxx.jar`：
```bash
gradle build
```
**总结建议**
| 场景          | 推荐方式                                    |
| ----------- | --------------------------------------- |
| 学习/自己部署/小项目 | ✅ 使用 Maven 打包成 `.jar`，直接 `java -jar` 启动 |
| 传统学校 Web 教程 | 可能还教 `.war` + Tomcat                    |
| 开公司项目/部署上线  | 90% Spring Boot 项目都用 `.jar`，更易 Docker 化 |
| Android 项目  | 推荐使用 Gradle 构建                          |
**3️⃣ 准备部署环境（服务器）**
一般使用 **Linux 服务器（CentOS/Ubuntu）** 部署：
* 安装 **JDK（Java 8/11/17 等）**
  ```bash
  java -version
  ```
* 可选安装其它工具：
  * Git
  * Docker（如用容器部署）
  * Nginx（配合做反向代理）
  * Supervisor / systemd（守护进程）
**4️⃣ 上传部署文件到服务器**
可以在服务器上 `git clone` 源码再构建，
使用软件工程传输
或使用例如这样的命令把文件传过去：
```bash
scp target/app.jar user@server-ip:/home/user/
```
**5️⃣ 启动项目**
```bash
## 一般项目
java -jar app.jar
## 后台运行 + 日志输出
nohup java -jar app.jar > app.log 2>&1 &
```
📝 注：Spring Boot 默认端口是 `8080`，你可以通过配置 `application.yml` 修改这里：
```yaml
server:
  port: 80
```
**6️⃣ 配置反向代理（可选）**
📌 Java 程序默认运行在 `localhost:8080`，而用户访问网站通常访问的是 `80`（HTTP）或 `443`（HTTPS）端口。于是，我们用 **Nginx 反向代理**来做“中转”，用户浏览器 ➜ 访问 www.xxx.com （默认访问80端口） ➜ Nginx 收到请求，代理到 127.0.0.1:8080（你的 Java 程序）
使用 Nginx 将访问转发给 Java 项目：
```nginx
server {
  listen 80;
  server_name www.example.com;
  location / {
    proxy_pass http://localhost:8080;
  }
}
```
**7️⃣ 设置守护进程（自动重启）**
推荐工具：
* `systemd` 服务脚本
* `supervisor` 管理器
* `pm2`（跨平台 Node 工具）
示例（使用 `systemd`）：
```ini
[Unit]
Description=My Java App
After=network.target
[Service]
User=youruser
ExecStart=/usr/bin/java -jar /home/youruser/app.jar
SuccessExitStatus=143
Restart=always
[Install]
WantedBy=multi-user.target
```
**8️⃣ 配置域名 & HTTPS（生产环境）**
* 使用阿里云、腾讯云等购买域名
* 配置 Nginx 做反代并申请免费证书（如 Let's Encrypt）
* HTTPS 示例：
```nginx
listen 443 ssl;
ssl_certificate /path/to/fullchain.pem;
ssl_certificate_key /path/to/privkey.pem;
```

## 项目资料

**谷粒商城**
- 谷粒商城基础版笔记-超详细： https://www.yuque.com/lius/java/hv6yb3
谷粒商城-尚硅谷： http://www.atguigu.com/video/52/

Java项目《谷粒商城》架构师级Java项目实战，对标阿里P6-P7，全网最强_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1np4y1C7Yf/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
【Java项目《谷粒商城》架构师级Java项目实战，对标阿里P6-P7，全网最强】 https://www.bilibili.com/video/BV1np4y1C7Yf/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
GitHub - NiceSeason/gulimall-learning: 2020谷粒商城代码+笔记： https://github.com/NiceSeason/gulimall-learning


**苍穹外卖**
黑马程序员Java项目实战《苍穹外卖》，最适合新手的SpringBoot+SSM的企业级Java项目实战_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1TP411v7v6/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63


**黑马头条**
- Java-项目-黑马头条-ProcessOn： https://www.processon.com/mindmap/6795f159c9489159be33580e
黑马程序员Java项目实战微服务项目《黑马头条》开发全套视频教程，基于SpringBoot+SpringCloud+Nacos等企业级微服务架构项目解决方案_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1Qs4y1v7x4/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
Java企业级微服务项目《黑马头条》实战开发： https://yun.itheima.com/course/1026.html



**苍穹外卖**
- Java-项目-苍穹外卖-ProcessOn： https://www.processon.com/mindmap/6795fb707727ae72bd256f02
Java项目实战《苍穹外卖》，基于SpringBoot+SSM企业级项目实战： https://yun.itheima.com/course/1029.html

**MIT 6.824**：
- MIT 6.824 (现6.5840) 通关记录 - 知乎： https://zhuanlan.zhihu.com/p/631386296
- 24届双非鼠鼠的求职之路_牛客网： https://www.nowcoder.com/discuss/625788122583887872?sourceSSR=search
- 6.5840-搜索结果-牛客网： https://www.nowcoder.com/search/all?query=6.5840&type=all&searchType=%E9%A1%B6%E9%83%A8%E5%AF%BC%E8%88%AA%E6%A0%8F&subType=0
- MIT 6.824第一个lab完成记录、心得和完整代码_mit 6.824如何入手-CSDN博客： https://blog.csdn.net/qq_42053724/article/details/132079897?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7Ebaidujs_baidulandingword%7ECtr-3-132079897-blog-139270485.235%5Ev43%5Epc_blog_bottom_relevance_base8&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7Ebaidujs_baidulandingword%7ECtr-3-132079897-blog-139270485.235%5Ev43%5Epc_blog_bottom_relevance_base8&utm_relevant_index=6
- MIT6.8540(6.824)合集 - 知乎： https://www.zhihu.com/column/c_1725883332322226177
- MIT 6.5840（分布式系统）- Lab1 - LKB_HUGH - 博客园： https://www.cnblogs.com/LkbHugh/p/17685895.html
- MIT 6.5840 Lab1 - MapReduce-CSDN博客： https://blog.csdn.net/weixin_51322383/article/details/132068745
- 6.5840 Schedule: Spring 2024： https://pdos.csail.mit.edu/6.824/schedule.html
- CMU 15-445 :: Intro to Database Systems (Spring 2024)： https://15445.courses.cs.cmu.edu/fall2024/
- 同程旅行 C++_牛客网： https://www.nowcoder.com/feed/main/detail/e0792f815c7347a5adb101f8d734ce0c?sourceSSR=search
- 华为面经_牛客网： https://www.nowcoder.com/feed/main/detail/ef2c8a3919184f21a022cee54a4d7f26?sourceSSR=search
- fravenx/MIT-6.824: Lab of MIT 6.824 2023 所有lab 稳定通过一万次以上 All labs stably passed 10,000 times： https://github.com/fravenx/MIT-6.824

**单个项目**
- 黑马程序员Java项目企业级微服务实战《学成在线》，基于SpringCloud、SpringCloudAlibaba技术栈开发，项目搭建到选课支付学习全通关_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1j8411N7Bm/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
- java微服务项目,springcloud项目,java分布式项目,动力商城,电商项目,springboot项目_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1ub421p7KW/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
- macrozheng/mall-swarm: mall-swarm是一套微服务商城系统，采用了 Spring Cloud Alibaba、Spring Boot、Oauth2、MyBatis、Docker、Elasticsearch、Kubernetes等核心技术，同时提供了基于Vue的管理后台方便快速搭建系统。mall-swarm在电商业务的基础集成了注册中心、配置中心、监控中心、网关等系统功能。文档齐全，附带全套Spring Cloud教程。： https://github.com/macrozheng/mall-swarm
- 手把手带你完成layui+javaWeb毕业设计管理子系统_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV11p4y167jJ/?spm_id_from=333.999.0.0&vd_source=2bebef67d77d9a55c602507243628b63
- 手写spring框架-密码：zgbe-Carl： https://www.yuque.com/chengxuyuancarl/fryvxd?#
- 卡码笔记-ywrb： https://www.yuque.com/chengxuyuancarl/px6ppg/bg81521ec7570q18
- GitHub - gz-yami/mall4cloud: ⭐️⭐️⭐️微服务商城系统 springcloud微服务商城 小程序商城： https://github.com/gz-yami/mall4cloud
- 从一个简单的web应用开始-CSDN博客： https://blog.csdn.net/qq_21517413/article/details/81049458?spm=1001.2014.3001.5506
- SpringBoot+MongoDB实现一个物流订单系统-CSDN博客： https://blog.csdn.net/qq_40693171/article/details/108229145?spm=1001.2014.3001.5506
- SpringMVC文件上传下载实战(单文件、多文件)-CSDN博客： https://blog.csdn.net/qq_40693171/article/details/107346746?spm=1001.2014.3001.5506
- 【手把手带你完成layui+javaWeb毕业设计管理子系统】 https://www.bilibili.com/video/BV11p4y167jJ/?share_source=copy_web
- macrozheng/mall: mall项目是一套电商系统，包括前台商城系统及后台管理系统，基于SpringBoot+MyBatis实现，采用Docker容器化部署。 前台商城系统包含首页门户、商品推荐、商品搜索、商品展示、购物车、订单流程、会员中心、客户服务、帮助中心等模块。 后台管理系统包含商品管理、订单管理、会员管理、促销管理、运营管理、内容管理、统计报表、财务管理、权限管理、设置等模块。： https://github.com/macrozheng/mall
- lenve/vhr: 微人事是一个前后端分离的人力资源管理系统，项目采用SpringBoot+Vue开发。： https://github.com/lenve/vhr
- lenve/VBlog: V部落，Vue+SpringBoot实现的多用户博客管理平台!： https://github.com/lenve/VBlog
- linlinjava/litemall: 又一个小商城。litemall = Spring Boot后端 + Vue管理员前端 + 微信小程序用户前端 + Vue用户移动端： https://github.com/linlinjava/litemall
- javasmall/workupload: 作业提交系统： https://github.com/javasmall/workupload
## 配置文件

有两种配置文件：`.properties` 和 `.yml`
- .`properties`配置文件是经典的，java世界用了几十年了，兼容性好，而yaml是新的，现代项目很多开始使用yaml，比如Spring Boot 从一开始就支持 YAML（`spring-boot-starter` 自动解析）
- 对于springboot项目，可以混用，但不推荐，springboot会按加载的先后顺序加载配置，如果有冲突，后加载的会覆盖先加载的，但很多时候也不好确定spring boot的加载顺序，并且，只用一种，统一风格，多好

以连接数据库为例：
- `application.properties`：
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/test 
spring.datasource.username=root spring.datasource.password=123456 
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
- `application.yml`：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
```

对比：

| 项目         | `.properties` 配置文件                 | `.yml`（或 `.yaml`）配置文件       |
| ---------- | ---------------------------------- | --------------------------- |
| 格式类型       | 键值对（`key=value`）                   | 层级缩进结构（YAML 格式）             |
| 嵌套结构表示     | 通过`.`连接字段                          | 通过缩进（空格）表示层级结构              |
| 注释语法       | `#` 或 `!`                          | `#`                         |
| 数组写法       | 使用索引或多个属性重复写                       | 用 `-` 表示列表                  |
| 语法严格度      | 容错高，容易写                            | 缩进必须正确，格式要求严格               |
| 可读性        | 简洁但嵌套结构难看清                         | 可读性高，层级结构一目了然               |
| 支持 profile | ✔️ 使用 `application-dev.properties` | ✔️ 使用 `application-dev.yml` |



## Java-项目-RPC

### 项目资料
- part1实现一个基本的rpc调用： https://www.yuque.com/chengxuyuancarl/gykg94/sagz6yby53czxmhc
已失效的密码：gndn、hk8t


![[Pasted image 20250516205220.png]]

### RPC介绍

**RPC是什么**？
Remote Procedure Call，远程过程调用，像调本地函数一样调别处的远程函数

**一些特点**：
- **强类型**：通常在接口定义时就明确了参数和返回值的类型，在调用时会进行严格的类型检查，保证了数据的一致性和正确性。

**基本流程**：
1. ​**​客户端调用本地代理方法​**​：客户端调用一个看似本地的方法，实际上由代理对象拦截。
2. ​**​参数序列化​**​：将方法名、参数等调用信息序列化为字节流，以便通过网络传输。
3. ​**​网络传输​**​：将序列化后的数据通过网络发送到服务端。
4. ​**​服务端接收与反序列化​**​：服务端接收数据并反序列化，解析出调用的方法及参数。
5. ​**​执行远程方法​**​：服务端根据解析结果调用实际的方法。
6. ​**​返回值序列化与传输​**​：将方法的返回值序列化后发送回客户端。
7. ​**​客户端接收与反序列化​**​：客户端接收返回的数据并反序列化，得到最终结果。

### 项目笔记

项目的代码本身就包含了大量笔记


**共同的**：
创建了接口 `UserService` 的一个实现类 `UserServiceImpl`，该接口定义了两个方法：`getUserByUserId()` 和 `insertUserId()`，由 `UserServiceImpl` 提供具体实现。

**TestServer**：
服务端：
- 创建了一个`UserService`接口，并写了实现类`UserServiceImpl`，共包含`getUserByUserId()` 和 `insertUserId()`两个方法
- 初始化一个`ServiceProvider` 实例，用来管理和查询本地注册的服务。`ServiceProvider`内容：
	- IP和端口（构造函数的参数）
	- interfaceProvider，一个hashmap，key是服务名、value是IP地址+端口，`serviceProvider` 的职责包括：
		- 维护接口与服务实现类之间的映射关系，例如：`UserService` → `UserServiceImpl`
		- 在收到请求时查找对应服务实例，供 `NettyRPCRPCServer` 调用    
		- 向注册中心（如 ZooKeeper）注册服务的地址和元数据
	- `ServiceRegister`，一个基于 ZooKeeper 的服务注册器，用于将服务注册到ZooKeeper注册中心
		- 初始化一个curator 提供的zookeeper客户端
		- 设定一些信息：地址：端口、会话超时阈值、重试策略（失败等待时间和最大重试次数）、RPC服务的根节点
		- 使用start方法启动这个客户端
	- rateLimitProvider，一个速率限制器提供者，速率限制器通过桶算法实现
- 将`UserService`通过`ServiceProvider`的provideServiceInterface方法传给`ServiceProvider`
	- 通过反射获取这个接口的所有方法
	- 调用 `ServiceProvider` 的 `provideServiceInterface` 方法，将实现类 `UserServiceImpl` 注册为本地服务（相对于客户端是本地），并通过内部持有的 `serviceRegister` 向 ZooKeeper 注册服务地址，实现服务暴露。
	- 判断是否加入白名单，并将可以加入白名单的服务加入白名单（！！！version4中是否加入白名单直接用参数设置为的true）
- 使用`ServiceProvider`初始化一个RpcServer，RpcServe的实现为NettyRPCRPCServer
	- 会自动调用 initChannel 方法，为通道管道添加编码器和解码器，以及处理器
- 调用 `NettyRPCRPCServer` 的 `start(port)` 方法，传入监听端口，启动 Netty 服务器，开启RpcServe，从而可以处理来自客户端的远程调用请求。启动 RPC 服务的过程如下：
	- `NettyRPCRPCServer` 使用了 `@AllArgsConstructor` 注解，具有一个全参构造函数，但其唯一成员变量为 `serviceProvider`，所以使用serviceProvider即可创建一个 `NettyRPCRPCServer` 实例
	- 创建两个 Netty 的 `NioEventLoopGroup` 线程组：
	    - `bossGroup` 负责接收客户端连接请求
	    - `workerGroup` 负责处理已建立连接的读写请求
	- 配置并启动 Netty 服务端：
	    - 使用 `ServerBootstrap` 设置线程组和通道类型（如 `NioServerSocketChannel`）
	    - 通过 `childHandler` 指定自定义的 `NettyServerInitializer`，配置服务端的 `ChannelPipeline`
	- `NettyServerInitializer` 初始化过程中会配置如下 pipeline，初始化要传入一个serviceProvider，在处理业务逻辑中会用到：
	    - 入站（接收请求）处理器链：
		    - ByteBuf --> LengthFieldBasedFrameDecoder --> ObjectDecoder --> NettyRPCServerHandler
	        - `LengthFieldBasedFrameDecoder`：根据长度字段拆包
	        - `ObjectDecoder`：反序列化请求对象
	        - `NettyRPCServerHandler`：处理业务逻辑，调用 `channelRead0` → `getResponse()`，gerResponse方法通过反射调用serviceProvider中注册的服务方法
	    - 出站（返回响应）处理器链：
		    - NettyRPCServerHandler --> ObjectEncoder --> LengthFieldPrepender --> ByteBuf
	        - `ObjectEncoder`：序列化响应对象
	        - `LengthFieldPrepender`：在响应前加上长度字段
	- 调用 `bind(port).sync()` 绑定监听端口并阻塞当前线程，确保服务端启动完成
	- 通过 `channel.closeFuture().sync()` 阻塞主线程，等待服务关闭，防止服务立即退出
	- 在 `finally` 中优雅关闭线程组，释放资源











**UserClient**：
初始化一个 `ClientProxy` 代理对象时，会同时创建一个 `NettyRpcClient` 实例。该客户端负责通过网络将请求发送给服务端，并接收服务端返回的响应结果。

通过 `ClientProxy` 的 `getProxy()` 方法，使用 JDK 动态代理机制将本地方法调用动态转换为远程 RPC 调用。方法调用被封装为请求对象发送至服务端，由服务端执行并返回结果。

`getProxy(Class<T> clazz)` 方法内部调用了 `Proxy.newProxyInstance()`，创建一个实现指定接口的代理对象。每当调用该代理对象的方法时，都会触发当前 `ClientProxy` 实例中的 `invoke()` 方法，`this` 表示该 `InvocationHandler` 实现（即当前的 `ClientProxy` 实例）。

例如：
UserService userService = new ClientProxy().getProxy(UserService.class);
String name = userService.getUserName(123);
本地调用userService.getUserName(123)，new ClientProxy().getProxy(UserService.class)把它转换为远程调用


`ClientProxy` 的 `invoke()` 方法是代理的核心逻辑，每次调用代理对象的方法，都会进入到这个方法中
该方法会基于 调用的类和方法的反射信息 构造一个 `RpcRequest`，包含如下信息：
- `interfaceName`: 调用方法接口的全限定名，用于服务端定位调用方法服务实现
- `methodName`: 被调用的方法名
- `params`: 方法参数
- `paramsType`: 参数类型数组，用于反射匹配服务端方法


`ClientProxy` 内部持有一个 `RpcClient` 实例`rpcClient`（如 `NettyRpcClient`），它负责底层网络通信，即t负责发送封装好的请求。通过调用 `rpcClient.sendRequest(request)`，将 `RpcRequest` 发送到服务端，并等待服务端返回的 `RpcResponse`。


`RpcClient` 内部依赖一个Netty客户端 实现网络通信，而Netty客户端里还包含一个ZooKeeper客户端（如 Curator）用于服务发现，ZooKeeper客户端提供可用服务端的IP地址和端口，有了服务端的IP地址和端口，就可以初始化一个Netty客户端，通过这个Netty客户端可以与服务端进行连接，发送请求，获取响应，获取响应后，返回数据部分 response.getData()，即远程方法的返回值




### 整体介绍
使用






### 限流与服务降级
✅ 第二个功能：使用令牌桶算法实现接口限流

---

📚 原理

**令牌桶算法（Token Bucket）**流程：
1. 有一个固定容量的桶（token数），比如 100
2. 按固定速率往桶里加 token
3. 每来一个请求，取出一个 token，有 token 才能通过
4. 没有 token，就拒绝请求或排队，限流保护

✅ 令牌桶允许**一定程度突发流量**，比漏桶算法（）更灵活。

---

🔥 简单实现思路

1. 维护两个变量：
   - 当前桶内 token 数量
   - 上次加 token 的时间
2. 每次请求来时：
   - 先补充 token（按时间计算）
   - 判断有没有 token
     - 有：通过，并扣减1
     - 没有：拒绝或降级处理

---

---

📈 注意：
- **并发环境下**要用 `synchronized` 或 `AtomicDouble` 保证线程安全
- 可以给不同接口/服务单独设置桶参数（细粒度限流）
- 超时排队模式：可以结合 Future 超时排队等待token（高级玩法）

---

✅ 总结对比

| 功能 | 目的 | 实现关键 |
|------|------|---------|
| 故障一定次数下线 | 保证整体服务健康，自动摘除坏节点 | 记录连续失败次数，超阈值剔除 |
| 令牌桶限流 | 防止单节点被暴击流量压垮 | 按速率补充token，请求消耗token |

这两套机制一搭配：你的 RPC 框架就具备了**自我保护**+**高并发稳定性**能力！

---

🎯 最终架构小图

```text
RPC Client
   ↓
负载均衡器选节点
   ↓
限流器检查（令牌桶）
   ↓
发起远程调用
   ↓
结果
 └→ 成功：正常处理
 └→ 失败：记录失败次数 → 达到阈值自动下线节点
```

---

📢 最佳实践建议

| 项目   | 建议                  |
| ---- | ------------------- |
| 故障下线 | 可以加上“超时恢复”机制，避免永久剔除 |
| 限流策略 | 限速优先拦截在客户端，保护后端服务器  |
| 可配置化 | 故障次数、限流速率都支持动态配置热更新 |
| 指标监控 | 成功率、失败率、限流数输出到监控平台  |

---

### 重试

实现两种服务降级：故障一定次数后通知注册中心下线节点；使用令牌桶算法实现接口限流
- **服务降级保护**：节点出问题，自动摘除，避免连锁故障。
- **限流保护**：防止流量暴增把系统压垮。

> **故障次数熔断下线**，是保障集群健康的；**令牌桶限流**，是保障单节点抗压能力的。两者配合，RPC框架就可以自我保护并且优雅降级。

✅ 第一个功能：故障一定次数后，通知注册中心下线节点

---

📚 原理

| 步骤 | 说明 |
|------|------|
| 1. 客户端访问某节点失败 | 比如连接超时、异常 |
| 2. 记录失败次数 | 每个服务实例有一个失败计数器 |
| 3. 连续失败到达阈值 | 比如 5 次 |
| 4. 触发降级处理 | 通知注册中心，把这个节点摘除（下线） |
| 5. 自动剔除坏节点 | 保障请求只发给健康的实例 |

---

🔥 简单实现思路

1. 为每个服务节点维护失败次数 `Map<address, failureCount>`
2. 调用失败时 +1
3. 成功则清零
4. 达到阈值，比如 5次：
   - 调用注册中心接口，删除节点
   - 或者在客户端本地标记节点不可用，短时间内不再访问


📈 注意：
- 下线后可以定时“探活”（比如半小时后试着重新上线）
- 避免短时网络波动导致全量摘除（可以加**滑动窗口**或**超时恢复**机制）

---

### 熔断

客户端设置熔断器，监测服务调用情况进行 3 种状态的切换，从而实现熔断保护；对已下线的节点进行定时探测，保证容错性

客户端设置熔断器，实时监测远程调用的成功/失败情况，当失败比例过高时“熔断”停止调用；同时定时“探活”测试熔断的节点，一旦恢复正常就重新加入流量。

---

✅ 第一部分：熔断器是什么？

熔断器（Circuit Breaker）模式来源于 Netflix Hystrix 设计。  
本质上就是——  
**当发现调用失败严重时，立刻中断后续请求，保护整个系统不雪崩。**

---

✅ 第二部分：熔断器的三种状态

🚦 1. CLOSED（闭合状态）
- 默认状态
- 正常发送所有请求
- 统计调用成功/失败次数
- 如果失败率超过阈值，切换到 OPEN

---

🚦 2. OPEN（打开状态）
- 拒绝所有请求，快速失败
- 防止继续压垮后端服务
- 开启一个定时器，过一段时间后尝试恢复（进入 HALF-OPEN）

---

🚦 3. HALF-OPEN（半开状态）
- 允许部分（比如1个）请求试探性通过
- 如果试探成功（调用成功率恢复正常），切换回 CLOSED
- 如果试探失败，重新回到 OPEN，继续隔离

---

📈 熔断器状态切换流程图

```text
    +---------+       异常比例超阈值        +---------+
    | CLOSED  |  ------------------------>  |  OPEN   |
    +---------+                              +---------+
          ^                                       |
          |                探活成功                |
          |<--------------------------------------|
          |                尝试调用(HALF-OPEN)      |
          +---------+                          +---------+
                        |  失败重回OPEN         |  成功回CLOSED
                        +--------------------->+
```

---

✅ 第三部分：实现熔断器核心逻辑

---

1. 定义熔断器类（伪代码）

```java
public class CircuitBreaker {

    private enum State { CLOSED, OPEN, HALF_OPEN }

    private State state = State.CLOSED;

    private int failureThreshold = 5; // 连续失败次数
    private int failureCount = 0;
    private long lastFailureTime = 0;
    private long openDuration = 10000; // OPEN后多长时间尝试探活，单位ms

    public synchronized boolean allowRequest() {
        if (state == State.OPEN) {
            if (System.currentTimeMillis() - lastFailureTime > openDuration) {
                state = State.HALF_OPEN;
                return true; // 允许一次探活
            } else {
                return false; // 快速失败
            }
        }
        return true; // CLOSED 和 HALF-OPEN允许调用
    }

    public synchronized void recordSuccess() {
        if (state == State.HALF_OPEN) {
            state = State.CLOSED; // 恢复
            failureCount = 0;
        } else if (state == State.CLOSED) {
            failureCount = 0;
        }
    }

    public synchronized void recordFailure() {
        failureCount++;
        if (failureCount >= failureThreshold) {
            state = State.OPEN;
            lastFailureTime = System.currentTimeMillis();
        }
    }
}
```

---

2. 使用示例（拦截RPC调用）

```java
if (circuitBreaker.allowRequest()) {
    try {
        rpcClient.call(serverAddress, request);
        circuitBreaker.recordSuccess();
    } catch (Exception e) {
        circuitBreaker.recordFailure();
    }
} else {
    throw new RpcException("熔断中，拒绝请求！");
}
```

---

✅ 第四部分：对已下线节点进行**定时探活**

即使节点被熔断（Open状态），也要“定时尝试访问”，如果节点恢复了，要让它重新加入！

---

🔥 探活机制实现思路

1. 定时任务（比如每隔 10 秒）
2. 遍历所有熔断中的节点
3. 发送“轻量级心跳请求”（如 ping）
4. 成功则恢复，失败则继续保持熔断

---

简单伪代码

```java
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

public void startHealthCheck() {
    scheduler.scheduleAtFixedRate(() -> {
        for (Server server : servers) {
            if (server.getCircuitBreaker().isOpen()) {
                try {
                    rpcClient.ping(server.getAddress());
                    server.getCircuitBreaker().recordSuccess();
                    System.out.println(server.getAddress() + "恢复上线！");
                } catch (Exception e) {
                    System.out.println(server.getAddress() + "探活失败，继续熔断");
                }
            }
        }
    }, 10, 10, TimeUnit.SECONDS);
}
```

---

✅ 最后总结表

| 功能模块 | 核心思路 | 关键点 |
|---------|---------|--------|
| 熔断器 | 根据失败次数/比率切换 CLOSED / OPEN / HALF-OPEN | 限制流量进入故障节点 |
| 允许探活 | OPEN 状态下定时触发探活请求 | 动态恢复健康节点 |
| 保护客户端 | 快速失败，避免大量请求挂死 | |
| 提升系统整体可用性 | 只将流量打到健康节点 | |

---

🎯 总体结构示意图

```text
Consumer
  ↓
负载均衡选择节点
  ↓
CircuitBreaker.allowRequest()
  ↓
发送RPC调用（或快速失败）
  ↓
recordSuccess / recordFailure
  ↓
定时探活恢复熔断节点
```

---

📢 最佳实践建议

| 项目 | 建议 |
|------|------|
| 熔断粒度 | 可以按节点、按接口、按服务分类熔断 |
| 触发阈值 | 支持动态调整（如滑动窗口、百分比） |
| 恢复策略 | 多次探活成功才彻底恢复 |
| 降级方案 | 熔断后返回默认值、缓存值、兜底接口 |

---
### 动态代理
### 多线程与异步调用

### 连接池与资源管理


### 基于Netty封装通信层，实现高性能异步NIO网络通信；

1. **为什么选择 Netty 而不是直接使用 Java NIO 或 MINA？**
    
    - **简化开发**：Netty 提供了更高层次的抽象和封装，避免了直接使用 Java NIO 时需要处理的复杂细节，如缓冲区管理、连接管理等。
        
    - **高性能**：Netty 在 I/O 处理方面做了高度优化，具有更低的延迟和更高的吞吐量。
        
    - **可扩展性和灵活性**：Netty 提供了丰富的扩展点和自定义处理能力（如自定义编解码器、处理器等），能够满足各种复杂的网络需求。
        
    - **活跃社区与支持**：Netty 拥有活跃的开发者社区和完善的文档支持，相比 Java NIO 和 MINA 更容易上手和维护。
        
2. **如何设计 Netty 的 ChannelPipeline？有哪些 Handler？**
    
    - **设计 Pipeline**：`ChannelPipeline` 是 Netty 中处理消息的核心组件，用于顺序执行多个 **`ChannelHandler`** 来处理 I/O 事件。
        
    - **常见 Handler**：
        
        - **ByteToMessageDecoder**：将字节流解码为消息对象。
            
        - **MessageToByteEncoder**：将消息对象编码为字节流。
            
        - **IdleStateHandler**：检测连接是否空闲，用于实现心跳检测。
            
        - **LoggingHandler**：用于记录日志。
            
        - **业务逻辑处理**：自定义的 `ChannelHandler` 来处理具体业务逻辑（如协议解析、消息处理等）。
            
3. **Netty 的线程模型是怎样的？BossGroup 和 WorkerGroup 各自职责是什么？**
    
    - **BossGroup**：负责接收客户端的连接请求，创建新的 `Channel`。
        
    - **WorkerGroup**：负责处理已经接入的连接，执行数据读写操作。
        
    - **线程模型**：Netty 使用事件驱动模型，BossGroup 和 WorkerGroup 都是事件循环器 (`EventLoopGroup`)，每个 `EventLoop` 负责一个或多个 I/O 事件的处理。
        
4. **Netty 是如何实现高性能的异步通信的？**
    
    - **异步 I/O**：Netty 使用非阻塞的 I/O 操作，通过 `Channel` 监听事件并处理（例如读/写就绪），避免了传统同步阻塞 I/O 带来的性能瓶颈。
        
    - **事件驱动**：通过事件循环（`EventLoop`）来处理 I/O 事件，实现高度的并发处理。
        
    - **高效的内存管理**：Netty 通过内存池和零拷贝机制减少了不必要的内存分配和复制，提高了性能。
        
5. **粘包/拆包问题在什么情况下会出现？你如何通过自定义编解码器解决的？**
    
    - **粘包/拆包问题**：当发送的数据包没有明确的边界或长度信息时，多个数据包可能被拼接在一起（粘包），或者一个数据包被分成多个小包发送（拆包）。
        
    - **解决方法**：通过自定义编解码器解决，使用 `DelimiterBasedFrameDecoder`、`LengthFieldBasedFrameDecoder` 等内建解码器来处理粘包/拆包问题。
        
        - **例子**：使用 `LengthFieldBasedFrameDecoder` 解析数据包长度字段，确保每个数据包的边界正确。
            
6. **Netty 的 Zero-Copy 是什么？在什么情况下能提升性能？**
    
    - **Zero-Copy**：通过直接操作操作系统的 I/O 缓冲区而不需要额外的内存拷贝，从而提高数据传输效率。
        
    - **提升性能的场景**：主要应用于大文件的读取和写入，避免了多次数据拷贝和内存分配，提高了磁盘和网络 I/O 性能。
        
7. **如何在 Netty 中实现心跳检测机制？如何判断连接超时？**
    
    - **心跳检测**：使用 `IdleStateHandler` 来设置心跳检测，定时检测连接是否空闲。
        
        - **`IdleStateHandler`** 可以配置读空闲、写空闲和读写空闲的超时时间，一旦超时就触发相应的事件（如关闭连接或发送心跳包）。
            
    - **超时判断**：如果客户端在规定时间内没有发送任何数据，`IdleStateHandler` 会触发 **`userEventTriggered()`**，可以在此方法中判断连接超时并做相应处理（如关闭连接）。
        
    
    ```java
    public class HeartbeatHandler extends ChannelInboundHandlerAdapter {
        @Override
        public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
            if (evt == IdleStateEvent.ALL_IDLE_STATE_EVENT) {
                // 超时未读写数据，关闭连接
                ctx.close();
            }
        }
    }
    ```




### 使用Zookeeper作为服务注册中心；

1. **为什么选择 Zookeeper 作为注册中心，而不是 Etcd 或 Nacos？**
    
    - **高可靠性和一致性**：Zookeeper 基于 ZAB 协议（Zookeeper Atomic Broadcast），提供强一致性，适合高可靠性要求的场景。
        
    - **成熟度**：Zookeeper 已经在许多大规模分布式系统中得到了广泛应用，成熟稳定。
        
    - **分布式协调能力**：Zookeeper 提供了丰富的分布式协调功能，除了服务注册与发现，还能用于分布式锁、选举等功能。
        
    - **Etcd/Nacos** 主要在 Kubernetes 和微服务场景中广泛使用，相对 Zookeeper 可能在高并发和大规模场景下性能不如 Zookeeper。
        
2. **服务注册和发现的流程是怎样的？客户端如何从注册中心获取可用服务？**
    
    - **服务注册**：
        
        - 服务启动时，将服务信息（如地址、端口、权重等）注册到 Zookeeper 的某个特定节点（如 `/services/service-name`）。
            
        - 服务健康检查：服务在注册后定期更新其在 Zookeeper 中的状态，保证注册信息的有效性。
            
    - **服务发现**：
        
        - 客户端通过查询 Zookeeper 中的服务节点（如 `/services/service-name`）来获取可用服务列表。
            
        - 客户端可设置 **Watcher** 来监听服务节点的变化，一旦有新服务注册或旧服务下线，客户端会被通知。
            
3. **Zookeeper 的 Watcher 机制是如何工作的？**
    
    - **Watcher** 是一种通知机制，客户端可以在 Zookeeper 的节点上注册 Watcher，Zookeeper 会在节点状态变化（如节点被删除、数据变化、子节点变化等）时通知客户端。
        
    - 一旦触发事件，Watcher 仅会触发一次，触发后需要重新注册。如果需要持续监听，需要重新设置 Watcher。
        
4. **当服务节点发生变化（如上下线）时，客户端如何感知？**
    
    - 客户端通过设置 **Watcher** 监听服务节点的变化。比如，监听服务列表节点的变化，若有服务上下线，Zookeeper 会通知客户端，客户端根据变化重新加载服务列表。
        
    - 客户端可以根据 Zookeeper 提供的通知信息，更新本地缓存，并进行服务重试或重新选择等操作。
        
5. **客户端本地缓存是如何设计的？怎样保证缓存与注册中心数据的一致性？**
    
    - **本地缓存设计**：客户端会将从 Zookeeper 获取的服务列表缓存到本地，以减少频繁的网络请求，提高性能。
        
    - **一致性保证**：
        
        - 客户端通过设置 Watcher 来监听服务节点变化，一旦发生变化（如新增、删除服务），Zookeeper 会触发 Watcher 通知客户端更新缓存。
            
        - 客户端可以在本地缓存中设置过期时间，定期拉取注册中心的数据，保持数据一致性。
            
6. **如果 Zookeeper 宕机了，BridgeRPC 服务还能继续使用吗？如何设计容灾？**
    
    - **容灾设计**：
        
        - **高可用部署**：Zookeeper 通常部署为一个 **集群**，以保证服务可用性。如果一个节点宕机，集群中的其他节点会接管请求，保证高可用性。
            
        - **客户端重试机制**：客户端应实现重试机制，当无法连接到 Zookeeper 时，客户端可以尝试连接集群中的其他节点。
            
        - **备份机制**：可以通过 **多注册中心** 配置，将服务注册信息同步到多个注册中心（如 Nacos、Consul 等）以保证服务发现的容灾能力。
            

简洁总结：

- **Zookeeper** 适合高可靠、高一致性的场景。
    
- **服务注册和发现**：服务向 Zookeeper 注册，客户端通过查询和 Watcher 发现服务变化。
    
- **Watcher 机制**：Zookeeper 通知客户端节点变化，客户端处理更新。
    
- **缓存一致性**：客户端使用 Watcher 保持本地缓存与注册中心一致。
    
- **容灾设计**：使用高可用 Zookeeper 集群和客户端重试机制保证服务不中断。


- 
### 自定义编、解码器处理消息，解决粘包、拆包问题；
因为 TCP是流式传输，没有消息边界的！所以多条小消息可能**粘在一起**发送到对方、一条大消息可能**拆成多块**发送到对方


自定义协议一般具备的要素：

| 需要定义的元素            | 长度      | 说明                 |
| ------------------ | ------- | ------------------ |
| 魔数（magic number）   | 4 bytes | 标识这是我们自家协议，不是垃圾数据  |
| 协议版本Version        | 1 byte  | 方便未来扩展             |
| 消息类型Message Type   | 1 byte  | 请求/响应/心跳等          |
| 序列化方式Serialization | 1 byte  | JSON/Protobuf/自定义等 |
| 请求IDRequest ID     | 8 bytes | 区分异步多个请求           |
| 数据长度Body Length    | 4 bytes | 多少字节是正文内容（Body）    |
| 数据内容（Body）         | N bytes | 序列化后的真正业务对象的数据长度   |



### 在客户端建立本地服务缓存，设置Watcher监听服务节点变化，实现客户端实时获取最新服务信息，减少注册中心访问压力；
### 使用心跳检测动态维护连接资源；
### 序列化——实现了多种序列化方式，可自由设置；

1. **实现了多种序列化方式，具体包括哪些？**
    
    - **JSON**：文本格式，易于调试和阅读，广泛支持。
        
    - **Protobuf**：二进制格式，压缩性好，速度快，广泛用于跨语言通信。
        
    - **Kryo**：二进制格式，序列化速度快，适用于 Java 内部的数据传输。
        
    - **Hessian**：二进制格式，支持跨语言通信，主要用于 Java 之间的 RPC 调用。
        
2. **如何在系统中动态切换序列化方式？**
    
    - 通过 **策略模式**，定义不同的序列化方式为策略类，并提供一个上下文来选择当前使用的序列化方式。
        
    - 可以根据配置文件或请求中的元数据动态切换序列化方式。
        
    
    例子：
    
    ```java
    public interface Serializer {
        byte[] serialize(Object obj);
        Object deserialize(byte[] data, Class<?> clazz);
    }
    
    public class JsonSerializer implements Serializer {
        // 实现 JSON 序列化逻辑
    }
    
    public class ProtobufSerializer implements Serializer {
        // 实现 Protobuf 序列化逻辑
    }
    
    public class SerializerContext {
        private Serializer serializer;
    
        public void setSerializer(Serializer serializer) {
            this.serializer = serializer;
        }
    
        public byte[] serialize(Object obj) {
            return serializer.serialize(obj);
        }
    
        public Object deserialize(byte[] data, Class<?> clazz) {
            return serializer.deserialize(data, clazz);
        }
    }
    ```
    
3. **Protobuf 与 Kryo 各自的优缺点是什么？**
    
    - **Protobuf**：
        
        - **优点**：高效的二进制格式，支持跨语言，具有良好的压缩性和速度，适合大规模的数据传输。
            
        - **缺点**：需要定义 `.proto` 文件，学习曲线稍微陡峭，无法动态修改结构。
            
    - **Kryo**：
        
        - **优点**：序列化速度非常快，适合 Java 内部使用，支持多种复杂对象和 Java 类的序列化。
            
        - **缺点**：不支持跨语言，序列化后的数据比较大（较少压缩），使用时需要考虑兼容性问题。
            
4. **序列化在 RPC 框架中的性能瓶颈有哪些？你是如何优化的？**
    
    - **瓶颈**：
        
        - **序列化/反序列化时间**：序列化和反序列化过程较为耗时。
            
        - **数据传输量**：数据冗余大，导致网络传输变慢。
            
        - **CPU 和内存占用**：复杂对象序列化会占用大量 CPU 和内存资源。
            
    - **优化**：
        
        - **选择合适的序列化格式**：对于高性能的场景，选择 **Protobuf** 或 **Kryo** 作为二进制序列化格式，避免 JSON 的性能问题。
            
        - **使用压缩算法**：对序列化后的数据进行压缩（如 GZIP、Snappy），减少数据传输量。
            
        - **优化数据模型**：减少不必要的字段，设计更紧凑的数据结构。
            
5. **自定义协议头中通常包含哪些字段？如何确保协议的可扩展性？**
    
    - **协议头字段**：
        
        - **Magic Number**：用于标识协议类型，防止不同协议混淆。
            
        - **协议版本**：标识协议版本，方便后期版本兼容。
            
        - **消息类型**：标识请求或响应消息，区分不同类型的消息。
            
        - **序列号/请求ID**：用于匹配请求与响应，避免错乱。
            
        - **长度字段**：表示消息体的长度，便于解析。
            
    - **确保协议的可扩展性**：
        
        - **版本控制**：在协议头中增加版本字段，后续可以根据版本来处理不同的数据结构。
            
        - **可扩展字段**：保留一些备用字段（如扩展字段），在协议升级时可以添加新字段而不影响旧版本。
            
        - **字段长度**：对可变长度的字段进行灵活设计（如变长的字段、动态消息体长度）。

- 
### 实现了多种负载均衡策略选择，支持灵活选择；基于令牌桶算法实现接口请求限流；



1. **你实现了哪些负载均衡策略？**
    
    - **随机**：每次请求随机选择一个服务节点。
        
    - **轮询**：按照顺序依次选择服务节点，常用于负载均衡。
        
    - **一致性哈希**：根据请求的哈希值决定服务节点，适用于需要会话粘性或数据局部性的场景。
        
    - **最少连接**：选择当前连接数最少的节点，用于避免某些节点负载过高。
        
2. **各种负载均衡策略适用于哪些场景？**
    
    - **随机**：适用于请求均匀且无特殊需求的场景。
        
    - **轮询**：适合负载均衡均匀且没有特殊优先级需求的场景。
        
    - **一致性哈希**：适合有状态服务或需要数据局部性的场景（如分布式缓存）。
        
    - **最少连接**：适合请求处理时间不均匀的场景，避免某些服务节点过载。
        
3. **如果一个节点突然失效，客户端如何快速感知并切换？**
    
    - **心跳检测**：客户端定期发送心跳包检测服务节点的健康状态。
        
    - **负载均衡器的健康检查**：负载均衡器（如 Nginx、HAProxy）检测到节点失效后，会自动从池中移除该节点。
        
    - **服务发现与更新**：客户端通过服务注册中心（如 Zookeeper、Consul）订阅服务节点变化，快速获取并切换到可用节点。
        
4. **Watcher 监听服务变化是实时的吗？有无延迟问题？**
    
    - **实时性**：Zookeeper 的 Watcher 是近实时的，但会有一定延迟，通常在几毫秒到几十毫秒之间。Watcher 触发时，客户端会收到通知，但不能保证绝对实时。
        
    - **延迟问题**：受网络延迟、Zookeeper 集群同步、系统负载等因素影响，可能会有轻微的延迟。
        
5. **如何避免频繁访问 Zookeeper 带来的性能压力？**
    
    - **客户端缓存**：客户端可以缓存服务节点信息，定期更新而非每次都查询 Zookeeper。
        
    - **Watchers 使用**：使用 Watchers 监听节点变化，避免频繁的查询。
        
    - **合理的 TTL**：为服务节点设置适当的 TTL（过期时间），减少 Zookeeper 的查询负担。
        
    - **批量查询**：通过一次性查询多个服务节点的信息，减少请求次数。
        
6. **客户端的连接池是如何实现和维护的？**
    
    - **连接池管理**：通过池化技术（如 **Apache Commons Pool**）管理客户端与服务的连接。连接池维护一定数量的空闲连接，并能按需创建和销毁连接。
        
    - **最大连接数和最小连接数**：设置连接池的最大连接数和最小连接数，根据业务需求动态调整。
        
    - **连接有效性检查**：定期检查连接是否有效，避免使用失效连接。
        
    - **负载均衡**：在多节点环境下，连接池结合负载均衡策略，分配请求到不同节点。











- 负载均衡定义：当有多个服务实例可用时，客户端按一定策略选择其中一个实例，主要是未来分散各服务器的压力，提高性能和容错。

4 种负载均衡策略选择：服务轮询、随机访问、LRU 最近最少使用和一致性哈希算法；






**🎡 轮询（Round Robin）**
原理：把请求均匀地分配到每个节点上。
特点：
优点：简单好实现，分配均匀
缺点：节点性能差异大时不适合，容易拖慢整体
实现：`int pos = Math.abs(index.getAndIncrement()) % servers.size();`


**🎲 随机（Random）**

原理：每次随机选一个可用节点。
特点：
- 优点：简单，避免某节点过热
- 缺点：可能造成流量不均匀
代码伪实现：`int idx = random.nextInt(servers.size());`



3. 🧠 最近最少使用（LRU，Least Recently Used）

✅ 原理：通过维护一个访问时间的缓存表，优先选择最近最久未被访问的节点
✅ 特点：
优点：能避免冷节点长时间不用，利用率高
缺点：管理开销稍大，因为需要维护时间表

✅ 代码伪实现：

```java
public class LruLoadBalancer implements LoadBalancer {

    private final Map<String, Long> accessTime = new ConcurrentHashMap<>();

    @Override
    public String select(List<String> servers) {
        String leastUsed = servers.stream()
            .min(Comparator.comparingLong(server -> accessTime.getOrDefault(server, 0L)))
            .orElse(servers.get(0));
        accessTime.put(leastUsed, System.currentTimeMillis());
        return leastUsed;
    }
}
```

4. 🔗 一致性哈希（Consistent Hash）

✅ 原理：
- 将服务器节点映射到一个**哈希环**上。
- 请求根据自己的 Key（如 userId/hash值）映射到环上，顺时针找到第一个大于它的节点。
- 节点增减时只影响很小一部分请求，**避免大规模重新路由**。
✅ 代码伪实现：（注意生产环境一般要引入**虚拟节点机制**，提升哈希均匀性）




📈 四种策略对比总结

| 策略 | 适用场景 | 优缺点 |
|------|---------|--------|
| Round Robin | 机器性能均匀、数量稳定 | 均匀分配，但不区分负载 |
| Random | 流量波动较大场景 | 简单，但可能导致短时间流量集中 |
| LRU | 需要避免节点冷热不均 | 动态调节，但维护开销大 |
| Consistent Hash | 对会话稳定性要求高（如电商购物车） | 增删节点影响小，但实现复杂 |


### 为幂等服务设置白名单，在白名单服务因异常失败时使用Guava-Retry框架按策略进行安全重试；

1. **令牌桶算法的原理和实现**：
    
    - **原理**：令牌桶算法通过桶（bucket）存储令牌，每秒固定数量的令牌被加入桶中。当请求到达时，它需要从桶中获取一个令牌。只有获取到令牌的请求才能被处理，否则会被拒绝或延迟。
        
    - **实现**：
        
        - 设置一个桶大小（最大令牌数）和令牌的产生速率（每秒生成的令牌数）。
            
        - 请求到达时，如果桶中有令牌，消耗一个令牌并允许请求通过；如果桶空，则拒绝或排队处理请求。
            
        - 令牌的生成是定时的，速率恒定。
            
2. **为什么选择令牌桶而不是漏桶？**
    
    - **令牌桶**：允许突发流量，灵活性高，能够平滑处理瞬时请求量。
        
    - **漏桶**：会按照固定的速率处理请求，适合平滑流量但不能处理突发流量。如果请求超过了桶的处理速度，直接丢弃或等待。
        
    - 选择 **令牌桶**，因为它能够更好地支持突发流量，并且避免请求被完全拒绝。
        
3. **限流是在哪一层实现的（客户端/服务端）？**
    
    - **服务端**：通常在服务端实现限流，通过中间件（如网关、API 服务）进行限流，防止后端系统被过载。
        
    - **客户端**：客户端也可以实现本地限流，例如控制请求的发送速率，避免对服务端造成过大压力。
        
4. **如果多个服务节点同时限流，整体的限流效果如何控制？**
    
    - 通过 **全局限流控制**：采用 **分布式限流**，例如利用 Redis、ZooKeeper 等分布式协调工具，保证所有服务节点共享相同的令牌桶，控制全局的请求速率。
        
    - **跨节点同步**：确保每个节点的限流状态能够同步，避免不同节点之间限流不一致。
        
5. **幂等服务白名单具体是什么意思？**
    
    - **幂等服务白名单**指的是对于某些操作或服务，允许它们在多个请求中重复执行而不产生副作用。例如，查询操作、状态查询等可以放入白名单，这些操作无需担心重复提交导致的不一致问题。
        
6. **幂等性是如何实现的？针对什么样的操作需要幂等？**
    
    - **幂等性实现**：通过唯一标识符（如订单ID、请求ID）来确保同一请求多次执行时结果一致。常见方法包括：
        
        - **数据库唯一约束**：通过数据库的 **唯一约束** 来避免重复数据。
            
        - **幂等性检查**：使用缓存、数据库标记等方式，检查是否已执行过该操作。
            
        - **幂等接口设计**：设计接口时，确保多次请求不会修改相同资源的状态。
            
    - **需要幂等性的操作**：
        
        - **支付操作**：支付请求可能会因为网络问题等多次重试，保证支付操作幂等，避免重复扣款。
            
        - **订单提交**：订单提交接口要保证多次提交不会产生多条订单记录。
            
        - **库存更新**：库存扣减操作需要幂等，防止库存被扣减多次。


- 
### 故障处理——实现熔断器机制，支持关闭、开启、半开三种状态切换，结合服务状态判定与恢复算法，提升系统可用性；

1. **为什么使用 **Guava-Retry** 框架？相比自己实现重试逻辑有什么优势？**
    
    - **Guava-Retry** 提供了简洁、可靠的重试机制，内置多种重试策略和配置，避免了自己实现复杂的重试逻辑。
        
    - **优势**：
        
        - **简化代码**：减少重复的重试代码，并且支持灵活配置。
            
        - **多种重试策略**：如固定间隔、指数退避等，不需要手动实现。
            
        - **可扩展性强**：可以轻松集成到现有系统，并支持自定义重试条件。
            
2. **重试策略有哪些（如固定间隔、指数退避、随机退避）？**
    
    - **固定间隔**：每次重试间隔固定，不随重试次数变化。
        
    - **指数退避**：每次重试间隔逐渐增加，通常以指数方式增长（如 1s, 2s, 4s）。
        
    - **随机退避**：在指数退避的基础上加入随机因素，避免所有请求同时重试。
        
3. **如何避免重试导致的“放大故障效应”？**
    
    - **退避策略**：使用 **指数退避** 或 **随机退避** 来分散重试时间，减少重试请求的聚集效应。
        
    - **最大重试次数**：限制重试次数，防止重试无限制地增加系统压力。
        
    - **合适的重试条件**：避免对所有错误都进行重试，只对 transient 错误（临时错误）进行重试。
        
4. **哪些服务会进入白名单？白名单的维护方式是怎样的？**
    
    - **白名单服务**：通常包括 idempotent 操作（如查询、状态检查等），这些操作无论重试多少次都不会造成副作用。
        
    - **维护方式**：白名单服务可以通过 **配置管理** 或 **注解** 的方式维护，定期评审，确保不会漏掉需要重试的操作。
        
5. **在高并发场景下，如何保证重试逻辑不会造成服务雪崩？**
    
    - **限制并发重试**：使用 **信号量** 或 **队列** 控制并发重试的数量，避免过多并发重试加剧系统压力。
        
    - **动态调整重试策略**：根据系统负载动态调整重试间隔或失败重试次数。
        
    - **适当的限流机制**：在高并发下，结合限流（如令牌桶、漏桶等）来避免过多重试请求导致系统崩溃。
        

---

6. **熔断器的三种状态（关闭、开启、半开）分别是什么意思？**
    
    - **关闭**：熔断器正常工作，所有请求都被正常传递到服务。如果服务健康，熔断器继续处于关闭状态。
        
    - **开启**：当服务出现异常达到设定的阈值（如失败率高），熔断器切换到开启状态，所有请求直接被拒绝，防止系统继续遭受压力。
        
    - **半开**：熔断器开启一段时间后，进入半开状态，允许部分请求通过，测试服务是否恢复健康。如果服务恢复正常，熔断器切换回关闭状态。
        
7. **你是如何判断服务异常的？使用什么指标？（例如失败率、响应时间）**
    
    - **失败率**：超过一定阈值的失败率（如 5%）可视为服务异常。
        
    - **响应时间**：当服务响应时间超过设定的最大阈值（如 2 秒）时，也认为是服务异常。
        
    - **错误类型**：捕获特定的错误类型（如 5xx 错误）也可作为异常判断的标准。
        
8. **熔断恢复算法是如何设计的？半开状态下如何逐步恢复流量？**
    
    - **熔断恢复算法**：
        
        - **开关检测**：熔断器检测服务是否恢复健康（如通过重试、健康检查等）。
            
        - **半开状态**：在半开状态下，逐步放行一部分请求，通过监控这些请求的成功率来判断服务是否恢复。
            
        - **逐步恢复**：如果半开请求成功，逐渐恢复更多请求通过，直到完全恢复。
            
    - **自动恢复机制**：失败率降低后，熔断器自动从“开启”状态切换为“关闭”状态，恢复正常流量。
        
9. **熔断和限流有什么区别？在什么场景下分别使用？**
    
    - **熔断**：防止系统过载，当服务不可用时暂时拒绝请求，避免进一步恶化。
        
    - **限流**：控制流量的大小，防止请求过多导致系统崩溃，通常用于防止突发流量的影响。
        
    - **场景**：
        
        - **熔断**：适用于服务健康度较差时，用于快速响应并保护系统。
            
        - **限流**：适用于请求量过大时，需要平稳处理请求，防止系统过载。
            
10. **熔断器与重试机制可能冲突吗？如何协调两者？**
    

- **可能冲突**：重试机制可能会在服务已异常时继续尝试请求，导致系统压力更大，而熔断器已经切断请求流。
    
- **协调方案**：
    
    - 在重试逻辑中检查熔断器状态，如果熔断器开启，则不再进行重试，避免重复请求。
        
    - 结合 **重试和熔断**，可以设置熔断器和重试的优先级，确保在异常时优先触发熔断，避免不必要的重试。
        

简洁总结：熔断器用于服务保护和故障隔离，重试则是对临时错误的恢复机制，两者在不同场景下结合使用，确保系统高可用且高效。


### 其它问题

- 在 BridgeRPC 的设计中，性能瓶颈最有可能出现在什么地方？
    
- 如何衡量和优化 RPC 的整体 **RT（响应时间）**？
    
- 在高并发情况下，Netty 的线程池和连接池如何配置？
    
- 注册中心的压力如何评估和缓解？
    
- 如何保证系统的水平扩展性？
    
- 如果要在生产环境部署，你会如何监控服务状态（如延迟、失败率、心跳等）？



- 你的 RPC 调用中有没有考虑安全验证或签名？
    
- 如何防止非法客户端注册或访问服务？
    
- 在网络不稳定或节点波动时，如何保证服务调用的可靠性？




- 如果让你和 Dubbo 或 gRPC 比较 BridgeRPC，你觉得各自优缺点是什么？
    
- 如果未来要支持跨语言调用（如 Python/Go 客户端），你的协议层需要修改哪些地方？
    
- 如何设计一个通用的负载均衡和限流组件，让其他项目也能复用？





## 乐尚代驾
### 项目资料
Java-项目-乐尚代驾-ProcessOn： https://www.processon.com/mindmap/671f918c61fdee7d75f3f00a
尚硅谷Java项目【乐尚代驾】，微信小程序+最新技术栈，java微服务项目_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1nW421R7qJ/?spm_id_from=333.999.0.0

### 环境-软件

**mysql**
docker pull mysql:8.0.30
docker run --name gmalldocker_mysql --restart=always -v D:\Program1\Docker\MySQL:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.30
账号密码都是root

**nacos**：
docker pull nacos/nacos-server:v2.1.1
docker run -d -e MODE=standalone -p 8848:8848 -p 9848:9848 -p 9849:9849 --name nacos2.1.1 --restart=always nacos/nacos-server:v2.1.1


**rabbitmq**
docker pull rabbitmq:3.12.0-management
docker run -d --name rabbitmq --restart=always -p 5672:5672 -p 15672:15672 rabbitmq:3.12.0-management

安装插件：
docker cp rabbitmq_delayed_message_exchange-3.12.0.ez rabbitmq:/plugins
docker exec -it rabbitmq /bin/bash
ls -l|grep delay
rabbitmq-plugins enable rabbitmq_delayed_message_exchange


**redis**
docker pull redis:7.0.10
docker run --name gmalldocker_redis -d -p 6379:6379 --restart=always -v D:\Program1\Docker\Redis:/data redis:7.0.10 --appendonly yes


**minio**：
docker pull minio/minio
docker run -p 9000:9000 -p 9001:9001 --name gmalldocker_minio -d --restart=always -e MINIO_ROOT_USER=admin -e MINIO_ROOT_PASSWORD=admin123456 -v D:\Program1\Docker\Minio\data:/data -v D:\Program1\Docker\Minio\config:/root/.minio minio/minio server /data --console-address ":9001"
http://localhost:9001/minio/login
账号密码：admin/admin123456


**mongo**
docker pull mongo:7.0.0
docker run -d --restart=always -p 27017:27017 --name mongo -v D:\Program1\Docker\Mongo\:/data/db mongo:7.0.0



### 环境-信息
**微信小程序**：
- AppID(小程序ID)： wx73c0ba57d9f3c932
- AppSecret(小程序密钥)： 44ebf0190d2db492e12c45a9602ada26

**腾讯云储存桶**：
SecretId:AKIDlV7au7ECGHDMG0d8Vn9jHuS5Zu54qY4O SecretKey:QegcM9tUzGUgkKIsOxW0OcigbbVHxWxK
daijia-private-1300868533
```yaml
tencent:
	cloud:
		secretId: AKIDlV7au7ECGHDMG0d8Vn9jHuS5Zu54qY4O
		secretKey: QegcM9tUzGUgkKIsOxW0OcigbbVHxWxK
		region: ap-guangzhou
		bucketPrivate: daijia-private-1300868533
```

**腾讯位置服务KEY**：JUXBZ-YP3WW-OTVRT-YQGBA-NPX23-UBFMF

### 整体介绍
流程描述，业务流程

用户通过小程序下单 → 系统调用腾讯位置服务规划路线 → Redis GEO 筛选附近司机并推送订单 → 司机接单 → 双方实时位置共享 → 代驾完成后上传录音录像到 MinIO，并触发计费 → Drools 执行计价规则并生成分账 → RabbitMQ 负责延迟消息（如超时未支付自动取消）。整个流程用 Seata 保证跨服务一致性。

软件分为乘客端和司机端
乘客端
- 登录功能
- 代驾服务：
	- 首先选择出发地址的目的地地址，然后系统会使用drools规则引擎预估代驾距离、时间和费用，然后就可以下订单，下订单后系统根据订单信息呼叫代驾，搜索附近5公里可以接单的司机，这时会使用xxl-job进行任务调度，每分钟呼叫一次，如果15min没有司机接单，则通过RabbitMQ TTL和死信队列取消订单，如果有司机开始代驾，则开始代驾，代驾过程中会进行司乘同显，到达终点后，乘客根据司机发送的账单，通过微信支付支付订单
- 查询订单

司机端：
- 首次登录
- 身份认证

- 日常登录
- 人脸识别
- 代驾服务
	- 抢单
	- 前往代驾地址
	- 到达终点

用户通过 **微信小程序前端** 发起代驾请求，输入出发地与目的地后，系统会调用 **腾讯位置服务 API** 完成路线规划与距离预估。小程序将订单请求发送到后端的 **Spring Boot 服务**，后端从 **Nacos 配置中心** 动态获取相关配置（如费用计算规则、派单阈值等），然后通过 **Redis Geo** 功能实时搜索用户附近的可接单司机。

系统会根据司机的个性化接单设置与负载均衡策略，结合司机实时位置和历史接单数据，从候选司机中智能筛选出最合适的候选人。若存在并发抢单行为，系统利用 **Redisson 分布式锁** 保证同一订单只能被一个司机抢到。若派单长时间无人接单，系统通过 **RabbitMQ TTL + 死信队列** 自动取消超时订单，提升用户体验。

司机端在接单后，系统开始记录整个代驾过程。司机与乘客的实时位置通过 **Redis 发布/订阅机制** 同步到前端，实现司乘同显。与此同时，系统会将代驾轨迹数据写入 **MongoDB**，以支持后续的轨迹回放与纠纷取证。司机在行程中产生的录音数据上传到 **MinIO** 进行存储管理。

在结算阶段，系统通过 **Drools 规则引擎** 根据订单数据计算司机报酬、平台奖励及分账比例，规则可在后台灵活调整。支付环节则通过 **微信支付** 完成，订单与支付两个微服务之间的数据一致性由 **Seata 分布式事务框架** 保证，即便跨服务调用也能实现原子性。

此外，系统使用 **XXL-JOB** 定时任务调度框架定期执行任务，例如周期性刷新司机位置、清理无效订单等。针对高并发场景（如优惠券领取），系统利用 **Redis + 分布式锁** 控制并发，防止超发或重复领取。为了提升响应速度，部分耗时操作通过 **ThreadPool + CompletableFuture** 异步执行，实现多远程服务的并行调用。

所有认证环节（如身份证、人脸识别、驾驶证校验）均通过 **腾讯云服务** 完成，确保司机身份真实有效。系统同时内置一套行为规则，利用大数据分析检测司机是否存在“刷单”行为，保障平台公平性与风控安全。



### 架构问题

服务拆分怎么做？
* 用户服务（下单、支付）
* 司机服务（接单、位置上报）
* 订单服务（计费、轨迹存储）
* 风控服务（实名认证、人脸识别）
* 网关服务（统一鉴权、流量控制）


1. 为什么选择 **Spring Boot** 而不是 Spring Cloud 完整套件？
    
2. 你是如何划分系统模块（如订单、支付、司机管理等）的？
    
3. 代驾系统有哪些核心高并发场景？你是如何优化的？
    
4. 在系统设计时，哪些功能是同步调用，哪些是异步处理？依据是什么？
    
5. 如何保证系统的可扩展性和高可用性？



### 小程序问题

- 微信问题：40163，code被请求了两次，一个code有5分钟时效

### 数据库设计


### 使用Nacos作为配置中心，简化配置管理；
为什么要用Nacos？
可以热更新计费参数


- 为什么使用 **Nacos** 作为配置中心？和 Apollo、Consul 相比有什么优势？
1. **动态配置管理**，无需重启应用。
    
2. **服务发现**和健康检查，支持微服务架构。
    
3. **易用性强**，支持多种配置格式和实时更新。
    

与 **Apollo**、**Consul** 比较：

- **Nacos** 支持配置管理和服务发现，Apollo 仅做配置管理，Consul 更侧重服务发现。
- **Nacos** 更易与 Spring Cloud 集成。


配置中心的热更新是如何实现的？
    
Nacos 在服务发现中的角色是什么？
    
如何防止 Nacos 单点故障？

- **集群部署**：通过部署多个 Nacos 实例，形成集群，避免单点故障。
    
- **数据复制**：配置 Nacos 集群中的每个节点进行数据同步，确保节点间数据一致性。
    
- **负载均衡**：使用负载均衡器（如 Nginx 或 LVS）将请求分发到多个 Nacos 实例。
    
- **服务发现高可用**：Nacos 集群配置多节点，确保即使某个节点宕机，其他节点依然能提供服务。
    
- **持久化配置**：启用 Nacos 的数据持久化，确保配置数据不会丢失。


如果某个服务配置错误导致系统故障，你会怎么排查？

1. **查看日志**：检查相关服务的错误日志，查看是否有配置相关的错误提示。
    
2. **验证配置文件**：检查配置文件是否正确，特别是服务端口、数据库连接、环境变量等配置项。
    
3. **检查配置中心**：确认 Nacos 等配置中心中的配置是否正确，查看是否有最新的变更。
    
4. **回滚配置**：尝试回滚到上一个稳定的配置，验证问题是否解决。
    
5. **检查依赖服务**：确保服务依赖的外部系统（如数据库、消息队列等）配置正确且正常工作。
    
6. **重启服务**：在修改配置后，重新启动服务以确保配置生效。
    
7. **与团队沟通**：若问题复杂，与开发团队或运维团队协作，排查配置变更历史或部署过程中的问题。


### 基于微信小程序构建应用前端，基于SpringBoot构建后端系统；





### 使用Mybatis-plus操作数据库，简化开发工作；

MyBatis-Plus 与原生 MyBatis 的主要区别是什么？
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

你是否使用过 MyBatis-Plus 的逻辑删除、自动填充、分页插件？怎么配置？
    
在代驾系统中，哪些表设计容易成为性能瓶颈？如何优化 SQL？
    
MyBatis-Plus 的通用 Mapper 原理是什么？
    
如何在高并发下避免 MyBatis 的 N+1 查询问题？


只需要试验接口集成BaseMapper，然后就可以用
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
`UserMapper` 继承了 **`BaseMapper<User>`**，并且 **MyBatis-Plus** 会在运行时动态生成该接口的实现类。这个实现类是通过 **MyBatis** 的 **动态代理** 创建的，因此你无需手动编写实现类。
`@Resource` 注解告诉 Spring 容器自动注入 `UserMapper` 实现类。这个实现类由 MyBatis-Plus 提供，它实现了接口中的方法。
`BaseMapper` 是 MyBatis-Plus 提供的一个通用 Mapper，里面包含了常见的 CRUD 方法（如 `selectList`、`insert`、`update` 等）。这些方法并不是你需要手动实现的，而是由 **MyBatis-Plus** 在运行时通过动态代理自动生成。






### 通过自定义注解+AOP校验是否处于登录状态，减少重复代码；
过程：写了一个 `@LoginRequired` 注解，AOP 切面在 Controller 层拦截请求，解析 Token → 校验合法性 → 注入用户上下文。这样 Controller 方法不需要重复写校验逻辑。

你提到使用 **AOP + 自定义注解** 实现登录状态校验，能讲一下具体实现吗？

首先，定义一个自定义注解，用于标识需要进行登录状态校验的方法。
```java
@Target(ElementType.METHOD)  // 表示该注解作用于方法
@Retention(RetentionPolicy.RUNTIME)  // 在运行时可访问
public @interface LoginRequired {
    // 可以根据需要添加属性
}
```

接着，创建一个 AOP 切面类，通过拦截带有 `@LoginRequired` 注解的方法来进行登录状态的校验。
```java
@Aspect
@Component  // 让 Spring 容器管理这个切面类
public class LoginCheckAspect {

    @Autowired
    private HttpServletRequest request;  // 用来获取请求的上下文信息

    @Around("@annotation(com.atguigu.mp.annotation.LoginRequired)")  // 拦截所有带有 @LoginRequired 注解的方法
    public Object checkLoginStatus(ProceedingJoinPoint joinPoint) throws Throwable {
        // 从请求中获取登录用户的信息，这里假设是通过 session 或 JWT 存储的用户信息
        Object user = request.getSession().getAttribute("user");  // 或者根据需要从 JWT 获取用户信息
        
        if (user == null) {
            // 如果用户未登录，抛出异常或返回特定的错误响应
            throw new RuntimeException("User not logged in");
        }

        // 用户已登录，继续执行方法
        return joinPoint.proceed();
    }
}

```

在需要校验登录状态的方法上，添加刚才定义的 `@LoginRequired` 注解：

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @LoginRequired  // 需要登录才能访问的方法
    @GetMapping("/profile")
    public String getUserProfile() {
        return "User profile data";
    }
}

```



如何防止 AOP 拦截带来的性能损耗？
    
AOP 的环绕通知与前置通知有何区别？
- **前置通知（@Before）**：在目标方法执行前执行，不能控制是否执行目标方法。
    
- **环绕通知（@Around）**：在目标方法前后都可以执行，能控制是否执行目标方法，并能获取返回值。
自定义注解如何传递参数？能否动态控制逻辑？

**自定义注解传递参数**：

1. **定义注解时传递参数**：  
    在注解中可以定义参数，方法调用时传入这些参数。
    

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyCustomAnnotation {
    String value() default "default";
    int count() default 1;
}
```

2. **在方法上使用注解时传递参数**：
    

```java
@MyCustomAnnotation(value = "Hello", count = 5)
public void myMethod() {
    // 方法逻辑
}
```

**动态控制逻辑**：

- **通过 AOP 实现动态逻辑控制**：可以使用 AOP 拦截注解标记的方法，读取注解中的参数，并根据参数控制方法的执行逻辑。
    

```java
@Aspect
@Component
public class MyAspect {
    
    @Around("@annotation(myCustomAnnotation)")  // 拦截 @MyCustomAnnotation 注解的方法
    public Object handleCustomAnnotation(ProceedingJoinPoint joinPoint, MyCustomAnnotation myCustomAnnotation) throws Throwable {
        // 获取注解参数
        String value = myCustomAnnotation.value();
        int count = myCustomAnnotation.count();
        
        // 动态控制逻辑
        if (count > 3) {
            System.out.println("Count is large, modify behavior");
        }
        
        // 执行目标方法
        return joinPoint.proceed();
    }
}
```

通过 AOP，可以根据注解的参数来动态控制方法的行为。
### 使用腾讯云服务，进行司机的身份证认证、驾驶证认证、登录时的人脸识别以及相关文件的存储与审核；

首先注册与登录等腾讯云，官网地址：[https://cloud.tencent.com/](https://cloud.tencent.com/)
开通腾讯云对象存储COS：官网地址：[https://cloud.tencent.com/product/cos](https://cloud.tencent.com/product/cos)
存储桶使用地址：文档地址：[https://cloud.tencent.com/document/product/436/10199](https://cloud.tencent.com/document/product/436/10199)

身份证识别API地址：[https://cloud.tencent.com/document/product/866/33524](https://cloud.tencent.com/document/product/866/33524)
驾驶证识别API地址：[https://cloud.tencent.com/document/product/866/36213](https://cloud.tencent.com/document/product/866/36213)

人脸识别官网地址：[https://cloud.tencent.com/product/facerecognition](https://cloud.tencent.com/product/facerecognition)
人脸识别文档地址：[https://cloud.tencent.com/document/api/867/45014](https://cloud.tencent.com/document/api/867/45014)


你是如何接入腾讯云的身份证、驾驶证、人脸识别等服务的？
- 登录 **腾讯云**，注册账号后，创建相应的 **人脸识别**、**身份证识别**、**驾驶证识别** 等 API 服务。
- 获取相关的 **API 密钥**（SecretID 和 SecretKey），用于认证。
在 `pom.xml` 中添加依赖，通过 Maven 安装 SDK。
在代码中配置 **SecretID** 和 **SecretKey** 来进行认证：




- 认证过程中的异步回调如何处理？
    
- 文件上传到腾讯云和 MinIO 时，如何保证安全与访问控制？
    
- 身份认证失败时，用户体验层面如何反馈？
    
- 腾讯位置服务的路线规划 API 是如何与订单系统对接的？

你是如何接入腾讯云的身份证、驾驶证、人脸识别等服务的？
接入 **腾讯云** 的身份证、驾驶证、人脸识别等服务的步骤通常如下：

1. **注册腾讯云账号并创建相应服务实例**

* 登录 **腾讯云**，注册账号后，创建相应的 **人脸识别**、**身份证识别**、**驾驶证识别** 等 API 服务。
* 获取相关的 **API 密钥**（SecretID 和 SecretKey），用于认证。

2. **安装腾讯云 SDK**

腾讯云提供了多个编程语言的 SDK，使用 SDK 可以简化接口调用。假设你使用的是 Java，可以通过 Maven 安装 SDK。

在 `pom.xml` 中添加依赖：

```xml
<dependency>
    <groupId>com.tencentcloudapi</groupId>
    <artifactId>tencentcloud-sdk-java</artifactId>
    <version>3.1.0</version>
</dependency>
```

3. **配置腾讯云凭证**

在代码中配置 **SecretID** 和 **SecretKey** 来进行认证：

```java
Credential cred = new Credential("Your SecretID", "Your SecretKey");
```

4. **调用 API 进行身份识别**

以 **人脸识别** 为例：

```java
import com.tencentcloudapi.common.Credential;
import com.tencentcloudapi.common.profile.ClientProfile;
import com.tencentcloudapi.common.profile.HttpProfile;
import com.tencentcloudapi.iai.v20200303.IaiClient;
import com.tencentcloudapi.iai.v20200303.models.*;

public class FaceRecognition {

    public static void main(String[] args) {
        try {
            // 配置腾讯云凭证
            Credential cred = new Credential("Your SecretID", "Your SecretKey");

            // 设置请求端口和域名
            HttpProfile httpProfile = new HttpProfile();
            httpProfile.setEndpoint("iai.tencentcloudapi.com");

            // 创建ClientProfile对象
            ClientProfile clientProfile = new ClientProfile();
            clientProfile.setHttpProfile(httpProfile);

            // 创建IaiClient对象
            IaiClient client = new IaiClient(cred, "ap-guangzhou", clientProfile);

            // 准备请求参数
            DetectFaceAttributesRequest req = new DetectFaceAttributesRequest();
            req.setImageUrl("image_url_or_base64_string");  // 图像路径或Base64编码的图像
            
            // 发送请求
            DetectFaceAttributesResponse resp = client.DetectFaceAttributes(req);
            
            // 处理响应
            System.out.println(DetectFaceAttributesResponse.toJsonString(resp));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

5. **调用其他 API 进行身份证或驾驶证识别**

类似的，你可以调用 **身份证识别** 和 **驾驶证识别** API：

* **身份证识别**：
  使用 `IDCardOCRRequest` 调用身份证识别 API。

* **驾驶证识别**：
  使用 `DrivingLicenseOCRRequest` 调用驾驶证识别 API。

示例：

```java
// 身份证识别
IDCardOCRRequest req = new IDCardOCRRequest();
req.setImageUrl("image_url_or_base64_string");
IDCardOCRResponse resp = client.IDCardOCR(req);
System.out.println(IDCardOCRResponse.toJsonString(resp));

// 驾驶证识别
DrivingLicenseOCRRequest req = new DrivingLicenseOCRRequest();
req.setImageUrl("image_url_or_base64_string");
DrivingLicenseOCRResponse resp = client.DrivingLicenseOCR(req);
System.out.println(DrivingLicenseOCRResponse.toJsonString(resp));
```

6. **处理返回数据**

API 调用成功后，会返回一个 JSON 格式的响应，包含识别的结果，例如身份证信息、驾驶证信息或者人脸识别的相关数据。你可以根据返回的 JSON 数据进行相应处理。

7. **注意事项**

* **API 调用限制**：根据账号的额度限制，API 调用可能会有次数限制或收费，确保查看腾讯云的定价与配额。
* **图像质量**：确保传入的图像质量符合腾讯云要求（清晰、无遮挡等），否则识别精度可能会下降。

总结：
通过引入腾讯云的 SDK，配置凭证后，你可以通过相应的接口调用实现 **身份证识别**、**驾驶证识别**、**人脸识别** 等功能。


腾讯云 OCR/COS，实现司机实名认证，提高注册效率

差不多都是去到服务的官网，然后创建应用，获取API的ID/KEY和密钥，然后
生成一个配置类，设置信息，然后把这个配置类给一个服务类，获得所需的东西，官网有教程，跟着官网给的示例教程操作就行。

- OCR可以来识别身份证照片中的内容，进行实名认证。
- COS（Cloud Object Storage）是腾讯云提供的对象存储服务，用于存储和管理大规模数据，如身份证照片、司机个人资料等。

### 通过腾讯位置服务，实现代驾路线规划；

腾讯位置服务服务器端API文档：[https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview](https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview)

腾讯位置服务的官网（[https://lbs.qq.com/](https://lbs.qq.com/))


- 如何使用腾讯位置服务就能获得规划好的路线

使用腾讯位置服务获得规划好的路线，步骤如下：

1. **注册腾讯云账号并开通位置服务**。
    
2. **获取 API 密钥**（Key）。
    
3. **使用 SDK 或 API 调用**：  
    调用 **路线规划 API**（`directions`）进行路径规划。
    
    示例请求：
    
    ```java
    // 构建请求
    TencentLocationAPI api = new TencentLocationAPI("Your-API-Key");
    // 设置起点和终点坐标
    String origin = "start_lat,start_lng"; // 起点
    String destination = "end_lat,end_lng"; // 终点
    
    // 请求路径规划
    RoutePlanResponse response = api.getRoutePlan(origin, destination);
    ```
    
4. **解析返回数据**：API 返回的结果包含路径、路段、交通信息等，可以从中获取规划好的路线。
    

详细文档可参考 [腾讯位置服务 API 文档](https://lbs.qq.com/).

### 基于Drools规则引擎预估订单数据、计算代驾完成系统奖励以及分账信息，支持灵活规则配置；
Drools 计价规则例子？
例如：夜间 + 长途 单子 → 起步价上浮 20% + 每公里 5 元。
Drools 规则存放在数据库，系统启动时加载到内存，配置变更时用 Nacos 推送刷新规则，支持热更新，不用重启服务。


- 基本计费：按时长和距离收费。    
- 夜间费用：21:00 - 6:00 期间的订单加收 20% 的费用。
- 节假日奖励：在节假日订单奖励 10%。
- 奖励：如果代驾时长超过 2 小时，额外奖励 50 元。




为什么选择 **Drools**？
- **规则引擎**：Drools 提供强大的规则引擎，能够灵活处理复杂的业务规则。
    
- **可扩展性**：支持动态加载和修改规则，易于扩展和维护。
    
- **高效的决策引擎**：采用 Rete 算法，处理大量规则时效率高。
    
- **规则与代码分离**：将业务逻辑与应用程序代码分离，规则更易管理和修改。
    
- **集成简便**：易于与 Java 系统集成，支持 BPMN、PMML 等标准。
    
- **支持复杂推理**：可以处理复杂的规则链、条件和推理，适合动态决策和业务流程。

Drools 的规则文件如何组织与管理？
    
在计算奖励、分账、订单预估时，规则引擎和业务逻辑的关系是怎样的？
    
Drools 规则变更后如何动态加载？

**使用 KieContainer 重新加载规则**：

在 **Drools** 中，规则变更后可以通过以下方式动态加载：

1. **使用 KieContainer 重新加载规则**：
    
    - 创建新的 `KieContainer` 实例，加载更新后的规则文件。
        
    - 获取新的 `KieSession` 来执行更新后的规则。
        
2. **代码示例**：
    

```java
KieServices kieServices = KieServices.Factory.get();
KieContainer kieContainer = kieServices.newKieContainer(kieServices.newReleaseId("com.example", "rules", "1.0"));
KieSession kieSession = kieContainer.newKieSession();
```

3. **重新加载**：
    
    - 规则文件更新后，重新加载 `KieContainer` 和 `KieSession`。



如果规则冲突或优先级错误，如何排查？

### 使用Redis Geo功能搜索用户附近司机，提高派单效率；

Redis GEO搜索司机流程：
* 每次司机位置上报时，执行 `GEOADD` 更新。
* 用户下单时，调用 `GEORADIUS` 获取一定范围内的司机。
* 为了防止大规模写入阻塞，我们采用 批量更新 + 异步写入，热点区域数据再用本地缓存。

个性化接单如何实现：
司机可在小程序设置偏好（时间、区域、车型），这些配置存在 Redis + MySQL。接单时，先通过 GEO 查询司机集合，再过滤司机配置，最后推送给符合条件的人。

10万司机每秒上报，Redis 会不会崩？
* 优化写入：用 pipeline 批量提交；
* 热点拆分：分区域（如城市维度）存不同的 GEO key；
* 降级方案：非关键位置数据可降频上报（比如 1s → 5s）。

使用 RedisGEO 实现附近司机定位与智能派单，结合 Redisson 分布式锁保障高并发下的抢单一致性与订单流程控制；


使用 `Redis GEO` 存储司机地理坐标，实现“**查找附近司机**”，  
并结合 `Redisson` 分布式锁实现“**抢单流程的一致性控制**”。

Redis GEO   存储司机地理位置；查找附近司机
Redisson 分布式锁   控制抢单逻辑的“唯一性”；防止并发冲突


一、使用 Redis GEO 实现附近司机定位

Redis 的 GEO 类型提供 3 个核心功能：

| 功能         | 命令                        |
| ---------- | ------------------------- |
| 添加地理位置     | `GEOADD`                  |
| 查询距离       | `GEODIST`                 |
| 查询指定范围内的位置 | `GEORADIUS` / `GEOSEARCH` |

1. 添加司机位置（上线时）
```bash
GEOADD drivers 116.397128 39.916527 driver:001
```

- `drivers` 是 key（可看成一个“司机坐标库”）
- 经纬度（lon, lat）
- `driver:001` 是司机ID

🔍 2. 查询附近的司机（如：5公里内）

```bash
GEOSEARCH drivers 
  FROMLONLAT 116.397 39.916 
  BYRADIUS 5 km 
  WITHDIST 
  COUNT 10 
  ASC
```
你也可以用 `GEORADIUS`，但 `GEOSEARCH` 更推荐（Redis 6.2+）。

💡 示例代码（Jedis 或 Redisson 都支持）：

```java
List<GeoResult<RedisGeoCommands.GeoLocation<String>>> nearbyDrivers =
    stringRedisTemplate.opsForGeo()
    .search("drivers",
        RedisGeoCommands.GeoReference.fromCoordinate(116.397, 39.916),
        new RedisGeoCommands.Distance(5, Metrics.KILOMETERS),
        RedisGeoCommands.GeoSearchCommandArgs.newGeoSearchArgs().includeDistance().limit(10)
    );
```

🔧 使用 Redisson 加锁代码（推荐 try-lock）

```java
@Autowired
private RedissonClient redissonClient;

public boolean grabOrder(String orderId, String driverId) {
    RLock lock = redissonClient.getLock("lock:order:" + orderId);

    try {
        if (lock.tryLock(5, 10, TimeUnit.SECONDS)) {
            // 判断订单是否已被抢
            if (isAlreadyGrabbed(orderId)) {
                return false;
            }

            // 抢单成功，写入数据库/Redis
            assignOrderToDriver(orderId, driverId);
            return true;
        } else {
            return false; // 没抢到锁
        }
    } catch (Exception e) {
        e.printStackTrace();
        return false;
    } finally {
        if (lock.isHeldByCurrentThread()) {
            lock.unlock(); // 释放锁
        }
    }
}
```

💡 lock 的好处：
- 只允许一个线程/实例执行核心代码段
- 分布式环境下多个服务节点抢锁也能保持一致
- 可设置过期时间，避免死锁



🧠 整体流程图

```
【乘客发起打车请求】
         ↓
    获取当前坐标
         ↓
【Redis GEO 查询附近司机】
         ↓
  根据距离/策略选择司机派单
         ↓
【Redisson 加分布式锁】
   → 若获取锁成功：
       判断订单状态 → 更新订单 → 通知司机
   → 若失败：继续等待或派单下一个司机
```



✅ 三、关键实现建议


| 点               | 建议                                       |
| --------------- | ---------------------------------------- |
| GEO 存储结构        | 可以用 hash 或 string 存储 driver 状态、设备号、订单状态等 |
| 坐标更新频率          | 每 5~10 秒更新一次坐标即可                         |
| 锁粒度             | 推荐按订单ID分布加锁，避免全局锁                        |
| 搭配 TTL + Lua 脚本 | 可以精细控制超时清理、状态一致性检查                       |



🎯 最终效果

| 场景       | 技术保障             |
| -------- | ---------------- |
| 查附近司机    | Redis GEO（毫秒级响应） |
| 多司机同时抢单  | Redisson 锁限制唯一   |
| 抢单数据一致   | Redis + DB 状态持久化 |
| 系统高并发稳定性 | 线程池隔离 + 锁控制并发冲突  |
### 支持司机个性化接单设置，实现智能派单；

司机抢单是如何实现的？为什么要用 **Redisson 分布式锁**？
**司机抢单实现**：

1. **分配订单**：当司机查看订单时，系统会判断是否有空闲订单，抢单按钮可供司机点击。
    
2. **抢单操作**：司机点击抢单后，系统通过唯一标识（如司机ID）判断订单是否已经被抢。
    

**使用 **Redisson 分布式锁** 的原因**：

1. **防止并发问题**：多个司机同时点击抢单，可能导致多个司机抢到同一订单。使用分布式锁可以确保同一时间只有一个司机能抢到订单。
    
2. **保证数据一致性**：通过锁机制，确保在分布式环境中，只有一个线程/实例可以操作同一资源，避免数据冲突。
    

**Redisson 实现**：

- **Redisson** 提供了易用的分布式锁，可以在不同实例间加锁，确保抢单过程的原子性和数据一致性。


分布式锁中如何处理锁超时与自动续期？
    
如何避免锁的死锁问题？
避免 **锁的死锁** 可以通过以下几种方式：

1. **锁的顺序**：
    
    - 保证多个线程获取锁时，始终按相同的顺序获取锁，避免形成环形依赖。
        
2. **锁超时**：
    
    - 为每个锁设置超时机制，如果线程在超时时间内未能获取到锁，则放弃锁请求，避免长时间等待。
        
    
    ```java
    boolean locked = redissonLock.tryLock(100, 10, TimeUnit.SECONDS);
    if (!locked) {
        // 放弃操作
    }
    ```
    
3. **避免嵌套锁**：
    
    - 避免在持有一个锁的同时请求其他锁，减少锁嵌套的情况。
        
4. **使用更细粒度的锁**：
    
    - 将大范围的锁分解为多个小范围的锁，避免一个锁控制太多资源。
        
5. **死锁检测**：
    
    - 定期检查系统中锁的状态，检测是否存在死锁并进行处理。
        

通过以上策略可以有效降低和避免死锁问题。



优惠券领取时的并发问题有哪些解决方式？

Redisson 底层依赖什么机制实现锁？

**Redisson** 底层依赖 **Redis** 实现分布式锁。具体机制如下：

1. **Redis 键值存储**：Redisson 利用 Redis 的键值存储来模拟分布式锁。
    
2. **SETNX 命令**：Redisson 使用 Redis 的 `SETNX`（SET if Not Exists）命令来确保只有一个客户端能成功设置锁键，防止多个客户端同时获取锁。
    
    - 如果锁不存在，`SETNX` 命令会设置锁并返回成功。
        
    - 如果锁已存在，`SETNX` 命令会失败，表示锁被占用。
        
3. **锁过期时间**：为了防止死锁，Redisson 在加锁时会设置一个超时时间（`TTL`），即锁在一定时间后自动释放。如果线程未及时释放锁，Redis 会自动释放锁，避免死锁。
    
    - Redisson 会使用 **Redis 的 `SET` 命令**，结合 `NX`（确保只有锁为空时设置）和 `PX`（设置超时时间）来实现加锁。
        
4. **Redisson 独占性**：通过设置唯一的锁标识（如 UUID），即使客户端崩溃，其他客户端也无法获取锁，确保锁的独占性。
    

总结：Redisson 利用 Redis 的 `SETNX` 命令和超时机制来实现分布式锁，确保在分布式环境中，多个客户端之间不会发生锁的竞争和死锁。



### 使用分布式任务调度框架XXL-JOB定时调度搜索附近司机任务；


- 为什么选择 **XXL-JOB**？和 Quartz、Elastic-Job 相比如何？
**选择 XXL-JOB 的原因**：

1. **简单易用**：XXL-JOB 配置简单，界面友好，能够快速上手。
    
2. **轻量级**：与 Quartz 和 Elastic-Job 相比，XXL-JOB 更轻量，无需复杂配置，适合中小型项目。
    
3. **Web 控制台**：提供丰富的管理控制台，支持任务管理、调度管理、日志查看等，简化运维管理。
    
4. **高可用性**：支持集群部署，支持任务的失败重试、任务调度的分布式管理。
    
5. **任务分片与失败重试**：支持任务分片和失败重试机制，确保任务稳定执行。
    

**与 Quartz 和 Elastic-Job 的比较**：

1. **XXL-JOB vs Quartz**：
    
    - **简易性**：XXL-JOB 提供更简洁的配置和管理界面，而 Quartz 配置相对复杂，适合复杂调度需求。
        
    - **集成性**：XXL-JOB 对 Spring Boot 的集成更为友好，Quartz 集成相对麻烦。
        
2. **XXL-JOB vs Elastic-Job**：
    
    - **轻量性**：XXL-JOB 更轻量，Elastic-Job 功能更全面，但也更复杂，适合大规模的分布式任务调度。
        
    - **界面管理**：XXL-JOB 提供更易用的 Web 控制台，而 Elastic-Job 的控制台较为简单，且配置较为复杂。
        

总结：XXL-JOB 更适合中小型项目，提供简单易用的管理控制台，适合快速集成，而 Quartz 和 Elastic-Job 更适合大型、复杂的分布式任务调度系统。


- 任务调度与派单系统的关系是什么？
    
- XXL-JOB 如何保证任务不被重复执行？
    
- 调度任务失败如何告警与重试？


如何使用xxl-job
1. **添加依赖**：在 `pom.xml` 中添加 XXL-JOB 依赖：
    

```xml
<dependency>
    <groupId>com.xxl.job</groupId>
    <artifactId>xxl-job-core</artifactId>
    <version>2.3.0</version>
</dependency>
```

2. **配置执行器**：在 `application.yml` 中配置 XXL-JOB 执行器：
    

```yaml
xxl:
  job:
    admin:
      addresses: http://localhost:8080/xxl-job-admin
    executor:
      appname: xxl-job-executor
      logpath: /data/applogs/xxl-job/jobhandler/
```

3. **创建任务处理类**：使用 `@XxlJob` 注解标记任务方法：
    

```java
@XxlJob("myJobHandler")
public void execute() {
    // 任务逻辑
}
```

4. **注册任务**：在 XXL-JOB 管理后台添加任务，选择执行器和任务处理类。
    
5. **管理后台**：运行 XXL-JOB 管理后台，通过浏览器访问 `http://localhost:8080/xxl-job-admin`。
    




### 使用分布式锁Redisson解决司机抢单并发问题和优惠券领取并发问题；

使用分布式锁Redisson解决司机抢单并发问题和优惠券领取并发问题的具体步骤

**使用 Redisson 解决并发问题：**

1. **引入 Redisson 依赖**：
    
    ```xml
    <dependency>
        <groupId>org.redisson</groupId>
        <artifactId>redisson</artifactId>
        <version>3.16.1</version>
    </dependency>
    ```
    
2. **配置 Redisson**：
    
    ```yaml
    spring.redis.host=localhost
    spring.redis.port=6379
    ```
    
3. **司机抢单**：  
    使用分布式锁确保同一时间只有一个司机抢到订单。
    
    ```java
    RLock lock = redissonClient.getLock("orderLock:" + orderId);
    lock.lock();
    // 业务逻辑
    lock.unlock();
    ```
    
4. **优惠券领取**：  
    使用分布式锁确保每个用户只能领取一次。
    
    ```java
    RLock lock = redissonClient.getLock("couponLock:" + couponId + ":" + userId);
    lock.lock();
    // 领取逻辑
    lock.unlock();
    ```
    

简洁明了，确保并发安全。



### 基于Redis实时同步司机和乘客位置，在前端实现司乘同显；

- 你提到使用 **Redis Geo** 搜索附近司机，能讲下 Redis Geo 的底层原理吗？
**Redis Geo** 底层原理：

1. **数据结构**：Redis Geo 使用 **Geohash** 来存储地理位置数据。每个地理坐标（经纬度）被编码成一个 Geohash，并通过 **Sorted Set**（有序集合） 存储，Geohash 作为排序的分值（score）。
    
2. **Geohash 编码**：
    
    - 将经纬度编码为一个字符串，表示地理位置的“空间”。
        
    - Geohash 是一个基于二进制的空间编码，通过分辨率不同的 Geohash 长度来表示精度。
        
3. **存储方式**：
    
    - Redis Geo 将每个位置点（经纬度）与 **唯一的成员标识（如司机ID）** 关联，存储在一个 **Sorted Set** 中，成员的分值是 Geohash 编码后的经纬度。
        
4. **查询**：
    
    - Redis Geo 提供 **GEOSEARCH** 和 **GEORADIUS** 命令来进行地理位置查询，通过计算 Geohash 范围查找附近的成员。
        
    - 查询基于哈希编码的距离计算，快速找到地理位置附近的其他成员。
        
5. **空间计算**：
    
    - 查询时，Redis 会计算两点间的距离，基于地理坐标和 Geohash 算法。
        
    - 支持 **大圆距离**（Haversine Formula），可以精确计算地球表面两点间的最短距离。
        

核心命令：

- `GEOADD`：将地理位置数据（经纬度）添加到 Sorted Set。
    
- `GEORADIUS`：根据给定经纬度和半径，查询附近的成员。
    
- `GEOHASH`：获取某个地理位置的 Geohash 值。
    
- `GEOSEARCH`：按半径范围查询附近的成员。
    

简单总结：

Redis Geo 利用 Geohash 编码和 Sorted Set 存储地理位置数据，通过高效的空间算法，提供快速的地理位置查询与距离计算。


- GeoHash 是怎么计算距离和经纬度范围的？
    
- 附近司机搜索结果是如何缓存和更新的？
    
- Redis 的位置数据如何与前端司乘同显保持实时同步？

- **Redis 存储位置数据**：  
    使用 **Redis Geo** 存储司机和乘客的经纬度。
    
    `redisTemplate.opsForGeo().add("drivers", new Point(lon, lat), driverId); redisTemplate.opsForGeo().add("passengers", new Point(lon, lat), passengerId);`
    
- **实时同步**：
    
    - **WebSocket**：后端通过 WebSocket 推送位置更新给前端。
        
    - **Redis Pub/Sub**：后端发布位置变化，前端订阅并更新显示。
        
- **代码示例**：
    
    - 后端通过 WebSocket 或 Pub/Sub 通知前端更新位置。
        
    - 前端接收到位置数据后，更新地图显示。

- 如何保证 Redis 中的位置信息不过期或不被错误删除？


### 在订单、支付等跨服务场景中引入 Seata 分布式事务，保证数据一致性；
- 微信支付流程中，如何处理异步通知？
    
- 如果支付成功但订单状态更新失败，如何补偿？
    
- 你是如何在订单、支付等场景中使用 **Seata** 分布式事务的？
在订单、支付场景中使用 **Seata** 分布式事务：

1. **引入依赖**：  
    添加 Seata 依赖到 `pom.xml`：
    
    ```xml
    <dependency>
        <groupId>io.seata</groupId>
        <artifactId>seata-spring-boot-starter</artifactId>
        <version>1.5.0</version>
    </dependency>
    ```
    
2. **配置 Seata**：  
    在 `application.yml` 配置注册中心与事务组：
    
    ```yaml
    seata:
      tx-service-group: my_test_tx_group
      registry:
        type: nacos
        nacos:
          server-addr: localhost:8848
    ```
    
3. **使用 `@GlobalTransactional` 注解**：  
    在订单与支付服务方法上使用 `@GlobalTransactional` 注解。
    
    - **订单服务**：
        
        ```java
        @GlobalTransactional(name = "order-transaction", rollbackFor = Exception.class)
        public void createOrder(Order order) {
            orderRepository.save(order);
            paymentService.processPayment(order);
        }
        ```
        
    - **支付服务**：
        
        ```java
        @GlobalTransactional(name = "order-transaction", rollbackFor = Exception.class)
        public void processPayment(Order order) {
            paymentRepository.deductBalance(order.getAmount());
        }
        ```
        
4. **回滚机制**：  
    Seata 会自动回滚，确保事务的一致性，订单创建成功但支付失败时，整个事务回滚。
    

简洁高效地保证了分布式事务的管理。
- Seata 的 AT 模式和 TCC 模式有什么区别？
    
- Seata 如何保证回滚的幂等性？

为什么要用Seata？
Steata的AT 模式，不需要改业务逻辑太多，通过数据代理实现分布式事务，性能和开发成本更均衡。

### 使用Jemeter工具进行优惠券的并发测试；

如何使用：
使用 **JMeter** 工具进行优惠券并发测试的步骤：

1. **安装 JMeter**

* 从 [JMeter 官网](https://jmeter.apache.org/) 下载并安装 JMeter。

2. **创建测试计划**

* 启动 JMeter，创建一个新的测试计划（Test Plan）。

3. **添加线程组（Thread Group）**

* 右键点击 **Test Plan**，选择 **Add** → **Threads (Users)** → **Thread Group**。
* 在 **Thread Group** 中设置并发用户数（Threads）、循环次数（Loops）等参数。

  * **Number of Threads (users)**：设置模拟的用户数。
  * **Loop Count**：设置每个用户的请求次数。

4. **添加 HTTP 请求**

* 右键点击 **Thread Group**，选择 **Add** → **Sampler** → **HTTP Request**。
* 配置 HTTP 请求：

  * **Server Name or IP**：设置服务器地址。
  * **Path**：设置访问的接口路径（例如优惠券领取接口 `/coupon/claim`）。
  * **Method**：选择请求方法（通常是 `POST` 或 `GET`）。
  * **Parameters**：如果需要传递参数，添加相应的请求参数（例如用户ID、优惠券ID等）。

5. **添加请求头（如果需要）**

* 右键点击 **HTTP Request**，选择 **Add** → **Config Element** → **HTTP Header Manager**。
* 设置请求头，例如 `Content-Type: application/json`，如果接口需要认证，可以添加 `Authorization` 等。

6. **添加监听器（Listener）**

* 右键点击 **Thread Group**，选择 **Add** → **Listener** → 选择一个监听器，如 **View Results Tree** 或 **Summary Report**，用于查看测试结果。

7. **设置并发用户**

* 在 **Thread Group** 中设置 **Number of Threads** 为模拟的用户数，设置并发数。
* 设置 **Ramp-Up Period**，指定 JMeter 启动线程的时间，避免瞬间请求冲击服务器。

8. **运行测试**

* 点击 JMeter 界面顶部的绿色开始按钮（Start），开始并发测试。
* 查看 **Listener** 显示的结果，如成功率、响应时间、吞吐量等。

9. **分析测试结果**

* **View Results Tree**：查看每个请求的响应和状态。
* **Summary Report**：查看统计数据，包括每秒请求数、平均响应时间等。

总结：

使用 **JMeter** 进行并发测试时，主要通过设置 **Thread Group** 来模拟用户并发，并通过 **HTTP Request** 配置接口请求，使用 **Listener** 查看测试结果。





1. **使用 JMeter 做优惠券并发测试时，主要关注的指标：**
    
    - **响应时间**：每个请求的响应时长，尤其关注 **平均响应时间**、**最大响应时间** 和 **90% 响应时间**，确保系统能承受并发负载。
        
    - **吞吐量（Throughput）**：系统每秒处理的请求数量，衡量系统的处理能力。
        
    - **QPS（Queries Per Second）**：每秒处理的查询数量，关注高并发下的处理能力。
        
    - **错误率**：系统返回的失败请求比例，关注错误响应（例如 500 错误或超时错误）。
        
    - **并发用户数**：模拟的并发用户数是否能满足系统负载需求。
        
2. **如何分析 QPS、TPS 与系统瓶颈：**
    
    - **QPS 和 TPS** 反映了系统的处理能力和吞吐量，观察这两个值在高并发时的变化。
        
    - **瓶颈分析**：
        
        - **QPS 或 TPS 达到瓶颈时，响应时间急剧增加**：此时可能是系统的 **I/O**、**CPU** 或 **数据库** 达到处理极限。
            
        - **高错误率或响应超时**：可能是 **服务器**、**数据库连接池**、**网络带宽** 或 **缓存** 配置不当。
            
3. **压测后发现的性能瓶颈与优化方法：**
    
    - **发现瓶颈**：
        
        - **响应时间过高**：可能是后端服务处理慢、数据库查询效率低，或者网络延迟过高。
            
        - **吞吐量下降**：可能是服务器 CPU 或内存不足，或者数据库连接池不够大，导致数据库连接数不足。
            
        - **高错误率**：系统在高并发时资源无法满足，导致连接池超限或服务崩溃。
            
    - **优化方案**：
        
        - **数据库优化**：增加索引、优化查询、使用缓存减少数据库压力。
            
        - **负载均衡**：使用负载均衡器将流量分散到多台服务器，减轻单点压力。
            
        - **缓存优化**：使用 Redis 或 Memcached 缓存常用数据，减少对数据库的直接访问。
            
        - **限流与排队机制**：通过 API 网关进行限流，避免系统过载。
            
        - **异步处理**：将长时间操作（如支付、消息队列）异步化，避免阻塞主线程。
            

总结：关注响应时间、吞吐量、QPS 和错误率，分析瓶颈时主要看负载过高的指标，优化时通常从数据库、缓存、服务器、网络等多个层面入手。



### 使用MongoDB存储代驾轨迹，支持轨迹回溯；

MongoDB 轨迹存储结构？
使用文档型存储：
```json
{
  "orderId": "123",
  "driverId": "D001",
  "path": [
    {"lat": 39.90, "lng": 116.40, "time": "2025-01-01T10:00"},
    {"lat": 39.91, "lng": 116.41, "time": "2025-01-01T10:01"}
  ]
}
```
回放时根据 `orderId` 查 path，按时间顺序渲染即可。MongoDB 支持 GEO 查询，也方便后期做轨迹分析。


用 MongoDB 存储每次上传的定位点（经纬度、时间等），按司机/乘客/订单进行分组，形成完整轨迹，实现 **实时位置同步** 和 **轨迹历史回溯**。



选择MongoDB的原因：
- 具有实时高频高并发写入能力，每秒都有司机/乘客上报 GPS 坐标，可能一天要写入百万条轨迹点
- 回溯轨迹：根据 orderId/userId 查询某段时间的轨迹数据
- 支持嵌套结构，如位置坐标、路径数组、用户信息等
- 可动态扩展字段，比如加上 speed、accuracy、altitude 等字段，无需改表结构
- 数据结构灵活：上传数据可能字段不一致（如部分订单带速度、方向字段，部分没有）
- 支持写入分片（sharding），可以分布式横向扩展
- 天然无事务写入：性能比 MySQL 更高效（适用于不需要强事务的场景）
- 支持高效的索引（orderId、timestamp、地理位置等）
- 支持范围查询、排序、聚合管道
- 非常适合做时间序列数据的查询（虽然不是 TSDB，但灵活）

根据项目需求将MongoDB和MySQL对比

| 需求            | MongoDB          | MySQL（传统RDB）  |
| ------------- | ---------------- | ------------- |
| **实时轨迹写入**    | 🟢 高并发写          | 🔴 写入慢、可能锁表   |
| **轨迹回溯查询**    | 🟢 范围查询+索引快      | 🔴 多表关联复杂，性能差 |
| **结构可变/复杂对象** | 🟢 JSON 支持嵌套     | 🔴 需要建多个表+外键  |
| **动态字段扩展**    | 🟢 随写随加字段        | 🔴 改表结构成本高    |
| **分布式扩展**     | 🟢 原生支持 Sharding | 🔴 扩展难，复杂     |

### 使用MinIO上传代驾过程的录音数据；




### 设计规则进行司机刷单行为判定，保障平台公平性；

1. **刷单判定规则的主要依据特征：**
    
    - **订单频率**：同一用户或同一账户在短时间内频繁下单，可能是刷单行为。
        
    - **订单金额**：异常低价或大额订单，可能用于刷单。
        
    - **IP 地址**：频繁来自同一 IP 地址的多个订单请求，可能是刷单。
        
    - **设备指纹**：多次使用相同设备（如手机、浏览器指纹）下单。
        
    - **账户行为**：新账户在短时间内进行大量交易或使用异常支付方式。
        
    - **时间模式**：在非正常时间段频繁下单，可能是自动化刷单工具的行为。
        
2. **规则是基于行为分析还是统计模型？**
    
    - **基于行为分析**：主要通过对订单、账户和用户行为的实时分析，识别异常模式。
        
    - **基于统计模型**：结合历史数据，通过统计方法（如异常值检测、聚类算法等）发现潜在的刷单行为。
        
3. **如何在高并发下实时检测异常行为？**
    
    - **分布式流处理**：使用 **Kafka** 或 **Redis** 结合流处理框架（如 **Flink** 或 **Spark Streaming**）实时分析数据，检测异常行为。
        
    - **实时计算与缓存**：将用户行为数据存储在 Redis 等缓存系统中，进行快速查询和实时计算，实时检测频繁订单、异常支付等行为。
        
    - **机器学习模型**：训练机器学习模型进行刷单行为预测，实时判断是否异常。
        
4. **检测结果如何与订单流程联动？**
    
    - **即时拦截**：一旦检测到异常行为，系统可以通过业务逻辑直接拦截异常订单，阻止继续处理。
        
    - **订单标记**：将可疑订单标记为待审核状态，人工进一步核查。
        
    - **自动报警**：触发报警机制，通知管理员进行进一步处理。
        
    - **后续处理**：根据检测结果，订单流程可以自动跳过发货环节，或者要求人工干预。
        

简洁地说，刷单判定通过行为分析和统计模型识别异常，通过流处理系统实时检测，结合订单流程，确保检测到的异常能够及时拦截或审核。


### 通过ThreadPool+CompletableFuture异步编排远程调用，缩短司机结束代驾服务时间；

1. **在哪些业务场景使用了异步编排？**
    
    - **支付流程**：支付请求、订单生成、用户通知等操作并行处理。
        
    - **数据处理**：大数据计算、图片视频处理，多个任务异步执行。
        
    - **邮件/消息推送**：异步发送邮件或短信通知，避免阻塞用户请求。
        
    - **微服务调用**：服务间的数据请求和响应异步处理，提高系统响应能力。
        
2. **CompletableFuture 与传统线程池异步提交有何不同？**
    
    - **CompletableFuture**：更高层次的异步处理，支持链式调用、异常处理、组合任务等，适用于复杂的异步操作。
        
    - **传统线程池**：通过 `ExecutorService.submit()` 提交任务，无法直接处理返回值或管理任务的执行链。
        
3. **如何在异步任务中捕获异常并处理？**
    
    - 使用 `exceptionally()` 或 `handle()` 方法处理异常：
        
    
    ```java
    CompletableFuture.supplyAsync(() -> {
        // 执行任务
    }).exceptionally(ex -> {
        // 处理异常
        return null;
    });
    ```
    
4. **CompletableFuture 的 join() 和 get() 有什么区别？**
    
    - **join()**：抛出 **`CompletionException`** 包裹原始异常。
        
    - **get()**：直接抛出原始异常（`InterruptedException` 或 `ExecutionException`）。
        
5. **如果多个异步调用依赖关系复杂，你如何编排？**
    
    - 使用 **`thenCompose()`** 和 **`thenCombine()`** 来串联和组合多个异步任务。
        
    
    ```java
    CompletableFuture<String> result = 
        CompletableFuture.supplyAsync(() -> "Hello")
                         .thenCompose(s -> CompletableFuture.supplyAsync(() -> s + " World"))
                         .thenCombine(CompletableFuture.supplyAsync(() -> "!"), (a, b) -> a + b);
    ```
    

简洁总结：

- 异步编排用于支付、数据处理等场景。
    
- **CompletableFuture** 更灵活、可链式操作。
    
- 捕获异常用 `exceptionally()` 处理。
    
- `join()` 包裹异常，`get()` 抛出原始异常。
    
- 用 `thenCompose()` 和 `thenCombine()` 处理复杂依赖关系。


CompletableFuture

CompletableFuture 异步编排为什么不用 MQ？
代驾结束时的任务（生成账单、上传轨迹、推送消息）是 强实时同步 的，需要在用户支付前完成，不适合 MQ 异步。
CompletableFuture 支持并行执行多个远程调用，比如账单生成和轨迹上传，可以减少总耗时。


情景问题：当司机结束代驾服务时，要进行非常多的步骤，比如：获取订单信息 1s、计算防止刷单 0.5s、计算订单实际里程 0.5s、计算订单实际代驾费用 1s，数据的获取都需要远程调用，要花费很多时间，这不能接受，但如果使用多个线程并行完成这些操作，那么就可以快很多


### 使用数据万象保存并审核信息
数据万象（Cloud Infinite，CI）





### 基于RabbitMQ的TTL和死信队列实现超时订单自动取消；
1. **为什么选择 RabbitMQ？**
    
    - **可靠性**：RabbitMQ 提供消息持久化、确认机制和消息重试，确保消息不丢失。
        
    - **高可用性**：支持集群模式和镜像队列，提高系统的可用性和容错能力。
        
    - **丰富的消息模式**：支持工作队列、发布/订阅、路由等消息模式，灵活应对不同场景。
        
    - **易于集成**：与 Spring 等框架集成简便，支持多种编程语言。
        
2. **TTL 和死信队列机制是如何实现订单超时取消的？**
    
    - **TTL（Time-To-Live）**：为消息设置有效期，消息在超时后自动过期，RabbitMQ 会丢弃或发送到死信队列（DLX）。
        
    - **死信队列（DLX）**：设置死信队列处理超时消息，死信队列接收到超时订单后，可以触发自动取消逻辑。
        
    
    **实现步骤**：
    
    - 创建订单队列，设置 TTL（例如 30 分钟）。
        
    - 创建死信队列，将过期的订单消息转发到死信队列。
        
    - 在死信队列中消费超时订单并执行自动取消操作。
        
3. **死信队列与延迟队列的区别是什么？**
    
    - **死信队列（DLX）**：用于存放无法正常消费的消息（如过期、拒绝、队列已满等情况）。
        
    - **延迟队列**：通过 TTL 设置消息延迟投递，在指定时间后再投递消息到正常队列。RabbitMQ 本身没有直接支持延迟队列，但可以通过插件或死信队列实现。
        
4. **如何避免消息丢失或重复消费？**
    
    - **消息持久化**：将消息和队列设置为持久化，确保服务器崩溃时消息不会丢失。
        
    - **消息确认**：消费者应使用 **`ack`** 确认机制，确保消息已成功处理，未确认的消息会重新投递。
        
    - **幂等性设计**：确保消费端逻辑在接收到重复消息时不会产生不一致的结果。
        
5. **消息幂等性如何实现？**
    
    - **唯一标识**：为每条消息生成唯一标识（如订单ID），消费端根据此标识判断消息是否已处理。
        
    - **数据库锁**：使用数据库的唯一约束（例如订单号唯一）来避免重复处理。
        
    - **幂等操作**：确保消费操作是幂等的，例如在更新状态时检查当前状态是否符合要求。
        

简洁总结：

- **RabbitMQ** 提供高可靠性和易于集成的优势。
    
- **TTL** 和 **死信队列** 用于订单超时自动取消。
    
- **死信队列** 处理无效消息，**延迟队列** 用于延迟消息投递。
    
- 通过 **消息确认** 和 **持久化** 避免丢失，**幂等性** 通过唯一标识和锁机制实现。


RabbitMQ 延迟消息丢了怎么办？
* 幂等性保证：订单状态有状态机控制（待支付 → 已支付 → 已取消）。
* 兜底机制：定时任务（XXL-Job）每隔 5 分钟扫一次超时订单，防止消息丢失导致漏取消。

RabbitMQ 挂掉兜底方案？
* Redis zset 作为 二级延迟队列，兜底存储订单超时信息。
* 消息系统做双活部署（主备 MQ）。
* 再加定时任务兜底。


### 使用微信支付实现支付功能；

分账时外部支付系统失败怎么办？
A15. 分账逻辑走 Seata 分布式事务。如果某个支付系统失败，Seata 会回滚整体事务。兜底是 补偿任务：XXL-Job 定时扫失败订单，重试分账。

### 订单超时自动取消处理

**订单超时处理**（比如未支付自动取消）： 用户下单后 30 分钟还没支付，要自动关闭订单。


解决方案：
（Redis 的方案适合轻量场景，或作为兜底逻辑搭配 MQ 使用）

- 使用 RabbitMQ 延迟队列 + 死信队列
（注意：延迟队列功能原生 RabbitMQ 不支持，需要配置 死信队列（DLX）+ TTL）
	- 同样，发一条延迟消息，TTL = 30分钟
	- 过期后进入“订单超时处理队列”
	- 消费者消费后检查订单状态：如果已支付：忽略；如果未支付：修改订单状态为“已取消”


- **Redis + 定时任务轮询**
	- 把订单的过期时间（如 `order:expire:1001`）保存到 Redis：
	- SETEX order:expire:1001 1800 1   ### 30分钟后自动失效
	- 定时任务（每分钟跑一次）扫描 Redis 中过期键，处理未付款订单

- **Redis ZSet + 时间戳 + 拉取式轮询**
	- 用 Redis 有序集合保存所有待处理订单，score 是到期时间戳：
	- ZADD order:timeout 1714048010 1001  ### key: orderId, score: timestamp
	- 后台线程每隔 N 秒拉取时间已到的订单，进行取消处理
### 优惠券的领取与使用


###  安全问题

- 如何防止接口被爬虫或恶意调用？
    
- 登录态与 Token 如何防篡改？
    
- 敏感信息（如身份证号）如何加密存储？
    
- 上传文件如何防止恶意文件注入？



1. **如果 Redis 挂了，系统还能派单吗？如何降级？**
    
    - **降级方案**：实现 **本地缓存**，使用内存或数据库作为临时缓存，当 Redis 不可用时，使用本地缓存继续派单操作。可以用 **Hystrix** 或 **Sentinel** 实现熔断，避免 Redis 不可用导致的系统崩溃。
        
2. **如果司机抢单同时出现多个锁竞争，你如何保证公平性？**
    
    - **公平性保证**：使用 **Redisson** 的 **公平锁**，确保每次只有一个线程可以获得锁，避免多个线程同时抢单，确保锁的公平性。
        
3. **当 Drools 规则导致奖励计算错误，系统如何补偿？**
    
    - **补偿方案**：
        
        - **回退操作**：记录规则执行历史，如果发现奖励计算错误，通过补偿逻辑（如手动调整用户奖励）回滚或重新计算奖励。
            
        - **补偿策略**：使用数据库的 **补偿事务**，更新奖励值，并通知用户相关的调整。
            
4. **如何实现“超时未支付自动取消订单”而不依赖 MQ？**
    
    - **使用定时任务**：通过 **数据库** 中的订单超时时间字段，定期检查未支付的订单，超时未支付的订单自动更新为“已取消”状态。可以使用 **Spring Scheduler** 或 **Quartz** 定时任务来实现。
        
5. **如果要支持全国多城市扩展，你会如何拆分架构？**
    
    - **拆分架构**：
        
        - **微服务架构**：按城市划分微服务，保证每个城市的服务独立，降低城市间的耦合。
            
        - **数据分库分表**：根据城市 ID 将数据分布到不同的数据库或表，确保数据分区。
            
        - **负载均衡**：使用 **Nginx** 或 **Spring Cloud Gateway** 进行请求路由，按城市将流量导向不同的服务实例。
            
        - **统一 API 网关**：提供统一的访问入口，根据请求中的城市标识路由到对应的服务。


### 各种其它问题

如何支撑高并发？有数据证明吗？
* **读多写少场景**：热点数据（司机位置、订单状态）用 Redis 缓存。
* **削峰填谷**：RabbitMQ 异步消息，减少瞬时压力。
* **数据库层面**：MyBatis-Plus + 索引优化；订单表用分库分表，减少单点压力。
* **测试结果**：压测 5000 QPS 下系统稳定，平均响应延迟 < 200ms。

用户隐私合规怎么做？
敏感数据（身份证、人脸信息）只存加密后的数据，密钥托管在 KMS；部分文件（驾驶证照片）直接存腾讯云 COS，并设置临时签名 URL；同时接口加权限控制，保证只有用户自己或后台管理员能访问。

技术难点与解决方案?
难点是 司机位置高频上报造成 Redis 写入压力。解决方法：
* 把司机位置上报改成 批量 + 降频，同一秒多次上报合并；
* 热点区域数据放在本地缓存；
* 最终 Redis QPS 从 10w 降到 2w，延迟降到毫秒级。

如果重构项目，会怎么改？
* 优化服务拆分：把订单和支付彻底独立，方便水平扩展；
* 增加 链路追踪（Sleuth/Zipkin），方便排查性能瓶颈；
* 把轨迹存储改用 时序数据库（如 TDengine），查询效率会更高。

## END

