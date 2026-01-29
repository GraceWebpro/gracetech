import React from 'react';
import './Quote.css';

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <h1>Thank You for Reaching Out!</h1>
        <p className="subtext">
          We’ve received your quote request, and our team will review it shortly.
          Expect a reply within <strong>24–48 hours</strong>.
        </p>

        <div className="next-steps">
          <h2>What’s Next?</h2>
          <ul>
            <li>📧 You’ll receive an email confirmation soon.</li>
            <li>💬 Our team may reach out to clarify your needs.</li>
            <li>🛠️ We’ll prepare a personalized proposal based on your input.</li>
          </ul>
        </div>

        <div className="cta-section">
          <p>While you wait, why not:</p>
          <ul>
            <li>🚀 Check out our <a href="/blog">latest blog post</a></li>
            <li>🔍 Explore our <a href="/services">services</a> for more info</li>
          </ul>
        </div>

        <div className="links-section">
          <a href="/portfolio" className="btn-primary">View Our Work</a>
          <a href="/contact" className="btn-secondary">Need Help? Contact Us</a>
        </div>

        <div className="footer-links">
          <p>Follow us:</p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
