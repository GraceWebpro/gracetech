import { useEffect, useState } from "react";

export const useScrollSpy = (sectionIds, offset = 100) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            // find the current section
            // find the current section
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const section = document.getElementById(sectionIds[i]);
            
                if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
            
                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    setActiveSection(sectionIds[i]);
                    break;
                }
                }
            }
  
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionIds, offset]);

    return activeSection;

};

// smooth scroll to a section
export const scrollToSection = (sectionId, offset = 80) => {
    const section = document.getElementById(sectionId);
  
    if (!section) return;
  
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      offset;
  
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
}
  