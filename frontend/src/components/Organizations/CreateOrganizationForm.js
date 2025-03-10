import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div className='row' style={{ margin: "4% 6%" }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'>
                <h2 style={{ marginBottom: "20px" }}>Create an Organization</h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label form-font">Organization Name</label>
                        <input name="name" id="name" type="text" className="form-control input-border" placeholder="Enter organization name" value={orgData.name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label form-font">Description</label>
                        <textarea name="description" id="description" className="form-control input-border" placeholder="Enter organization description" value={orgData.description} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactEmail" className="form-label form-font">Contact Email</label>
                        <input name="contactEmail" id="contactEmail" type="email" className="form-control input-border" placeholder="Enter contact email" value={orgData.contactEmail} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contactPhone" className="form-label form-font">Contact Phone</label>
                        <input name="contactPhone" id="contactPhone" type="text" className="form-control input-border" placeholder="Enter contact phone" value={orgData.contactPhone} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label form-font">Address</label>
                        <input name="address" id="address" type="text" className="form-control input-border" placeholder="Enter address" value={orgData.address} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="website" className="form-label form-font">Website</label>
                        <input name="website" id="website" type="text" className="form-control input-border" placeholder="Enter website URL" value={orgData.website} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="logo" className="form-label form-font">Logo URL</label>
                        <input name="logo" id="logo" type="text" className="form-control input-border" placeholder="Enter logo image URL" value={orgData.logo} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="foundedBy" className="form-label form-font">Founded By</label>
                        <input name="foundedBy" id="foundedBy" type="text" className="form-control input-border" placeholder="Enter founder names (comma-separated)" value={orgData.foundedBy} onChange={handleChange} required />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="isNonProfit" name="isNonProfit" checked={orgData.isNonProfit} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isNonProfit">Is this a non-profit organization?</label>
                    </div>

                    <button type="submit" className="btn btn-success">Create Organization</button>
                </form>
            </div>
        </div>
    );
}

export default CreateOrganizationForm;
