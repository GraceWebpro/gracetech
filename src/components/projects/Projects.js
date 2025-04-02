import React,{ useState, useEffect } from "react";
import { db } from "../../server/firebase"; // Ensure correct Firestore import
import { getDocs, collection } from "firebase/firestore";
import Tab from "./Tab";
import TabsPanel from "./TabsPanel";
import ProjectCard from "./ProjectCard";
import gdFrame from '../../assets/GdFrame.png'
import wunmi from '../../assets/wunmi.png'
import TrackVisibility from 'react-on-screen'
import Movie from '../../assets/movie.png'
import Tune from '../../assets/Tune.png'
import Fiver from '../../assets/fiver.png'
import Bitcoin from '../../assets/bitcoin.png'
import { query, orderBy } from "firebase/firestore"; 
import './Project.css'

export function Projects() {

  const [projects, setProjects] = useState([]);
  const [uiDesignProjects, setUiDesignProjects] = useState([]);
  const [uiUxDesignProjects, setUiUxDesignProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, "projects"), orderBy("timestamp", "desc"));
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
    <div className="project">
      <TrackVisibility>
        {({ isVisible }) =>
          <div className={isVisible ? "animates__animated animate__slideInUp" : ""}>
            <h2 style={{ textAlign: 'center' }}>Projects</h2>
            <p data-aos="fade-up">A collection of my recent projects, highlighting my expertise in web development and design.</p>
          </div>}
      </TrackVisibility>

      <TabsPanel>
        <Tab
          title="All Tab"
          subtitle="Recent projects"
          icon="far fa-address-card"
        >
          
          <div id="project-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '0px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {projects.length > 0 ? (
              projects.map((project, index) => <ProjectCard key={index} {...project} />)
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
   

    </div>
  );
}

