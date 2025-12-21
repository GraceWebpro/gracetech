import React, { useState, useEffect } from 'react';
import './Component.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../assets/my-logo2-removebg-preview (1).png'
import { motion } from 'framer-motion';
import { useAuth } from '../server/AuthProvider'
import { logout, db } from '../server/firebase'
import { doc, getDoc } from "firebase/firestore";


const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '#about' },
  { name: 'Services', path: '#services' },
  { name: 'Portfolio', path: '/portfolio' },
  {
    name: 'Resources',
    dropdown: true,
    children: [
      // { name: 'Courses', path: '/courses' },
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
  const { currentUser } = useAuth();


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

  const [userData, setUserData] = useState(null);

useEffect(() => {
  const fetchUserData = async () => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserData(docSnap.data());
    }
  };
  fetchUserData();
}, [currentUser]);

  

  return (
    <>
    <nav className="navbar">
      <Link to="/"><motion.div
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
      </motion.div></Link>

      

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
                  delay: 0.2 + index * 0.2,
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
        {/* Profile icon, only visible if logged in */}
        {currentUser && (
        <div className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} id='book'>
          <span className="nav__link icon66" onClick={toggleInfoPanel}>
            <IoMdPerson className="icon6" />
          </span>
        </div>
         )}
      </motion.div>


      {/* Info Side Panel */}
      <div 
      className={`info-panel ${showInfoPanel ? 'open' : ''}`}>
        <button className="close-btn" id="info-close" onClick={toggleInfoPanel}>
          <AiOutlineClose className="icon6" />
        </button>

        {currentUser && (
          <li className="profile-dropdown">
            <span className="profile-toggle">
              {/* You can use a profile icon here instead of text */}
              <IoMdPerson className="icon6" />
              {currentUser.displayName ? currentUser.displayName : 'My Profile'}
            </span>
              <ul className="prof-dropdown-menu">
                <li>
                  <Link 
                    to={currentUser.role === 'admin' ? '/dashboard' : '/dashboard'} 
                    onClick={toggleInfoPanel}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to={currentUser.role === 'admin' ? '/settings' : '/dashboard'} 
                    onClick={toggleInfoPanel}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button id='prof-logout'
                    onClick={() => {
                      logout();
                     toggleInfoPanel();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            
          </li>
        )}

      </div>
    </nav>


     {/* Mobile drawer */}
     <motion.div 
    initial={{ opacity: 0, width: 0 }}
    animate={{ 
      opacity: isMobileOpen ? 1 : 0,
      width: isMobileOpen ? "250px" : 0,
    }}
    transition={{ duration: 0.7 }}
     className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-close" onClick={closeMobileMenu}>×</div>
        {menuItems.map((item) => (
  item.dropdown ? (
    <div key={item.name} className="mobile-dropdown">
      <span onClick={toggleDropdown} className="mobile-dropdown-toggle">
        {item.name} <span className="drop-plus">+</span>
      </span>
      {resourcesOpen && (
        <ul className="dropdown-menu" id='mobile-drop'>
          {item.children.map((child) => (
            <li 
              key={child.name} 
              id="link-item"
              className={activeLink === child.name.toLowerCase() ? "active" : ""}
            >
              <Link 
                to={child.path} 
                onClick={() => {
                  closeMobileMenu();
                  setResourcesOpen(false);
                  setActiveLink(child.name.toLowerCase());
                }}
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : item.path.startsWith('#') ? (
    <a
      href={item.path}
      id="link-item"
      key={item.name}
      className={`mobile-items ${activeLink === item.name.toLowerCase() ? "active" : ""}`}
      onClick={(e) => {
        handleScroll(e, item.path);   // ✅ only for hash links
        setActiveLink(item.name.toLowerCase());
        closeMobileMenu();
      }}
    >
      {item.name}
    </a>
  ) : (
    <Link
      to={item.path}
      id="link-item"
      key={item.name}
      className={`mobile-items ${activeLink === item.name.toLowerCase() ? "active" : ""}`}
      onClick={() => {
        closeMobileMenu();           // ✅ no handleScroll here
        setActiveLink(item.name.toLowerCase());
      }}
    >
      {item.name}
    </Link>
  )
))}

        <Link to="/book-a-call" className="cta" onClick={closeMobileMenu}>Book a Call</Link>
      </motion.div>
    </>
  );
};

export default NavbarN;
