import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("Login Successful:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("Login Failed:", err);
      setError(err.response.data.message);
    }
  };
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ padding: "10px", width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ padding: "10px", width: "100%" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {/* Display messages based on API response */}
      {success && <p style={{ color: "green" }}>Login successful!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
