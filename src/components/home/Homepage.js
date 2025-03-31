import React from 'react';
import Banner from '../banner/Banner'
import Slider from '../skills/Skills';
import { Projects } from '../projects/Projects';
import Contact from '../contact/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Homepage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS
      }, []);
    
    return (
        <div style={{ marginTop: '60px' }}>
            
            <Banner />
            <Slider />
            <Projects />
            <Contact />
        </div>
    )
};

export default Homepage;