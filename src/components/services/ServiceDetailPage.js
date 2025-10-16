import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from './ServiceData';  // Import the services data
import './Services.css'
import { BsArrowRight } from "react-icons/bs";
import defaultImg from '../../assets/dummyImg.jpg'
import { IoIosArrowForward } from "react-icons/io";
import FAQ from './FAQ';
import HomeContact from '../contact/HomeContact';
import { Link } from 'react-router-dom';


const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    // Find the service by ID
    const service = services.find((service) => service.id === id);
    console.log('id:', id);
    console.log('matched service:', services.find((s) => s.id === id));
    setServiceDetails(service);
  }, [id]);

  if (!serviceDetails) {
    return <p>Service not found!</p>;
  }
  
  return (
    <div className='serviceDetails'>
      <h1>{serviceDetails.type}</h1>
      <p className='serv-script'>Home / <span style={{ color: '#20d9a1' }}>{serviceDetails.type}</span></p>
      <div className='serv-det-flex'>
        <div className='serv-det-left'>
          <img src={serviceDetails.image} alt={serviceDetails.name} />
          <div className='serv-left-type'>
            <h3>About {serviceDetails.type}</h3>
            <p>{serviceDetails.about}</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '20px'}}>Specialization & Working Process</h3>
            <ol>
              {serviceDetails.process.map((step, index) => (
                <li key={index} style={{ marginBottom: '30px', marginLeft: '20px' }}><strong>{step.split('–')[0]}</strong> – {step.split('–')[1]}</li>
              ))}
            </ol>
          </div>

          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="serv-video-thumbnail"
          >
            <div className="serv-video-container">
              <img
                src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                alt="YouTube Thumbnail"
                className="serv-video-image"
              />
              <div className="serv-play-button">
                <span className="serv-pulse"></span>
                <span className="serv-triangle"></span>
              </div>
            </div>
          </a>

          <FAQ />
        </div>

        <div className='serv-det-right'>
          <div className='touch-right serv-touch'>
            <h2>Service List</h2>
            <Link to='/services/packaging-design'>
              <div className='touch-social serv-social'>
              
                  <span>Packaging Design</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              </Link>
              <Link to='/services/business-branding'>

              <div className='touch-social serv-social'>
                  <span>Business Branding</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              </Link>
              <Link to='/services/ui-ux-design'>

              <div className='touch-social serv-social'>
                  <span>UI/UX Design</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              </Link>
              <Link to='/services/web-development'>

              <div className='touch-social serv-social'>
                  <span>Web Developement</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              </Link>
              <Link to='/services/seo-optimization'>

              <div className='touch-social serv-social'>
                  <span>SEO Optimization</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              </Link>
              <Link to='/services/social-media-management'>

              <div className='touch-social serv-social'>
                  <span>Social Media Management</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              </Link>

              
          </div>
          {/* <div className='serv-cont-div'>
            <div className='touch-icon-div'>
               
              <div className='touch-social serv-soc serv-social'>
                <span>Contact Me</span>
                <BsArrowRight className='touch-icon serv-icon'/>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <HomeContact id="serv-det-cont" />
    </div>
  );
};

export default ServiceDetailsPage;
