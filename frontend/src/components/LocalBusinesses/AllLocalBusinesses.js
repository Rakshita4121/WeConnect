import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import TopSection from "../genral/TopSection";
import image1 from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg";
import image2 from "../../assets/getimg_ai_img-H534QPQ56qGOtJzCFCJXw.jpeg";
import image3 from "../../assets/getimg_ai_img-t1jkE3N0laok5miDaDHPE.jpeg";
import image4 from "../../assets/getimg_ai_img-0lsqCXQHwIksIkoXtbx4N.jpeg";
import image5 from "../../assets/getimg_ai_img-RyQAYSNnIjZsZ3odqemJS.jpeg";
import image6 from "../../assets/getimg_ai_img-m9pnPGHs6BGk8oP4gTKjW.jpeg";
import { AuthContext } from "../../context/AuthContext";

const AllLocalBusinesses = () => {
  const [localBusinesses, setLocalBusinesses] = useState([]);
  const { user, loading } = useContext(AuthContext);

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
    <div style={{ background: "white", paddingBottom: "60px" }}>
      <TopSection
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        image5={image5}
        image6={image6}
      />
      <h2
        className="text-center"
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          color: "green",
          textAlign: "center",
          paddingTop: "40px",
          textShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        Local Businesses
      </h2>
      <div className="grid">
        {localBusinesses.map((business) => (
          <div className="card" key={business._id}>
            <h3>{business.name}</h3>
            <p>{business.description}</p>
            {business.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {business.website}
                </a>
              </p>
            )}
            <Link to={`/localbusinesses/${business._id}`}>
              <button className="explore-button">Explore...</button>
            </Link>
          </div>
        ))}
      </div>

      {!loading &&
        user &&
        ["business head", "community head"].includes(
          user.role?.toLowerCase()
        ) && (
          <div style={{ textAlign: "center" }}>
            <Link to="/localbusinesses/new">
              <button className="explore-button">Create New Business</button>
            </Link>
          </div>
        )}
    </div>
  );
};

export default AllLocalBusinesses;
