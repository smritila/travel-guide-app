//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PackageDetailsPage from "./pages/PackageDetailsPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FinaliseBookingPage from "./pages/FinaliseBookingPage";
import ManageBookingPage from "./pages/ManageBookingPage";

import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import AuthProvider from "./hooks/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<Home />} />
            <Route path="/packages/:id" element={<PackageDetailsPage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/finalise-booking"
              element={
                <ProtectedRoute>
                  <FinaliseBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-bookings"
              element={
                <ProtectedRoute>
                  <ManageBookingPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
