import React, { useState, useEffect } from 'react'
import {Code, Menu, X} from 'lucide-react'
import { NAV_LINKS } from '../../utils/constants'
import { Link } from "react-router-dom";
import { useScrollSpy, scrollToSection } from '../../hooks/useScrollSpy'
import styles from '../../NewHome.module.css'
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const activeSection = useScrollSpy(NAV_LINKS.map(link => link.id));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    const handleNavclick = (sectionId) => {
      setIsMenuOpen(false);
    
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        scrollToSection(sectionId);
      }
    };
    

  return (
    <>
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles['navbar-inner']}>
        {/* Logo */}
        <div
          className={styles['logo-wrapper']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Code className="w-6 h-6 text-primary" />
          <Link to='/'><span className={styles.logo}>GraceTech</span></Link>
        </div>

        {/* Desktop Nav */}
        <div className={styles['nav-links']}>
          {NAV_LINKS.map(link => (
           <button
           key={link.id}
           onClick={() => handleNavclick(link.id)}
           className={activeSection === link.id ? 'active' : ''}
          >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Link to='/book-a-call'><button
          
          className={styles['cta-button']}
        >
          Book a Call
        </button>
        {/* Mobile menu buttons */}
        <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='md:hidden p-4 text-white hover:text-white/80 transition-colors'
        aria-label='menu'
        aria-expanded={isMenuOpen}
        >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' /> }
        </button></Link>
        </div>

      {/* mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0' }`}>
            <div className='bg-black/95 backdrop-blur-lg border-t border-white/10 px-5 py-6 space-y-3' >
                {NAV_LINKS.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => handleNavclick(link.id)}
                        className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${activeSection === link.id
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    >
                        {link.label}
                    </button>
                ))}
                <Link to="/book-a-call"><button
                className='w-full px-7 py-2 bg-white text-[#212121] font-medium text-base rounded-[17px] border border-white hover:bg-white/90 transition-all duration-300 mt-2' >
                    Book a call
                </button></Link>

                
            </div>
      </div>
    </nav>


    </>
  )
}

export default Navbar
