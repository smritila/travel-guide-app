import React from "react";
import "./Footer.css"; // Assuming a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Discover</h3>
          <p><a href="#">Home</a></p>
          <p><a href="#">About</a></p>
          <p><a href="#">Tour</a></p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M8 0a5.53 5.53 0 0 0-5.5 5.5c0 3.086 4.686 9.04 5.218 9.84.245.365.813.365 1.058 0C8.814 14.54 13.5 8.586 13.5 5.5A5.53 5.53 0 0 0 8 0zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
            Address: 123 Street Name, City
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"/>
              <path d="M.05 4.555L8 9.414l7.95-4.859L8 1 0 .994V4.555z"/>
            </svg>
            Email: support@bookyourguide.com
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
              <path d="M3.654 1.328a1.745 1.745 0 0 1 2.906-.326l.549.549c.236.236.274.593.098.858l-.07.094a3.473 3.473 0 0 0-.517 1.85c0 1.198.676 2.27 1.635 3.229.959.959 2.031 1.635 3.229 1.635a3.473 3.473 0 0 0 1.85-.517l.094-.07c.265-.176.622-.138.858.098l.549.549c.641.641.629 1.707-.326 2.906l-.7.7a2.745 2.745 0 0 1-3.094.489c-.412-.174-.83-.362-1.25-.563-.798-.39-1.634-.851-2.403-1.42a16.435 16.435 0 0 1-3.298-3.298c-.569-.769-1.03-1.605-1.42-2.403a12.42 12.42 0 0 1-.563-1.25 2.745 2.745 0 0 1 .489-3.094l.7-.7z"/>
            </svg>
            Phone: +123 456 7890
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Book Your Guide. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
