---
icon: pen-to-square
date: 2022-01-09
category:
  - 博客
tag:
  - 博客
  - 圆
---

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
**初始化**

```bash
node -v
npm init vuepress-theme-hope@latest blogdir_name
```

| 操作         | 命令                            |
| ---------- | ----------------------------- |
| 启动开发服务器    | `npm run docs:dev`            |
| 启动开发 + 清缓存 | `npm run docs:clean-dev`      |
| 构建静态站点     | `npm run docs:build`          |
| 更新依赖工具（可选） | `npm run docs:update-package` |

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




重要的VuePress主题

**学习资料**
- 快速上手 | vuepress-theme-hope： https://theme-hope.vuejs.press/zh/get-started/
- 真实项目 | vuepress-theme-hope： https://theme-hope.vuejs.press/zh/demo/projects.html


## 使用技巧
Q：如何取消首页主页的大背景图？
A：将src/README.md文件中的“heroFullScreen”设为false。

## 可能的问题
T：和AI提问的时候，如果使用了“vuepress-theme-hope”主题，要告诉它，以免回答错误答案

Q：8080端口被占用，但是查找不到电脑上8080端口运行了任何应用，并且距上次正常运行之间，也并没有改动相关配置
A：没管它，电脑也没关机，第二天我再建博客的时候，自己就好了

## 学习资料
- 快速上手 | VuePress： https://vuepress.vuejs.org/zh/guide/getting-started.html
- 【VuePress+Github 部署一个零成本静态站点！】 https://www.bilibili.com/video/BV16Z4heUEgi/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## END
