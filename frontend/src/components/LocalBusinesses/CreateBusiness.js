import React from "react";
import axios from "axios";
import FormComponent from "../genral/Form";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg"
const CreateLocalBusinessForm = () => {
    const initialState = {
        name: "",
        shortDescription: "",
        description: "",
        contactEmail: "",
        contactPhone: "",
        website: "",
        logo: ""
    };

    const fields = [
        { name: "name", label: "Business Name", type: "text", placeholder: "Enter business name" },
        { name: "shortDescription", label: "Short Description", type: "text", placeholder: "Enter short description" },
        { name: "description", label: "Full Description", type: "textarea", placeholder: "Enter full description" },
        { name: "contactEmail", label: "Contact Email", type: "email", placeholder: "Enter email" },
        { name: "contactPhone", label: "Contact Phone", type: "text", placeholder: "Enter phone number" },
        { name: "website", label: "Website URL", type: "text", placeholder: "Enter website URL (optional)" },
        { name: "logo", label: "Logo URL", type: "text", placeholder: "Enter logo image URL" }
    ];

    const handleSubmit = async (formData) => {
        try {
            let response = await axios.post("http://localhost:3002/localbusinesses", formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Local business created successfully!");
            window.location.href = "/localbusinesses";
        } catch (error) {
            console.error("Error creating local business:", error);
        }
    };

    return (
        <div className='row' style={{ padding:"110px 6%",background:`linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{border: "2px solid green", borderRadius:"20px",
            padding: "3%", 
            boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", 
            transform: "translateY(-10px)",
            transition: "all 0.3s ease-in-out" }}>
                <h2 style={{color:"darkgreen",fontSize:"32px",fontWeight:"bold"}}>Register a Local Business</h2>
                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Register Business" />
            </div>
        </div>
    );
};

export default CreateLocalBusinessForm;
