import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import serverPath from "../../config/api";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [username, setUaername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUaername("");
    setPassword("");
  }, []);

  const onInputUsername = (e) => {
    setUaername(e.target.value);
  };

  const onInputPassword = (e) => {
    setPassword(e.target.value);
  };

  async function submit() {
    axios
      .post(serverPath.login, {
        username,
        password,
      })
      .then((res) => {
        if (res.data.errno === 0) {
          history.push("/admin/home");
        }
      });
  }

  return (
    <div className="login__container">
      <div className="left-container">
        <div className="title">
          <span>Login</span>
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
            <Link to="/register">Regist</Link>
          </span>
        </div>
        <div className="action-container">
          <span className="submit" onClick={submit}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
