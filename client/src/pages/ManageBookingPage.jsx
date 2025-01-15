import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
  Table,
  Toast
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import BookingCard from "../components/BookingCard";
import axiosInstance from "../axiosConfig";

function ManageBookingsPage() {
  const [showToast, setShowToast] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    guideRating: 0,
    review: ""
  });
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
    setReviewData({ guideRating: 0, review: "" });
  };

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setReviewData((prevData) => ({ ...prevData, guideRating: rating }));
  };

  const handleSubmitReview = async () => {
    try {
      setLoading(true);
      const payload = {
        booking_id: selectedBooking._id,
        guide_id: selectedBooking.guide_id._id,
        rating: reviewData.guideRating,
        review: reviewData.review,
        date: new Date().toISOString()
      };

      const res = await axiosInstance.post("/guides/review", payload);
      if (res.success) {
        setSuccess("Review submitted successfully!");
        setShowToast(true);
      }
    } catch (err) {
      console.error("Failed to submit review:", err.message);
      setError("Failed to submit review. Please try again later.");
    } finally {
      setLoading(false);
      handleCloseModal();
    }
    console.log("Submitting Review:", {
      booking: selectedBooking,
      ...reviewData
    });
    // Logic to handle form submission (e.g., API call) can be added here
  };

  const handleEndTour = (booking) => {
    setSelectedBooking(booking);
    setShowWarningModal(true);
  };

  const handleCloseWarningModal = () => {
    setShowWarningModal(false);
  };

  const fetchBookings = async (status = "NOT_COMPLETED") => {
    try {
      const bookings = await axiosInstance.get("/booking", {
        params: { status }
      });
      if (status === "NOT_COMPLETED") {
        setUpcomingBookings(bookings);
      } else {
        setCompletedBookings(bookings);
      }
    } catch (err) {
      setError("Failed to load bookings. Please try again later.");
    }
  };

  const handleConfirmEndTour = async () => {
    try {
      setLoading(true);
      const API_URL = `/booking/${selectedBooking._id}`;
      const response = await axiosInstance.put(API_URL, {
        status: "COMPLETED"
      });
      if (response.data.status === "COMPLETED") {
        setSuccess("Booking has been completed successfully!");
        setShowToast(true);
        await Promise.all[
          (fetchBookings("NOT_COMPLETED"), fetchBookings("COMPLETED"))
        ];
        setActiveTab("completed");
      }
    } catch (err) {
      console.error("Failed to end tour:", err.message);
      setError("Failed to end tour. Please try again later.");
    } finally {
      setShowWarningModal(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFetching(true);
    Promise.all([
      fetchBookings("NOT_COMPLETED"),
      fetchBookings("COMPLETED")
    ]).then(() => {
      setFetching(false);
    });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Manage Bookings</h1>

      {fetching && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">fetching...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!fetching && !error && (
        <Tabs
          activeKey={activeTab}
          id="bookings-tabs"
          className="mb-3"
          onSelect={(k) => setActiveTab(k)}
        >
          <Tab eventKey="upcoming" title="Upcoming Bookings">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onEndTour={() => handleEndTour(booking)}
                />
              ))
            ) : (
              <Alert variant="info" className="text-center">
                No upcoming bookings found.
              </Alert>
            )}
          </Tab>
          <Tab eventKey="completed" title="Completed Bookings">
            {completedBookings.length > 0 ? (
              completedBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onGiveRating={() => handleOpenModal(booking)}
                  reviewSubmitted={booking.reviewSubmitted}
                />
              ))
            ) : (
              <Alert variant="info" className="text-center">
                No completed bookings found.
              </Alert>
            )}
          </Tab>
        </Tabs>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate your Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Guide Information</h5>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{selectedBooking?.guide_id?.user_id?.name || "N/A"}</td>
                </tr>
                <tr>
                  <td>Contact Number</td>
                  <td>{selectedBooking?.guide_id?.contact?.phone || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Form>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Guide Rating</td>
                  <td>
                    <Rating
                      onClick={handleRatingChange}
                      ratingValue={reviewData.guideRating}
                      size={20}
                      transition
                      allowHalfIcon
                    />
                  </td>
                </tr>
                <tr>
                  <td>Review</td>
                  <td>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="review"
                      value={reviewData.review}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWarningModal} onHide={handleCloseWarningModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>End Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to end the tour for this booking?
          <br />
          <strong>Booking Id</strong> - {selectedBooking?._id}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={loading}
            onClick={handleCloseWarningModal}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            disabled={loading}
            onClick={handleConfirmEndTour}
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
            <span>End Tour</span>
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1050
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{success}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ManageBookingsPage;
