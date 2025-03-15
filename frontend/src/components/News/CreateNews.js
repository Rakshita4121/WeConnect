import React from "react";
import axios from "axios";
import FormComponent from "../genral/Form";

const CreateNewsForm = () => {
    const initialState = {
        headline: "",
        content: "",
        author: "",
        category: "",
        image: ""
    };

    const fields = [
        { name: "headline", label: "Headline", type: "text", placeholder: "Enter news headline" },
        { name: "content", label: "Content", type: "textarea", placeholder: "Enter news content" },
        { name: "author", label: "Author", type: "text", placeholder: "Enter author's name" },
        { name: "category", label: "Category", type: "text", placeholder: "Enter category (Politics, Business,Sports,Technology,Health,Entertainment,General)" },
        { name: "image", label: "Image URL", type: "text", placeholder: "Enter image URL (optional)" }
    ];

    const handleSubmit = async (formData) => {
        try {
            let response = await axios.post("http://localhost:3002/news", formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("News article posted successfully!");
            window.location.href = "/news";
        } catch (error) {
            console.error("Error posting news:", error);
        }
    };

    return (
        <div className='row' style={{ margin: "4% 6%" }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'>
                <h2>Post News</h2>
                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Publish News" />
            </div>
        </div>
    );
};

export default CreateNewsForm;
