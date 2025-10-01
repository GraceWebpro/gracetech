import React, { useRef } from 'react';
import './Courses.css';

const SimilarCourses = () => {
  const scrollRef = useRef(null);

  const courses = [
    { title: 'Advanced UX Design', instructor: 'Jane Smith', duration: '5h', image: 'https://via.placeholder.com/200x120' },
    { title: 'Intro to Figma', instructor: 'John Doe', duration: '3h', image: 'https://via.placeholder.com/200x120' },
    { title: 'Web Design Essentials', instructor: 'Alice Kim', duration: '4h', image: 'https://via.placeholder.com/200x120' },
    { title: 'Design Thinking', instructor: 'Robert Lee', duration: '6h', image: 'https://via.placeholder.com/200x120' },
    { title: 'UI for Mobile', instructor: 'Maria Perez', duration: '2.5h', image: 'https://via.placeholder.com/200x120' },
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div className="similar-courses-wrapper">
      <h2>Similar Courses</h2>
      <div className="carousel-container">
        <button className="scroll-btn left" onClick={scrollLeft}>←</button>
        <div className="course-carousel" ref={scrollRef}>
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <img src={course.image} alt={course.title} />
              <h4>{course.title}</h4>
              <p>{course.instructor}</p>
              <span>{course.duration}</span>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
};

export default SimilarCourses;
