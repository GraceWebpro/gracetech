import React, { useRef } from 'react';

const TemplateCarousel = ({ categories }) => {
  const carouselRef = useRef();

  const scroll = (direction) => {
    const { current } = carouselRef;
    const scrollAmount = current.offsetWidth / 1.2; // adjust scroll length

    current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="carousel-wrapper">
      <button className="arrow left" onClick={() => scroll('left')}>&#8249;</button>
      <div className="carousel" ref={carouselRef}>
        {categories.map((cat, idx) => (
          <div className="carousel-card" key={idx}>
            <div className="card-image">
              <img src={cat.image} alt={cat.name} />
            </div>           
            <div className="card-info">

              <h4>{cat.name}</h4>
              <p>{cat.count} items</p>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow right" onClick={() => scroll('right')}>&#8250;</button>
    </div>
  );
};

export default TemplateCarousel;
