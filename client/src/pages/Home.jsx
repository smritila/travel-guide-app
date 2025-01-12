import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import './Home.css';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get('/packages');
        if (response.data && Array.isArray(response.data)) {
          setPackages(response.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch travel packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">Book-Your-Guide</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="btn-primary">Sign In</button>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Explore the World with Book-Your-Guide</h1>
          <p>Book your next adventure with ease and confidence.</p>
          <button className="btn-secondary">Start Your Journey</button>
        </div>
      </section>

      <section id="destinations" className="destinations">
        <h2>Featured Destinations</h2>
        <div className="destination-grid">
          {packages.slice(0, 4).map((pkg) => (
            <div key={pkg._id} className="destination">
              <img 
                src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(pkg.place_name)}`} 
                alt={pkg.place_name} 
              />
              <h3>{pkg.place_name}, {pkg.state_name}</h3>
              <p>{pkg.title}</p>
              <p className="price">Starting from ₹{pkg.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

