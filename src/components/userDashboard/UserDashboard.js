import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

import Overview from "./Overview";
import MyDownloads from "./MyDownloads";
import Orders from "./Orders";
import Subscription from "./Subscription";
import Profile from "./Profile";

import "./Dashboard.css";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (active) {
      case "downloads":
        return <MyDownloads />;
      case "orders":
        return <Orders />;
      case "subscription":
        return <Subscription />;
      case "profile":
        return <Profile />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar
        active={active}
        setActive={setActive}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      {/* <div className="dashboard-main">
        <DashboardHeader />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div> */}
      <div className="dashboard-main">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
