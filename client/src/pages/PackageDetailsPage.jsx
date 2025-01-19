import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, Button, Offcanvas, Form, Table } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import axiosInstance from "../axiosConfig";

function PackageDetailsPage() {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    persons: 1,
    guide: null
  });
  const [guides, setGuides] = useState([]); // Guides list with names and reviews

  const navigate = useNavigate();

  // Fetch package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axiosInstance.get(`/packages/${id}`);
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
        setError(
          err.message || "Something went wrong! Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGuides = async () => {
      try {
        const response = await axiosInstance.get(`/guides`);
        const guides = response.data;
        setGuides(guides || []);
      } catch (err) {
        console.error("Error fetching guides:", err);
      }
    };

    fetchPackageDetails();
    fetchGuides();
  }, [id]);

  const handleShowDrawer = () => setShowDrawer(true);
  const handleCloseDrawer = () => setShowDrawer(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBookingConfirmation = () => {
    sessionStorage.setItem(
      "bookingData",
      JSON.stringify({ formData, packageDetails })
    );
    navigate("/finalise-booking");
  };

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
      <h1 className="text-left mb-4">{packageDetails.title}</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <Carousel>
            {packageDetails.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-6 col-md-4">
          <h3>Package Details</h3>
          <p>
            <strong>State:</strong> {packageDetails.state_name}
          </p>
          <p>
            <strong>Place:</strong> {packageDetails.place_name}
          </p>
          <p>{packageDetails.description}</p>
          <h4 className="text-success">Price: ₹{packageDetails.price}</h4>
          <Button variant="primary" className="mt-3" onClick={handleShowDrawer}>
            Check Availability
          </Button>
        </div>
      </div>

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

      {/* Drawer for Booking */}
      <Offcanvas
        show={showDrawer}
        onHide={handleCloseDrawer}
        placement="end"
        style={{ width: "700px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Book Your Package</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Persons</Form.Label>
              <Form.Control
                type="number"
                name="persons"
                min="1"
                value={formData.persons}
                onChange={handleChange}
              />
            </Form.Group>
            <h5 className="mt-4">Choose a Guide</h5>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Phone</th>
                  <th>Experience</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {guides.map((guide, index) => (
                  <tr key={index}>
                    <td>{guide.name}</td>
                    <td>
                      {
                        <>
                          <Rating
                            initialValue={guide.averageRating}
                            size={15}
                            allowHalfIcon
                            readonly
                          />
                          <small className="ms-2">
                            ( {`${guide.reviewCount} ratings`} )
                          </small>
                        </>
                      }
                    </td>
                    <td>{guide.phone}</td>
                    <td>{guide.experience}</td>
                    <td>
                      <Form.Check
                        type="radio"
                        name="guide"
                        value={guide.id}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            guide: guide
                          }))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={handleBookingConfirmation}
              disabled={!formData.guide}
            >
              Confirm Booking
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default PackageDetailsPage;
