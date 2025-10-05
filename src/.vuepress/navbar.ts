import { navbar } from "vuepress-theme-hope";
// 网站顶部导航栏配置
export default navbar([
  "/",
  "/DailyRecord/",
  "/TopicDiscussion/",
  {
    text: "计科基础",
    icon: "pen-to-square",
    prefix: "/CSBasic/",
    children: [
      { text: "计算机组成原理", icon: "pen-to-square", link: "PrinciplesofComputerOrganization.html" },
      { text: "操作系统", icon: "pen-to-square", link: "OperatingSystem.html" },
      { text: "计算机网络", icon: "pen-to-square", link: "ComputerNetwork.html" },
      { text: "数据结构与算法", icon: "pen-to-square", link: "DataStructuresandAlgorithms.html" },
      {
        text: "数据库",
        icon: "pen-to-square",
        link: "DataBase.html"
      },
        // prefix: "DataBase/",
        // children: [
        //   "DataBaseBasics",
        //   { text: "MySQL", icon: "pen-to-square", link: "MySQL" },
        //   { text: "Redis", icon: "pen-to-square", link: "Redis" },
        // ],
      // },
    ],
  },
  "/SoftwareEngineering/",
  "/AIDevelopment/",
  "/JavaDevelopment/",
  {
    text: "其它",
    icon: "ellipsis-h",
    prefix: "/Other/",
    children: [
      { text: "WindowsTips", icon: "link", link: "WindowsTips/" },
      { text: "MacGuide", icon: "link", link: "MacGuide.html" },
      { text: "VuePress", icon: "link", link: "VuePress/" },
    ],
  }
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
