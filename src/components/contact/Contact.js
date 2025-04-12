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
    <section className='contact contact-page'>
      <div>
      
      <h2 data-aos="fade-up" 
     data-aos-duration="1500">Lets Start Something</h2>
      <h6 data-aos="fade-up" className='proj-title' style={{ textAlign: 'center', fontFamily: 'Dancing Script, "sans-seriff"', color: '#fff', fontWeight:'300' }}><span style={{ color: '#0059ff'}}>Home</span> / Let's Start Something</h6>

        <Row className='cent-page'>
            
            <Col md={6} className='contact-right contact-page-right'>
                <h4>Leave A Reply</h4>
                <h5>Your email address will not be published. Required fields are marked *</h5>
               
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
            </Col>
            <Col md={6} className='contact-left'>
                    <h4>Don’t hesitate to reach out to us anytime.</h4>
                    <div className='contact-div-display'>
                    <div className='about-div contact-div-page' data-aos="zoom-in-up" data-aos-duration="500">
                        <p><strong>Address</strong> </p>
                        <h5>Victoria Highland, Lagos.</h5>

                    </div>
                    <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                        <p><strong>Email</strong> </p>
                        <h5 className='mail'>gracietechdigital@proton.me</h5>

                    </div>
                    <div className='about-div' data-aos="zoom-in-up" data-aos-duration="500">
                        <p><strong>Phone</strong> </p>
                        <h5>+2348021357359</h5>

                    </div>
                    </div>

            </Col>
           
            
        </Row>
      </div>
    </section>
  )
}

export default Contact
