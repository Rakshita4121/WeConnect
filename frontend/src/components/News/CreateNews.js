import React from "react";
import axios from "axios";
import FormComponent from "../genral/Form";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg"
import {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext"
const CreateNewsForm = () => {
    const { user } = useContext(AuthContext);

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
        { name: "image", label: "Upload Image", type: "file", placeholder: "Enter image URL (optional)" }
    ];
    const handleSubmit = async (formData) => {
        try {
            const data = new FormData();
            data.append("headline", formData.headline);
            data.append("content", formData.content);
            data.append("author", formData.author);
            data.append("category", formData.category);
            data.append("postedBy", user._id);
    
            // Append image only if a file is selected
            if (formData.image && formData.image instanceof File) {
                data.append("image", formData.image);
            }
    
            const response = await axios.post("http://localhost:3002/news", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            alert("News article posted successfully!");
            window.location.href = "/news";
        } catch (error) {
            console.error("Error posting news:", error);
        }
    };
    

    return (
        <div className='row' style={{ padding:"110px 6%",background:`linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{border: "2px solid green", borderRadius:"20px",
            padding: "3%", 
            boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", 
            transform: "translateY(-10px)",
            transition: "all 0.3s ease-in-out" }}>
                <h2 className="text-center" style={{color:"darkgreen",fontSize:"32px",fontWeight:"bold"}}>Post News</h2>
                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Publish News" />
            </div>
        </div>
    );
};

export default CreateNewsForm;
