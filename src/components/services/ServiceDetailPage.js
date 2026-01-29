import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from './ServiceData';  // Import the services data
import './Services.css'
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import FAQ from './FAQ';
import HomeContact from '../../new-ui/NewDesign/sections/HomeContact';
import { Link } from 'react-router-dom';


const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    // Find the service by ID
    const service = services.find((service) => service.id === id);
    
    setServiceDetails(service);
  }, [id]);

  if (!serviceDetails) {
    return <p>Service not found!</p>;
  }
  
  return (
    <div className='serviceDetails'>
      <h1>{serviceDetails.type}</h1>
      <p className="serv-script">
        <Link to="/">Home</Link> / <span style={{ color: '#5f39ff' }}>{serviceDetails.type}</span>
      </p>      
      <div className='serv-det-flex'>
        <div className='serv-det-left'>
          <img src={serviceDetails.image} alt={serviceDetails.name} />
          <div className='serv-left-type'>
            <h3 className="text-xl font-medium text-white mb-3">
              What this service delivers
            </h3>
            <p className="text-white/60 leading-relaxed">
              {serviceDetails.about}
            </p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '20px'}}>How This Service Works</h3>
            <ol>
              {serviceDetails.process.map((step, index) => (
                <li key={index} style={{ marginBottom: '30px', marginLeft: '20px' }}><strong>{step.split('–')[0]}</strong> – {step.split('–')[1]}</li>
              ))}
            </ol>
            <ol className="space-y-6 ml-5">
              {serviceDetails.process.map((step, index) => {
                const [title, desc] = step.split('–');
                return (
                  <li key={index}>
                    <strong>{title}</strong> — {desc}
                  </li>
                );
              })}
            </ol>
            <div className="space-y-4">
              {serviceDetails.process.map((step, index) => (
                <div key={index} className="border-l border-primary/30 pl-4">
                  <p className="text-white/80 font-medium mb-1">
                    {step.split('–')[0]}
                  </p>
                  <p className="text-white/60 text-sm">
                    {step.split('–')[1]}
                  </p>
                </div>
              ))}
            </div>

          </div>

          <div className="serv-cta">
            <h3>Interested in this service?</h3>
            <p>Tell me about your project and I’ll get back to you with next steps.</p>
            <Link to="/get-a-quote" className="serv-cta-btn">
              Get a Quote
            </Link>
          </div>


          <FAQ />
        </div>

        <div className='serv-det-right'>
          <div className="sticky top-28 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Services
              </h3>

              <div className="space-y-2">
                {services.map((service) => {
                  const isActive = service.id === id;

                  return (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300
                        ${
                          isActive
                            ? 'bg-primary/10 border-primary/40 text-primary'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-primary/30 hover:bg-white/10'
                        }
                      `}
                    >
                      <span className="text-sm font-medium">
                        {service.type}
                      </span>

                      <IoIosArrowForward
                        className={`w-4 h-4 transition-transform duration-300
                          ${
                            isActive
                              ? 'translate-x-1 text-primary'
                              : 'group-hover:translate-x-1 text-white/40 group-hover:text-primary'
                          }
                        `}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeContact id="serv-det-cont" />
    </div>
  );
};

export default ServiceDetailsPage;
