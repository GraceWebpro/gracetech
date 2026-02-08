import React from "react";
import { usePaystackPayment } from "react-paystack";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../server/firebase";

const PaystackPayment = ({ amount = 0, template, user, onSuccess }) => {

  /* =============================
     HOOK MUST BE TOP LEVEL
  ============================= */

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email || "guest@email.com",
    amount: Number(amount) * 100, // kobo
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config); // ✅ ALWAYS here


  /* =============================
     SAVE PAYMENT
  ============================= */

  const savePayment = async (reference) => {
    await addDoc(collection(db, "payments"), {
      templateId: template.id,
      templateName: template.title,
      amountPaid: amount,
      transactionId: reference.reference,
      payerEmail: user?.email || null,
      userId: user?.uid || null,
      purchaseDate: serverTimestamp(),
      status: "success",
    });
  };


  /* =============================
     HANDLERS
  ============================= */

  const onPaymentSuccess = async (reference) => {
    await savePayment(reference);

    onSuccess?.(reference);

    // auto download
    const link = document.createElement("a");
    link.href = template.fileUrl;
    link.download = `${template.title}.zip`;
    link.click();

    alert("Payment successful! Download starting...");
  };

  const onClose = () => {
    console.log("Payment closed");
  };


  /* =============================
     UI
  ============================= */

  return (
    <button
      onClick={() => initializePayment(onPaymentSuccess, onClose)}
      className="
        w-full
        bg-primary
        text-black
        font-semibold
        py-3
        rounded-xl
        hover:opacity-90
        transition
      "
    >
      Buy Now • ₦{amount}
    </button>
  );
};

export default PaystackPayment;
