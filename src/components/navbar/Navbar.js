import React, { useState, useEffect } from 'react'
//import { NavLink } from 'react-router-dom'
import { Link } from "react-router-dom";
//import { RiCloseLine } from "react-icons/ri";
//import { RiArrowDropDownLine } from "react-icons/ri";
import './Navbar.css'
import { RiMenuUnfold3Fill } from "react-icons/ri";
import logo from '../../assets/my-logo.jpeg';
//import NavSearch from './NavSearch';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';


const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [activeLink, setActiveLink] = useState('home');
  //const [scrolled, setscrolled] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  }

  //useEffect(() => {
  //const onScroll = () => {
  //  if (window.scrollY > 50) {
   //   setscrolled(true);
   // } else {
    //  setscrolled(false);
   //// }
  //}

 // window.addEventListener('scroll', onScroll);

  //return () => window.removeEventListener('scroll', onScroll);
  //}, []);

  const updateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <header className='header'>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <Link to="/" className="nav__logo">
                <img src={logo} alt='logo' width='30' height='30' style={{ marginRight: '0px'}}/><p className='logo-txt'>raceTech</p> 
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
               className="nav__link nav-btn"
               onClick={closeNavbar}
             >
               Let's connect
             </Link>
           </li>
            <li className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('contact')}>
             <Link
               to="contact"
               className="nav__link"
               onClick={closeNavbar}
             >
               <IoCall className='icon'/> 
             </Link>
           </li>

          
          </ul>
          
        </div>
      </div>
    </nav>
    </header>
  )
}

export default Navbar
/*
<div className='social'>
           <li className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('contact')}>
             <Link
               to="contact"
               className="nav__link"
               onClick={closeNavbar}
             >
               <FaFacebook className='icon'/> 
             </Link>
           </li>
           <li className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('contact')}>
             <Link
               to="contact"
               className="nav__link"
               onClick={closeNavbar}
             >
               <FaInstagram className='icon'/> 
             </Link>
           </li>
            <li className={activeLink === 'contact' ? 'active nav__item' : 'nav__item'} onClick={() => updateActiveLink('contact')}>
             <Link
               to="contact"
               className="nav__link"
               onClick={closeNavbar}
             >
               <FaTwitter className='icon'/> 
             </Link>
           </li>

</div>*/