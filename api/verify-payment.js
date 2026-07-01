import { sendDownloadEmail } from "../src/components/utils/sendEmail";
import { supabase } from "../src/config/supabase"; // adjust path

export default async function handler(req, res) {
  console.log("BODY:", req.body); // 👈 add this

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { transaction_id, tx_ref, expected_amount, product_name } = req.body;

    if (!transaction_id || !tx_ref || !expected_amount) {
      console.log("❌ Missing transaction_id");
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {

        // 🔍 1. Get pending payment from DB
      const { data: pending, error: pendingError } = await supabase
      .from("pending_payments")
      .select("*")
      .eq("tx_ref", tx_ref)
      .single();

      if (pendingError || !pending) {
        return res.status(400).json({
          success: false,
          message: "No pending payment found",
        });
      }

      // 🚫 2. Prevent re-processing
      if (pending.status === "completed") {
        return res.status(400).json({
          success: false,
          message: "Payment already processed",
        });
      }

       // 🔍 1. Check if transaction already used
      const { data: existing } = await supabase
      .from("payments")
      .select("transaction_id")
      .eq("transaction_id", transaction_id)
      .single();

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Transaction already used",
        });
      }

       // 🔐 2. Verify with Flutterwave
      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        }
      );
  
      // const data = await response.json();
      const result = await response.json();
      const verified = result.data;

      // ❌ Flutterwave API failed
      if (result.status !== "success" || !verified) {
        return res.status(400).json({
          success: false,
          message: "Verification failed",
        });
      }

       // 🔒 3. Strict validation
      const isValid =
      (verified.status === "successful" || verified.status === "completed") &&
      Number(verified.amount) === Number(pending.amount) &&
      verified.currency === pending.currency &&
      verified.tx_ref === pending.tx_ref;

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid transaction details",
        });
      }
            
       // ✅ 6. Save payment (trusted data only)
       const { error: insertError } = await supabase.from("payments").insert([
        {
          transaction_id: verified.id,
          tx_ref: verified.tx_ref,
          email: pending.email, // 🔐 use YOUR DB, not Flutterwave blindly
          amount: verified.amount,
          currency: verified.currency,
          product_name: pending.product_name,
          status: verified.status,
        },
      ]);


      if (insertError) {
        throw insertError;
      }

      // ✅ 7. Mark pending as completed
      await supabase
      .from("pending_payments")
      .update({ status: "completed" })
      .eq("tx_ref", tx_ref);

      const { data: template, error: templateError } = await supabase
      .from("templates") // or whatever your table is called
      .select("file_url")
      .eq("name", pending.product_name)
      .single();

    if (templateError || !template) {
      throw new Error("Template not found");
    }

      await sendDownloadEmail({
        email: pending.email,
        productName: pending.product_name,
        downloadUrl: template.file_url,
      });

      return res.status(200).json({
        success: true,
        data: verified,
      });

      
    } catch (error) {
      console.error("ERROR:", error);
      return res.status(500).json({ error: "Verification failed" });
    }
  }