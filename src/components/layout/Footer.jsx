import React from 'react'
import { Mail } from 'lucide-react'
import { NAV_LINKS } from '../utils/constants'
import { scrollToSection } from '../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
// import { SiLinkedin } from 'react-icons/si'
import './Footer.css'
import { IoIosCall } from "react-icons/io";
import { Link } from 'react-router-dom'
import styles from '../NewHome.module.css'
import BrandLogo from '../../assets/logo2.png'
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavclick = (sectionId) => {
  
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  // const socialIcons = {
  //   github: Github,
  //   linkedin: SiLinkedin,
  //   twitter: TwitterX,
  // };

  return (
      <div className="pg-footer">
        <footer className="footer">


          {/* wave length */}
          <svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path className="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
          </svg>
          
          <div className="footer-content">
            
            <FadeIn delay={0}>
              <div className="footer-content-column mt-4" >
                <div
                  className={styles['logo-wrapper']}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <Link to='/'><img src={BrandLogo} alt='brand-logo' className={styles['brand-logo']} /></Link>
                  {/* <Link to='/'><span className={styles.logo}>GraceTech</span></Link> */}
                </div>
                <div className="footer-menu">
                  <h2 className="footer-menu-name"> Get Started</h2>
                  <div className="space-y-1">
                    <a href='mailto:gogracetech@gmail.com' className="group flex items-center gap-1 py-3 transition-all duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className='w-4 h-4 text-primary' />
                      </div>
                      <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                        gogracetech@gmail.com
                      </span>
                    </a>

                    <div className="flex items-center gap-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IoIosCall className='w-4 h-4 text-primary' />
                      </div>
                      <span className="text-white/70 text-sm">
                        +234 704 342 1913
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <div className="footer-content-column">
                <div className="footer-menu">
                  <h2 className="footer-menu-name"> Explore</h2>
                  <ul id="menu-company" className="footer-menu-list">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page"><Link to="/#about">
                      About Us
                    </Link></li>
                    <Link to="/#services"><li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                      <a href="services">Services</a>
                    </li></Link>
                    <Link to="/#testimonials"><li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="testimonials">Testimonials</a>
                    </li></Link>
                  </ul>
                </div>
                <div className="footer-menu">
                  <h2 className="footer-menu-name"> Legal</h2>
                  <ul id="menu-legal" className="footer-menu-list">
                    <Link to="/privacy"><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                      <a href="priv">Privacy Policy</a>
                    </li></Link>
                    <Link to="/terms"><li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="terms">Terms of Use</a>
                    </li></Link>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="footer-content-column">
                <div className="footer-menu">
                  <h2 className="footer-menu-name">Quick Links</h2>
                    <ul className="space-y-3 mt-3">
                      {NAV_LINKS.map((link) => (
                        <li key={link.id}>
                          <button
                          onClick={() => handleNavclick(link.id)}
                          className='group flex items-center gap-2 text-white/80 hover:text-primary transition-all duration-300'
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-primary group-hover:w-2 transition-all duration-300" />
                            <span className="text-sm">{link.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="footer-content-column">
                <div className="footer-call-to-action">
                  <h2 className="footer-call-to-action-title"> Let's Chat</h2>
                  <p className="footer-call-to-action-description"> Got a question?</p>
                  <Link to="/book-a-call">
                    <button
                      className='w-fit px-7 py-2 bg-white text-[#212121] font-medium text-base rounded-[17px] border border-white hover:bg-white/90 transition-all duration-300 mt-2' 
                    >
                      Book a call
                    </button>
                  </Link>                
                </div>              
              </div>
            </FadeIn>

            <div className="footer-social-links"> 
              <svg className="footer-social-amoeba-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 54">
                <path className="footer-social-amoeba-path" d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"></path>
              </svg>
              <a 
                className="footer-social-link tiktok" 
                href="https://www.tiktok.com/@gracetechie" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hidden-link-text">TikTok</span>

                <svg
                  className="footer-social-icon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    className="footer-social-icon-path"
                    d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.115V2h-3.193v13.312a2.896 2.896 0 1 1-2.896-2.896c.298 0 .584.045.854.127V9.293a6.09 6.09 0 0 0-.854-.061A6.09 6.09 0 1 0 15.82 15.32V8.749a7.977 7.977 0 0 0 4.18 1.18V6.686h-.411z"
                  />
                </svg>
              </a>
             <a className="footer-social-link facebook"                 
              href="https://web.facebook.com/gracetechie/" 
              target="_blank"
              rel="noopener noreferrer"

            >
              <span className="hidden-link-text">Facebook</span>

              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className="footer-social-icon-path"
                  d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.6 1.7-1.6H16.7V5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7v3h3v8h3.5z"
                />
              </svg>
            </a>
              <a className="footer-social-link youtube" 
                href="https://www.youtube.com/@gracetechie" 
                target="_blank"
                rel="noopener noreferrer"
                >
                <span className="hidden-link-text">Youtube</span>
                <svg className="footer-social-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path className="footer-social-icon-path" d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
                </svg>
              </a>
              <a className="footer-social-link instagram" 
href="https://www.instagram.com/gracetechie_/" 
target="_blank"
rel="noopener noreferrer"              >
  <span className="hidden-link-text">Instagram</span>

  <svg
    className="footer-social-icon-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      className="footer-social-icon-path"
      d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm8.5 1.5h-8.5A4.26 4.26 0 0 0 3.5 7.75v8.5A4.26 4.26 0 0 0 7.75 20.5h8.5a4.26 4.26 0 0 0 4.25-4.25v-8.5A4.26 4.26 0 0 0 16.25 3.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5A3.5 3.5 0 1 0 12 16a3.5 3.5 0 0 0 0-7zm5.75-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
    />
  </svg>
</a>
            </div>

          </div>

          <div className="footer-copyright">
            <div className="footer-copyright-wrapper">
              <p className="footer-copyright-text">
                <p className="footer-copyright-link" href="home" target="_self"> © 2026 GraceTech. All rights reserved. </p>
              </p>
            </div>
          </div>
        </footer>
      </div>
  )
}

export default Footer
