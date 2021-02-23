import LeaveMessage from "../pages/leaveMessage";

const apiUrl = "http://www.fleeting-time.com/api/";
// const apiUrl = "http://127.0.0.1:3001/api/";

const serverPath = {
  // admin
  register: apiUrl + "register", //注册
  login: apiUrl + "login", //检查用户名和密码
  loginCheck: apiUrl + "loginCheck", // isLogin
  addArticle: apiUrl + "addArticle", //添加文章
  delArticle: apiUrl + "delArticle?_id=", //删除文章
  updateArticle: apiUrl + "updateArticle", //修改文章
  artilceList: apiUrl + "articleList", //获取文章列表
  getArticleById: apiUrl + "getArticleById?_id=", //获取一篇文章
  // category
  addCategory: apiUrl + "addCategory", //添加文章分类
  delCategory: apiUrl + "delCategory?_id=", //删除文章分类
  updateCategory: apiUrl + "updateCategory", //修改文章分类
  getCategoryById: apiUrl + "getCategoryById?_id=", //获取文章分类ById
  category: apiUrl + "category", //获取文章分类
  // leaveMessage
  addLeaveMessage: apiUrl + "addLeaveMessage", // 添加留言
  delLeaveMessage: apiUrl + "delLeaveMessage?_id=", // 删除列表
  getLeaveMessage: apiUrl + "leaveMessageList", // 留言列表

  // frontend
  getArtList: apiUrl + "getArtList",
  getCategory: apiUrl + "getCategory",
  getArtById: apiUrl + "getArtById?_id=",
  getArtByCategory: apiUrl + "getArtByCategory?category=",
};

export default serverPath;
