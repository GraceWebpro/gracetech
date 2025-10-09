import React, { useState } from "react";
import { db } from "../../server/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./uploadCourse.css";

const CourseLandingPage = ({ setActiveTab }) => {
  const [courseLanding, setCourseLanding] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseLanding((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const courseId = localStorage.getItem("courseId");
      await setDoc(
        doc(db, "courses", courseId),
        { courseLanding },
        { merge: true }
      );
      setActiveTab("pricing");
    } catch (error) {
      console.error("Error saving course landing page:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setActiveTab("curriculum");
  };

  return (
    <div className="upload-section">
      <h2>Course Landing Page</h2>
      <p className="section-subtitle">
        These details will appear publicly on your course page.
      </p>

      <form onSubmit={handleNext} className="upload-form">
        <label>Course Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter course title"
          value={courseLanding.title}
          onChange={handleChange}
          required
        />

        <label>Subtitle</label>
        <input
          type="text"
          name="subtitle"
          placeholder="Short description"
          value={courseLanding.subtitle}
          onChange={handleChange}
          required
        />

        <label>Course Description</label>
        <textarea
          name="description"
          placeholder="Describe what the course is about"
          value={courseLanding.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={courseLanding.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="business">Business</option>
        </select>

        <div className="form-buttons">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleBack}
            disabled={isSaving}
          >
            Back
          </button>
          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseLandingPage;
