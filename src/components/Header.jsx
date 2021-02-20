import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav">
      <div className="nav_search">
        <input type="text" placeholder="search" />
      </div>
      <div className="nav_account">
        <ul className="nav_item">
          {/* <li>
            <a href="">编辑</a>
          </li> */}
          <li>
            <a href="http://www.fleeting-time.com">网站主页</a>
          </li>
          <li>
            <Link to="/">退出</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
