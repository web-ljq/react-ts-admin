// 解决跨域方案
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // api 表示代理路径
  // target 表示目标服务器地址
  app.use(
    createProxyMiddleware("/api", {
      target: "http://127.0.0.1:3001/",
      // 跨域时一般都设置为 true
      changeOrigin: true,
      // 重写接口路由
      // "pathRewrite":{
      //     "^/api": "" // 这样处理后 最终的接口路径为：http://127.0.0.1:8080/xxx
      // }
    })
  );
};
