import React, { useState } from "react";
import styles from "../css/LoginPage.module.css";

const onSubmit = () => {
  // TODO: Send username and password to backend login api
};

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={` ${styles.container} ${props.darkMode ? "dark-mode" : ""} `}>
      <div className={ styles.header }>Login</div>
      <div className={styles.form}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username</label>
          <input
            className={styles["login-input"]}
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            className={styles["login-input"]}
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <button
          type="button"
          className={` btn ${props.darkMode ? styles["dark-mode-btn"] : ""} }`}
          onClick={onSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
