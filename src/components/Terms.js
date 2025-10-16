import React from "react";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <Helmet>
        <title>Terms of Service — GraceTech</title>
        <meta
          name="description"
          content="Our terms and conditions for using our website, resources, and services."
        />
        <link rel="canonical" href="https://gracetech.vercel.app/terms" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      <p className="mb-6 text-gray-700">
        Welcome to GraceTech. By accessing or using our website, you agree to
        comply with and be bound by the following terms and conditions. Please
        read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Use of Our Website</h2>
      <p className="mb-4">
        You agree to use this website only for lawful purposes and in accordance
        with all applicable laws and regulations. Unauthorized use of this
        website may give rise to a claim for damages or be a criminal offense.
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. Intellectual Property</h2>
      <p className="mb-4">
        All designs, logos, and content displayed on this website are the
        property of GraceTech unless stated otherwise. You may not reproduce,
        redistribute, or use any materials without permission.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Limitation of Liability</h2>
      <p className="mb-4">
        GraceTech is not liable for any direct or indirect damages arising from
        the use or inability to use this website or its services.
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. External Links</h2>
      <p className="mb-4">
        This site may contain links to third-party websites. We are not
        responsible for the content or privacy practices of such external sites.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Changes to Terms</h2>
      <p className="mb-4">
        GraceTech reserves the right to modify or replace these Terms of Service
        at any time. Continued use of the site after updates constitutes your
        acceptance of the revised terms.
      </p>

      <p className="mt-8 text-gray-600">
        Last updated: <strong>October 2025</strong>
      </p>
    </main>
  );
};

export default Terms;
