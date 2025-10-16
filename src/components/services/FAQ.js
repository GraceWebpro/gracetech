import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is your service about?',
    answer: 'We provide high-quality digital marketing services, web design, and development.',
  },
  {
    question: 'How can I contact support?',
    answer: 'You can reach our support team by email at support@example.com or via our contact page.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept payments via credit card, PayPal, and bank transfer.',
  },
  {
    question: 'How long does it take to complete a project?',
    answer: 'The project duration varies depending on the complexity, but typically it takes between 2-4 weeks.',
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container" id='faq'>
      <h2 >Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div className="faq-item" key={index}>
          <button
            className={`faq-question ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFaq(index)}
          >
            <span>{faq.question}</span>
            <span className="faq-icon">
              {activeIndex === index ? '▲' : '▼'}
            </span>
          </button>
          <div
            className={`faq-answer-wrapper ${
              activeIndex === index ? 'open' : ''
            }`}
          >
            <div className="faq-answer">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
