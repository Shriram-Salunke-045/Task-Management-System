import { useEffect, useState } from "react";
import api from "../services/api";



function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
      alert("Failed to load tasks");
    }
  };

  const createTask = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/tasks",
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    setDescription("");

    fetchTasks();

    alert("Task Created Successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to create task");
  }
};

const deleteTask = async (id) => {
  if (!window.confirm("Are you sure you want to delete this task?")) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await api.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();

    alert("Task deleted successfully");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to delete task");
  }
};

  return (
    <div className="container mt-5">
      <h2>Task List</h2>

      <form onSubmit={createTask} className="mb-4">

  <input
    className="form-control mb-2"
    placeholder="Task Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />

  <textarea
    className="form-control mb-2"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <button className="btn btn-success">
    Create Task
  </button>

</form>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created By</th>
<th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
    <td>{task.id}</td>
    <td>{task.title}</td>
    <td>{task.status}</td>
    <td>{task.createdBy}</td>

    <td>
        <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(task.id)}
        >
            Delete
        </button>
    </td>
</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;