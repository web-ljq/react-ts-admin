import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import ServerPath from "../../config/api";
import { Link } from "react-router-dom";

function Register({ history }) {
  const [username, setUaername] = useState("");
  const [password, setPassword] = useState("");

  const onInputUsername = (e) => {
    setUaername(e.target.value);
  };

  const onInputPassword = (e) => {
    setPassword(e.target.value);
  };

  async function submit() {
    axios
      .post(ServerPath.register, {
        username,
        password,
      })
      .then((res) => {
        if (res.data.errno === 0) {
          history.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="login__container">
      <div className="left-container">
        <div className="title">
          <span>Register</span>
        </div>
        <div className="input-container">
          <input
            onChange={onInputUsername}
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={username}
          />
          <input
            onChange={onInputPassword}
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={password}
          />
        </div>
        <div className="message-container">
          <span>forget password</span>
        </div>
      </div>
      <div className="right-container">
        <div className="regist-container">
          <span className="regist">
            <Link to="/">Login</Link>
          </span>
        </div>
        <div className="action-container">
          <span className="submit" onClick={submit}>
            Regist
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
