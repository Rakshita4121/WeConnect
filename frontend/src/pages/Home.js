import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import Features from '../components/Home/Features';
import About from '../components/Home/About';
import Testimonials from '../components/Home/Testimonials';
import CtaSignup from '../components/Home/CtaSignup';
function HomePage() {
    return ( 
        <div>
            <HeroSection />
            <Features />
            <About />
            <Testimonials />
            <CtaSignup />
        </div>
     );
}

export default HomePage;