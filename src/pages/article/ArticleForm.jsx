import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import marked from "marked";
import ServerPath from "../../config/api";

const ArticleForm = ({ history }) => {
  const [type, setType] = useState("添加文章");
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [imgUrl, setImgUrl] = useState(""); //图片url
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [createdAt, setCreatedAt] = useState("createdAt"); //发布日期
  const [updatedAt, setUpdatedAt] = useState("updatedAt"); //修改日志的日期
  const [categories, setCategory] = useState([]); // 文章分类信息
  const [selectedType, setSelectType] = useState(""); //选择的文章类别

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
    getCategory();
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
      setImgUrl(data.imgUrl);
      setArticleContent(data.content);
      const html = marked(data.content);
      setMarkdownContent(html);
      setCreatedAt(data.createdAt);
      setSelectType(data.category);
    });
  };

  const getCategory = () => {
    axios({
      method: "get",
      url: ServerPath.category,
    }).then((res) => {
      setCategory(res.data.data);
    });
  };

  async function addArticle() {
    axios({
      method: "post",
      url: ServerPath.addArticle,
      data: {
        username: "ljq",
        title: articleTitle,
        imgUrl,
        content: articleContent,
        category: selectedType,
        createdAt,
      },
    })
      .then((res) => {
        if (res.data.errno === 0) {
          history.push("/admin/articleList");
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
        imgUrl,
        content: articleContent,
        classify: selectedType,
        createdAt,
      },
    }).then((res) => {
      if (res.data.errno === 0) {
        history.push("/admin/articleList");
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

  return (
    <div className="article__form">
      <div className="title item">
        <span>标题：</span>
        <input
          type="text"
          name="title"
          placeholder="标题"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
      </div>
      <div className="category item">
        <span>分类：</span>
        <select
          name="title"
          defaultvalue={selectedType}
          onChange={(e) => setSelectType(e.target.value)}
        >
          <option value="">文章分类</option>
          {categories.map((item) => (
            <option value={item.category}>{item.category}</option>
          ))}
        </select>
      </div>
      <div className="author item">
        <span>作者：</span>
        <input
          type="text"
          name="author"
          value="ljq"
          placeholder="作者"
          disabled
        />
      </div>
      <div className="article-img item">
        <span>图片：</span>
        <input
          type="text"
          name="imgUrl"
          placeholder="img-url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <span style={{ fontSize: 14, color: "red", marginLeft: 10 }}>
          目前只支持上传图片url
        </span>
      </div>
      <div className="date item">
        <span>时间：</span>
        <input
          value="2021/2/2"
          type="date"
          onChange={(e) => onChaneCreatedAt(e)}
        />
      </div>
      <div className="content">
        <h5>内容：</h5>
        <div className="wrap">
          <textarea
            name="content"
            cols="80"
            rows="40"
            value={articleContent}
            onChange={(e) => changeContent(e)}
          ></textarea>
          <div
            className="show-html"
            dangerouslySetInnerHTML={{ __html: markdownContent }}
          ></div>
        </div>
      </div>
      <div className="button" onClick={artAddOrUpdate}>
        {type}
      </div>
    </div>
  );
};

export default ArticleForm;
