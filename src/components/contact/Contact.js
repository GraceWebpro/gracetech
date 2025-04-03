import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import img from '../../assets/dev2.png'
import './Contact.css'
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp, IoLogoInstagram } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const Contact = () => {
    const formInitialDetails = {
        firstName: "",
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText("Send");
        let result = response.json();
        setFormDetails(formInitialDetails);
        if(result.code === 200) {
            setStatus({ success: true, message: "Message sent successfully"});
        } else {
            setStatus({ success: false, message: "Something went wrong, please try again later."});
        }
    }

  return (
    <section className='contact' id='connect'>
      <div>
      <h2 data-aos="fade-up" 
     data-aos-duration="1500">Get In Touch</h2>
      <h4 data-aos="fade-up" className='proj-title'>Have a question or a project in mind? Fill out the form, and let's connect!</h4>

        <Row className='cent'>
            <Col md={6} className='contact-left'>
                 <h4>Let's work together. fixed a meeting</h4>
                 <div className='contact-div' data-aos="fade-up-right">
                    <Col sm={6} className='px-1 flex'>
                        <FaLocationDot className='iconn'/> 
                        <p>Lagos, Nigeria</p>
                    </Col>
                    <Col sm={6} className='px-1 flex'>
                        <IoLogoWhatsapp className='iconn'/> 
                        <p>+2348021357359</p>
                    </Col>
                    <Col sm={6} className='px-1 flex'>
                        <MdEmail className='iconn'/> 
                        <p>gracietechdigital@proton.me</p>
                    </Col>
                 </div>
                 <div className='contact-div' data-aos="fade-up-right">
                    <h5>Follow us on social media</h5>
                    <Col sm={6} className='px-1 flex'>
                    <Link
                        to="contact"
                        className="nav__link"
                        >
                        <AiOutlineTikTok className='icon2'/> 
                    </Link>
               
                   
                    <Link
                        to="contact"
                        className="nav__link"
                        >
                        <IoLogoInstagram className='icon2'/> 
                    </Link>
               
                   
                    <Link
                        to="contact"
                        className="nav__link"
                        >
                        <FaFacebook className='icon2'/> 
                    </Link>
                    </Col>
                    
                 </div>
            </Col>
            <div className='contact-right'>
                
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={6} className='px-1'>
                            <input type='text' value={formDetails.firstName} placeholder='First Name' onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                        </Col>
                        <Col sm={6} className='px-1'>
                            <input type='text' value={formDetails.lastName} placeholder='Last Name' onChange={(e) => onFormUpdate('lastName', e.target.value)} />

                        </Col>
                        <Col sm={6} className='px-1'>
                            <input type='email' value={formDetails.email} placeholder='Email Address' onChange={(e) => onFormUpdate('email', e.target.value)} />

                        </Col>
                        <Col sm={6} className='px-1'>
                            <input type='tel' value={formDetails.phone} placeholder='Phone Number' onChange={(e) => onFormUpdate('phone', e.target.value)} />

                        </Col>
                        <Col>
                            <textarea rows={6} value={formDetails.message} placeholder='Message' onChange={(e) => onFormUpdate('message', e.target.value)} />
                            <button type='submit'><span>{buttonText}</span></button>
                        </Col>
                        {
                            status.message &&
                            <Col>
                                <p className={status.success === false ? 'danger' : 'success'}>{status.message}</p>
                            </Col>
                        }

                    </Row>
                </form>
            </div>
        </Row>
      </div>
    </section>
  )
}

export default Contact
