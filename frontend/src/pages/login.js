import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import image from "../assets/getimg_ai_img-GxykPKpPpM9MEvPRj0iYQ.jpeg";
import { AuthContext } from "../context/AuthContext";

function LogIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // Get the previous location
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const from = location.state?.from || "/"; // Default redirect path is "/"

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);
            alert(response.message || "Login successful!");
            if (response.success) {
                navigate(from); // Redirect to where the user originally wanted to go
            } else {
                setCredentials({
                    username: "",
                    password: ""
                });
            }
        } catch (error) {
            alert("Login failed! Invalid username or password.");
        }
    };

    return (
        <div className='row' style={{
            padding: "110px 6%",
            background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh"
        }}>
            <div className='col-lg-6 col-sm-10 col-md-8 offset-lg-3 offset-md-2 offset-sm-1' style={{
                border: "2px solid green",
                borderRadius: "20px",
                padding: "3%",
                boxShadow: "0px 15px 25px rgba(62, 218, 62, 0.4)",
                transform: "translateY(-10px)",
                transition: "all 0.3s ease-in-out"
            }}>
                <h2 style={{ marginBottom: "20px", textAlign: "center", color: "darkgreen", fontWeight: "bold" }}>Login on WeConnect</h2>
                <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label form-font" style={{ fontSize: "20px", fontWeight: "bold" }}>Username</label>
                        <input
                            name="username"
                            placeholder="Enter username"
                            type="text"
                            id="username"
                            className="form-control input-border"
                            required
                            style={{ border: "1px solid black", color: "green", fontWeight: "800", fontSize: "18px" }}
                            value={credentials.username}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            Please enter the username.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label form-font" style={{ fontSize: "20px", fontWeight: "bold" }}>Password</label>
                        <input
                            name="password"
                            placeholder="Enter password"
                            type="password"
                            id="password"
                            className="form-control input-border"
                            required
                            style={{ border: "1px solid black", color: "green", fontWeight: "800", fontSize: "18px" }}
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            Please enter the password.
                        </div>
                    </div>

                    <p>Don't have an account? <Link to={"/signup"} style={{ textDecoration: "none" }}>Sign Up</Link></p>
                    <button type="submit" className="btn btn-success" style={{ fontSize: "22px", fontWeight: "bold" }}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
