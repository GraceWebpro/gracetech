import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Dashboard.css";

const DashboardSidebar = ({ active, setActive, isOpen, setIsOpen }) => {
    const handleClick = (tab) => {
        setActive(tab);
        setIsOpen(false); // close sidebar on mobile
      };

  return (
   
    <aside className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
      <h3 className="sidebar-title">My Account</h3>

      <button style={{ marginTop: "30px" }}
        className={active === "overview" ? "active" : ""}
        onClick={() => handleClick("overview")}
      >
        Overview
      </button>

      <button
        className={active === "downloads" ? "active" : ""}
        onClick={() => handleClick("downloads")}
      >
        My Downloads
      </button>

      <button
        className={active === "orders" ? "active" : ""}
        onClick={() => handleClick("orders")}
      >
        Orders
      </button>

      <button
        className={active === "subscription" ? "active" : ""}
        onClick={() => handleClick("subscription")}
      >
        Subscription
      </button>

      <button
        className={active === "profile" ? "active" : ""}
        onClick={() => handleClick("profile")}
      >
        Profile Settings
      </button>
    </aside>
  );
};

export default DashboardSidebar;
