import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "course-details", label: "Course Details" },
    { id: "intended-learners", label: "Intended Learners" },
    { id: "curriculum", label: "Curriculum" },
    { id: "course-landing-page", label: "Course Landing Page" },
    { id: "pricing", label: "Pricing" },
    { id: "promotion", label: "Promotion" },
    { id: "course-messages", label: "Course Messages" },
  ];

  return (
    <div className="upl-sidebar">
      <h3 className="upl-sidebar-title">Plan Your Course</h3>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
