import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./global.css";
import Login from "./pages/account";

const date = new Date();

const Layout = () => {
  return (
    <div className="wrap">
      <div className="wrap__left">
        <div className="wrap__left-title">
          <Link to="/home">一叶知秋</Link>
        </div>
      </div>
      <div className="wrap__right">
        <header className="header">
          <div id="header__menu">menu</div>
          <div id="header__profile">nav</div>
        </header>
        <div className="wrap__right_body">
          <div id="main">111</div>
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
        <Route path="/home" exact component={Layout} />
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
