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
