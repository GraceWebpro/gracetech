import { useState } from "react";
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
//import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/navbar/Navbar';
import Homepage from './components/home/Homepage';
import Login from './admin/AdminLogin';
import Footer from './components/footer/Footer';
import ProtectedRoute from './server/protectedRoute';
import AdminDashboard from './admin/AdminDashboard';
import Register from './admin/AdminRegister';
//import MouseCursor from "./components/home/MouseCursor";
import { Projects } from "./components/projects/Projects";
import ScrollToTop from "./components/ScrollToTopPage";
import Contact from "./components/contact/Contact";
import GetAQuote from "./components/quote/Quote";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="App">
    <ScrollToTop />
      {/*<MouseCursor />*/}

      {!isAdminPage && <Navbar />}
      <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-a-quote" element={<GetAQuote />} />

          {/* Admin Routes */}
          <Route path='/admin/login' element={<Login onUserChange={setUser} />} />   
          <Route path="/admin/register" element={<Register />} />       
          {/*<Route path="/movie/:title/episode/:episodeNumber" element={<EpDownload />} />*/}
          
          {/* Protected Admin Dashboard */}
        <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />

          
          {/* Redirect to home for unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {!isAdminPage && <Footer />}
            {/*<ScrollToTop />*/}

    </div>
  );
}

export default App;
