import React from 'react';
import homeabout from '../../assets/homeabout.jpg';

function Features() {
    return ( 
        <div style={{marginTop:"50px"}}>
            <div className='features-container'>
                <div>
                <h3 className='text-center'>Explore Your Community with WeConnect.</h3>
                <br></br>
                <ul>
                    <li>
                        <h4>🏡 Local Businesses</h4>
                        <p>Discover, support, and connect with nearby businesses and services.</p>
                    </li>
                    <li>
                        <h4>🔔 News & Announcements</h4>
                        <p>Stay updated with community news, alerts, and important updates.</p>
                    </li>
                    <li>
                        <h4>🎉 Events & Meetups </h4>
                        <p>Explore, join, and participate in local gatherings and activities.</p>
                    </li>
                    <li>
                        <h4>🤝 Volunteer Opportunities</h4>
                        <p>Contribute, engage, and make a difference through community projects.</p>
                    </li>
                    <li>
                        <h4>💼 Job Listings </h4>
                        <p> Find, apply, and explore career opportunities from local businesses.</p>
                    </li>
                </ul>
                </div>
                <img src={homeabout} className="featuresimage  featuresimg-responsive" alt="Home About"></img>
            </div>
        </div>
    );
}

export default Features;
