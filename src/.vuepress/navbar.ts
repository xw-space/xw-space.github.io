import { navbar } from "vuepress-theme-hope";
// 网站顶部导航栏配置
export default navbar([
  "/",
  "/daily/",
  "/VurPress/",
  "/Java/",
  {
    text: "计算机基础",
    icon: "pen-to-square",
    prefix: "CS_Fundamentals/",
    children: [
      // "ComputerNetwork",
      { text: "操作系统", icon: "pen-to-square", link: "OperatingSystem" },
      { text: "计算机网络", icon: "pen-to-square", link: "ComputerNetwork" },
      { text: "计算机组成原理", icon: "pen-to-square", link: "PrinciplesofComputerOrganization" },
      { text: "数据结构与算法", icon: "pen-to-square", link: "DataStructuresandAlgorithms" },
      {
        text: "数据库",
        icon: "pen-to-square",
        prefix: "DataBase/",
        children: [
          "DataBaseBasics",
          { text: "MySQL", icon: "pen-to-square", link: "MySQL" },
          { text: "Redis", icon: "pen-to-square", link: "Redis" },

        ],
      },
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
