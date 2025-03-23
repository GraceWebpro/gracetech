import React from 'react';
import Banner from '../banner/Banner'
//import Skills from '../skills/Skills'
import Projects from '../projects/Projects';
import Slider from '../skills/Skills';

const Homepage = () => {
    return (
        <div style={{ marginTop: '60px' }}>
            
            <Banner />
            <Projects />
            <Slider />
        </div>
    )
};

export default Homepage;