import React, { useState, useEffect } from "react";
import { db } from "../../server/firebase"; // your firebase config path
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

const CourseDetails = ({ setActiveTab, courseId, setCourseId }) => {
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    category: "",
    description: "",
    topic: "",
    level: "",
    format: "",
    language: "English",
  });

  // If courseId exists, this means user is editing an existing course — we can prefill later
  useEffect(() => {
    if (courseId) {
      console.log("Editing existing course:", courseId);
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let newCourseId = courseId;
      
      if (!courseId) {
        const newDocRef = doc(collection(db, "courses"));
        newCourseId = newDocRef.id;
        setCourseId(newCourseId);
      }

      // save course details to Firestore
      await setDoc(
        doc(db, "courses", newCourseId),
        {
          ...courseDetails,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true } // merge allows progressive saving from other sections
      );

      console.log("Course details saved:", newCourseId);
      setActiveTab("intended-learners");
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2>Course Details</h2>
      <p className="section-subtitle">
        Add basic information about your course.
      </p>

      <form onSubmit={handleNext} className="upload-form">
        <label>Course Title</label>
        <input
          type="text"
          name="title"
          value={courseDetails.title}
          onChange={handleChange}
          placeholder="e.g. Master Figma UI/UX Design"
          required
        />

      

        <label>Category(lowercase) *</label>
        <select name="category"
          value={courseDetails.category}
          onChange={handleChange} required>
          <option>figma</option>
          <option>bubble</option>
          <option>html</option>
          <option>css</option>
          <option>flutterflow</option>
          <option>react</option>
        </select>

        <label>Topic</label>
        <select name="topic" value={courseDetails.topic} onChange={handleChange}>
          <option>Web Design</option>
          <option>SEO</option>
          <option>Development</option>
          <option>Marketing</option>
          <option>Graphics</option>
        </select>

        <label>Course Level (Difficulty)</label>
        <select
          name="level"
          value={courseDetails.level}
          onChange={handleChange}
          required
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Format</label>
        <select name="format" value={courseDetails.format} onChange={handleChange}>
          <option>Video</option>
          <option>Text</option>
          <option>PDF</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          value={courseDetails.description}
          onChange={handleChange}
          placeholder="Briefly describe your course..."
          rows="4"
        />

        <label>Language</label>
        <input
          type="text"
          name="language"
          value={courseDetails.language}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Next →"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseDetails;
