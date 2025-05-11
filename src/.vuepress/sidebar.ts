import { sidebar } from "vuepress-theme-hope";

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
      text: "计算机基础",
      icon: "book",
      prefix: "CS_FundamentsCS_Fundaments/",
      children: "structure",
    },
    {
      text: "Java Fuck",
      icon: "book",
      prefix: "Java/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
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
