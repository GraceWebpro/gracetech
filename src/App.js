import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/navbar/Navbar';

function App() {
  const location = useLocation();

  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="App">

      {!isAdminPage && <Navbar />}

      <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeHeader />} />
          <Route path='/k-drama' element={<Drama />} />
          <Route path='/nollywood' element={<Nollywood />} />
          <Route path='/how-to-download' element={<HowTo />} />
          <Route path="movies/:id" element={<MovieDetail />} />
          <Route path="/movie/:title/episode/:episodeNumber" element={<EpDownload />} />
          
          
          {/* Redirect to home for unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
            <ScrollToTop />

    </div>
  );
}

export default App;
