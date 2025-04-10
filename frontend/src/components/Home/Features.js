import React from 'react';
import homeabout from '../../assets/homeabout.jpg';

function Features() {
    return ( 
        <div style={{marginTop:"50px"}}>
            <div className='features-container'>
               <div >
                   <h1>Get the most of your community with WeConnect</h1>
                   <p > WeConnect is designed to bring communities closer by offering a platform 
                       where local businesses, organizations, and individuals can engage, share updates, 
                       and collaborate effectively. Stay informed, find opportunities, and make meaningful 
                       connections all in one place.</p>
               </div>
                <img src={homeabout} className="featuresimage  featuresimg-responsive" alt="Home About" style={{width:"350px",height:"300px"}}></img>
            </div>
        </div>
    );
}

export default Features;
