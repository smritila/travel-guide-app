import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

import { getDateDifference, getFormattedDateAndTime } from "../utility/date";

const BookingCard = ({ booking, reviewSubmitted, onEndTour, onGiveRating }) => (
  <Card key={booking._id} className="mb-3">
    <Card.Body>
      <Card.Title>
        {booking.package_id.title.slice(0, 100).concat("", "...")}
      </Card.Title>
      <Card.Subtitle className="text-muted">
        <span>
          {booking.package_id.place_name.concat(
            ", ",
            booking.package_id.state_name
          )}
        </span>
        <span className="mx-2">
          <strong>&bull;</strong>
        </span>
        <span>
          <strong>Booking ID - </strong> {booking._id}
        </span>
        {booking.status === "NOT_COMPLETED" && (
          <>
            <span className="mx-2">
              <strong>&bull;</strong>
            </span>
            <Badge bg="success">
              {`In ${getDateDifference(booking.date, new Date())} days`}
            </Badge>
          </>
        )}
      </Card.Subtitle>
      <Card.Text></Card.Text>
      <Card.Text></Card.Text>
      <Card.Text>
        <strong>Date:</strong>{" "}
        {getFormattedDateAndTime(booking.date, booking.time)}
      </Card.Text>
      <div className="d-flex align-items-center justify-content-between">
        <Card.Text>
          <strong>Status:</strong> <Badge bg="primary">{booking.status}</Badge>
        </Card.Text>
        <div>
          {booking.status === "NOT_COMPLETED" && (
            <Button variant="warning" size="md" onClick={onEndTour}>
              End Tour
            </Button>
          )}
          {booking.status === "COMPLETED" &&
            (!reviewSubmitted ? (
              <Button variant="success" size="md" onClick={onGiveRating}>
                Give Rating
              </Button>
            ) : (
              <Badge bg="info">Guide Review already submitted</Badge>
            ))}
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default BookingCard;
