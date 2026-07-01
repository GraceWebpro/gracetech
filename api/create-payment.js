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

    const tx_ref = `tx-${uuidv4()}`;

    const { error } = await supabase.from("pending_payments").insert([
      {
        tx_ref,
        email,
        product_name,
        amount,
        currency: "NGN",
        status: "pending",
      },
    ]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "DB error" });
    }

    return res.status(200).json({ tx_ref });

  } catch (err) {
    console.error("CRASH:", err);
    return res.status(500).json({ error: "Server crashed" });
  }
}