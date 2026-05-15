import React from 'react';
import FadeIn from '../animations/FadeIn';

const StatusPopup = ({ message, success, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <FadeIn delay={100}>
        <div className="bg-black/90 border border-primary/30 rounded-2xl p-8 max-w-lg w-full text-center shadow-xl">
          
          {/* Icon */}
          <div className={`mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full 
            ${success ? 'bg-green-600' : 'bg-red-600'}`}>
            {success ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          {/* Message */}
          <h2 className="text-2xl font-semibold text-white mb-2">
            {success ? 'Thank You!' : 'Oops!'}
          </h2>
          <p className="text-white/70 mb-4">
            {message}
          </p>

          {/* Next Steps (only show for success) */}
          {success && (
            <div className="text-left text-white/70 mb-4">
              <h3 className="font-medium mb-2">Next Steps:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>📧 We’ll review your request within 24–48 hours.</li>
                <li>💬 Our team may contact you for clarification.</li>
                <li>🛠️ You’ll receive a personalized proposal soon.</li>
              </ul>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={onClose}
            className="mt-4 px-6 py-3 bg-primary text-black font-medium rounded-xl hover:opacity-90 transition-all"
          >
            Close
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

export default StatusPopup;
