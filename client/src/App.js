import "./App.css";
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Home />} />
          <Route path="/packages/:id" element={<PackageDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/finalise-booking" element={<FinaliseBookingPage />} />
          <Route path="/manage-bookings" element={<ManageBookingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
