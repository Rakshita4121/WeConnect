import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../../styles/LocalBusinessDetail.css"; // Import external CSS
import {AuthContext} from "../../context/AuthContext"
const LocalBusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  useEffect(() => {
    axios
      .get(`http://localhost:3002/localbusinesses/${id}`) // ✅ Fetch jobs along with business
      .then((res) => setBusiness(res.data))
      .catch((error) => console.error("Error fetching business details:", error));
  }, [id]);

  const handleDelete = async () => {
    try {
      let response = await axios.delete(`http://localhost:3002/localbusinesses/${id}`);
      alert(response.data.message);
      navigate("/localbusinesses");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  const isAdmin = user && (user.role === "Community Head" || user.role === "Organization Head" || user.role === "Business Head");
  const isCreator = user && business && user._id === business.ownerId;
  if (!business) return <p>Loading...</p>;

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="business-container">
        {/* Left Side - Business Info */}
        <div className="business-info">
          <h2>{business.name}</h2>
          <p className="business-description">{business.description}</p>
          {(isCreator && isAdmin) && (
            <div>
          <div className="button-container">
            <Link to={`/localbusinesses/${id}/edit`}>
              <button className="edit-btn">Edit</button>
            </Link>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className="button-container">
            <Link to={`/jobs/localbusinesses/${id}/post-job`}>
              <button className="btn btn-success">Post Job</button>
            </Link>
          </div>
          </div>
          )}
        </div>

        {/* Right Side - Image Carousel */}
        <div className="business-carousel">
          {business.images && business.images.length > 0 ? (
            <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              {business.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image.url} alt={`Slide ${index + 1}`} className="carousel-image"             style={{ maxWidth: "100%", height: "auto", display: "block" }}
/>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="https://via.placeholder.com/600"
              alt="No Image Available"
              className="carousel-image"
            />
          )}
        </div>
      </div>

      {/* Bottom Section - Business Owner */}
      <div className="business-owner">
        <h3>Contact Info</h3>
        <p><strong>Address:</strong> {business.address || "N/A"}</p>
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
      </div>

      {/* ✅ Display Jobs Section */}
      <div className="available-jobs-section">
  <h3 className="available-jobs-heading">Available Jobs</h3>
  {business.jobs && business.jobs.length > 0 ? (
    <ul className="available-jobs-list">
      {business.jobs.map((job) => (
        <li key={job._id} className="available-job-card">
          <h4 className="job-title">{job.title}</h4>
          <p className="job-description">{job.description}</p>
          <p className="job-salary">
            <strong>Salary:</strong> ₹{job.salaryRange.min} - ₹{job.salaryRange.max}
          </p>
          <Link to={`/jobs/${job._id}`} className="view-details-btn">
            <button className="btn btn-outline-success mt-2">View Details</button>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className="no-jobs-text">No jobs posted yet.</p>
  )}
</div>

    </div>
  );
};

export default LocalBusinessDetail;
