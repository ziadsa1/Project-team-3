import React, { useState } from "react";
import "./Pages.module.css";
import styles from "./Pages.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export let loggedIn = false;
function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [birthday, setbirthday] = useState("");

  async function register(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, birthday }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/");
      } else alert(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginForm}>
        <form onSubmit={register}>
          <h1>Register</h1>
          <div className={styles.inputbox}>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
          <div className={styles.inputbox}>
            <input
              type="date"
              onChange={(e) => setbirthday(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
