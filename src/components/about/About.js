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
        <h1 data-aos="fade-up" data-aos-duration="1000">
        We are GraceTech, a global agency of designers, developers, and innovators, based in Victoria Highland, Lagos. We specialize in turning ideas into impactful digital solutions to help your business succeed.          </h1>
    
    <Pane />
        
    </div>
  )
}

export default About
