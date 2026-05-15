import React from "react";
import LegalLayout from "./LegalLayout";

const License = () => {
  return (
    <LegalLayout title="Template License Agreement">

      <p>
        This License Agreement governs the use of digital templates purchased
        from GraceTech Agency.
      </p>

      <div>
        <h2 className="text-white font-semibold mb-2">1. Grant of License</h2>
        <p>
          Upon purchase, you are granted a non-exclusive, non-transferable
          license to use the template for personal or commercial projects.
        </p>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">2. Permitted Uses</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use in personal projects</li>
          <li>Use in commercial client projects</li>
          <li>Modify for your own use</li>
        </ul>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">3. Prohibited Uses</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Reselling or redistributing the template</li>
          <li>Sharing files publicly or privately</li>
          <li>Claiming authorship of the original design</li>
        </ul>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">4. Ownership</h2>
        <p>
          All templates remain the intellectual property of GraceTech Agency.
        </p>
      </div>

    </LegalLayout>
  );
};

export default License;
