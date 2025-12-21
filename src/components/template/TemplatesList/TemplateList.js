import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { db } from '../../../server/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Template.css';
import { FaFilter,FaEyeSlash, FaSort, FaEye, FaClock, FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaDownload } from 'react-icons/fa';
import { Link } from "react-router-dom";

const TemplateList = () => {
  const { slug } = useParams(); // Capture slug from URL like /template-list/graphic
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortOption, setSortOption] = useState('relevant');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'templates'));
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTemplates(fetched);

        const categories = [...new Set(fetched.map(t => t.subCategory?.toLowerCase() || 'other'))];
        setAllCategories(categories);

        // Automatically add slug category as filter
        if (slug && categories.includes(slug.toLowerCase())) {
          const updatedParams = new URLSearchParams(searchParams.toString());
          if (!updatedParams.getAll('category').includes(slug.toLowerCase())) {
            updatedParams.append('category', slug.toLowerCase());
            setSearchParams(updatedParams);
          }
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, [slug]);

  useEffect(() => {
    const selected = searchParams.getAll('category');
    let result = [...templates];

    if (selected.length > 0) {
      result = result.filter(t =>
        selected.includes(t.subCategory?.toLowerCase() || 'other')
      );
    }

    if (sortOption === 'popular') {
      result.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    } else if (sortOption === 'new') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      result.sort((a, b) => a.name?.localeCompare(b.name));
    }

    setFilteredTemplates(result);
  }, [templates, searchParams, sortOption]);

  const handleCheckboxChange = (category) => {
    const currentParams = new URLSearchParams(searchParams);
    const selected = currentParams.getAll('category');

    if (selected.includes(category)) {
      const updated = selected.filter(cat => cat !== category);
      currentParams.delete('category');
      updated.forEach(cat => currentParams.append('category', cat));
    } else {
      currentParams.append('category', category);
    }

    setSearchParams(currentParams);
  };

  return (
    <div className="template-list-container">
      <div className="temp-bann">
        <h1><span>Templates</span> List</h1>
        <p style={{ color: "#ccc"}}>Browse through the templates. Use filters or sort options to find what you need!</p>
      </div>

      <div className="template-actions">
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <FaEyeSlash /> : <FaEye />} {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="sort-dropdown">
          <label htmlFor="sort-select">
          Sort by:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Relevant</option>
            <option value="popular">Popular</option>
            <option value="new">New</option>
          </select>
        </div>
      </div>



      <div className={`template-content ${showFilters ? 'with-filters' : 'no-filters'}`}>
      {showFilters && (
        <aside className="filters">
          <h3>Categories</h3>
          {allCategories.map(category => {
            const categoryTemplateCount = templates.filter(
              template => template.subCategory?.toLowerCase() === category
            ).length;

            return (
              <label key={category} className="category-item">
                <span className="category-info">
                  <input
                    type="checkbox"
                    checked={searchParams.getAll('category').includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                  />
                  <span className="category-name">{category}</span>
                </span>
                <span className="category-count">({categoryTemplateCount})</span>

              </label>
            );
          })}
        </aside>
      )}



<div className="section-template-grid">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <Link to={`/templates/${template.id}`} key={template.id} className="section-template-card-link">
                <div className="section-template-card">
                    <img src={template.thumbnail} alt={template.title || "Template thumbnail"} className='section-template-image' />
                    <div className="section-overlay">
                        <h4 className="section-template-title">{template.name}</h4>
                        <div className="section-icon-group">
                        <FaHeart className="section-card-icon" />
                        <FaDownload className="section-card-icon" />
                        </div>
                    </div>
                  </div>

                {/* <img src={template.thumbnail} alt={template.name} />
                <h4>{template.name}</h4>
                <p>{template.subCategory}</p> */}
              </Link>
            ))
          ) : (
            <div className="empty-state">
              <img 
                src="/no-templates.svg" 
                alt="No templates" 
                className="empty-state-img"
              />

              <h2>No Templates Available</h2>

              <p>
                We couldn’t find any templates for this category yet.
                Try selecting another category or check back later.
              </p>

              <button 
                className="empty-btn" 
                onClick={() => window.location.href = '/templates'}
              >
                Browse All Templates
              </button>
            </div>

          )}
        </div> 
     
      </div>
    </div>
  );
};

export default TemplateList;
