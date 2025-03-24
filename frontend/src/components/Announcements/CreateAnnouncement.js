import React from "react";
import axios from "axios";
import FormComponent from "../genral/Form";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg"

const CreateAnnouncementsForm = () => {
    const initialState = {
        title: "",
        description: "",
        category: "General"
    };

    const fields = [
        { name: "title", label: "Title", type: "text", placeholder: "Enter announcement title" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Enter announcement details" },
        { 
            name: "category", 
            label: "Category", 
            type: "text",
            placeholder:"Enter like Events , Opportunities , General ,Business"
        }
    ];

    const handleSubmit = async (formData) => {
        try {
            await axios.post("http://localhost:3002/announcements", formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Announcement created successfully!");
            window.location.href = "/announcements";
        } catch (error) {
            console.error("Error creating announcement:", error);
        }
    };

    return (
        <div className="row"style={{ padding:"110px 6%",background:`linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
            <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1" style={{border: "2px solid green", borderRadius:"20px",
            padding: "3%", 
            boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", 
            transform: "translateY(-10px)",
            transition: "all 0.3s ease-in-out" }}>
                <h2 className="text-center" style={{color:"darkgreen",fontSize:"32px",fontWeight:"bold"}}>Create an Announcement</h2>
                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Post Announcement" />
            </div>
        </div>
    );
};

export default CreateAnnouncementsForm;
