import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./global.css";
import "./component.css";
import Header from "./components/Header";
import UserinfoEdit from "./pages/account";
import Login from "./pages/account/login";
import Register from "./pages/account/register";
import ArticleList from "./pages/article";
import ArticleForm from "./pages/article/ArticleForm";
import Category from "./pages/category";
import LeaveMessage from "./pages/leaveMessage";
import Home from "./pages/home";
import axios from "axios";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGpxIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2MTQwMDAzMTksImV4cCI6MTYxNDAwMzkxOX0.6d9-jMGNdmyue22r5C8XGLWy-YmOl0g_EpwtQjbTHho";

axios.defaults.withCredentials = false;
axios.defaults.headers.common["token"] = token;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"; //配置请求头

const date = new Date();

const Layout = () => {
  return (
    <div className="admin__wrapper">
      {/* 以下三者需构成兄弟元素，方便选择器选中 */}
      <input type="checkbox" id="checkbox" />
      {/* <!-- 复选框的id值和label的for值必须是相同的，才能够通过点击label选中复选框 --> */}
      <label for="checkbox">
        <i className="fa fa-bars"></i>
      </label>
      {/* sidebar-nav */}
      <div className="navbar">
        <header>
          <img
            src="https://desk-fd.zol-img.com.cn/t_s208x130c5/g6/M00/06/04/ChMkKmAKMTKITC8TAALqydfmZNEAAIrUAIrFboAAurh174.jpg"
            alt="profile_phpto"
          />
          <a href="http://www.fleeting-time.com">一叶知秋</a>
        </header>
        <ul>
          <li>
            <Link to="/admin/home">
              <i className="fa fa-home"></i>
              <span>控制台</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/articleList">
              <i className="fa fa-book"></i>
              <span>文章列表</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/classify">
              <i className="fa fa-sitemap"></i>
              <span>分类管理</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/leave-message">
              <i className="fa fa-bars"></i> <span>留言管理</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="route__view_container">
        <div className="header__nav">
          <Header />
        </div>
        <div className="container">
          <Route path="/admin/home" component={Home} />
          <Route path="/admin/articleForm" component={ArticleForm} />
          <Route path="/admin/articleList" component={ArticleList} />
          <Route path="/admin/classify" component={Category} />
          <Route path="/admin/userinfo-edit" component={UserinfoEdit} />
          <Route path="/admin/leave-message" component={LeaveMessage} />
        </div>
        <footer className="footer">
          © 2020-{date.getFullYear()} A Leaf Knows The Autum
        </footer>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Layout} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
