import React, { useEffect } from 'react'
import Hero from './NewDesign/sections/Hero'
import About from './NewDesign/sections/About'
import Skills from './NewDesign/sections/Skills'
import Projects from './NewDesign/sections/Projects'
import Services from './NewDesign/sections/Services'
import Testimonials from './NewDesign/sections/Testimonials'
import HomeContact from './NewDesign/sections/HomeContact'
import { useLocation } from "react-router-dom";
import { scrollToSection } from "./hooks/useScrollSpy";

const NewHome = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        scrollToSection(location.state.scrollTo);
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

export default NewHome
