import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./pages.module.css"
function Contact() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
        if (!username) {
            navigate("/");
            return;
        }
    }, [username, navigate]);

  return (
    <div className={styles.page}>
      <div>
        <NavBar />
      </div>
      <div className={styles.content}>
        
      </div>
    </div>
  );
}

export default Contact;
