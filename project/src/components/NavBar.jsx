import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./components.module.css";

export default function NavBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
    if (!username) navigate("/");
  }, [username, navigate]);
  
  function logout() {
    localStorage.removeItem("username");
    navigate("/");
  }

  return (
    <div className={styles.navbar}>
      <nav>
        <Link to="/tasks">Tasks</Link>
        <Link to="/pomodoro">Pomodoro</Link>
        <Link to="/chatbot">Chat Bot</Link>
        <Link to="/contact">Contact us</Link>
      </nav>
      <div className={styles.pfp}>
        <div className={styles.userinfo}>
          <FaUserCircle className={styles.pfpicon} />
          <span className={styles.username}>{username}</span>
        </div>
        <button className={styles.outbtn} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}