import React, { useState, useEffect } from "react";
import "./index.css";
import Modal from "../../ui/Modal";
import axios from "axios";
import ServePath from "../../config/api";

const Classify = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("新增分类");
  const [_id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    axios({
      method: "get",
      url: ServePath.category,
    }).then((res) => {
      setCategories(res.data.data);
    });
  }

  const addCategory = () => {
    setType("新增分类");
    axios
      .post(ServePath.addCategory, {
        category,
        instructions,
      })
      .then((res) => {
        if (res.data.errno === 0) {
          setVisible(false);
          setCategory("");
          setInstructions("");
          getCategory();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function delCategory(_id) {
    axios({
      method: "get",
      url: ServePath.delCategory + _id,
    }).then((res) => {
      if (res.data.errno === 0) {
        getCategory();
      }
    });
  }

  const getCategoryById = (_id) => {
    setVisible(true);
    setType("编辑分类");
    axios({
      method: "get",
      url: ServePath.getClassifyById + _id,
    }).then((res) => {
      if (res.data.errno === 0) {
        setCategory(res.data.data.category);
        setInstructions(res.data.data.instructions);
        setId(_id);
      }
    });
  };

  async function updateCategory() {
    axios({
      method: "POST",
      url: ServePath.updateCategory,
      data: {
        _id,
        category,
        instructions,
      },
    }).then((res) => {
      setCategory("");
      setInstructions("");
      setVisible(false);
      getCategory();
      setType("新增分类");
    });
  }

  const handleOk = () => {
    if (type === "编辑分类") {
      updateCategory();
    } else {
      addCategory();
    }
  };

  const onShowModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setCategory("");
    setInstructions("");
    setVisible(false);
  };

  const onChaneClassifyName = (e) => {
    setCategory(e.target.value);
  };

  const onChaneInstructions = (e) => {
    setInstructions(e.target.value);
  };

  const Content = () => {
    return (
      <div className="input__box">
        <input
          onChange={(e) => onChaneClassifyName(e)}
          type="text"
          placeholder="分类名称"
          defaultValue={category}
        />
        <textarea
          onChange={(e) => onChaneInstructions(e)}
          type="text"
          placeholder="分类详情"
          defaultValue={instructions}
        />
      </div>
    );
  };

  return (
    <>
      <div className="category">
        {categories.map((item, index) => {
          return (
            <div key={index} className="category__card">
              <h3>{item.category}</h3>
              <p>{item.instructions}</p>
              <div className="buttons">
                <span onClick={() => getCategoryById(item._id)}>edit</span>
                <span onClick={() => delCategory(item._id)}>del</span>
              </div>
            </div>
          );
        })}
        <div className="category__card-add" onClick={onShowModal}>
          Add
        </div>
      </div>
      <Modal
        width={"500px"}
        height={"350px"}
        visible={visible}
        title={type}
        content={Content()}
        onOk={handleOk}
        opacit={0.66}
        onCancel={onCancel}
        modalFork={onCancel}
      />
    </>
  );
};

export default Classify;
