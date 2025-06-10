import React, { useState } from 'react';
import './Component.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdApps } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

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
      <div className="navbar-logo">
        <a href="#home">GraceTech</a>
      </div>

      

      <ul className="navbar-links">
      {menuItems.map((item) => (
  <li className={item.dropdown ? 'dropdown' : ''} id='link-item' key={item.name}>
    {item.dropdown ? (
      <>
        <span onClick={toggleDropdown} className="dropdown-toggle">
          {item.name} <MdArrowDropDown />
        </span>
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
  </li>
))}

      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div><Link to="/book-a-call" className="cta">Book a Call</Link></div>
        <div className="navbar-hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>
        <div className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} id='book'>
          <span className="nav__link" onClick={toggleInfoPanel}>
            <IoMdApps className="icon6" />
          </span>
        </div>
      </div>


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
              <span onClick={toggleDropdown}>Resources</span>
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
