<<<<<<< HEAD
import React, { useState } from "react";
import "./Register.css"; // Ensure custom CSS for updated design

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User", // Default to 'User'
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fakeApiCall(formData);
      if (response.success) {
        setSuccess("Registration successful! You can now log in.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "User",
        });
      } else {
        setError(response.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const fakeApiCall = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Create Your Account</h2>
        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="User">User</option>
              <option value="Travel Guide">Travel Guide</option>
            </select>
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
=======
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

function Register() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light byg-auth-container">
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="card shadow">
          <div className="card-body">
            <h3 className="text-center mb-4">Register</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select id="role" className="form-select" required>
                  <option value="">Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> a82652cf3d5e8ce5af57fbe95129d7a7a8879693

export default Register;
