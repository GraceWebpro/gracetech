import React, { useState, useEffect } from "react";
import { db } from "../../server/firebase";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import Tab from "./Tab";
import TabsPanel from "./TabsPanel";
import ProjectCard from "./ProjectCard";
import ProjectCard2 from "./projCard2";
import TrackVisibility from 'react-on-screen';
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import './Project.css';
import ProjectContact from "../contact/ProjectContact";
import { Helmet } from "react-helmet-async";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [aiVideoProjects, setAiVidoeProjects] = useState([]);
  const [uiUxDesignProjects, setUiUxDesignProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, "projects"), orderBy("timestamp", "desc"), limit(6));
        const querySnapshot = await getDocs(q);
        const projectList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectList);
        setUiUxDesignProjects(
          projectList.filter(
            (p) => p.category === "UI Design" || p.category === "UX Design"
          )
        ); 
        setAiVidoeProjects(projectList.filter((p) => p.category === "AI Video"));
     
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="project" id="project">
     <Helmet>
        <title>Portfolio — GraceTech</title>
        <meta
          name="description"
          content="A showcase of my best UI/UX and web development projects, built with React, Firebase, and creativity."
        />
        <link rel="canonical" href="https://gracetech.vercel.app/portfolio" />
      </Helmet>

      <TrackVisibility>
        {({ isVisible }) => (
          <div className={isVisible ? "animates__animated animate__slideInUp" : ""}>
            <div className='proj-h' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }} data-aos="fade-down">
              <div className='proj-bdr'></div>
              <h2 style={{ textAlign: 'center', fontFamily: 'var(--second-font)', color: '#0059ff' }}>Recent Projects</h2>
              <div className='proj-bdr'></div>
            </div>
            <p className='proj-title' data-aos="fade-up" data-aos-duration="500">
              Browse Our Team's Recent Projects and Provide Your Feedback
            </p>
          </div>
        )}
      </TrackVisibility>

      <TabsPanel style={{ paddingBottom: '40px'}}>
        <Tab title="All Tab" subtitle="All Recent projects" icon="far fa-address-card">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            padding: '20px',
          }}>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard key={index} {...project} onEnlarge={() => setSelectedProject(project)} />
              ))
            ) : (
              <p>Loading projects...</p>
            )}
          </div>

        </Tab>

        <Tab title="UI/UX" subtitle="All UI Design Projects" icon="fas fa-hourglass-start">
          <div
            id="project-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              padding: '0px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {uiUxDesignProjects.length > 0 ? (
              uiUxDesignProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))
            ) : (
              <p>No UI Design projects found.</p>
            )}
          </div>
        </Tab>

        <Tab title="AI Video" subtitle="All UI/UX Design Projects">
          <div
            id="project-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              padding: '0px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {aiVideoProjects.length > 0 ? (
              aiVideoProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))
            ) : (
              <p>No AI Video projects found.</p>
            )}
          </div>
        </Tab>
      </TabsPanel>

    <ProjectContact />

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>&times;</button>

            <div className="main-image-container">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="modal-image" />
            </div>

            <div className="image-gallery">
              {selectedProject.gallery?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProject.title}-gallery-${index}`}
                  className="gallery-thumbnail"
                  onClick={() => setSelectedProject({ ...selectedProject, imageUrl: image })}
                />
              ))}
            </div>

            <div>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>

                
              {/* Key Features */}
              <h4>Key Features</h4>
              <ul className="feature-list">
                {selectedProject.keyFeatures && selectedProject.keyFeatures.map((feature, index) => (
                  <li key={index}>
                    <i className="feature-icon">✔</i> {feature}
                  </li>
                ))}
              </ul>


              {/* Technology Stack */}
              <h4>Technology Stack</h4>
              <div className="tech-stack">
                {selectedProject.technologyStacks && selectedProject.technologyStacks.map((tech, index) => (
                  <span key={index} className="tech-icon">{tech}</span>
                ))}
              </div>


              {/* User Benefits */}
              <h4>User Benefits</h4>
              <ol style={{ paddingLeft: '20px' }}>
                {selectedProject.userBenefits.map((benefits, index) => (
                  <li
                    key={`benefits-${index}`}
                    style={{
                      fontSize: '17px',
                      color: '#888',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      listStyleType: 'decimal',
                      marginBottom: '10px'
                    }}
                  >
                  {benefits}
                  </li>
                ))}
              </ol>


              {/* Challenges and Solutions */}
              <h4>Challenges & Solutions</h4>
                <strong>Challenge:</strong>
                <ul>
                {selectedProject.challenges?.map((challenge, index) => (
                  <li
                    key={`challenge-${index}`}
                    style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5', marginLeft: '20px' }}
                  >
                    {challenge}
                  </li>
                ))}
                </ul>
                  <br />
                <strong>Solution:</strong>
                <ul>
                {selectedProject.solutions?.map((solution, index) => (
                  <li
                    key={`solution-${index}`}
                    style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5', marginLeft: '20px' }}
                  >
                    {solution}
                  </li>
                ))}
                </ul>

              {/* Project Timeline */}
              <h4>Project Timeline</h4>
              <h3 style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5' }}>
                <strong>Start Date:</strong> {selectedProject.projectStartDate}
              </h3>
              <h3 style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5' }}>
                <strong>End Date:</strong> {selectedProject.projectEndDate}
              </h3>
              <div className="project-l">
                <Link to={`/project-details/${selectedProject.id}`} className="l-btn">View Full Project</Link>
              </div>

              <div className="project-l">
                <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="l-btn">See it in action</a>
                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="l-btn" aria-disabled>View on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
