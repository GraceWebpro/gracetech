import { useState } from "react";
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProjectsPage from './components/pages/ProjectsPage';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Homepage from "./components/pages/Homepage";
import GetAQuote from "./components/pages/quote/Quote";
import Contact from "./components/pages/Contact";
import ScrollToTop from "./components/animations/ScrollToTop";
import BookingPage from "./components/pages/BookingPage";
import UserLogin from "./components/pages/userAuth/Login";
import UserRegister from "./components/pages/userAuth/Register";
import UserDashboard from "./components/pages/userDashboard/UserDashboard";
import Templates from "./components/pages/templates/Templates";
import ThankYou from "./components/pages/quote/ThankYou";
import TemplateDetails from "./components/pages/templates/TemplateDetails";
import ServiceDetailsPage from "./components/pages/ServiceDetailPage";
import { AdminRoute } from "./admin/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import Privacy from "./components/legal/Privacy";
import Terms from './components/legal/Terms';
import Refund from './components/legal/Refund';
import License from "./components/legal/License";
import NotFound from "./components/pages/NotFound";
import BlogList from "./components/pages/BlogList";
import BlogDetails from "./components/pages/BlogDetails";
import PageTracker from "./components/sections/PageTracker";

function App() {
  const location = useLocation();

  const [user, setUser] = useState(null);



  // Determine the routes
  const isAdminPage = location.pathname.startsWith('/admin');
  const isUserDashboard = location.pathname.startsWith('/dashboard');
  const isTemplatePage = location.pathname.startsWith("/templates");
  const isNewUI = location.pathname.startsWith("/new");
  const isUserLogin = location.pathname.startsWith('/login');
  const isUserRegister = location.pathname.startsWith('/register');

  return (
    <div className="App font-bold">
      {!isAdminPage && !isUserDashboard && !isNewUI && !isUserLogin && !isUserRegister && (
        <Navbar />
      )}

      <ScrollToTop />
        <PageTracker />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-a-quote" element={<GetAQuote />} />
        <Route path="/book-a-call" element={<BookingPage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/templates/:slug" element={<TemplateDetails />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Auth */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister /> } />
        <Route path="/dashboard" element={<UserDashboard /> } />

        {/* Admin Auth */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Legal */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/license" element={<License />} />



      </Routes>

      {!isAdminPage && !isNewUI && !isUserDashboard && !isUserLogin && !isUserRegister && <Footer />}

    </div>
  );
}

export default App;
