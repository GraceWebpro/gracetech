import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../server/firebase'; // your firebase config file
import { collection, query, where, getDocs, getDoc, doc, limit } from 'firebase/firestore';
import './Courses.css';
import defaultThumbnail from '../../assets/fig.jpg'
import CourseHero from './CourseHero';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CourseTabs from './CourseTab';
import SimilarCourses from './SimilarCourses';
import SimilarCoursesCarousel from './SimilarCarousel';
import { Link } from 'react-router-dom'

const CoursePage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const [coupon, setCoupon] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourseAndSimilar = async () => {
      try {
        // 1️⃣ Fetch the course using the slug
        const q = query(collection(db, "courses"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // 2️⃣ Get the first document
          const docSnap = querySnapshot.docs[0];
          const courseData = docSnap.data();
          setCourse(courseData);
  
          // 3️⃣ Fetch similar courses by category
          const similarQuery = query(
            collection(db, "courses"),
            where("category", "==", courseData.category),
            limit(5)
          );
          const similarSnapshot = await getDocs(similarQuery);
  
          const similar = [];
          similarSnapshot.forEach((d) => {
            if (d.id !== docSnap.id) {
              similar.push({ id: d.id, ...d.data() });
            }
          });
  
          setRelatedCourses(similar);
        } else {
          console.log("No course found for this slug");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourseAndSimilar();
  }, [slug]);
  

  const getYoutubeEmbedUrl = (url) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch {
      return '';
    }
  };

  if (loading) return <div className="course-loading">Loading...</div>;
  if (!course) return <div className="course-error">Course not found</div>;


  return (
    <div className="course-page">
      {/* Hero Section */}

    
      <div className="course-hero">

      
        <div className="course-hero-left">
        <p className="course-category-desktop" style={{ fontSize: '12px', color: '#20d9a1', marginTop: '-10px' }}>
          Design <MdOutlineKeyboardArrowRight /> Figma UI UX Design
        </p>

          <h1 className="course-title" style={{ marginTop: '20px'}}>{course.title}</h1>
          <p className="course-subtitle">{course.description}Use Figma to get a job in UI Design, User Interface, User Experience design, UX Design & Web Design</p>
          {/* Rating + Duration */}
          
          <div style={{ fontSize: 13, color: '#ccc', marginBottom: 8 }}>
            ⭐ {course.rating ?? '4.5'} / 5 
          </div>
          <span>By <strong>{course.author?.name || 'Grace Wilson'}</strong></span>
    
                      {/* Price Label */}
                      <div style={{ margin: "10px 0" }}>
                        <span
                          style={{
                            padding: '4px 8px',
                            borderRadius: 4,
                            backgroundColor: course.isFree ? '#d4edda' : '#f8d7da',
                            color: course.isFree ? '#155724' : '#20d9a1',
                            fontSize: 13
                          }}
                        >
                          {course.isFree ? 'Free' : 'Paid'}
                        </span>
                      </div>
                  

          <div className="course-meta">
            <span> • Last updated {new Date(course.createdAt?.seconds * 1000).toLocaleDateString()} English</span>
            <p style={{ fontSize: 13, color: '#ccc', marginBottom: 8 }}>⏱ {course.duration ?? '1h 30m'} • {course.lessons ?? 10} lessons</p>
          </div>

          
        </div>
        <div className="course-hero-right">
       
          <div className="video-thumbnail-container" onClick={() => setShowModal(true)}>
            <img src={course.thumbnailUrl || defaultThumbnail} alt="Course thumbnail" className="course-thumbnail" />
            <div className="play-button">
              <div className="play-icon">▶</div>
            </div>
          </div>

          {/* Actions */}
          <div className="course-actions">
            {course.isFree ? (
              <>
                <Link to='/login'><button className="btn btn-primary">Enroll Now</button></Link>

                {/* <div className="coupon-section">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button className="apply-coupon-button">Apply</button>
                </div> */}

                {/*<button className="subscribe-button">Subscribe</button>*/}
              </>
            ) : (
              <>
                <div className="course-price">₹{course.price}</div>
                <button className="course-btn course-btn-primary">Buy Now</button>
                <button className="course-btn course-btn-secondary">Add to Cart</button>
              </>
            )}
          </div>


          {/* Modal */}
          {showModal && (
          <div className="video-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="video-modal-large" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
              
              <div className="modal-content-container">
                {/* Left: Video */}
                <div className="modal-left" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div className="modal-video-wrapper" style={{ width: "100%", height: "400px" }}>
                    {course.youtubeUrl ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={course.youtubeUrl.includes("embed/")
                          ? course.youtubeUrl
                          : course.youtubeUrl.replace("watch?v=", "embed/")}
                        title="Course Preview"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : course.videoUrl ? (
                      <video
                        width="100%"
                        height="100%"
                        controls
                        autoPlay
                        style={{ borderRadius: "10px" }}
                      >
                        <source src={course.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <p style={{ color: "white" }}>No video available</p>
                    )}
                  </div>

                </div>

                {/* Right: Course Info */}
                <div className="modal-right">
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <p><strong>Instructor:</strong> {course.author?.name || 'Unknown'}</p>
                  <p><strong>Difficulty:</strong> {course.difficulty}</p>
                  <p><strong>Price:</strong> {course.isFree ? 'Free' : `₹${course.price}`}</p>

                  <div className="modal-actions">
                    <button className="enroll-btn">Enroll Now</button>
                    <button className="coupon-btn">Apply Coupon</button>
                    <button className="subscribe-btn">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>

    <CourseTabs />
    <SimilarCourses />

    {/* ✅ Similar courses carousel */}
    {relatedCourses.length > 0 && (
      <SimilarCoursesCarousel courses={relatedCourses} />
    )}

      {/* What you'll learn 
      <div className="course-section">
        <h2>What you'll learn</h2>
        <ul className="section-list">
          <li>Understand core concepts of {course.topic}</li>
          <li>Apply hands-on projects</li>
          <li>Build real-world UI/UX applications</li>
          <li>Gain practical portfolio skills</li>
        </ul>
      </div>

      {/* Curriculum 
      <div className="course-section">
        <h2>Course content</h2>
        <ul className="curriculum-list">
          {course.curriculum?.map((lesson, index) => (
            <li key={index}>
              <strong>Lesson {index + 1}:</strong> {lesson}
            </li>
          )) || <p>No curriculum listed.</p>}
        </ul>
      </div>

      {/* Reviews 
      <div className="course-section">
        <h2>Student Reviews</h2>
        {course.reviews?.length ? (
          course.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <strong>{review.name}</strong>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
       */} 

      {/* Related Courses 
      <div className="course-section">
        <h2>Related Courses</h2>
        <div className="related-courses">
          {relatedCourses.length ? (
            relatedCourses.map((related, index) => (
              <div key={index} className="related-card">
                <h4>{related.title}</h4>
                <p>{related.description}</p>
              </div>
            ))
          ) : (
            <p>No related courses found.</p>
          )}
        </div>
      </div>*/}
    </div>
  );
};

export default CoursePage;
