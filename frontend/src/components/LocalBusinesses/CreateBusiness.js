import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg";
import { AuthContext } from "../../context/AuthContext";

const CreateLocalBusinessForm = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [businessData, setBusinessData] = useState({
        name: "",
        shortDescription: "",
        description: "",
        contactEmail: "",
        contactPhone: "",
        website: "",
        address: ""
    });

    const [logoFile, setLogoFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([null, null, null]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusinessData({
            ...businessData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");

        if (!user || !user._id) {
            console.warn("User not authenticated:", user);
            alert("User not authenticated. Please log in again.");
            return;
        }

        const formData = new FormData();

        // Append text fields
        Object.entries(businessData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append("ownerId", user._id);

        // Append file fields
        if (logoFile) {
            formData.append("logo", logoFile);
        }

        imageFiles.forEach((file) => {
            if (file) {
                formData.append("images", file);
            }
        });

        // Debug: Log FormData content
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:3002/localbusinesses", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            console.log("Response:", response);
            alert(response.data.message);
            navigate("/localbusinesses");
        } catch (error) {
            console.error("Error creating business:", error.response || error);
            alert("Failed to create business. Check console for more details.");
        }
    };

    return (
        <div
            className="row"
            style={{
                padding: "110px 6%",
                background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <div
                className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1"
                style={{
                    border: "2px solid green",
                    borderRadius: "20px",
                    padding: "3%",
                    boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)",
                    transform: "translateY(-10px)",
                    transition: "all 0.3s ease-in-out"
                }}
            >
                <h2 className="text-center" style={{ color: "darkgreen", fontSize: "32px", fontWeight: "bold" }}>
                    Register a Local Business
                </h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="needs-validation">
                    {/* Inputs */}
                    <label className="form-label">Business Name</label>
                    <input name="name" type="text" className="form-control" value={businessData.name} onChange={handleChange} required />

                    <label className="form-label">Short Description</label>
                    <input name="shortDescription" type="text" className="form-control" value={businessData.shortDescription} onChange={handleChange} required />

                    <label className="form-label">Full Description</label>
                    <textarea name="description" className="form-control" value={businessData.description} onChange={handleChange} required />

                    <label className="form-label">Contact Email</label>
                    <input name="contactEmail" type="email" className="form-control" value={businessData.contactEmail} onChange={handleChange} required />

                    <label className="form-label">Contact Phone</label>
                    <input name="contactPhone" type="text" className="form-control" value={businessData.contactPhone} onChange={handleChange} required />

                    <label className="form-label">Website URL</label>
                    <input name="website" type="text" className="form-control" value={businessData.website} onChange={handleChange} />

                    <label className="form-label">Logo</label>
                    <input name="logo" type="file" className="form-control" onChange={(e) => setLogoFile(e.target.files[0])} required />

                    <label className="form-label">Address</label>
                    <input name="address" type="text" className="form-control" value={businessData.address} onChange={handleChange} required />

                    <label className="form-label">Upload Image 1</label>
                    <input type="file" className="form-control" onChange={(e) => {
                        const files = [...imageFiles];
                        files[0] = e.target.files[0];
                        setImageFiles(files);
                    }} required />

                    <label className="form-label">Upload Image 2</label>
                    <input type="file" className="form-control" onChange={(e) => {
                        const files = [...imageFiles];
                        files[1] = e.target.files[0];
                        setImageFiles(files);
                    }} required />

                    <label className="form-label">Upload Image 3</label>
                    <input type="file" className="form-control" onChange={(e) => {
                        const files = [...imageFiles];
                        files[2] = e.target.files[0];
                        setImageFiles(files);
                    }} required />

                    <button type="submit" className="btn btn-success mt-3" style={{ fontSize: "20px", fontWeight: "800" }}>
                        Register Business
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateLocalBusinessForm;
