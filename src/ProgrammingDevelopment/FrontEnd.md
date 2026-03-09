---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---

一个简单的前端入门教程

<!-- more -->

# FrontEnd
## 技术介绍
工作需要的技术
HTML、CSS、JavaScript、TypeScript、AJAX、JSON、Bootstrap
Node.js、Vue、ElementUl、React、React Native、AntDesign
WebUI开发、前端自动化构建工具


TCP/IP/UDP、WebSocket、Http协议、浏览器原理，处理浏览器兼容问题
Maven，git/SVN、NPM、Webpack、Babel、Node.js（包括express、koa等）
MVC/MVP/MVVM等设计模式、UI/UE设计

**前端服务没有输出**：前端服务只是一个静态文件服务器，它不会像后端那样在命令行里输出日志，也不会告诉你“某个按钮为什么没反应”。前端的问题（比如点击没反应、样式错乱、JS 报错），都要在 **浏览器的开发者工具**里排查。

## 工具
### HBuilder

### **前端服务**



**为什么需要要启动前端服务**
前端就是一堆 `HTML + CSS + JS` 文件，理论上双击 `index.html` 用浏览器也能打开。但是在实际开发和运行中，为什么还要用 `python -m http.server 3000` 启动一个服务呢：

使用浏览器打开前端文件就只是预览下文件内容，浏览器会用 `file://` 协议打开文件。前端代码里的 **AJAX / Fetch 请求** 往往会被浏览器拦截，因为浏览器要求“同源”（协议、域名、端口都一致）才能访问后端 API。`file://` 协议没有端口和域名，会导致跨域问题。结果前端页面可能能显示，但一旦调用后端 API（比如 `http://localhost:8080/api/...`），就会报错。

前端服务则是一个服务器，运行前端服务则是将前端服务运行在了服务器上，浏览器打开前端文件不再是使用file://协议打开文件，而是像服务器请求数据，像真实的使用场景，则那些api请求数据功能也能照常使用了。启动一个本地 Web 服务后，前端变成 `http://localhost:3000`，就有了正常的协议+域名+端口，可以和后端服务交互，避免跨域问题（或更容易配置跨域）。




**有哪些前端服务**
- **Python 内置**：`python -m http.server 3000`
- **Node.js**：`npx http-server -p 3000`
- **Live Server**（Go Live，VS Code 插件）：插件名字通常就是 **Live Server**，右下角有 **“Go Live”** 按钮。默认端口一般是 `5500`。支持 **热重载（Hot Reload）**，你保存文件后浏览器会自动刷新。非常适合前端开发时调试。
- **Node.js前端开发框架自带服务**：如果你用 Vue / React / Angular 这些框架，都会有自己的开发服务器：Vue CLI → `npm run serve`（默认端口 8080）、React → `npm start`（默认端口 3000）、Angular → `ng serve`（默认端口 4200）。这些服务除了一般静态服务，还支持模块打包、代码热更新、代理转发等。：
- **专业 Web 服务器**：上线时不会用这些小工具，而是用**Nginx**、**Apache** 等这些专业工具，适合部署到生产环境。



**前端服务的选择**：
- 如果只是自己跑跑 Demo，**随便用哪种都行**
- 如果想开发时更方便（比如保存自动刷新），那就用 **Go Live**。
- 如果模拟真实生产环境，用Nginx/Apache




**Live Server/Go Live**

Live Server是vscode插件名
Go Live是功能名字，按钮在vscode右下角
用vscode打开项目文件，右下角点击 "Go Live"，这会在本地启动一个服务器（默认端口 5500）。浏览器会自动打开 `http://127.0.0.1:5500/index.html`。


### Vite-构建工具

- **Vite** 是一个现代的前端构建工具，它同样会启动一个本地开发服务器。你可以通过以下命令来启动它：

## HTML
### 示例
```html
<!DOCTYPE html> <!-- 声明为 HTML5 文档 -->
<html> <!-- 声明为 HTML5 文档 -->
<head> <!--  元素包含了文档的元（meta）数据 -->
<meta charset="utf-8"> <!-- 定义网页编码格式为utf-8 -->
<title>菜鸟教程(runoob.com)</title><!-- 元素描述了文档的标题 -->
</head>
<body><!-- 元素包含了可见的页面内容 -->
<h1>我的第一个标题</h1> <!-- 元素定义一个大标题 -->
<p>我的第一个段落。</p> <!-- 元素定义一个段落 -->
</body>
</html> 
```
HTML文件的扩展名可以是“.html”或“.htm”，这是两种常见的命名约定。“.html”扩展名使用长文件名格式，而“.htm”扩展名是为了与过去的DOS命名格式兼容而存在的。从使用效果上来说，无论是“.html”还是“.htm”扩展名，浏览器都可以正常解析和显示HTML文件，它们没有实质上的区别。

### 提交表单
提交表单
form标签包裹要提交的数据的标签
- 提交方式：`method="get/POST"`
- 提交的地址：`action="/xxx/xxx/xx"`
- 在form标签里面必须有一个submit标签。
- 在form里面的一些标签：input/select/textarea，一定要写name属性 `<input type="text" name="uu"/>`

例：
```html

<body>
<h1>用户注册</h1>
<form method="post" action="/register">
    <div>
        用户名：<input type="text" name="user"/>
    </div>
    <div>
        密码：<input type="password" name="pwd"/>
    </div>
    <div>
        性别：
        <input type="radio" name="gender" value="1">男
        <input type="radio" name="gender" value="2">女
    </div>
    <div>
        爱好：
        <input type="checkbox" name="hobby" value="10">篮球
        <input type="checkbox" name="hobby" value="20">足球
    </div>
    <div>
        城市：
        <select name="city">
            <option value="bj">北京</option>
            <option value="sh">上海</option>
        </select>
    </div>
    <div>
        擅长领域：
        <select name="skill" multiple>
            <option value="100">吃饭</option>
            <option value="101">睡觉</option>
        </select>
    </div>
    <div>
        备注：<textarea name="more"></textarea>
    </div>
    <input type="submit" value="submit按钮">
</form>
</body>

```



### 标签与元素
标签是由“<”开始、由“>”结束的，并且标签名不区分大小写。标签可以分为双标签和单标签（也叫自结束标签）。
(1)根标签有且只能有一个。(2)无论是双标签还是单标签都应该正确关闭。(3)标签可以嵌套但不能交叉嵌套。(4)注释不能嵌套。(5)一般情况下，属性必须有值，值必须加引号，单引号或双引号均可。(6)标签名不区分大小写，但建议使用小写。
标签分为块级标签和行内标签，块级标签一个人占一整行，行内标签自己多大占多少
标签可以嵌套使用
(1)双标签的属性应写在开始标签内部，并用空格分隔。如果有多个属性，它们之间也应用空格分
(2)在书写属性值时，可以使用单引号或双引号将值包裹起来，也可以不使用引号。然而，建议在书写属性值时加上引号，并使用双引号来包裹值。这样可以增强代码的可读性和一致性。
```
不是为了显示内容，只是实现某种功能的标签，如换行、分割线，以及布局标签。● <br>标签：可以在文本中生成一个换行。该标签是一个单标签，不需要包含其他的文本内容。● <hr>标签：可以在文本中生成一条分割线。和<br>标签一样，该标签是一个单标签，不需要包含其他的文本内容。● <span> 标签：没有具体的展示效果，只是用来页面局部布局。<span>标签可以和<span>标签共享一行，做水平布局。● <div>标签：没有具体的展示效果，只是用来做页面局部布局。<div>标签独占一行，不会和其他标签共享一行，做垂直布局。
```

head
```html
<head>
    <meta charset="UTF-8">
    <title>我的联通</title>
</head>
```
![[Pasted image 20240312205513.png]]

<meta>
标签是一个单标签，可以用来在 HTML 文件中模拟 HTTP 的响应头报文。该标签包含一个charset属性，可以设置文件的字符编码。注意，乱码的根本原因是编码和解码使用的编码方式不一致，因此保证编码和解码格式一致是避免乱码产生的重要前提。
编码：`<meta charset="UTF-8">`

a
超链接，行内标签
跳转到其他网站

`<a>`标签中的target属性指定跳转目标在哪里打开。它有两个属性值，分别是_self和_blank。具体如下。●_self值：表示在当前页面加载，该值为默认项。●_blank值：表示在新窗口打开。

```html
<a href="http://www.chinaunicom.com.cn/about/about.html">点击跳转</a>
```

跳转到自己网站其他的地址

```html
<a href="http://127.0.0.1:5000/get/news">点击跳转</a>
<a href="/get/news">点击跳转</a>
```
当前页面打开
```
<a href="/get/news">点击跳转</a>
```
新的Tab页面打开
```
<a href="/get/news" target="_blank">点击跳转</a>
```

锚点
锚点是指在 URL 地址中出现的片段标识符，也称为页面内链接。如果所请求的目标是一个大目标，那么可以使用`<a>`链接来将页面划分成大目标的一个一个小目标，之后在地址栏中输入这个小目标的标识之后跳转到小目标的位置。

`<a>`标签的id属性可以在页面中划分一个一个小目标，其属性的值可以是自定义的字母、数字，但是尽量不要使用数字开头来创建test_anchors.html
在上面代码的基础上，直接在浏览器地址栏的地址后面加上“＃test1”或“＃test2”将跳转至其对应的页面标记的小目标位置。


`h`

标题标签
标题，块级标签
h1 的级别最高，h6 的级别最低，重要程度依次递减，而且标题标签是独占一行的
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>我的联通</title>
</head>
<body>
    <h1>1级标题</h1>
    <h2>2级标题</h2>
    <h3>3级标题</h3>
    <h4>4级标题</h4>
    <h5>5级标题</h5>
    <h6>6级标题</h6>
</body>
</html>
```

段落标签,`<p>`标签，用来标识一个段落，该标签的表现形式会在段落上、下加入空白，也就是段落之间自动换行！
`<hr>`标签，用来表示段落级别的主题转换，它表现为一条水平线。值得一提的是，`<hr>`标签是一个单标签。


`div`
块级标签

```html
<body>
    <div>山东蓝翔</div>
    <div>挖掘机哪家强</div>
</body>
```


`img`
图片，行内标签
src属性，用来指定要嵌入的图片的URL地址，地址可以是绝对路径也可以是相对路径。

最普通：
```html
<img src="图片地址" />
```
直接显示别人的图片地址（防盗链）：
```html
<img src="https://pic4.zhimg.com/v2-b23f984c2aeaa7bed12e890b4338d499_720w.jpg" />
```
显示自己的图片(自己项目中创建：static目录，图片要放在static)：
```html
<img src="自己图片的地址" />
例：<img src="/static/wbq.png" />
```
设置图片的高度和宽度
```html
<img src="图片地址" style="height:100px; width:200px;" />
<img src="图片地址" style="height:10%; width:20%;" />
```

alt属性，用来指定<img>标签的备用内容，这个内容会在图像无法显示时出现。
结合`<a>`标签，创建一个可以单击的图像链接


`span`
块级标签、内联标签，行内标签
```html
<body>
    <span>山东蓝翔</span>
    <span>挖掘机哪家强</span>
</body>
```


`input`

```html
<input type="text" />
<input type="password">    
<input type="file"> 

<input type="radio" name="n1">男
<input type="radio" name="n1">女

<input type="checkbox">篮球
<input type="checkbox">足球
<input type="checkbox">乒乓球
<input type="checkbox">棒球

<input type="button" value="提交">  -->普通的按钮
<input type="submit" value="提交">  -->提交表单
```


列表

`<ol>`标签来编写一个带有编号的列表。需要注意的是，`<ol>`标签只是定义了一个有序列表，列表中的每项内容需要使用`<li>`标签来表示

无序列表
```html
<ul>
    <li>中国移动</li>
    <li>中国联通</li>
    <li>中国电信</li>
</ul>
```
![[Pasted image 20240312212719.png]]

无序列表的type 属性有4 种取值，分别是disc（实心圆）、circle（空心圆）、square（实心正方形）、none（取消前缀）。其默认值为disc


有序列表
```html
<ol>
    <li>中国移动</li>
    <li>中国联通</li>
    <li>中国电信</li>
</ol>
```
![[Pasted image 20240312212727.png]]

有序列表的type属性用于设置列表的编号类型，取值有5种，分别是1（数字）、i（小写罗马字母）、I（大写罗马字母）、a（小写字母）、A（大写字母）。其默认值为1，有序列表的编号按照选择的不同类型依次顺延
```

如果需要定义列表包含着一系列标题或者说明的组合，还可以使用自定义列表来实现。自定义列表需要使用三个标签，分别是<dl>标签、<dt>标签和<dd>标签，具体如下。● <dl>标签：用来定义一个自定义列表。● <dt>标签：用来定义自定义列表中的标题。● <dd>标签：用来定义自定义列表中的说明。
<dl>标签相当于有序列表的<ol>标签，用来定义列表；<dt>标签用来定义标题“苹果”；<dd>标签用来定义说明“蔷薇科苹果属植物”和“苹果的功效：益胃……
每个自定义列表中可以有一个或多个<dt>标签，以及一个或多个<dd>标签


```



表格

```html
<table>
    <thead>
    	<tr>  <th>ID</th>  <th>姓名</th>   <th>年龄</th>  </tr>
    </thead>
    <tbody>
    	<tr>  <td>10</td>  <td>武沛齐</td>  <td>19</td>   </tr>
        <tr>  <td>11</td>  <td>吴阳军</td>  <td>19</td>   </tr>
        <tr>  <td>12</td>  <td>刘东</td>  <td>19</td>    </tr>
        <tr>  <td>13</td>  <td>郭智</td>  <td>19</td>    </tr>
        <tr>  <td>14</td>  <td>电摩</td>  <td>19</td>    </tr>
    </tbody>
</table>
```
![[Pasted image 20240312212701.png]]
```html
HTML 提供了<table>标签来声明一个表格，而<table>标签内可以包含表格标题、表格表头、表格主体和表格脚注，分别对应如下标签。● <caption>标签：用来展示一个表格的标题，通常作为<table>标签的第一个子元素。● <thead>标签：用来定义一组带有表格标题的行（可选）。● <tbody>标签：用来定义一组表格主体内容的行（可选）。● <tfoot>标签：用来定义一组表格脚注内容的行（可选）。在通常情况下，表格表头、表格主体、表格脚注的内部都有一行一行的数据，在HTML中使用<tr>标签来定义表格中的行。另外，HTML还提供了<th>标签来定义每一行表头数据中的单元格、<td>标签来定义每一行表格主体，以及表格脚注中的单元格。
border属性，如果设置其值为0，意味着没有边框；如果将其值设置为1，表示设置了1px大小的边框。其实在HTML5中不建议使用该属性，因为这属于样式的修饰。一般使用CSS来修饰边框
大多数程序员使用 HTML 编写表格时，不太习惯使用<thead>、<tbody>和<tfoot>标签，而是会将它们省略
<th>标签和<td>标签中都支持colspan和rowspan属性。colspan的英文原意是跨列、合并列，顾名思义在HTML中用来规定单元格可以横跨的列数；rowspan的英文原意是行距、合并行，同样在HTML中用来规定单元格可以竖跨的行数。
```



表单

```
网页中通常使用表单提交数据，需要从客户端发起请求至服务器端，然后服务器端给出响应。下面，我们对创建表单涉及的标签进行简单介绍。● <form>标签：用于创建一个表单。在<form>标签内，通常会放置一个或多个专门用于表单的标签，这些表单标签用于提供输入信息的不同方式，如文本框、单选、多选、下拉菜单等。● <input> 标签：用于创建一个文本框。<input>标签可以设置name属性给该标签命名；设置type属性用来定义<form>标签中输入数据的类型，包括4种属性值，分别是text（文本输入框）、password （密码框）、radio（单选框）和checkbox（复选框）；还可以设置value属性值，用来表示文本输入框中默认显示的内容。● <select>标签：用来实现下拉列表。该标签可以包含一个或多个<option>标签，用来表示下拉列表中的项。● <textarea>标签：用来表示文本域。文本域可以用来输入多行文本，输入的内容中允许换行。● <button>标签：用于创建一个提交按钮。

```
**表单标签的常用属性**：
```
<form>标签拥有两个常用属性，分别为action属性和method属性。● action属性：用来指定提交路径。● method属性：用来指定表单的请求方式，method的值可以为get或post。

<form>标签的method属性默认值为get。method的值除了get，还可以为post。当method的值为get时，数据将会以查询字符串方式提交；当method的值为post时，数据将会被打包在请求中。在实际使用中，为了安全起见，更建议在提交表单的时候使用post方式。
```

**表单项标签**：

表单中的每一项，包括文本框、密码框、单选框、多选框等，都称为表单项，一个表单中可以包含多个表单项。

其常用属性，如name属性和value属性，在各个具体的表单项标签中，我们通过name属性给数据起名字，通过value属性来保存要发送给服务器端的值。
```html
(1)单选框。<input>标签的type属性为radio表示单选框，name属性相同的radio为一组，组内互斥，即一组只能选择一个值。
(2)多选框。<input>标签的 type 属性为 checkbox 表示多选框，与单选框的区别在于，name 属性相同的 checkbox为一组，组内一次可以选择多个值。
(3)下拉框。下拉框用到了2种标签，其中，<select>标签用来定义下拉列表，<option>标签设置列表项。name 属性在<select>标签中设置。value 属性在<option>标签中设置。<option>标签的标签体是显示出来给用户看的，提交到服务器端的是value属性的值。通过在<option>标签中设置“selected="selected"”属性实现默认选中的效果。
(4)按钮。按钮分为普通按钮、重置按钮和提交按钮三种。普通按钮，表示单击后无效果，需要通过 JavaScript绑定单击响应函数。重置按钮，表示单击后将表单内的所有表单项都恢复为默认值。提交按钮，表示单击后提交表单。
(5)隐藏域。通过表单，隐藏域设置的表单项不会显示到页面上，用户看不到，但是提交表单时会一起被提交。一般，隐藏域用来设置一些需要和表单一起提交但是不希望用户看到的数据，如用户id
<input type="hidden" name="userId" value="2233"/>
6.多行文本
(7)文件上传。<input>标签的type属性为file表示文件上传


```


下拉框
```html
<select>
    <option>北京</option>
    <option>上海</option>
    <option>深圳</option>
</select>

<select multiple>
    <option>北京</option>
    <option>上海</option>
    <option>深圳</option>
</select>
```


行内文本标签

```
<b>标签或<strong>标签，表示将标记的文本显示为粗体
<i>标签，表示将标记的文本显示为斜体
<u>标签，表示将标记的文本显示为带下画线的文本，通常用来描述拼写错误等提示
<s>标签，表示将标记的文本显示为加删除线的文本，通常用来描述不存在、不相关的事物
```


多行文本
```html
<textarea name="desc"></textarea>
<textarea>标签没有value属性，如果要设置默认值，则其需要写在开始和结束标签之间。
```

实体
HTML对空格和回车的处理比较特殊。在HTML文件中，一个空格和多个空格都会被当作一个空格来处理，一个回车和多个回车也会被当作一个空格来处理。要在HTML中显示多个空格，则需要通过实体来实现。那什么是实体呢？在HTML中有些字符是系统预留下来的，如果想要使用这些预留下来的字符就要使用实体将它们表示出来。实体的格式是“＆”符号后接字母。下面以表格的形式列出一些常用的实体![[Pasted image 20240716092617.png]]


## CSS
### 介绍
用来美化标签的

### 示例
```html
<img src="..." style="height:100px" />
<div style="color:red;">中国联通</div>
```

### 使用
三种导入方式：
- 在标签上
```html
<img src="..." style="height:100px" />
<div style="color:red;">中国联通</div>
```
- 写在head的style中
```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .c1{
            color:red;
        }
    </style>
</head>
<body>
<h1 class='c1'>用户登录</h1>
</body>
```
- 写在文件中：css文件名名为sty.css，导入到html文件中
```css
/*sty.css*/
.c1{
    height:100px;
}
.c2{
    color:red;
}
```

```html
<!--html文件中相关内容-->
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="sty.css" />
</head>
<body>
<h1 class='c2'>用户登录</h1>
<h1 class='c2'>用户登录</h1>
</body>
```
## JavaScript

### localStorage
一个使用例子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>用户信息存储</title>
</head>
<body>
    <h1>输入用户名和ID</h1>
    <form id="userForm">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" required>
        <br><br>
        <label for="userID">ID:</label>
        <input type="text" id="userID" name="userID" required>
        <br><br>
        <button type="submit">确定</button>
    </form>
    <p id="message"></p>
    <script>
        document.getElementById('userForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const userID = document.getElementById('userID').value;
            // 获取现有数据
            let data = JSON.parse(localStorage.getItem('userData')) || [];
            // 添加新数据
            data.push({ username, userID });
            // 存储回 localStorage
            localStorage.setItem('userData', JSON.stringify(data));
            // 显示成功消息
            document.getElementById('message').textContent = '输入成功！';
            // 清空输入框
            document.getElementById('userForm').reset();
            // 读取并输出数据
            var value = localStorage.getItem('userData');
            console.log(value);
        });
    </script>
</body>
</html>
```
### File API
一个输入用户名和ID信息并存储进Json然后下载的例子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>用户信息存储</title>
</head>
<body>
    <h1>输入用户名和ID</h1>
    <form id="userForm">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" required>
        <br><br>
        <label for="userID">ID:</label>
        <input type="text" id="userID" name="userID" required>
        <br><br>
        <button type="submit">确定</button>
    </form>
    <p id="message"></p>

    <script>
        document.getElementById('userForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const userID = document.getElementById('userID').value;

            // 获取现有数据
            let data = JSON.parse(localStorage.getItem('userData')) || [];

            // 添加新数据
            data.push({ username, userID });

            // 转换为JSON字符串
            const jsonData = JSON.stringify(data, null, 2);

            // 创建下载链接
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'userData.json';
            a.click();
            URL.revokeObjectURL(url);

            // 存储回 localStorage
            localStorage.setItem('userData', jsonData);

            // 显示成功消息
            document.getElementById('message').textContent = '输入成功！';

            // 清空输入框
            document.getElementById('userForm').reset();
        });
    </script>
</body>
</html>
```

## 前端调用api
### **使用 `fetch` 调用 API**
**fetch` 是现代浏览器中原生支持的 JavaScript API，它用来发起 HTTP 请求并获取响应数据。通常它返回的是一个 Promise，你可以通过 `then` 或 `async/await` 来处理响应。
```javascript

// 使用 fetch 发起 GET 请求
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('网络错误');
    }
    return response.json(); // 将响应转换为 JSON 格式
  })
  .then(data => {
    console.log('获取的数据:', data);
  })
  .catch(error => {
    console.error('获取数据失败:', error);
  });
```

如果你更喜欢使用 `async/await`，可以像这样写：

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('网络错误');
    }
    const data = await response.json();
    console.log('获取的数据:', data);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

fetchData();

```


### 使用 `axios` 调用 API
`axios` 是一个流行的 JavaScript 库，它提供了更加简便和强大的 API 请求方法。与 `fetch` 相比，`axios` 在发送请求时自动处理 JSON 数据的转换，还支持更丰富的功能，如请求拦截器、取消请求等。


首先，你需要通过 npm 安装 `axios`：

```bash
npm install axios
```

示例代码（`axios`）：

```javascript

import axios from 'axios';

// 使用 axios 发起 GET 请求
axios.get('https://api.example.com/data')
  .then(response => {
    console.log('获取的数据:', response.data);
  })
  .catch(error => {
    console.error('获取数据失败:', error);
  });
```

如果你使用 `async/await`：
```javascript
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log('获取的数据:', response.data);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

fetchData();
```

### **传递参数到 API**

有时候你需要向 API 传递参数（例如查询字符串、请求体数据等）。这里我们分别展示如何在 `fetch` 和 `axios` 中传递参数。

`fetch` 示例：

对于 GET 请求，可以通过 URL 查询参数传递参数：
```javascript
fetch('https://api.example.com/data?search=query')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('请求失败:', error));
```

对于 POST 请求，通常需要在请求体中发送 JSON 数据：
```javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('请求失败:', error));
```

`axios`示例：
`axios`支持通过查询参数和请求体发送数据。
```javascript
// GET 请求传递查询参数
axios.get('https://api.example.com/data', {
  params: { search: 'query' }
})
  .then(response => console.log(response.data))
  .catch(error => console.error('请求失败:', error));

// POST 请求传递数据
axios.post('https://api.example.com/data', {
  name: 'John',
  age: 30
})
  .then(response => console.log(response.data))
  .catch(error => console.error('请求失败:', error));
```

### **React 中如何调用 API**

在 React 中，通常会在组件的生命周期函数或 `useEffect` 钩子中进行 API 调用。以下是使用 `useEffect`和 `fetch`进行数据获取的示例：

使用 `useEffect` 和 `fetch` 示例：
```javascript
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('网络错误');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []); // 空数组意味着只在组件挂载时执行一次

  if (loading) return <div>加载中...</div>;
  if (error) return <div>发生错误: {error.message}</div>;

  return (
    <div>
      <h1>获取的数据</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
```


## 常用库
### JQuery

### Ajax
一个请求对应一个回复

## 框架
### React
为什么使用react，是因为react组件化比较方便么？
具体怎么组件化？


最方便的是可以组件化

**组件化结构**：将 UI 分解成独立、可重用的小组件。每个组件都可以包含自己的逻辑和视图，使得代码更加结构化，易于维护和复用。
**例子**：  
假设你在开发一个电商网站，页面上有多个部分，如商品列表、购物车、用户信息等。你可以将这些部分拆解成独立的组件，比如：
- `ProductList`：显示商品列表。
- `Cart`：显示购物车中的商品。
- `UserProfile`：显示用户个人信息。
这些组件可以独立开发和维护，而且如果某个组件（例如 `Cart`）需要在多个页面中使用，你可以直接复用这个组件，而不需要重复编写代码。




**虚拟 DOM**：React 使用虚拟 DOM 来优化页面更新过程。当数据发生变化时，React 首先更新虚拟 DOM，而不是直接更新真实 DOM。然后，React 会通过比较前后的虚拟 DOM，找到最小的差异并批量更新真实 DOM，这大大提高了性能。

**例子**：  
假设你有一个网页，其中有一个实时更新的消息列表。在传统的开发模式下，每当有新消息时，整个页面都会重新渲染。React 通过虚拟 DOM，只会对变化部分进行更新。即使有大量的数据变动，React 也会优化更新过程，仅渲染需要变化的部分，减少了对 DOM 的操作，从而提升性能。

例如，假设你有一个包含数百条消息的聊天窗口。每当一条新消息进入时，React 只会更新新消息的部分，而不会重新渲染整个消息列表，从而避免了不必要的性能开销。


**单向数据流**：React 中的数据流是单向的，父组件可以通过 props 向子组件传递数据，子组件通过事件回调来更新父组件的状态。这种方式让数据流动更加清晰，有助于调试和理解代码。

**例子**：  
假设你有一个登录表单，包含用户名和密码输入框。父组件 `LoginForm` 负责管理用户输入的状态，并通过 props 传递给子组件 `InputField`。用户每次输入内容时，`InputField` 会调用父组件的回调函数来更新父组件的状态，进而更新 UI。
```jsx
function LoginForm() {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return <InputField value={username} onChange={handleChange} />;
}

function InputField({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}
```
这种数据流的单向性使得你可以非常清晰地跟踪状态变化，避免了复杂的双向绑定或隐式的数据流动，使得代码更易于维护和理解。



**JSX语法**：React 使用 JSX（JavaScript XML）语法，它允许开发者在 JavaScript 中写 HTML 结构。JSX 让 UI 的结构和逻辑结合在一起，更直观易懂。
例如，在传统 JavaScript 中，更新 DOM 通常涉及许多 `document.getElementById` 和 `innerHTML` 等 DOM 操作。而在 React 中，使用 JSX 可以直观地声明 HTML 结构：
```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

```
这段代码在 JavaScript 中同时包含了逻辑和 UI，而不需要通过多个步骤来操作 DOM 元素。JSX 的这种语法使得开发者可以更直观地表达 UI 和逻辑，并且 React 会将它转换为实际的 JavaScript 代码。

**React Native 跨平台开发**
React Native 允许开发者使用 React 来构建原生应用（iOS 和 Android），让开发者能够用同一套代码跨平台开发。这意味着，你可以在 Web 开发中使用 React 的知识，直接转向移动端开发。

**例子**：  
假设你开发了一个社交应用的 Web 版本，使用 React 构建了所有的页面和交互。之后，你可以使用 React Native 将这款应用转移到 iOS 和 Android 平台，而无需重新学习新的开发框架或重新编写代码。
```jsx
import { View, Text } from 'react-native';

function App() {
  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
}

```
这段代码在 iOS 和 Android 上会被渲染为原生控件，让你可以复用大部分的逻辑，并针对移动设备做出优化。

### Vue
Examples | Vue.js： https://cn.vuejs.org/examples/#hello-world

#### render
 `render` 函数和`<template>` 标签的作用相似，都是用来替换页面的一部分元素，`<template>` 标签定义一部分内容，而`render` 函数则是生成的内容，两者最终的目的是告诉 Vue 应该如何渲染组件的 DOM 结构。
举例：
```javascript
// 例1
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  render: function(h) {
    return h('div', this.message);
  }
});
```
```javascript
// 例2
new Vue({
  render: function(h) {
    return h('div', this.message);
  },
}).$mount('#app');
```
 `render` 函数中的 `h('div', this.message)` 会创建一个包含 `message` 内容的 `<div>` 元素，最终替换掉挂载点 `#app` 中的内容

#### 虚拟DOM

虚拟DOM（Virtual DOM）是前端框架（如Vue.js、React）中用来提高性能的一种概念和技术。
虚拟DOM的主要目的是通过在内存中模拟DOM结构，从而减少对真实DOM的直接操作，提高网页的渲染效率。
1. **什么是DOM**？
DOM（Document Object Model，文档对象模型）是表示HTML文档结构的一种编程接口，它将网页结构表示为一棵树状结构（称为DOM树）。每个HTML标签都是DOM树中的一个节点。通过JavaScript，我们可以操作DOM树中的节点，从而动态地改变网页的内容和结构。
 2. **为什么需要虚拟DOM**？
操作真实的DOM通常是一个昂贵且缓慢的过程，特别是当页面结构复杂或频繁更新时。每次对DOM进行修改，浏览器都需要重新计算页面布局（称为reflow）和重新绘制（称为repaint），这可能导致性能瓶颈。
虚拟DOM的引入就是为了减少这种直接操作，从而提高性能。它通过以下方式实现这一目标：
- 在内存中模拟DOM结构：虚拟DOM是一个轻量级的JavaScript对象，它表示实际DOM的结构，但它并不直接操作真实的DOM。
- 批量更新DOM：当状态或数据发生变化时，框架会先更新虚拟DOM，然后将虚拟DOM与真实DOM进行比较（这个过程称为“diffing”），计算出需要更新的部分，最后只对这些部分进行更新，从而减少不必要的DOM操作。
3. **虚拟DOM的工作原理**
虚拟DOM的工作流程可以分为以下几个步骤：
	a. 创建虚拟DOM：当页面加载时，框架会基于组件或模板创建虚拟DOM。虚拟DOM是一个由JavaScript对象组成的树结构，它表示真实DOM的结构。
	b. 更新虚拟DOM：当应用的数据发生变化时，框架会重新生成新的虚拟DOM树来表示更新后的状态。
	c. 比较（Diffing）：框架会将新的虚拟DOM树与旧的虚拟DOM树进行比较，找到两者之间的差异（例如新增节点、修改节点、删除节点等）。
	d. 更新真实DOM（Patching）：根据diffing的结果，框架会以最小的代价将变化部分应用到真实的DOM上，从而更新网页的显示。
4. **虚拟DOM的优点**
- 性能优化：通过减少对真实DOM的频繁操作，虚拟DOM可以显著提高网页的渲染性能。
- 跨平台：虚拟DOM可以抽象出与平台无关的接口，这使得同样的代码可以用于多种平台，如浏览器、移动端甚至服务器端渲染（SSR）。
- 开发效率：开发者可以在编写代码时不用过多考虑DOM操作的细节，而是将精力集中在应用逻辑上，框架会自动优化DOM更新的效率。
5. **虚拟DOM的缺点**
- 额外的计算开销：虽然虚拟DOM减少了直接操作真实DOM的次数，但它在内存中创建和比较虚拟DOM也会带来一定的性能开销。对于一些简单的页面或操作频率非常高的场景，虚拟DOM的优势可能并不明显。

#### `<template>`

`<template>`是一个容器，用来包裹一段 HTML 代码或 Vue.js 模板代码，最终这些内容会根据**设定逻辑**被渲染到页面上。
举例：
- 替换内容
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello, World!',
      description: 'This is a description text.'
    };
  }
};
</script>
```
在这个例子中，`<template>` 标签包含了一个 `div`，其中有一个标题和一段描述。`{{ title }}` 和 `{{ description }}` 是 Vue 的插值语法，它们会被组件的 `data` 中的 `title` 和 `description` 替换。
- 条件渲染：
```vue
<template>
  <div>
    <template v-if="isLoggedIn">
      <p>Welcome, user!</p>
    </template>
    <template v-else>
      <p>Please log in.</p>
    </template>
  </div>
</template>
```
- 循环渲染：
```vue
<template>
  <ul>
    <template v-for="item in items">
      <li>{{ item }}</li>
    </template>
  </ul>
</template>
```

#### createElement和h
1. `createElement` 是什么？**
**createElement` 是 Vue.js 用来创建虚拟 DOM 的函数。虚拟 DOM 是 Vue.js 的一个核心概念，它在内存中表示 DOM 结构，之后再与实际 DOM 进行比较（diff），以确定需要更新的部分，从而高效地更新界面。
**createElement` 可以接收多个参数：
```javascript
createElement(
  // {String | Object | Function} 一个 HTML 标签名、组件选项对象，或者是一个返回值为这些选项之一的函数。
  'div',
  // {Object} 一个包含属性、事件监听器等的 data 对象。
  {
    attrs: {
      id: 'app'
    }
  },
  // {String | Array} 子元素的虚拟节点（VNodes）
  [
    'Some text content',
    createElement('h1', 'Title')
  ]
)
```
2. `h` 是什么？**
“`h`” 是 `createElement` 的缩写，由于`createElement`经常被使用，为了简洁，Vue 社区普遍采用了 `h` 作为它的缩写。
```javascript
render: h => h(App)
```
3. **举例**
```javascript
render: h => h(App)
```
其中：
- `h` 是 `render` 函数的参数，指向 `createElement` 函数。
- `h(App)` 调用 `createElement` 函数，创建一个 `App` 组件的虚拟 DOM。
- `render: h => h(App)` 表示用 `App` 组件的虚拟 DOM 来渲染这个 Vue 实例。

#### =>
 `=>` 是在 ECMAScript 6（ES6）中引入的箭头函数（Arrow Function）的符号，用于定义简洁的匿名函数。
1. **箭头函数的基本语法**
箭头函数的基本语法如下：
```javascript
(param1, param2, ..., paramN) => { statements }
```
如果只有一个参数，可以省略参数的括号：
```javascript
param => { statements }
```
如果函数体只有一个表达式，且需要返回该表达式的值，可以省略大括号和 `return` 关键字：
```javascript
param => expression
```
2. **举例**
```javascript
new Vue({
  render: h => h(App),
}).$mount('#app');
```
这个箭头函数可以分解为以下形式：
```javascript
new Vue({
  render: function(h) {
    return h(App);
  },
}).$mount('#app');
```
代码解释：
- 参数 `h`：这个函数接受一个参数 `h`，这个参数通常是 `createElement` 函数的简写。
- 函数体：`h(App)` 是函数体，它调用 `createElement` 函数，创建 `App` 组件的虚拟 DOM。
- 返回值：由于箭头函数只有一个表达式，它会隐式地返回这个表达式的结果。
3. **箭头函数的特性**
- `this` 绑定：箭头函数不会创建自己的 `this`，而是从它的外层上下文中继承 `this`。这意味着在箭头函数中使用 `this` 时，`this` 的值由外层作用域决定，而不会因为函数的调用方式而改变。
- 不能用作构造函数：箭头函数不能用作构造函数（即不能使用 `new` 关键字调用）。
- 没有 `arguments` 对象：箭头函数没有自己的 `arguments` 对象。如果需要访问参数，可以使用剩余参数语法 `...args`。


## marked.js


**marked.js** 是一个非常流行的 **JavaScript Markdown 解析器**，可以把 Markdown 文本转化为 HTML。它是纯 JavaScript 实现的，不依赖其他库，所以常用在前端（浏览器）和 Node.js 环境中。

---

核心特点

1. **快速**  
    号称是最快的 Markdown 解析器之一，性能在渲染大文本时表现很好。
    
2. **可扩展**  
    提供了 `Renderer`、`Tokenizer` 等接口，可以自定义 Markdown 语法的解析和渲染方式，比如把 `## 一级标题` 渲染成 `<h1 class="my-title">...</h1>`。
    
3. **兼容 CommonMark & GFM**
    
    - CommonMark：Markdown 的标准规范
        
    - GFM（GitHub Flavored Markdown）：支持 GitHub 的扩展语法，比如任务列表 `- [ ]`、表格、删除线 `~~text~~`
        
4. **前后端通用**
    
    - 浏览器端直接引入 `marked.min.js`，可以即时把用户输入的 Markdown 渲染为 HTML。
        
    - Node.js 端可以作为后端服务的一部分，把文章、文档等转成 HTML。
        

---

使用示例

基本用法

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
  const markdownText = `
## Hello Marked
这是 **加粗**，这是 *斜体*。

- 列表1
- 列表2

\`\`\`js
console.log("代码块示例");
\`\`\`
  `;

  const html = marked.parse(markdownText);
  document.body.innerHTML = html;
</script>
```

Node.js 用法

```js
import { marked } from "marked";

const markdownText = "## 标题\n\n一些 **Markdown** 内容。";
const html = marked.parse(markdownText);

console.log(html);
```

自定义渲染

```js
import { marked } from "marked";

const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
  return `<h${level} class="custom-h${level}">${text}</h${level}>`;
};

const html = marked.parse("## 自定义标题", { renderer });
console.log(html);
```

---

常见应用场景

- **博客 / 文档系统**：把 Markdown 文件转为网页内容。
    
- **在线 Markdown 编辑器**：用户输入 Markdown，实时渲染预览 HTML。
    
- **笔记类应用**：类似 Notion、Obsidian、简书这类支持 Markdown 的系统。
    
- **聊天应用**：支持富文本（粗体、代码块、链接等）。
    

---

要不要我帮你写一个 **最小的在线 Markdown 编辑器 demo（HTML + JS）**，你可以直接在浏览器里运行？






## 学习资料
- 前端面试题汇总： https://www.yuque.com/cuggz/interview


## 项目教程
- 【第8讲 【HTML+CSS+JS】实战，用API制作一个单词查询App(上)】 https://www.bilibili.com/video/BV1CM4y1w7py/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## 好看示例
- 【JS是没有上限的】 https://www.bilibili.com/video/BV1yG4y127bs/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## 其它工具
**v0.dev**：AI写代码，自动根据代码生成前端代码的工具 https://v0.dev/chat




## 其它


### 现代前端技术解析知识导图
![[现代前端技术解析知识导图.jpg]]


## 末尾