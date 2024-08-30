import React, { useState, useEffect } from 'react';
import { IoIosArrowDropupCircle } from 'react-icons/io'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };

    }, [])

    return (
        <div className='scroll-to-top'>
            {isVisible && (
                <div onClick={scrollToTop}>
                    <IoIosArrowDropupCircle />
                </div>
            )}
        </div>
    );
};

export default ScrollToTop;