import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendDownloadEmail = async ({ email, productName, downloadUrl }) => {
  try {
    await resend.emails.send({
        from: "GraceTech <gogracetech@gmail.com>",
        to: pending.email,
        subject: "Payment Successful 🎉 Your download has started",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Thank you for your purchase 🎉</h2>
      
            <p>Your payment was successful and your download has started.</p>
      
            <p><strong>Product:</strong> ${pending.product_name}</p>
            <p><strong>Amount:</strong> ${pending.amount} ${pending.currency}</p>
      
            <p>If your download does not start automatically, use the link below:</p>
      
            <a href="https://gracetechie.com.ng/download/${pending.tx_ref}" 
               style="display:inline-block;margin-top:10px;padding:10px 15px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">
              Download File
            </a>
      
            <p style="margin-top:20px;">Thanks for supporting us 🙌</p>
          </div>
        `,
      });
  } catch (err) {
    console.error("Email error:", err);
  }
};