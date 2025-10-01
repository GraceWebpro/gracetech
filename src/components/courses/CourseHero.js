import React from 'react';
import './Courses.css';

const CourseHero = ({ course }) => {
    if (!course) {
        return <div>Loading course...</div>;
      }
    
  return (
    <div className="course-hero">
      <div className="course-hero-left">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-subtitle">{course.description}</p>

        <div className="course-meta">
          <span>Created by <strong>{course.author.name}</strong></span>
          <span> • Last updated {new Date(course.createdAt?.seconds * 1000).toLocaleDateString()}</span>
          <span> • {course.difficulty} • {course.format}</span>
        </div>

        <div className="course-actions">
          {course.isFree ? (
            <button className="btn btn-primary">Enroll for Free</button>
          ) : (
            <>
              <div className="course-price">₹{course.price}</div>
              <button className="btn btn-primary">Buy Now</button>
              <button className="btn btn-secondary">Add to Cart</button>
            </>
          )}
        </div>
      </div>

      <div className="course-hero-right">
        <img src={course.thumbnailUrl} alt="Course thumbnail" className="course-thumbnail" />
        {course.isFree && course.youtubeUrl && (
          <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer" className="preview-btn">
            ▶ Preview this course
          </a>
        )}
      </div>
    </div>
  );
};

export default CourseHero;
