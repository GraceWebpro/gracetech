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
  return (
    <div className="project">
                   <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animates__animated animate__slideInUp" : ""}>
      <h2 style={{ textAlign: 'center' }}>Projects</h2>
            <p>Lorem ipsum dolor amet glossier vinyl fanny pack, echo park mustache
          helvetica hexagon. Pinterest enamel pin flexitarian cred literally air
          plant yr vape small batch ennui taiyaki af. Quinoa kombucha</p>
      </div>}
            </TrackVisibility>
      <TabsPanel>
        <Tab
          title="Tab One"
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
          title="Tab Two"
          subtitle="Our History"
          icon="fas fa-hourglass-start"
        >
          Lorem ipsum dolor amet glossier vinyl fanny pack, echo park mustache
          helvetica hexagon. Pinterest enamel.
        </Tab>
        <Tab title="Tab Three">
          Lorem ipsum dolor amet glossier vinyl fanny pack, echo park mustache
          helvetica hexagon. Pinterest enamel pin flexitarian cred literally air
          plant yr vape small batch ennui taiyaki af. Quinoa kombucha
          asymmetrical, pitchfork 3 wolf moon tilde enamel pin bitters XOXO.
          Gluten-free distillery semiotics, franzen DIY af green juice cornhole
          freegan cloud bread. Master cleanse pok pok edison bulb flannel, banjo
          mlkshk YOLO pour-over. Jean shorts intelligentsia snackwave pug.Lorem
          ipsum dolor amet glossier vinyl fanny pack, echo park mustache
          helvetica hexagon. Pinterest enamel pin flexitarian cred literally air
          plant yr vape small batch ennui taiyaki af. Quinoa kombucha
          asymmetrical, pitchfork 3 wolf moon tilde enamel pin bitters XOXO.
          Gluten-free distillery semiotics, franzen DIY af green juice cornhole
          freegan cloud bread. Master cleanse pok pok edison bulb flannel, banjo
          mlkshk YOLO pour-over. Jean shorts intelligentsia snackwave pug.
        </Tab>
      </TabsPanel>
   

    </div>
  );
}

