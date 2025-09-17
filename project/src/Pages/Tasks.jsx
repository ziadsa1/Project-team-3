import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./pages.module.css";
import { FaDeleteLeft } from "react-icons/fa6";
function Tasks() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const today = new Date().toISOString().split("T")[0];
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const tsks_saved = localStorage.getItem(`tasks_${username}`);
    if (tsks_saved) {
      try {
        setTasks(JSON.parse(tsks_saved));
      } 
      catch {
        setTasks([]);
      }
    }
  }, [username, navigate]);

  function saveTasks(updatedTasks) {
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
  }
  function addTask() {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      task: newTask,
      date: today,
      completed: false
    };
    saveTasks([...tasks, task]);
    setNewTask("");
  }
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
  }
  function setTask(id) {
    const updatedTasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks(updatedTasks);
  }
  return (
    <div className={styles.page}>
      <div>
        <NavBar />
      </div>
      <div className={styles.content}>
        <div className={styles.inputtask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={addTask}>Add</button>
        </div>

        {tasks.length === 0 ? (
          <p>No tasks.</p>
        ) : (
          <ul className={styles.list}>
            {tasks.map((task) => (
              <li key={task.id}>
                <span>{task.task}</span>
                <div className={styles.actions}>
                  <input type="checkbox" className={styles.checkbtn} checked={task.completed} id={`check-${task.id}`} onChange={() => setTask(task.id)}/>
                  <button 
                    className={styles.iconbtn}
                    onClick={() => deleteTask(task.id)} 
                  >
                    <FaDeleteLeft />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tasks;
