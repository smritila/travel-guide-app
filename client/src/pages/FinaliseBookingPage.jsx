import React, { useState } from "react";
import "./MyBooking.css";

const FinaliseBookingPage = () => {
  const [bookings, setBookings] = useState([
    { id: 1, name: "John Doe", guide: "Historical Tour", date: "2025-01-10" },
    { id: 2, name: "Smrithika", guide: "Nature Walk", date: "2025-01-15" },
    {id: 3, name: "Sinchana", guide: "Beach peace", date: "2025-03-15"},
    {id: 4, name: "Reena", guide: "Mountain hill", date: "2025-04-12"},
  ]);

  const [newBooking, setNewBooking] = useState({ name: "", guide: "", date: "" });
  const [editing, setEditing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const addBooking = () => {
    if (newBooking.name && newBooking.guide && newBooking.date) {
      setBookings([
        ...bookings,
        { id: Date.now(), ...newBooking },
      ]);
      setNewBooking({ name: "", guide: "", date: "" });
    }
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const editBooking = (booking) => {
    setEditing(true);
    setCurrentBooking(booking);
    setNewBooking(booking);
  };

  const updateBooking = () => {
    setBookings(
      bookings.map((booking) =>
        booking.id === currentBooking.id ? { ...currentBooking, ...newBooking } : booking
      )
    );
    setEditing(false);
    setNewBooking({ name: "", guide: "", date: "" });
    setCurrentBooking(null);
  };

  return (
    <div className="container">
      <header>
        <h1>Book-Your-Guide - Manage Bookings</h1>
      </header>

      <section className="form-section">
        <h2>{editing ? "Edit Booking" : "Add Booking"}</h2>
        <div className="form">
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={newBooking.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="guide"
            placeholder="Guide Name"
            value={newBooking.guide}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            value={newBooking.date}
            onChange={handleInputChange}
          />
          <button className="btn" onClick={editing ? updateBooking : addBooking}>
            {editing ? "Update" : "Add Booking"}
          </button>
        </div>
      </section>

      <section className="list-section">
        <h2>Bookings List</h2>
        {bookings.length > 0 ? (
          <ul className="booking-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="booking-item">
                <div className="booking-info">
                  <strong>{booking.name}</strong> booked <em>{booking.guide}</em> on {booking.date}
                </div>
                <div className="booking-actions">
                  <button className="btn edit-btn" onClick={() => editBooking(booking)}>
                    Edit
                  </button>
                  <button className="btn delete-btn" onClick={() => deleteBooking(booking.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings available.</p>
        )}
      </section>
    </div>
  );
};

export default FinaliseBookingPage;
