import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react';
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb } from 'react-icons/si';
import { STATS } from '../utils/constants';
import { scrollToSection } from '../hooks/useScrollSpy';
import FadeIn from '../animations/FadeIn';
import RadialGradient from '../backgrounds/RadialGradient';
import { Link } from 'react-router-dom';
import HowWeWork from './HowWeWork';


const rotatingWords = [
  'Web Development',
  'UI/UX Design',
  'Brand Strategy',
  'SEO Optimization',
  'AI-Powered Videos',
  'Interactive Web Apps'
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const WHATSAPP_NUMBER = "2347043421913";

  const hireMeWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi, I am contacting you from your website. I want to hire you for a project.\n\nProject details:\n- Type of project:\n- Budget:\n- Timeline:\n\nLet’s talk."
  )}`;

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden bg-black mt-8'>
      <RadialGradient variant="hero" />

      {/* Content Conatiner */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* left column - ontent */}
          <div className='text-left' >
            <FadeIn delay={0}>
              <div className='inline-flex items-center gap-2.5 px-[18px] py-[11px] mb-8
                bg-gradient-to-r from-primary/10 via-primary/15 to-primary/20
                border border-primary/20 rounded-full'
              >                
                <Star className='w-4 h-4 text-white fill-white' />
                <span className='text-xs md:text-sm text-white tracking-[1.2px]'>
                NEW: AI-Powered Videos for Ads, Tutorials & Brand Stories.                </span>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="font-normal mb-5 text-[clamp(1rem,3vw,2rem)]">
                GraceTech Builds
              </h1>

              <motion.h2
                key={index}
                className="font-bold highlight text-[clamp(2rem,6vw,3rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {rotatingWords[index]}
              </motion.h2>
            </FadeIn>

            <FadeIn delay={200} className='w-full flex'>
              <p className="
                text-base sm:text-md
                text-white/70
                max-w-[550px]
                mb-6
                leading-relaxed
              ">
                We design and build high-performance digital products — from interactive web apps to AI-powered content — for modern brands.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex items-center gap-3 mb-10 flex-nowrap">

                {/* Primary CTA */}
                <a
                  href={hireMeWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                  px-6 py-3
                  max-[400px]:px-4
                  max-[400px]:py-2
                  max-[400px]:text-sm
                  rounded-xl
                  text-base font-medium
                  text-black
                  bg-gradient-to-r from-[#7d52fd] to-[#ffffff]
                  hover:opacity-90
                  transition
                  whitespace-nowrap
                  shrink
                  "
                >
                  Hire Me
                </a>

                {/* Secondary CTA */}
                <Link
                  to="/projects"
                  className="
                  px-6 py-3
                  max-[400px]:px-4
                  max-[400px]:py-2
                  max-[400px]:text-sm
                  rounded-xl
                  text-base font-medium
                  text-white
                  border border-white/40
                  hover:bg-white hover:text-[#212121]
                  transition
                  whitespace-nowrap
                  shrink
                  "
                >
                  View Our Work
                </Link>

              </div>
            </FadeIn>

            <HowWeWork videoId="YNI-A8GMX7E?si=rTXDaq-z1RcPtZKA" />

            <FadeIn delay={400}>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-10 max-w-full'>
                {STATS.map((stat, index) => (
                  <div key={index} className='text-left border-r border-white/50 pr-10 last:border-r-0'>
                    <div className='text-2xl font-normal text-primary mb-[8px] font-mono'>
                      {stat.value}
                    </div>
                    <p className='text-sm text-white leading-snug' style={{ marginLeft: '2px'}}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>


          </div>

          {/* right column - developer image */}
          <FadeIn delay={200}>
            <div className='relative'>
            <div className='relative overflow-hidden rounded-2xl aspect-4/5 max-w-[400px] max-h-[75vh] ml-auto group'>
                <div className='absolute inset-0 rounded-2xl overflow-hidden '>
                  <div className='absolute inset-[-3px] bg-gradient-to-r from-primary/20 via-primary/10 to-primary animate-spin-slow rounded-2xl'></div>
                </div>

                {/* Image container */}
                <div className='relative rounded-2xl overflow-hidden m-[1px] h-[calc(100%-2px)]'>
                  <img 
                    src='/images/My_Hero.jpeg'
                    alt='Developer at work'
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Technology logos */}
                <div className='absolute bottom-6 left-6 z-20'>
                  <FadeIn delay={500}>
                    <div className='flex items-center gap-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-4'>
                      <SiReact className="w-6 h-6 text-primary hover:scale-110 transition" />
                      <SiNextdotjs className="w-6 h-6 text-primary hover:scale-110 transition" />
                      <SiNodedotjs className="w-6 h-6 text-primary hover:scale-110 transition" />
                      <SiTailwindcss className="w-6 h-6 text-primary hover:scale-110 transition" />
                      <SiMongodb className="w-6 h-6 text-primary hover:scale-110 transition" />
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-1000 cursor-pointer'
      >
        <ChevronDown className='w-8 h-8 text-primary' />
      </button>

    </section>
  )
}

export default Hero
