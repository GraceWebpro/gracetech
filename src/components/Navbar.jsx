import React, { useState } from 'react';
import './Component.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdApps } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../assets/my-logo2-removebg-preview (1).png'
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '#about' },
  { name: 'Services', path: '#services' },
  { name: 'Portfolio', path: '/portfolio' },
  {
    name: 'Resources',
    dropdown: true,
    children: [
      { name: 'Courses', path: '/courses' },
      { name: 'Templates', path: '/templates' },
      { name: 'Blog', path: '/blog' },
    ],
  },
  { name: 'Contact', path: '/contact' },
];

const NavbarN = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileMenu = () => setIsMobileOpen(false);
  const toggleInfoPanel = () => setShowInfoPanel(!showInfoPanel);
  const toggleDropdown = () => setResourcesOpen(!resourcesOpen);

  const handleScroll = (e, targetId) => {
  e.preventDefault();
  const target = targetId.replace('#', '');

  if (location.pathname !== '/') {
    navigate(`/?scrollTo=${target}`);
  } else {
    const section = document.querySelector(`#${target}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  closeMobileMenu();
};
  
  const location = useLocation();
  const navigate = useNavigate();

  

  return (
    <>
    <nav className="navbar">
      <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffnexx: 100,
        damping: 25,
        delay: 0.3,
        duration: 1.2,
      }}
      className="navbar-logo">
        <img src={logo} alt='brand logo' width={70} height={70} /><a href="#home">GraceTech</a>
      </motion.div>

      

      <ul className="navbar-links">
      {menuItems.map((item, index) => (
  <motion.li
  initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.7 + index * 0.2,
              }}
   className={item.dropdown ? 'dropdown' : ''} id='link-item' key={item.name}>
    {item.dropdown ? (
      <>
        <span onClick={toggleDropdown} className="dropdown-toggle">
          {item.name} <span className='drop-plus'>+</span>
        </span>
        {resourcesOpen && (
          <ul className="dropdown-menu">
            {item.children.map((child) => (
              <motion.li 
              key={child.name} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.7 + index * 0.2,
              }}
              id='link-item'>
                <Link to={child.path} onClick={() => {
                  closeMobileMenu();       // closes mobile nav if open
                  setResourcesOpen(false); // closes the dropdown
                }}>{child.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </>
    ) : item.path.startsWith('#') ? (
      <a
        href={item.path}
        onClick={(e) => handleScroll(e, item.path)}
        id='link-item'
        className={activeLink === item.name.toLowerCase() ? 'active' : ''}
      >
        {item.name}
      </a>
    ) : (
      <Link
        to={item.path}
        onClick={closeMobileMenu}
        id='link-item'
        className={activeLink === item.name.toLowerCase() ? 'active' : ''}
      >
        {item.name}
      </Link>
    )}
  </motion.li>
))}

      </ul>

      <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1.6,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div><Link to="/book-a-call" className="cta">Book a Call</Link></div>
        <div className="navbar-hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>
        <div className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} id='book'>
          <span className="nav__link icon66" onClick={toggleInfoPanel}>
            <IoMdApps className="icon6" />
          </span>
        </div>
      </motion.div>


      {/* Info Side Panel */}
      <div className={`info-panel ${showInfoPanel ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleInfoPanel}>
          <AiOutlineClose className="icon6" />
        </button>
        <div className="side-info">
          <div className="logo">
            <a href="#home" className="nav__logo2">
              <p className="logo-txt">GraceTech</p>
            </a>
          </div>
          <p className="abt">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit consectetur, aliquam quaerats voluptatem. Ut enim ad minima veniam, exercitationem laboriosam, nisi ut aliquid ex ea autem velit esse quam nihil
          </p>
          <p className="p-first"><strong>ADDRESS</strong><br /><h5>Victoria Island, Lagos.</h5></p>
          <p><strong>EMAIL</strong><br /><span>gracetechagency@gmail.com</span></p>
          <p><strong>CALL NOW</strong><br /><span>+234 704 342 1913</span></p>
          <div className="nav-flex">
            <Link to="contact" className="nav__link"><AiOutlineTikTok className="nav-icon" /></Link>
            <Link to="contact" className="nav__link"><IoLogoInstagram className="nav-icon" /></Link>
            <Link to="contact" className="nav__link"><FaFacebook className="nav-icon" /></Link>
          </div>
          <Link to="contact" className="nav__link nav-btn side-btn" onClick={closeMobileMenu}>
            Let's Connect
          </Link>
        </div>
      </div>
    </nav>
     {/* Mobile drawer */}
     <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-close" onClick={closeMobileMenu}>×</div>
        {menuItems.map((item) =>
          item.dropdown ? (
            <div key={item.name} className="mobile-dropdown">
              <span onClick={toggleDropdown}>Resources <span className='drop-plus'>+</span></span>
              {resourcesOpen && (
              <ul className="dropdown-menu">
                {item.children.map((child) => (
                  <li key={child.name} id='link-item'>
                    <Link to={child.path} onClick={() => {
                      closeMobileMenu();       // closes mobile nav if open
                      setResourcesOpen(false); // closes the dropdown
                    }}>{child.name}
                    </Link>
                  </li>
                ))}
              </ul>
        )}
            </div>
          ) : (
            <a
              href={item.path}
              id='link-item'
              key={item.name}
              onClick={(e) => handleScroll(e, item.path)}
            >
              {item.name}
            </a>
          )
        )}
        <Link to="/book-a-call" className="cta" onClick={closeMobileMenu}>Book a Call</Link>
      </div>
    </>
  );
};

export default NavbarN;
