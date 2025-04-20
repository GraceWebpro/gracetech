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
    <section className='meeting' id='connect'>
        
        <div className='meet-left'>
            <div className='meet-h' style={{ display: 'flex', gap: '20px', alignItems: 'center',}} data-aos="fade-down">
              <div className='cont-bdr'></div>
              <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, "sans-seriff"' }}>Need a Project?</h2>

            </div>
            <div className='meet-pa'>
                <h4 data-aos="fade-up" className='meet-title'>Let's Work Together. Fix A Meeting</h4>
            </div>
            <div className='meet-div-display'>
                <div className='meet-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='meet-icon-div'>
                    <IoMailOutline className='meet-icon'/>

                    </div>
                    <div className='proj-cont-left' style={{ flexDirection: 'column' }}>
                      <p><strong>Email</strong> </p>
                      <h6>gracetechagency@gmail.com</h6>
                    </div>
                </div>
                <div className='meet-div' data-aos="zoom-in-up" data-aos-duration="500">
                    <div className='meet-icon-div'>
                    <IoLocationOutline className='meet-icon'/>

                    </div>
                    <div className='proj-cont-left' style={{ flexDirection: 'column' }}>
                      <p><strong>Location</strong> </p>
                      <h6>Victoria Island, Lagos.</h6>
                    </div>
                </div>
            </div>
        </div>
        <img src={call} alt='call' className='meet-img'/>
    </section>
  )
}

export default ProjectContact
