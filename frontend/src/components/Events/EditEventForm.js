import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditEventForm = () => {
    const { id } = useParams(); // Get event ID from URL
    const [eventData, setEventData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        eventType: '',
        date: '',
        time: '',
        location: '',
        volunteersNeeded: '',
        bannerImage: '',
        registrationPrice: '',
        status: 'upcoming'
    });

    useEffect(() => {
        // Fetch event details from the backend
        axios.get(`http://localhost:3002/events/${id}`)
            .then((res) => setEventData(res.data))
            .catch((error) => console.error("Error fetching event details:", error));
    }, [id]);

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        let response= await axios.put(`http://localhost:3002/events/${id}`, eventData, {
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
            console.log("Event updated:", res.data);
            alert("Event updated successfully!");
            window.location.href = res.data.redirectUrl;
        })
        .catch((error) => {
            console.error("Error updating event:", error);
            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Status Code:", error.response.status);
            }
        });
    };

    

    return (
        <div className='row' style={{ margin: "4% 6%" }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'>
                <h2 style={{ marginBottom: "20px" }}>Edit Event</h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label form-font">Event Title</label>
                        <input name="title" id="title" type="text" className="form-control input-border" value={eventData.title} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="shortDescription" className="form-label form-font">Short Description</label>
                        <input name="shortDescription" id="shortDescription" type="text" className="form-control input-border" value={eventData.shortDescription} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label form-font">Full Description</label>
                        <textarea name="description" id="description" className="form-control input-border" value={eventData.description} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="eventType" className="form-label form-font">Event Type</label>
                        <input name="eventType" id="eventType" type="text" className="form-control input-border" value={eventData.eventType} onChange={handleChange} required />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="date" className="form-label form-font">Event Date</label>
                        <input name="date" id="date" type="date" className="form-control input-border" value={eventData.date} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="time" className="form-label form-font">Event Time</label>
                        <input name="time" id="time" type="text" className="form-control input-border" value={eventData.time} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="location" className="form-label form-font">Location</label>
                        <input name="location" id="location" type="text" className="form-control input-border" value={eventData.location} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="volunteersNeeded" className="form-label form-font">Volunteers Needed</label>
                        <input name="volunteersNeeded" id="volunteersNeeded" type="number" className="form-control input-border" value={eventData.volunteersNeeded} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bannerImage" className="form-label form-font">Banner Image URL</label>
                        <input name="bannerImage" id="bannerImage" type="text" className="form-control input-border" value={eventData.bannerImage} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="registrationPrice" className="form-label form-font">Registration Price</label>
                        <input name="registrationPrice" id="registrationPrice" type="number" className="form-control input-border" value={eventData.registrationPrice} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label form-font">Event Status</label>
                        <select name="status" id="status" className="form-control input-border" value={eventData.status} onChange={handleChange} required>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">Update Event</button>
                </form>
            </div>
        </div>
    );
};

export default EditEventForm;
