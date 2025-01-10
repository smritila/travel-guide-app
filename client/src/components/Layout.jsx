import React from "react";
import TheNavBar from "./TheNavbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <TheNavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
