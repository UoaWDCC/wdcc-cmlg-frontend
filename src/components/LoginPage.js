import React, { useState } from "react";
import "../css/LoginPage.css";

const onSubmit = () => {
  // TODO: Send username and password to backend login api
};

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={` container ${props.darkMode ? "dark-mode" : ""} `}>
      <div className="header">Login</div>
      <div className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          className={`btn ${props.darkMode ? "dark-mode-btn" : ""} `}
          onClick={onSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
