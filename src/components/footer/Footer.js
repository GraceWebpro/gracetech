import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MailchimpForm from '../newsletter/MailchimpForm'
import logo from '../../assets/my-logo.jpeg'
import './Footer.css'
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row className='align-item-canter'>
          
            <MailchimpForm />
            <Col sm={6}>
                {/*<img src={logo} alt='Logo' width={80} height={80} />*/}
            </Col>
            <Col sm={6} className='text-center text-sm-end'>
                <div className='social-icons'>
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
                <p>Copyright 2025. All Right Reserved</p>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
