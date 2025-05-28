// MoviesPage.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig"; // Make sure to import your Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";
import '../../styles/Main.css';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Action" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Sci-Fi" },
  { name: "Romance" },
  { name: "Thriller" },
];

const CoursesPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevant");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get("category");
// State for selected category and selected tags
const [selectedCategories, setSelectedCategories] = useState([]);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If a category is selected from the URL, update the selectedCategories state
    if (categoryFromURL && !selectedCategories.includes(categoryFromURL)) {
      setSelectedCategories([categoryFromURL]);
    }
  }, [categoryFromURL]); // Dependency array added for categoryFromURL

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
  
      const moviesCollection = collection(db, "movies");
      
      // Build the query
      let q = query(moviesCollection);

       // Add topic filter if selected
    if (selectedTopic) {
        q = query(q, where("topic", "==", selectedTopic));
    }
  
      // If one or more categories are selected, filter movies by category
      if (selectedCategories.length > 0) {
        q = query(q, where("tags", "array-contains-any", selectedCategories));
      }
  
      
      try {
        const querySnapshot = await getDocs(q);
        const movieList = querySnapshot.docs.map((doc) => ({
          id: doc.id,            // ✅ Include the Firestore document ID
          ...doc.data(),         // ✅ Spread the rest of the movie data
        }));
        
        setMovies(movieList);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, [selectedTopic]);  // Re-fetch when category or tags change
// Handle category checkbox change
const handleCategoryChange = (category) => {
  setSelectedCategories((prevSelected) => {
    if (prevSelected.includes(category)) {
      return prevSelected.filter((cat) => cat !== category); // Deselect if already selected
    } else {
      return [...prevSelected, category]; // Select if not already selected
    }
  });
};

  // Sorting logic based on selected sort option
  const sortedMovies = movies.sort((a, b) => {
    if (sortOption === "popular") {
      return b.popularity - a.popularity; // Assuming there's a popularity field in the data
    }
    if (sortOption === "new") {
      return new Date(b.releaseDate) - new Date(a.releaseDate); // Assuming there's a releaseDate field
    }
    return 0; // Default: relevant, no sorting
  });

  return (
    <div className="movies-page">

      <div className="movie-hero-section">
        <div className="movie-hero-content">
          <h1>Discover Movies</h1>
          <p>Browse through the movies. Use filters or sort options to find what you need!</p>
          <h4>
            {selectedCategories.length > 0
            ? `${selectedCategories.join(", ")} Movies`
            : "All Movies"}
          </h4>
        
        </div>
      </div>

      
      <div className="template-actions">
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="sort-dropdown">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Relevant</option>
            <option value="popular">Popular</option>
            <option value="new">New</option>
          </select>
        </div>
      </div>

      <div className={`template-content ${showFilters ? 'with-filters' : 'no-filters'}`}>
        {showFilters && (
          <aside className="filters">
            <h3>Categories</h3>
            {/* Loop through categories (example below) */}
            {categories.map((category) => (
              <label key={category.name} className="category-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </aside>
        )}

      <div className="movie-grid">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : sortedMovies.length > 0 ? (
          sortedMovies.map((movie, index) => (
            
            <div key={index} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
              <img src={movie.thumbnailUrl} alt={movie.title} />
              <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year-genre">
            {movie.releaseYear} • {movie.category}
          </p>
          <p className="movie-year-genre">
            {movie.status}
          </p>
          {movie.rating && (
            <p className="movie-rating">⭐ {movie.rating}/10</p>
          )}
        </div>
            </Link>
            </div>
            
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default CoursesPage;
