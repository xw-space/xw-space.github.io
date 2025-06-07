import { navbar } from "vuepress-theme-hope";
// 网站顶部导航栏配置
export default navbar([
  "/",
  "/all/",
  "/demo/",
  "/daily/",
  "/CS_Fundamentals/",
  {
    text: "导航栏的下拉栏",
    icon: "pen-to-square",
    prefix: "/",
    children: [
      {
        text: "日常",
        icon: "pen-to-square",
        prefix: "daily/",
        children: [
          { text: "日记06-07", icon: "pen-to-square", link: "daily2025-06-07" },
          "daily2025-05-10",
        ],
      },
      {
        text: "导航栏的计算机基础",
        icon: "pen-to-square",
        prefix: "CS_Fundamentals/",
        children: [
          {
            text: "操作系统",
            icon: "pen-to-square",
            link: "OS",
          },
          "NetWork",
        ],
      },
      { text: "test1", icon: "pen-to-square", link: "test1" },
      "test2",
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
