import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
function FinaliseBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, packageDetails } = location.state || {};

  if (!formData || !packageDetails) {
    return (
      <div className="text-center my-5">
        <div className="alert alert-danger">
          Missing booking details. Please go back and try again.
        </div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const handleConfirmBooking = () => {
    // Replace this with the actual API call for confirming the booking
    alert("Booking Confirmed!");
    navigate("/");
  };

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
            <strong>Price:</strong> ₹{packageDetails.price}
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
        >
          Confirm Booking
        </Button>
        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => navigate(-1)}
          className="px-5 ms-3"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default FinaliseBookingPage;
