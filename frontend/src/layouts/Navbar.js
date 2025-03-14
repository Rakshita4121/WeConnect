import React from 'react';

function Navbar() {
    return ( 
    <nav className="navbar navbar-expand-lg sticky-top" 
        style={{
            borderBottomLeftRadius: "40px",
            borderBottomRightRadius: "40px",
            fontSize:"18px"
        }}>
        <div className="container-fluid">
            <a class="navbar-brand" href="#" style={{fontSize:"20px"}}>
                WeConnect
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ms-auto">
                    <a className="nav-link  navborder" href="/signup">SignUp</a>
                    <a className="nav-link  navborder" href="/login">Login</a>
                    <a className="nav-link navborder" href="/events">Events</a>
                    <a className="nav-link navborder">Announcements</a>
                    <a className="nav-link  navborder">News</a>
                    <a className="nav-link  navborder" href="/localbusinesses">Local Businesses</a>
                    <a className="nav-link  navborder" href="/organizations">Organisations</a>
                </div>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;
