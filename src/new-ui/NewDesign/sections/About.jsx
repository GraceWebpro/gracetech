import React, { useState, useEffect } from 'react'
import { Sparkles, Box, Rocket, Layers, Gauge } from 'lucide-react'
import { SiReact, SiTailwindcss, SiFigma, SiNodedotjs } from 'react-icons/si';
import { FaRobot, FaCubes } from 'react-icons/fa'; // For Veo3 AI
import { ABOUT_STATS } from '../../utils/constants';
import FadeIn from '../animations/FadeIn';
import RadialGradient from '../backgrounds/RadialGradient';

const About = () => {

    // Skills
    const skills = [
        { name: 'Front-End', icon: SiReact },
        { name: 'UI/UX Design', icon: SiFigma },
        { name: 'UI Systems', icon: SiTailwindcss },
        { name: 'AI Solutions', icon: FaRobot },
        { name: 'No-Code', icon: FaCubes },
        { name: 'Backend', icon: SiNodedotjs },
    ];

  return (
    <section id='about' className='relative py-20 bg-[#151022] overflow-hidden'>

        <RadialGradient variant='about' />

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Main Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20'>
                {/* left column content */}
                <div className='flex flex-col gap-12 items-start'>
                    <div className='flex flex-col gap-8'>
                        <FadeIn delay={60}>
                            <div className='inline-flex self-start items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full'>
                                <Box className='w-4 h-4 text-primary' />
                                <span className='text-sm text-primary font-medium'>
                                    Digital Product Studio
                                </span>
                                <Sparkles className='w-4 h-4 text-primary' />
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight">
                                Crafting Digital Experiences That Drive Growth
                            </h2>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <div className="flex flex-col gap-4">
                                <p className='text-base text-white/70 leading-relaxed'>        
                                GraceTech is a design-led development studio creating high-performance websites, web applications, and AI-powered content for modern brands.</p>
                            </div>
                        </FadeIn>
                    </div>

                    <FadeIn delay={300}>
                        <div className="grid grid-cols-3 gap-8">
                            {ABOUT_STATS.map((stat, index) => (
                                <div key={index} className="relative pl-4" >
                                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20 rounded-full"></div>
                                    <div className="text-3xl font-normal text-white mb-2 font-mono">
                                        {stat.value}
                                    </div>
                                    <p className="text-sm text-white/60 leading-snug">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    <FadeIn delay={400}>
                        <button onClick={() => window.open('_blank')} 
                        className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black rounded-full px-8 py-4 text-base font-medium transition-all duration-300 w-fit group">
                            <Rocket className='w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300' />
                            Start a Project
                        </button>
                    </FadeIn>
                </div>

                {/* right column content info grid */}
                <FadeIn delay={200}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <Layers className='w-6 h-6 text-primary' />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">Expertise</h3>
                                        <p className="text-sm text-white/70 leading-relaxed">
                                         We build scalable, secure web applications using modern frameworks and proven engineering practices.                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full">
                                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                                    <Sparkles className='w-5 h-5 text-primary' />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Clean Code</h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Clean, maintainable code that ensures long-term scalability and easy updates.
                                </p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full">
                                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                                    <Gauge className='w-5 h-5 text-primary' />
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">Performance</h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Optimized for speed, SEO, and smooth user experiences across all devices.
                                </p>
                            </div>
                        </div>

                        <div className="col-span-2 relative group">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                                <div className="grid grid-cols-3 gap-6 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-primary mb-1">100%</div>
                                        <div className="text-xs text-white/60">Clients Satisfaction</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                                        <div className="text-xs text-white/60">Support Available</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-primary mb-1">Fast</div>
                                        <div className="text-xs text-white/60">Delivery Time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Skills grid section */}
            <FadeIn delay={500}>
                <div className="flex flex-col items-center gap-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-normal text-white mb-2">
                            Core Technologies
                        </h3>
                        <p className="text-sm text-white/60">
                        A carefully selected stack for building scalable, high-performance digital products.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl">
                        {skills.map((skill, index) =>(
                            <div
                                key={index}
                                className='group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105'
                            >
                                <skill.icon className='text-3xl text-primary mb-2' />
                                <div className="text-sm text-white/80 font-medium text-center ">
                                    {skill.name}
                                </div>

                                {/* hover Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/10 rounded-2xl transition-all duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
  )
}

export default About
