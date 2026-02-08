// src/components/PayPalPayment.js
import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../server/firebase"; // adjust path if needed
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = ({ amount, template, user, onSuccess }) => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error("PayPal client ID is missing in .env");
    return <p>Payment system not configured.</p>;
  }

  if (!user?.uid) return <p>Please log in to make a payment.</p>;
  if (!template?.downloadUrl) return <p>Template file not available.</p>;

  // Save payment to Firestore
  const savePaymentDetails = async (details) => {
    const paymentData = {
      templateId: template.id,
      templateName: template.title,
      amountPaid: template.priceUSD,
      fileUrl: template.fileUrl || template.downloadUrl,
      transactionId: details.id,
      payerEmail: details.payer.email_address,
      payerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
      userId: user?.uid || null,
      purchaseDate: serverTimestamp(),
      status: details.status,
    };

    try {
      await addDoc(collection(db, "payments"), paymentData);
      console.log("Payment saved to Firestore");
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Payment succeeded but saving to database failed. Contact support.");
    }
  };

  // Handle successful payment
  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();

      await savePaymentDetails(details);

      if (onSuccess) onSuccess(details);

      // Auto-download template
      const link = document.createElement("a");
      link.href = template.downloadUrl;
      link.setAttribute("download", `${template.title}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Payment successful! Your download will start shortly.");
    } catch (error) {
      console.error("PayPal payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId, currency: "USD" }}>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          if (!template?.priceUSD) return alert("Price not available");

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: template.priceUSD.toFixed(2)
                }
              }
            ],
          });
        }}
        onApprove={handleApprove}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          alert("Payment could not be completed. Please try again.");
        }}
        onCancel={() => alert("Payment cancelled.")}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
