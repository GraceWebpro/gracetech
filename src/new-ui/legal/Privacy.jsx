import React from "react";
import { Helmet } from "react-helmet-async";
import LegalLayout from "./LegalLayout";

const Privacy = () => {
  return (
    <LegalLayout title="Privacy Policy" className='mt-1'> 

      {/* <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1> */}
      <p style={{
        marginTop: "30px",
      }} className="mb-6">
        At GraceTech, we respect your privacy and are committed to protecting
        your personal information. This Privacy Policy explains how we collect,
        use, and safeguard your data when you visit our website.
      </p>

      <h3 style={{ textAlign: "left", marginTop: "20px" }} className="text-2xl font-semibold mb-2">Information We Collect</h3>
      <p className="mb-4">
        We may collect personal information such as your name, email address, or
        other contact details when you voluntarily provide them, for example via
        register, contact forms or purchase.
      </p>

      <h3 style={{ textAlign: "left", marginTop: "20px" }} className="text-2xl font-semibold mb-2">How We Use Your Information</h3>
      <p className="mb-4">
        Your information is used solely to provide better service — including
        communication, process transactions, provide downloads, improve services, and communicate important updates.
      </p>

      <h3 style={{ textAlign: "left", marginTop: "20px" }} className="text-2xl font-semibold mb-2">Payment Information</h3>
      <p className="mb-4">
        Payments are handled by secure third-party providers. We do not store credit card or financial information.
      </p>

      <h3 style={{ textAlign: "left", marginTop: "20px" }} className="text-2xl font-semibold mb-2">Data Security</h3>
      <p className="mb-4">
        We implement modern security measures to protect your data from
        unauthorized access, alteration, or disclosure. However, please note
        that no online platform can guarantee absolute security.
      </p>

      <h3 style={{ textAlign: "left", marginTop: "20px" }} className="text-2xl font-semibold mb-2">Third-Party Services</h3>
      <p className="mb-4">
        We may use trusted third-party services like Firebase, Google Analytics,
        or email tools to operate and analyze site usage. These providers have
        their own privacy policies that comply with industry standards.
      </p>

      <h3 style={{ textAlign: "left", marginTop: "20px" }} className="text-2xl font-semibold mb-2">Your Rights</h3>
      <p className="mb-4">
        You have the right to request, modify, or delete your personal data at
        any time. To make such requests, contact us at{" "}
        <a href="mailto:gogracetech@gmail.com" className="text-blue-600 underline">
          gogracetech@gmail.com
        </a>
        .
      </p>

      <h3 style={{ textAlign: "left", marginTop: "20px" }} className="text-2xl font-semibold mb-2">Updates to This Policy</h3>
      <p className="mb-4">
        We may occasionally update this Privacy Policy to reflect changes in our
        practices or legal requirements. Updated versions will always be posted
        here with a revised effective date.
      </p>

      <p className="mt-8 text-gray-600">
        Last updated: <strong>October 2025</strong>
      </p>
    </LegalLayout>
  );
};

export default Privacy;
