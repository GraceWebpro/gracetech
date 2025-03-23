import React from 'react';
import Banner from '../banner/Banner'
import Slider from '../skills/Skills';
import Projects from '../projects/Projects';

const Homepage = () => {
    return (
        <div style={{ marginTop: '60px' }}>
            
            <Banner />
            <Slider />
            <Projects />
        </div>
    )
};

export default Homepage;