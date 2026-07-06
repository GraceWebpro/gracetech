import { supabase } from "./supabaseAdmin";

const { v4: uuidv4 } = require("uuid");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, product_name, amount } = req.body || {};

    if (!email || !product_name || !amount) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const tx_ref = `GRACE-tx-${uuidv4() + Date.now()}`;

    // ✅ Save to DB as pending
    const { error } = await supabase.from("payments").insert([
      {
        email,
        product_name,
        amount,
        tx_ref,
        status: "pending",
      },

      
    ]);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return res.status(500).json({ error: "DB error" });
    }

    // ✅ No database — just return tx_ref
    return res.status(200).json({ tx_ref });

  } catch (err) {
    console.error("CRASH:", err);
    return res.status(500).json({ error: "Server crashed" });
  }
}