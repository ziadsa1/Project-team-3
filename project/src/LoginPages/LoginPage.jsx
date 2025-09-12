import React, { useState } from "react";
import "./Pages.module.css";
import styles from "./Pages.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export let loggedIn = false;
function LoginPage() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  async function login(e) {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      let loggedIn = true;
      navigate("/notes");
    }
  }
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginForm}>
        <form onSubmit={login}>
          <h1>Login</h1>
          <div className={styles.inputbox}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setusername(e.target.value)}
              required
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles.inputbox}>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <FaLock className={styles.icon} />
          </div>
          <div className={styles.remember}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className={styles.register}>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
