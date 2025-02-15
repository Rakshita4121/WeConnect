import React from 'react';
function HeroSection() {
    return ( 
        <div className='mt-5 mx-0 hero-bg'>
            <div className='row'>
                <div className='col-8 col-sm-10 offset-sm-1 offset-2 text-center'>
                    <h2>Connecting You with Your Community!</h2>
                    <p>WeConnect is your local hub for news, events, businesses, and volunteer opportunities. <br />Stay informed, get involved, and grow together!</p>
                    <button className='btn btn-success'>Sign Up</button> &nbsp;&nbsp;
                    <button className='btn btn-success '>Join Discussion</button>
                </div>
            </div>
        </div>
     );
}

export default HeroSection;