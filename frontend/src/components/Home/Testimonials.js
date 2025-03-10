import React  from "react";
function Testimonials() {
    return ( 
        <div>
            <h2 style={{textAlign:"center",margin:"6%",}}>🗣️ What Our Community Says</h2>
            <div style={{margin:"6%",display:"flex" ,gap:"6%",flexWrap:"wrap",textAlign:"center",justifyContent:"center"}}>
            <div className="testimonial-card" style={{marginBottom:"10px"}}>
                <p>WeConnect helped me organize volunteers for my project seamlessly!</p>
                <h5>— Aarav, Community Organizer</h5>
            </div>
            <div className="testimonial-card" style={{marginBottom:"10px"}}>
                <p>I discovered amazing local businesses that I now visit regularly!</p>
                <h5>— Priya, Local Resident</h5>
            </div>
            <div className="testimonial-card" style={{marginBottom:"10px"}}>
                <p>The job listings helped me land an internship near my home.</p>
                <h5>— Rahul, Student</h5>
            </div>
        </div>
        </div>
        
     );
}

export default Testimonials;