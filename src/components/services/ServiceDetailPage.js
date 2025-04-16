import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from './ServiceData';  // Import the services data
import './Services.css'
import { BsArrowRight } from "react-icons/bs";
import defaultImg from '../../assets/dummyImg.jpg'

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
      <p>Home / {serviceDetails.type}</p>
      <div className='serv-det-flex'>
        <div className='serv-det-left'>
          <img src={defaultImg} alt={serviceDetails.name} />
          <div>
            <h3>About {serviceDetails.type}</h3>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, numquam eius modi tempora incidunt ut labore et dolore magnam aliquam

            Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem fugiat quo voluptas nulla the Lorem Ipsum generators on the Internet tend to repeat predefined chunks</p>
          </div>
          
          <div>
            <h3>Specialization & Working Process</h3>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a you need to be sure there isn't anything embarrassing hidden in the middle of text. All the generators on the Internet tend to repeat predefined chunks as necessary, Making this the first true generator on the Internet. It uses a dictionary of over combined with a handful of structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from injected humour, or non-characteristic words etc.</p>
          </div>
        </div>

        <div className='serv-det-right'>
          <div className='touch-right'>
          <h2>Service List</h2>

              <div className='touch-social'>
                  <span>Illustration Design</span>
                  <BsArrowRight className='touch-icon'/>
              </div>
              <div className='touch-social'>
                  <span>Branding Business</span>
                  <BsArrowRight className='touch-icon'/>
              </div>
              <div className='touch-social'>
                  <span>Web UI/UX Design</span>
                  <BsArrowRight className='touch-icon'/>
              </div>
              <div className='touch-social'>
                  <span>Application Design</span>
                  <BsArrowRight className='touch-icon'/>
              </div>
              <div className='touch-social'>
                  <span>Digital Marketing</span>
                  <BsArrowRight className='touch-icon'/>
              </div>
              <div className='touch-social'>
                  <span>Web Development</span>
                  <BsArrowRight className='touch-icon'/>
              </div>
              
          </div>
          <div>
            <div>
            <div className='touch-social'>
                  <span>Contact Me</span>
                  <BsArrowRight className='touch-icon'/>
              </div>
            </div>
          </div>

        </div>
      </div>
      <p>{serviceDetails.description}</p>
    </div>
  );
};

export default ServiceDetailsPage;
