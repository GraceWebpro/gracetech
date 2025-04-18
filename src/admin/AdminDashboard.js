import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../server/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../server/firebase"; // Ensure db is imported
import UploadProject from "./UploadProject";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import UserSettings from "./UserSettings";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Admin.css";
import UploadBlog from "./UploadBlog";
import UploadTemplate from "./UploadTemplate";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/admin/login"); // Redirect if not logged in
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="admin-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        {isSidebarOpen && (
          <div className="sidebar-content">
            <h2 style={{ marginTop: '40px' }}>Admin Panel</h2>
           
            {user && <p className="admin-email">Welcome, {user.email}</p>}
            <ul>
              <li onClick={() => setActiveTab("dashboard")} className={activeTab === "dashboard" ? "active" : ""}>📊 Dashboard</li>
              <li onClick={() => setActiveTab("upload")} className={activeTab === "upload" ? "active" : ""}>📤 Upload Project</li>
              <li onClick={() => setActiveTab("uploadTemplate")} className={activeTab === "uploadTemplate" ? "active" : ""}>📤 Upload Template</li>
              <li onClick={() => setActiveTab("uploadBlog")} className={activeTab === "uploadBlog" ? "active" : ""}>📤 Upload Blog</li>

              <li onClick={() => setActiveTab("edit")} className={activeTab === "edit" ? "active" : ""}>✏️ Edit Project</li>
              <li onClick={() => setActiveTab("delete")} className={activeTab === "delete" ? "active" : ""}>🗑️ Delete Project</li>
              <li onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? "active" : ""}>⚙️ User Settings</li>
            </ul>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-table">
            <h3>Project List</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No projects found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "upload" && <UploadProject />}
        {activeTab === "uploadBlog" && <UploadBlog />}
        {activeTab === "uploadTemplate" && <UploadTemplate />}

        {activeTab === "edit" && <EditProject projects={projects} />} {/* Pass projects */}
        {activeTab === "delete" && <DeleteProject projects={projects} />} {/* Pass projects */}
        {activeTab === "settings" && <UserSettings />}
      </div>
    </div>
  );
}

export default Dashboard;
