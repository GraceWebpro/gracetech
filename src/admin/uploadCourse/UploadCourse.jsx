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
  const [courseId, setCourseId] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "course-details":
        return <CourseDetails  courseId={courseId} setActiveTab={setActiveTab} />;
      case "intended-learners":
        return <IntendedLearners courseId={courseId} setActiveTab={setActiveTab} />;
      case "curriculum":
        return <Curriculum courseId={courseId} setActiveTab={setActiveTab} />;
      case "course-landing-page":
        return <LandingPage courseId={courseId} setActiveTab={setActiveTab} />;
      case "pricing":
        return <Pricing courseId={courseId} setActiveTab={setActiveTab} />;
      case "promotion":
        return <Promotion courseId={courseId} setActiveTab={setActiveTab} />;
      case "course-messages":
        return <CourseMessage courseId={courseId} setActiveTab={setActiveTab} />;
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
