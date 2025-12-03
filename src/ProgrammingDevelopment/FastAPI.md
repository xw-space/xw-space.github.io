---
icon: pen-to-square
date: 2025-10-01
oeder: 0
category:
  - 计科基础
  - FastAPI
tags:
  - default
---
一个简单的FastAPI入门教程
<!-- more -->

# FastAPI
## 简介

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








## 使用
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


## 学习资料
- [学习 - FastAPI](https://fastapi.tiangolo.com/zh/learn/)
- FastAPI 官方文档（中文）： https://fastapi.tiangolo.com/zh/
- full-stack-fastapi-template： https://github.com/fastapi/full-stack-fastapi-template

## END