import React from 'react';
import Banner from '../banner/Banner'
import Skills from '../skills/Skills'

const Homepage = () => {
    return (
        <div style={{ marginTop: '60px' }}>
            
            <Banner />
            <Skills />
            <div style={{ textAlign: 'center' }}>
                <h1>homepage</h1>
            </div>
        </div>
    )
};

export default Homepage;