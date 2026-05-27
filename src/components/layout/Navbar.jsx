import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../utils/constants';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useScrollSpy, scrollToSection } from '../hooks/useScrollSpy';
import { useAuth } from '../../config/AuthProvider';
import { getAuth, signOut } from "firebase/auth";
import BrandLogo from '../../assets/logo2.png'
import styles from '../NewHome.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser: user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMobileMenuOpen, setUserMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);

  const activeSection = useScrollSpy(NAV_LINKS.map(link => link.id));
  let dropdownTimeout;

  // SCROLL
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  // NAVLINKS
  const handleNavClick = (link) => {
    setIsMenuOpen(false);

    if (link.type === "route") {
      navigate(link.path);
      return;
    }

    const scrollAction = () => {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: link.id } });
      } else {
        scrollToSection(link.id);
      }
    };

    setTimeout(scrollAction, 320);
  };

  
  // LOGOUT
  const handleLogout = () => {
    signOut(getAuth());
    setUserMenuOpen(false);
  };

  // 👉 WhatsApp link (keep this at top of file or in a config file)
const WHATSAPP_NUMBER = "2347043421913";

const hireMeWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I am contacting you from your website. I want to hire you for a project.\n\nProject details:\n- Type of project:\n- Budget:\n- Timeline:\n\nLet’s talk."
)}`;

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles['navbar-inner']}>
        
        {/* Logo */}
        <div
          className={styles['logo-wrapper']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Link to='/'><img src={BrandLogo} alt='brand-logo' className={styles['brand-logo']} /></Link>
          {/* <div className={styles['brand-text']}>

          <Link to='/'><span className={styles.logo}>GraceTech</span></Link>
          <p>BUILD <span>•</span> INNOVATE <span>•</span> ELEVATE</p>
</div> */}
        </div>



        {/* Desktop Nav */}
        {/* ================= DESKTOP NAV ================= */}
        <div className={styles['nav-links']}>

          {NAV_LINKS.map(link => {

            /* ===== SERVICES DROPDOWN ===== */
            if (link.type === "dropdown") {
              return (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout(dropdownTimeout);
                    setServicesOpen(true);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeout = setTimeout(() => {
                      setServicesOpen(false);
                    }, 150); // 👈 smooth delay (important)
                  }}
                >
                  <button className="flex items-center gap-1">
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                  </button>

                  {servicesOpen && (
                    <div className="absolute left-0 top-full mt-3 w-80 bg-[#111] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">

                      {link.dropdown.map((item, i) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={i}
                            onClick={() => {
                              if (item.type === "route") {
                                navigate(item.path);
                              } else {
                                handleNavClick(item);
                              }
                              setServicesOpen(false);
                            }}
                            className="w-full flex items-center text-left gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition"
                          >
                            {/* ICON */}
                            {Icon && (
                              <Icon className="w-4 h-4 text-primary shrink-0" />
                            )}

                            {/* TEXT */}
                            <span>{item.label}</span>
                          </button>
                        );
                      })}

                    </div>
                  )}
                </div>
              );
            }

            /* ===== NORMAL LINKS ===== */
            const isActive =
              link.type === "route"
                ? location.pathname === link.path
                : activeSection === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={isActive ? styles.active : ""}
              >
                {link.label}
              </button>
            );
          })}
        </div>


        {/* Right-side CTA / User */}
        <div className="topbar-right flex items-center gap-0 md:gap-4 relative">
          {/* Logged-in vs Logged-out */}
          {/* {user ? (
            <div
              className="user-chip flex items-center gap-2 cursor-pointer relative"
              onClick={(e) => { e.stopPropagation(); setUserMenuOpen(v => !v); }}
            >
              <div className="avatar hidden md:flex w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-white to-primary text-black font-bold">
                {user.displayName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </div>
              {/* Username hidden on mobile *

              {/* Dropdown *
              {userMenuOpen && (
                <div
                className="user-menu absolute right-0 top-full mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden z-50 shadow-lg"                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full px-4 py-2 text-left text-white hover:bg-white/10"
                    onClick={() => { navigate("/dashboard"); setUserMenuOpen(false); }}
                  >
                    Dashboard
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-white hover:bg-white/10"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className='hidden lgx:block'>
              <button className="px-5 py-2 rounded-xl border border-white/70 text-white/80 hover:text-white hover:border-white transition">
                Login
              </button>
            </Link>
          )} */}

       

          {/* Book a Call - always visible */}
          <Link to='/book-a-call' className='hidden lgx:block'>
            <button
          
          className="px-5 py-2 rounded-xl border border-white/70 text-white/80 hover:text-white hover:border-white transition">
              Book a Call
            </button>
          </Link>

          <a
            href={hireMeWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-3 py-2
              sm:px-4 sm:py-2
              md:px-5 md:py-3
              rounded-xl
              text-black
              font-medium
              bg-white
              shadow-lg
              hover:scale-[1.02]
              transition
            "
          >
            Hire Me
          </a>

        
          {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='lgx:hidden p-4 text-white hover:text-white/80 mr-[-10px] transition-colors'
          aria-label='menu'
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lgx:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/75 backdrop-blur-lg w-full border-t border-white/30 px-5 py-6 space-y-6">

          {/* ───────── USER SECTION (LOGGED IN) ───────── */}
          {user && (
            <div className="space-y-3">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMobileMenuOpen(v => !v);
                }}
              >
                <div className="avatar w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-primary text-black font-bold md:hidden">
                  {user.displayName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-medium truncate">
                  {user.displayName || user.email}
                </span>
              </div>

              {userMobileMenuOpen && (
                <div className="ml-12 space-y-2">
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                      setUserMenuOpen(false);
                    }}
                    className="block text-left text-white/80 hover:text-white"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block text-left text-white/70 hover:text-white mt-4"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ───────── NAV LINKS ───────── */}
          <div className="space-y-2">
            {/* NAV LINKS */}
            {NAV_LINKS.map(link => {

            if (link.type === "dropdown") {
              return (
                <div key={link.id}>
                  <button
                    onClick={() => setServicesMobileOpen(v => !v)}
                    className="w-full text-left py-2 flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        servicesMobileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {servicesMobileOpen && (
                    <div className="ml-4 space-y-2">
                      {link.dropdown.map((item, i) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={i}
                            onClick={() => {
                              if (item.type === "route") {
                                navigate(item.path);
                              } else {
                                handleNavClick(item);
                              }
                              setServicesOpen(false);
                              setIsMenuOpen(false)
                            }}
                            className="w-full flex items-center text-left gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition"
                          >
                            {/* ICON */}
                            {Icon && (
                              <Icon className="w-4 h-4 text-primary shrink-0" />
                            )}

                            {/* TEXT */}
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => {
                  handleNavClick(link);
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left py-2"
              >
                {link.label}
              </button>
            );
            })}
          </div>

          {/* ───────── LOGIN (LOGGED OUT ONLY) ───────── */}
          {/* {!user && (
            <Link to="/book-a-call" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full px-4 py-3 rounded-lg mt-4 border border-white/20 text-white/80 hover:text-white hover:border-white transition">
                Book a Call 
              </button>
            </Link>
          )} */}

          {/* ───────── PRIMARY CTA ───────── */}
          {/* <a  href={hireMeWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-white to-primary text-black font-semibold mt-4">
              Hire Me
            </button>
          </a> */}

          <Link to="/book-a-call" onClick={() => setIsMenuOpen(false)}>
          <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-white to-primary text-black font-semibold mt-4 mb-4">
                Book a Call 
              </button>
            </Link>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;
