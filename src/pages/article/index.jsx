import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import ServerPath from "../../config/api";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getArticleList();
  }, []);

  async function getArticleList() {
    axios({
      method: "get",
      url: ServerPath.artilceList,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGpxIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2MTQwMDAzMTksImV4cCI6MTYxNDAwMzkxOX0.6d9-jMGNdmyue22r5C8XGLWy-YmOl0g_EpwtQjbTHho",
      },
    })
      .then((res) => {
        if (res.data.errno === 0) {
          setArticleList(res.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const delArticle = (_id) => {
    axios({
      method: "get",
      url: ServerPath.delArticle + _id,
    }).then((res) => {
      if (res.data.errno === 0) {
        getArticleList();
      }
    });
  };

  return (
    <div className="article__list">
      <button>
        <Link to="/admin/articleForm">添加文章</Link>
      </button>
      <div style={{ border: "1px solid #ddd", marginTop: 20 }}>
        <div className="article__item-header">
          <span>标题</span>
          <span>分类</span>
          <span>时间</span>
          <span>操作</span>
        </div>
        {articleList.map((item, index) => {
          return (
            <div key={index} className="article__item">
              <span>{item.title}</span>
              <span>{item.category}</span>
              <span>{item.createdAt}</span>
              <span>
                <Link to={`/admin/articleForm?_id=${item._id}`}>edit</Link>
                <span
                  style={{ marginLeft: "20px" }}
                  onClick={() => delArticle(item._id)}
                >
                  del
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticleList;
