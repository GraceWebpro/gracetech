import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MailchimpForm from '../newsletter/MailchimpForm'
import logo from '../../assets/my-logo.jpeg'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row className='align-item-canter'>
            <MailchimpForm />
            <Col sm={6}>
                <img src={logo} alt='Logo' width={80} height={80} />
            </Col>
            <Col sm={6} className='text-center text-sm-end'>
                <div className='social-icons'>
                    <a href=''><img src={logo} width={50} height={50}/></a>
                    <a href=''><img src={logo} width={50} height={50}/></a>
                    <a href=''><img src={logo} width={50} height={50}/></a>
                </div>
                <p>Copyright 2025. All Right Reserved</p>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
