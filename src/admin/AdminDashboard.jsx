import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import { supabase } from "../config/supabase";

import Overview from "./sections/Overview";
import Templates from "./sections/Templates";
import Courses from "./sections/Courses";
import Projects from "./sections/Projects";
import Settings from "./sections/Settings";
import { Menu } from "lucide-react";

const AdminDashboard = () => {
  const [tab, setTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
  
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const renderSection = () => {
    switch (tab) {
      case "overview":
        return <Overview />;
      case "templates":
        return <Templates />;
      case "courses":
        return <Courses />;
      case "projects":
        return <Projects />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">
      
      {/* ================= MOBILE HAMBURGER ================= */}
      <div className="mobile-header" ref={menuRef}>
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <div className="topbar" ref={menuRef}>
          <div className="user-chip"  onClick={(e) => {
            e.stopPropagation();
            setUserMenuOpen(v => !v);
          }}>
            <div className="avatar">
              {user?.displayName
                ? user?.displayName?.charAt(0).toUpperCase()
                : user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>

          {userMenuOpen && (
            <div className="user-menu">
              <button
                onClick={() => {
                  setTab("settings");
                  setUserMenuOpen(false);
                }}
              >
                Settings
              </button>
              <button
        onClick={async () => {
          await supabase.auth.signOut();
          setUserMenuOpen(false);
          window.location.href = "/admin/login"; // 🔥 force redirect
        }}
      >
        Logout
      </button>
            </div>
          )}

      </div>
      </div>

      {/* ================= DESKTOP HEADER ================= */}
      <div className="topbar" ref={menuRef}>
  
  {/* USER CHIP */}
  <div
    className="user-chip"
    onClick={() => setUserMenuOpen((v) => !v)}
  >
    <div className="avatar">
      {user?.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : user?.email?.charAt(0).toUpperCase()}
    </div>
  </div>

  {/* MENU */}
  {userMenuOpen && (
    <div className="user-menu">
      
      <button
        onClick={() => {
          setTab("settings");
          setUserMenuOpen(false);
        }}
      >
        Settings
      </button>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/admin/login"; // 🔥 force redirect
        }}
      >
        Logout
      </button>

    </div>
  )}

</div>

      {/* ================= BACKDROP ================= */}
      {sidebarOpen && (
        <div className="backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        tab={tab}
        setTab={setTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 p-8">
        {renderSection()}
      </main>

    </div>
  );
};

export default AdminDashboard;