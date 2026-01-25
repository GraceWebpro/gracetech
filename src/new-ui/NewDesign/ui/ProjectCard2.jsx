// ProjectCard.jsx
import React from "react";
import { ExternalLink, TrendingUp } from "lucide-react";
import { SiGithub } from "react-icons/si";

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    image,
    technologies = [],
    metrics,
    demoUrl,
    githubUrl,
    categories,
  } = project;

  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-image-overlay"></div>

        <div className="project-buttons">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-button"
              title="View Demo"
            >
              <ExternalLink className="icon" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-button"
              title="View Code"
            >
              {/* You can replace with a GitHub icon if available */}
              <SiGithub className="icon-github" />
            </a>
          )}
        </div>

        <div className="project-category">
          {categories && <span>{categories}</span>}
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>

        {technologies.length > 0 && (
          <div className="project-tech">
            {technologies.map((tech, idx) => (
              <span key={idx} className="project-tech-item">
                {tech}
              </span>
            ))}
          </div>
        )}

        {metrics && (
          <div className="project-metrics">
            <TrendingUp className="icon-metrics" />
            <span>{metrics}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
