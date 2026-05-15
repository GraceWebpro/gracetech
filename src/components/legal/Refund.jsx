import React from "react";
import LegalLayout from "./LegalLayout";

const Refund = () => {
  return (
    <LegalLayout title="Refund Policy">

      <p>
        Due to the digital nature of our products, all sales are final.
      </p>

      <div>
        <h2 className="text-white font-semibold mb-2">1. Digital Downloads</h2>
        <p>
          Once a template or digital product has been downloaded or accessed,
          it cannot be returned or refunded.
        </p>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">2. Exceptions</h2>
        <p>
          Refunds may be considered only if:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>The file is corrupted and cannot be accessed.</li>
          <li>You were charged multiple times for the same product.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-white font-semibold mb-2">3. Contact</h2>
        <p>
          For refund requests, contact support within 7 days of purchase with
          proof of transaction.
        </p>
      </div>

    </LegalLayout>
  );
};

export default Refund;
