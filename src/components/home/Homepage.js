import React, { useEffect } from 'react';
//import Banner from '../banner/Banner'
import { Projects } from '../projects/HomeProjects';
import HomeContact from '../contact/HomeContact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from '../about/About';
import Services from '../services/HomeServices';
import WorkingProcess from '../process/WorkingProcess';
import Testimonial from '../testimonial/Testimonial';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import ProjectContact from '../contact/ProjectContact';
import Blog from '../blog/Blog';
import HomeBlog from '../blog/HomeBlog';
import HeroSection from './Hero';
//import Banner2 from '../banner/Banner2';
//import Meeting from '../projects/Meeting'



const Homepage = () => {
    const location = useLocation();
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const scrollTo = params.get('scrollTo');
  
      if (scrollTo) {
        // Delay to ensure the section is mounted
        setTimeout(() => {
          const targetElement = document.getElementById(scrollTo);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // small delay for DOM to fully render
      }
    }, [location]);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS
      }, []);
    
    return (
        <div style={{ marginTop: '60px' }}>
            
            
            <HeroSection />
            <About />
           
            <Projects />
            <ProjectContact />
            <Services />
            <WorkingProcess />
            <Testimonial />
            <HomeBlog />
        </div>
    )
};

export default Homepage;