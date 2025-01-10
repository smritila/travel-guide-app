import React, { useState, useContext } from "react";
import { redirect } from "react-router-dom";
import "./Login.css";
import axiosInstance from "../axiosConfig"; // Import the configured Axios instance
import { AuthContext } from "../hooks/AuthProvider";

function Login() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(false); // State for success status
  const { login } = useContext(AuthContext);

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

      // Since the interceptor returns response.data, check for token directly
      if (response.token) {
        console.log("Login successful:", response);

        // Store the token in sessionStorage
        login(response.token);
        setSuccess(true); // Set success state
        setTimeout(() => {
          redirect("/manage-bookings"); // Redirect to the manage bookings page
        }, 2000); // Redirect after 2 seconds
      } else {
        console.error("Token not found in response:", response);
        throw new Error("Server did not return a valid token.");
      }
    } catch (err) {
      console.error("Error during login:", err); // Debugging: Log error details
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light byg-auth-container">
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
