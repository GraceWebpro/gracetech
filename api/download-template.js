import { supabase } from "./supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { tx_ref } = req.body;

    if (!tx_ref) {
      return res.status(400).json({
        success: false,
        message: "Missing transaction reference",
      });
    }

    // ============================
    // FIND PAYMENT
    // ============================

    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("*")
      .eq("tx_ref", tx_ref)
      .single();

    if (paymentError || !payment) {
      console.error(paymentError);

      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status !== "successful") {
      return res.status(403).json({
        success: false,
        message: "Payment has not been verified",
      });
    }

    // ============================
    // FIND TEMPLATE
    // ============================

    const { data: template, error: templateError } = await supabase
      .from("templates")
      .select("*")
      .eq("slug", payment.slug)
      .single();

    if (templateError || !template) {
      console.error(templateError);

      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    // ============================
    // FIND PURCHASED VERSION
    // ============================

    const version = template.versions?.[payment.version];

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Purchased version not found",
      });
    }

    if (!version.downloadUrl) {
      return res.status(404).json({
        success: false,
        message: "Download URL missing",
      });
    }

    // ============================
    // FIRST DOWNLOAD ONLY
    // ============================

    if (!payment.downloaded) {
        const currentDownloads = Number(template.downloads_count || 0);
    
        const { error: templateError } = await supabase
        .from("templates")
        .update({
            downloads_count: currentDownloads + 1,
        })
        .eq("id", template.id);
    
        if (templateError) {
        console.error(templateError);
    
        return res.status(500).json({
            success: false,
            message: "Failed to update download count",
        });
        }
    
        const { error: paymentUpdateError } = await supabase
        .from("payments")
        .update({
            downloaded: true,
        })
        .eq("tx_ref", payment.tx_ref);
    
        if (paymentUpdateError) {
        console.error(paymentUpdateError);
    
        return res.status(500).json({
            success: false,
            message: "Failed to update payment",
        });
        }
    }

    // ============================
    // RETURN DOWNLOAD URL
    // ============================

    return res.status(200).json({
      success: true,
      downloadUrl: version.downloadUrl,
      filename: `${template.slug}-${payment.version}.zip`,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}