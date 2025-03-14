import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllLocalBusinesses = () => {
  const [localBusinesses, setLocalBusinesses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/localbusinesses")
      .then((res) => {
        setLocalBusinesses(res.data);
      })
      .catch((error) =>
        console.error("Error fetching local businesses:", error)
      );
  }, []);

  return (
    <div>
      <h2>Local Businesses</h2>
      <Link to={`/localbusinesses/new`}>Register New Business</Link>
      <ul>
        {localBusinesses.map((business) => (
          <li key={business._id}>
            <Link to={`/localbusinesses/${business._id}`}>
              <h3>{business.name}</h3>
            </Link>
            <p>{business.description}</p>
            <p><strong>Contact Email:</strong> {business.contactEmail}</p>
            <p><strong>Phone:</strong> {business.contactPhone}</p>
            {business.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a href={business.website} target="_blank" rel="noopener noreferrer">
                  {business.website}
                </a>
              </p>
            )}
            {business.logo && (
              <img src={business.logo} alt={`${business.name} logo`} width="100" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllLocalBusinesses;
