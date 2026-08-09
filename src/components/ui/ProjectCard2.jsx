// ProjectCard.jsx
import React from "react";
import { ExternalLink, TrendingUp, Play, Repeat } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PROJECT_TYPES } from "../../config/projectConfig";

const ProjectCard = ({ project, onRequestSimilar, onPlay }) => {
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

  const normalizedCategory = project.categories?.toLowerCase().trim();

const config = PROJECT_TYPES[normalizedCategory] || {
  label: "Other",
  showPlay: false,
};

const Icon = config.icon;

const message = `Hi, I'm interested in your AI video service for "${title}". Can you share pricing and timeline?`;

const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;

  return (
    <div className="project-card">
      <div className="project-image relative group">
        <img src={image_url} alt={title} className="w-full h-full object-cover" />

        {/* PLAY BUTTON (only for videos) */}
        {config.showPlay && (
          <div
          onClick={() => onPlay(demo_link)}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer"
          >
            <div className="bg-white/90 p-4 rounded-full">
              <Play className="w-6 h-6 text-black" />
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="project-buttons">
          {/* ONLY show ExternalLink for websites */}
          {!config.showPlay && demo_link && (
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

          {/* GitHub stays same */}
          {github_url && categories === "website" && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-button"
              title="View Code"
            >
              <SiGithub className="icon-github" />
            </a>
          )}
        </div>

        <div className="project-category">
          <span className="flex items-center gap-1">
            <Icon className="w-4 h-4" />
            {config.label}
          </span>
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

      {config.showPlay && (
        <div className="mx-5 mb-4 text-sm text-gray-400">
          Starting from <span className="text-green-400 font-semibold">$25</span>
        </div>
      )}

     {/* ACTION BUTTONS */}
      <div className="flex gap-2 m-5 mt-0">
        {config.showPlay ? (
          <>
            {/* CONTACT */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 inline-flex items-center justify-center gap-3 px-3 py-2 text-sm rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <span className="w-4 h-4 opacity-70 group-hover:opacity-100 transition">💬</span>
              Contact Me
            </a>

            {/* FIVERR */}
            <a
              href="https://www.fiverr.com/olajidegrace/create-realistic-ai-video-using-runwayml-kling-leonardo-ai-vo3"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5">🛒</span>
              Order on Fiverr
            </a>
          </>
        ) : (
          onRequestSimilar && (
            <button
  onClick={() => onRequestSimilar(project)}
  className="group inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-md"
>
  <span className="transition-transform duration-200 group-hover:rotate-180">
  <Repeat className="w-4 h-4 transition-transform group-hover:rotate-180" />
  </span>
  <span>Request Similar</span>
</button>


          )
        )}
      </div>

    </div>
  );
};

export default ProjectCard;
