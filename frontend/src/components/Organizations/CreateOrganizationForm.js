import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg"
const CreateOrganizationForm = () => {
    const navigate = useNavigate();

    const [orgData, setOrgData] = useState({
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        website: '',
        logo: '',
        foundedBy: '',
        isNonProfit: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setOrgData({ 
            ...orgData, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting organization:", orgData);

        try {
            let response = await axios.post("http://localhost:3002/organizations", orgData, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Response:", response);
            alert(response.data.message);
            navigate(`/organizations/${response.data.organization._id}`); // Redirect after creation
        } catch (error) {
            console.error("Error creating organization:", error);

            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Status Code:", error.response.status);
            } else if (error.request) {
                console.error("No Response from Server:", error.request);
            } else {
                console.error("Axios Error:", error.message);
            }
        }
    };

    return (
        <div className='row' style={{ padding:"110px 6%",background:`linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{border: "2px solid green", borderRadius:"20px",
            padding: "3%", 
            boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", 
            transform: "translateY(-10px)",
            transition: "all 0.3s ease-in-out" }}>
                <h2 className="text-center" style={{color:"darkgreen",fontSize:"32px",fontWeight:"bold"}}>Create an Organization</h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label form-font" style={{fontSize:"20px",fontWeight:"bold"}}>Organization Name</label>
                        <input name="name" id="name" type="text" className="form-control input-border" placeholder="Enter organization name" value={orgData.name} onChange={handleChange} required                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label form-font">Description</label>
                        <textarea name="description" id="description" className="form-control input-border" placeholder="Enter organization description" value={orgData.description} onChange={handleChange} required                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactEmail" className="form-label form-font" style={{fontSize:"20px",fontWeight:"bold"}}>Contact Email</label>
                        <input name="contactEmail" id="contactEmail" type="email" className="form-control input-border" placeholder="Enter contact email" value={orgData.contactEmail} onChange={handleChange} required                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactPhone" className="form-label form-font" style={{fontSize:"20px",fontWeight:"bold"}}>Contact Phone</label>
                        <input name="contactPhone" id="contactPhone" type="text" className="form-control input-border" placeholder="Enter contact phone" value={orgData.contactPhone} onChange={handleChange} required                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label form-font" style={{fontSize:"20px",fontWeight:"bold"}}>Address</label>
                        <input name="address" id="address" type="text" className="form-control input-border" placeholder="Enter address" value={orgData.address} onChange={handleChange} required                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="website" className="form-label form-font" style={{fontSize:"20px",fontWeight:"bold"}}>Website</label>
                        <input name="website" id="website" type="text" className="form-control input-border" placeholder="Enter website URL" value={orgData.website} onChange={handleChange}                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="logo" className="form-label form-font" style={{fontSize:"20px",fontWeight:"bold"}}>Logo URL</label>
                        <input name="logo" id="logo" type="text" className="form-control input-border" placeholder="Enter logo image URL" value={orgData.logo} onChange={handleChange} required                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="foundedBy" className="form-label form-font" style={{fontSize:"20px",fontWeight:"bold"}}>Founded By</label>
                        <input name="foundedBy" id="foundedBy" type="text" className="form-control input-border" placeholder="Enter founder names (comma-separated)" value={orgData.foundedBy} onChange={handleChange} required                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="isNonProfit" name="isNonProfit" checked={orgData.isNonProfit} onChange={handleChange}                             style={{border:"1px solid black",color:"green",fontWeight:"800",fontSize:"18px"}}
/>
                        <label className="form-check-label" htmlFor="isNonProfit">Is this a non-profit organization?</label>
                    </div>

                    <button type="submit" className="btn btn-success" style={{fontSize:"20px",fontWeight:"800"}}>Create Organization</button>
                </form>
            </div>
        </div>
    );
}

export default CreateOrganizationForm;
