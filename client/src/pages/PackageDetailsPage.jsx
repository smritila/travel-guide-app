import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

function PackageDetailsPage() {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        console.log("Fetching package details for ID:", id);
        const response = await axiosInstance.get(`/packages/${id}`);
        console.log("Fetched Package Details:", response);

        // Ensure that the expected fields exist in the response
        if (
          response &&
          response.title &&
          response.images &&
          response.description &&
          response.highlights &&
          response.includes
        ) {
          setPackageDetails(response);
        } else {
          throw new Error("Invalid data format received from API.");
        }
      } catch (err) {
        console.error("Error fetching package details:", err);
        setError(
          err.message || "Something went wrong! Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (isLoading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!packageDetails) {
    return (
      <div className="text-center my-5">No package details available.</div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">{packageDetails.title}</h1>
      <div className="row">
        {/* Carousel for Images */}
        <div className="col-md-8">
          <div
            id="packageCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {packageDetails.images.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={img}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#packageCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#packageCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Package Details */}
        <div className="col-md-4">
          <h3>Package Details</h3>
          <p>
            <strong>State:</strong> {packageDetails.state_name}
          </p>
          <p>
            <strong>Place:</strong> {packageDetails.place_name}
          </p>
          <p>{packageDetails.description}</p>
          <h4 className="text-success">Price: ₹{packageDetails.price}</h4>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="mt-5">
        <h3>Highlights</h3>
        <ul className="list-group">
          {packageDetails.highlights.map((highlight, index) => (
            <li key={index} className="list-group-item">
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Includes Section */}
      <div className="mt-5">
        <h3>What's Included</h3>
        <ul className="list-group">
          {packageDetails.includes.map((item, index) => (
            <li key={index} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PackageDetailsPage;
