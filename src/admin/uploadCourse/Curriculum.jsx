import React, { useState } from "react";
import { db } from "../../server/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./uploadCourse.css";

const Curriculum = ({ setActiveTab }) => {
  const [sections, setSections] = useState([{ title: "", lessons: [""] }]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSectionChange = (index, value) => {
    const updated = [...sections];
    updated[index].title = value;
    setSections(updated);
  };

  const handleLessonChange = (sectionIndex, lessonIndex, value) => {
    const updated = [...sections];
    updated[sectionIndex].lessons[lessonIndex] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { title: "", lessons: [""] }]);
  };

  const addLesson = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].lessons.push("");
    setSections(updated);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const courseId = localStorage.getItem("courseId"); // store courseId earlier
      await setDoc(
        doc(db, "courses", courseId),
        { curriculum: sections },
        { merge: true }
      );
      setActiveTab("course-landing-page");
    } catch (error) {
      console.error("Error saving curriculum:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setActiveTab("intended-learners");
  };

  return (
    <div className="upload-section">
      <h2>Curriculum & Content</h2>
      <p className="section-subtitle">
        Structure your course into sections and lessons.
      </p>

      <form onSubmit={handleNext} className="upload-form">
        {sections.map((section, sIndex) => (
          <div key={sIndex} className="section-block">
            <h4>Section {sIndex + 1}</h4>
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleSectionChange(sIndex, e.target.value)}
              placeholder="Section Title"
              required
            />

            {section.lessons.map((lesson, lIndex) => (
              <input
                key={lIndex}
                type="text"
                value={lesson}
                onChange={(e) =>
                  handleLessonChange(sIndex, lIndex, e.target.value)
                }
                placeholder={`Lesson ${lIndex + 1}`}
                required
              />
            ))}

            <button
              type="button"
              className="btn-secondary small"
              onClick={() => addLesson(sIndex)}
            >
              + Add Lesson
            </button>
          </div>
        ))}

        <button type="button" className="btn-secondary" onClick={addSection}>
          + Add Section
        </button>

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

export default Curriculum;
