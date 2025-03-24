import React from 'react';


const ProjectCard = ({ title, description, imgUrl }) => {
  return (
      <div className="proj-imgbx project-card">
        <img src={imgUrl} alt="Project" className="img-fluid" width={350} height={300} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
  );
};

export default ProjectCard;
