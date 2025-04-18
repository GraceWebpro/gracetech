import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from './ServiceData';  // Import the services data
import './Services.css'
import { BsArrowRight } from "react-icons/bs";
import defaultImg from '../../assets/dummyImg.jpg'
import { IoIosArrowForward } from "react-icons/io";
import FAQ from './FAQ';
import HomeContact from '../contact/HomeContact';

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
      <p className='serv-script'>Home / <span>{serviceDetails.type}</span></p>
      <div className='serv-det-flex'>
        <div className='serv-det-left'>
          <img src={defaultImg} alt={serviceDetails.name} />
          <div className='serv-left-type'>
            <h3>About {serviceDetails.type}</h3>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, numquam eius modi tempora incidunt ut labore et dolore magnam aliquam

            Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem fugiat quo voluptas nulla the Lorem Ipsum generators on the Internet tend to repeat predefined chunks</p>
          </div>
          
          <div>
            <h3>Specialization & Working Process</h3>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a you need to be sure there isn't anything embarrassing hidden in the middle of text. All the generators on the Internet tend to repeat predefined chunks as necessary, Making this the first true generator on the Internet. It uses a dictionary of over combined with a handful of structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from injected humour, or non-characteristic words etc.</p>
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

              <div className='touch-social serv-social'>
                  <span>Illustration Design</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              <div className='touch-social serv-social'>
                  <span>Branding Business</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              <div className='touch-social serv-social'>
                  <span>Web UI/UX Design</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              <div className='touch-social serv-social'>
                  <span>Application Design</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              <div className='touch-social serv-social'>
                  <span>Digital Marketing</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              <div className='touch-social serv-social'>
                  <span>Web Development</span>
                  <IoIosArrowForward className='touch-icon'/>
              </div>
              
          </div>
          <div className='serv-cont-div'>
            <div className='touch-icon-div'>
                <div className='blur-bg'></div> {/* this is the blurred layer */}

              <div className='touch-social serv-soc serv-social'>
                <span>Contact Me</span>
                <BsArrowRight className='touch-icon serv-icon'/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeContact style={{ marginTop: '80px'}} />
    </div>
  );
};

export default ServiceDetailsPage;
