// import React, { useState, useEffect } from "react";
// import {
//   Tabs,
//   Tab,
//   Button,
//   Spinner,
//   Alert,
//   Modal,
//   Form,
//   Table,
// } from "react-bootstrap";

// import BookingCard from "../components/BookingCard";
// import axiosInstance from "../axiosConfig";

// function ManageBookingsPage() {
//   const [loading, setLoading] = useState(false);
//   const [upcomingBookings, setUpcomingBookings] = useState([]);
//   const [completedBookings, setCompletedBookings] = useState([]);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [reviewData, setReviewData] = useState({
//     guideRating: "",
//     review: "",
//     //date: "",
//   });

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setReviewData({ guideRating: "", review: "" });
//   };

//   const handleOpenModal = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmitReview = () => {
//     console.log("Submitting Review:", {
//       booking: selectedBooking,
//       ...reviewData,
//     });
//     // Logic to handle form submission (e.g., API call) can be added here

//     handleCloseModal();
//   };

//   useEffect(() => {
//     const fetchBookings = async (status = "NOT_COMPLETED") => {
//       try {
//         const bookings = await axiosInstance.get("/booking", {
//           params: { status },
//         });
//         if (status === "NOT_COMPLETED") {
//           setUpcomingBookings(bookings);
//         } else {
//           setCompletedBookings(bookings);
//         }
//       } catch (err) {
//         setError("Failed to load bookings. Please try again later.");
//       }
//     };

//     setLoading(true);
//     Promise.all([
//       fetchBookings("NOT_COMPLETED"),
//       fetchBookings("COMPLETED"),
//     ]).then(() => {
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div className="container py-5">
//       <h1 className="text-center mb-4">Manage Bookings</h1>

//       {loading && (
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}

//       {error && (
//         <Alert variant="danger" className="text-center">
//           {error}
//         </Alert>
//       )}

//       {!loading && !error && (
//         <Tabs defaultActiveKey="upcoming" id="bookings-tabs" className="mb-3">
//           <Tab eventKey="upcoming" title="Upcoming Bookings">
//             {upcomingBookings.length > 0 ? (
//               upcomingBookings.map((booking) => (
//                 <BookingCard
//                   key={booking.id}
//                   booking={booking}
//                   onComplete={() => handleOpenModal(booking)}
//                 />
//               ))
//             ) : (
//               <Alert variant="info" className="text-center">
//                 No upcoming bookings found.
//               </Alert>
//             )}
//           </Tab>
//           <Tab eventKey="completed" title="Completed Bookings">
//             {completedBookings.length > 0 ? (
//               completedBookings.map((booking) => (
//                 <BookingCard key={booking.id} booking={booking} />
//               ))
//             ) : (
//               <Alert variant="info" className="text-center">
//                 No completed bookings found.
//               </Alert>
//             )}
//           </Tab>
//         </Tabs>
//       )}

//       <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Complete Booking</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Table striped bordered hover>
//               <tbody>
//                 <tr>
//                   <td>Guide Rating</td>
//                   <td>
//                     <Form.Control
//                       type="number"
//                       name="guideRating"
//                       min="1"
//                       max="5"
//                       value={reviewData.guideRating}
//                       onChange={handleInputChange}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Review</td>
//                   <td>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       name="review"
//                       value={reviewData.review}
//                       onChange={handleInputChange}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSubmitReview}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default ManageBookingsPage;

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
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import BookingCard from "../components/BookingCard";
import axiosInstance from "../axiosConfig";

function ManageBookingsPage() {
  const [loading, setLoading] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewData, setReviewData] = useState({
    guideRating: 0,
    review: "",
  });

  const handleCloseModal = () => {
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

  const handleSubmitReview = () => {
    console.log("Submitting Review:", {
      booking: selectedBooking,
      ...reviewData,
    });
    // Logic to handle form submission (e.g., API call) can be added here

    handleCloseModal();
  };

  useEffect(() => {
    const fetchBookings = async (status = "NOT_COMPLETED") => {
      try {
        const bookings = await axiosInstance.get("/booking", {
          params: { status },
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
      fetchBookings("COMPLETED"),
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
              upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onComplete={() => handleOpenModal(booking)}
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
                <BookingCard key={booking.id} booking={booking} />
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
          <Modal.Title>Complete Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                      showTooltip
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
    </div>
  );
}

export default ManageBookingsPage;
