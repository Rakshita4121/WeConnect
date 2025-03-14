import React, { useState, useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";


const EditLocalBusinessForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    logo: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3002/localbusinesses/${id}`)
      .then((res) => setBusinessData(res.data))
      .catch((error) =>
        console.error("Error fetching business details:", error)
      );
  }, [id]);

  const handleChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:3002/localbusinesses/${id}`, businessData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("Business updated:", res.data);
        alert("Business updated successfully!");
        navigate(`/localbusinesses/${id}`);
      })
      .catch((error) => {
        console.error("Error updating business:", error);
        if (error.response) {
          console.error("Response Data:", error.response.data);
          console.error("Status Code:", error.response.status);
        }
      });
  };

  return (
    <div className="row" style={{ margin: "4% 6%" }}>
      <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
        <h2 style={{ marginBottom: "20px" }}>Edit Local Business</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label form-font">
              Business Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              className="form-control input-border"
              value={businessData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shortDescription" className="form-label form-font">
              Short Description
            </label>
            <input
              name="shortDescription"
              id="shortDescription"
              type="text"
              className="form-control input-border"
              value={businessData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label form-font">
              Full Description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control input-border"
              value={businessData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contactEmail" className="form-label form-font">
              Contact Email
            </label>
            <input
              name="contactEmail"
              id="contactEmail"
              type="email"
              className="form-control input-border"
              value={businessData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contactPhone" className="form-label form-font">
              Contact Phone
            </label>
            <input
              name="contactPhone"
              id="contactPhone"
              type="text"
              className="form-control input-border"
              value={businessData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="website" className="form-label form-font">
              Website URL
            </label>
            <input
              name="website"
              id="website"
              type="text"
              className="form-control input-border"
              value={businessData.website}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="logo" className="form-label form-font">
              Logo URL
            </label>
            <input
              name="logo"
              id="logo"
              type="text"
              className="form-control input-border"
              value={businessData.logo}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Update Business
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLocalBusinessForm;
