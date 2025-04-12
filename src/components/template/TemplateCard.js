import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Link } from 'react-router-dom';
import PayPalPayment from '../../payment/PaypalPayment';

const TemplateCard = ({ id, title, description, price, imageUrl, templateType }) => {
  const handlePaymentSuccess = (data, actions) => {
    // You can call your backend API to process the payment and then
    // trigger the appropriate action based on template type.
    console.log("Payment Successful:", data);

    // Depending on the template type, trigger the necessary action.
    if (templateType === 'Figma') {
      // Trigger Figma download
      alert('Figma template purchased, download now.');
    } else if (templateType === 'HTML') {
      // Trigger HTML file download
      alert('HTML template purchased, download now.');
    } else if (templateType === 'Bubble' || templateType === 'FlutterFlow') {
      // Trigger app transfer to Bubble/FlutterFlow
      alert('App purchased, transferring to your Bubble account.');
    }
  };


  return (
    <div className="template-card">
      <div className="template-img-container">
        <img src={imageUrl} alt={title} className="template-img" />
        <div className="template-type">{templateType}</div>
      </div>
      <div className="template-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{`Price: $${price.toFixed(2)}`}</p>      
      </div>
      <div className="template-footer">
        <Link to={`/project-details/${id}`} className="view-details-btn">
          View Details
        </Link>

        {/* PayPal Payment Button */}
        <PayPalPayment amount={price.toFixed(2)}
  onSuccess={handlePaymentSuccess} />
      </div>
    </div>
  );
};

export default TemplateCard;
