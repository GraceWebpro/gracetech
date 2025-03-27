import logo from './logo.svg';
import { useState } from "react";
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/navbar/Navbar';
import Homepage from './components/home/Homepage';
import Login from './admin/AdminLogin';
import Footer from './components/footer/Footer';
import ProtectedRoute from './server/protectedRoute';
import AdminDashboard from './admin/AdminDashboard';
import Register from './admin/AdminRegister';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="App">

      {!isAdminPage && <Navbar />}
      <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path='/admin/login' element={<Login onUserChange={setUser} />} />   
          <Route path="/admin/register" element={<Register />} />       
          {/*<Route path="/movie/:title/episode/:episodeNumber" element={<EpDownload />} />*/}
          
          {/* Protected Admin Dashboard */}
        <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />

          
          {/* Redirect to home for unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {!isAdminPage && <Footer />}
            <ScrollToTop />

    </div>
  );
}

export default App;
