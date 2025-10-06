import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateCarousel = ({ categories }) => {
  const carouselRef = useRef();
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = carouselRef;
    const scrollAmount = current.offsetWidth / 1.2;

    current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (cat) => {
    // Create clean lowercase slug
    const categorySlug = cat.name
      .toLowerCase()
      .replace(/\s+/g, '')              // remove all spaces
      .replace(/templatesddc?$/i, '')      // remove "template" or "templates" from end
      .replace(/[^a-z0-9]/g, '');       // remove any non-alphanumeric characters

    // Navigate cleanly
    navigate(`/template-list?category=${categorySlug}`);
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
            style={{ cursor: 'pointer' }}
          >
            <div className="card-image">
              <img src={cat.image} alt={cat.name} />
            </div>
            <div className="card-info">
              <h4>{cat.name}</h4>
              {cat.count !== undefined && <p>{cat.count} Templates</p>}
            </div>
          </div>
        ))}
      </div>
      <button className="arrow right" onClick={() => scroll('right')}>&#8250;</button>
    </div>
  );
};

export default TemplateCarousel;
