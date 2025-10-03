import { defineUserConfig } from "vuepress";
// 主配置文件（必须）
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "xwBlog",
  description: "xw's Blog",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
