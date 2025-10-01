import React, { useRef } from 'react';
import './Courses.css'; // You can create/rename CSS accordingly

const SimilarCoursesCarousel = ({ courses }) => {
  const carouselRef = useRef();

  const scroll = (direction) => {
    const { current } = carouselRef;
    const scrollAmount = current.offsetWidth / 1.2;

    current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-title">Similar Courses</h2>
      <button className="arrow left" onClick={() => scroll('left')}>&#8249;</button>
      <div className="carousel" ref={carouselRef}>
        {courses.map((course, idx) => (
          <div className="carousel-card" key={idx}>
            <div className="card-image">
              <img src={course.image} alt={course.title} />
            </div>
            <div className="card-info">
              <h4>{course.title}</h4>
              <p>{course.instructor}</p>
              <span>{course.duration}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow right" onClick={() => scroll('right')}>&#8250;</button>
    </div>
  );
};

export default SimilarCoursesCarousel;
