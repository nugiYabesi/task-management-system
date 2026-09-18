import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

const EMPTY_FORM = { title: "", description: "", status: "Pending", priority: "Medium" };

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const data = await getTasks(filter === "All" ? undefined : filter);
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Could not reach the backend. Is the server running on port 5000?");
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      if (editingId) {
        await updateTask(editingId, form);
      } else {
        await createTask(form);
      }
      resetForm();
      loadTasks();
    } catch (err) {
      setError("Failed to save task.");
    }
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
    });
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this task?")) return;

  try {
    await deleteTask(id);
    loadTasks();
  } catch (err) {
    setError("Failed to delete task.");
  }
};

  const toggleStatus = async (task) => {
    await updateTask(task.id, {
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    loadTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="task-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <div className="form-row">
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <button type="submit">{editingId ? "Update Task" : "Add Task"}</button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="filters">
        {["All", "Pending", "Completed"].map((s) => (
          <button
            key={s}
            className={filter === s ? "active" : ""}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((task) => (
          <li key={task.id} className={`task-item priority-${task.priority.toLowerCase()}`}>
            <div>
              <strong className={task.status === "Completed" ? "done" : ""}>
                {task.title}
              </strong>
              <p>{task.description}</p>
              <small>
                {task.priority} priority · {task.status} ·{" "}
                {new Date(task.createdAt).toLocaleString()}
              </small>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleStatus(task)}>
                Mark {task.status === "Pending" ? "Completed" : "Pending"}
              </button>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
