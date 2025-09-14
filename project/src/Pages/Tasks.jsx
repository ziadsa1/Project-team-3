import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./pages.module.css"
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
      } catch {
        setTasks([]);
      }
    }
  }, [username, navigate]);

  function saveTasks (updatedTasks) {
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
  };
  function addTask() {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      task: newTask,
      date: today,
    };
    saveTasks([...tasks, task]);
    setNewTask("");
  };

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
                {task.task}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tasks;
