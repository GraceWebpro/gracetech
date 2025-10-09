import React, { useState } from "react";
import { db } from "../../server/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./uploadCourse.css";

const Promotion = ({ setActiveTab }) => {
  const [promotion, setPromotion] = useState({
    headline: "",
    couponCode: "",
    discount: "",
    promoVideo: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const courseId = localStorage.getItem("courseId");
      await setDoc(
        doc(db, "courses", courseId),
        { promotion },
        { merge: true }
      );
      setActiveTab("course-messages");
    } catch (error) {
      console.error("Error saving promotion details:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setActiveTab("pricing");
  };

  return (
    <div className="upload-section">
      <h2>Promotion</h2>
      <p className="section-subtitle">
        Add promotional details to help attract more students.
      </p>

      <form onSubmit={handleNext} className="upload-form">
        <label>Promotional Headline</label>
        <input
          type="text"
          name="headline"
          value={promotion.headline}
          onChange={handleChange}
          placeholder="e.g. Learn Figma from scratch with hands-on projects!"
          required
        />

        <label>Coupon Code (Optional)</label>
        <input
          type="text"
          name="couponCode"
          value={promotion.couponCode}
          onChange={handleChange}
          placeholder="e.g. FIGMA2025"
        />

        <label>Discount Percentage</label>
        <input
          type="number"
          name="discount"
          value={promotion.discount}
          onChange={handleChange}
          placeholder="e.g. 20"
          min="0"
          max="100"
        />

        <label>Promo Video Link (Optional)</label>
        <input
          type="url"
          name="promoVideo"
          value={promotion.promoVideo}
          onChange={handleChange}
          placeholder="Paste YouTube or hosted video link"
        />

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

export default Promotion;
