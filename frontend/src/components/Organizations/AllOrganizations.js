import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
const AllOrganizations = () => {
  const [allOrganizations, setAllOrganizations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/organizations")
      .then((res) => setAllOrganizations(res.data))
      .catch((error) => console.error("Error fetching organizations:", error));
  }, []);

  return (
    <div>
      <h2>Organizations in Prakrutinagar, Kadapa</h2>
      <Link to = {`/organizations/new`}>Create New Organization</Link>
      <ul>
        {allOrganizations.map(org => (
          <li key={org._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <Link to={`/organizations/${org._id}`}>
              <h3>{org.name}</h3>
            </Link>
            
            <p>{org.description}</p>
            <p><strong>Email:</strong> {org.contactEmail}</p>
            <p><strong>Phone:</strong> {org.contactPhone}</p>
            <p><strong>Address:</strong> {org.address}</p>
            {org.website && <p><a href={org.website} target="_blank" rel="noopener noreferrer">Visit Website</a></p>}
            {org.logo && <img src={org.logo} alt={org.name} width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllOrganizations;
