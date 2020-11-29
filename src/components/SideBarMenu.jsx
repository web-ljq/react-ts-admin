import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBarMenu = () => {
  return (
    <div id="sidebar">
      <ul>
        <li>
          <Link to="/home">首页</Link>
        </li>
        <li>
          <Link to="/home/articleList">文章列表</Link>
        </li>
        <li>
          <Link to="/home/articleForm">操作文章</Link>
        </li>
        <li>
          <Link to="/home/classify">分类管理</Link>
        </li>
        <li>
          <Link to="/home/userList">用户管理</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBarMenu;
