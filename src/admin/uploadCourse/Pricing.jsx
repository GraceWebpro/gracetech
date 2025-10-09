import React, { useState } from "react";
import { db } from "../../server/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./uploadCourse.css";

const Pricing = ({ setActiveTab }) => {
  const [pricing, setPricing] = useState({
    price: "",
    currency: "USD",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricing((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const courseId = localStorage.getItem("courseId");
      await setDoc(
        doc(db, "courses", courseId),
        { pricing },
        { merge: true }
      );
      setActiveTab("promotion");
    } catch (error) {
      console.error("Error saving pricing details:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setActiveTab("course-landing-page");
  };

  return (
    <div className="upload-section">
      <h2>Pricing</h2>
      <p className="section-subtitle">
        Set your course price. Free courses have limitations.
      </p>

      <form onSubmit={handleNext} className="upload-form">
        <label>Currency</label>
        <select
          name="currency"
          value={pricing.currency}
          onChange={handleChange}
          required
        >
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
          <option value="EUR">EUR</option>
        </select>

        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter course price"
          value={pricing.price}
          onChange={handleChange}
          required
        />

        <p className="price-note">
          💡 Tip: Pricing your course appropriately can increase enrollments.
        </p>

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

export default Pricing;
