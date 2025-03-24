import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams ,Link } from "react-router-dom";
import image from "../../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg"
const EditOrganizationForm = () => {
    const { id } = useParams(); // Get organization ID from URL
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

    useEffect(() => {
        // Fetch existing organization details
        const fetchOrganization = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/organizations/${id}`);
                const data = response.data;

                setOrgData({
                    name: data.name,
                    description: data.description,
                    contactEmail: data.contactEmail,
                    contactPhone: data.contactPhone,
                    address: data.address,
                    website: data.website,
                    logo: data.logo,
                    foundedBy: data.foundedBy.join(", "), // Convert array to comma-separated string
                    isNonProfit: data.isNonProfit,
                });
            } catch (error) {
                console.error("Error fetching organization:", error);
            }
        };

        fetchOrganization();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setOrgData({ 
            ...orgData, 
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Updating organization:", orgData);

        try {
            let response = await axios.put(`http://localhost:3002/organizations/${id}`, {
                ...orgData,
                foundedBy: orgData.foundedBy.split(",").map(name => name.trim()), // Convert back to array
            }, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Response:", response);
            alert(response.data.message);
            navigate(`/organizations/${id}`); // Redirect to organization details page
        } catch (error) {
            console.error("Error updating organization:", error);
        }
    };

    return (
        <div className='row' style={{ padding:"110px 6%",background:`linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'  style={{border: "2px solid green", borderRadius:"20px",
            padding: "3%", 
            boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", 
            transform: "translateY(-10px)",
            transition: "all 0.3s ease-in-out" }}>
                <h2 style={{ marginBottom: "20px" }}>Edit Organization</h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label form-font">Organization Name</label>
                        <input name="name" id="name" type="text" className="form-control input-border" value={orgData.name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label form-font">Description</label>
                        <textarea name="description" id="description" className="form-control input-border" value={orgData.description} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactEmail" className="form-label form-font">Contact Email</label>
                        <input name="contactEmail" id="contactEmail" type="email" className="form-control input-border" value={orgData.contactEmail} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactPhone" className="form-label form-font">Contact Phone</label>
                        <input name="contactPhone" id="contactPhone" type="text" className="form-control input-border" value={orgData.contactPhone} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label form-font">Address</label>
                        <input name="address" id="address" type="text" className="form-control input-border" value={orgData.address} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="website" className="form-label form-font">Website</label>
                        <input name="website" id="website" type="text" className="form-control input-border" value={orgData.website} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="logo" className="form-label form-font">Logo URL</label>
                        <input name="logo" id="logo" type="text" className="form-control input-border" value={orgData.logo} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="foundedBy" className="form-label form-font">Founded By</label>
                        <input name="foundedBy" id="foundedBy" type="text" className="form-control input-border" value={orgData.foundedBy} onChange={handleChange} required />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="isNonProfit" name="isNonProfit" checked={orgData.isNonProfit} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isNonProfit">Is this a non-profit organization?</label>
                    </div>

                    <button type="submit" className="btn btn-success" style={{fontSize:"20px",fontWeight:"bold"}}>Update Organization</button>
                </form>
            </div>
        </div>
    );
}

export default EditOrganizationForm;
