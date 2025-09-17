import React, { useEffect, useState } from "react";
import "./Pages.module.css";
import styles from "./Pages.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { InputLogin } from "../components/Inputlogin";
function Forgot_Password() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  async function sendCode() {
    try {
      const res = await fetch("http://127.0.0.1:5001/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setMessage("data.message");
      }
    } catch (err) {
      setMessage("sending code");
    }
  }

  async function verifyCode() {
    try {
      const res = await fetch("http://127.0.0.1:5001/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (data.verified) {
        setStep(3);
        setMessage("Code verified! Enter new password.");
      } else {
        setStep(2);
        setMessage("Wrong Verification Code");
      }
    } catch {
      setMessage("verifying code");
    }
  }

  async function resetPassword() {
    try {
      const res = await fetch("http://127.0.0.1:5001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      setStep(1);
      navigate("/");
    } catch {
      setMessage("resetting password");
    }
  }
  return (
    <div className={styles.mainPage}>
      <div className={styles.loginForm}>
        <h1>Forgot Password</h1>
        {message && (
          <div
            className={styles.error}
            style={{ backgroundColor: "lightgreen" }}
          >
            {message}
          </div>
        )}
        

        {step === 1 && (
          <div>
            <InputLogin
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendCode}>
              Send Code
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <InputLogin
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={verifyCode}>
              Verify Code
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <InputLogin
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={resetPassword}>
              Reset Password
            </button>
          </div>
        )}
        <div className={styles.register}>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forgot_Password;
