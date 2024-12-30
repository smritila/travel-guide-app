import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";

function Home() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="p-3 bg-light">
        <Form className="d-flex">
          <FormControl
            type="text"
            placeholder="Search packages..."
            className="me-2"
            value={search}
            onChange={handleSearch}
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </header>
      <h1>Available Packages</h1>
      <div>
        {filteredPackages.map((pkg) => (
          <div key={pkg._id}>
            <h2>{pkg.title}</h2>
            <p>{pkg.description}</p>
            <Link to={`/package/${pkg._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
