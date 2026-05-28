import React from "react";
import { ExternalLink, TrendingUp } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    image_url,
    technology_stacks = [],
    metrics,
    demo_link,
    github_url,
    category,
    slug,
  } = project;

  return (
    <div className="group project-card">

      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={image_url}
          loading="lazy"
          alt={title}
          className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* ACTION BUTTONS */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">

          {demo_link && (
            <a
              href={demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-3 rounded-full hover:scale-110 transition"
              title="View Live"
            >
              <ExternalLink size={18} />
            </a>
          )}

          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-3 rounded-full hover:scale-110 transition"
              title="View Code"
            >
              <SiGithub size={18} />
            </a>
          )}
        </div>

        {/* CATEGORY BADGE */}
        {category && (
          <span className="absolute top-3 left-3 text-xs bg-black/70 backdrop-blur px-3 py-1 rounded-full text-white">
            {category}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-4 space-y-3">

        {/* TITLE (Clickable for future details page) */}
        {slug ? (
          <Link
            to={`/projects/${slug}`}
            className="block text-lg font-semibold text-white hover:text-primary transition"
          >
            {title}
          </Link>
        ) : (
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
        )}

        {/* OPTIONAL SHORT DESC (avoid repetition) */}
        {description && (
          <p className="text-sm text-white/60 line-clamp-2">
            {description}
          </p>
        )}

        {/* TECH STACK */}
        {technology_stacks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technology_stacks.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-xs bg-white/10 px-2 py-1 rounded-md text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* METRICS */}
        {metrics && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <TrendingUp size={16} />
            <span>{metrics}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;