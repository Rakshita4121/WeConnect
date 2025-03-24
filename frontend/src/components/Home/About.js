import React from 'react';
import '../../styles/About.css'; // Import the CSS file

function About() {
    return (  
        <div className="about-container">
            <div className='text-center'>
                <h2><b>About WeConnect</b></h2>
                <h5>
                    WeConnect is your local community hub, helping residents, businesses, 
                    and organizations connect. Whether it’s local news, job opportunities, or 
                    volunteer work, everything is just a click away.
                </h5>
                <h4>Why join us?</h4>
                <ul className="features-list">
                    <li>Stay updated with community news & announcements.</li>
                    <li>Discover and support our nearby local businesses.</li>
                    <li>Connect with like-minded individuals and friends.</li>
                </ul>
            </div>
        </div>
    );
}

export default About;
