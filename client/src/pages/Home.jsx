// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import axiosInstance from "../axiosConfig";
// // import "./Home.css";
// // import Card from "react-bootstrap/Card";

// // const Home = () => {
// //   const [packages, setPackages] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchPackages = async () => {
// //       try {
// //         const data = await axiosInstance.get("/packages");
// //         if (data && Array.isArray(data)) {
// //           setPackages(data);
// //         } else {
// //           throw new Error("Invalid data format received from API");
// //         }
// //       } catch (err) {
// //         setError(err.message || "Failed to fetch travel packages");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPackages();
// //   }, []);

// //   if (loading) {
// //     return <div className="loading">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="error">Error: {error}</div>;
// //   }

// //   return (
// //     <div className="home">
// //       <section className="hero">
// //         <div className="hero-content">
// //           <h1>Explore the World with Book-Your-Guide</h1>
// //           <p>Book your next adventure with ease and confidence.</p>
// //           <button className="btn-secondary">Start Your Journey</button>
// //         </div>
// //       </section>

// //       <section id="destinations" className="destinations">
// //         <h2>Featured Destinations</h2>
// //         <div className="destination-grid">
// //           {packages
// //             .filter((pkg) => pkg.image)
// //             .map((pkg) => {
// //               /* <div key={pkg._id} className="destination">
// //                 <img src={pkg.image} alt={pkg.place_name} />
// //                 <h3>
// //                   {pkg.place_name}, {pkg.state_name}
// //                 </h3>
// //                 <p>{pkg.title}</p>
// //                 <p className="price">Starting from ₹{pkg.price}</p>
// //               </div> */
// //               return (
// //                 <Card key={pkg._id}>
// //                   <Card.Img
// //                     variant="top"
// //                     src={pkg.image}
// //                     alt={pkg.place_name}
// //                     height={200}
// //                   />
// //                   <Card.Body>
// //                     <Card.Title>
// //                       {pkg.place_name}, {pkg.state_name}
// //                     </Card.Title>
// //                     <Card.Text>{pkg.title.slice(0, 50)}</Card.Text>
// //                     <Card.Text className="price">
// //                       Starting from ₹{pkg.price}
// //                     </Card.Text>
// //                     <Link
// //                       to={`/packages/${pkg._id}`}
// //                       className="btn btn-primary"
// //                     >
// //                       View Details
// //                     </Link>
// //                   </Card.Body>
// //                 </Card>
// //               );
// //             })}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axiosInstance from "../axiosConfig";
// import { Carousel, Card } from "react-bootstrap"; // Import Carousel
// import "./Home.css";

// const Home = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const data = await axiosInstance.get("/packages");
//         if (data && Array.isArray(data)) {
//           setPackages(data);
//         } else {
//           throw new Error("Invalid data format received from API");
//         }
//       } catch (err) {
//         setError(err.message || "Failed to fetch travel packages");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackages();
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="home">
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Explore the World with Book-Your-Guide</h1>
//           <p>Book your next adventure with ease and confidence.</p>
//           <button className="btn-secondary">Start Your Journey</button>
//         </div>
//       </section>

//       {/* Carousel Section */}
//       <section id="carousel-section" className="carousel-section">
//         <h2>Featured Destinations</h2>
//         <Carousel>
//           {packages
//             .filter((pkg) => pkg.image) // Ensure only items with images are shown
//             .map((pkg) => (
//               <Carousel.Item key={pkg._id}>
//                 <img
//                   className="d-block w-100"
//                   src={pkg.image}
//                   alt={pkg.place_name}
//                   style={{ maxHeight: "400px", objectFit: "cover" }}
//                 />
//                <Carousel.Caption>
//   <div className="caption-overlay">
//     <h3 className="caption-title">
//       {pkg.place_name}, {pkg.state_name}
//     </h3>
//     <p className="caption-text">{pkg.title}</p>
//     <p className="caption-price">Starting from ₹{pkg.price}</p>
//     <Link
//       to={`/packages/${pkg._id}`}
//       className="btn btn-primary caption-button"
//     >
//       View Details
//     </Link>
//   </div>
// </Carousel.Caption>

//               </Carousel.Item>
//             ))}
//         </Carousel>
//       </section>

//       {/* Destination Grid */}
//       <section id="destinations" className="destinations">
//         <h2>All Destinations</h2>
//         <div className="destination-grid">
//           {packages
//             .filter((pkg) => pkg.image)
//             .map((pkg) => (
//               <Card key={pkg._id}>
//                 <Card.Img
//                   variant="top"
//                   src={pkg.image}
//                   alt={pkg.place_name}
//                   height={200}
//                 />
//                 <Card.Body>
//                   <Card.Title>
//                     {pkg.place_name}, {pkg.state_name}
//                   </Card.Title>
//                   <Card.Text>{pkg.title.slice(0, 50)}</Card.Text>
//                   <Card.Text className="price">
//                     Starting from ₹{pkg.price}
//                   </Card.Text>
//                   <Link
//                     to={`/packages/${pkg._id}`}
//                     className="btn btn-primary"
//                   >
//                     View Details
//                   </Link>
//                 </Card.Body>
//               </Card>
//             ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { Carousel } from "react-bootstrap"; // Import Carousel
import "./Home.css";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await axiosInstance.get("/packages");
        if (data && Array.isArray(data)) {
          setPackages(data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch travel packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="carousel-wrapper">
          <Carousel controls={true} indicators={false} interval={null}>
            {packages
              .filter((pkg) => pkg.image)
              .map((pkg) => (
                <Carousel.Item key={pkg._id}>
                  <img
                    className="d-block w-100"
                    src={pkg.image}
                    alt={pkg.place_name}
                    style={{ maxHeight: "600px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
        <div className="hero-content">
          <h1>Explore the World with Book-Your-Guide</h1>
          <p>Book your next adventure with ease and confidence.</p>
          <button className="btn-secondary">Start Your Journey</button>
        </div>
      </section>

      {/* Destination Section */}
      <section id="destinations" className="destinations">
        <h2>Featured Destinations</h2>
        <div className="destination-grid">
          {packages
            .filter((pkg) => pkg.image)
            .map((pkg) => (
              <div key={pkg._id} className="destination">
                <img src={pkg.image} alt={pkg.place_name} />
                <h3>
                  {pkg.place_name}, {pkg.state_name}
                </h3>
                <p>{pkg.title}</p>
                <p className="price">Starting from ₹{pkg.price}</p>
                <Link to={`/packages/${pkg._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
