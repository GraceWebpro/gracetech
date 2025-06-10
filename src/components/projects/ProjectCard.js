import React, { useState, useEffect} from 'react';
import defaultImg from '../../assets/dummyImg.jpg';
import { GoArrowUpRight } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from 'react-router-dom';



const ProjectCard = ({ id, title, category, imageUrl, onEnlarge }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = () => {
    if (isMobile) setShowOverlay(prev => !prev);
  };


  return (
    <div className='project-card2'  >
      <div className="proj-imgbx project-card" style={{ position: 'relative' }} onClick={handleCardClick}>
        <img src={imageUrl || defaultImg} alt={title} className="img-fluid" width={350} height={300} />       
        <div className={`proj-txtx ${isMobile && showOverlay ? 'show' : ''}`}>          {/*<h4>{title}</h4>
          <span>{category}</span>*/}
          <FiPlus className='proj-zoom'
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation(); // prevent parent click
            onEnlarge();
          }} // 🔥 Trigger modal on click
          title="Enlarge" />

        </div>
      </div>
     
      <div className='proj-bottom'>
        <div className='proj-block'>
          <p>{category}</p>
          <h3>{title}</h3>
         
        </div>
        <div className='icon-div'>
        <Link to={`/project-details/${id}`} style={{ color: '#fff' }}>

          <BsArrowUpRight className='proj-det-btn' />
          </Link>
        </div>
      </div>
      </div>
      
  );
};

export default ProjectCard;
