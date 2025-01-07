import React, { useState } from "react";
import "./Login.css";
import axiosInstance from "../axiosConfig"; // Import the configured Axios instance

function Login() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(false); // State for success status

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors
    setSuccess(false); // Clear success status

    try {
      // Make API call using the configured axios instance
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Handle successful response
      console.log("Login successful:", response.data);
      setSuccess(true); // Set success state
    } catch (err) {
      setError(err.message); // Set error state
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light byg-auth-container">
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {/* Display success or error messages */}
          {success && (
            <p className="text-success text-center mt-3">Login successful!</p>
          )}
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
