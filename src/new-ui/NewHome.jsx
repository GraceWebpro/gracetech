import React from 'react'
import Hero from './NewDesign/sections/Hero'
import About from './NewDesign/sections/About'
import Skills from './NewDesign/sections/Skills'
import Projects from './NewDesign/sections/Projects'
import Services from './NewDesign/sections/Services'
import Testimonials from './NewDesign/sections/Testimonials'
import Contact from "./NewDesign/sections/Contact"

const NewHome = () => {
  return (
    <div className='min-h-screen bg-black pb-[100vh]'>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </div>
  )
}

export default NewHome
