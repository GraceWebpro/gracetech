import React, { useState } from "react";
import { db } from "../../server/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./uploadCourse.css";

const IntendedLearners = ({ setActiveTab, courseId }) => {
  const [loading, setLoading] = useState(false);

  const [learners, setLearners] = useState({
    objectives: ["", "", "", ""],
    requirements: [""],
    targetAudience: [""],
  });

  const handleChange = (section, index, value) => {
    const updated = [...learners[section]];
    updated[index] = value;
    setLearners({ ...learners, [section]: updated });
  };

  const handleAddField = (section) => {
    setLearners({ ...learners, [section]: [...learners[section], ""] });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!courseId) {
      alert("Please complete the Course Details section first.");
      return;
    }

    setLoading(true);

    try {
      await setDoc(
        doc(db, "courses", courseId),
        {
          intendedLearners: learners,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      console.log("Intended learners saved for:", courseId);
      setActiveTab("curriculum");
    } catch (error) {
      console.error("Error saving intended learners:", error);
      alert("Failed to save intended learners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2>Intended Learners</h2>
      <p className="section-subtitle">
        Describe your target audience and what they’ll gain.
      </p>

      <form onSubmit={handleNext} className="upload-form">
        <h4>Learning Objectives</h4>
        {learners.objectives.map((obj, index) => (
          <input
            key={index}
            type="text"
            value={obj}
            onChange={(e) => handleChange("objectives", index, e.target.value)}
            placeholder={`Objective ${index + 1}`}
            maxLength={160}
            required
          />
        ))}
        <button
          type="button"
          className="btn-secondary small"
          onClick={() => handleAddField("objectives")}
        >
          + Add Objective
        </button>

        <h4>Requirements or Prerequisites</h4>
        {learners.requirements.map((req, index) => (
          <input
            key={index}
            type="text"
            value={req}
            onChange={(e) => handleChange("requirements", index, e.target.value)}
            placeholder={`Requirement ${index + 1}`}
          />
        ))}
        <button
          type="button"
          className="btn-secondary small"
          onClick={() => handleAddField("requirements")}
        >
          + Add Requirement
        </button>

        <h4>Target Audience</h4>
        {learners.targetAudience.map((aud, index) => (
          <input
            key={index}
            type="text"
            value={aud}
            onChange={(e) => handleChange("targetAudience", index, e.target.value)}
            placeholder={`Audience ${index + 1}`}
          />
        ))}
        <button
          type="button"
          className="btn-secondary small"
          onClick={() => handleAddField("targetAudience")}
        >
          + Add Audience
        </button>

        <div className="form-buttons">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setActiveTab("course-details")}
          >
            ← Back
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Next →"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IntendedLearners;
