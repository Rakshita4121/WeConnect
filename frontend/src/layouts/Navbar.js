import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import CSS file
import { AuthContext } from "../context/AuthContext";
import profileGif from "../assets/getimg_ai_img-0lsqCXQHwIksIkoXtbx4N.jpeg"; // Profile GIF before login
import profileIcon from "../assets/getimg_ai_img-Bl0wf9neCONEgSXjnZWei.jpeg";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Get user state from context

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Toggle Button (Only for small screens) */}
          <button className="menu-btn" onClick={() => setIsOpen(true)}>
            <FaBars size={24} />
          </button>

          {/* Logo */}
          <a href="/" className="logo">WeConnect</a>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            <li><a href="/events">Events</a></li>
            <li><a href="/localbusinesses">Businesses</a></li>
            <li><a href="/organizations">Organizations</a></li>
            <li><a href="/announcements">Announcements</a></li>
            <li><a href="/news">News</a></li>
            <div className="profile-section">
            {user ? (
              <div className="profile-dropdown">
                <div className="dropdown-content">
                  <Link to="/profile"><img src={profileIcon} alt="Profile" className="profile-img" /></Link>
                  <button onClick={logout} className="btn btn-success" style={{fontSize:"15px"}}>Logout</button>
                </div>
              </div>
            ) : (
              <>
              </>
            )}
          </div>
          </ul>
          
        </div>
      </nav>

      {/* Sidebar for Small Screens */}
      {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)}></div>
          <div className="sidebar">
            <div className="sidebar-header">
              <a href="/" className="logo">WeConnect</a>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <FaTimes size={24} />
              </button>

            </div>
            {
              user? (
                <Link to="/profile" style={{textDecoration:"none",color:"grey",fontSize:"22px",fontWeight:"800",curser:"pointer",paddingTop:"10px"}}>Hi,{user.username}</Link>
              ):(
                <></>
              )
            }

            <ul className="sidebar-links">
            <li><a href="/events" style={{color:"green",fontSize:"18px",textDecoration:"none",fontWeight:"700"}}>Events</a></li>
              <li><a href="/localbusinesses" style={{color:"green",fontSize:"18px",textDecoration:"none",fontWeight:"700"}}>Businesses</a></li>
              <li><a href="/organizations" style={{color:"green",fontSize:"18px",textDecoration:"none",fontWeight:"700"}}>Organizations</a></li>
              <li><a href="/announcements" style={{color:"green",fontSize:"18px",textDecoration:"none",fontWeight:"700"}}>Announcements</a></li>
              <li><a href="/news" style={{color:"green",fontSize:"18px",textDecoration:"none",fontWeight:"700"}}>News</a></li>
            </ul>
            <div className="sidebar-footer">
              {user ? (
                <button className="btn btn-danger" onClick={logout} style={{fontSize:"20px"}}>Logout</button>
              ) : (
                <>
                  <Link to="/login"><button className="login-btn" style={{fontSize:"20px"}}>Log in</button></Link>
                  <Link to="/signup"><button className="signup-btn" style={{fontSize:"20px"}}>Sign up</button></Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
