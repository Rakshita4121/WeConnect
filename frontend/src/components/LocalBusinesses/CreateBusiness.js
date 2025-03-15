import React from "react";
import axios from "axios";
import FormComponent from "../genral/Form";

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
        <div className='row' style={{ margin: "4% 6%" }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'>
                <h2>Register a Local Business</h2>
                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Register Business" />
            </div>
        </div>
    );
};

export default CreateLocalBusinessForm;
