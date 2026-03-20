// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// -------------------- Express Setup --------------------
const app = express();

// ✅ CORS (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev (Vite)
      "http://localhost:3000", // optional (React CRA)
      process.env.FRONTEND_URL, // production frontend
    ].filter(Boolean),
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// -------------------- Cloudflare R2 Setup --------------------
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_KEY,
    secretAccessKey: process.env.R2_SECRET,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET;

// -------------------- Routes --------------------

// Health check (VERY useful for debugging)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Get signed URL
app.post("/get-signed-url", async (req, res) => {
  try {
    const { fileName, contentType, slug } = req.body;

    if (!fileName || !contentType || !slug) {
      return res.status(400).json({
        error: "Missing fileName, contentType, or slug",
      });
    }

    // Clean filename
    const safeFileName = fileName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    const path = `templates/${slug}/${Date.now()}_${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: path,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(r2, command, {
      expiresIn: 60 * 15, // 15 minutes
    });

    return res.status(200).json({
      signedUrl,
      publicUrl: `https://pub-${process.env.R2_ACCOUNT}.r2.dev/${path}`,
    });
  } catch (error) {
    console.error("SIGNED URL ERROR:", error);

    return res.status(500).json({
      error: "Could not generate signed URL",
    });
  }
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});