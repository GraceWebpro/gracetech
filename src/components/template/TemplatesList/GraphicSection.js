import React from 'react';
import { Link } from 'react-router-dom'; // or next/link if you're using Next.js

const TemplateSection = ({ category }) => {
  const templatesToShow = category.templates.slice(0, 4); // Show only 4

  return (
    <div className="category-section">
      <div className="section-header">
        <h2>{category.name}</h2>
        <Link to={`/templates/${category.slug}`} className="show-all-btn">Show All</Link>
      </div>
      <div className="template-grid">
        {templatesToShow.map((template, idx) => (
          <div className="template-card" key={idx}>
            <div className="card-image">
              <img src={template.image} alt={template.name} />
            </div>
            <div className="card-info">
              <h4>{template.name}</h4>
              <p>{template.count} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AllCategories = ({ categories }) => {
  return (
    <div className="all-categories">
      {categories.map((cat, idx) => (
        <TemplateSection key={idx} category={cat} />
      ))}
    </div>
  );
};

export default AllCategories;
