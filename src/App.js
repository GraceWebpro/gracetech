import { useState } from "react";
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
//import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/navbar/Navbar';
import Homepage from './components/home/Homepage';
import AdminLogin from './admin/AdminLogin';
import Footer from './components/footer/Footer';
import ProtectedRoute from './server/protectedRoute';
import AdminDashboard from './admin/AdminDashboard';
import Register from './admin/AdminRegister';
//import MouseCursor from "./components/home/MouseCursor";
import { Projects } from "./components/projects/Projects";
import ScrollToTop from "./components/ScrollToTopPage";
import Contact from "./components/contact/Contact";
import GetAQuote from "./components/quote/Quote";
import ProjectDetails from "./components/projects/ProjectDetails";
import TemplateTabs from "./components/template/Templates";
import ThankYou from "./components/quote/ThankYou";
import ServiceDetailsPage from "./components/services/ServiceDetailPage";
import ModernBlogPage from "./components/blog/Blog";
import BlogDetail from "./components/blog/BlogDetail";
import PrivateRoute from "./server/PrivateRoute";
import DownloadPage from "./components/template/DownloadPage";
import TemplateNavbar from "./components/template/TemplateNavbar";
import Template from "./components/template/TemplatesList/Template";
import TemplateDetails from "./components/template/TemplateDetail";
import Login from './components/userAuth/Login'
import TemplateList from './components/template/TemplatesList/TemplateList'
import Courses from "./components/courses/Courses";
import NavbarN from "./components/Navbar";
import BookingPage from "./components/book/Booking";
import CoursesPage from "./components/courses/CoursesPage";
import UploadCourse from "./admin/uploadCourse/UploadCourse";
import ScrollToHashElement from "./components/ScrollToHashElement";
import NotFound from "./components/notFound/NotFound";
import Privacy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import CookieBanner from "./components/CookieBanner";

function App() {
  const location = useLocation();

  const [user, setUser] = useState(null);
  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');
  const isTemplatePage = location.pathname.startsWith("/templates");

  return (
    
    <div className="App">
    <ScrollToTop />
    <ScrollToHashElement />
      {/*<MouseCursor />*/}

      {!isAdminPage && (isTemplatePage ? <TemplateNavbar /> : <NavbarN />)}

      <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/templates" element={<Template />} />
          <Route path="/courses" element={ <Courses /> } />
          <Route path="/courses/:slug" element={<CoursesPage />} />
          <Route path="/admin/upload-course" element={<UploadCourse />} />

          <Route path="/get-a-quote" element={<GetAQuote />} />
          <Route path="/blog" element={<ModernBlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-a-call" element={<BookingPage />} />

          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/project-details/:slug" element={<ProjectDetails />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route
            path="/download/:id"
            element={
              <PrivateRoute>
                <DownloadPage />
              </PrivateRoute>
            }
          />
                  <Route path="/templates/:slug" element={<TemplateDetails />} />
          <Route path="/template-list" element={<TemplateList />} />


          {/* Admin Routes */}
          <Route path='/admin/login' element={<AdminLogin onUserChange={setUser} />} />   
          <Route path="/admin/register" element={<Register />} />       
          {/*<Route path="/movie/:title/episode/:episodeNumber" element={<EpDownload />} />*/}
          
          {/* Protected Admin Dashboard */}
        <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />

          
          {/* Redirect to home for unmatched routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <CookieBanner />

        {!isAdminPage && <Footer />}
            {/*<ScrollToTop />*/}

    </div>
  );
}

export default App;
