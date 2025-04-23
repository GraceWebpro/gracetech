import React, { useEffect } from 'react';
import Banner from '../banner/Banner'
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
//import Banner2 from '../banner/Banner2';
//import Meeting from '../projects/Meeting'



const Homepage = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  }, [location]);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS
      }, []);
    
    return (
        <div style={{ marginTop: '60px' }}>
            
            
            <Banner />
            <About />
           
            <Projects />
            <ProjectContact />
            <Services />
            <WorkingProcess />
            <Testimonial />
            <HomeBlog />
            <HomeContact />
        </div>
    )
};

export default Homepage;