import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../server/firebase";

export default function BackendRequestModal({
  isOpen,
  onClose,
  template
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    deadline: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "backendRequests"), {
        ...form,
        templateId: template.id,
        templateName: template.title,
        templateSlug: template.slug,
        createdAt: serverTimestamp(),
        status: "new"
      });

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 relative animate-fadeIn">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-2">
              Backend Integration Request
            </h2>

            <p className="text-gray-500 mb-6">
              Tell us about your project. We’ll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <select
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) =>
                  setForm({ ...form, budget: e.target.value })
                }
              >
                <option value="">Select Budget Range</option>
                <option>$100 – $300</option>
                <option>$300 – $800</option>
                <option>$800 – $2,000</option>
                <option>$2,000+</option>
              </select>

              <input
                type="date"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) =>
                  setForm({ ...form, deadline: e.target.value })
                }
              />

              <textarea
                required
                placeholder="Describe your project requirements..."
                className="w-full border rounded-xl p-3 h-28 resize-none focus:ring-2 focus:ring-black outline-none"
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>

            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-2xl font-bold mb-2">
              Request Sent Successfully
            </h3>
            <p className="text-gray-500">
              We’ll contact you within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}