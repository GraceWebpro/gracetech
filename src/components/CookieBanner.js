// src/components/CookieBanner.js
import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="gracetech_cookie_consent"
      style={{
        background: "#2B373B",
        fontSize: "14px",
        textAlign: "left",
      }}
      buttonStyle={{
        background: "#2563eb",
        color: "white",
        fontSize: "13px",
        borderRadius: "6px",
        padding: "6px 14px",
      }}
      enableDeclineButton
      declineButtonStyle={{
        background: "#999",
        color: "#fff",
        fontSize: "13px",
        borderRadius: "6px",
        padding: "6px 14px",
      }}
    >
      We use cookies to enhance your browsing experience and analyze site
      traffic. Read our{" "}
      <a href="/privacy" className="underline text-blue-400">
        Privacy Policy
      </a>
      .
    </CookieConsent>
  );
};

export default CookieBanner;
