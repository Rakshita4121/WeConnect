import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LocalBusinessDetail = () => {
  const { id } = useParams(); // Get the business ID from the URL
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/localbusinesses/${id}`)
      .then((res) => setBusiness(res.data))
      .catch((error) => console.error("Error fetching business details:", error));
  }, [id]);

  if (!business) return <p>Loading...</p>;

  return (
    <div style={{ margin: "4% 6%" }}>
      <h2>{business.name}</h2>
      <img
        src={business.logo}
        alt={`${business.name} logo`}
        style={{ width: "150px", height: "150px", borderRadius: "8px", marginBottom: "10px" }}
      />
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

      <Link to={`/localbusinesses/${id}/edit`}>
        <button className="btn btn-success">Edit</button>
      </Link>
      <button className="btn btn-danger" style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
};

export default LocalBusinessDetail;
