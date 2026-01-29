import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../../data/ServiceData';  // Import the services data
import './work.css'
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import FAQ from '../ui/FAQ';
import HomeContact from './HomeContact';
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
      {/* <h1>{serviceDetails.type}</h1> */}
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
          
            <div className="space-y-4">
              {serviceDetails.process.map((step, index) => (
                <div key={index} className="border-l border-primary/30 pl-5 mb-6">
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

          <div className="mt-16 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-8 py-10 text-center">
  
          {/* soft glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-50 pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">
              Interested in this service?
            </h3>

            <p className="text-white/60 mb-8 leading-relaxed">
              Tell me about your project and I’ll get back to you with clear next steps.
            </p>

            <Link
              to="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-8 py-3 text-white font-medium
                        hover:bg-primary/20 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/30
                        transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>



          {serviceDetails.faq && (
            <FAQ items={serviceDetails.faq} />
          )}
        </div>

        <div className='serv-det-right w-full md:w-80 lg:w-96 flex-shrink-0'>
  <div className="sticky top-28 space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
      
      <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">
        Services
      </h3>

      <div className="space-y-3">
        {services.map((service) => {
          const isActive = service.id === id;

          return (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
              className={`group flex justify-between items-center px-6 py-4 rounded-xl border transition-all duration-300
                ${isActive
                  ? 'bg-primary/10 border-primary/40 text-primary'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-primary/30 hover:bg-white/10'
                }
              `}
            >
              <span className="text-sm md:text-base font-medium" style={{ marginLeft: '20px'}}>
                {service.type}
              </span>

              <IoIosArrowForward
              style={{ marginRight: '20px'}}
                className={`w-5 h-5 transition-transform duration-300
                  ${isActive
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
