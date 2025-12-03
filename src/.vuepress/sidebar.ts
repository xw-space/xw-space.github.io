import { sidebar } from "vuepress-theme-hope";
// 配置文档左侧导航结构，支持多级分类
// 取得是一级标题，而不是文件名
export default sidebar({
  "/DailyRecord/":"structure",
  "/DailyThoughts/":"structure",
  "/CSBasic/":"structure",
  "/ProgrammingDevelopment/":"structure",
  "/Other/":"structure",
  "/posts/":"structure",
});
