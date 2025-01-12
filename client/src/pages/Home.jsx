import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import "./Home.css";
import Card from "react-bootstrap/Card";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await axiosInstance.get("/packages");
        if (data && Array.isArray(data)) {
          setPackages(data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch travel packages");
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
          {packages
            .filter((pkg) => pkg.image)
            .map((pkg) => {
              /* <div key={pkg._id} className="destination">
                <img src={pkg.image} alt={pkg.place_name} />
                <h3>
                  {pkg.place_name}, {pkg.state_name}
                </h3>
                <p>{pkg.title}</p>
                <p className="price">Starting from ₹{pkg.price}</p>
              </div> */
              return (
                <Card key={pkg._id}>
                  <Card.Img
                    variant="top"
                    src={pkg.image}
                    alt={pkg.place_name}
                    height={200}
                  />
                  <Card.Body>
                    <Card.Title>
                      {pkg.place_name}, {pkg.state_name}
                    </Card.Title>
                    <Card.Text>{pkg.title.slice(0, 50)}</Card.Text>
                    <Card.Text className="price">
                      Starting from ₹{pkg.price}
                    </Card.Text>
                    <Link
                      to={`/packages/${pkg._id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Home;
