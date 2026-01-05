import { navbar } from "vuepress-theme-hope";
// 网站顶部导航栏配置
export default navbar([
  "/",
  "/DailyRecord/",
  "/DailyThoughts/",
  {
    text: "计科基础",
    icon: "pen-to-square",
    prefix: "/CSBasic/",
    children: [
      { text: "数据库", icon: "pen-to-square", link: "DataBase.html" },
      { text: "操作系统", icon: "pen-to-square", link: "OperatingSystem.html" },
      { text: "计算机网络", icon: "pen-to-square", link: "ComputerNetwork.html" },
      { text: "计算机组成原理", icon: "pen-to-square", link: "PrinciplesofComputerOrganization.html" },
      { text: "数据结构与算法", icon: "pen-to-square", link: "DataStructuresandAlgorithms.html" },
      { text: "算法题解与心得", icon: "pen-to-square", link: "DataStructuresandAlgorithms-exercises.html" },
    ],
  },
  "/ProgrammingDevelopment/",
  "/Other/",
]);

// ********** 下面都没用上 **********

  // {
  //   text: "编程&开发",
  //   icon: "ellipsis-h",
  //   prefix: "/ProgrammingDevelopment/",
  //   children: [
  //   ],
  // },
  // {
  //   text: "其它",
  //   icon: "ellipsis-h",
  //   prefix: "/Other/",
  //   children: [
  //     { text: "WindowsTips", icon: "link", link: "WindowsTips/" },
  //     { text: "MacGuide", icon: "link", link: "MacGuide.html" },
  //     { text: "VuePress", icon: "link", link: "VuePress/" },
  //   ],
  // }


  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
// ]);
