import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./pages.module.css";

function Chatbot() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }
    inputRef.current?.focus();
  }, [username, navigate]);

  async function ask(question) {
    setMessages((prev) => [...prev, { role: "human", message: question }]);
    try {
      const res = await fetch("http://127.0.0.1:5001/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", message: data.answer }]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    ask(input);
    setInput("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.chatLayout}>
      {/* NavBar always stays on the right */}
      <div className={styles.navWrapper}>
        <NavBar />
      </div>

      {/* Chatbot area fills the rest */}
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.role === "human" ? styles.userMsg : styles.botMsg}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <form className={styles.inputArea} onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            placeholder="Ask Me!"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
