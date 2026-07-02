import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card p-4 shadow">

            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-3"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <button
                className="btn btn-primary w-100"
                type="submit"
              >
                Login
              </button>

            </form>

            <p className="mt-3 text-center">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;