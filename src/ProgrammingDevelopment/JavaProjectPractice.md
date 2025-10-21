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


### 网络通信
- 通过自定义协议明确每条消息的边界，防止 TCP 粘包/拆包问题：
因为 TCP是流式传输，它是没有消息边界的！所以多条小消息可能**粘在一起**发送到对方、一条大消息可能**拆成多块**发送到对方


如果一条大消息被拆成多块发送到对方，怎么合并起来呢？

自定义协议一般要考虑的东西：

| 需要定义的元素          | 说明                 |
| ---------------- | ------------------ |
| 魔数（magic number） | 标识这是我们自家协议，不是垃圾数据  |
| 协议版本             | 方便未来扩展             |
| 消息类型             | 请求/响应/心跳等          |
| 序列化方式            | JSON/Protobuf/自定义等 |
| 请求ID             | 区分异步多个请求           |
| 数据长度             | 多少字节是正文内容（Body）    |
| 数据内容（Body）       | 真正序列化后的业务对象        |

| 字段            | 长度      | 说明                 |
| ------------- | ------- | ------------------ |
| Magic Number  | 4 bytes | 协议标识，比如 0xCAFEBABE |
| Version       | 1 byte  | 版本号                |
| Serialization | 1 byte  | 使用什么序列化方式          |
| Message Type  | 1 byte  | 请求/响应/心跳           |
| Request ID    | 8 bytes | 请求ID，用于异步关联        |
| Body Length   | 4 bytes | 正文长度               |
| Body          | N bytes | 正文（序列化后的数据）        |



- 自定义编/解码器
- 自定义消息序列化器，支持多种序列化方式：JSON、Protobuf、Hessian

### 负载均衡
4 种负载均衡策略选择：服务轮询、随机访问、LRU 最近最少使用和一致性哈希算法；

负载均衡含义：当有多个服务实例可用时，客户端按一定策略调用其中一个实例，以分散压力，提高性能和容错。


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



### 服务注册与发现

### 限流与服务降级
✅ 第二个功能：使用令牌桶算法实现接口限流

---

📚 原理

**令牌桶算法（Token Bucket）**流程：

| 流程                   | 说明               |
| -------------------- | ---------------- |
| 1. 有一个固定容量的桶（token数） | 桶大小设定，比如 100     |
| 2. 按固定速率往桶里加 token   | 比如每秒加 10 个 token |
| 3. 每来一个请求，取出一个 token | 有 token 才能通过     |
| 4. 没有 token，就拒绝请求或排队 | 限流保护             |

✅ 令牌桶允许**一定程度突发流量**，比漏桶算法更灵活。

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

| 项目 | 建议 |
|------|------|
| 故障下线 | 可以加上“超时恢复”机制，避免永久剔除 |
| 限流策略 | 限速优先拦截在客户端，保护后端服务器 |
| 可配置化 | 故障次数、限流速率都支持动态配置热更新 |
| 指标监控 | 成功率、失败率、限流数输出到监控平台 |

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
### 序列化
### 动态代理
### 故障处理
### 多线程与异步调用

### 连接池与资源管理


### 基于Netty封装通信层，实现高性能异步NIO网络通信；
### 使用Zookeeper作为服务注册中心；
### 自定义编、解码器处理消息，解决粘包、拆包问题；
### 在客户端建立本地服务缓存，设置Watcher监听服务节点变化，实现客户端实时获取最新服务信息，减少注册中心访问压力；
### 使用心跳检测动态维护连接资源；
### 实现了多种序列化方式，可自由设置；
### 实现了多种负载均衡策略选择，支持灵活选择；基于令牌桶算法实现接口请求限流；
### 为幂等服务设置白名单，在白名单服务因异常失败时使用Guava-Retry框架按策略进行安全重试；
### 实现熔断器机制，支持关闭、开启、半开三种状态切换，结合服务状态判定与恢复算法，提升系统可用性；


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


### 架构问题

服务拆分怎么做？
* 用户服务（下单、支付）
* 司机服务（接单、位置上报）
* 订单服务（计费、轨迹存储）
* 风控服务（实名认证、人脸识别）
* 网关服务（统一鉴权、流量控制）


### 小程序问题

- 微信问题：40163，code被请求了两次，一个code有5分钟时效

### 使用Nacos作为配置中心，简化配置管理；
为什么要用Nacos？
可以热更新计费参数

### 基于微信小程序构建应用前端，基于SpringBoot构建后端系统；

### 使用Mybatis-plus操作数据库，简化开发工作；


### 通过自定义注解+AOP校验是否处于登录状态，减少重复代码；
过程：写了一个 `@LoginRequired` 注解，AOP 切面在 Controller 层拦截请求，解析 Token → 校验合法性 → 注入用户上下文。这样 Controller 方法不需要重复写校验逻辑。

### 使用腾讯云服务，进行司机的身份证认证、驾驶证认证、登录时的人脸识别以及相关文件的存储与审核；

首先注册与登录等腾讯云，官网地址：[https://cloud.tencent.com/](https://cloud.tencent.com/)
开通腾讯云对象存储COS：官网地址：[https://cloud.tencent.com/product/cos](https://cloud.tencent.com/product/cos)
存储桶使用地址：文档地址：[https://cloud.tencent.com/document/product/436/10199](https://cloud.tencent.com/document/product/436/10199)

身份证识别API地址：[https://cloud.tencent.com/document/product/866/33524](https://cloud.tencent.com/document/product/866/33524)
驾驶证识别API地址：[https://cloud.tencent.com/document/product/866/36213](https://cloud.tencent.com/document/product/866/36213)

人脸识别官网地址：[https://cloud.tencent.com/product/facerecognition](https://cloud.tencent.com/product/facerecognition)
人脸识别文档地址：[https://cloud.tencent.com/document/api/867/45014](https://cloud.tencent.com/document/api/867/45014)



腾讯云 OCR/COS，实现司机实名认证，提高注册效率

差不多都是去到服务的官网，然后创建应用，获取API的ID/KEY和密钥，然后
生成一个配置类，设置信息，然后把这个配置类给一个服务类，获得所需的东西，官网有教程，跟着官网给的示例教程操作就行。

- OCR可以来识别身份证照片中的内容，进行实名认证。
- COS（Cloud Object Storage）是腾讯云提供的对象存储服务，用于存储和管理大规模数据，如身份证照片、司机个人资料等。

### 通过腾讯位置服务，实现代驾路线规划；

腾讯位置服务服务器端API文档：[https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview](https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview)

腾讯位置服务的官网（[https://lbs.qq.com/](https://lbs.qq.com/)


- 使用腾讯位置服务就能获得规划好的路线



### 基于Drools规则引擎预估订单数据、计算代驾完成系统奖励以及分账信息，支持灵活规则配置；
Drools 计价规则例子？
例如：夜间 + 长途 单子 → 起步价上浮 20% + 每公里 5 元。
Drools 规则存放在数据库，系统启动时加载到内存，配置变更时用 Nacos 推送刷新规则，支持热更新，不用重启服务。


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
### 使用分布式任务调度框架XXL-JOB定时调度搜索附近司机任务；

### 使用分布式锁Redisson解决司机抢单并发问题和优惠券领取并发问题；

### 基于Redis实时同步司机和乘客位置，在前端实现司乘同显；
### 在订单、支付等跨服务场景中引入 Seata 分布式事务，保证数据一致性；

为什么要用Seata？
Steata的AT 模式，不需要改业务逻辑太多，通过数据代理实现分布式事务，性能和开发成本更均衡。

### 使用Jemeter工具进行优惠券的并发测试；
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


### 通过ThreadPool+CompletableFuture异步编排远程调用，缩短司机结束代驾服务时间；




### 使用数据万象保存并审核信息
数据万象（Cloud Infinite，CI）



CompletableFuture

CompletableFuture 异步编排为什么不用 MQ？
代驾结束时的任务（生成账单、上传轨迹、推送消息）是 强实时同步 的，需要在用户支付前完成，不适合 MQ 异步。
CompletableFuture 支持并行执行多个远程调用，比如账单生成和轨迹上传，可以减少总耗时。


情景问题：当司机结束代驾服务时，要进行非常多的步骤，比如：获取订单信息 1s、计算防止刷单 0.5s、计算订单实际里程 0.5s、计算订单实际代驾费用 1s，数据的获取都需要远程调用，要花费很多时间，这不能接受，但如果使用多个线程并行完成这些操作，那么就可以快很多

### 基于RabbitMQ的TTL和死信队列实现超时订单自动取消；

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


## 各种其它问题

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

