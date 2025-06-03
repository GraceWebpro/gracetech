import React, { useState } from 'react';

const ProjectCard2 = ({ category, imageUrl, title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleProjectDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`project-card2 ${isExpanded ? 'expanded' : ''}`} style={{ border: '2px solid blue', width: '100%' }}>
      <div className="image-container">
        <img src={imageUrl} alt="Project" />
        <div className="plus-icon">
          <i className="fa fa-plus"></i>
        </div>
      </div>
      <div className="project-details2">
        <h3>{title}</h3>
        <p>{category}</p>
      
        <div
          className={`arrow-icon ${isExpanded ? 'open' : ''}`}
          onClick={toggleProjectDetails}
        >
          <i className="fa fa-arrow-down"></i>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard2;
