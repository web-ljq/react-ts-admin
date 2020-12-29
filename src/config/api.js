const apiUrl = "http://www.fleeting-time.com/api/";

const serverPath = {
  // admin
  login: apiUrl + "register", //注册
  login: apiUrl + "login", //检查用户名和密码
  loginCheck: apiUrl + "loginCheck", // isLogin
  addArticle: apiUrl + "addArticle", //添加文章
  delArticle: apiUrl + "delArticle?_id=", //删除文章
  updateArticle: apiUrl + "updateArticle", //修改文章
  artilceList: apiUrl + "articleList", //获取文章列表
  getArticleById: apiUrl + "getArticleById?_id=", //获取一篇文章
  // classify
  addClassify: apiUrl + "addClassify", //添加文章分类
  delClassify: apiUrl + "delClassify?_id=", //删除文章分类
  updateClassify: apiUrl + "updateClassify", //修改文章分类
  getClassifyById: apiUrl + "getClassifyById?_id=", //获取文章分类ById
  classify: apiUrl + "classify", //获取文章分类

  // frontend
  getArtList: apiUrl + "getArtList",
  getClassify: apiUrl + "getClassify",
  getArtById: apiUrl + "getArtById?_id=",
  getArtByClassify: apiUrl + "getArtByClassify?classify=",
};

export default serverPath;
