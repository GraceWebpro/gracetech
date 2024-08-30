import React, { useState } from 'react';
import SearchBar from '../home/search/SearchBar';
import { fetchMovies } from '../home/search/FetchMovies'; // Adjust the import based on your setup
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';


const NavSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

 
  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setNoResults(false);
    try {
      const allMovies = await fetchMovies();
      const lowerCaseQuery = query.toLowerCase();
      //const results = await fetchMovies(lowerCaseQuery);
      const results = allMovies.filter(movie => 
        movie.title.toLowerCase().includes(lowerCaseQuery)
      );
      
      if (results.length === 0) {
        setNoResults(true);
      } else {
        setMovies(results);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Optionally handle error state here
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`movies/${movieId}`);
  };


  return (
    <div className='nav-search'>
      <SearchBar onSearch={handleSearch} />
      {loading && <p style={{ marginLeft: '15px', cursor: 'pointer' }}>Loading...</p>}
      {!loading && noResults && <p style={{ color: '#000', marginLeft: '15px', cursor: 'pointer' }}>No results found.</p>}
      {!loading && !noResults && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li 
              key={movie.id} 
              onClick={() => handleMovieClick(movie.id)} 
              style={{ color: '#fff', marginLeft: '15px', cursor: 'pointer' }}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavSearch;
