import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../axiosConfig";
import { AuthContext } from "../hooks/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.token) {
        login(response.token);
        setSuccess(true);
        setTimeout(() => {
          navigate("/manage-bookings");
        }, 2000);
      } else {
        throw new Error("Server did not return a valid token.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light byg-auth-container">
      <div className="container w-25">
        <h2 className="text-center mb-4">Login to Your Account</h2>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">Login successful!</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          <small className="text-muted">
            Don't have an account? <Link to="/register">Register here</Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
