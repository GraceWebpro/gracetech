import React, { useState, useEffect } from 'react';
import { db } from '../../server/firebase'; // your firebase config file
import { collection, query, where, getDocs, orderBy, limit, startAfter } from "firebase/firestore";
import './Courses.css'
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

const PAGE_SIZE = 6;

const topics = [ 'Web Design', 'SEO', 'Development'];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const formats = ['Video', 'Text', 'PDF'];

const Courses = ({ currentUser, purchasedVideos }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterFormat, setFilterFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [modalCourse, setModalCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState({}); // {courseId: true}
  const [selectedTopic, setSelectedTopic] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topicFromURL = searchParams.get("topic");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const [error, setError] = useState(null);

  // Fetch initial page of courses
  useEffect(() => {
    const fetchCourses = async (loadMore = false) => {
        setLoading(true);
        setError(null);
  
      const coursesCollection = collection(db, "courses");
      
      // Build the query
      let q = query(coursesCollection);

        // If one or more categories are selected, filter movies by category
      if (selectedTopic.length > 0) {
        q = query(q, where("title", "array-contains-any", selectedTopic));
      }
  
        try {
          let baseQuery = collection(db, 'courses');
          let q;
    
          
      
          if (selectedTopic.length > 0 && selectedTopic.length <= 10) {
            // Filtered by selected topics
            q = query(
              baseQuery,
              where("topic", "in", selectedTopic),
              orderBy("createdAt", "desc"),
              ...(loadMore && lastVisible ? [startAfter(lastVisible)] : []),
              limit(PAGE_SIZE)
            );
          } else {
            // Show all courses
            q = query(
              baseQuery,
              orderBy("createdAt", "desc"),
              ...(loadMore && lastVisible ? [startAfter(lastVisible)] : []),
              limit(PAGE_SIZE)
            );
          }
      
          const snapshot = await getDocs(q);
          const coursesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
          setCourses(prev => loadMore ? [...prev, ...coursesList] : coursesList);
          setLoading(false);
        } catch (err) {
          console.error("Error loading courses:", err);
          setError("No matching course available");
          setLoading(false);
        }
      };
      
    fetchCourses();
  }, []);

  useEffect(() => {
    // If a category is selected from the URL, update the selectedCategories state
    if (topicFromURL && !selectedTopic.includes(topicFromURL)) {
      setSelectedTopic([topicFromURL]);
    }
  }, [topicFromURL]); // Dependency array added for categoryFromURL

  
  

  // Handle category checkbox change
  const handleCategoryChange = (name) => {
    setSelectedTopic((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  };
  
 
  
  // Filter & search logic
  useEffect(() => {
    let temp = [...courses];

    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      temp = temp.filter(c => c.title.toLowerCase().includes(keyword) || c.description.toLowerCase().includes(keyword));
    }
    if (filterTopic) temp = temp.filter(c => c.topic === filterTopic);
    if (filterDifficulty) temp = temp.filter(c => c.difficulty === filterDifficulty);
    if (filterFormat) temp = temp.filter(c => c.format === filterFormat);

    setFilteredCourses(temp);
  }, [searchKeyword, filterTopic, filterDifficulty, filterFormat, courses]);

  const handleMarkComplete = (courseId) => {
    setCompletedCourses(prev => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  // Check if user has access (free or purchased)
  const userHasAccess = (course) => {
    if (course.isFree) return true;
    if (!currentUser) return false;
    return purchasedVideos.includes(course.id);
  };

  const clearFilters = () => {
  setSelectedTopic([]);
};


  return (
    <div style={{ maxWidth: 1200, margin: '8rem auto', padding: '0 1rem' }}>
    


      <div className="movie-hero-section">
        <div className="movie-hero-content">
          <h1>Discover Courses</h1>
          <p style={{ textAlign: 'center' }}>Browse through the courses. Use filters or sort options to find what you need!</p>
          <h4>
            {selectedTopic.length > 0
            ? `${selectedTopic.join(", ")} Courses`
            : "All Courses"}
          </h4>
        
        </div>
      </div>


      {/* Search and Filters */}
      <div style={{ marginBottom: 20, display: 'block', flexWrap: 'wrap', gap: 10 }}>
        <input 
          type="search" 
          placeholder="Search tutorials..." 
          value={searchKeyword} 
          onChange={e => setSearchKeyword(e.target.value)} 
          style={{ flex: '1 1 200px', padding: '8px' }} 
        />

        <div className="template-actions">
<div style={{ display: 'flex', gap: '20px'}}>
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <button onClick={clearFilters} className="filter-toggle"   disabled={selectedTopic.length === 0}
>
            Clear Filters
            </button>
</div>
            <div className="sort-dropdown">
            <label htmlFor="sort-select">Sort by:</label>
            <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)} style={{ padding: 8 }}>
            <option value="">All Topics</option>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)} style={{ padding: 8 }}>
            <option value="">All Difficulty</option>
            {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={filterFormat} onChange={e => setFilterFormat(e.target.value)} style={{ padding: 8 }}>
            <option value="">All Formats</option>
            {formats.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
        </div>
      </div>

       
      </div>



      <div className={`template-content ${showFilters ? 'with-filters' : 'no-filters'}`}>
      {showFilters && (
        <aside className="filter" style={{ textAlign: 'left' }}>
            <h4 style={{ marginTop: '10px'}}>Categories</h4>
            {topics.map((topic) => (
                <div style={{ display: 'flex', }}>
                    <label key={topic} className="category-item">
                        <input
                        type="checkbox"
                        checked={selectedTopic.includes(topic)}
                        onChange={() => handleCategoryChange(topic)}
                        />
                        <span style={{ marginTop: '-10px' }}>{topic}</span>
                    </label>
            </div>
            ))}
        </aside>
        )}

        <div className="movie-grid" style={{ marginTop: '10px', padding: '15px'}}>
                {loading ? (
                <p>Loading...</p>
                ) : error ? (
                <p>{error}</p>
                ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                    <div key={course.id} style={{ border: '1px solid #ccc', borderRadius: 6, overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <img 
                    src={course.thumbnailUrl} 
                    alt={`${course.title} thumbnail`} 
                    style={{ width: '100%', height: 160, objectFit: 'cover' }} 
                    />
                    <div style={{ padding: 12 }}>
                    <h3>{course.title}</h3>
                    <p style={{ fontSize: 14, color: '#666' }}>{course.description.substring(0, 80)}...</p>
                    <p><b>Topic:</b> {course.topic} | <b>Difficulty:</b> {course.difficulty}</p>
                    <p><b>Format:</b> {course.format} | {course.isFree ? <span style={{ color: 'green' }}>Free</span> : <span style={{ color: 'red' }}>Paid</span>}</p>

                    {/* Author Info */}
                    {course.author && (
                        <div style={{ marginTop: 10, fontSize: 12, color: '#555' }}>
                        <img src={course.author.avatarUrl} alt={course.author.name} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 6, verticalAlign: 'middle' }} />
                        <span>{course.author.name} - {course.author.bio}</span>
                        </div>
                    )}

                    {/* Access control and video modal trigger */}
                    <button
                            onClick={() => {
                                if (course.isFree) {
                                setModalCourse(course);
                                } else if (!currentUser) {
                                alert('Please log in to watch this tutorial.');
                                // You can redirect to login page if needed
                                // navigate('/login');
                                } else if (userHasAccess(course)) {
                                setModalCourse(course);
                                } else {
                                alert('Please purchase this tutorial to watch.');
                                }
                            }}
                            style={{
                                marginTop: 10,
                                padding: '8px 12px',
                                cursor: course.isFree || (currentUser && userHasAccess(course)) ? 'pointer' : 'not-allowed',
                                backgroundColor: course.isFree || (currentUser && userHasAccess(course)) ? '#007bff' : '#ccc',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4
                            }}
                            >
                            {course.isFree || (currentUser && userHasAccess(course)) ? 'Watch Tutorial' : 'Buy to Watch'}
                            </button>


                    {/* Mark completed */}
                    {currentUser && (
                        <div style={{ marginTop: 10 }}>
                        <label>
                            <input 
                            type="checkbox" 
                            checked={!!completedCourses[course.id]} 
                            onChange={() => handleMarkComplete(course.id)} 
                            /> Mark as completed
                        </label>
                        </div>
                    )}
                    </div>
                </div>
                    
                ))
                ) : (
                <p>No courses found.</p>
                )}
        </div>


      </div>
      

      {/* Tutorials List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
        {filteredCourses.length === 0 && <p>No tutorials found.</p>}

        {filteredCourses.map(course => (
          <div key={course.id} style={{ border: '1px solid #ccc', borderRadius: 6, overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <img 
              src={course.thumbnailUrl} 
              alt={`${course.title} thumbnail`} 
              style={{ width: '100%', height: 160, objectFit: 'cover' }} 
            />
            <div style={{ padding: 12 }}>
              <h3>{course.title}</h3>
              <p style={{ fontSize: 14, color: '#666' }}>{course.description.substring(0, 80)}...</p>
              <p><b>Topic:</b> {course.topic} | <b>Difficulty:</b> {course.difficulty}</p>
              <p><b>Format:</b> {course.format} | {course.isFree ? <span style={{ color: 'green' }}>Free</span> : <span style={{ color: 'red' }}>Paid</span>}</p>

              {/* Author Info */}
              {course.author && (
                <div style={{ marginTop: 10, fontSize: 12, color: '#555' }}>
                  <img src={course.author.avatarUrl} alt={course.author.name} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 6, verticalAlign: 'middle' }} />
                  <span>{course.author.name} - {course.author.bio}</span>
                </div>
              )}

              {/* Access control and video modal trigger */}
              <button
                    onClick={() => {
                        if (course.isFree) {
                        setModalCourse(course);
                        } else if (!currentUser) {
                        alert('Please log in to watch this tutorial.');
                        // You can redirect to login page if needed
                        // navigate('/login');
                        } else if (userHasAccess(course)) {
                        setModalCourse(course);
                        } else {
                        alert('Please purchase this tutorial to watch.');
                        }
                    }}
                    style={{
                        marginTop: 10,
                        padding: '8px 12px',
                        cursor: course.isFree || (currentUser && userHasAccess(course)) ? 'pointer' : 'not-allowed',
                        backgroundColor: course.isFree || (currentUser && userHasAccess(course)) ? '#007bff' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4
                    }}
                    >
                    {course.isFree || (currentUser && userHasAccess(course)) ? 'Watch Tutorial' : 'Buy to Watch'}
                    </button>


              {/* Mark completed */}
              {currentUser && (
                <div style={{ marginTop: 10 }}>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={!!completedCourses[course.id]} 
                      onChange={() => handleMarkComplete(course.id)} 
                    /> Mark as completed
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}
      </div> 

      {/* Load More */}
      {lastVisible && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button disabled={loading}>
            {loading ? 'Loading...' : 'Load More Tutorials'}
          </button>
        </div>
      )}

      {/* Video Modal */}
      {modalCourse && (
        <div 
          onClick={() => setModalCourse(null)} 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div 
            onClick={e => e.stopPropagation()} 
            style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, maxWidth: '90vw', maxHeight: '80vh', width: 720, overflowY: 'auto' }}
          >
            <h2>{modalCourse.title}</h2>
            <p>{modalCourse.description}</p>

            {/* Video Player */}
            {modalCourse.isFree && modalCourse.youtubeUrl ? (
              <iframe
                width="100%"
                height="360"
                src={modalCourse.youtubeUrl.replace('watch?v=', 'embed/')}
                title={modalCourse.title}
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <video
                width="100%"
                height="360"
                controls
                src={modalCourse.videoUrl}
              />
            )}

            {/* Call to Action */}
            <div style={{ marginTop: 15 }}>
              <p>Need help implementing this? <a href="/contact">Contact us.</a></p>
              <p><a href="/subscribe">Subscribe for more tutorials.</a></p>
              {modalCourse.format === 'PDF' && (
                <p><a href={modalCourse.downloadUrl} download>Download full PDF version</a></p>
              )}
            </div>

            {/* Close Button */}
            <button onClick={() => setModalCourse(null)} style={{ marginTop: 10, padding: '6px 12px' }}>Close</button>
          </div>
        </div>
      )}

      {/* Comments / Q&A Section Placeholder */}
      <div style={{ marginTop: 40 }}>
        <h3>Comments / Questions</h3>
        <p>(This feature to be implemented)</p>
      </div>

    </div>
  );
};

export default Courses;
