import React, { useState ,useContext} from 'react';
import image from "../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
function SignUp() {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        mobile: "",
        role: ""
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await signup(credentials);
            alert(response.message || "Sign-up successful!");
            if(response.success){
                navigate("/login")
            }
            else{
                setCredentials({name: "",
                username: "",
                email: "",
                password: "",
                mobile: "",
                role: ""})
            }
        } catch (error) {
            alert("Sign-up failed! Please try again.");
        }
    };

    return (
        <div className='row' style={{ 
            padding: "110px 6%",
            background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1' style={{
                border: "2px solid green",
                borderRadius: "20px",
                padding: "3%",
                boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)",
                transform: "translateY(-10px)",
                transition: "all 0.3s ease-in-out"
            }}>
                <h2 style={{ marginBottom: "20px", fontWeight: "bold", color: "darkgreen", textAlign: "center" }}>SignUp on WeConnect</h2>
                <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                    {["name", "username", "email", "password", "mobile"].map((field, index) => (
                        <div className="mb-3" key={index}>
                            <label htmlFor={field} className="form-label form-font" style={{ fontSize: "20px", fontWeight: "bold" }}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input 
                                name={field}
                                placeholder={`Enter ${field}`} 
                                type={field === "password" ? "password" : "text"}
                                id={field}
                                className="form-control input-border"
                                required
                                style={{ border: "1px solid black", color: "green", fontWeight: "800", fontSize: "18px" }}
                                value={credentials[field]}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                                Please enter your {field}.
                            </div>
                        </div>
                    ))}

                    <div className="mb-3">
                        <label htmlFor="role" className="form-label form-font" style={{ fontSize: "20px", fontWeight: "bold" }}>Role</label>
                        <select
                            name="role"
                            id="role"
                            className="form-control input-border"
                            required
                            style={{ border: "1px solid black", color: "green", fontWeight: "800", fontSize: "18px" }}
                            value={credentials.role}
                            onChange={handleChange}
                        >
                            <option value="">Select a role</option>
                            <option value="Resident">Resident</option>
                            <option value="Community Head">Community Head</option>
                            <option value="Organization Member">Organization Member</option>
                        </select>
                        <div className="invalid-feedback">Please select a role.</div>
                    </div>

                    <button type="submit" className="btn btn-success">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
