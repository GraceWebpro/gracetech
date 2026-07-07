import { supabase } from "./supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { transaction_id, tx_ref } = req.body;

    if (!transaction_id || !tx_ref) {
      return res.status(400).json({ error: "Missing transaction_id || tx_ref" });
    }

    if (!process.env.FLW_SECRET_KEY) {
      console.error("Missing FLW_SECRET_KEY");
      return res.status(500).json({
        success: false,
        message: "Server misconfiguration",
      });
    }

    // Get payment
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

    // Verify with Flutterwave
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

    if (!result || result.status !== "success" || !result.data) {
      return res.status(400).json({
        success: false,
        message: result?.message || "Verification failed",
      });
    }

    const verified = result.data;

    if (verified.status !== "successful") {
      return res.status(400).json({
        success: false,
        message: "Payment not successful",
      });
    }

    console.log("DB:", payment);
    console.log("FLW:", verified);

    // Normalize
    const dbAmount = Number(payment.amount);
    const flwAmount = Number(verified.amount);

    const dbEmail = payment.email.toLowerCase();
    const flwEmail = verified.customer?.email?.toLowerCase();

    if (!flwEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer email missing",
      });
    }

    // Validate
    if (dbAmount !== flwAmount) {
      return res.status(400).json({ success: false, message: "Amount mismatch" });
    }

    if (verified.currency !== "NGN") {
      return res.status(400).json({ success: false, message: "Invalid currency" });
    }

    if (dbEmail !== flwEmail) {
      return res.status(400).json({ success: false, message: "Email mismatch" });
    }

    if (verified.tx_ref !== tx_ref) {
      return res.status(400).json({
        success: false,
        message: "Transaction reference mismatch",
      });
    }

    // Prevent duplicate
    if (payment.status === "successful") {
      return res.json({ success: true });
    }

    // Update DB
    await supabase
      .from("payments")
      .update({
        status: "successful",
        transaction_id,
      })
      .eq("tx_ref", tx_ref);

    return res.status(200).json({
      success: true,
      data: verified,
    });

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}