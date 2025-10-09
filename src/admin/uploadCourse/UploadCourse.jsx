import React, { useState } from "react";
import Sidebar from "./CourseSidebar";
import CourseDetails from "./CourseDetails";
import IntendedLearners from "./IntendedLearner";
import Curriculum from "./Curriculum";
import LandingPage from "./CourseLanding";
import Pricing from "./Pricing";
import Promotion from "./Promotion";
import CourseMessage from "./CourseMessage"
import './uploadCourse.css'

const UploadCourse = () => {
  const [activeTab, setActiveTab] = useState("course-details");

  const renderContent = () => {
    switch (activeTab) {
      case "course-details":
        return <CourseDetails setActiveTab={setActiveTab} />;
      case "intended-learners":
        return <IntendedLearners setActiveTab={setActiveTab} />;
      case "curriculum":
        return <Curriculum setActiveTab={setActiveTab} />;
      case "course-landing-page":
        return <LandingPage setActiveTab={setActiveTab} />;
      case "pricing":
        return <Pricing setActiveTab={setActiveTab} />;
      case "promotion":
        return <Promotion setActiveTab={setActiveTab} />;
      case "course-messages":
        return <CourseMessage setActiveTab={setActiveTab} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ marginLeft: "260px", flex: 1, padding: "20px" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UploadCourse;
