import React, { useState } from "react";
import axios from "axios";

const CreateLocalBusinessForm = () => {
  const [businessData, setBusinessData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    logo: "",
  });

  const handleChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting business:", businessData);

    try {
      let response = await axios.post(
        "http://localhost:3002/localbusinesses",
        businessData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response);
      alert("Local business created successfully!");
      window.location.href = "/localbusinesses";
    } catch (error) {
      console.error("Error creating local business:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
      } else if (error.request) {
        console.error("No Response from Server:", error.request);
      } else {
        console.error("Axios Error:", error.message);
      }
    }
  };

  return (
    <div className="row" style={{ margin: "4% 6%" }}>
      <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
        <h2 style={{ marginBottom: "20px" }}>Register a Local Business</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Business Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter business name"
              value={businessData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shortDescription" className="form-label">
              Short Description
            </label>
            <input
              name="shortDescription"
              id="shortDescription"
              type="text"
              className="form-control"
              placeholder="Enter short description"
              value={businessData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Full Description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Enter full description"
              value={businessData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contactEmail" className="form-label">
              Contact Email
            </label>
            <input
              name="contactEmail"
              id="contactEmail"
              type="email"
              className="form-control"
              placeholder="Enter contact email"
              value={businessData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contactPhone" className="form-label">
              Contact Phone
            </label>
            <input
              name="contactPhone"
              id="contactPhone"
              type="text"
              className="form-control"
              placeholder="Enter contact phone"
              value={businessData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="website" className="form-label">
              Website URL
            </label>
            <input
              name="website"
              id="website"
              type="text"
              className="form-control"
              placeholder="Enter website URL (optional)"
              value={businessData.website}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="logo" className="form-label">
              Logo URL
            </label>
            <input
              name="logo"
              id="logo"
              type="text"
              className="form-control"
              placeholder="Enter logo URL (optional)"
              value={businessData.logo}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Register Business
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocalBusinessForm;
