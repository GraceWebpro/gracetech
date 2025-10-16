import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToHashElement() {
    const location = useLocation();

    useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // smooth scroll
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100)
      }
    }
    }, [location])
    
  return null;
}

export default ScrollToHashElement
