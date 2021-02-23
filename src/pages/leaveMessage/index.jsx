import React, { useEffect, useState } from "react";
import axios from "axios";
import serverPath from "../../config/api";

const LeaveMessage = () => {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    getLeaveMessageList();
  }, []);

  async function getLeaveMessageList() {
    axios
      .get(serverPath.getLeaveMessage)
      .then((res) => {
        setLeaveData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="leave__message">
      <div className="leave__message-list">
        <div className="leave-item-header">
          <span>邮箱</span>
          <span>昵称</span>
          <span>时间</span>
          <span>操作</span>
        </div>
        {leaveData.map((item) => (
          <div className="leave-item">
            <span>{item.email}</span>
            <span>{item.nickname}</span>
            <span>{item.createdAt}</span>
            <span>删除</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveMessage;
