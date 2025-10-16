import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  return (
    <section className='contact contact-page'>
      <h2>Let's Start Something</h2>
      <h6 className='proj-title'>Home / Let's Start Something</h6>

      <Row className='cent-page'>
        <Col md={6} className='contact-right contact-page-right'>
          <h4>Leave A Reply</h4>
          <h5>Your email address will not be published. Required fields are marked *</h5>

          <form
            ref={formRef}
            action="https://formsubmit.co/gogracetech@gmail.com" // Replace with your email
            method="POST"
          >
            {/* Disable captcha by default */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Optional: Redirect to thank-you page */}
            <input type="hidden" name="_next" value="http://localhost:3000/thank-you" />

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
              {
                status &&
                <Col>
                  <p className='success'>{status}</p>
                </Col>
              }
            </Row>
          </form>
        </Col>

        {/* Contact details on the side */}
        <Col md={6} className='contact-left'>
          <h4>Don’t hesitate to reach out to us anytime.</h4>
          <div className='contact-div-display'>
            <div className='about-div' style={{ marginTop: "30px" }}>
              <p><strong>Address</strong></p>
              <h5>Victoria Island, Lagos.</h5>
            </div>
            <div className='about-div' style={{ marginTop: "20px" }}>
              <p><strong>Email</strong></p>
              <h5 className='mail'>gracetechagency@gmail.com</h5>
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
