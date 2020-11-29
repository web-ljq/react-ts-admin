import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./global.css";
import logo from "./logo.jpg";
import Login from "./pages/account";
import SideBarMenu from "./components/SideBarMenu";
import ArticleList from "./pages/article";
import ArticleForm from "./pages/article/ArticleForm";
import Classify from "./pages/classify";
import UserList from "./pages/account/userList";

const date = new Date();

const Layout = () => {
  return (
    <div className="wrap">
      <div className="wrap__left">
        <div className="wrap__left-title">
          <div id="logo">
            {/* <img src={logo} /> */}
            <img src="https://desk-fd.zol-img.com.cn/t_s144x90c5/g5/M00/01/0E/ChMkJlbKwbyIXgbwAAnktqkSSwAAALGdAE6N6sACeTO941.jpg" />
          </div>
          <Link to="/home">一叶知秋</Link>
        </div>
        <div>
          <SideBarMenu />
        </div>
      </div>
      <div className="wrap__right">
        <header className="header">
          <div id="header__menu">menu</div>
          <div id="header__profile">nav</div>
        </header>
        <div className="wrap__right_body">
          <div id="main">
            <Route path="/home/articleForm" component={ArticleForm} />
            <Route path="/home/articleList" component={ArticleList} />
            <Route path="/home/classify" component={Classify} />
            <Route path="/home/userList" component={UserList} />
          </div>
        </div>
        <footer className="footer">
          © {date.getFullYear()} A Leaf Knows The Autum
        </footer>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Layout} />
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
