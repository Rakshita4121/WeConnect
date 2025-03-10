import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom"
const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3002/events/${id}`) // Ensure this matches backend route
            .then((res) => setEvent(res.data))
            .catch((error) => console.error("Error fetching event details:", error));
    }, [id]);

    if (!event) return <p>Loading event details...</p>;

    return (
        <div>
            <h2>{event.title}</h2>
            <img src={event.bannerImage} alt={event.title} width="100%" />
            <p><strong>Short Description:</strong> {event.shortDescription}</p>
            <p>{event.description}</p>
            <p><strong>Event Type:</strong> {event.eventType}</p>
            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
            <p><strong>Registration Price:</strong> {event.registrationPrice > 0 ? `$${event.registrationPrice}` : "Free"}</p>
            <p><strong>Status:</strong> {event.status}</p>
            <p><strong>Organized By:</strong> {event.organizedBy ? event.organizedBy : "N/A"}</p>
            <p><strong>Created At:</strong> {new Date(event.createdAt).toDateString()}</p>
            <Link to={`/events/${id}/edit`}><button className="btn btn-success">Edit</button></Link>
            <button className="btn btn-danger">Delete</button>
        </div>
    );
};

export default EventDetails;

