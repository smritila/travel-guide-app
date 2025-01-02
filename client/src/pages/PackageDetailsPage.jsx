import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PackageDetailsPage() {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [availability, setAvailability] = useState({});
  const [form, setForm] = useState({
    adults: 1,
    date: "",
    timeSlot: "7AM-9AM",
    language: "English",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/packages/${id}`)
      .then((res) => res.json())
      .then((data) => setPackageDetails(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckAvailability = async (e) => {
    e.preventDefault();
    // Fetch availability from the API
    const response = await fetch(
      `http://localhost:5000/api/check-availability`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, packageId: id }),
      }
    );
    const data = await response.json();
    setAvailability(data);
  };

  if (!packageDetails) return <p>Loading...</p>;

  return (
    <div>
      <h1>{packageDetails.title}</h1>
      <div>
        {packageDetails.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={packageDetails.title}
            style={{ width: "100%", height: "auto" }}
          />
        ))}
      </div>
      <p>{packageDetails.description}</p>
      <p>Price: ${packageDetails.price}</p>
      <button
        onClick={() =>
          document
            .getElementById("availability-section")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        Check Availability
      </button>

      <div id="availability-section">
        <h2>Check Availability</h2>
        <form onSubmit={handleCheckAvailability}>
          <label>
            Number of Adults:
            <input
              type="number"
              name="adults"
              value={form.adults}
              min="1"
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Time Slot:
            <select
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleInputChange}
              required
            >
              <option value="7AM-9AM">7AM - 9AM</option>
              <option value="9AM-11AM">9AM - 11AM</option>
            </select>
          </label>
          <label>
            Preferred Language:
            <select
              name="language"
              value={form.language}
              onChange={handleInputChange}
              required
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
          </label>
          <button type="submit">Check Availability</button>
        </form>

        {availability.guides && (
          <div>
            <h3>Available Guides</h3>
            <ul>
              {availability.guides.map((guide) => (
                <li key={guide.id}>
                  <img
                    src={guide.profilePicture}
                    alt={guide.name}
                    style={{ width: 50, height: 50 }}
                  />
                  <p>Name: {guide.name}</p>
                  <p>Rating: {guide.rating}</p>
                  <button onClick={() => alert(`Booked with ${guide.name}`)}>
                    Book Now
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageDetailsPage;
