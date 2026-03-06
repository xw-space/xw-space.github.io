---
icon: pen-to-square
date: 2022-01-09
category:
  - 博客
tag:
  - 博客
  - 圆
---

VuePress使用教程
<!-- more -->

# VuePress
## 介绍
**​VuePress​**​ 是一个基于 ​**​Vue.js​**​ 的静态网站生成器（Static Site Generator, SSG）
主要用于快速构建​**​技术文档网站​**​或​**​内容站点​**​。


它的主要特点包括：
- ✅ ​**​简洁易用​**​：以 Markdown 文件为核心，通过简单的配置就能生成美观的文档网站。
- ✅ ​**​基于 Vue​**​：它本质是一个 Vue 应用，因此你可以使用 Vue 组件来扩展页面功能。
- ✅ ​**​默认主题美观​**​：内置了专为文档优化的默认主题，支持自动生成导航、搜索、侧边栏等功能。
- ✅ ​**​插件生态丰富​**​：支持通过插件扩展功能，比如 PWA 支持、SEO 增强、评论系统等。
- ✅ ​**​高性能​**​：生成的站点是纯静态文件，加载速度快，适合部署在 GitHub Pages、Vercel、Netlify 等平台。

**适用场景：​**​
- 项目官方文档
- 技术博客
- 教程网站
- 个人知识库


## 快速上手
**本地运行起来**
- 下载按照node.js
- 检查node.js是否安装成功，命令：`node -v`
- 创建或选择一个存放播客的文件夹进行VuePress初始化：`npm init vuepress-theme-hope@latest blogdir_name`，然后进行一些设置，值得注意的是，包管理器选择npm，包管理器选择webpack，我也不知道为什么，教程这么教的，还有就是记得yes需要一个自动部署的githubpage的工作流

| 操作         | 命令                            |
| ---------- | ----------------------------- |
| 启动开发服务器    | `npm run docs:dev`            |
| 启动开发 + 清缓存 | `npm run docs:clean-dev`      |
| 构建静态站点     | `npm run docs:build`          |
| 更新依赖工具（可选） | `npm run docs:update-package` |

**部署到github**

- 去github，点击“new”，创建一个新仓库，填写“repository name”等，主分支用来存储代码，还需要创建一个新的分支，来存储静态的编译好的代码，点击分支，选择一个new branch，
- 点击setting→pages→Branch，分支现在为“None”，点击“None”，选择刚刚创建的好的新分支，然后点击save
- 待整理。。。

**学习资料**
- 快速上手 | VuePress： https://vuepress.vuejs.org/zh/guide/getting-started.html
- 【VuePress+Github 部署一个零成本静态站点！】 https://www.bilibili.com/video/BV16Z4heUEgi/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef



## VuePress主题

### vuepress-theme-hope

**VuePress Theme Hope​**​（通常简称为 ​**​Hope Theme​**​）是一个​**​第三方、功能丰富、高度可定制的 VuePress 主题​**​，由开发者 ​**​Mr.Hope​**​ 开发并维护。
它是在 VuePress 默认主题的基础上进行了大量增强与扩展，目标是提供更加强大、美观、易用的文档和博客解决方案。

**主要特性：​**​
​**​多合一功能：​**
支持 ​**​文档站点​**​ 和 ​**​博客站点​**​，甚至可以在一个站点中同时拥有两者。
提供​**​首页、文档页、博客页、标签页、时间线、关于页​**​等多种页面类型。

- 支持深层次的主题配置，比如多语言、主题色、布局切换、暗黑模式等。
- 支持为不同栏目（如文档、博客）分别设置导航和侧边栏。
- 内置 ​**​全文搜索​**​（支持 Algolia）、​**​暗黑模式​**​、​**​响应式设计​**​。
- 支持 ​**​文章阅读进度条、目录、代码复制、数学公式（LaTeX）、Mermaid 图表​**​等。
- 支持 ​**​文章分类、标签、归档、时间线​**​。
- 支持为每篇文章设置 ​**​封面图、发布时间、作者、字数统计、阅读时长​**​等元信息。
- ​**​国际化支持：​**支持多语言站点构建，内置多种语言包，方便搭建国际化文档或博客。
- ​**​SEO 友好**：对搜索引擎友好，利于收录。
- 性能优化：​优化加载性能，提升用户体验。​
- ​**​丰富的插件集成：​**​内建或集成了许多实用的 VuePress 插件，比如图片懒加载、复制按钮、平滑滚动等，无需手动配置。

**学习资料**

- 快速上手 | vuepress-theme-hope： https://theme-hope.vuejs.press/zh/get-started/
- 真实项目 | vuepress-theme-hope： https://theme-hope.vuejs.press/zh/demo/projects.html

## 布局内容


布局包括:

- [导航栏](https://theme-hope.vuejs.press/zh/guide/layout/navbar.html)
- [侧边栏](https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html)
- [页脚](https://theme-hope.vuejs.press/zh/guide/layout/footer.html)

同时每个页面包含:

- [路径导航](https://theme-hope.vuejs.press/zh/guide/layout/breadcrumb.html)
- [标题和页面信息](https://theme-hope.vuejs.press/zh/guide/feature/page-info.html)
- [TOC (文章标题列表)](https://theme-hope.vuejs.press/zh/guide/layout/page.html#标题列表)
- [贡献者、更新时间等页面元信息](https://theme-hope.vuejs.press/guide/feature/meta.html)
- [评论](https://theme-hope.vuejs.press/zh/guide/feature/comment.html)

主题也带有以下元素:

- [夜间模式按钮](https://theme-hope.vuejs.press/zh/guide/interface/darkmode.html)
- [返回顶部按钮](https://theme-hope.vuejs.press/guide/interface/others.html#返回顶部按钮)
- [打印按钮](https://theme-hope.vuejs.press/guide/interface/others.html#打印按钮)

你可以在主题选项和页面的 frontmatter 中自定义它们。

## 页面内容

**frontmatter**

```
# 这是文章的标题
title: 页面配置
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
# order: 3
# 设置作者
author: Ms.Hope
# 设置写作时间
date: 2020-01-01
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
tag:
  - 页面配置
  - 使用指南
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 这是测试显示的页脚
# 你可以自定义版权信息
copyright: 无版权
```

**摘要**
`more` 注释之前的内容被视为文章摘要。

```
<!-- more -->
```


**页面标题**
Markdown 中的第一个 H1 标题会被视为页面标题。
你可以在 Markdown 的 Frontmatter 中设置页面标题。

```md
---
title: 页面标题
---
```


**页面信息**

你可以在 Markdown 的 Frontmatter 中设置页面信息。

- 作者设置为 Ms.Hope。
- 写作日期为 2020 年 1 月 1 日
- 分类为 “使用指南”
- 标签为 “页面配置” 和 “使用指南”

**页面内容**

你可以自由在这里书写你的 Markdown。

::: tip 图片引入

- 你可以将图片和 Markdown 文件放置在一起使用相对路径进行引用。
- 对于 `.vuepress/public` 文件夹的图片，请使用绝对链接 `/` 进行引用。

:::

**组件**

每个 Markdown 页面都会被转换为一个 Vue 组件，这意味着你可以在 Markdown 中使用 Vue 语法：

{{ 1 + 1 }}

<!-- markdownlint-disable MD033 -->

<ul>
  <li v-for="i in 3">{{ i }}</li>
</ul>

<!-- markdownlint-enable MD033 -->

你也可以创建并引入你自己的组件。

<MyComponent />

<script setup>
import { defineComponent, h, ref } from 'vue';

const MyComponent = defineComponent({
  setup() {
    const input = ref('Hello world!');
    const onInput = (e) => {
      input.value = e.target.value;
    };

    return () => [
      h('p', [
        h('span','输入: '),
        h('input', {
          value: input.value,
          onInput,
        }),
      ]),
      h('p', [h('span','输出: '), input.value]),
    ];
  },
});
</script>

---

主题包含一些有用的组件。这里是一些例子:

- 文字结尾应该有深蓝色的 徽章文字 徽章。 <Badge text="徽章文字" color="#242378" />

- 一个卡片:

  ```component VPCard
  title: Mr.Hope
  desc: Where there is light, there is hope
  logo: https://mister-hope.com/logo.svg
  link: https://mister-hope.com
  background: rgba(253, 230, 138, 0.15)
  ```

## 禁用功能

你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。

```markdown
navbar: false
sidebar: false

breadcrumb: false
pageInfo: false
contributors: false
editLink: false
lastUpdated: false
prev: false
next: false
comment: false
footer: false

backtotop: false
```

这个frontmatter禁用了如下功能:

- 导航栏
- 侧边栏
- 路径导航
- 页面信息
- 贡献者
- 编辑此页链接
- 更新时间
- 上一篇/下一篇 链接
- 评论
- 页脚
- 返回顶部按钮


## Markdown

VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。

你需要创建并编写 Markdown，以便 VuePress 可以根据文件结构将它们转换为不同的页面。



### Markdown 介绍

如果你是一个新手，还不会编写 Markdown，请先阅读 [Markdown 介绍](https://theme-hope.vuejs.press/zh/cookbook/markdown/) 和 [Markdown 演示](https://theme-hope.vuejs.press/zh/cookbook/markdown/demo.html)。

### Markdown 配置

VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。

::: important Frontmatter

Frontmatter 是 VuePress 中很重要的一个概念，请阅读 [Frontmatter 介绍](https://theme-hope.vuejs.press/zh/cookbook/vuepress/page.html#front-matter) 了解详情。

:::

### Markdown 扩展

VuePress 会使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 [语法扩展](https://github.com/markdown-it/markdown-it#syntax-extensions) 。

### VuePress 扩展

为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。

关于这些扩展，请阅读 [VuePress 中的 Markdown 扩展](https://theme-hope.vuejs.press/zh/cookbook/vuepress/markdown.html)。

### 主题扩展

通过 VuePress 插件，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。

#### 选项卡

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/content/tabs.html)

#### 脚注

此文字有脚注[^first].

[^first]: 这是脚注内容

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/content/footnote.html)

#### 导入文件

<!-- @include: ./README.md{11-17} -->

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/content/include.html)

#### TeX 语法

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/grammar/math.html)

#### 任务列表

- [x] 计划 1
- [ ] 计划 2

[查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/grammar/tasklist.html)

### 图片增强

支持为图片设置颜色模式和大小。

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/grammar/image.html)

#### 上下角标

19^th^ H~2~O

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/sup-sub.html)

#### 组件

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
background: rgba(253, 230, 138, 0.15)
```

- [查看详情](https://theme-hope.vuejs.press/zh/guide/component/grammar.html)

#### 提示容器

::: v-pre

安全的在 Markdown 中使用 {{ variable }}。

:::

::: info 自定义标题

信息容器，包含 `代码` 与 [链接](#提示容器)。

```js
const a = 1;
```

:::

::: tip 自定义标题

提示容器

:::

::: warning 自定义标题

警告容器

:::

::: caution 自定义标题

危险容器

:::

::: details 自定义标题

详情容器

:::

- [GitHub 警示](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/alert.html)
- [提示框](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/hint.html)

#### 自定义对齐

::: center

我是居中的

:::

::: right

我在右对齐

:::

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/align.html)

#### 属性支持

一个拥有 ID 的 **单词**{#word}。

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/attrs.html)

#### 标记

你可以标记 ==重要的内容== 。

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/mark.html)

#### 剧透

VuePress Theme Hope !!十分强大!!.

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/spoiler.html)

#### 样式化

向 Mr.Hope 捐赠一杯咖啡。 _Recommended_

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/stylize.html)

#### 图表

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/chartjs.html" width="100%" height="450"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/chart/chartjs.html)

#### ECharts

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/echarts.html" width="100%" height="800"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/chart/echarts.html)

#### 流程图

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/flowchart.html" width="100%" height="450"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/chart/flowchart.html)

#### MarkMap

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/markmap.html" width="100%" height="380"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/chart/markmap.html)

#### Mermaid

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/mermaid.html" width="100%" height="620"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/chart/mermaid.html)

#### PlantUML

@startuml
Alice -> Bob: 认证请求

alt 成功情况

    Bob -> Alice: 认证接受

else 某种失败情况

    Bob -> Alice: 认证失败
    group 我自己的标签
    Alice -> Log : 开始记录攻击日志
        loop 1000次
            Alice -> Bob: DNS 攻击
        end
    Alice -> Log : 结束记录攻击日志
    end

else 另一种失败

    Bob -> Alice: 请重复

end
@enduml

- [View Detail](https://theme-hope.vuejs.press/zh/guide/markdown/chart/plantuml.html)

#### 代码块

::: code-tabs

@tab pnpm

```bash
pnpm add -D vuepress-theme-hope
```

@tab yarn

```bash
yarn add -D vuepress-theme-hope
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope
```

:::

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/code/code-tabs.html)

#### 代码演示

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/code-demo.html" width="100%" height="450"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/code/demo.html)

#### 交互演示

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/playground.html" width="100%" height="480"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/code/playground.html)

#### Kotlin 交互演示

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/kotlin-playground.html" width="100%" height="220"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/code/kotlin-playground.html)

#### Sandpack 交互演示

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/sandpack.html" width="100%" height="380"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/code/sandpack.html)

#### Vue 交互演示

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/vue-playground.html" width="100%" height="380"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/code/vue-playground.html)

#### 幻灯片

<iframe src="https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html" width="100%" height="420"/>

- [查看详情](https://theme-hope.vuejs.press/zh/guide/markdown/content/revealjs.html)


## 使用技巧

Q：如何取消首页主页的大背景图？
A：将src/README.md文件中的“heroFullScreen”设为false。



## 可能的问题

T：和AI提问的时候，如果使用了“vuepress-theme-hope”主题，要告诉它，以免回答错误答案

Q：8080端口被占用，但是查找不到电脑上8080端口运行了任何应用，并且距上次正常运行之间，也并没有改动相关配置
A：没管它，电脑也没关机，第二天我再建博客的时候，自己就好了



## END
