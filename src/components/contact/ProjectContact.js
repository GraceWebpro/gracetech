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
import call from '../../assets/meet.png'
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import emailjs from '@emailjs/browser';



const ProjectContact = () => {
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
      
        try {
          await emailjs.send(
            "service_nnrou8o",
            "template_l2yg57v",
            {
              first_name: formDetails.firstName,
              last_name: formDetails.lastName,
              email: formDetails.email,
              phone: formDetails.phone,
              message: formDetails.message,
            },
            "V8YbTK6Cu4MlPG6Q0"
          );
      
          setStatus({
            success: true,
            message: "Message sent successfully 🎉"
          });
      
          setFormDetails(formInitialDetails);
        } catch (error) {
          setStatus({
            success: false,
            message: "Failed to send message. Please try again."
          });
        }
      
        setButtonText("Send");
      };
      
  return (
    <section className='meeting' id='connect'>
        
        <div className='meet-left'>
            <div className='meet-h' style={{ display: 'flex', gap: '20px', alignItems: 'center',}} data-aos="fade-down">
              <div className='cont-bdr'></div>
              <h2 style={{ textAlign: 'center', color: "#fff", fontFamily: 'Dancing Script, cursive, Arial, "sans-seriff"' }}>Need a Project?</h2>

            </div>
            <div className='meet-pa'>
                <h4 data-aos="fade-left" data-aos-duration="1000" className='meet-title'>Let's Work Together. Fix A Meeting</h4>
            </div>
            <div className='meet-div-display'>
                <div className='meet-div' data-aos="fade-left" data-aos-duration="1000">
                    <div className='meet-icon-div'>
                    <IoMailOutline className='meet-icon'/>

                    </div>
                    <div className='proj-cont-left' style={{ flexDirection: 'column' }}>
                      <p style={{ textAlign: "left"}}><strong>Email</strong> </p>
                      <h6>gogracetech@gmail.com</h6>
                    </div>
                </div>
                <div className='meet-div' data-aos="fade-left" data-aos-duration="1000">
                    <div className='meet-icon-div'>
                    <IoLogoWhatsapp className='meet-icon'/>

                    </div>
                    <div className='proj-cont-left' style={{ flexDirection: 'column' }}>
                      <p style={{ textAlign: "left"}}><strong>WhatsApp</strong> </p>
                      <h6>+234 704 342 1913</h6>
                    </div>
                </div>
            </div>
        </div>
        <img src={call} alt='call' className='meet-img'/>
        {status.message && (
  <p className={status.success ? "success" : "error"}>
    {status.message}
  </p>
)}
    </section>
  )
}

export default ProjectContact
