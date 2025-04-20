import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TemplateNavbar.css';
import logo from '../../assets/logo-main.png';
import { RiMenuUnfold3Fill, RiCloseLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdSearch } from "react-icons/io";
import { TbZoomScan } from "react-icons/tb";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../server/firebase';


const TemplateNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search bar

  const toggleMenu = () => setShowMenu(prev => !prev);
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      const snapshot = await getDocs(collection(db, 'templates'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const categories = [...new Set(templates.map(t => t.category || 'Uncategorized'))];

  // Function to toggle search visibility
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      <nav className="template-navbar">
        <div className="template-navbar-container">
          {/* Logo */}
          <Link to="/" className="template-logo" onClick={closeMenu}>
            <img src={logo} alt="logo" width={40} height={40} />
            <span>GraceTech</span>
          </Link>

          {/* Search */}
          <div className={`template-search ${isSearchVisible ? 'active' : ''}`}>
            <div className="search-select">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
              <IoMdArrowDropdown className="dropdown-icon" />
            </div>
            <div className="vertical-separator" />
           
            <div className="search-input-box" id='search-input-box'>
            <button className="search-ic" id='search-icon'>
                <IoMdSearch size={22} />
              </button>
              <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="image-scanner-btn" title="Scan Image">
                <TbZoomScan size={22} />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="template-right">
            <button className="mobile-search" onClick={toggleSearchBar}>
              {isSearchVisible ? <RiCloseLine size={22} /> : <IoMdSearch size={24} />}
            </button>
            <Link to="/subscribe" className="subscribe-btn desktop">
              Get Unlimited Download
            </Link>
            <div className="menu-toggle" onClick={toggleMenu}>
              {showMenu ? <RiCloseLine size={30} /> : <RiMenuUnfold3Fill size={30} />}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar + Overlay */}
      <div className={`sidebar-overlay ${showMenu ? 'show' : ''}`} onClick={closeMenu} />
      <div className={`sidebar ${showMenu ? 'open' : ''}`}>
        <ul className="template-nav-links">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/projects" onClick={closeMenu}>Projects</Link></li>
          <li><Link to="/templates" onClick={closeMenu}>Templates</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
          <Link to="/subscribe" className="subscribe-btn mobile">
              Get Unlimited Download
            </Link>
        </ul>

      </div>
    </>
  );
};

export default TemplateNavbar;
