import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import ServerPath from "../../config/api"

function Login({ history }) {
  const [type, setType] = useState("Login");
  const [username, setUaername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUaername("");
    setPassword("");
  }, [type]);

  const onChangeLogin = () => {
    if (type === "Login") {
      setType("Regist");
    } else {
      setType("Login");
    }
  };

  const onInputUsername = (e) => {
    setUaername(e.target.value);
  };

  const onInputPassword = (e) => {
    setPassword(e.target.value);
  };

  async function submit() {
    if (type === "Login") {
      axios
        .post(ServerPath.login, {
          username,
          password,
        })
        .then((res) => {
          if (res.data.errno === 0) {
            history.push("/home");
          }
        });
    } else {
      axios
        .post(ServerPath.register, {
          username,
          password,
        })
        .then((res) => {
          if (res.data.errno === 0) {
            setType("Login");
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <div className="login__container">
      <div className="left-container">
        <div className="title">
          <span>{type}</span>
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
          <span className="regist" onClick={onChangeLogin}>
            {type === "Login" ? "Regist" : "Login"}
          </span>
        </div>
        <div className="action-container">
          <span className="submit" onClick={submit}>
            {type}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
