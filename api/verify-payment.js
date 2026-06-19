export default async function handler(req, res) {
  console.log("BODY:", req.body); // 👈 add this

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { transaction_id } = req.body;

    if (!transaction_id) {
      console.log("❌ Missing transaction_id");
      return res.status(400).json({ error: "No transaction_id provided" });
    }
  
    try {
      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        }
      );
  
      const data = await response.json();

      console.log("FLW RESPONSE:", data); // 👈 ADD THIS

      console.log("KEY:", process.env.FLW_SECRET_KEY);
      
      if (
        data.status === "success" &&
        (data.data.status === "successful" || data.data.status === "completed")
      ) {
        return res.status(200).json({
          success: true,
          data: data.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: data,
        });
      }
    } catch (error) {
      console.error("ERROR:", error);
      return res.status(500).json({ error: "Verification failed" });
    }
  }