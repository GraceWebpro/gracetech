import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Search icon
import { useEffect } from 'react';

// Mock data for templates (replace with Firestore fetch)
const templates = [
  { id: 1, type: 'HTML', name: 'Basic HTML Template' },
  { id: 2, type: 'Bubble', name: 'Bubble Web Template' },
  { id: 3, type: 'Figma', name: 'Figma Design Template' },
  // Add more templates here
];

const TemplateSearchSlider = () => {
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = templates.filter((template) => template.type === category);
      setFilteredTemplates(filtered);
    } else {
      setFilteredTemplates(templates); // Reset if no category is selected
    }
  };

  useEffect(() => {
    // Fetch templates from Firestore here
    // Example: firestore.collection("templates").get().then(...)
  }, []);

  return (
    <div className="template-search-slider">
      <div className="search-options-wrapper">

      <div className="search-options">
        <div onClick={() => handleCategoryChange('HTML')} className={`search-option ${selectedCategory === 'HTML' ? 'active' : ''}`}>
          {/* <FaSearch />  */}HTML Template
        </div>
        <div onClick={() => handleCategoryChange('Bubble')} className={`search-option ${selectedCategory === 'Bubble' ? 'active' : ''}`}>
           Bubble Template
        </div>
        <div onClick={() => handleCategoryChange('Figma')} className={`search-option ${selectedCategory === 'Figma' ? 'active' : ''}`}>
          Figma Template
        </div>
        <div onClick={() => handleCategoryChange('HTML')} className={`search-option ${selectedCategory === 'HTML' ? 'active' : ''}`}>
          React Template
        </div>
        <div onClick={() => handleCategoryChange('Bubble')} className={`search-option ${selectedCategory === 'Bubble' ? 'active' : ''}`}>
           Graphic Template
        </div>
        <div onClick={() => handleCategoryChange('Figma')} className={`search-option ${selectedCategory === 'Figma' ? 'active' : ''}`}>
          Bootstrap Template
        </div>
        <div onClick={() => handleCategoryChange('HTML')} className={`search-option ${selectedCategory === 'HTML' ? 'active' : ''}`}>
        HTML Template
        </div>
        <div onClick={() => handleCategoryChange('Bubble')} className={`search-option ${selectedCategory === 'Bubble' ? 'active' : ''}`}>
          Bubble Template
        </div>
        <div onClick={() => handleCategoryChange('Figma')} className={`search-option ${selectedCategory === 'Figma' ? 'active' : ''}`}>
           Figma Template
        </div>
      </div>
      </div>

      {/*<div className="template-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {filteredTemplates.map((template) => (
          <div key={template.id} className="template-item">
            <h4>{template.name}</h4>
          </div>
        ))}
        </div>&*/}
    </div>
  );
};

export default TemplateSearchSlider;
