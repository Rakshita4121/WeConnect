import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import FormComponent from "../genral/Form";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg";

const CreateEventForm = () => {
    const { user } = useContext(AuthContext);

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
        { name: "bannerImage", label: "Banner Image URL", type: "file", placeholder: "Enter image URL" },
        { name: "registrationPrice", label: "Registration Price", type: "number", placeholder: "Enter price (0 if free)" }
    ];

    const handleSubmit = async (formData) => {
        if (!user || !user._id) {
            alert("User not authenticated. Please log in again.");
            return;
        }
    
        try {
            const formDataToSend = new FormData();
    
            for (let key in formData) {
                if (key === "bannerImage" && formData[key] instanceof File) {
                    formDataToSend.append("bannerImage", formData[key]); // send file
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
    
            formDataToSend.append("organizedBy", user._id);
    
            const response = await axios.post("http://localhost:3002/events", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            alert(response.data.message);
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Check console for more details.");
        }
    };
    
    return (
        <div className='row top-conteiner' style={{
            padding: "110px 6%",
            background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{
                border: "2px solid green",
                borderRadius: "20px",
                padding: "3%",
                boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)",
                transform: "translateY(-10px)",
                transition: "all 0.3s ease-in-out"
            }}>
                <h2 className="text-center" style={{ color: "darkgreen", fontSize: "32px", fontWeight: "bold" }}>
                    Create an Event
                </h2>
                <FormComponent
                    fields={fields}
                    initialState={initialState}
                    onSubmit={handleSubmit}
                    buttonText="Create Event"
                />
            </div>
        </div>
    );
};

export default CreateEventForm;
