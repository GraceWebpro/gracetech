import React, { useState } from "react";
import {
  LayoutDashboard,
  Box,
  BookOpen,
  FolderKanban,
  Settings,
  Download,
  Menu,
  X,
  Home,
  HomeIcon
} from "lucide-react";
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ tab, setTab, sidebarOpen, setSidebarOpen  }) => {
  const navigate = useNavigate();

  return (
    <aside 
      className={`
          fixed top-0 left-0 w-64 h-full bg-[#0b0b0b] flex flex-col border-r border-white/10 p-6 space-y-4
          transform transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex md:min-h-screen
        `}
    >

      <div style={{ gap: '60px' }}
          className="flex items-center justify-between md:justify-start mt-2 mb-8"
        >
          <h2 className="text-xl font-bold text-white text-center">Admin CMS</h2>
          <button
            className="md:hidden text-white cancel-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

      <Btn
        active={tab === "overview"}
        icon={<LayoutDashboard size={18} />}
        label="Overview"
        onClick={() => setTab("overview")}
      />

      <Btn
        active={tab === "templates"}
        icon={<Box size={18} />}
        label="Templates"
        onClick={() => setTab("templates")}
      />

      <Btn
        active={tab === "projects"}
        icon={<FolderKanban size={18} />}
        label="Projects"
        onClick={() => setTab("projects")}
      />

      <Btn
        active={tab === "courses"}
        icon={<BookOpen size={18} />}
        label="Courses"
        onClick={() => setTab("courses")}
      />

      <Btn
        active={tab === "blogs"}
        icon={<BookOpen size={18} />}
        label="blogs"
        onClick={() => setTab("blogs")}
      />

      <Btn
        active={tab === "settings"}
        icon={<Settings size={18} />}
        label="Settings"
        onClick={() => setTab("settings")}
      />

      <Btn
        active={false}
        icon={<HomeIcon size={18} />}
        label="Back to Home"
        onClick={() => navigate("/")}
      />

    </aside>
  );
};

const Btn = ({ active, icon, label, ...props }) => (
  <button
    {...props}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
      active ? "bg-white text-black" : "hover:bg-white/10"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default Sidebar;