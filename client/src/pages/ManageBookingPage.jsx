import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, Spinner, Alert } from "react-bootstrap";

import BookingCard from "../components/BookingCard";

import axiosInstance from "../axiosConfig";

function ManageBookingsPage() {
  const [loading, setLoading] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    setLoading(true);
    Promise.all([
      fetchBookings("NOT_COMPLETED"),
      fetchBookings("COMPLETED")
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Manage Bookings</h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Tabs defaultActiveKey="upcoming" id="bookings-tabs" className="mb-3">
          <Tab eventKey="upcoming" title="Upcoming Bookings">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(BookingCard)
            ) : (
              <Alert variant="info" className="text-center">
                No upcoming bookings found.
              </Alert>
            )}
          </Tab>
          <Tab eventKey="completed" title="Completed Bookings">
            {completedBookings.length > 0 ? (
              completedBookings.map(BookingCard)
            ) : (
              <Alert variant="info" className="text-center">
                No completed bookings found.
              </Alert>
            )}
          </Tab>
        </Tabs>
      )}
    </div>
  );
}

export default ManageBookingsPage;
