import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categories = ["All", "Business", "Events", "General", "Opportunities"];

const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchAnnouncements();
  }, [selectedCategory]);

  const fetchAnnouncements = () => {
    const url =
      selectedCategory === "All"
        ? "http://localhost:3002/announcements"
        : `http://localhost:3002/announcements?category=${selectedCategory}`;

    axios
      .get(url)
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((error) =>
        console.error("Error fetching announcements:", error)
      );
  };

  return (
    <div>
      <h2>Announcements</h2>
      <Link to={`/announcements/new`}>Post New Announcement</Link>

      {/* Category Filter Buttons */}
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedCategory === category ? "#4CAF50" : "#ccc",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <ul>
        {announcements.map((announcement) => (
          <li key={announcement._id}>
            <h3>{announcement.title}</h3>
            <p>{announcement.description}</p>
            <p>
              <strong>Posted By:</strong> {announcement.postedBy}
            </p>
            <p>
              <strong>Category:</strong> {announcement.category}
            </p>
            <p>
              <strong>Date:</strong> {new Date(announcement.datePosted).toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAnnouncements;
