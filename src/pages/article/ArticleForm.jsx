import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import marked from "marked";
import ServerPath from "../../config/api";

const ArticleForm = ({ history }) => {
  const [type, setType] = useState("添加文章");
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [createdAt, setCreatedAt] = useState("createdAt"); //发布日期
  const [updatedAt, setUpdatedAt] = useState("updatedAt"); //修改日志的日期
  const [classifys, setClassifys] = useState([]); // 文章分类信息
  const [selectedType, setSelectType] = useState(); //选择的文章类别

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  useEffect(() => {
    getClassify();
    //获得文章ID
    let tmpId = history.location.search.split("id=")[1];
    if (tmpId) {
      setType("修改文章");
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);

  // 通过文章id获取数据然后进行修改
  const getArticleById = (id) => {
    axios(ServerPath.getArticleById + id, {
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      const data = res.data.data;
      setArticleTitle(data.title);
      setArticleContent(data.content);
      const html = marked(data.content);
      setMarkdownContent(html);
      setCreatedAt(data.createdAt);
      setSelectType(data.classify);
    });
  };

  const getClassify = () => {
    axios({
      method: "get",
      url: ServerPath.classify,
    }).then((res) => {
      setClassifys(res.data.data);
    });
  };

  async function addArticle() {
    axios({
      method: "post",
      url: ServerPath.addArticle,
      data: {
        title: articleTitle,
        content: articleContent,
        classify: selectedType,
        createdAt,
      },
    })
      .then((res) => {
        if (res.data.errno === 0) {
          history.push("/home/articleList");
        }
      })
      .catch((e) => {
        alert("添加失败");
      });
  }

  async function updateArticle() {
    axios({
      method: "post",
      url: ServerPath.updateArticle,
      data: {
        _id: articleId,
        title: articleTitle,
        content: articleContent,
        classify: selectedType,
        createdAt,
      },
    }).then((res) => {
      if (res.data.errno === 0) {
        history.push("/home/articleList");
      }
    });
  }

  const artAddOrUpdate = () => {
    if (articleId == 0) {
      addArticle();
    } else {
      updateArticle();
    }
  };

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const onChaneCreatedAt = (e) => {
    setCreatedAt(e.target.value);
  };

  const selectTypeHandler = (e) => {
    setSelectType(e.target.value);
  };

  return (
    <div className="article__form">
      <div className="article__form_left">
        <div className="flex-box">
          <div className="title">
            <input
              type="text"
              placeholder="title"
              defaultValue={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
            />
          </div>
          <div className="category">
            <select defaultValue={selectedType} onChange={selectTypeHandler}>
              <option value="--">category</option>
              <option value="--">------</option>
              {classifys.map((item, index) => {
                return (
                  <option key={index} value={item.classifyName}>
                    {item.classifyName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="author">
            <select defaultValue={selectedType} onChange={selectTypeHandler}>
              <option value="--">author</option>
              <option value="--">------</option>
              {classifys.map((item, index) => {
                return (
                  <option key={index} value={item.classifyName}>
                    {item.classifyName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btn" onClick={artAddOrUpdate}>
            {type}
          </div>
        </div>
        <div className="content">
          <div className="markdown-content">
            <textarea
              type="text"
              placeholder="content"
              defaultValue={articleContent}
              onChange={(e) => changeContent(e)}
            />
          </div>
          <div
            className="show-html"
            dangerouslySetInnerHTML={{ __html: markdownContent }}
          ></div>
        </div>
      </div>
      <div className="article__form_right">
        <div className="img"></div>
        <div className="time">
          <input
            className="createdAt"
            type="date"
            placeholder="createdAt"
            defaultValue={createdAt}
            onChange={(e) => onChaneCreatedAt(e)}
          />
          <input
            className="updatedAt"
            type="date"
            defaultValue={updatedAt}
            onChange={(e) => onChaneCreatedAt(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
