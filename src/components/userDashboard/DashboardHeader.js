import { useAuth } from "../../server/AuthProvider";
import { FaBars } from "react-icons/fa";
import "./Dashboard.css";

const DashboardHeader = ({ toggleSidebar, sidebarOpen }) => {
  const { currentUser } = useAuth();

  return (
<header className={`dashboard-header ${sidebarOpen ? "sidebar-open" : ""}`}>
    <div className="header-content">
      <FaBars className="header-toggle" onClick={toggleSidebar} />
      <h2>Welcome, {currentUser?.displayName || "User"}</h2>
    </div>
  </header>
  );
};

export default DashboardHeader;
