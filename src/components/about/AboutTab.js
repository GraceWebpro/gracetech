import React, { useState } from 'react';
import './About.css'; // Ensure to create the appropriate CSS for styling

// Example of images for each tab
import aboutMe from '../../assets/about.jpg'; 
import skill from '../../assets/skill.jpg'; 
import aboutImage from '../../assets/bann2.jpg'; 
import education from '../../assets/education.jpg'; 
import experience from '../../assets/experience.jpg'; 
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import Bubble from '../../assets/bubble.io2-removebg-preview.png'
import Figma from '../../assets/figma-removebg-preview.png'
import Flutter from '../../assets/flutterflow2-removebg-preview.png'
import ReactL from '../../assets/react2-removebg-preview.png'
import Next from '../../assets/nextjs-removebg-preview.png'
import Canva from '../../assets/canva-removebg-preview.png'


const Pane = () => {
  // State to track the active tab
  const [activeSection, setActiveSection] = useState('about'); // Default tab is 'about'

  const renderTabContent = (section) => {
    switch (section) {
      case 'about':
        return (
          <div className="pane-content">
            <div className='about-display'>
              <img src={aboutMe} alt="About Me" data-aos="zoom-in" data-aos-duration="500"/>
              <div className='about-right'>
                <h2 data-aos="fade-up" data-aos-duration="500">Personal Info</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                I'm passionate about creating clean and user-focused digital experiences. I enjoy both designing in Figma and building with tools like React, Bubble, FlutterFlow, and HTML. I’m always exploring new ways to improve my work, and I love the process of bringing ideas to life — from concept to launch.                </p>
                <div className='about-div-display'>
                <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                  <p><strong>Address</strong> </p>
                  <h5>Victoria Highland, Lagos.</h5>

                </div>
                <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                  <p><strong>Email</strong> </p>
                  <h5 className='mail'>gracietechdigital@proton.me</h5>

                </div>
                <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                  <p><strong>Phone</strong> </p>
                  <h5>+2348021357359</h5>

                </div>

                <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <h5>Follow</h5>
                    <Col sm={6} className='px-1 flex'>
                    <Link
                        to="contact"
                        className="nav__link"
                        >
                        <AiOutlineTikTok className='icon2'/> 
                    </Link>
               
                   
                    <Link
                        to="contact"
                        className="nav__link"
                        >
                        <IoLogoInstagram className='icon2'/> 
                    </Link>
               
                   
                    <Link
                        to="contact"
                        className="nav__link"
                        >
                        <FaFacebook className='icon2'/> 
                    </Link>
                    </Col>
                    
                 </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="pane-content">
            <div className='about-display'>
              <img src={experience} alt="About Me" data-aos="zoom-in" data-aos-duration="500"/>
              <div className='about-right'>
                <h2 data-aos="fade-up" data-aos-duration="500">My Experience</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                With several years of hands-on experience, I’ve worked on a variety of projects that helped me grow both creatively and technically. From building user-friendly websites to crafting custom features, I take pride in delivering work that not only looks good but also functions smoothly.</p>
                <div className='exp-div-display'>
                  <div className='exp-div'  data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>In 2011</h3>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>UI Designer</strong> </p>
                      <h5>UI Head & Manager</h5>
                    </div>
                  </div>
                  <div className='exp-div'  data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>In 2016</h3>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Web Developer</strong> </p>
                      <h5>Evolve With Tech</h5>
                    </div>
                  </div>
                  <div className='exp-div'  data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>In 2023</h3>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Senior UI Designer</strong> </p>
                      <h5>EWT - SM Designs</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="pane-content">
            <div className='about-display'>
              <img src={education} alt="About Me" data-aos="zoom-in" data-aos-duration="500"/>
              <div className='about-right'>
                <h2 data-aos="fade-up" data-aos-duration="500">My Education</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                I have a solid educational foundation in web development and design, complemented by continuous self-learning and hands-on experience. I've taken courses and training in UI/UX design, frontend development, and no-code tools like Bubble and FlutterFlow, which have helped me stay up-to-date with modern web technologies and practices.                  </p>
                <div className='about-div-display'>
                  <div className='exp-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>2021</h3>
                    <div style={{ flexDirection: 'column', width: "60%", textAlign: 'left' }}>
                      <p><strong>Web Design Course</strong> </p>
                      <h5>Udemy</h5>
                    </div>
                  </div>
                  <div className='exp-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>2021</h3>
                    <div style={{ flexDirection: 'column', width: "60%", textAlign: 'left' }}>
                      <p><strong>Complete React Developer Course</strong> </p>
                      <h5>Udemy</h5>
                    </div>
                  </div>
                  <div className='exp-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>2022</h3>
                    <div style={{ flexDirection: 'column', width: "60%", textAlign: 'left' }}>
                      <p><strong>Google UX Design Certificate</strong> </p>
                      <h5>Coursera</h5>
                    </div>
                  </div>
                  <div className='exp-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>2023</h3>
                    <div style={{ flexDirection: 'column', width: "60%", textAlign: 'left' }}>
                      <p><strong>No-Code Bootcamp (Bubble & FlutterFlow)</strong> </p>
                      <h5>Makerpad / Nucode</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="pane-content">
           <div className='about-display'>
              <img src={skill} alt="About Me" data-aos="zoom-in" data-aos-duration="500"/>
              <div className='about-right'>
                <h2 data-aos="fade-up" data-aos-duration="500">My Skills</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                I specialize in web design using Figma, and web development with React, HTML, CSS, and JavaScript. I’m also experienced in no-code platforms like Bubble and FlutterFlow, building responsive and user-friendly web applications.                  </p>
                <div className='about-div-display'>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                   <div className='img-div'>
                      <img src={Bubble} alt='skill' className='img-bub' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Bubble</strong> </p>
                      <h5>95%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="z00m-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Figma} alt='skill' className='img-fig' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Figma</strong> </p>
                      <h5>90%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={ReactL} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Reactjs</strong> </p>
                      <h5>90%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Flutter} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>FlutterFlow</strong> </p>
                      <h5>85%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Canva} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Canva</strong> </p>
                      <h5>85%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Next} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Nextjs</strong> </p>
                      <h5>85%</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pane-container">
      <div className="panes">
        <div
          className={`pane ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => setActiveSection('about')}
        >
          About
        </div>
        <div
          className={`pane ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveSection('experience')}
        >
          Experience
        </div>
        <div
          className={`pane ${activeSection === 'education' ? 'active' : ''}`}
          onClick={() => setActiveSection('education')}
        >
          Education
        </div>
        <div
          className={`pane ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveSection('skills')}
        >
          Skills
        </div>
      </div>

      {/* Render the content of the active tab */}
      {renderTabContent(activeSection)}
    </div>
  );
};

export default Pane;
