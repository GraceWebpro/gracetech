import React from "react";
import Tab from "./Tab";
import TabsPanel from "./TabsPanel";
import ProjectCard from "./ProjectCard";
import projImg from '../../assets/dev3.png';
import gdFrame from '../../assets/GdFrame.png'
import wunmi from '../../assets/wunmi.png'
import TrackVisibility from 'react-on-screen'
import Movie from '../../assets/movie.png'
import Tune from '../../assets/Tune.png'
import Fiver from '../../assets/fiver.png'
import Bitcoin from '../../assets/bitcoin.png'

import './Project.css'

export function Projects() {
    const projects = [
        {
         title: "Movie App with Figma",
         description: "UI/UX Design",
         imgUrl: Movie,
        },
        {
          title: "Wunmi Beauty Empire | Beauty and wellness | Website",
          description: "Design & Development",
          imgUrl: wunmi,
         },
         {
          title: "Game Development Website with Figma",
          description: "UI Design",
          imgUrl: gdFrame,
         },
         {
          title: "Community App with Figma",
          description: "UI/UX Design",
          imgUrl: Tune,
         },
         {
          title: "Fiver Re-Design with Figma",
          description: "UI/UX Design",
          imgUrl: Fiver,
         },
         {
          title: "Crypto Website Ui with Figma",
          description: "UI/UX Design",
          imgUrl: Bitcoin,
         },
         
      ]

      const figma = [
        {
         title: "Movie App with Figma",
         description: "UI/UX Design",
         imgUrl: Movie,
        },
        
         {
          title: "Game Development Website with Figma",
          description: "UI Design",
          imgUrl: gdFrame,
         },
         {
          title: "Community App with Figma",
          description: "UI/UX Design",
          imgUrl: Tune,
         },
         {
          title: "Fiver Re-Design with Figma",
          description: "UI/UX Design",
          imgUrl: Fiver,
         },
         {
          title: "Crypto Website Ui with Figma",
          description: "UI/UX Design",
          imgUrl: Bitcoin,
         },
         
      ]

      const bubble = [
        {
          title: "Wunmi Beauty Empire | Beauty and wellness | Website",
          description: "Design & Development",
          imgUrl: wunmi,
         },
         
      ]
  return (
    <div className="project">
                   <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animates__animated animate__slideInUp" : ""}>
      <h2 style={{ textAlign: 'center' }}>Projects</h2>
            <p>A collection of my recent projects, highlighting my expertise in web development and design.</p>
      </div>}
            </TrackVisibility>
      <TabsPanel>
        <Tab
          title="All Tab"
          subtitle="Recent projects"
          icon="far fa-address-card"
        >
          
          <div id="project-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '0px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {
                    projects.map((project, index) => {
                      return (
                        <ProjectCard key={index} {...project} />
                      )
                    })
                  }
                </div>
        </Tab>
        <Tab
          title="UI Tab"
          subtitle="Our History"
          icon="fas fa-hourglass-start"
        >
           
           <div id="project-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '0px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {
                   figma.map((project, index) => {
                      return (
                        <ProjectCard key={index} {...project} />
                      )
                    })
                  }
                </div>
        </Tab>
        <Tab title="UI/UX Tab">
          
        <div id="project-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '0px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {
                   bubble.map((project, index) => {
                      return (
                        <ProjectCard key={index} {...project} />
                      )
                    })
                  }
                </div>
        </Tab>
      </TabsPanel>
   

    </div>
  );
}

