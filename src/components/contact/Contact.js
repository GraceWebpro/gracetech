import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Contact.css';
import { Helmet } from "react-helmet-async";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  const StatusPopup = ({ message, onClose, success }) => {
    if (!message) return null; // don't render if no message
  
    return (
      <div className="status-popup-overlay">
        <div className={`status-popup ${success ? 'success' : 'error'}`}>
          <p>{message}</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await emailjs.send(
        "service_nnrou8o",   // Replace with your EmailJS service ID
        "template_l2yg57v",  // Replace with your EmailJS template ID
        {
          first_name: formRef.current.firstName.value,
          last_name: formRef.current.lastName.value,
          email: formRef.current.email.value,
          phone: formRef.current.phone.value,
          message: formRef.current.message.value,
        },
        "V8YbTK6Cu4MlPG6Q0"    // Replace with your EmailJS public key
      );

      setStatus("Message sent successfully 🎉");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Please try again.");
    }
    setTimeout(() => {
      setStatus('');
    }, 5000); // disappears after 5 seconds
    
  };



  

  return (
    <section className='contact contact-page'>
      <Helmet>
        <title>Contact GraceTech</title>
        <meta
          name="description"
          content="Get in touch with GraceTech for UI/UX design and web development projects."
        />
        <link rel="canonical" href="https://gracetech.vercel.app/contact" />
      </Helmet>

       {/* Popup */}
       <StatusPopup
        message={status}
        success={status.includes("successfully")}
        onClose={() => setStatus('')}
      />

      <h2>Let's Start Something</h2>
      <h6 className='proj-title'>Home / Let's Start Something</h6>

      <Row className='cent-page'>
        <Col md={6} className='contact-right contact-page-right'>
          <h4>Leave A Reply</h4>
          <h5>Your email address will not be published. Required fields are marked *</h5>

          <form ref={formRef} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <input type="text" name="firstName" placeholder="First Name" required />
              </Col>
              <Col sm={6}>
                <input type="text" name="lastName" placeholder="Last Name" required />
              </Col>
              <Col sm={6}>
                <input type="email" name="email" placeholder="Email Address" required />
              </Col>
              <Col sm={6}>
                <input type="tel" name="phone" placeholder="Phone Number" />
              </Col>
              <Col>
                <textarea name="message" rows={6} placeholder="Message" required />
                <button type="submit">Send</button>
              </Col>
             
            </Row>
          </form>
        </Col>

        {/* Contact details */}
        <Col md={6} className='contact-left'>
          <h4>Don’t hesitate to reach out to us anytime.</h4>
          <div className='contact-div-display'>
            <div className='about-div' style={{ marginTop: "20px" }}>
              <p><strong>Email</strong></p>
              <h5 className='mail'>gogracetech@gmail.com</h5>
            </div>
            <div className='about-div' style={{ marginTop: "20px" }}>
              <p><strong>Phone</strong></p>
              <h5>+234 704 343 1913</h5>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Contact;
