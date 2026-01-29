import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../server/firebase";
import { Briefcase, Target, Globe, Palette, Zap } from 'lucide-react';
import ProjectCard from "../ui/ProjectCard2";
import FadeIn from '../animations/FadeIn';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);
        const projectsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            image: data.imageUrl,
            technologies: data.technologyStacks,
            demoUrl: data.demoLink,
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

  const categories = ["All", "Web Apps", "UI Components", "Full Stack"];
  const categoryIcons = {
    'All': Target,
    'Web Apps': Globe,
    'UI Components': Palette,
    'Full Stack': Zap,
  };

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(project => project.categories === activeCategory);

  return (
    <section className="relative py-20 bg-black min-h-screen overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary/10 opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Briefcase className='w-4 h-4 text-primary' />
              <span className="text-sm text-primary font-medium">Our Projects</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              Projects & Case Studies
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto text-center">
                Real projects built to solve real problems — with clarity, purpose, and measurable impact.
            </p>
          </div>
        </FadeIn>

        {/* Category filter */}
        <FadeIn delay={100}>
        <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-1 rounded-full font-medium transition-all duration-300
                  ${activeCategory === category
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                  }`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300
                  ${activeCategory === category
                    ? 'bg-primary/10 opacity-100'
                    : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                  }`}
                />
                <div className="relative flex items-center gap-2 z-10">
                  {React.createElement(categoryIcons[category], { className: "w-4 h-4" })}
                  <span className="text-sm">{category}</span>
                </div>

                {activeCategory === category && (
                    <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 -z-10"></div>
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Projects grid */}
        {loading ? (
          <p className="text-center text-white/60 py-10">Loading projects…</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center text-white/60 py-10">No projects found for this category.</p>
        ) : (
          <FadeIn delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
