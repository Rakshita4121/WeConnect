import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopSection from "../genral/TopSection";
import "../../styles/card.css"
import image1 from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg";
import image2 from "../../assets/getimg_ai_img-H534QPQ56qGOtJzCFCJXw.jpeg";
import image3 from "../../assets/getimg_ai_img-t1jkE3N0laok5miDaDHPE.jpeg";
import image4 from "../../assets/getimg_ai_img-0lsqCXQHwIksIkoXtbx4N.jpeg";
import image5 from "../../assets/getimg_ai_img-RyQAYSNnIjZsZ3odqemJS.jpeg";
import image6 from "../../assets/getimg_ai_img-m9pnPGHs6BGk8oP4gTKjW.jpeg";

const AllEvents = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/events")
      .then((res) => {
        setAllEvents(res.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
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

      <h2 className="text-center" style={{ fontSize: "38px", fontWeight: "bold", color: "green", textAlign: "center", paddingTop: "40px", textShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}>
         Upcoming Events 
      </h2>

      <div className="grid">
        {allEvents.map((event) => (
          <div key={event._id} className="card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>📅 Date:</strong> {new Date(event.date).toDateString()}</p>
            <p><strong>📍 Location:</strong> {event.location}</p>
            <Link to={`/events/${event._id}`}>
              <button className="explore-button">Explore...</button>
            </Link>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center"}}>
      <Link to = {`/events/new`}><button className="explore-button">Create New Event</button></Link>
      </div>
    </div>
  );
};

export default AllEvents;
