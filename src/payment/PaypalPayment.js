import React from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
      purchaseDate: serverTimestamp(),
      status: details.status,    
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
        
            // Auto-download after successful payment
            const link = document.createElement("a");
            link.href = template.fileUrl;
            link.download = `${template.name}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        
            alert("Payment successful! Your download will start shortly.");
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
