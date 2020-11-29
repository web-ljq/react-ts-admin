import React, { useState, useEffect } from "react";
import "./index.css";
import Modal from "../../ui/Modal";
import axios from "axios";
import ServePath from "../../config/api";

const Classify = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("新增分类");
  const [_id, setId] = useState("");
  const [classifyName, setClassifyName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [classifys, setClassifys] = useState([]);

  useEffect(() => {
    getClassiys();
  }, []);

  async function getClassiys() {
    axios({
      method: "get",
      url: "http://127.0.0.1:3001/api/classify",
      withCredentials: true,
    }).then((res) => {
      setClassifys(res.data.data);
    });
  }

  const addClassify = () => {
    setType("新增分类");
    axios
      .post("http://127.0.0.1:3001/api/addClassify", {
        classifyName,
        instructions,
      })
      .then((res) => {
        if (res.data.errno === 0) {
          setVisible(false);
          setClassifyName("");
          setInstructions("");
          getClassiys();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function delClassify(_id) {
    axios({
      method: "get",
      url: "http://127.0.0.1:3001/api/delClassify?_id=" + _id,
    }).then((res) => {
      if (res.data.errno === 0) {
        getClassiys();
      }
    });
  }

  const getClassifyById = (_id) => {
    setVisible(true);
    setType("编辑分类");
    axios({
      method: "get",
      url: ServePath.getClassifyById + _id,
    }).then((res) => {
      if (res.data.errno === 0) {
        setClassifyName(res.data.data.classifyName);
        setInstructions(res.data.data.instructions);
        setId(_id);
      }
    });
  };

  async function updateClassify() {
    axios({
      method: "POST",
      url: ServePath.updateClassify,
      data: {
        _id,
        classifyName,
        instructions,
      },
    }).then((res) => {
      setClassifyName("");
      setInstructions("");
      setVisible(false);
      getClassiys();
      setType("新增分类");
    });
  }

  const handleOk = () => {
    if (type === "编辑分类") {
      updateClassify();
    } else {
      addClassify();
    }
  };

  const onShowModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setClassifyName("");
    setInstructions("");
    setVisible(false);
  };

  const onChaneClassifyName = (e) => {
    setClassifyName(e.target.value);
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
          defaultValue={classifyName}
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
      <div className="classify">
        {classifys.map((item, index) => {
          return (
            <div key={index} className="classofy__card">
              <h3>{item.classifyName}</h3>
              <p>{item.instructions}</p>
              <div className="buttons">
                <span onClick={() => getClassifyById(item._id)}>edit</span>
                <span onClick={() => delClassify(item._id)}>del</span>
              </div>
            </div>
          );
        })}
        <div className="classofy__card-add" onClick={onShowModal}>
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
