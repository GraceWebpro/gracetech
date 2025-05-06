import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaDownload } from 'react-icons/fa';
import { Link } from "react-router-dom";

const TemplateSection = ({ subCategory }) => {
  const navigate = useNavigate();

  const handleShowAllClick = () => {
    navigate(`/template-list?category=${subCategory.slug}`);
  };

  return (
    <div className="template-section">
            <div className="section-header">
                <h2>{subCategory.name} Templates</h2>
                <button onClick={handleShowAllClick} className="section-show-all-btn">Show All</button>
            </div>
            <div className="section-template-grid">
                {subCategory.templates.slice(0, 4).map(template => (
                <Link to={`/templates/${template.id}`} key={template.id} className="section-template-card-link">
                    <div className="section-template-card">
                    <img src={template.thumbnail} alt={template.title || "Template thumbnail"} className='section-template-image' />
                    <div className="section-overlay">
                        <h4 className="section-template-title">{template.title}</h4>
                        <div className="section-icon-group">
                        <FaHeart className="section-card-icon" />
                        <FaDownload className="section-card-icon" />
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
