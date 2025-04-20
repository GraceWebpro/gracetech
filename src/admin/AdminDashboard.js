import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, getDocs, collection, doc, getDoc } from "firebase/firestore";
import UploadProject from "./UploadProject";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import UserSettings from "./UserSettings";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Admin.css";
import UploadBlog from "./UploadBlog";
import UploadTemplate from "./UploadTemplate";

function Dashboard() {
  const [role, setRole] = useState(null); // State to store the user's role
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  const auth = getAuth(); // Firebase Auth instance
  const db = getFirestore(); // Firebase Firestore instance

  // Listen for user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/admin/login"); // Redirect if not logged in
      } else {
        setUser(currentUser);
        try {
          // Fetch user role from Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const fetchedRole = userDoc.data().role;
            setRole(fetchedRole);

            // Fetch projects only if the user is an admin
            if (fetchedRole === "admin") {
              setLoading(true); // Start loading before fetching projects
              const querySnapshot = await getDocs(collection(db, "projects"));
              const projectList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setProjects(projectList);
              setLoading(false); // Stop loading once projects are fetched
            } else {
              navigate("/"); // Redirect if user is not an admin
            }
          } else {
            console.error("User not found in Firestore");
            setLoading(false); // Stop loading if user is not found
          }
        } catch (error) {
          console.error("Error fetching user role or projects:", error);
          setLoading(false); // Stop loading on error
        }
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [auth, db, navigate]); // This effect depends on auth, db, and navigate

  // Define the logout function
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Loading state until role is fetched
  if (loading) return <div>Loading...</div>;

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
