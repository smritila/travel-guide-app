import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Table, Spinner, Alert } from "react-bootstrap";

import axiosInstance from "../axiosConfig";

function FinaliseBookingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Retrieve bookingData from sessionStorage
  const bookingData = JSON.parse(sessionStorage.getItem("bookingData"));

  if (!bookingData || !bookingData.formData || !bookingData.packageDetails) {
    return (
      <div className="text-center my-5">
        <div className="alert alert-danger">
          Missing booking details. Please go back and try again.
        </div>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </div>
    );
  }

  const { formData, packageDetails } = bookingData;

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      const payload = {
        guide_id: formData.guide?.id,
        package_id: packageDetails._id,
        date: formData.date,
        time: formData.time,
        status: "NOT_COMPLETED",
      };

      await axiosInstance.post("/booking", payload);
      setSuccess(true);
    } catch (err) {
      console.error("Error confirming booking:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container py-5">
        <Alert variant="success" className="text-center">
          <h4 className="mb-4">🎉 Booking Confirmed! 🎉</h4>
          <p>
            Thank you for choosing us! Your tour booking has been successfully
            confirmed.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              sessionStorage.removeItem("bookingData"); // Clear bookingData
              navigate("/manage-bookings");
            }}
            className="mt-3"
          >
            Go to Manage Bookings
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Finalize Booking</h1>
      <Card>
        <Card.Header className="bg-primary text-white">
          <h4>Package Details</h4>
        </Card.Header>
        <Card.Body>
          <h5>{packageDetails.title}</h5>
          <p>
            <strong>Place:</strong> {packageDetails.place_name}
          </p>
          <p>
            <strong>Price Breakdown:</strong> Adult {formData.persons} X ₹
            {packageDetails.price}
          </p>
          <p>
            <strong>Total Price:</strong> ₹
            {packageDetails.price * formData.persons}
          </p>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header className="bg-secondary text-white">
          <h4>Booking Details</h4>
        </Card.Header>
        <Card.Body>
          <Table bordered>
            <tbody>
              <tr>
                <th>Date</th>
                <td>{formData.date}</td>
              </tr>
              <tr>
                <th>Time</th>
                <td>{formData.time}</td>
              </tr>
              <tr>
                <th>Number of Persons</th>
                <td>{formData.persons}</td>
              </tr>
              <tr>
                <th>Guide</th>
                <td>
                  {formData.guide ? (
                    <>
                      <p>
                        <strong>Name:</strong> {formData.guide.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.guide.email}
                      </p>
                      <p>
                        <strong>Experience:</strong> {formData.guide.experience}{" "}
                        years
                      </p>
                      <p>
                        <strong>Languages:</strong>{" "}
                        {formData.guide.languages.join(", ")}
                      </p>
                    </>
                  ) : (
                    "No guide selected"
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <div className="text-center mt-5">
        <Button
          variant="success"
          size="lg"
          onClick={handleConfirmBooking}
          className="px-5"
          disabled={loading}
        >
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          )}
          <span>Confirm Booking</span>
        </Button>
        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => navigate(`/packages/${packageDetails._id}`)} // Go back to package details page
          className="px-5 ms-3"
          disabled={loading}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default FinaliseBookingPage;
