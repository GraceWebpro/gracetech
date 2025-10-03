import React from 'react'
import { BsArrowUpRight } from "react-icons/bs";
import './Services.css'
import { services } from './ServiceData';  // Import services data
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className='services' id='services'>
      <div className='serv-h' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }} data-aos="fade-down">
        <div className='serv-bdr'></div>
        <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, cursive, Arial, "sans-serif"', color: '#0059ff' }}>Our Services</h2>
        <div className='serv-bdr'></div>
      </div>
      <p className='serv-title' data-aos="fade-left" data-aos-duration="1000">Tailored Solutions for Your Business Growth</p>
      <div className='serv-div-display'>
        {services.map((service, index) => (
          <div className='serv-div' key={index} data-aos="fade-left" data-aos-duration="1000">
            <div className='serv-left'>
              <h6>{String(index + 1).padStart(2, '0')}</h6> {/* To show 01, 02, etc. */}
              <div className='serv-text'>
                <p>{service.name}</p>
                <h5>{service.type}</h5>
              </div>
            </div>
            <div id='serv-right'>
              <p>{service.description}</p>
              <div className='serv-icon-div'>
                <Link to={`/services/${service.id}`}> {/* Link to the service detail page */}
                  <BsArrowUpRight className='serv-det-btn' />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
