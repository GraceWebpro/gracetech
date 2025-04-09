import React,{ useState, useEffect } from "react";
import { db } from "../../server/firebase"; // Ensure correct Firestore import
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import Tab from "./Tab";
import TabsPanel from "./TabsPanel";
import ProjectCard from "./ProjectCard";
import TrackVisibility from 'react-on-screen';
import { Link } from 'react-router-dom';
import './Project.css';
import ProjectCard2 from "./projCard2";
import { BsArrowRight } from "react-icons/bs";
//import Meeting from "./Meeting";

export function Projects() {

  const [projects, setProjects] = useState([]);
  const [uiDesignProjects, setUiDesignProjects] = useState([]);
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
        console.log("Fetched projects:", projectList); // Debugging
        setProjects(projectList);
        // Filter projects by category
        setUiDesignProjects(projectList.filter((p) => p.category === "UI Design"));
        setUiUxDesignProjects(projectList.filter((p) => p.category === "UI/UX Design"));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);


  return (
    <div className="project" id="project">
      <TrackVisibility>
        {({ isVisible }) =>
          <div className={isVisible ? "animates__animated animate__slideInUp" : ""}>
            <div className='proj-h' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent:'center' }} data-aos="fade-down">
              <div className='proj-bdr'></div>
              <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, "sans-seriff"', color: '#0059ff' }}>Recent Projects</h2>
              <div className='proj-bdr'></div>
            </div>
            <p className='proj-title' data-aos="fade-up" data-aos-duration="500">Look at my recent projects and give me your feedback</p>

           {/* <p data-aos="fade-up" data-aos-duration="500">A collection of my recent projects, highlighting my expertise in web development and design.</p>*/}
          </div>}
      </TrackVisibility>

      <TabsPanel>
        <Tab
          title="All Tab"
          subtitle="All Recent projects"
          icon="far fa-address-card"
        >
          <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          padding: '20px',
      
        }}
      >
        {projects.length > 0 ? (
              projects.map((project, index) => 
              <ProjectCard key={index} {...project} onEnlarge={() => setSelectedProject(project)}/>)
            ) : (
              <p>Loading projects...</p>
            )}
      </div>
      <h2>difference</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          padding: '20px',
      
        }}
      >
        {projects.length > 0 ? (
              projects.map((project, index) => <ProjectCard2 key={index} {...project} />)
            ) : (
              <p>Loading projects...</p>
            )}
      </div>
      
        </Tab>
        <Tab
          title="UI Tab"
          subtitle="All UI Design Projects"
          icon="fas fa-hourglass-start"
        >
           
           <div id="project-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '0px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {uiDesignProjects.length > 0 ? (
                uiDesignProjects.map((project, index) => <ProjectCard key={index} {...project} />)
              ) : (
                <p>No UI Design projects found.</p>
              )}
            </div>
        </Tab>
        <Tab title="UI/UX" subtitle="All UI/UX Design Projects">
          
        <div id="project-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '0px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {uiUxDesignProjects.length > 0 ? (
              uiUxDesignProjects.map((project, index) => <ProjectCard key={index} {...project} />)
            ) : (
              <p>No UI/UX Design projects found.</p>
            )}
                </div>
        </Tab>
      </TabsPanel>
   
      <Link to='/projects' className="click-more-btn">
        <span>Click More</span>
        <BsArrowRight />
      </Link>
      {selectedProject && (
  <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>&times;</button>
      <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
      <h3>{selectedProject.title}</h3>
      <p>{selectedProject.description}</p>
    </div>
  </div>
)}


    </div>
  );
}

