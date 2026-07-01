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

    // ✅ No database — just return tx_ref
    return res.status(200).json({ tx_ref });

  } catch (err) {
    console.error("CRASH:", err);
    return res.status(500).json({ error: "Server crashed" });
  }
}