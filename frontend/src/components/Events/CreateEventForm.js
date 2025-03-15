// import React, { useState } from 'react';
// import axios from "axios";
// const CreateEventForm = () => {
//     const [eventData, setEventData] = useState({
//         title: '',
//         shortDescription: '',
//         description: '',
//         eventType: '',
//         organizationId: '',
//         date: '',
//         time: '',
//         location: '',
//         volunteersNeeded: '',
//         bannerImage: '',
//         registrationPrice: '',
//         status: 'upcoming'
//     });

//     const handleChange = (e) => {
//         setEventData({ ...eventData, [e.target.name]: e.target.value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Submitting event:", eventData);
    
//         try {
//             let response = await axios.post("http://localhost:3002/events", eventData, {
//                 headers: { "Content-Type": "application/json" }
//             });
    
//             console.log("Response:", response);
//             alert(response.data.message);
//             window.location.href = response.data.redirectUrl;
//         } catch (error) {
//             console.error("Error creating event:", error);
    
//             if (error.response) {
//                 console.error("Response Data:", error.response.data);
//                 console.error("Status Code:", error.response.status);
//             } else if (error.request) {
//                 console.error("No Response from Server:", error.request);
//             } else {
//                 console.error("Axios Error:", error.message);
//             }
//         }
//     };
    
    
//     return (
//         <div className='row' style={{ margin: "4% 6%" }}>
//             <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'>
//                 <h2 style={{ marginBottom: "20px" }}>Create an Event</h2>
//                 <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//                     <div className="mb-3">
//                         <label htmlFor="title" className="form-label form-font">Event Title</label>
//                         <input name="title" id="title" type="text" className="form-control input-border" placeholder="Enter event title" value={eventData.title} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="shortDescription" className="form-label form-font">Short Description</label>
//                         <input name="shortDescription" id="shortDescription" type="text" className="form-control input-border" placeholder="Enter short description" value={eventData.shortDescription} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="description" className="form-label form-font">Full Description</label>
//                         <textarea name="description" id="description" className="form-control input-border" placeholder="Enter full description" value={eventData.description} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="eventType" className="form-label form-font">Event Type</label>
//                         <input name="eventType" id="eventType" type="text" className="form-control input-border" placeholder="Enter event type (e.g., community, workshop)" value={eventData.eventType} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="date" className="form-label form-font">Event Date</label>
//                         <input name="date" id="date" type="date" className="form-control input-border" value={eventData.date} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="time" className="form-label form-font">Event Time</label>
//                         <input name="time" id="time" type="text" className="form-control input-border" placeholder="Enter event time (e.g., 9:00 AM - 12:00 PM)" value={eventData.time} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="location" className="form-label form-font">Location</label>
//                         <input name="location" id="location" type="text" className="form-control input-border" placeholder="Enter event location" value={eventData.location} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="volunteersNeeded" className="form-label form-font">Volunteers Needed</label>
//                         <input name="volunteersNeeded" id="volunteersNeeded" type="number" className="form-control input-border" placeholder="Enter required volunteers" value={eventData.volunteersNeeded} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="bannerImage" className="form-label form-font">Banner Image URL</label>
//                         <input name="bannerImage" id="bannerImage" type="text" className="form-control input-border" placeholder="Enter image URL" value={eventData.bannerImage} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="registrationPrice" className="form-label form-font">Registration Price</label>
//                         <input name="registrationPrice" id="registrationPrice" type="number" className="form-control input-border" placeholder="Enter registration price (0 if free)" value={eventData.registrationPrice} onChange={handleChange} required />
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="status" className="form-label form-font">Event Status</label>
//                         <select name="status" id="status" className="form-control input-border" value={eventData.status} onChange={handleChange} required>
//                             <option value="upcoming">Upcoming</option>
//                             <option value="ongoing">Ongoing</option>
//                             <option value="completed">Completed</option>
//                         </select>
//                     </div>

//                     <button type="submit" className="btn btn-success">Create Event</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CreateEventForm;
import React from "react";
import axios from "axios";
import FormComponent from "../genral/Form";

const CreateEventForm = () => {
    const initialState = {
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
    };

    const fields = [
        { name: "title", label: "Event Title", type: "text", placeholder: "Enter event title" },
        { name: "shortDescription", label: "Short Description", type: "text", placeholder: "Enter short description" },
        { name: "description", label: "Full Description", type: "textarea", placeholder: "Enter full description" },
        { name: "eventType", label: "Event Type", type: "text", placeholder: "Enter event type" },
        { name: "date", label: "Event Date", type: "date", placeholder: "" },
        { name: "time", label: "Event Time", type: "text", placeholder: "Enter event time" },
        { name: "location", label: "Location", type: "text", placeholder: "Enter location" },
        { name: "volunteersNeeded", label: "Volunteers Needed", type: "number", placeholder: "Enter number" },
        { name: "bannerImage", label: "Banner Image URL", type: "text", placeholder: "Enter image URL" },
        { name: "registrationPrice", label: "Registration Price", type: "number", placeholder: "Enter price (0 if free)" }
    ];

    const handleSubmit = async (formData) => {
        try {
            let response = await axios.post("http://localhost:3002/events", formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert(response.data.message);
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <div className='row' style={{ margin: "4% 6%" }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'>
                <h2>Create an Event</h2>
                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Create Event" />
            </div>
        </div>
    );
};

export default CreateEventForm;
