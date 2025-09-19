import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./Pages.module.css";
function Pomodoro() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [mode, setMode] = useState("work");
  const [sessionCount, setSessionCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const radius = 140;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!username) navigate("/");
  }, [username, navigate]);

  useEffect(() => {
    let id;
    if (running && timeLeft > 0) {
      id = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setTimerId(id);
    } else if (timeLeft === 0) {
      setRunning(false);
      EndCycle();
    }
    return () => clearInterval(id);
  }, [running, timeLeft]);

  function EndCycle() {
    setShowPopup(true);
    if (mode === "work") {
      setSessionCount((prev) => prev + 1);
      if ((sessionCount + 1) % 4 === 0) {
        setMode("long");
        setTimeLeft(30 * 60);
      } else {
        setMode("short");
        setTimeLeft(5 * 60);
      }
    } else {
      setMode("work");
      setTimeLeft(25 * 60);
    }
  }

  function startTimer() {
    if (!running) setRunning(true);
  }

  function pauseTimer() {
    clearInterval(timerId);
    setRunning(false);
  }

  function resetTimer() {
    clearInterval(timerId);
    setRunning(false);
    setMode("work");
    setSessionCount(0);
    setTimeLeft(25 * 60);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (num) => num.toString().padStart(2, "0");
  const totalTime = mode === "work" ? 1500 : mode === "short" ? 300 : 1800;
  return (
    <div className={styles.page}>
      <div>
        <NavBar />
      </div>
      <div className={styles.contentPomo}>
        <h1 className={styles.title}>
          Pomodoro (
          {mode === "work"
            ? "Work"
            : mode === "short"
            ? "Short Break"
            : "Long Break"}
          )
        </h1>
        <div className={styles.timerWrapper}>
          <svg className={styles.progressRing} width="300" height="300">
            <circle className={styles.bg} cx="150" cy="150" r="140" />
            <circle
              className={styles.progress}
              cx="150"
              cy="150"
              r="140"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: (timeLeft / totalTime) * circumference
              }}
            />
          </svg>
          <div className={styles.timeDisplay}>
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={startTimer}>Start</button>
          <button onClick={pauseTimer}>Pause</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
        <p className={styles.note}>
          focus for 25 minutes, then enjoy a short break. Repeat 4 times, then
          take a long break!
        </p>
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Time Up!</h2>
            <p>
              {mode === "work"
                ? "Take a break!"
                : mode === "shortBreak"
                ? "Break over! back to work!"
                : "Break over! start Working!"}
            </p>
            <button onClick={() => setShowPopup(false)}>Okay!</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
