import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Carousel } from "react-bootstrap";

import "./Home.css";

import goa from "../assets/images/goa.jpg";
import Rajsthan1 from "../assets/images/Rajasthan.jpg";
import kerala from "../assets/images/Kerala.jpg";

import axiosInstance from "../axiosConfig";

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
    <Container>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={goa}
            alt="First slide"
            height={500}
          />
          <Carousel.Caption>
            <h1>Explore the World with Book-Your-Guide</h1>
            <p>Book your next adventure with ease and confidence.</p>
            <button className="btn btn-secondary">Start Your Journey</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Rajsthan1}
            alt="Second slide"
            height={500}
          />
          <Carousel.Caption>
            <h1>Discover Hidden Gems</h1>
            <p>Find unique destinations for unforgettable experiences.</p>
            <button className="btn btn-secondary">Explore Now</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={kerala}
            alt="Third slide"
            height={500}
          />
          <Carousel.Caption>
            <h1>Plan Your Perfect Vacation</h1>
            <p>Travel the world with our expertly curated packages.</p>
            <button className="btn btn-secondary">Get Started</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section id="destinations" className="destinations">
        <h2>Featured Destinations</h2>
        <div className="destination-grid">
          {packages
            .filter((pkg) => pkg.image)
            .map((pkg) => (
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
                  <Link to={`/packages/${pkg._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            ))}
        </div>
      </section>
    </Container>
  );
};

export default Home;
