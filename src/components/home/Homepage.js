import React from 'react';
import Banner from '../banner/Banner'
import { Projects } from '../projects/Projects';
import Contact from '../contact/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import About from '../about/About';


const Homepage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS
      }, []);
    
    return (
        <div style={{ marginTop: '60px' }}>
            
            <Banner />
            <About />
           
            <Projects />
            <Contact />
        </div>
    )
};

export default Homepage;