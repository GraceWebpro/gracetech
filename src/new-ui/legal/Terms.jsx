import React from "react";
import { Helmet } from "react-helmet-async";
import LegalLayout from "./LegalLayout";

const Terms = () => {
  return (
    <LegalLayout title="Terms & Conditions">  
      <Helmet>
        <title>Terms of Service — GraceTech</title>
        <meta
          name="description"
          content="Our terms and conditions for using our website, resources, and services."
        />
        <link rel="canonical" href="https://gracetech.vercel.app/terms" />
      </Helmet>

      <p>
        These Terms & Conditions govern your use of GraceTech Agency's website,
        services, and digital products. By accessing or purchasing from this
        website, you agree to comply with these terms.
      </p>

      <div>
        <h2 className="text-white font-semibold mb-2">1. Use of Website</h2>
        <p>
          You agree to use this website only for lawful purposes. You may not
          misuse, copy, distribute, or exploit any content without written
          permission.
        </p>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">2. Digital Products</h2>
        <p>
          All templates and downloadable products are digital goods. Upon
          purchase, you receive a non-exclusive license to use the product
          according to our License Agreement.
        </p>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">3. Payments</h2>
        <p>
          Payments are processed securely via third-party payment providers.
          GraceTech Agency does not store payment details.
        </p>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">4. Intellectual Property</h2>
        <p>
          All website content, branding, designs, templates, and materials are
          the intellectual property of GraceTech Agency and may not be
          reproduced without permission.
        </p>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">5. Limitation of Liability</h2>
        <p>
          We are not liable for any indirect, incidental, or consequential
          damages arising from the use of our products or services.
        </p>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use
          of the website constitutes acceptance of updated terms.
        </p>
      </div>
      <p className="mt-8 text-gray-600">
        Last updated: <strong>October 2025</strong>
      </p>
    </LegalLayout>
  );
};

export default Terms;
