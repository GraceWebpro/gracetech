import { useState } from "react";
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
//import ScrollToTop from './components/ScrollToTop';
// import Navbar from './components/navbar/Navbar';
import Homepage from './components/home/Homepage';
import AdminLogin from './admin/AdminLogin';
// import Footer from './components/footer/Footer';
import Footer from "./new-ui/NewDesign/layout/Footer";
import ProtectedRoute from './server/protectedRoute';
import AdminDashboard from './admin/AdminDashboard';
import Register from './admin/AdminRegister';
//import MouseCursor from "./components/home/MouseCursor";
import { Projects } from "./components/projects/Projects";
// import ScrollToTop from "./components/ScrollToTopPage";
import ScrollToTop from "./new-ui/NewDesign/animations/ScrollToTop";
import Contact from "./new-ui/NewDesign/sections/Contact";
import GetAQuote from "./new-ui/NewDesign/sections/quote/Quote";
import ProjectDetails from "./components/projects/ProjectDetails";
import TemplateTabs from "./components/template/Templates";
import ThankYou from "./new-ui/NewDesign/sections/quote/ThankYou";
import ServiceDetailsPage from "./new-ui/NewDesign/sections/ServiceDetailPage";
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
import UserRegister from "./components/userAuth/Register";
import UserDashboard from "./components/userDashboard/UserDashboard";
import NewLayout from "./new-ui/NewLayout";
import NewHome from "./new-ui/NewHome";
import Navbar from "./new-ui/NewDesign/layout/Navbar";
import ProjectsPage from "./new-ui/NewDesign/sections/ProjectsPage";

function App() {
  const location = useLocation();

  const [user, setUser] = useState(null);
  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');
  const isTemplatePage = location.pathname.startsWith("/templates");
  const isNewUI = location.pathname.startsWith("/new");

  return (
    
    <div className="App">
    <ScrollToTop />
    <ScrollToHashElement />
      {/*<MouseCursor />*/}

      {!isAdminPage && !isNewUI && (
        isTemplatePage ? <TemplateNavbar /> : <Navbar />
      )}

      <Routes>
          {/* Public routes */}
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<NewHome />} />
          {/* <Route path="/old-home" element={<Homepage />} />  */}

          
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/templates" element={<Template />} />
          <Route path="/courses" element={ <Courses /> } />
          <Route path="/courses/:slug" element={<CoursesPage />} />
          <Route path="/admin/upload-course" element={<UploadCourse />} />

          <Route path="/get-a-quote" element={<GetAQuote />} />
          <Route path="/blog" element={<ModernBlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister /> } />
          <Route path="/dashboard" element={<UserDashboard /> } />

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

          {/* New UI preview */}
          <Route
            path="/old-home"
            element={
              // <NewLayout>
              //   <NewHome />
              // </NewLayout>
              <Homepage />
            }
          />
        </Routes>
        <CookieBanner />

        {!isAdminPage && !isNewUI && <Footer />}
            {/*<ScrollToTop />*/}

    </div>
  );
}

export default App;
