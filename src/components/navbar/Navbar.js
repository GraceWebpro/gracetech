import React, { useState, useEffect } from 'react'
//import { NavLink } from 'react-router-dom'
import { Link } from "react-router-dom";
//import { RiCloseLine } from "react-icons/ri";
//import { RiArrowDropDownLine } from "react-icons/ri";
import './Navbar.css'
import { RiMenuUnfold3Fill } from "react-icons/ri";
import logo from '../../logo.svg';
import NavSearch from './NavSearch';


const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setscrolled] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  }

  useEffect(() => {
  const onScroll = () => {
    if (window.scrollY > 50) {
      setscrolled(true);
    } else {
      setscrolled(false);
    }
  }

  window.addEventListener('scroll', onScroll);

  return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const updateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <header className='header'>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <Link to="/" className="nav__logo">
                <img src={logo} alt='logo' width='30' height='30' style={{ marginRight: '10px'}}/>  Movie Stream 
            </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
        <RiMenuUnfold3Fill />
        </div>
        
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
          <li className={activeLink === 'home' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('home')}>
             <Link to="/" className="nav__link" onClick={closeNavbar}>
               Home
             </Link>
           </li>
           <li className={activeLink === 'skills' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('skills')}>
             <Link to="skills" className="nav__link" onClick={closeNavbar}>
               Skills 
             </Link>
           </li>
           <li className={activeLink === 'projects' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('projects')}>
             <Link
               to="projects"
               className="nav__link"
               onClick={closeNavbar}
             >
               Projects 
             </Link>
           </li>
           <li className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('contact')}>
             <Link
               to="contact"
               className="nav__link"
               onClick={closeNavbar}
             >
               Contact
             </Link>
           </li>
           <NavSearch />
          </ul>
          <span>
          <div className='social' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '20px', margin: '0 auto', marginTop: '10px' }}>
            <a href='https://www.facebook.com' style={{ color: '#fff', fontSize: '25px' }}><FaFacebook /> </a>
            <a href='https://www.instagram.com' style={{ color: '#fff', fontSize: '25px' }}><FaInstagram /></a>
            <a href='https://wwww.twitter.com' style={{ color: '#fff', fontSize: '25px' }}><FaTwitter /></a>
          </div>
          </span>
        </div>
      </div>
    </nav>
    </header>
  )
}

export default Navbar