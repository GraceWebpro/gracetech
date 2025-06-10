// src/pages/BookingPage.js
import React, { useEffect } from 'react';

const BookingPage = () => {
  useEffect(() => {
    // Load Calendly script manually
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/gogracetech/30min?hide_gdpr_banner=1", // Replace with your link
          parentElement: document.getElementById("calendly-container"),
          prefill: {},
          utm: {}
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book a Session</h2>
      <div
        id="calendly-container"
        style={{ minWidth: '320px', height: '700px' }}
      ></div>
    </div>
  );
};

export default BookingPage;
