import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateCarousel.css'; // assume CSS for slicker styling

const TemplateCarousel = ({ categories }) => {
  const carouselRef = useRef();
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (!current) return;
    const scrollAmount = current.offsetWidth / 1.2;

    current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (cat) => {
    // Clean category name for URL slug
    const categorySlug = cat.name
      .toLowerCase()
      .replace(/\s+/g, '')               // remove all spaces
      .replace(/ddc$/i, '')              // remove trailing "ddc"
      .replace(/[^a-z0-9]/g, '');        // remove non-alphanumeric

    navigate(`/template-list?category=${categorySlug}`);
  };

  const cleanCategoryName = (name) => {
    return name.replace(/ddc$/i, '');     // remove trailing "ddc" for display
  };

  return (
    <div className="carousel-wrapper">
      <button className="arrow left" onClick={() => scroll('left')}>&#8249;</button>

      <div className="carousel" ref={carouselRef}>
        {categories.map((cat, idx) => (
          <div
            className="carousel-card"
            key={idx}
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="card-image">
              <img src={cat.image} alt={cleanCategoryName(cat.name)} />
            </div>
            <div className="card-info">
              <h4>{cleanCategoryName(cat.name)}</h4>
            </div>
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={() => scroll('right')}>&#8250;</button>
    </div>
  );
};

export default TemplateCarousel;
