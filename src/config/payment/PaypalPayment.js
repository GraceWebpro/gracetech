// src/components/PayPalPayment.js
import React from "react";
import { supabase } from "../../config/supabase";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = ({ amount, template, user, version = "pro", onSuccess }) => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  const selectedVersion = template.versions?.[version];

  if (!clientId) {
    console.error("PayPal client ID is missing in .env");
    return <p>Payment system not configured.</p>;
  }

  if (!user?.id) return <p>Please log in to make a payment.</p>;
  if (!selectedVersion?.downloadUrl) return <p>Template file not available.</p>;

  /* ================= SAVE PAYMENT TO SUPABASE ================= */
  const savePaymentDetails = async (details) => {
    const paymentData = {
      template_id: template.id,
      template_name: template.title,
      amount_paid: selectedVersion.price,
      file_url: selectedVersion.downloadUrl,
      version,
      transaction_id: details.id,
      payer_email: details.payer.email_address,
      payer_name: `${details.payer.name.given_name} ${details.payer.name.surname}`,
      user_id: user?.id,
      purchase_date: new Date().toISOString(),
      status: details.status,
    };

    const { error } = await supabase
      .from("payments")
      .insert([paymentData]);

    if (error) {
      console.error("Error saving payment:", error);
      alert("Payment succeeded but saving failed. Contact support.");
    } else {
      console.log("Payment saved to Supabase");
    }
  };

  /* ================= HANDLE PAYMENT SUCCESS ================= */
  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();

      await savePaymentDetails(details);

      if (onSuccess) onSuccess(details);

      // Auto-download after payment
      const link = document.createElement("a");
      link.href = selectedVersion.downloadUrl;
      link.setAttribute("download", `${template.title}-${version}.zip`);
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
          if (!selectedVersion?.price) {
            alert("Price not available");
            return;
          }

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: selectedVersion.price.toFixed(2),
                },
              },
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