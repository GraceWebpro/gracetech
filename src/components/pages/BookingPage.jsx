// src/pages/BookingPage.js
import React, { useEffect } from 'react';
import SEO from '../seo/SEO';

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
    <>
    <SEO
        title="Book a Session | GraceTechie"
        description="Schedule a consultation for your website or app project."
        keywords="book developer, consultation, web design booking"
        url="https://gracetechie.com.ng/booking"
        image="https://gracetechie.com.ng/og-image.png"
      />
    <div style={{ marginTop: '80px' }}>
      <h2 className='text-center mb-[-30px]'>Book a Session</h2>
      <div
        id="calendly-container"
        style={{ minWidth: '320px', height: '700px' }}
      ></div>
    </div>
    </>
  );
};

export default BookingPage;
