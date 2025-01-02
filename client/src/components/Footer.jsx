import React from "react";
import "./Footer.css"; // Assuming a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Us Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Book Your Guide is your trusted platform for seamless travel
            bookings and guidance. Our mission is to make your travel experience
            memorable and hassle-free.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:support@bookyourguide.com">
              support@bookyourguide.com
            </a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+123 456 7890</a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Book Your Guide. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
