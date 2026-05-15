import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../hooks/useScrollSpy";
import Hero from '../sections/Hero';
import './Home.css'
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import HomeContact from '../sections/HomeContact';

const Homepage = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.state?.scrollTo) {
        setTimeout(() => {
          scrollToSection(location.state.scrollTo);
        }, 100);
      }
    }, [location]);
    
    useEffect(() => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
  
        // delay ensures DOM is ready
        setTimeout(() => {
          scrollToSection(id);
        }, 100);
      }
    }, [location]);

  return (
    <div className='min-h-screen bg-black'>
        <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Testimonials />
            <HomeContact />
        </main>
    </div>
  )
}

export default Homepage
