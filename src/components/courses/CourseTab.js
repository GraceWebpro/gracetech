import React, { useState, useEffect } from 'react';
import './Courses.css'; // Make sure styles exist
import { db } from '../../server/firebase'; // update with your firebase config path
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const CourseTabs = () => {
  const { id: courseId } = useParams();
  const [activeTab, setActiveTab] = useState('learn');
  const [openSection, setOpenSection] = useState('FAQ'); // First section open by default
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: '', text: '' });
  const [courses, setCourses] = useState([]);

  const courseOutline = [
    {
      title: "FAQ",
      topics: [
        { name: "Will I get a certificate?", duration: "10 min" },
        { name: "Is this course beginner-friendly?", duration: "8 min" },
        { name: "Prototyping", duration: "12 min" },
      ],
    },
    {
      title: "Introduction to UI/UX",
      topics: [
        { name: "What is UI/UX?", duration: "5 min" },
        { name: "UI vs UX", duration: "7 min" },
      ],
    },
    {
      title: "Design Process",
      topics: [
        { name: "User Research", duration: "10 min" },
        { name: "Wireframing", duration: "8 min" },
        { name: "Prototyping", duration: "12 min" },
      ],
    },
  ];

  const toggleSection = (title) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'courses', courseId, 'reviews'),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map(doc => doc.data());
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.text) return;

    const reviewToAdd = {
      ...newReview,
      rating: parseInt(newReview.rating),
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'courses', courseId, 'reviews'), reviewToAdd);
      setReviews(prev => [reviewToAdd, ...prev]); // Optimistic UI update
      setNewReview({ name: '', rating: '', text: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCourses(courseList);
    };
    fetchCourses();
  }, []);

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tabs-nav">
        <button onClick={() => setActiveTab('learn')} className={activeTab === 'learn' ? 'active' : ''}>
          What You'll Learn
        </button>
        <button onClick={() => setActiveTab('content')} className={activeTab === 'content' ? 'active' : ''}>
          Course Content
        </button>
        <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* What You'll Learn */}
        {activeTab === 'learn' && (
          <ul className="learn-list">
            <li><i className="feature-icon">✔</i> Design beautiful UI with Figma</li>
            <li><i className="feature-icon">✔</i> Understand the core principles of UX</li>
            <li><i className="feature-icon">✔</i> Create interactive prototypes</li>
            <li><i className="feature-icon">✔</i> Work with client-based UX projects</li>
            <li><i className="feature-icon">✔</i> Conduct effective user research</li>
            <li><i className="feature-icon">✔</i> Build wireframes from scratch</li>
          </ul>
        )}

        {/* Course Content */}
        {activeTab === 'content' && (
          <div className="content-details">
            <h3>Requirements</h3>
            <ul>
              <li><i className="feature-icon">✔</i> No previous design experience needed</li>
              <li><i className="feature-icon">✔</i> Internet connection</li>
              <li><i className="feature-icon">✔</i> A computer (Mac or PC)</li>
              <li><i className="feature-icon">✔</i> Free Figma account</li>
            </ul>

            <h3>Description</h3>
            <p>This course will walk you through the entire UX/UI design process, from idea to prototype. Perfect for beginners who want to break into the design world.</p>

            <h3>Who this course is for</h3>
            <ul>
              <li><i className="feature-icon">✔</i> Beginners who want to start a career in UI/UX</li>
              <li><i className="feature-icon">✔</i> Freelancers looking to expand their design skills</li>
              <li><i className="feature-icon">✔</i> Product managers and developers wanting to learn design thinking</li>
            </ul>

            <h3>Course Content</h3>
            {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          {course.sections.map((section, index) => (
            <div key={index}>
              <h4>{section.title}</h4>
              <ul>
                {section.lessons.map((lesson, i) => (
                  <li key={i}>
                    {lesson.title} – {lesson.duration}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
            {courseOutline.map((section, i) => (
              <div key={i} className="course-section">
                <div
                  className={`section-header ${openSection === section.title ? 'open' : ''}`}
                  onClick={() => toggleSection(section.title)}
                >
                  {section.title}
                </div>
                {openSection === section.title && (
                  <div className="section-body">
                    <table className="timeline-table">
                      <thead>
                        <tr>
                          <th>Topic</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.topics.map((topic, j) => (
                          <tr key={j}>
                            <td>{topic.name}</td>
                            <td>{topic.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <div className="review-card">
              <strong>Jane Doe</strong>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Great course! Clear explanations and practical examples.</p>
            </div>
            <div className="review-card">
              <strong>John Smith</strong>
              <p>⭐⭐⭐⭐</p>
              <p>Very helpful and beginner-friendly. Some topics could go deeper.</p>
            </div>

            <h3>What Others Say</h3>
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <strong>{review.name}</strong>
                <p>{"⭐".repeat(review.rating)}</p>
                <p>{review.text}</p>
              </div>
            ))}


            <h3>Leave a Review</h3>
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <input
                type="text"
                placeholder="Your name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                required
              >
                <option value="">Rate the course</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>
              <textarea
                placeholder="Write your review..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                required
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTabs;
