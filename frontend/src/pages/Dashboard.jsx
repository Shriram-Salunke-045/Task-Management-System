import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load dashboard");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow">
            <h4>{stats.totalUsers}</h4>
            <p>Total Users</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow">
            <h4>{stats.totalTasks}</h4>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow">
            <h4>{stats.completedTasks}</h4>
            <p>Completed Tasks</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center p-3 shadow">
            <h4>{stats.pendingTasks}</h4>
            <p>Pending Tasks</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/tasks" className="btn btn-primary">
          Manage Tasks
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;