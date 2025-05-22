---
icon: pen-to-square
date: 2022-01-09
category:
  - 博客
tag:
  - 博客
  - 圆
---

# 使用VuePress搭建博客

## 快速上手

**教程**
- 快速上手 | VuePress： https://vuepress.vuejs.org/zh/guide/getting-started.html
- 【VuePress+Github 部署一个零成本静态站点！】 https://www.bilibili.com/video/BV16Z4heUEgi/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

初始化

## vuepress-theme-hope——重要的VuePress主题

**教程**
- 快速上手 | vuepress-theme-hope： https://theme-hope.vuejs.press/zh/get-started/
- 真实项目 | vuepress-theme-hope： https://theme-hope.vuejs.press/zh/demo/projects.html

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


如何取消首页主页的大背景图？
将src/README.md文件中的“heroFullScreen”设为false。

# END
