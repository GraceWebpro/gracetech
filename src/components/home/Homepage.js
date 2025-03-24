import React from 'react';
import Banner from '../banner/Banner'
import Slider from '../skills/Skills';
import { Projects } from '../projects/Projects';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';


const Homepage = () => {
    return (
        <div style={{ marginTop: '60px' }}>
            
            <Banner />
            <Slider />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
};

export default Homepage;