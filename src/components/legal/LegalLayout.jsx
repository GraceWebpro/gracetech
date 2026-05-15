import React from "react";
import { Helmet } from "react-helmet-async";

const LegalLayout = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title} | GraceTech Agency</title>
        <meta
          name="description"
          content={`${title} for GraceTech Agency digital products and services.`}
        />
      </Helmet>

      <section className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-24 py-20 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-10">
            {title}
          </h1>

          <div className="space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalLayout;
