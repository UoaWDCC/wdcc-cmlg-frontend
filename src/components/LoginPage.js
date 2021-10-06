import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styles from "../css/LoginPage.module.css";

const LoginForm = (props) => {
  const { storeToken } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [body, setBody] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      let url = "https://cmlgbackend.wdcc.co.nz/api/login";
      fetch(url, {
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          // handle token
          console.log(result);
          storeToken(result);
          setSuccess(true);
        })
        .catch((error) => {
          setError(error);
          setSuccess(false);
        });
    } else {
      setFirstRender(false);
    }
  }, [body]);

  function handleSubmit() {
    const newBody = {
      username: username,
      password: password,
    };

    setBody(newBody);
  }

  return (
    <div
      className={` ${styles.container} ${props.darkMode ? "dark-mode" : ""} `}
    >
      {success ? (
        <div>
          Logined successfully, please go to setting to upload documents.
        </div>
      ) : (
        <>
          <div className={styles.header}>Login</div>
          <div className={styles.form}>
            <div className={styles["form-group"]}>
              <label htmlFor="username">Username</label>
              <input
                value={username}
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
                value={password}
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
          {error ? (
            <div
              className={
                props.darkMode ? styles.textDangerDark : styles.textDangerLight
              }
            >
              {error}
            </div>
          ) : null}
          <div className={styles.footer}>
            <button
              type="button"
              className={` btn btn-outline-dark ${
                props.darkMode ? styles["btn-dark-mode"] : ""
              } }`}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
