import React from 'react';
import { Link } from 'react-router-dom';
import { services } from './ServiceData';  // Import the services data

const ServicesSection = () => (
  <div>
    <h2>Our Services</h2>
    {services.map((service) => (
      <div key={service.id}>
        <h3>{service.name}</h3>
        <Link to={`/services/${service.id}`}>→</Link>
      </div>
    ))}
  </div>
);

export default ServicesSection;
