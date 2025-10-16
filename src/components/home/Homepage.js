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
import CustomCursor from '../CustomCursor';
import HeroSection2 from './Hero2';
//import Banner2 from '../banner/Banner2';
//import Meeting from '../projects/Meeting'
import { Helmet } from "react-helmet-async";




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
        <Helmet>
          <title>GraceTech — UI/UX Designer & Web Developer</title>
          <meta
            name="description"
            content="GraceTech creates modern web experiences using React, Firebase, and clean UI/UX design. Explore portfolio, templates, and tutorials."
            />
          <link rel="canonical" href="https://gracetech.vercel.app/" />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "GraceTech",
              "url": "https://gracetech.vercel.app",
              "jobTitle": "UI/UX Designer & Web Developer",
              "sameAs": [
                "https://www.linkedin.com/in/yourusername",
                "https://www.behance.net/yourprofile",
                "https://twitter.com/yourusername"
              ]
            })}
          </script>

          {/* Open Graph (Facebook/LinkedIn preview) */}
          <meta property="og:title" content="GraceTech — UI/UX Designer & Web Developer" />
          <meta
            property="og:description"
            content="Explore my portfolio, UI/UX design work, and full React projects."
          />
          <meta property="og:url" content="https://gracetech.vercel.app/" />
          <meta property="og:image" content="https://gracetech.vercel.app/og-preview.jpg" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="GraceTech — UI/UX Designer & Web Developer" />
          <meta
            name="twitter:description"
            content="Modern React websites, UI/UX design, and tutorials by GraceTech."
            />
          <meta name="twitter:image" content="https://gracetech.vercel.app/og-preview.jpg" />
        </Helmet>

            <main>
              <HeroSection2 /> 
              <CustomCursor />
              <About />
            
              <Projects />
              <ProjectContact />
              <Services />
              <WorkingProcess />
              <Testimonial />
              <HomeBlog />
            </main>
        </div>
    )
};

export default Homepage;