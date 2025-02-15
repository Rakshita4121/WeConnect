import React from 'react'
function About() {
    return (  
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1px solid #28A745",borderRadius:"20px", margin:"6%", padding:"3%"}}>
            <div className='text-center'>
                <h2 style={{margin:"20px 0px"}}>About WeConnect</h2>
                <h5>
                WeConnect is your local community hub, helping residents, businesses, <br></br>and organizations connect. Whether it’s local news, <br></br>job opportunities, or volunteer work, everything is just a click away.
                </h5>
                <h4 style={{margin:"20px 0px"}}>Why join us?</h4>
                <ul class="features-list" style={{display: "flex",flexDirection: "column",alignItems: "center",textAlign: "left !important"}}>
                    <li>Stay updated with community news & announcements.</li>
                    <li>Discover and support our nearby local businesses.</li>
                    <li>Connect with like-minded individuals and friends.</li>
                </ul>
            </div>
        </div>
    );
}

export default About;