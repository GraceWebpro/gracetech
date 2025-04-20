import React from 'react'
import './Contact.css'
import { BsArrowRight } from "react-icons/bs";

const HomeContact = () => {
   

  return (
    <section className='contact' id='connect'>
     
      
      <h2 className='touch-h2' data-aos="fade-up" 
     data-aos-duration="1500">Get In Touch</h2>
     <div className='touch-content'>
        <div className='touch-left'>
         
              <h2>
              Hello, we are Grace Wilson and the team of expert Website & User Interface Designers, based in London, committed to delivering exceptional digital experiences.                </h2>

              <h3>gracetechagency@gmail.com</h3>

            
            
        </div>
        <div className='touch-right'>
            <div className='touch-social'>
                <span>Facebook</span>
                <BsArrowRight className='touch-icon'/>
            </div>
            <div className='touch-social'>
                <span>Tiktok</span>
                <BsArrowRight className='touch-icon'/>
            </div>
            <div className='touch-social'>
                <span>Instagram</span>
                <BsArrowRight className='touch-icon'/>
            </div>
            <div className='touch-social'>
                <span>Twitter</span>
                <BsArrowRight className='touch-icon'/>
            </div>
            <div className='touch-social'>
                <span>LinkedIn</span>
                <BsArrowRight className='touch-icon'/>
            </div>
            <div className='touch-social'>
                <span>WhatsApp</span>
                <BsArrowRight className='touch-icon'/>
            </div>
            
        </div>
      </div>
    </section>
  )
}

export default HomeContact
