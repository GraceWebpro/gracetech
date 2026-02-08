import React, { useState, useEffect } from 'react';
import { Code, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useScrollSpy, scrollToSection } from '../../hooks/useScrollSpy';
import { useAuth } from '../../../server/AuthProvider';
import { getAuth, signOut } from "firebase/auth";
import styles from '../../NewHome.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser: user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMobileMenuOpen, setUserMobileMenuOpen] = useState(false);

  const activeSection = useScrollSpy(NAV_LINKS.map(link => link.id));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleLogout = () => {
    signOut(getAuth());
    setUserMenuOpen(false);
  };

  return (
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
          {NAV_LINKS.map(link => {
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
        <div className="topbar-right flex items-center gap-3 relative">
          {/* Book a Call - always visible */}
          <Link to='/book-a-call' className='hidden lgx:block'>
          <button
         
           className="px-5 py-3 rounded-xl text-black font-medium bg-white shadow-lg hover:scale-[1.02] transition">
            Book a Call
          </button>
          </Link>

          {/* Logged-in vs Logged-out */}
          {user ? (
            <div
              className="user-chip flex items-center gap-2 cursor-pointer relative"
              onClick={(e) => { e.stopPropagation(); setUserMenuOpen(v => !v); }}
            >
              <div className="avatar w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold md:hidden">
                {user.displayName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </div>
              {/* Username hidden on mobile */}
              <span className="username text-white">{user.displayName || user.email}</span>

              {/* Dropdown */}
              {userMenuOpen && (
                <div
                  className="user-menu absolute right-0 mt-0 bg-[#111] border border-white/10 rounded-xl overflow-hidden z-50 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
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
              <button className="px-5 py-3 rounded-xl border border-white/70 text-white/80 hover:text-white hover:border-white transition">
                Login
              </button>
            </Link>
          )}
          {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='lgx:hidden p-4 text-white hover:text-white/80 transition-colors'
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
        <div className="bg-black/95 backdrop-blur-lg border-t border-white/10 px-5 py-6 space-y-6">

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
                <div className="avatar w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold md:hidden">
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
            {NAV_LINKS.map((link) => {
              const isActive =
                link.type === 'route'
                  ? location.pathname === link.path
                  : activeSection === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* ───────── LOGIN (LOGGED OUT ONLY) ───────── */}
          {!user && (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full px-4 py-3 rounded-lg mt-4 border border-white/20 text-white/80 hover:text-white hover:border-white transition">
                Login
              </button>
            </Link>
          )}

          {/* ───────── PRIMARY CTA ───────── */}
          <Link to="/book-a-call" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold mt-4">
              Book a Call
            </button>
          </Link>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;
