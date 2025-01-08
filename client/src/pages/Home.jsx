import React from 'react';
import './Home.css'; // Include your custom CSS file for styling

const Home = () => {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Book-Your-Guide</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="btn-primary">Sign In</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore the World with Book-Your-Guide</h1>
          <p>Book your next adventure with ease and confidence.</p>
          <button className="btn-secondary">Start Your Journey</button>
          {/* <img src="/images/Explore.jpg" alt="Beautiful Landscape" className="hero" /> */}
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="destinations">
        <h2>Featured Destinations</h2>
        <div className="destination-grid">
          <div className="row">
            <div className="destination">
              <img src="/images/karnataka.jpg" alt="Karnataka" />
              <h3>Karnataka</h3>
              <p>Uncover the charm of Karnataka – where heritage meets innovation!</p>
            </div>
            <div className="destination">
              <img src="/images/rajasthan.jpg" alt="Rajasthan" />
              <h3>Rajasthan</h3>
              <p>Step into Rajasthan – the land of royal palaces and timeless deserts!</p>
            </div>
          </div>
          <div className="row">
            <div className="destination">
              <img src="/images/kerala.jpg" alt="Kerala" />
              <h3>Kerala</h3>
              <p>Sail through Kerala – God’s Own Country, adorned with serene backwaters!</p>
            </div>
            <div className="destination">
              <img src="/images/goa.jpg" alt="Goa" />
              <h3>Goa</h3>
              <p>Experience the magic of Goa – golden beaches and vibrant nightlife await!</p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
