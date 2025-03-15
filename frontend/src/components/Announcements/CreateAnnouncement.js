import React from "react";
import axios from "axios";
import FormComponent from "../genral/Form";

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
        <div className="row" style={{ margin: "4% 6%" }}>
            <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
                <h2>Create an Announcement</h2>
                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Post Announcement" />
            </div>
        </div>
    );
};

export default CreateAnnouncementsForm;
