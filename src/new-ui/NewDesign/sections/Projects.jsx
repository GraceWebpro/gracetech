import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../../../server/firebase";
import { Briefcase, Sparkles, Target, Globe, Palette, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from "../ui/ProjectCard2";
import FadeIn from '../animations/FadeIn';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import './work.css'

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    const [activeCategory, setActiveCategory] = useState('All')
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const [cardsPerView, setCardsPerView] = useState(3);

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const q = query(
              collection(db, "projects"),
              orderBy("timestamp", "desc"),
              limit(6)
            );
      
            const snapshot = await getDocs(q);
            const projectsData = snapshot.docs.map(doc => {
                const data = doc.data();
              
                return {
                  id: doc.id,
                  title: data.title,
                  description: data.description,
                  image: data.imageUrl,                // 🔁 mapped
                  technologies: data.technologyStacks, // 🔁 mapped
                  demoUrl: data.demoLink,               // 🔁 mapped
                  githubUrl: data.githubUrl || null,
                  metrics: data.metrics || null,
                  categories: data.category,
                  timestamp: data.timestamp,
                };
              });
              
      
            setProjects(projectsData);
          } catch (error) {
            console.error("Error fetching projects:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchProjects();
      }, []);

      useEffect(() => {
        const updateCardsPerView = () => {
          if (window.innerWidth < 768) setCardsPerView(1);
          else if (window.innerWidth < 1024) setCardsPerView(2);
          else setCardsPerView(3);
        };
      
        updateCardsPerView(); // initial
        window.addEventListener('resize', updateCardsPerView);
      
        return () => window.removeEventListener('resize', updateCardsPerView);
      }, []);
      

      const filteredProjects =
      activeCategory === 'All'
        ? projects
        : projects.filter(project =>
            project.categories === activeCategory); 
    
        const dotCount = Math.max(0, filteredProjects.length - cardsPerView + 1);

        useEffect(() => {
            const container = scrollContainerRef.current;
            if (!container) return;
          
            const onScroll = () => {
              const maxScrollLeft = container.scrollWidth - container.clientWidth;
              const index = Math.round(
                (container.scrollLeft / maxScrollLeft) * (dotCount - 1)
              );
              setCurrentIndex(index);
            };
          
            container.addEventListener('scroll', onScroll, { passive: true });
            return () => container.removeEventListener('scroll', onScroll);
          }, [dotCount]);

        // resel carousel when category changes
        const handleCategoryChange = (category) => {
            setActiveCategory(category);
            setCurrentIndex(0);

            if(scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior:  'smooth' })
            }
        };


        const scrollToIndex = (index) => {
            if (!scrollContainerRef.current) return;
          
            const container = scrollContainerRef.current;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
          
            const targetScroll =
              (maxScrollLeft / (dotCount - 1 || 1)) * index;
          
            container.scrollTo({
              left: targetScroll,
              behavior: 'smooth',
            });
          
            setCurrentIndex(index);
          };
          
          

        // const nextSlide = () => {
        //     const maxIndex = Math.max(0, filteredProjects.length - 3);
        //     const newIndex = Math.min(currentIndex + 1, maxIndex);
        //     scrollToIndex(newIndex);
        // }

        // const prevSlide = () => {
        //     const newIndex = Math.max(currentIndex - 1, 0);
        //     scrollToIndex(newIndex);
        // };

        const nextSlide = () => {
            scrollToIndex(Math.min(currentIndex + 1, dotCount - 1));
          };
          
          const prevSlide = () => {
            scrollToIndex(Math.max(currentIndex - 1, 0));
          };
          
          

        // Category icons mapping
        const categoryIcons = {
            'All': Target,
            'Web Apps': Globe,
            'UI Components': Palette,
            'Full Stack': Zap,
        }

        const categories = ["All", "Web Apps", "UI Components", "Full Stack"];



  return (
   <section id='projects' className='relative py-20 bg-black overflow-hidden'>
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary/10 opacity-20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn delay={0}>
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                        <Briefcase className='w-4 h-4 text-primary' />
                        <span className="text-sm text-primary font-medium">My Work</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
                        Selected Work
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto text-center">
                    A few examples of systems designed and built for clarity, scale, and impact.
                    </p>
                </div>
            </FadeIn>

            {/* Category filter */}
            <FadeIn delay={100}>
                <div className="category-filter">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`group relative px-6 py-0.5 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                                ? 'text-white'
                                : 'text-white/50 hover:text-white'
                            }`}
                        >
                            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${activeCategory === category
                                ? 'bg-primary/10 opacity-100'
                                : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                            }`}
                            />
                                <div className="relative flex items-center gap-3">
                                    {React.createElement(categoryIcons[category], { className: "w-4 h-4"})}
                                    <span className="text-sm">{category}</span>
                                </div>

                                {activeCategory === category && (
                                    <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 -z-10"></div>
                                )}
                        </button>
                    ))}
                </div>
            </FadeIn>

            

            {loading && (
            <p className="text-center text-white/60 py-10">Loading projects…</p>
            )}

            {/* project carousel */}
            <FadeIn delay={200}>
                <div className="relative">
                    <div 
                        ref={scrollContainerRef}
                        className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar">
                            <div className="flex pb-4">
                                {filteredProjects.map((project, index) => (
                                    <div 
                                        key={project.id}
                                        className="
                                        shrink-0 snap-start
                                        px-2
                                        w-[85vw]
                                        sm:w-[80vw]
                                        md:w-1/2
                                        lg:w-1/3
                                      ">
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                    </div>

                    {/* navigation arrows */}
                    {filteredProjects.length > cardsPerView && (

                        <>
                            <button 
                                onClick={prevSlide} 
                                disabled={currentIndex === 0}
                                className='flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-16'
                                aria-label='Previous projects'
                            >
                                <ChevronLeft className='w-6 h-6 text-white' />
                            </button>

                            <button 
                                onClick={nextSlide} 
                                disabled={currentIndex >= dotCount - 1}
                                className='flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:-translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-16'
                                aria-label='Next projects'
                            >
                                <ChevronRight className='w-6 h-6 text-white' />
                            </button>
                        </>
                    )}

                    {/* navigation bots */}
                    {filteredProjects.length > cardsPerView && (
                    <div className="carousel-dots">
                        {Array.from({ length: dotCount }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`transition-all duration-300 rounded-full ${
                            index === currentIndex
                                ? 'bg-primary w-6 h-2'
                                : 'bg-white/30 w-2 h-2 hover:bg-white/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                        ))}
                    </div>
                    )}

                    {/* view more */}
                    <div className="view-work-link">
                        <Link
                            to="/projects"
                            className="
                                group flex items-center gap-2
                                text-sm font-medium text-white/70
                                hover:text-white transition-colors
                            "
                        >
                            View more projects
                            <ArrowRight
                                className="
                                w-4 h-4
                                translate-x-0 group-hover:translate-x-1
                                transition-transform
                                "
                            />
                        </Link>
                    </div>
                </div>
            </FadeIn>

            
        </div>

       

   </section>
  )
}

export default Projects
