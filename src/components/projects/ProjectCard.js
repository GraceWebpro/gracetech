import React from 'react';
import { Col } from 'react-bootstrap';

const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
      <div className="proj-imgbx">
        <img src={imgUrl} alt="Project" className="img-fluid" width={300} height={300} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;
