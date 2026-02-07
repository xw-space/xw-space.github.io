---
icon: pen-to-square
date: 2025-10-01
oeder: 0
category:
  - 计科基础
  - GO
tags:
  - default
---
一个简单的GO入门教程
<!-- more -->
# GO

## 介绍
GO的优势：
- 语法简洁、简单易学：没有继承、多态、最近才有简单的泛型
- 性能强大：编译速度快，几乎接近脚本语言，比C/C++都快很多，更别说java
- 内置垃圾回收（GC）
- 内置轻量级线程goroutine，创建和调度成本都都远低于系统线程
- 支持高并发：轻松创建上百万体条并发任务
- 提供CSP（Communicating Sequential Processes）模型，天然支持安全的并发通信，避免了传统多线程编程中复杂的锁管理
- **静态编译**：Go 生成单个可执行文件，打包了所有依赖，不像 Java 需要 JVM，也不像 Python 需要解释器和依赖库。
- **跨平台**：只需 `GOOS` 和 `GOARCH` 环境变量，就能编译出不同操作系统和架构的可执行文件。
- 工程工具丰富：Go 标准库覆盖了大量常用功能：网络编程（HTTP、gRPC）、并发控制、加密、JSON 解析、测试框架等。用很少的第三方库就能快速完成一整套服务开发。
- 标准化，本身是几个工程师对现在的语言不满搞出来的，为了让团队合作快速开发，所以比较贴合开发需求



用途
云计算
容器：Docker、Kubernetes
微服务：etcd、Prometheus
DevOps 工具
## 知识点
### 核心语法与变量声明

Go是静态强类型语言，但语法倾向于简洁。

* **变量声明 (`var` vs `:=`)**
* **显式声明：** `var x int = 10` (类似Java，但类型在后)。
* **短变量声明：** `x := 10` (仅限函数内部)。这不仅是赋值，更是声明。编译器会自动推导类型（类似Python），但它是静态的。


* **常量：** `const`，没有C/Java那样的复杂修饰符。
* **无分号：** 像Python一样，行尾不需要分号（编译器自动加）。
* **公有/私有可见性：**
* **大写开头** = Public (导出)，如 `fmt.Println`。
* **小写开头** = Private (包内可见)，如 `var secret string`。
* **注意：** 不需要 `public`/`private` 关键字。



### 控制流：极简主义

Go只有很少的关键字，砍掉了许多传统语言的语法糖。

* **循环：只有 `for**`
* 没有 `while` 或 `do-while`。
* `while` 的写法：`for condition { ..}`
* 死循环：`for { ..}`
* 标准循环：`for i := 0; i < 10; i++ { ..}`


* **判断：`if**`
* 条件不需要括号：`if x > 0 { ..}` (类似Python，但强制大括号)。
* 可以在判断前加初始化语句：`if err := doSomething(); err != nil { ..}` (非常常用)。


* **分支：`switch**`
* 默认 `break`，不需要手动写（反直觉：想穿透需要写 `fallthrough`）。
* 可以不带表达式，当做多层 `if-else` 用。



### 数据结构

* **数组 (Array) vs 切片 (Slice)**
* **Array：** 值类型，长度固定。`[5]int`。在Go中很少直接使用。
* **Slice：** 引用类型，动态扩容（类似Java的ArrayList或Python的List）。
* 声明：`[]int` (没有长度)。
* 操作：`append(slice, value)`。
* **坑点：** 切片底层指向数组，修改切片可能影响原数组。




* **Map**
* 类似Java的HashMap或Python的Dict。
* 初始化：`m := make(map[string]int)`。
* 无序。



### 指针 (Pointers)

* **回归C语言：** Go有指针 `*T` 和取地址 `&`。
* **区别：** Go的指针主要用于**共享内存**（避免值拷贝），但**不支持指针运算**（不能 `p++`），所以是安全的。
* **方法接收者：** 定义对象方法时，用指针接收者 `(p *User)` 可以修改对象状态，用值接收者 `(u User)` 则无法修改。

### 函数

* **多返回值：** 类似Python，Go函数可以返回多个值。
```go
func swap(x, y string) (string, string) {
    return y, x
}

```


* **一等公民：** 函数可以赋值给变量，可以作为参数传递。

### 面向对象 (OOP) - Go的独特之处

Go没有 `class`，没有 `extends`。

* **Struct (结构体)：** 类似C的struct。
```go
type User struct {
    Name string
    Age  int
}

```


* **Methods (方法)：** 定义在Struct之外。
```go
func (u *User) SayHello() { ..}

```


* **Interface (接口) - 鸭子类型 (Duck Typing)：**
* **非侵入式：** 不需要显式声明 `implements`。
* 只要一个Struct实现了接口定义的所有方法，它就自动实现了该接口。
* 这使得代码解耦非常容易。



### 错误处理 (Error Handling)

* **没有 Exception：** Go没有 `try-catch`。
* **显式检查：** 错误被视为一种值，通常作为函数的最后一个返回值。
```go
file, err := os.Open("filename.txt")
if err != nil {
    log.Fatal(err)
}

```


* 这经常被吐槽代码冗长，但能保证逻辑清晰，强制开发者处理每个错误。

### 并发 (Concurrency) - Go的杀手锏

这是Go最强大的地方，也是区别于Java/Python线程模型的关键。

* **Goroutine (协程)：**
* 用户态线程，极轻量（几KB内存）。
* 启动：只需在函数前加 `go` 关键字。
* `go doWork()` 瞬间启动并发任务。


* **Channel (通道)：**
* **理念：** "不要通过共享内存来通信，而要通过通信来共享内存。"
* 类似Unix管道，用于在Goroutine之间传递数据，自带同步机制，避免了复杂的锁（Lock）。
* 操作：`ch <- value` (发送), `value := <- ch` (接收)。



### 资源管理 (Defer)

* 类似Java的 `finally` 或 Python的 context manager。
* `defer` 后的函数会在当前函数**返回前**执行。
* 常用于关闭文件、释放锁。
```go
f, _ := os.Open(...)
defer f.Close() // 即使下面代码panic，close也会执行
// 业务逻辑...

```



### 工具链

Go不仅是语言，还自带了一套强大的现代化工具链：

* `go mod`：依赖管理（不需要Maven/Gradle/pip）。
* `go fmt`：强制代码格式化（彻底终结大括号换行之争）。
* `go test`：内置单元测试框架。
## 使用
- Go Playground - The Go Programming Language，简单快捷运行： https://go.dev/play/

因为网络问题无法下载Go 的模块：
- 使用国内代理镜像
```bash
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOSUMDB=sum.golang.org
```
- 临时直连（走 GitHub，不用 Google 代理）
```bash
go env -w GOPROXY=direct
go env -w GOSUMDB=sum.golang.org
```



## go.mod
作用：定义当前项目是一个 Go 模块（module path）。声明依赖（直接/间接）及其**期望版本**。记录 Go 版本、工具链、替换规则等，用于**可复现构建**。

内容说明：
```go
// 模块名，一般等于仓库根路径（如 `github.com/user/repo`）
// 模块路径必须与远端仓库一致，否则会报 _“module declares its path as X, but was required as Y”_。
// **主版本号 ≥ v2** 的库，包 `import` 路径末尾需要带 `/vN`：例如：`module github.com/foo/bar/v3`，import 时也写 `github.com/foo/bar/v3/...`。这保证 v2 与 v3 能并存，避免“全局破坏性升级”。
module github.com/yourname/ai-read/backend   

// 声明最低Go 语言语义版本（影响标准库行为/编译器诊断等）
go 1.22             

// 可选：固定工具链版本（Go 1.21+）
toolchain go1.22.6                           

// 列出直接依赖与间接依赖（带 `// indirect` 注释通常表示是传递性依赖）
require (
    // 直接依赖
    github.com/gin-gonic/gin v1.10.0         
    // 直接依赖（需要cgo）
    github.com/mattn/go-sqlite3 v1.14.22     
    // 间接依赖（由上面依赖引入）
    golang.org/x/sys v0.23.0 // indirect     
)
// 用本地目录/私有仓库替换某依赖，replace A => B
replace github.com/xxx/lib => ../local-lib   
// 显式排除某个坏版本（极少用）
exclude github.com/a/b v1.2.3  
// 撤回已发布的有问题版本，告知下游不要选（一般你不是作者就不会写）
retract [v1.0.0]                             
```

注意事项：
- 升级只在你显式 `go get xxx@new` 时发生；不会“偷偷”变。
- **MVS（Minimal Version Selection，最小版本选择）**：构建时会在整个依赖图里对每个模块选择所有约束里要求的最小可用版本（而不是“最新”）。这能让升级可控且可复现。
- **语义导入版本（Semantic Import Versioning）**：模块的 v2+ 版本必须把主版本号加进模块路径：module github.com/foo/bar/v2，并在 import 时写成 import "github.com/foo/bar/v2"。


```bash
## 新建模块（首次）
go mod init github.com/yourname/ai-read/backend 
## 新增/升级依赖
go get github.com/mattn/go-sqlite3@v1.14.22       
## 清理未用依赖、补齐缺失记录（很重要）
go mod tidy                                       
## 看依赖图
go mod graph                                      
## 列出构建用到的所有模块
go list -m all                                    
## 为什么需要它
go mod why -m github.com/mattn/go-sqlite3         
## 预下载依赖到本地缓存
go mod download                                   
```

- 改动依赖或升级 Go 版本后，**一定 `go mod tidy`**，再提交变更。
- 私有仓库设置 `GOPRIVATE=your.company.com/*`，避免把私有模块信息发到公共校验服务。


## go.sum
作用：记录每个被下载的模块版本的哈希校验值，构建时 Go 会对比实际下载内容与 go.sum 里的哈希；不匹配就报错，避免“被篡改”的依赖悄悄进来。确保**供应链安全**与**可复现构建**。

内容举例：
```go
github.com/mattn/go-sqlite3 v1.14.22 h1:Q2...     ## 源码包hash
github.com/mattn/go-sqlite3 v1.14.22/go.mod h1:Qk...  ## 其 go.mod 文件hash
```

注意事项
- 如果看到错误 “missing go.sum entry for module providing package …”，一般跑：`go mod tidy`
- 它会记录你项目构建过程中接触到的**全部特定版本**的校验；即使后来不再直接使用，条目也可能留存（保证历史可复现）。
- **本地替换不写入 go.sum**：`replace xxx => ../local` 这种本地目录替换，不会产生校验记录（因为没下载远程包）。把替换去掉、重新拉远程时才会新增校验。





## 项目

资料：
https://github.com/search?q=assistant+language%3AGo&type=repositories

https://github.com/gptscript-ai/gptscript
https://github.com/GoogleCloudPlatform/kubectl-ai
https://github.com/zk-org/zk


## 学习资料

- [Golang 中文学习文档](https://golang.halfiisland.com/)： https://golang.halfiisland.com/guide.html
- 2022最新超详细的 Go 语言学习路线（建议收藏🔥） | Java程序员进阶之路x沉默王二，但我觉得沉默王二八股做的就一般，但是吧，网上成体系的资料好像也不多： https://three-musketeers.gitcode.host/tobebetterjavaer/xuexiluxian/go/

【80%哲学的践行者 ——“够用就行”的Go语言】 https://www.bilibili.com/video/BV11FY9zZEwS/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef


## END