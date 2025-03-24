import React from 'react';
import "../../styles/TopSection.css"
function TopSection({image1,image2,image3,image4,image5,image6}) {
    return ( 
        <div style={{height:"90vh"}} className="top1">
             <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px",padding:"100px 90px 90px 80px"}} className="top">
            <img src={image1} style={{width:"100%",height:"200px",objectFit:"cover",border:"2px solid black",boxShadow:"5px 5px 5px 0px rgba(0,0,0,0.6)",borderRadius:"20px"}} className="small-img"></img>
            <img src={image2} style={{width:"100%",height:"200px",objectFit:"cover",border:"2px solid black",boxShadow:"5px 5px 5px 0px rgba(0,0,0,0.6)",borderRadius:"20px"}} className="small-img"></img>
            <img src={image3} style={{width:"100%",height:"200px",objectFit:"cover",gridColumn:"span 2",border:"2px solid black",boxShadow:"5px 5px 5px 0px rgba(0,0,0,0.6)",borderRadius:"20px"}} className="large-img"></img>
            <img src={image4} style={{width:"100%",height:"200px",objectFit:"cover",gridColumn:"span 2",border:"2px solid black",boxShadow:"5px 5px 5px 0px rgba(0,0,0,0.6)",borderRadius:"20px"}} className="large-img"></img>
            <img src={image5} style={{width:"100%",height:"200px",objectFit:"cover",border:"2px solid black",boxShadow:"5px 5px 5px 0px rgba(0,0,0,0.6)",borderRadius:"20px"}} className="small-img"></img>
            <img src={image6} style={{width:"100%",height:"200px",objectFit:"cover",border:"2px solid black",boxShadow:"5px 5px 5px 0px rgba(0,0,0,0.6)",borderRadius:"20px"}} className="small-img"></img>

             </div>
        </div>
       
     );
}

export default TopSection;