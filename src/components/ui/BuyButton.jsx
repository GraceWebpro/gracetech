import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { supabase } from "../../config/supabase";

const BuyButton = ({ product }) => {
  const [email, setEmail] = useState("");

  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: product.price,
    currency: "NGN",
    customer: {
      email: email,
    },
    customizations: {
      title: product.title,
    },
  };

  const handlePayment = useFlutterwave(config);

  return (
    <div>
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        disabled={!email}
        onClick={() => {
          handlePayment({
            callback: async (response) => {
              console.log("Payment response:", response);

              // ⚠️ VERIFY STATUS FIRST (basic check)
              if (response.status === "successful") {

                // SAVE TO SUPABASE DIRECTLY
                const { error } = await supabase.from("purchases").insert({
                  email: email,
                  product_id: product.id,
                  amount: product.price,
                  transaction_id: response.transaction_id,
                });

                if (error) {
                  console.log("DB error:", error);
                } else {
                  alert("Payment successful! Access granted 🎉");
                }
              }

              closePaymentModal();
            },
            onClose: () => {},
          });
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default BuyButton;