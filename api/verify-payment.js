import { supabase } from "./supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { transaction_id, tx_ref } = req.body;

    console.log("BODY:", req.body);

    // ✅ Validate input
    if (!transaction_id) {
      return res.status(400).json({
        success: false,
        message: "Missing transaction_id",
      });
    }

    // ✅ Ensure secret key exists
    if (!process.env.FLW_SECRET_KEY) {
      console.error("❌ Missing FLW_SECRET_KEY");
      return res.status(500).json({
        success: false,
        message: "Server misconfiguration",
      });
    }

    // ✅ Get payment from DB
    const { data: payment, error } = await supabase
      .from("payments")
      .select("*")
      .eq("tx_ref", tx_ref)
      .single();

    if (error || !payment) {
      console.log("❌ Payment not found in DB");
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    console.log("DB PAYMENT:", payment);

    // ✅ Verify with Flutterwave
    console.log("VERIFYING TX:", transaction_id);

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

    console.log("FLW RAW RESPONSE:", JSON.stringify(result, null, 2));

    // ✅ Validate Flutterwave response
    if (!result || result.status !== "success" || !result.data) {
      return res.status(400).json({
        success: false,
        message: result?.message || "Flutterwave verification failed",
      });
    }

    const verified = result.data;

    // ✅ Ensure payment succeeded
    if (verified.status !== "successful") {
      console.log("❌ Payment not successful:", verified.status);
      return res.status(400).json({
        success: false,
        message: "Payment not successful",
      });
    }

    console.log("FLW VERIFIED:", verified);

    // ✅ Normalize values
    const dbAmount = Number(payment.amount);
    const flwAmount = Number(verified.amount);

    const dbEmail = payment.email?.toLowerCase();
    const flwEmail = verified.customer?.email?.toLowerCase();

    // 🔍 Final comparison log (CRITICAL DEBUG)
    console.log("=== FINAL CHECK ===");
    console.log({
      dbAmount,
      flwAmount,
      dbEmail,
      flwEmail,
      dbTxRef: payment.tx_ref,
      flwTxRef: verified.tx_ref,
      currency: verified.currency,
    });

    // ✅ Validate amount

    console.log("AMOUNT CHECK:", {
      dbAmount,
      flwAmount,
    });
    if (Math.abs(dbAmount - flwAmount) > 1) {
      console.log("❌ FAIL: AMOUNT MISMATCH", {
        dbAmount,
        flwAmount,
      });
    
      return res.status(400).json({
        success: false,
        message: "Amount mismatch",
      });
    }

    // ✅ Validate currency
    if (verified.currency !== "NGN") {
      console.log("❌ FAIL: CURRENCY");
      return res.status(400).json({
        success: false,
        message: "Invalid currency",
      });
    }

    // ✅ Validate email
    if (!flwEmail || dbEmail !== flwEmail) {
      console.log("❌ FAIL: EMAIL");
      return res.status(400).json({
        success: false,
        message: "Email mismatch",
      });
    }

    // ✅ Validate tx_ref (SAFE VERSION)
    if (verified.tx_ref !== tx_ref) {
      console.log("❌ FAIL: TX_REF MISMATCH", {
        flw: verified.tx_ref,
        db: tx_ref,
      });
    
      return res.status(400).json({
        success: false,
        message: "Transaction reference mismatch",
      });
    }

    // ✅ Prevent duplicate processing
    if (payment.status === "successful") {
      console.log("⚠️ Already processed", tx_ref);
      return res.json({ success: true });
    }

    // ✅ Update DB
    const { error: updateError } = await supabase
      .from("payments")
      .update({
        status: "successful",
        transaction_id,
      })
      .eq("tx_ref", tx_ref);

    if (updateError) {
      console.error("❌ DB UPDATE ERROR:", updateError);
      return res.status(500).json({
        success: false,
        message: "Failed to update payment",
      });
    }

    console.log("✅ PAYMENT VERIFIED & UPDATED");

    return res.status(200).json({
      success: true,
      data: verified,
    });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}