import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/getimg_ai_img-Bl0wf9neCONEgSXjnZWei.jpeg"
const categories = ["All", "Business", "Events", "General", "Opportunities"];
import "../../styles/announcement.css"
import video from "../../assets/VID-20250323-WA0014.mp4"
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
    <div style={{paddingTop:"80px"}} >
        <h2 style={{color:"green",fontSize:"34px",fontWeight:"bold",paddingTop:"20px",textAlign:"center"}}>📢 Announcements</h2>
        <div style={{ display:"flex",padding:"5% 10% 50px 10%",alignItems:"center",flexWrap:"wrap",justifyContent:"space-around"}}>
          <p style={{fontSize:"20px"}}>Get the latest updates on local events, important notices, and <br></br>community-driveninitiatives. From upcoming festivals and volunteer <br></br>opportunities to emergency alerts and neighborhood meetings, <br></br>stay informed and engaged. Check back regularly<br></br> for new announcements that keep our community <br></br>connected and thriving!</p>
          {/* <img src={image} style={{width:"300px",height:"300px"}}></img> */}
          <video width="300" height="300" controls  autoplay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              width:"150px",
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedCategory === category ? "#4CAF50" : "#ccc",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              textAlign:"center",
              fontSize:"18px",
              fontWeight:"bold",
              borderRadius:"20px",
            }}
            className="category-btn"
          >
            {category}
          </button>
          ))}
        </div>
        <div className="announcement-container">
     {announcements.map((announcement) => (
      <div key={announcement._id} className="card announcement-card">
      <div className="announcement-content">
        <h3>{announcement.title}</h3>
        <p>{announcement.description}</p>
        <p><strong>Posted By</strong> {announcement.postedBy}</p>
        <p><strong>Posted Date:</strong> {new Date(announcement.datePosted).toDateString()}</p>
      </div>
      
      </div>
      ))}
    </div>
    <div style={{textAlign:"center",paddingBottom:"20px"}}>
      <Link to = {`/announcements/new`}><button className="explore-button">Post Announcement</button></Link>
      </div>
    </div>
  );
};

export default AllAnnouncements;
{/* <h2>Announcements</h2>
      <Link to={`/announcements/new`}>Post New Announcement</Link>

      
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
      </ul> */}
