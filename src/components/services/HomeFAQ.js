import React, { useState } from 'react';

const faqData = [
  {
    question: 'What services do you offer?',
    answer: 'We provide high-quality digital services including web development, app creation, branding, and custom solutions based on your project needs. Each service is designed to give you a smooth and professional experience.',
  },
  {
    question: 'How long does it take to complete a project?',
    answer: 'Project timelines vary depending on the complexity, but most projects are delivered within a few days to a couple of weeks. I will always communicate clearly and keep you updated throughout the process.',
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Yes. We provide revisions to make sure you’re fully satisfied with the final outcome. The number of revisions depends on the service you choose.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply contact us through the website or send your project details. Once we understand your requirements, We’ll guide you through the next steps and begin the process immediately.',
  },
  {
    question: 'What if I have a custom request?',
    answer: 'No problem. If you need something unique or not listed in the services, just reach out. We’m happy to create tailored solutions that match your exact vision.',
  },
];

const HomeFaq = () => {
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
            <div className="faq-answer" style={{ textAlign: "left"}}>{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFaq;
