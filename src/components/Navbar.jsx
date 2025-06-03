import React, { useState } from 'react';
import './Component.css';
import { Link } from 'react-router-dom';
import { IoMdApps } from "react-icons/io";
import { FiDivide } from 'react-icons/fi';
import { MdArrowDropDown } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ArrowRightCircle } from 'react-bootstrap-icons';


const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
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

  const updateActiveLink = (link) => {
    setActiveLink(link);
  };
  
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileMenu = () => setIsMobileOpen(false);


  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setResourcesOpen(!resourcesOpen)
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">GraceTech</Link>
      </div>

      <div className="navbar-hamburger" onClick={toggleMobileMenu}>
        ☰
      </div>

      <ul className="navbar-links">
  {menuItems.map((item) => (
    <li className={`${item.dropdown ? 'dropdown' : ''}`} key={item.name} onClick={toggleDropdown}>
    {item.dropdown ? (
      <>
        <span onClick={toggleDropdown} className='dropdown'>
          {item.name} <MdArrowDropDown />
        </span>
        {resourcesOpen && (
        <ul className="dropdown-menu">
          {item.children.map((child) => (
            <li key={child.name}>
              <Link to={child.path}>{child.name}</Link>
            </li>
          ))}
        </ul>)}
      </>
    ) : (
      <Link to={item.path} onClick={() => updateActiveLink(item.name.toLowerCase())}>
        {item.name}
      </Link>
    )}
  </li>
  
  ))}
</ul>


      <div style={{ display: 'flex', gap: '20px' }}>
      <div><Link to="/book-a-call" className="cta">Book a Call</Link></div>
        <div className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'}>
             <Link
               className="nav__link"
             >
               <IoMdApps className='icon6' onClick={toggleInfoPanel} /> 
               
             </Link>
           </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-close" onClick={closeMobileMenu}>×</div>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/services" onClick={closeMobileMenu}>Services</Link>
        <Link to="/portfolio" onClick={closeMobileMenu}>Portfolio</Link>
        <Link to="/about" onClick={closeMobileMenu}>About</Link>
        <div className="mobile-dropdown">
          <span>Resources</span>
          <div className="mobile-dropdown-content">
            <Link to="/courses" onClick={closeMobileMenu}>Courses</Link>
            <Link to="/templates" onClick={closeMobileMenu}>Templates</Link>
            <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
          </div>
        </div>
        <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        <Link to="/book-a-call" className="cta" onClick={closeMobileMenu}>Book a Call</Link>
      </div>

 {/* Info Side Panel */}
 <div className={`info-panel ${showInfoPanel ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleInfoPanel}><AiOutlineClose className='icon6' /></button>
        <div className='side-info'>
          <div className="logo">
            <Link to="/" className="nav__logo2">
             {/* <img src={logo} alt='logo' width={60} height={60} style={{ marginRight: '0px'}}/>*/}<p className='logo-txt'>GraceTech</p> 
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
            onClick={closeMobileMenu}
            >
              Let's Connect 
          </Link>
       </div>
      </div>
    </nav>
  );
};

export default NavbarN;
