import React, { useState, useEffect } from 'react';
import { db } from '../../server/firebase'; // your firebase config file
import { collection, query, where, getDocs, orderBy, limit, startAfter } from "firebase/firestore";
import './Courses.css'
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const PAGE_SIZE = 6;

const categories = ["Figma", "Bubble", "HTML", "CSS", "FlutterFlow", "React"];

const topics = [ 'Web Design', 'SEO', 'Development'];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const formats = ['Video', 'Text', 'PDF'];

const Courses = ({ currentUser, purchasedVideos }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterFormat, setFilterFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [modalCourse, setModalCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState({}); // {courseId: true}
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const topicFromURL = searchParams.get("categories");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
const [noMatchingCourseFound, setNoMatchingCourseFound] = useState(false);



  // Fetch initial page of courses
  // const fetchCourses = async (loadMore = false) => {
  //   setLoading(true);
  //   setError(null);
  
  
  //   try {
  //     let baseQuery = collection(db, 'courses');
  //     let q;

  //     if (selectedCategory.length > 0 && selectedCategory.length <= 10) {
  //       q = query(
  //         baseQuery,
  //         where("category", "in", selectedCategory.map(cat => cat.toLowerCase())),
  //         orderBy("createdAt", "desc"),
  //         ...(loadMore && lastVisible ? [startAfter(lastVisible)] : []),
  //         limit(PAGE_SIZE)
  //       );
  //     } else {
  //       q = query(
  //         baseQuery,
  //         orderBy("createdAt", "desc"),
  //         ...(loadMore && lastVisible ? [startAfter(lastVisible)] : []),
  //         limit(PAGE_SIZE)
  //       );
  //     }
  
  //     const snapshot = await getDocs(q);
  //     const coursesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  //     setCourses(prev => loadMore ? [...prev, ...coursesList] : coursesList);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error("Error loading courses:", err);
  //     setError("No matching course found.");
  //     setLoading(false);
  //   }
  // };

  const fetchCourses = async (loadMore = false) => {
    try {
      setLoading(true);
  
      let q = query(
        collection(db, "courses"),
        orderBy("createdAt", "desc"),
        ...(loadMore && lastVisible ? [startAfter(lastVisible)] : []),
        limit(PAGE_SIZE)
      );
  
      const snapshot = await getDocs(q);
  
      let fetchedCourses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // 🔹 Filter client-side (case-insensitive)
      if (selectedCategory && selectedCategory.length > 0) {
        fetchedCourses = fetchedCourses.filter(course =>
          selectedCategory.some(cat =>
            (course.category || "").toLowerCase().includes(cat.toLowerCase())
          )
        );
      }
  
      if (fetchedCourses.length === 0) {
        setCourses([]);
        setHasMore(false);
        setNoMatchingCourseFound(true);
      } else {
        setNoMatchingCourseFound(false);
        setCourses(loadMore ? [...courses, ...fetchedCourses] : fetchedCourses);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === PAGE_SIZE);
      }
  
    } catch (error) {
      console.error("Error fetching courses:", error);
      setNoMatchingCourseFound(true);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchCourses();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const snapshot = await getDocs(collection(db, 'courses'));
      setTotalCourses(snapshot.size);
    };
  
    fetchTotalCount();
  }, []);

  const fetchMoreCourses = () => fetchCourses(true);

   // Filter + Sort + search logic
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


  useEffect(() => {
    if (topicFromURL && !selectedCategory.includes(topicFromURL)) {
      setSelectedCategory([topicFromURL]);
    }
  }, [topicFromURL]);
  
  
  

  // Handle category checkbox change
  const handleCategoryChange = (name) => {
    const lower = name.toLowerCase();
    setSelectedCategory((prev) =>
      prev.includes(lower)
        ? prev.filter((t) => t !== lower)
        : [...prev, lower]
    );
  };
  
  
 
  
 
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
  setSelectedCategory([]);
};


  return (
    <div style={{ maxWidth: 1200, margin: '6rem auto', padding: '0 1rem' }}>
      <Helmet>
        <title>Courses — Learn with GraceTech</title>
        <meta
          name="description"
          content="Take online courses in UI/UX design and React web development with GraceTech."
        />
        <link rel="canonical" href="https://gracetech.vercel.app/courses" />
      </Helmet>

      {/*  hero section */}
      <div className="movie-hero-section">
        <div className="movie-hero-content">
          <h1>Discover Courses</h1>
          <p style={{ textAlign: 'center' }}>Browse, filter, sort your favorite tutorials easily!</p>
          <h4>
            {selectedCategory.length > 0
            ? `${selectedCategory.join(", ")} Courses`
            : "All Courses"}
          </h4>
        
        </div>
      </div>


      {/* Search, sort and Filters */}
      <div style={{ marginBottom: 20, display: 'block', flexWrap: 'wrap', gap: 10 }}>
        <input 
          type="search" 
          placeholder="Search tutorials..." 
          value={searchKeyword} 
          onChange={e => setSearchKeyword(e.target.value)} 
          style={{
            width: "100%",
            maxWidth: 400,
            height: "45px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
          }}
        />

        {/* filter & sort */}
        <div className="template-actions">
          <div style={{ display: 'flex', gap: '20px'}}> 
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <button onClick={clearFilters} className="filter-toggle"   disabled={selectedCategory.length === 0}
            >
            Clear Filters
            </button>
          </div>
          <div className="sort-dropdown">
            <label htmlFor="sort-select" style={{ color: "#ddd" }}>Sort by:</label>
            <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)}   style={{
              padding: "8px",
              background: "#111",
              color: "#fff",
              borderRadius: "4px",
              border: "1px solid #333",
              marginLeft: "8px",
            }}>
            <option value="">All Topics</option>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}   style={{
              padding: "8px",
              background: "#111",
              color: "#fff",
              borderRadius: "4px",
              border: "1px solid #333",
              marginLeft: "8px",
            }}>
            <option value="">All Difficulty</option>
            {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={filterFormat} onChange={e => setFilterFormat(e.target.value)}   style={{
              padding: "8px",
              background: "#111",
              color: "#fff",
              borderRadius: "4px",
              border: "1px solid #333",
              marginLeft: "8px",
            }}>
            <option value="">All Formats</option>
            {formats.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div> 
      </div>


      {/* Main Layout */}
      <div className={`template-content ${showFilters ? 'with-filters' : 'no-filters'}`}>
      
      {/* Sidebar Categories */}
      {showFilters && (
        <aside className="filter" style={{ textAlign: 'left' }}>
            <h4 style={{ marginTop: '10px'}}>Categories</h4>
            {categories.map((cat) => (
                <div style={{ display: 'flex', }}>
                    <label key={cat} className="category-item" style={{
                      cursor: "pointer",
                    }}>
                        <input
                        type="checkbox"
                        name="category"
                        checked={selectedCategory.includes(cat.toLowerCase())}
                        onChange={() => handleCategoryChange(cat)}
                        />
                        <span style={{ marginTop: '-10px' }}>{cat}</span>
                    </label>
            </div>
            ))}
        </aside>
        )}




        <div className="section-template-grid" style={{ marginTop: '10px', padding: '15px'}}>
                {loading ? (
                <p>Loading...</p>
                ) : error ? (
                <p>{error}</p>
                ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <div
                  key={course.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                    maxWidth: 320,
                    background: 'linear-gradient(135deg, #1c1c1c, #333)',
                    margin: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left'
                  }}
                >
                  {/* Thumbnail */}
                  <img
                    src={course.thumbnailUrl}
                    alt={`${course.title} thumbnail`}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }}
                  />
                
                  <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Title */}
                    <h3 style={{ fontSize: 18, margin: '0 0 8px 0', color: '#fff' }}>{course.title}</h3>
                
                    <p style={{ fontSize: 13, color: '#ccc' }}>
                      {course.author?.name || 'Unknown Author'}
                    </p>

                    {/* Short Description */}
                    <p style={{ fontSize: 14, color: '#ccc', margin: '0 0 12px 0' }}>
                      {course.description.length > 80 ? course.description.substring(0, 80) + '...' : course.description}
                    </p>
                
                    {/* Instructor 
                    {course.author && (
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                        <img
                          src={course.author.avatarUrl}
                          alt={course.author.name}
                          style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
                        />
                        <span style={{ fontSize: 13, color: '#555' }}>{course.author.name}</span>
                      </div>
                    )}

                    {course.author && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <img
                          src={course.author.avatarUrl || '/default-avatar.png'}
                          alt={course.author.name}
                          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                        />
                        <div>
                          <p style={{ margin: 0, color: '#fff', fontWeight: 'bold' }}>{course.author.name}</p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#ccc' }}>{course.author.bio}</p>
                        </div>
                      </div>
                    )}
                    */}
                
                    {/* Rating + Duration */}
                    <div style={{ fontSize: 13, color: '#ccc', marginBottom: 8 }}>
                      ⭐ {course.rating ?? '4.5'} / 5 
                    </div>
                
                    {/* Price Label */}
                    <div style={{ marginBottom: 10 }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          backgroundColor: course.isFree ? '#d4edda' : '#f8d7da',
                          color: course.isFree ? '#155724' : '#721c24',
                          fontSize: 13
                        }}
                      >
                        {course.isFree ? 'Free' : 'Paid'}
                      </span>
                    </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                  <p style={{ fontSize: 13, color: '#ccc', marginBottom: 8 }}>⏱ {course.duration ?? '1h 30m'} • {course.lessons ?? 10} lessons</p>
                    {/* View Details Button */}
                    <button
                      onClick={() => navigate(`/courses/${course.slug}`)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 4,
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginBottom: 8
                      }}

                      className='course-view-more'
                    >
                      View Course
                    </button>
                    </div>
                
                    {/* Watch Tutorial (Modal Player or Buy logic) 
                    <button
                      onClick={() => {
                        if (course.isFree) {
                          setModalCourse(course);
                        } else if (!currentUser) {
                          alert('Please log in to watch this tutorial.');
                        } else if (userHasAccess(course)) {
                          setModalCourse(course);
                        } else {
                          alert('Please purchase this tutorial to watch.');
                        }
                      }}
                      style={{
                        padding: '8px 12px',
                        cursor:
                          course.isFree || (currentUser && userHasAccess(course)) ? 'pointer' : 'not-allowed',
                        backgroundColor:
                          course.isFree || (currentUser && userHasAccess(course)) ? '#28a745' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        fontSize: 14
                      }}
                    >
                      {course.isFree || (currentUser && userHasAccess(course)) ? 'Watch Tutorial' : 'Buy to Watch'}
                    </button>
                */}
                
                    {/* Mark Completed */}
                    {currentUser && (
                      <div style={{ marginTop: 10, fontSize: 13 }}>
                        <label>
                          <input
                            type="checkbox"
                            checked={!!completedCourses[course.id]}
                            onChange={() => handleMarkComplete(course.id)}
                            style={{ marginRight: 6 }}
                          />
                          Mark as completed
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
    

      {/* Load More */}
      {lastVisible && courses.length < totalCourses && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={fetchMoreCourses} disabled={loading}>
            {loading ? 'Loading...' : 'Load More Courses'}
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

     

    </div>
  );
};

export default Courses;
