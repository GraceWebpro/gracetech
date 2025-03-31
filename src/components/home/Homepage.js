import React from 'react';
import Banner from '../banner/Banner'
import Slider from '../skills/Skills';
import { Projects } from '../projects/Projects';
import Contact from '../contact/Contact';
import Example from '../framer';

const Homepage = () => {
    return (
        <div style={{ marginTop: '60px' }}>
            
            <Banner />
            {/*<Slider />
            <Example />
            <Projects />
    <Contact />*/}
        </div>
    )
};

export default Homepage;