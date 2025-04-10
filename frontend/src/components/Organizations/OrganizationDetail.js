import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import "../../styles/OrganisationDetail.css"; // Import CSS for styling
import {AuthContext} from "../../context/AuthContext"
const OrganizationDetail = () => {
  const { id } = useParams(); // Get the organization ID from the URL
  const [organization, setOrganization] = useState(null);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)


  const handleDelete = async () => {
    try {
      let response = await axios.delete(`http://localhost:3002/organizations/${id}`);
      alert(response.data.message);
      navigate("/organizations");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/organizations/${id}`)
      .then((res) => setOrganization(res.data))
      .catch((error) => console.error("Error fetching organization:", error));
  }, [id]);
  const isAdmin = user && (user.role === "Community Head" || user.role === "Organization Head");
  const isCreator = user && organization && user._id === organization.createdBy;
  if (!organization) return <p>Loading...</p>;

  return (
    <div className="organization-container" style={{marginTop:"100px"}}>
      <div className="organization-header">
        <div className="organization-text">
          <h2 className="organization-title">{organization.name}</h2>
          <p className="organization-short-desc">{organization.shortDescription}</p>
          <p className="organization-desc">{organization.description}</p>
        </div>
        <div className="organization-image">
          <img src={organization.image} alt={organization.name} className="org-img" />
        </div>
      </div>

      <div className="organization-details">
        <p><strong>Contact Email:</strong> {organization.contactEmail}</p>
        <p><strong>Phone:</strong> {organization.contactPhone}</p>
        <p><strong>Address:</strong> {organization.address}</p>
        <p><strong>Website:</strong> <a href={organization.website} target="_blank" rel="noopener noreferrer">{organization.website}</a></p>
        <p><strong>Founded By:</strong> {organization.foundedBy.join(", ")}</p>
        <p><strong>Non-Profit:</strong> {organization.isNonProfit ? "Yes" : "No"}</p>
        <p><strong>Events Organized:</strong> {organization.eventsOrganized.length > 0 ? organization.eventsOrganized.join(", ") : "No events yet"}</p>
      </div>
      {(isCreator && isAdmin) && (
      <div className="organization-actions">
        <Link to={`/organizations/${id}/edit`}><button className="btn btn-success">Edit</button></Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
      )}
    </div>
  );
};

export default OrganizationDetail;
