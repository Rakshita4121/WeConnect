import { useParams ,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const OrganizationDetail = () => {
  const { id } = useParams(); // Get the organization ID from the URL
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3002/organizations/${id}`)
      .then((res) => setOrganization(res.data))
      .catch((error) => console.error("Error fetching organization:", error));
  }, [id]);

  if (!organization) return <p>Loading...</p>;

  return (
    <div>
      <h2>{organization.name}</h2>
      <p>{organization.description}</p>
      <p><strong>Contact Email:</strong> {organization.contactEmail}</p>
      <p><strong>Phone:</strong> {organization.contactPhone}</p>
      <p><strong>Address:</strong> {organization.address}</p>
      <p><strong>Website:</strong> <a href={organization.website} target="_blank" rel="noopener noreferrer">{organization.website}</a></p>
      <Link to={`/organizations/${id}/edit`}><button className="btn btn-success">Edit</button></Link>
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};

export default OrganizationDetail;
