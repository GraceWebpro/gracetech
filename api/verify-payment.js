export default async function handler(req, res) {
  console.log("BODY:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { transaction_id } = req.body;

  // ✅ Only require transaction_id
  if (!transaction_id) {
    return res.status(400).json({ error: "Missing transaction_id" });
  }

  try {
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

    if (result.status !== "success" || !verified) {
      return res.status(400).json({
        success: false,
        message: "Verification failed",
      });
    }

    // ✅ Basic validation
    if (
      verified.status !== "successful" &&
      verified.status !== "completed"
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment not successful",
      });
    }

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