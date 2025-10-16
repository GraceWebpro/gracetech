// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 px-4">
      <Helmet>
        <title>Page Not Found | GraceTech</title>
        <meta name="description" content="Oops! The page you’re looking for doesn’t exist on GraceTech." />
      </Helmet>

      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
