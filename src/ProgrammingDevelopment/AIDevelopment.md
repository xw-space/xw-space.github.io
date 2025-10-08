---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---

# AIDevelopment
## Fast API
### 简介

**简介**：
FastAPI 是一个基于 Python 类型注解的 Web 框架
用于构建高性能（快速和高可用）的API服务
**优点**：
- 高性能：性能接近 Node.js、Go，基于 Starlette 和 Uvicorn
- 自动生成文档：FastAPI 默认集成了 **OpenAPI** 和 **Swagger UI**，你可以轻松地查看和测试 API。只要你的 API 路由注解了类型提示，FastAPI 就会自动生成 API 文档。访问 `/docs`（Swagger UI）和 `/redoc` 即可交互式调试
- 支持类型提示和自动验证数据格式：使用 Python 的类型提示 + Pydantic 自动验证数据格式
- 原生异步支持：支持 `async/await`，高并发更稳定
- 开发效率高：提供自动补全、错误提示等现代开发体验
- 模块化，结构清晰：支持中间件、依赖注入、权限系统等进阶功能

**使用场景**：
- 构建 RESTful API（电商、用户管理等）
- 封装 AI / 深度学习模型的推理接口（如部署 ChatGPT、BERT）
- 数据平台后端
- 微服务框架中作为服务节点
- 支持 WebSocket、后台任务、定时任务等异步需求

**与其它web框架对比**：
Flask：简洁灵活，轻量，适合新手项目、小型服务
Django：全家桶，集成 ORM、Admin、Auth，适合构建Web网站
Fast API：类型安全、自动文档、异步性能好，适合构建现代 API / AI 模型封装服务








### 使用
- [http://127.0.0.1:8000/](http://127.0.0.1:8000/) ✅ 正常接口
- 所有api的json输出： http://127.0.0.1:8000/openapi.json

安装python（推荐 Python 3.8 以上版本）
然后需要通过 pip 安装 FastAPI 和 Uvicorn，FastAPI 是主框架Uvicorn 是一个高性能的 ASGI 服务器，用于运行 FastAPI 应用，安装命令为：
```bash
pip install fastapi uvicorn
pip install "fastapi[all]"
```

**最小应用**
main.py：
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
```

启动服务：
```bash
uvicorn main:app --reload
```


从写一个简单的 GET 接口开始。
```python
## main.py
## 导入要使用的包
from fastapi import FastAPI

## 初始化FastAPI 应用对象
app = FastAPI()

## FastAPI 使用装饰器的方式定义路由，例如`@app.get()` 表示处理 GET 请求，`@app.post()` 表示处理 POST 请求，圆括号中为路由路径，路径中可使用大括号{}添加参数，对于URL 中 `?q=xxx` 这样形式的查询参数，FastAPI 会自动识别参数类型，并根据类型注解进行验证和转换

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

启动应用，uvicorn是运行这个应用的服务器，main是文件名，app是FastAPI 应用对象名，`--reload`是启动命令：
`uvicorn main:app --reload`

（ASGI（Asynchronous Server Gateway Interface） 是 Python 的新一代 Web 服务器接口协议，用于支持异步请求处理，并且ASGI 允许你处理高并发、长连接、WebSocket 等现代 Web 应用场景，是 WSGI 的升级版，FastAPI 是异步框架，它需要支持 `async def`，所以用的是 ASGI。）

可在浏览器的网址栏中输入：
`http://127.0.0.1:8000/items/123?q=你好`

将看到浏览器显示将变量替换为输入值的结果，item_id被替换为123，q被替换为`你好·：
`{"item_id":123,"q":"你好"}`

FastAPI 无需手写任何文档，FastAPI 会根据你的代码和类型提示自动生交互式 API 文档，运行应用后，打开浏览器访问：
- http://127.0.0.1:8000/docs  ，可看到 Swagger UI，它展示了定义的所有接口、参数类型、返回格式等内容，还可以直接在线测试。
![[Pasted image 20250629180539.png]]
![[Pasted image 20250629180627.png]]

- http://127.0.0.1:8000/redoc ，则会打开ReDoc风格的文档界面。
![[Pasted image 20250629180336.png]]



对于POST 请求时，会涉及到接收请求体中的 JSON 数据。在 FastAPI 中，推荐使用 Pydantic 提供的 `BaseModel` 类来定义请求体结构。

```python
from fastapi import FastAPI
## 从Pydantic库中导入BaseModel模块
from pydantic import BaseModel

## 定义一个用户模型
class User(BaseModel):
    name: str
    age: int

app = FastAPI()

@app.post("/users/")
def create_user(user: User):
	## 在接口中接收这个模型类型的参数
    return {"username": user.name, "age": user.age}
```

可以用 Postman 或 curl 发送一个 JSON 请求体，请求体示例：
```http
POST /user HTTP/1.1
Content-Type: application/json

{
  "name": "小梦",
  "age": 24
}
```

FastAPI 提供了模块化的方式来组织路由，为了防止随着项目变大，所有接口写在一个文件中变得混乱，即使用 `APIRouter`。
所谓模块化的方式组织路由就是把不同功能的接口拆分成多个文件，每个文件定义自己的路由，然后统一在主应用中导入。

比如，在users.py中只放用户相关的接口，访问这些相关接口通过`*/users/`（\*表示通配符，表示任意长度的字符）：
```python
## users.py
router = APIRouter()

@router.get("/users/")
def list_users():
    return ["Alice", "Bob"]
```

在一个大的文件中挂载这个子路由，访问大的路由通过`*/api/*`：
```python
from users import router as user_router
app.include_router(user_router, prefix="/api")
```
通过挂载的方式，就可以通过`*/api/users/`访问

**数据校验**：
校验出错时会自动返回 422 报错，假如请求参数为`["body", "age"]`，但是`age`的数值不为数字：
```json
{
  "detail": [
    {
      "loc": ["body", "age"],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}
```

```python
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class Gender(str, Enum):
    male = "male"
    female = "female"

class Address(BaseModel):
    city: str
    zipcode: str
    
class User(BaseModel):
    name: str
    gender: Gender
    ## 枚举值校验，`gender` 在上边已通过类进行设置，只能是 `"male"` 或 `"female"`
    age: Optional[int] = None  
    ## 设置默认值和可选字段，比如这里age 可以不传
    age: int = Field(..., ge=0, le=120)  
    ## 字段验证，限制取值范围，ge = greater equal, le = less equal
	address: Address
	## 嵌套模型，"address"将包含嵌套的city和zipcode字段: {    "city": "上海",    "zipcode": "200000"}
	tags: list[str]
	## 列表字段验证，FastAPI 会校验 `tags` 是否是字符串列表。
	
```




**异常处理**
用途：用于解决用户没传某个参数、查找的资源不存在、登录时密码错误等情况。
FastAPI 提供了 `HTTPException`，可以快速返回带状态码和消息的错误响应：

```python
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi import Request

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"error": str(exc)})

if user_not_found:
    raise HTTPException(status_code=404, detail="User not found")
```
还可以自定义全局异常处理器，比如拦截数据库异常、权限问题，并统一返回格式，保证前端收到的一致性报错信息。

**响应模型**
响应模型用来**限制输出字段**，即只返回想返回的字段，而不是把数据库对象全部暴露出去：
```python
## 定义一个响应用的数据模型，FastAPI 会根据它自动过滤、格式化输出数据，还能指定状态码
## 这个UserOut模型只包括name和email，忽略了密码

class UserOut(BaseModel):
    name: str
    email: str

@app.get("/me", response_model=UserOut)
def get_me():
    return UserInDB(name="小梦", email="xx@xx.com", password="123456")
```

**表单数据**：使用 `Form`
**文件上传**：使用 `File` 和 `UploadFile`
很多前端请求并不是发送 JSON，而是通过表单提交数据，比如登录页表单，或文件上传功能。
FastAPI 提供了 `Form` 和 `File` 来支持 `multipart/form-data` 类型的请求体，也可以同时支持多文件上传、文件名提取等。
```python
from fastapi import Form, File, UploadFile

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    ...

@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    content = file.file.read()
```


**响应头与 Cookie 操作**
读取或设置请求的 Header 和 Cookie，比如前端携带的 token、用户偏好设置等。
```python
from fastapi import Header, Cookie

@app.get("/info")
def read_info(token: str = Header(...), session_id: str = Cookie(None)):
## 直接将 Header 或 Cookie 注入到函数参数中
    ...
```

**依赖注入**（Depends）
可以将，比如：权限检查、数据库连接获取、日志记录、参数验证等一些通用的逻辑抽出来，然后用 `Depends()` 注入到任何接口中，达到“代码解耦 + 自动调用”的效果。
一旦依赖失败（比如 token 无效），FastAPI 会自动中止请求，返回错误。
```python
from fastapi import Depends

def get_current_user(token: str = Header(...)):
    return decode_token(token)

@app.get("/me")
def read_me(user=Depends(get_current_user)):
    return user
```





🔐 第三阶段：认证与安全机制

|安全机制|内容|
|---|---|
|✅ OAuth2 / JWT|使用 `OAuth2PasswordBearer` 和 JWT 实现登录授权|
|✅ FastAPI Security|`fastapi.security` 模块介绍|
|✅ 用户权限控制|设置访问权限（如 admin、普通用户）|

---

🗃️ 第四阶段：数据库集成（推荐使用）

| 数据库                           | 工具                                   |
| ----------------------------- | ------------------------------------ |
| ✅ SQLite / PostgreSQL / MySQL | 任意一款                                 |
| ✅ ORM                         | `SQLAlchemy 2.0`（推荐）或 `Tortoise ORM` |
| ✅ 异步数据库连接池                    | `Databases`、`Async SQLAlchemy`       |
| ✅ 数据迁移工具                      | Alembic（可选）                          |

---

🧠 第五阶段：异步编程与性能优化（进阶）

|主题|内容|
|---|---|
|✅ async / await|基础语法、并发场景|
|✅ 异步路由|`@app.get()` 可使用 async 函数|
|✅ 并发任务|`httpx`、`asyncio.gather` 实现批量请求|
|✅ 中间件|自定义中间件做日志、限流等功能|
|✅ 背景任务|使用 `BackgroundTasks` 处理耗时任务|

---

🚀 第六阶段：项目实战与部署

|实战能力|内容|
|---|---|
|✅ 项目结构设计|多模块拆分、配置管理（如 `settings.py`）|
|✅ 部署|Uvicorn + Gunicorn + Nginx|
|✅ Docker 化部署|编写 Dockerfile 与 docker-compose|
|✅ 日志与监控|`loguru`、`prometheus`, `sentry`|
|✅ CI/CD|GitHub Actions / GitLab CI 自动部署（可选）|

---

📈 第七阶段：进阶应用方向（可选）

| 方向           | 内容                                         |
| ------------ | ------------------------------------------ |
| 🧠 AI 模型服务   | 用 FastAPI 封装 PyTorch / TensorFlow / LLM 接口 |
| 🧵 WebSocket | 实现实时聊天、通知推送                                |
| 🧪 自动化测试     | 用 `pytest` + `httpx` 编写接口测试                |
| 🌍 国际化支持     | 接入多语言支持（如 `gettext`）                       |


### 学习资料
- [学习 - FastAPI](https://fastapi.tiangolo.com/zh/learn/)
- FastAPI 官方文档（中文）： https://fastapi.tiangolo.com/zh/
- full-stack-fastapi-template： https://github.com/fastapi/full-stack-fastapi-template

## GO
介绍
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

### 使用
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



### go.mod
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


### go.sum
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





### 项目

资料：
https://github.com/search?q=assistant+language%3AGo&type=repositories

https://github.com/gptscript-ai/gptscript
https://github.com/GoogleCloudPlatform/kubectl-ai
https://github.com/zk-org/zk


### 学习资料
- [Golang 中文学习文档](https://golang.halfiisland.com/)： https://golang.halfiisland.com/guide.html
- 2022最新超详细的 Go 语言学习路线（建议收藏🔥） | Java程序员进阶之路x沉默王二，但我觉得沉默王二八股做的就一般，但是吧，网上成体系的资料好像也不多： https://three-musketeers.gitcode.host/tobebetterjavaer/xuexiluxian/go/

## HuggingFace
在环境变量中添加键：`HF_HOME`和值：`D:\huggingface`，即可更改缓存位置



## 大模型应用
### LMA（Large Multimodal Agent，大规模多模态智能体）
**多模态智能体**
(Large Multimodal Agents, LMAs)

- **定义**：基于多模态大模型（LMM, e.g. GPT-4o, Gemini, Claude 3 Opus）的 Agent，能处理文本、图像、语音、视频等多种模态输入输出。
    
- **特点**：
    - 输入和输出不限于文本。
    - 融合感知与推理：既能“看图”又能“写答案”，还能“听音频”。
    - 通常带有工具调用、RAG 等增强功能。
- **例子**：
    - OpenAI GPT-4o 助手：拍照后能解释数学题。
    - 医疗多模态 Agent：结合 CT 影像和病历文本辅助诊断。
    - 多模态客服机器人：用户上传合同截图+语音提问，Agent 给出法律解释。

👉 **LMA = Agent 的进阶版，依赖大规模多模态模型作为核心大脑**。


赋予单一AI实体处理文本、图像、音频、视频等多元数据模态的能力。


- 图像 + 文本：结合 CLIP、MiniGPT4 实现图文问答、图像标注助手
    
- 结构化数据问答：CSV、Excel、SQL database QA 系统（LangChain + DuckDB / PandasAgent）
    
- 音频、视频摘要 / QA 系统（Whisper + RAG）


## 000杂乱待了解的知识点
模型蒸馏
迁移学习
DevOps实践
知识加工
语料生成
Prompt工程优化
LLM模型微调
模型效果评测
API 设计基本原则
PEFT
pretrainpost-pretrain 
Prompt优化技巧
data first 的意识价值交付
Prompt Engineering、RAG、Function Calling/Tool Binding，具备复杂 Agent（如任务规划、工具调用、记忆与学习机制）的设计、开发与调优经验。
Multi-Agent 协作框架、Autonomous Agent）的设计、开发、调试和评估
LLM 微调（Fine-tuning）、量化、部署和推理优化，熟悉相关工具和框架。
有LangFlow、Flowise、Dify等AI Agent构建平台使用


### Agent（智能体）
**定义**：在 AI 语境中，Agent 指能感知环境、做出决策并执行行动的自主系统。
**特点**：
- 有目标（goal-directed）。
- 有感知输入（环境、用户交互、数据流）。
- 有动作输出（调用 API、生成文本、执行任务）。
**例子**：ChatGPT 加上插件和执行工具后就成了一个 AI Agent；金融风控里的自动审批 Agent；游戏里的 NPC Agent。


类型：`ReActAgent`, `OpenAIFunctionsAgent`, `ChatAgent`, `ToolCallingAgent`

智能体框架：
- LangChain Agent
- AutoGen
- CrewAI
- MetaGPT / OpenDevin（代码代理）
- ChatDev（多人角色协作）


🟢初级：文档问答、搜索引擎工具调用、Python计算
🟡中级：结构化输出、带记忆对话、多模型调度
🔴高级：自主规划Agent、多任务长链路、多状态LangGraph工作流


🔄可恢复工作流：使用checkpoint保存历史状态，断点恢复
🧬多轮上下文记忆结合：Retrieval使用`ContextualCompressionRetriever`
🧭Agentwithplanning：`plan_and_execute`调用分步执行
📤文件上传与分析：FastAPI接口+`Tool`分析文件结构
🕸WebSocket实时反馈：用于任务进度追踪/消息推送
🧪单元测试与链测试：使用LangChain`TestingUtilities`


使用 `Runnable` 管道整合多个链

## MAS多智能体系统
（Multi-Agent System，多智能体系统）
多智能体系统(Multi-agent Systems, MAS)
通过多个独立智能体的协作实现复杂目标。
分而治之

- **定义**：多个 Agent 组成的系统，它们可以 **协作、竞争、分工** 来完成更复杂的任务。
- **特点**：
    - Agent 间有通信协议。
    - 可以是同质的（相似能力）或异质的（不同能力）。
    - 适合解决单 Agent 难以应对的复杂问题。
- **例子**：
    - 智能电网调度（发电/负载/交易 Agent 协同）。
    - AI 论文里常见的“多 Agent 协作写代码”实验。
    - 游戏仿真中的多角色 AI。

👉 **MAS = Agent 的群体化/组织化形态**。


**层级架构**

## Copilot
（副驾驶/助手式 AI）
（代码、文档、决策等领域）
- **定义**：侧重“人机协作”，不是完全自主，而是 **辅助人类决策/操作** 的 Agent。
- **特点**：
    - 强调“增强人类生产力”，而非完全取代。
    - 用户处于决策环节的闭环中，AI 给建议或草稿，人类最终决定。
- **例子**：GitHub Copilot（写代码建议）；Microsoft 365 Copilot（在 Word/Excel 里自动生成或修改内容）。

👉 可以理解为：**Copilot = Agent 的一个应用形态，但更强调“辅助”而非“自主”**。


## langchain

用户可向机器人提问，机器人具备以下能力：
- 记住对话上下文（Memory）
- 检索资料库内容（Vector Store + RAG）
- 执行 Python 运算、搜索、问天气（Agent + Tool）
- 多轮交互，回复清晰、自然

技术栈：
- PromptTemplate（提示模板）
- LLMChain（语言模型链）
- Memory（对话记忆）
- Agent（智能体）
- Tools（工具调用）
- Vector Store + RAG（检索增强）
- Streaming、Callback（可选）
- Web 前端（FastAPI + LangServe 或 Gradio）

|模块|技术|
|---|---|
|LLM|OpenAI ChatGPT (gpt-3.5/4)|
|Prompt|PromptTemplate|
|Memory|ConversationBufferMemory|
|Chain|ConversationalRetrievalChain + AgentExecutor|
|Tool|SerpAPI、Python REPL、自定义函数|
|Vector Store|FAISS + OpenAI Embedding|
|Web|FastAPI + LangServe (推荐) 或 Gradio (快速搭建)|

## RAG
RAG（Retrieval-Augmented Generation，检索增强生成）框架，支持 `ConversationalRetrievalChain`、`RetrievalQA`，基于检索增强的问答系统（ChatPDF、企业知识问答等）：模块组合：`retriever + prompt + LLM + memory`， [Build a Retrieval Augmented Generation (RAG) App: Part 1 | 🦜️🔗 LangChain](https://python.langchain.com/docs/tutorials/rag/#overview)
**定义**：一种 AI 技术范式，将 **外部知识库检索** 与 **大模型生成** 结合。
- **工作流程**：
    1. 用户提问 → 检索引擎找相关文档片段。
    2. 把文档上下文拼接到 prompt。
    3. 大模型基于这些上下文生成回答。
- **意义**：
    - 解决模型“幻觉”问题。
    - 保持答案的实时性与专业性。
- **例子**：法律问答系统、企业知识库问答、论文搜索助手。

👉 RAG 是 **底层技术方法**，可以为 Agent 或 Copilot 提供“知识补充剂”。

官方提供的使用langchain构建rag应用的教程： https://python.langchain.com/docs/tutorials/rag/#overview

介绍典型的问答架构
重点介绍一些更高级的问答技术资源
还将了解 LangSmith 如何帮助我们追踪和理解我们的应用程序，随着应用程序的复杂程度不断提高，LangSmith 的帮助将越来越大。
如果您已经熟悉基本检索，您可能还会对[不同检索技术的高级概述](https://python.langchain.com/docs/concepts/retrieval/)感兴趣。

重点介绍非结构化数据的问答。如果您对结构化数据的 RAG 感兴趣，请查看我们[关于 SQL 数据问答的](https://python.langchain.com/docs/tutorials/sql_qa/)教程。

在本指南中，我们将构建一个应用程序来回答有关网站内容的问题。我们将使用Lilian Weng 撰写的[LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)博客文章，该网站允许我们针对文章内容提出问题。

创建一个简单的索引管道和 RAG 链

- 开源工具链：**LLM inference**：vLLM、TGI、LMDeploy、FastChat

**两个主要组件**：
- **索引**：从数据源提取数据并进行索引的管道。_这通常发生在线下。_
- **检索和生成**：实际的 RAG 链，它在运行时接受用户查询并从索引中检索相关数据，然后将其传递给模型。

**主要流程**：
1. **加载**：首先我们需要加载数据。这可以通过[文档加载器](https://python.langchain.com/docs/concepts/document_loaders/)完成。
2. **拆分**：[文本拆分器](https://python.langchain.com/docs/concepts/text_splitters/)将大块数据拆分`Documents`成更小的块。这对于索引数据和将数据传入模型都非常有用，因为大块数据更难搜索，而且无法容纳在模型有限的上下文窗口中。
3. **存储**：我们需要一个地方来存储和索引我们的分割数据，以便日后进行搜索。这通常使用[VectorStore](https://python.langchain.com/docs/concepts/vectorstores/)和[Embeddings](https://python.langchain.com/docs/concepts/embedding_models/)模型来实现。
4. **检索**：给定用户输入，使用[检索器](https://python.langchain.com/docs/concepts/retrievers/)从存储中检索相关分割。
5. **生成**：[ChatModel](https://python.langchain.com/docs/concepts/chat_models/) / [LLM](https://python.langchain.com/docs/concepts/text_llms/)使用包含问题和检索到的数据的提示生成答案


![](https://python.langchain.com/assets/images/rag_indexing-8160f90a90a33253d0154659cf7d453f.png)
![](https://python.langchain.com/assets/images/rag_retrieval_generation-1046a4668d6bb08786ef73c56d4f228a.png)

## 大模型训练

### SFT

### RLHF
### DPO

### 数据搜集
这个视频开头说了很多数据搜集途径：【如何把领域文献批量转换为可供模型微调的数据集？】 https://www.bilibili.com/video/BV1y8QpYGE57/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## **数据加载**
（Document Loaders）



## **数据切分**
（Text Splitters）

 从 PDF、TXT、Word、网页、Notion、GitHub、数据库中加载文档，构建用于 RAG 的知识库文档输入：`RecursiveCharacterTextSplitter`, `MarkdownTextSplitter`, `ChineseTextSplitter`

## 大模型调用

from langchain_openai import ChatOpenAI
from langchain.chat_models import init_chat_model

| 特征   | `ChatOpenAI`（直接类）  | `init_chat_model`（封装函数）                     |
| ---- | ------------------ | ------------------------------------------- |
| 来源   | `langchain_openai` | `langchain.chat_models`（LangChain官方统一接口）    |
| 模型适配 | 仅适用于 OpenAI 系列模型   | 支持多个提供商：OpenAI、Anthropic、Qwen、HuggingFace 等 |
| 配置方式 | 直接构造类，需显式传参        | 封装了 provider 和模型适配，自动映射配置                   |
| 灵活性  | 灵活但不通用（只能 OpenAI）  | 通用性强，可用于构建多模型统一接口                           |
| 推荐程度 | 适合快速使用 OpenAI      | 适合构建可切换后端的项目（强烈推荐）                          |



## **embedding模型**
将文档向量化：OpenAI、BGE、text2vec、Cohere、Qianfan 等
向量检索瓶颈：在 RAG 中，embedding 决定了“相似性”的定义方式，是检索效果的核心



## **向量数据库**
存储向量化后的数据
用于相似度检索、知识增强问答（RAG）：FAISS、Chroma、Milvus、Weaviate、Qdrant、PGVector、Pinecone
[FAISS — 🦜🔗 LangChain documentation](https://python.langchain.com/api_reference/community/vectorstores/langchain_community.vectorstores.faiss.FAISS.html)
  * 向量存储（FAISS / Chroma / Weaviate）

开源向量数据库比较：Chroma, Milvus, Faiss,Weaviate https://cloud.tencent.com/developer/article/2412486
## **Retriever检索器**
叠加 rerank、压缩、Filter 条件等，作为 RAG 查询器，为语言模型提供上下文支持：`VectorstoreRetriever`, `MultiQueryRetriever`, `ContextualCompressionRetriever`, `SelfQueryRetriever`
[How to use a vectorstore as a retriever | 🦜️🔗 LangChain](https://python.langchain.com/docs/how_to/vectorstore_retriever/)
  * `RetrievalQA` / 自定义检索逻辑
使用 FAISS 或 Qdrant 进行嵌入式检索；结合 LangChain `Retriever`




## **各种模型的LLM接口**
OpenAI、Anthropic、Azure、Cohere、Qwen 等
[ChatHuggingFace — 🦜🔗 LangChain documentation](https://python.langchain.com/api_reference/huggingface/chat_models/langchain_huggingface.chat_models.huggingface.ChatHuggingFace.html#langchain_huggingface.chat_models.huggingface.ChatHuggingFace)
[langchain-huggingface: 0.3.0 — 🦜🔗 LangChain documentation](https://python.langchain.com/api_reference/huggingface/index.html)

 

## 各种控制台
[阿波罗API](http://api.ablai.top/)
[SiliconCloud](https://cloud.siliconflow.cn/sft-dc8ixac46v/models)
[API keys - OpenAI API](https://platform.openai.com/api-keys)
[Models - Hugging Face](https://huggingface.co/models)
[Dashboard - SerpApi - 搜索服务](https://serpapi.com/dashboard)
[LangSmith控制台 - Tracing Projects](https://smith.langchain.com/o/bb18f3b3-479a-40e1-b6ee-77b3d590fdc0/projects/p/417f4341-96da-4946-8b78-f8e02d587be8?timeModel=%7B%22duration%22%3A%227d%22%7D)

[账单明细 - Hugging Face – The AI community building the future.](https://huggingface.co/settings/billing)

易API： https://api.apiyi.com/token
ChatAi API： https://www.chataiapi.com/panel



## **OutputParsers输出解析器**
 将大模型输出转为结构化数据（JSON、Dict、Pydantic 模型），确保输出可被代码后续逻辑处理、函数调用：`PydanticOutputParser`, `StructuredOutputParser`, `RegexParser`
  * `PydanticOutputParser`
`StructuredTool`



## **Prompt模板系统**
`PromptTemplate`, `ChatPromptTemplate`, `FewShotPromptTemplate`
  * `ChatPromptTemplate` 构造输入
  * 模型结构化输出（如 sentiment、QA 分类等）
  * 多字段表单 / JSON 生成




## **链机制（Chain）**

，多个模块顺序组合，自动传参：`LLMChain`、`SequentialChain`、`SimpleSequentialChain`





## **调用工具**（Tool）
构建具备“调用外部工具能力”的大模型智能体（像 GPT-4 里的插件能力），工具类型有 搜索、代码执行、数据库、计算器、自定义 API 调用等：`@tool` 装饰器定义可调用函数
  * Tool 调用链条（action, observation）
  * 自定义工具（search, math, code interpreter, file IO）
注入搜索、Python REPL 等工具



## **Memory记忆系统**
多轮对话上下文保持，用户记忆建模：类型： 
`ConversationBufferMemory`：简单记忆上下文、
`ConversationTokenBufferMemory`：按 token 长度控制、
`ConversationSummaryMemory`：自动总结历史对话
  * `ConversationBufferMemory` / `SummaryMemory`
  * `langchain.memory.chat_message_histories` 结合数据库持久化

## **多阶段检索策略**
dense + sparse 混合检索、embedding rerank、hybrid retriever

## **RAG rerank 优化**
cross-encoder 重排序（如 BGE-reranker）、self-rerank、答案验证（verifier model）




## **多文档融合技术**
段落拼接 vs summary、答案对齐机制（如 RAG-fusion、FiD）


## LangChain4j

## 模型生态

- OpenAI API 家族、Anthropic、Mistral、Claude
- 国内模型如 Qwen、Baichuan、Zhipu、Deepseek



## **模型训练**


- 手把手教你使用服务器训练AI模型_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1TuxLeVED6/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63
- 如何训练你自己的o1模型？TPO？？_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV17WyyY3EsE/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63
- 3小时从0训练一个仅有27M的多模态GPT，个人显卡即可推理/训练！_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1Sh1vYBEzY/?spm_id_from=333.788.recommend_more_video.3&vd_source=2bebef67d77d9a55c602507243628b63
- 从0训练一个GPT小模型 Retriever-0.1B_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1Fe411m7oa/?spm_id_from=333.788.recommend_more_video.7&vd_source=2bebef67d77d9a55c602507243628b63


- 掌握使用开源模型（如 Qwen, Mistral, Yi）做微调
- 数据构造（instruction tuning, SFT）
- 轻量调参：LoRA、QLoRA、Delta tuning
- 工具：`transformers` + `peft` + `trl`
- 结合 RAG+LoRA 做 hybrid 系统（base 知识 + personalized fine-tune）


## 数据
**数据标注与评估**：Label Studio、OpenCompass、Ragas、GaiaEval
数据集构建：easy-dataset： https://github.com/ConardLi/easy-dataset

## **多智能体协作**
- 构建复杂智能体协作系统（例如规划-Agent、执行-Agent、记忆-Agent）
- 学习 LangGraph 或 Autogen 实现自动化工作流和决策树式智能体
- 引入任务计划、状态切换、失败恢复机制

## **性能调优**
- 异步处理、队列调度（Celery, FastAPI + asyncio）


## **大规模部署**
- 向量数据库服务化（如 Qdrant 服务端、pgvector + pg_bouncer）
- 多租户系统 / 用户隔离 / 权限控制
- 缓存与 streaming 优化（Redis、WebSocket、多轮响应）
    



## LangChain
**常用模块**
官方内核：`langchain_core`
社区插件：`langchain_community`

## LangGraph


**LangGraph**（原 LangChain Expression Language）：构建可视化 Agent 工作流图（多 Agent 调度），支持状态转移、回环、条件执行等逻辑，构建复杂多阶段智能体或流程自动化系统
使用 `StateGraph` 构建流程图；涵盖条件跳转、并行路径


使用 LangGraph，我们需要定义三件事：
1. 我们的应用程序的状态；[应用程序的状态](https://langchain-ai.github.io/langgraph/concepts/low_level/#state)控制着哪些数据被输入到应用程序中、在步骤之间传输以及由应用程序输出。它通常是`TypedDict`，但也可以是[Pydantic BaseModel](https://langchain-ai.github.io/langgraph/how-tos/state-model/)。
2. 我们的应用的节点（即应用步骤）；我们从两个步骤的简单序列开始：检索和生成。我们的检索步骤只是使用输入问题运行相似性搜索，而生成步骤将检索到的上下文和原始问题格式化为聊天模型的提示。
3. 我们的应用程序的“控制流”（例如，步骤的顺序）。  最后，我们将应用程序编译成一个`graph`对象。在这种情况下，我们只是将检索和生成步骤连接成一个序列。

LangGraph 还附带内置实用程序，用于可视化应用程序的控制流：

* 状态跟踪：问题 → 检索 → 回答
* 回答失败时进入反思节点（Self-Reflection）

* 工具调用失败 → fallback tool / 用户确认
* 分支决策节点（基于意图分流）


* 输出异常时 → 自动回退重新调用
* 结果验证器节点（对输出字段校验）
* 每轮对话结果写入记忆状态
* 查询历史回答节点


多模型调度
  * 按任务或预算分派不同模型（OpenAI, Qwen, Claude）
  * `RunnableLambda` + `RouterRunnable` 实现模型选择
  * 条件路由节点（语言、成本、模型性能等）


| 🚨 异常处理 | LangGraph `error` 事件处理器 |
| ------- | ----------------------- |



## langSmith
[Get started with LangSmith | 🦜️🛠️ LangSmith](https://docs.smith.langchain.com/)

* ✅ 应用：
* 每个主要模块链进行追踪
* 对失败节点重试、优化 prompt


  * `@traceable`
  * `wrap_openai`, `wrap_chat_model`, `wrap_tool`
  * 自定义 `tracer = LangChainTracer()` 进行链路可视化

## SpringAI

- 1小时完成一个AI项目实战.SpringAI+AIGC落地实战_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1C5UxYuEc2/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63
- 全新SpringBoot+SpringAI+Vue3大模型全栈开发_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV14y411q7RN/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63

- 项目介绍 | 起凡Code闲聊： https://www.jarcheng.top/blog/project/spring-ai/intro.html




## 教程资料



- 黑马程序员DeepSeek+Cursor+Devbox+Sealos带你零代码搞定实战项目开发部署视频教程，基于AI完成项目的设计、开发、测试、联调、部署全流程_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1ig9jYUERk/?vd_source=2bebef67d77d9a55c602507243628b63
- AI大模型全套教程（LLM+RAG+Langchain+国产大模型ChatGLM-4+NLP新模型Transformer）-马士兵_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1g1CKYUExu/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63

- 零基础入门：AI大模型应用开发_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1JZ421u7Xo/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63




## 其它

### ReAct思维逻辑

- **先思考：** 这个问题能直接回答吗？
- **若不能回答：** 调用某个工具函数（如搜索、数据库、计算器）
- **观察返回值：** 接收工具输出，继续下一轮 Reason    
- **最后生成答案**

```text
Question: What is the weather in Beijing?

Thought: I need to look up the current weather in Beijing.
Action: get_weather[Beijing]

Observation: It's always sunny in Beijing!

Thought: I now know the weather.
Answer: It's always sunny in Beijing!
```


## END
