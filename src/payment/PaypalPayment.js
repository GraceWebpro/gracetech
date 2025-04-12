import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ amount, onSuccess }) => {

  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
