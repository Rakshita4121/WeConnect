import React from 'react';
import homeabout from '../../assets/getimg_ai_img-DzrDODdbHtp6Gt7ya2bUh (1).jpeg'
import {Link} from "react-router-dom"
function HeroSection() {
    return(
        <div style={{height:"100vh",width:"100%"}}>
            <img src={homeabout} style={{height:"700px",width:"100%"}}></img>
            <div style={{
                position: "absolute",
                top: "50%",
                left: "38%",
                transform: "translate(-30%, -30%)",
                textAlign: "center",
                color: "white",
                background: "rgba(0, 0, 0, 0.6)", // Slight dark overlay for better visibility
                padding: "20px",
                borderRadius: "10px"
            }}>
                <h1 style={{ fontSize: "34px", marginBottom: "10px"}}>Welcome to WeConnect</h1>
                <p style={{ fontSize: "20px", marginBottom: "20px" }}>
                WeConnect is your one-stop platform to stay updated with local businesses, 
                    community events, and announcements.
                </p>
                <Link to={"/login"}>
                <button style={{
                    padding: "10px 30px",
                    fontSize: "20px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>
                    Login
                </button>
                </Link>
                
            </div>
        </div>
    )
}

export default HeroSection;