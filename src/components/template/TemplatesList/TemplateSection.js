import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaDownload } from 'react-icons/fa';
import { Link } from "react-router-dom";

const TemplateSection = ({ subCategory }) => {
  const navigate = useNavigate();

  return (
    <div className="template-section">
            <div className="section-header">
                <h2>{subCategory.name} Templates</h2>
                <button onClick={() => navigate(`/templates/${subCategory.slug}`)}>Show All</button>
            </div>
            <div className="template-grid">
                {subCategory.templates.slice(0, 4).map(template => (
                <Link to={`/templates/${template.id}`} key={template.id} className="template-card-link">
                    <div className="template-card">
                    <img src={template.thumbnail} alt={template.name} className='template-image' />
                    <div className="overlay">
                        <h4 className="template-title">{template.name}</h4>
                        <div className="icon-group">
                        <FaHeart className="card-icon" />
                        <FaDownload className="card-icon" />
                        </div>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
    </div>
  );
};

export default TemplateSection;
