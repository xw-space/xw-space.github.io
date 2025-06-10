import { sidebar } from "vuepress-theme-hope";
// 配置文档左侧导航结构，支持多级分类
export default sidebar({
  "/": [
    "",
    {
      text: "日常",
      icon: "book",
      prefix: "daily/",
      children: "structure",
    },
    {
      text: "VuePress的使用",
      icon: "laptop-code",
      prefix: "VuePress/",
      link: "VuePress/",
      children: "structure",
    },
    
    {
      text: "Fuck Java",
      icon: "book",
      prefix: "Java/",
      children: "structure",
    },
    {
      text: "计算机基础",
      icon: "book",
      prefix: "CS_FundamentsCS_Fundaments/",
      children: "structure",
    },
    {
      text: "其它文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
  ],
});
