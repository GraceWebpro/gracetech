import React, { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'; // ✅ Use this
import './Navbar.css'
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { RiMenuUnfold3Fill, RiCloseLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../../assets/my-logo2-removebg-preview (1).png';
//import NavSearch from './NavSearch';
import { IoMdApps } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { Col } from 'react-bootstrap';
import { IoIosArrowRoundForward } from "react-icons/io";
import { ArrowRightCircle } from 'react-bootstrap-icons';





const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [activeLink, setActiveLink] = useState('home');
  //const [scrolled, setscrolled] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';


  const updateActiveLink = (value) => {
    setActiveLink(value);
  }

  useEffect(() => {
    // Set the active link based on the current path
    const path = location.pathname.split('/')[1]; // Get the current route path
    setActiveLink(path || 'home'); // Default to 'home' if there's no path
  }, [location]);


  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/') {
      setActiveLink('home');
    } else {
      const pathName = currentPath.split('/')[1]; // get the section name after '/'
      setActiveLink(pathName || 'home');
    }
  }, [location]);

  return (
      <header className='header'>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <Link to="/" className="nav__logo">
                <img src={logo} alt='logo' width={40} height={40} style={{ marginRight: '0px'}}/><p className='logo-txt'>GraceTech</p> 
            </Link>
        </div>
       
        
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
         
           
          

          <ul>
            {['home', 'about', 'project', 'services', 'templates', 'blog', 'courses'].map((item) => (
              <li
                key={item}
                className={activeLink === item ? 'active nav__item' : 'nav__item'}
                onClick={() => updateActiveLink(item)}
              >
                {item === 'home' ? (
                  <RouterLink to="/" onClick={closeNavbar} className="nav__link">
                    Home
                  </RouterLink>
                ) : item === 'project' ? (
                  <RouterLink to="/projects" onClick={closeNavbar} className="nav__link">
                    Projects
                  </RouterLink>
                ) : item === 'templates' ? (
                  <RouterLink to="/templates" onClick={closeNavbar} className="nav__link">
                    Templates
                  </RouterLink>
                ) : item === 'blog' ? (
                  <RouterLink to="/blog" onClick={closeNavbar} className="nav__link">
                    Blog
                  </RouterLink>
                ): item === 'Courses' ? (
                  <RouterLink to="/courses" onClick={closeNavbar} className="nav__link">
                    Courses
                  </RouterLink>
                )  : isHomePage ? (
                  <ScrollLink
                    to={item}
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-70}
                    onClick={closeNavbar}
                    className="nav__link"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </ScrollLink>
                ) : (
                  <RouterLink
                    to={`/${item}`}
                    state={{ scrollTo: item }}
                    onClick={closeNavbar}
                    className="nav__link"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </RouterLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* right section */}
        <div  className='nav-elements-right'>
        <ul>
          <li id='talk' className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('contact')}>
             <Link
               to="contact"
               className="nav__link nav-btn"
               onClick={closeNavbar}
             >
               Contact Us
             </Link>
           </li>

           <div className="menu-icon" onClick={handleShowNavbar}>
           {showNavbar ? <RiCloseLine /> : <RiMenuUnfold3Fill />}
          </div>
            <li className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'}>
             <Link
               className="nav__link"
             >
               <IoMdApps className='icon6' onClick={toggleInfoPanel} /> 
             </Link>
           </li>

          </ul>
        </div>

        {/* Info Side Panel */}
      <div className={`info-panel ${showInfoPanel ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleInfoPanel}><AiOutlineClose className='icon6' /></button>
        <div className='side-info'>
          <div className="logo">
            <Link to="/" className="nav__logo2">
              <img src={logo} alt='logo' width={60} height={60} style={{ marginRight: '0px'}}/><p className='logo-txt'>GraceTech</p> 
            </Link>
          </div>
          <p className='abt'>Neque porro quisquam est, qui dolorem ipsum quia dolor sit consectetur, aliquam quaerats voluptatem. Ut enim ad minima veniam, exercitationem laboriosam, nisi ut aliquid ex ea autem velit esse quam nihil</p>
        <p className='p-first'><strong>ADDRESS</strong> <br /><h5>Victoria Island, Lagos.</h5></p>
        <p><strong>EMAIL</strong> <br /><span>gracetechagency@gmail.com</span></p>

        <p><strong>CALL NOW</strong><br /><span>+234 704 342 1913</span></p>
        <div className='nav-flex'>
          <Link
            to="contact"
            className="nav__link"
            >
            <AiOutlineTikTok className='nav-icon'/> 
          </Link>
          <Link
            to="contact"
            className="nav__link"
            >
            <IoLogoInstagram className='nav-icon'/> 
          </Link>
          <Link
            to="contact"
            className="nav__link"
            >
            <FaFacebook className='nav-icon'/> 
          </Link>    
         </div>

          <Link
            to="contact"
            className="nav__link nav-btn side-btn"
            onClick={closeNavbar}
            >
              Let's Connect 
          </Link>
       </div>
      </div>
      </div>
    </nav>
    </header>
  )
}

export default Navbar
