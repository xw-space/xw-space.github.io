---
icon: pen-to-square
date: 2025-10-01
category:
  - 其它
  - 摘抄
tag:
  - default
---



# 软件工程
## 前言
先头脑风暴，然后再让AI提一些建议，然后用AI规划产品规划大纲

可行性研究
需求分析
技术说明
总体设计
详细设计

项目背景
产品目标
功能模块
技术架构

未来拓展

## 软件项目管理
- 软件项目管理期末考试
    - 软件项目管理期末考试
        - 项目管理知识体系的知识领域 P6
        - 项目管理的过程组成及相应的关系 P14
        - 生存期的模型以及适用的情况 P42
        - 需求管理包含的过程有哪些 P67
        - 任务分解：图表、清单 P95
        - PDM的网络图，给条件会自己会画 P155
        - PERT方法，会案例分析  P159
        - 关键路径法，会算es、ls、浮动等 P165
        - 决策树 P272
        - 净值分析法，理解含义并会计算相关的值 P318
    - 成本估计
    - 效益估计
    - 任务分解
    - 需求分析
    - 软件危机
        - 软件危机是指计算机软件的开发和维护过程中所遇到的一系列严重问题。
        - 软件危机是由于软件开发逐步发展，软件越来越大，开发软件不再是一个人的单打独斗，就像建房子一项，需要一套完整的工程学来规划软件开发过程。
        - 为了解决软件危机，既要有技术措施（方法和工具），又要有必要的组织管理措施。
    - 生存期模型
    - 软件开发过程
        - 1.可行性研究
            - 1.行业了解：上游、下游
                - 1.上游：供应链、生产
                - 2.下游：售卖、配送
                - 2.市场规模
                - 3.竞品分析
        - 2.需求分析
            - 1.功能结构
                - 1.项目能做什么
                - 2.功能及功能层次
            - 2.业务流程
            - 3.用例
        - 3.设计
            - 1.原型设计
            - 2.数据库设计
            - 3.
        - 4.实现开发
            - 1.架构级技术：微服务搭建、性能优化、数据优化、安全性
            - 2.业务及开发
            - 3.搬砖
        - 5.测试
        - 6.运维

## 开发流程
【揭秘三线城市的软件公司研发流程】 https://www.bilibili.com/video/BV1aiabzPEA4/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## 系统架构设计
分布式系统常用技术及案例分析（第2版）： https://weread.qq.com/web/reader/1e032080718487041e02def


分布式系统架构：架构策略与难题求解： https://weread.qq.com/web/reader/18632780813ab8029g01593a

搞定系统设计：面试敲开大厂的门： https://weread.qq.com/web/reader/21632710813ab8719g010db3

凤凰架构：构建可靠的大型分布式系统： https://weread.qq.com/web/reader/3fe328b072517cbf3fea609

分布式架构原理与实践： https://weread.qq.com/web/reader/948326f0813ab7294g014bb7

微服务设计： https://weread.qq.com/web/reader/b6e325705dd9ecb6e246423

构建可扩展分布式系统：方法与实践： https://weread.qq.com/web/reader/8b732c00813ab9155g012130

## 软件开发原则
软件设计原则是指导软件开发过程中设计良好、可维护、可扩展和高质量代码的重要准则。
设计原则帮助开发者设计出更具弹性、易于维护和扩展的软件系统。通过应用这些原则，开发者可以避免常见的设计陷阱，并创建出更优雅的代码结构。在实践中，通常会结合使用这些原则，找到适合特定问题的最佳解决方案。

以下是几条最重要的软件设计原则：
1. **单一职责原则（Single Responsibility Principle, SRP）**
**定义**：一个类应该仅有一个引起变化的原因，即一个类只负责一个功能或职责。
**意义**：当一个类承担过多的职责时，类的变化将会变得频繁，难以维护。通过遵循单一职责原则，代码的复杂度被降低，每个类变得更专注、更易理解、测试和维护。
**示例**：假设有一个 `Report` 类，它既负责生成报告，又负责将报告保存到文件。如果未来保存方式改变了（比如改为保存到数据库），那么这个类的职责就会被影响。将生成报告和保存报告的功能分离到不同的类中，可以避免这种影响。

2. **开闭原则（Open/Closed Principle, OCP）**
**定义**：软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。
**意义**：当系统需求变化时，应该尽可能通过扩展系统来实现新功能，而不是修改已有代码。这样可以减少引入新问题的风险，并且降低维护成本。
**示例**：在一个图形库中，假设有一个 `Shape` 基类和 `Circle`、`Rectangle` 等子类。如果需要添加新的图形类型（如 `Triangle`），可以通过继承 `Shape` 并实现其抽象方法，而不需要修改现有的 `Shape` 类。

3. **里氏替换原则（Liskov Substitution Principle, LSP）**
**定义**：子类对象必须能够替换掉父类对象，并且不影响程序的正确性。
**意义**：这个原则保证了继承关系的正确使用。如果一个子类不能替代它的父类，那么这个子类就违反了继承的设计初衷，可能会导致程序的错误行为。
**示例**：假设有一个 `Bird` 类，其中有一个 `fly()` 方法。如果我们定义一个 `Penguin` 类继承自 `Bird`，但企鹅不会飞，那我们就违反了里氏替换原则。合适的做法是创建一个 `NonFlyingBird` 类，并让 `Penguin` 继承它，而不是继承 `Bird`。

4. **依赖倒置原则（Dependency Inversion Principle, DIP）**
**定义**：高层模块不应该依赖于低层模块，二者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。
**意义**：依赖倒置原则促进了模块之间的松耦合，使得高层模块和低层模块可以独立地变化。通过依赖接口或抽象类，而不是具体实现，代码变得更灵活和可测试。
**示例**：假设有一个 `EmailSender` 类负责发送电子邮件。如果 `NotificationService` 类直接依赖 `EmailSender`，当需要支持短信通知时，`NotificationService` 需要修改。使用依赖倒置原则，我们可以让 `NotificationService` 依赖一个 `INotificationSender` 接口，然后分别创建 `EmailSender` 和 `SmsSender` 来实现这个接口。

5. **接口隔离原则（Interface Segregation Principle, ISP）**
**定义**：客户端不应该被迫依赖于它不使用的方法，即使用多个特定的接口比使用一个通用的接口要好。
**意义**：这个原则建议设计较小且特定的接口，而不是设计一个庞大且笼统的接口。这样可以避免类实现不需要的方法，从而使得代码更灵活、更易维护。
**示例**：假设有一个 `Worker` 接口，包含 `work()` 和 `eat()` 方法。如果一个 `Robot` 类实现了 `Worker` 接口，它就不得不实现 `eat()` 方法，尽管 `Robot` 不需要吃饭。通过将 `Worker` 拆分成 `Workable` 和 `Eatable` 接口，`Robot` 只需要实现 `Workable` 接口，从而遵循接口隔离原则。

6. **迪米特法则（Law of Demeter, LoD）**
**定义**：一个对象应该对其他对象有最少的了解。也叫最少知识原则。
**意义**：迪米特法则建议对象之间的交互应尽可能减少。通过减少对象之间的耦合，程序变得更容易理解、维护和扩展。
**示例**：假设一个对象需要访问一个方法链 `a.getB().getC().doSomething()`。这违反了迪米特法则，因为它依赖了多个类的内部结构。更好的方式是为类 `a` 提供一个封装方法，如 `a.doSomethingWithC()`，从而减少对外部的依赖。


## 工程意识

| 工程意识模块         | 核心内容                                        |
| -------------- | ------------------------------------------- |
| 1. **可维护性**    | 命名规范、代码分层清晰、注释适度、避免硬编码、封装合理                 |
| 2. **可测试性**    | 能写出单元测试、懂得用mock、测试覆盖率、能做接口测试或集成测试           |
| 3. **可扩展性**    | 抽象能力强、不写死逻辑、预留接口、避免复制粘贴式开发                  |
| 4. **可部署性**    | 会打包、部署、配置环境，懂CI/CD、Docker、环境变量等             |
| 5. **稳定性/容错性** | 考虑异常处理、超时机制、重试策略、降级处理、监控日志等                 |
| 6. **版本控制意识**  | 熟练使用 Git，能合理设计分支策略（如feature/bugfix/release） |
| 7. **文档与协作意识** | 能写README、接口说明、部署文档，懂得团队协作规范（如Code Review）   |
| 8. **安全意识**    | 理解用户输入校验、权限控制、SQL注入、XSS等常见安全漏洞              |

如何系统性培养“工程能力”？
0. 最重要的是能跑

1. 从“能跑”提升到“能用”的意识

* 做项目时不只图完成，要思考：“别人能看懂吗？能维护吗？部署得起来吗？”
* 每次写完代码尝试写文档、写测试，哪怕简化一点也行

2. 参与完整项目生命周期

* 哪怕是练手项目，也要经历：设计 → 开发 → 部署 → 运维
* 练习用 Git 管理版本、写 Dockerfile、部署到云平台（如 Vercel、Render、Heroku）

3. 看别人的优秀工程项目

* 阅读 GitHub 上 star 多的项目，重点看：

  * 目录结构如何组织？
  * README 是否清晰？
  * 怎么写测试？怎么分层？
* 推荐关键词：“awesome-xxx”“realworld-xxx”

4. 通过 Code Review 提高代码质量

* 如果在团队，可以主动参与 Code Review 或请求别人 review 你
* 没团队也可以在 GitHub 上参与开源项目练习 PR + 讨论

5. 跟踪经典工程类书籍和规范

| 类型        | 推荐书籍 / 规范                           |
| --------- | ----------------------------------- |
| 编码规范      | 《代码整洁之道》《编写可读代码的艺术》                 |
| 架构思维      | 《架构整洁之道》《Domain-Driven Design 精粹》   |
| 测试实践      | 《Python测试驱动开发》《单元测试的艺术》             |
| DevOps工具链 | 《Docker 入门实战》《持续交付》《Kubernetes权威指南》 |
## 开发策略
MVP（Minimum Viable Product，最小可行产品）


## 软件开发注意事项
- **明确项目需求**
- **功能模块划分**
项目变复杂怎么办？
- 分层
- 分模块
- 模块化
- 高内聚
- 低耦合
- **统一代码风格**、编码规范
- 配置环境
- 代码注释
- 想好错误处理对策
- 日志
- 版本控制
- 定期重构
- 选择合适的数据结构
- 考虑可拓展性
- 边界和溢出问题
- 优化代码效率
- 考虑代码可读性
- 不同模块（代码）间的通信问题：定义好模块（代码）的输入输出（接口）
- 配置文件-依赖管理


## 原型设计
墨刀 - 眼界： https://modao.cc/app/design/pbkjmx41n4xvk1v
MasterGo： https://mastergo.com/?utm_source=toufangf&utm_medium=baidu&utm_campaign=action1
墨刀 - 个人空间： https://modao.cc/dashboard/me
2210819011的团队 - 摹客： https://app.mockplus.cn/team/blhumtfzvx
即时设计 - 可实时协作的专业 UI 设计工具： https://js.design/?source=sketch&plan=2
Axure中文网 – 交互原型设计软件Axure RP 10中文正版支持 – 北京口耳相传科技有限公司： https://www.axure.com.cn/
16 种原型设计工具及其使用场景 - 知乎： https://zhuanlan.zhihu.com/p/24805574


## 项目架构图/UML
- 【UML基础班课程分享【梁梠计划】】 https://www.bilibili.com/video/BV1oy4y1x7hF/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
- Java项目教你画图；架构图、拓扑图、用例图、流程图、建模图、分层图！： https://www.bilibili.com/video/BV1Nes9e2E5K
- 架构师必须掌握的画图工具，时序图、架构图、各种UML图轻松掌握。25min，还包括draw.io的简单介绍： https://www.bilibili.com/video/BV16E421T7hc

## 撰写开发文档
**学习资料**： https://max.book118.com/html/2019/0902/8125074117002045.shtm
https://wenku.baidu.com/view/99172242846fb84ae45c3b3567ec102de2bddfe9.html?_wkts_=1719650186901
https://wenku.baidu.com/view/715bce94dd88d0d233d46ab4.html?_wkts_=1719650188181


## 软件测试
常见的二十种软件测试方法详解-CSDN博客： https://blog.csdn.net/nhb687096/article/details/131980113?utm_source=miniapp_weixin
软件测试基础知识 + 面试理论（超详细）-CSDN博客： https://blog.csdn.net/weixin_43750377/article/details/114066222?utm_source=miniapp_weixin

测试架构师修炼之道：从测试工程师到测试架构师（第2版） https://weread.qq.com/web/reader/4c33283072895eec4c3b3a8
软件测试 https://weread.qq.com/web/reader/1e332070722768831e3eb41
Google软件测试之道 https://weread.qq.com/web/reader/3c5320e0813ab820ag01591f

## 开发规范-命名

- 小驼峰命名法(lowerCamelCase)：除第一个单词之外，其他单词首字母大写。方法名、参数名、成员变量、局部变量需要使用小驼峰命名法(lowerCamelCase)。
- 大驼峰命名法(CamelCase)(帕斯卡命名法)：把所以单词（包括第一个单词）的首字母都大写。常用于类名，命名空间等。
- 蛇形命名法(**snake_case**)：蛇形法是全由小写字母和下划线组成，在两个单词之间用下滑线连接即可。测试方法名、常量、枚举名称需要使用蛇形命名法(snake_case)。
- 串式命名法(kebab-case)：在串式命名法中，各个单词之间通过下划线“-”连接。项目文件夹名称使用串式命名法(kebab-case)
- 脊柱命名法（spinal case）：使用中划线连接，如python-cat
- 自由命名法

给代码起名字的三要三不要准则【让编程再次伟大#11】 https://www.bilibili.com/video/BV1gi421i7nz


## 设计模式
### 概念
设计模式 (Design Pattern)，在软件设计的代码层面对一些常见问题总结的可复用的解决方案，
不同模式适用于不同的场景，在实际开发中应根据需求选择合适的模式来解决问题。
提高代码的可维护性、可扩展性和复用性。、

经典设计模式共有23种
设计模式通常分为三大类：创建型模式、结构型模式和行为型模式。


### 创建型模式（Creational Patterns）
- **单例模式（Singleton Pattern）**：确保一个类只有一个实例，并提供一个全局访问点。
- **工厂方法模式（Factory Method Pattern）**：定义一个用于创建对象的接口，但由子类决定要实例化的类是哪一个。
- **抽象工厂模式（Abstract Factory Pattern）**：提供一个接口，用于创建相关或依赖对象的家族，而不需要指定具体类。
- **建造者模式（Builder Pattern）**：将一个复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。
- **原型模式（Prototype Pattern）**：使用原型实例指定创建对象的种类，并通过复制这些原型创建新的对象。
### 结构型模式（Structural Patterns）
- **适配器模式（Adapter Pattern）**：将一个类的接口转换为客户希望的另一个接口，使得原本由于接口不兼容而不能一起工作的类可以协同工作。
- **桥接模式（Bridge Pattern）**：将抽象部分与它的实现部分分离，使它们都可以独立地变化。
- **组合模式（Composite Pattern）**：将对象组合成树形结构以表示“部分-整体”的层次结构。组合模式使得客户对单个对象和组合对象的使用具有一致性。
- **装饰者模式（Decorator Pattern）**：动态地给一个对象添加一些额外的职责。就扩展功能而言，装饰者模式比生成子类更加灵活。
- **外观模式（Facade Pattern）**：为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这一接口使得这一子系统更加容易使用。
- **享元模式（Flyweight Pattern）**：运用共享技术有效地支持大量细粒度的对象。
- **代理模式（Proxy Pattern）**：为其他对象提供一个代理，以控制对这个对象的访问。
### 行为型模式（Behavioral Patterns）
- **策略模式（Strategy Pattern）**：定义一系列算法，把它们一个个封装起来，并且使它们可互相替换。本模式使得算法可以独立于使用它的客户而变化。
- **模板方法模式（Template Method Pattern）**：定义一个操作中的算法的框架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变算法结构即可重定义该算法的某些特定步骤。
- **观察者模式（Observer Pattern）**：定义对象间的一种一对多的依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都得到通知并被自动更新。
- **迭代器模式（Iterator Pattern）**：提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。
- **责任链模式（Chain of Responsibility Pattern）**：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递请求，直到有对象处理它为止。
- **命令模式（Command Pattern）**：将请求封装为一个对象，从而使你可以用不同的请求对客户进行参数化；对请求排队或者记录请求日志，以及支持可撤销的操作。
- **备忘录模式（Memento Pattern）**：在不破坏封装的前提下，捕获并保存一个对象的内部状态，以便该对象以后可以恢复到先前的状态。
- **状态模式（State Pattern）**：允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。
- **访问者模式（Visitor Pattern）**：表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。
- **中介者模式（Mediator Pattern）**：用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显示地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。
- **解释器模式（Interpreter Pattern）**：给定一个语言，定义它的文法的一种表示，并定义一个解释器，该解释器使用该表示来解释语言中的句子。

### Reactor设计模式
Reactor（反应堆）：由Reactor（反应堆）和Handlers（事件处理器）两部分组成，当事件发生就绪（accept、read、write），Reactor（反应堆）就把事件分发给对应的处理器（Handler），处理器（Handler）负责具体的业务逻辑，比如：接收请求、读数据、写数据

一般流程：
- 事件注册
- 循环监听
- 事件分发

### 学习资料

**书**：
大话设计模式【Java溢彩加强版】： https://weread.qq.com/web/reader/63632ba0813ab78f4g011d17
大话设计模式： https://weread.qq.com/web/reader/5d932bf0727da1885d91283
设计模式：可复用面向对象软件的基础（典藏版）： https://weread.qq.com/web/reader/0eb32540813ab9066g019237
人人都懂设计模式：从生活中领悟设计模式（Python实现）： https://weread.qq.com/web/reader/e72323d071845588e729af0
秒懂设计模式： https://weread.qq.com/web/reader/9b13257072562b5c9b1c8d6
设计模式的艺术： https://weread.qq.com/web/reader/c4032270727da196c40104a

## 框架


框架是为了解决某一问题，实现某一功能，而已经完成好的一套可复用的“半成品代码”，它已经规定好各部分的责任，以及它们之间如何协作，相关的部分代码也已完成，在这个已经实现的“骨架”上，使用者可以专注于应用要实现的业务逻辑上。
常见的框架：Spring、Mybatis、Beego等。


## 框架模式

(Framework pattern)，是框架设计的思路或模式，框架模式是项目的设计模式，介于“架构”与“设计模式”之间。

常见的架构模式：MVC、MVP、MVVM

## 架构
### 介绍
(Architecture)
软件系统的顶层结构设计，定义整个软件​​系统整体的结构，对组件进行了抽象的描述，明确设计原则
用于指导大型软件系统各个方面的设计，定义整个软件系统的组成部分（模块、子系统、接口）、它们的关系与协作方式。

以功能或者说，开发需要为出发点，进行架构选择

常见的架构：C/S架构，B/S架构等。

### MVC架构
经典MVC模式中，M是指业务模型，V是指用户界面，C则是控制器，使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式。其中，View的定义比较清晰，就是用户界面。

V即View视图是指用户看到并与之交互的界面。比如由html元素组成的网页界面，或者软件的客户端界面。MVC的好处之一在于它能为应用程序处理很多不同的视图。在视图中其实没有真正的处理发生，它只是作为一种输出数据并允许用户操作的方式。

M即model模型是指模型表示业务规则。在MVC的三个部件中，模型拥有最多的处理任务。被模型返回的数据是中立的，模型与数据格式无关，这样一个模型能为多个视图提供数据，由于应用于模型的代码只需写一次就可以被多个视图重用，所以减少了代码的重复性。

C即controller控制器是指控制器接受用户的输入并调用模型和视图去完成用户的需求，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。

![[Pasted image 20250925011206.png]]
Model层：实体类、pojo、VO、DTO等等

Controller层：Servlet、Spring MVC、Struts、Struts2等等

View层：jsp、html等等




**MVC 架构**（Model-View-Controller）是一种设计模式，用于将应用程序的业务逻辑、用户界面和用户输入分离，以便简化代码结构、提升可维护性和扩展性。MVC 是很多现代 Web 和移动应用程序开发的基础结构。以下是 MVC 各部分的职责与工作方式：
**1. Model（模型）**
   - **职责**：模型层负责处理应用程序的数据和业务逻辑。它与数据库或其他数据源交互，接收控制器传递的数据更新请求。
   - **作用**：模型保存应用程序的核心数据状态，并可以处理数据验证、业务规则等逻辑。
   - **示例**：例如，一个用户模型可能包含用户的属性（如姓名、邮箱等）及其相关操作（如创建用户、更新用户信息）。
**2. View（视图）**
   - **职责**：视图层负责展示数据，即用户界面。视图从模型中获取数据，并根据所需的格式展示给用户，但不会直接操作数据。
   - **作用**：视图从模型获取数据并向用户显示，支持页面动态渲染和更新。
   - **示例**：在 Web 应用中，HTML、CSS、JavaScript 等构成的前端代码就是视图部分，它展示的是通过控制器传递的数据。
**3. Controller（控制器）**
   - **职责**：控制器负责接收用户的输入，将用户的请求传递给模型，并决定向视图输出的内容。
   - **作用**：控制器根据用户的交互行为更新模型的状态，并选择合适的视图向用户反馈。它充当视图和模型之间的中间人。
   - **示例**：在一个购物车应用中，控制器会根据用户点击“添加到购物车”的请求更新购物车的模型，然后向用户展示更新后的购物车内容。
**工作流程**
   - 用户在视图（如 Web 页面）中触发操作（例如点击按钮），该操作被控制器捕获。
   - 控制器处理用户输入，与模型交互来更新数据或获取所需信息。
   - 模型更新后将数据返回给控制器，控制器将结果传递给视图。
   - 视图将更新后的数据展示给用户，完成一次完整的请求-响应流程。
**优点**
   - **分离关注点**：每个层级关注不同方面的逻辑，使代码更清晰易懂。
   - **可维护性和扩展性**：视图、模型和控制器彼此独立，代码修改或扩展时不会影响其他层。
   - **便于测试**：开发人员可以分别测试模型、视图和控制器的功能。
**应用场景**
   - MVC 在 Web 应用中尤其流行，比如 Spring MVC 在 Java 开发中常用于构建基于 Web 的应用程序。
**实际例子**：
为了帮助更好地理解 MVC 架构，以下是一个基于 Spring Boot 的示例应用程序，它实现了一个简单的用户管理系统。
**1. 创建模型（Model）**
在 MVC 架构中，模型代表应用程序中的数据和业务逻辑。我们先创建一个简单的 `User` 模型，表示用户的基本信息。
```java
// User.java
package com.example.demo.model;
public class User {
    private String id;
    private String name;
    private String email;
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```
**2. 创建控制器（Controller）**
控制器负责接收请求、处理逻辑，并返回适当的响应。在这里，我们创建一个 `UserController` 控制器，用于接收和处理与用户相关的请求。
```java
// UserController.java
package com.example.demo.controller;
import com.example.demo.model.User;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/users")
public class UserController {
    private final List<User> userList = new ArrayList<>();
    // 添加用户
    @PostMapping("/add")
    public String addUser(@RequestBody User user) {
        userList.add(user);
        return "User added successfully";
    }
    // 获取所有用户
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userList;
    }
    // 获取单个用户
    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userList.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
```
**3. 创建视图（View）**
在 Spring Boot 中，视图通常由 HTML 页面或其他模板引擎文件（如 Thymeleaf、Freemarker 等）组成。如果只需要 API 响应，视图可以是 JSON 格式的数据。在这个例子中，视图由 JSON 响应替代，用户通过浏览器或 Postman 发送请求，查看 JSON 响应。
**4. 项目结构**
项目目录结构如下：
```
demo
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.example.demo
│   │   │       ├── controller
│   │   │       │   └── UserController.java
│   │   │       ├── model
│   │   │       │   └── User.java
│   │   └── resources
│   │       └── application.properties
```
**5. 运行与测试**
启动应用后，可以通过以下 URL 测试不同的 API 请求：
- 添加用户：  
  请求类型：`POST`  
  URL：`http://localhost:8080/users/add`  
  请求体：  
  ```json
  {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
  }
  ```
- 获取所有用户：  
  请求类型：`GET`  
  URL：`http://localhost:8080/users/all`
- 获取单个用户：  
  请求类型：`GET`  
  URL：`http://localhost:8080/users/1`
通过这种 MVC 分离的结构，业务逻辑（`User` 模型）、控制逻辑（`UserController` 控制器）和视图（JSON 输出）被有效地解耦，提高了代码的可维护性和可扩展性。

### MVP模式

MVP的全称为Model-View-Presenter，Model提供数据，View负责显示，Controller/Presenter负责逻辑的处理。MVP与MVC有着一个重大的区别：在MVP中View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部，而在MVC中View会直接从Model中读取数据而不是通过 Controller。
MVP在安卓开发中比较常见,接下来的说明以安卓为例

Model层：实体类、pojo、VO、DTO等等

Presenter层：负责处理View与Model直接的交互，没有明显技术名词可以描述。

View层：Activity等等
![[Pasted image 20250925011236.png]]


### MVVM模式
MVVM是Model-View-ViewModel的简写。它本质上就是MVC 的改进版。MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。当然这些事 ViewModel 已经帮我们做了，它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。

![](https://developer.qcloudimg.com/http-save/yehe-admin/de37b230c65e0105341c326a4ffe29e1.png)

Model层：实体类、pojo、VO、DTO等等

View-Model层：Vue、LayUI、React等等

View层：vue、html等等

### 资料
凤凰架构： https://icyfenix.cn/




## END











