import { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg";
import {AuthContext} from "../../context/AuthContext"
const CreateLocalBusinessForm = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

    const [businessData, setBusinessData] = useState({
        name: "",
        ownerId:user._id,
        shortDescription: "",
        description: "",
        contactEmail: "",
        contactPhone: "",
        website: "",
        logo: "",
        address: "",
        images: ["", "", ""]  // Store images as an array
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("image")) {
            // Extract the index from name (e.g., "image0" -> 0)
            const index = parseInt(name.replace("image", ""), 10);
            const updatedImages = [...businessData.images];
            updatedImages[index] = value;

            setBusinessData({
                ...businessData,
                images: updatedImages
            });
        } else {
            setBusinessData({
                ...businessData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting local business:", businessData);

        try {
            let response = await axios.post("http://localhost:3002/localbusinesses", businessData, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Response:", response);
            alert("Local business created successfully!");
            navigate("/localbusinesses");
        } catch (error) {
            console.error("Error creating local business:", error);
        }
    };

    return (
        <div className='row' style={{ padding: "110px 6%", background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{ border: "2px solid green", borderRadius: "20px", padding: "3%", boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", transform: "translateY(-10px)", transition: "all 0.3s ease-in-out" }}>
                <h2 className="text-center" style={{ color: "darkgreen", fontSize: "32px", fontWeight: "bold" }}>Register a Local Business</h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>

                    <label className="form-label">Business Name</label>
                    <input name="name" type="text" className="form-control" placeholder="Enter business name" value={businessData.name} onChange={handleChange} required />

                    <label className="form-label">Short Description</label>
                    <input name="shortDescription" type="text" className="form-control" placeholder="Enter short description" value={businessData.shortDescription} onChange={handleChange} required />

                    <label className="form-label">Full Description</label>
                    <textarea name="description" className="form-control" placeholder="Enter full description" value={businessData.description} onChange={handleChange} required />

                    <label className="form-label">Contact Email</label>
                    <input name="contactEmail" type="email" className="form-control" placeholder="Enter email" value={businessData.contactEmail} onChange={handleChange} required />

                    <label className="form-label">Contact Phone</label>
                    <input name="contactPhone" type="text" className="form-control" placeholder="Enter phone number" value={businessData.contactPhone} onChange={handleChange} required />

                    <label className="form-label">Website URL</label>
                    <input name="website" type="text" className="form-control" placeholder="Enter website URL" value={businessData.website} onChange={handleChange} />

                    <label className="form-label">Logo URL</label>
                    <input name="logo" type="text" className="form-control" placeholder="Enter logo image URL" value={businessData.logo} onChange={handleChange} required />

                    <label className="form-label">Address</label>
                    <input name="address" type="text" className="form-control" placeholder="Enter Address" value={businessData.address} onChange={handleChange} required />

                    <label className="form-label">Upload Image 1 (URL)</label>
                    <input name="image0" type="text" className="form-control" placeholder="Enter image URL" value={businessData.images[0]} onChange={handleChange} required />

                    <label className="form-label">Upload Image 2 (URL)</label>
                    <input name="image1" type="text" className="form-control" placeholder="Enter image URL" value={businessData.images[1]} onChange={handleChange} required />

                    <label className="form-label">Upload Image 3 (URL)</label>
                    <input name="image2" type="text" className="form-control" placeholder="Enter image URL" value={businessData.images[2]} onChange={handleChange} required />

                    <button type="submit" className="btn btn-success" style={{ fontSize: "20px", fontWeight: "800", marginTop: "20px" }}>Register Business</button>
                </form>
            </div>
        </div>
    );
}

export default CreateLocalBusinessForm;

