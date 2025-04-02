import React from 'react';
import defaultImg from '../../assets/dummyImg.jpg';


const ProjectCard = ({ title, category, imageUrl }) => {
  return (
      <div className="proj-imgbx project-card" data-aos="zoom-in">
        <img src={imageUrl || defaultImg} alt={title} className="img-fluid" width={350} height={300} />        <div className="proj-txtx">
        <h4>{title}</h4>
        <span>{category}</span>
        </div>
      </div>
  );
};

export default ProjectCard;
