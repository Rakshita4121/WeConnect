import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../../styles/JobDetails.css";
import { AuthContext } from "../../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/jobs/${id}`)
      .then((res) => {
        setJob(res.data);

        // Fetch applications only if the logged-in user is the creator
        if (user && res.data.postedBy === user._id) {
          axios
            .get(`http://localhost:3002/jobs/${id}/applications`)
            .then((res) => setApplications(res.data))
            .catch((err) => console.error("Error fetching applications:", err));
        }
      })
      .catch((err) => console.error("Error fetching job details:", err));
  }, [id, user]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details-container" style={{ marginTop: "110px" }}>
      <h2>{job.title}</h2>
      <p className="job-description">{job.description}</p>

      <div className="job-section">
        <h3>Requirements</h3>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="job-section">
        <h3>Responsibilities</h3>
        <ul>
          {job.responsibilities.map((res, index) => (
            <li key={index}>{res}</li>
          ))}
        </ul>
      </div>

      <p className="job-salary">
        <strong>Salary:</strong> ₹{job.salaryRange.min} - ₹{job.salaryRange.max}
      </p>

      {job.businessId && (
        <div className="business-info">
          <h3>Company Details</h3>
          <p><strong>Business Name:</strong> {job.businessId.name}</p>
          <p><strong>Address:</strong> {job.businessId.address}</p>
          {job.businessId.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a href={job.businessId.website} target="_blank" rel="noopener noreferrer">
                {job.businessId.website}
              </a>
            </p>
          )}
        </div>
      )}

      <Link to={`/jobs/${id}/apply`} className="apply-btn" style={{ textDecoration: "none" }}>
        <button className="btn btn-success" style={{ fontSize: "22px", fontWeight: "bold" }}>
          Apply
        </button>
      </Link>

      {/* Applications - Visible only to the creator of the job */}
      {!loading && user && job.createdBy === user._id && (
        <div className="applications-section" style={{ marginTop: "40px" }}>
          <h3>Applications Received</h3>
          {applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <ul className="application-list">
              {applications.map((app) => (
                <li key={app._id} className="application-item">
                  <p><strong>Name:</strong> {app.name}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Mobile:</strong> {app.mobileNo}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
