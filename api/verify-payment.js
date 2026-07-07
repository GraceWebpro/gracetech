import { supabase } from "./supabaseAdmin";

export default async function handler(req, res) {
  console.log("BODY:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { transaction_id, tx_ref } = req.body;

  // ✅ Only require transaction_id
  if (!transaction_id || !tx_ref) {
    return res.status(400).json({ error: "Missing transaction_id || tx_ref" });
  }

  try {

    // 🔎 Check DB first
    const { data: payment, error } = await supabase
      .from("payments")
      .select("*")
      .eq("tx_ref", tx_ref)
      .single();

      if (error || !payment) {
        return res.status(404).json({
          success: false,
          message: "Payment record not found",
        });
      }
  

    // if (!payment) {
    //   return res.status(400).json({ error: "Invalid tx_ref" });
    // }


    // 🔐 Verify with Flutterwave
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();
    const verified = result.data;

    if (result.status !== "success" || !verified || verified.status !== "successful") {
      return res.status(400).json({
        success: false,
        message: "Verification failed",
      });
    }

     // ❌ Email mismatch protection
     if (payment.email !== verified.customer.email) {
      return res.status(400).json({
        success: false,
        message: "Email mismatch",
      });
    }

    if (Number(verified.amount) !== Number(payment.amount)) {
      console.log("❌ AMOUNT MISMATCH", {
        db: payment.amount,
        flw: verified.amount,
      });
    }
    
    if (payment.tx_ref !== verified.tx_ref) {
      console.log("❌ TX_REF MISMATCH", {
        db: payment.tx_ref,
        flw: verified.tx_ref,
      });
    }
    
    if (
      payment.email.toLowerCase() !==
      verified.customer.email.toLowerCase()
    ) {
      console.log("❌ EMAIL MISMATCH", {
        db: payment.email,
        flw: verified.customer.email,
      });
    }

    // ✅ Basic validation
    if (
      Number(verified.amount) !== Number(payment.amount) ||
      verified.currency !== "NGN"
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment mismatch",
      });
    }

     // ✅ Prevent duplicate processing
     if (payment.status === "successful") {
      return res.json({ success: true });
    }

      // ✅ Update DB
      await supabase
      .from("payments")
      .update({
        status: "successful",
        transaction_id,
      })
      .eq("tx_ref", tx_ref);


    // ✅ SUCCESS
    return res.status(200).json({
      success: true,
      data: verified,
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Server error" });
  }
}