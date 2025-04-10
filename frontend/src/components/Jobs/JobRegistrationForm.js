import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import image from "../../assets/getimg_ai_img-DzrDODdbHtp6Gt7ya2bUh (1).jpeg";
import FormComponent from "../genral/Form";

function JobRegistrationForm() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios
          .get(`http://localhost:3002/jobs/${id}`) // Fetch job details
          .then((res) => setJob(res.data))
          .catch((error) => console.error("Error fetching job details:", error));
    }, [id]);

    const initialState = {
        name: '',
        email: '',
        mobileNo: ''
    };

    const fields = [
        { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
        { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
        { name: "mobileNo", label: "Contact Number", type: "number", placeholder: "Enter your contact number" },
    ];

    const handleSubmit = async (formData) => {
        try {
            let response = await axios.post(`http://localhost:3002/jobs/${id}/apply`, 
                { 
                    jobId: id,
                    businessId:job.businessId,
                    userId: user._id, 
                    name: formData.name, 
                    email: formData.email, 
                    mobileNo: formData.mobileNo
                }, 
                { withCredentials: true, headers: { "Content-Type": "application/json" }}
            );
            alert(response.data.message);
            navigate(`/jobs/${id}`);
        } catch (error) {
            const message =
            error.response?.data?.message || "Something went wrong while applying";
        alert(message);

        // Redirect if already applied
        if (message === "You have already applied for this job.") {
            navigate(`/jobs/${id}`);
        }
    }
    };

    return (
        <div className='row top-conteiner' style={{ padding: "110px 6%", background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{ border: "2px solid green", borderRadius: "20px",
                padding: "3%", 
                boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)", 
                transform: "translateY(-10px)",
                transition: "all 0.3s ease-in-out" }}>
                
                {job ? (
                  <h2 className="text-center" style={{color:"darkgreen", fontSize:"32px", fontWeight:"bold"}}>
                    Apply for {job.title}
                  </h2>
                ) : (
                  <h2 className="text-center" style={{color:"darkgreen", fontSize:"32px", fontWeight:"bold"}}>
                    Loading job details...
                  </h2>
                )}

                <FormComponent fields={fields} initialState={initialState} onSubmit={handleSubmit} buttonText="Apply" />
            </div>
        </div>
    );
}

export default JobRegistrationForm;
