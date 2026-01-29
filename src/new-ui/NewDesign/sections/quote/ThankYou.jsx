import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../animations/FadeIn';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-16 mt-14">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-10 mx-auto">

        {/* Header */}
        <FadeIn delay={200}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            Thank You for Reaching Out!
          </h1>
          <p className="text-white/70 text-base sm:text-lg mt-4 text-center">
            We’ve received your quote request. Our team will review it and get back to you within <strong>24–48 hours</strong>.
          </p>
        </FadeIn>

        {/* Next Steps */}
        <FadeIn delay={400}>
          <div className="text-left sm:text-left space-y-3 sm:space-y-2">
            <h2 className="text-2xl font-semibold text-white mb-2">What’s Next?</h2>
            <ul className="list-disc list-inside text-white/60 space-y-1 sm:space-y-0.5 text-sm sm:text-base">
              <li>📧 You’ll receive an email confirmation soon.</li>
              <li>💬 Our team may reach out to clarify your requirements.</li>
              <li>🛠️ We’ll prepare a personalized proposal based on your input.</li>
            </ul>
          </div>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={600}>
          <div className="flex flex-col sm:flex-row text-center justify-center gap-4 mt-6">
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#7d52fd] to-[#ffffff] text-black font-medium rounded-xl hover:opacity-90 transition text-center"
            >
              View Our Work
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition text-center"
            >
              Need Help? Contact Us
            </Link>
          </div>
        </FadeIn>

        {/* Socials */}
        <FadeIn delay={800}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-white/70 mb-2 sm:mb-0">Follow us:</p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#7d52fd] transition text-white/70"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#7d52fd] transition text-white/70"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#7d52fd] transition text-white/70"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};

export default ThankYou;
