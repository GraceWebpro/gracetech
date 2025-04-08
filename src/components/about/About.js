import React from 'react'
import headast from '../../assets/asterick.png'
import './About.css'
//import Tab from "../projects/Tab";
//import TabsPanel from "../projects/TabsPanel";
import Pane from './AboutTab';

const About = () => {
  return (
    <div className='about' id='about'>
        <img src={headast} alt='head logo' className='headast' data-aos="zoom-in"  />
        <h1 data-aos="fade-up">I'm Grace Wilson, I'm a UI & UX Designer, Currently residing in Victoria Highland Lagos, GraceTech operates globally and is ready to take on any design/development challenge.</h1>
    
    <Pane />
        
    </div>
  )
}

export default About
