import React from 'react';
import defaultImg from '../../assets/dummyImg.jpg';
import { GoArrowUpRight } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { BsArrowUpRight } from "react-icons/bs";


const ProjectCard = ({ title, category, imageUrl }) => {
  return (
    <div className='proj-cont'>
      <div className="proj-imgbx project-card" data-aos="zoom-in">
        <img src={imageUrl || defaultImg} alt={title} className="img-fluid" width={350} height={300} />       
        <div className="proj-txtx">
          {/*<h4>{title}</h4>
          <span>{category}</span>*/}
          <FiPlus className='proj-zoom' />

        </div>
      </div>
     
      <div className='proj-bottom'>
        <div className='proj-block'>
          <p>{category}</p>
          <h3>{title}</h3>
         
        </div>
        <div className='icon-div'>
          <BsArrowUpRight className='proj-det-btn' />
        </div>
      </div>
      </div>
      
  );
};

export default ProjectCard;
