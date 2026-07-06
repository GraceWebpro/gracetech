import { supabase } from "../src/config/supabase";

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
    const { data: payment } = await supabase
      .from("payments")
      .select("*")
      .eq("tx_ref", tx_ref)
      .single();

    if (!payment) {
      return res.status(400).json({ error: "Invalid tx_ref" });
    }

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

    // ✅ Basic validation
    if (

      verified.amount !== payment.amount ||
      verified.tx_ref !== payment.tx_ref ||
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
        transaction_id: transaction_id,
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