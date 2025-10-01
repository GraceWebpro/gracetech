import React, { useState, useEffect } from 'react';
import './Home.css'
import { motion } from 'framer-motion'
import heroimg from '../../assets/meet.png'
import WorkProcess from '../banner/WorkProcess';
import user_1 from '../../assets/user_1.jpeg'
import user_2 from '../../assets/user_2.jpeg'
import user_3 from '../../assets/user_3.jpeg'
import user_4 from '../../assets/user_4.jpeg'
import { Link } from 'react-router-dom';


const rotatingWords = [
  'Web Development',
  'UI/UX Design',
  'Brand Strategy',
  'SEO Optimization',
  'Templates & Resources',
  'Tutorials & Courses'
];

const HeroSection2 = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
   <section className='hero22'>
    <div className='overlayyy'>
<div className='content22'>
      {/* Left Section */}
      <div className='cont-left'>
      <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.5, 
          }}
          style={{ color: '#fff', top: '50px', }}
        >
          We Don’t Just <br /> Build{' '}  
          <motion.span
            className="highlight"
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {rotatingWords[index]}
          </motion.span>
          {' '} <br />We Build Experiences.
        </motion.h1>
        <motion.p 
           initial={{ opacity: 0, y: 80 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{
             type: "spring",
             stiffness: 40,
             damping: 25,
             delay: 1.8,
             duration: 1.5, 
           }}
        className="subtit">
          Elevate your brand with cutting-edge design, powerful development, and real business results.
          From custom websites to downloadable templates and guided tutorials, GraceTech helps you create, learn, and grow.
        </motion.p>
        <WorkProcess />
        <div className="buttons">
          <Link to='/get-a-quote' className="btn primary">Get A Quote</Link>
          <Link to="/portfolio" className="btn secondary">View Our Work</Link>
        </div>
      </div>

      {/* Right Section */}
      <div className='hero-img2'>
           <img src={heroimg} alt='hero-img' className='cont-right' />
      
</div>
      </div>

    </div>

    {/*<!-- Floating Comments -->*/}
    <div class="comment-bubble" style={{ top: '15%', left: '5%' }} >
        <img src={user_3} alt="User 1" />
        Where creativity meets performance. 💻
      </div>

      <div class="comment-bubble" style={{ top: '15%', right: '5%' }} >
        <img src={user_4} alt="User 2" />
        Templates, tutorials, and tools — everything you need in one place! 💼
      </div>

      <div class="comment-bubble" style={{ bottom: '10%', left: '5%' }}>
        <img src={user_1} alt="User 3" />
        GraceTech transformed our brand — couldn’t be happier! 😀
      </div>

      <div class="comment-bubble" style={{ bottom: '10%', right: '5%' }}>
        <img src={user_2} alt="User 3" />
        Start your project with us today — it’s easier than you think! 🎨
      </div>

   </section>
  )
}

export default HeroSection2
