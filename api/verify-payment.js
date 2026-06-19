export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { transaction_id } = req.body;
  
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
        });
      }
    } catch (error) {
      return res.status(500).json({ error: "Verification failed" });
    }
  }