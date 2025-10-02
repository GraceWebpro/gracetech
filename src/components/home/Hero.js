import React, { useState, useEffect } from 'react';
import './Home.css';
import user_1 from '../../assets/user_1.jpeg'
import user_2 from '../../assets/user_2.jpeg'
import user_3 from '../../assets/user_3.jpeg'
import user_4 from '../../assets/user_4.jpeg'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WorkProcess from '../banner/WorkProcess';

const rotatingWords = [
    'Web Development',
    'UI/UX Design',
    'Brand Strategy',
    'SEO Optimization',
    'Templates & Resources',
    'Tutorials & Courses'
  ];
  
const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero11">
      <div className="overlay11" />
      <div className="content11">
        <p className="tagline">Full - service digital agency for brands that dare to stand out.</p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          We Don’t Just Build{' '}  
          <motion.span
            className="highlight"
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {rotatingWords[index]}
          </motion.span>
          {' '}— We Build Experiences.
        </motion.h1>
        <p className="subtitle">
          Elevate your brand with cutting-edge design, powerful development, and real business results.
          From custom websites to downloadable templates and guided tutorials, GraceTech helps you create, learn, and grow.
        </p>
        <WorkProcess style={{ justifyContent: "center" }} />
        <div className="buttons">
          <Link to='/get-a-quote' className="btn primary">Get A Quote</Link>
          <Link to="/portfolio" className="btn secondary">View Our Work</Link>
        </div>
      </div>

      {/*<!-- Floating Comments -->*/}
      <div class="comment-bubble" style={{ top: '10%', left: '5%' }} >
        <img src={user_3} alt="User 1" />
        Where creativity meets performance. 💻
      </div>

      <div class="comment-bubble" style={{ top: '10%', right: '5%' }} >
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
  );
};

export default HeroSection;
