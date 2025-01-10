import React from "react";
import TheNavBar from "./TheNavbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

function Layout({ children }) {
  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0">
      <header>
        <TheNavBar />
      </header>
      <main className="flex-grow-1">{children}</main>
      <footer>
        <Footer />
      </footer>
    </Container>
  );
}

export default Layout;
