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
    }).then((res) => {
      if (res.data.errno === 0) {
        setArticleList(res.data.data);
      }
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
        <Link to="/home/articleForm">添加文章</Link>
      </button>
      {articleList.map((item, index) => {
        return (
          <div key={index} className="article__item">
            <div className="article__item-title">{item.title}</div>
            <div className="article__item-classify">{item.classify}</div>
            <div className="article__item-createAt">{item.createdAt}</div>
            <div className="article__item-btns">
              <button>
                <Link to={`/home/articleForm?_id=${item._id}`}>edit</Link>
              </button>
              <button
                style={{ marginLeft: "20px" }}
                onClick={() => delArticle(item._id)}
              >
                del
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
