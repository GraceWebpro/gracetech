import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseMessage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [congratulationsMessage, setCongratulationsMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseMessageData = {
      welcomeMessage,
      congratulationsMessage,
    };

    // Save data locally
    localStorage.setItem("courseMessageData", JSON.stringify(courseMessageData));

    // Navigate to dashboard
    navigate("/admin/dashboard");
  };

  return (
    <div className="course-message-container">
      <h2>Course Messages</h2>
      <p>
        Personalize your students’ experience with welcome and completion
        messages.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Welcome Message</label>
        <textarea
          placeholder="Write a welcome message for your students"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          rows={4}
        />

        <label>Congratulations Message</label>
        <textarea
          placeholder="Write a message to congratulate students after completing the course"
          value={congratulationsMessage}
          onChange={(e) => setCongratulationsMessage(e.target.value)}
          rows={4}
        />

        <button type="submit" className="save-btn">
          Save Messages
        </button>
      </form>

      <p className="course-message-note">
        💡 Tip: A friendly message helps build connection and motivates learners.
      </p>
    </div>
  );
};

export default CourseMessage;
