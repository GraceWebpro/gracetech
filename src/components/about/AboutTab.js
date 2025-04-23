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
                <h2 data-aos="fade-up" data-aos-duration="500">Who We Are</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                At GraceTech, we create clean, user-focused digital experiences. Our team excels in design and development using tools like Figma, React, Bubble, FlutterFlow, and HTML, delivering impactful solutions from concept to launch.                </p>
                <div className='about-div-display'>
                <div className='about-div about-div2' data-aos="zoom-in-up" data-aos-duration="500">
                  <p><strong>Address</strong> </p>
                  <h5>Victoria Island, Lagos.</h5>

                </div>
                <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                  <p><strong>Email</strong> </p>
                  <h5 className='mail'>gracetechagency@gmail.com</h5>

                </div>
                <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                  <p><strong>Phone</strong> </p>
                  <h5>+234 704 342 1913</h5>

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
                <h2 data-aos="fade-up" data-aos-duration="500">Our Experience</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                With years of collective experience, our team has delivered a variety of projects, from user-friendly websites to custom digital solutions. We focus on creating designs that not only look great but also function seamlessly to provide the best user experience.                </p>
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
                <h2 data-aos="fade-up" data-aos-duration="500">Our Education & Growth</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                At GraceTech, our team has a solid foundation in web development and design, continually updated through hands-on experience and training in UI/UX design, frontend development, and no-code tools like Bubble and FlutterFlow.                </p>
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
                <h2 data-aos="fade-up" data-aos-duration="500">Our Skills</h2>
                <p data-aos="fade-up" data-aos-duration="500">
                At GraceTech, our team specializes in web design using Figma and web development with React, HTML, CSS, and JavaScript. We are also skilled in no-code platforms like Bubble and FlutterFlow, creating responsive, user-friendly web applications.                </p>
                <div className='about-div-display'>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                   <div className='img-div'>
                      <img src={Bubble} alt='skill' className='img-bub' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p style={{ textAlign: 'left'}}><strong>Bubble</strong> </p>
                      <h5>95%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="z00m-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Figma} alt='skill' className='img-fig' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p style={{ textAlign: 'left'}}><strong>Figma</strong> </p>
                      <h5>90%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={ReactL} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p style={{ textAlign: 'left'}}><strong>Reactjs</strong> </p>
                      <h5>90%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Flutter} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p style={{ textAlign: 'left'}}><strong>FlutterFlow</strong> </p>
                      <h5>85%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Canva} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column',textAlign: 'left' }}>
                      <p style={{ textAlign: 'left'}}><strong>Canva</strong> </p>
                      <h5>85%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='img-div'>
                      <img src={Next} alt='skill' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p style={{ textAlign: 'left'}}><strong>Nextjs</strong> </p>
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
