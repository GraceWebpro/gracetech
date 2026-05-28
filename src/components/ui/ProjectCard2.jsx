// ProjectCard.jsx
import React from "react";
import { ExternalLink, TrendingUp } from "lucide-react";
import { SiGithub } from "react-icons/si";

const ProjectCard = ({ project, onRequestSimilar }) => {
  const {
    title,
    description,
    image_url,
    technology_stacks = [],
    metrics,
    demo_link,
    github_url,
    categories,
  } = project;

  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={image_url} loading="lazy" alt={title} className="w-full h-auto object-contain object-top transition-transform duration-500 hover:scale-105" />
        <div className="project-image-overlay"></div>

        <div className="project-buttons">
          {demo_link && (
            <a
              href={demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-button"
              title="View Demo"
            >
              <ExternalLink className="icon" />
            </a>
          )}
          {github_url && (
            <a
              href={github_url}
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

        {technology_stacks.length > 0 && (
          <div className="project-tech">
            {technology_stacks.map((tech, idx) => (
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

      {onRequestSimilar && (
  <button
    onClick={() => onRequestSimilar(project)}
    className="block w-fit text-center py-3 px-2 m-5 mt-0 rounded-xl border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition"
    title="Request Similar Project"
  >
    🔁 Request Similar Project
  </button>
)}
    </div>
  );
};

export default ProjectCard;
