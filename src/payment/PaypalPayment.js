import React from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../server/firebase"; // adjust this path based on your project
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ amount, template, user, onSuccess }) => {

  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  const savePaymentDetails = async (details) => {
    const paymentData = {
      templateId: template.id,
      templateName: template.name,
      amountPaid: amount,
      transactionId: details.id,
      payerEmail: details.payer.email_address,
      payerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
      userId: user?.uid || null,
      purchaseDate: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'payments'), paymentData);
      console.log("Payment saved to Firestore");
    } catch (error) {
      console.error("Error saving payment:", error);
    }
  };
  
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
            savePaymentDetails(details);
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
