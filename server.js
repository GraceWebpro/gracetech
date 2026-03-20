// server.js
const express = require("express");
const router = express.Router();
const cors = require("cors");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config(); // load environment variables from .env

// -------------------- Express Setup --------------------
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(5000, () => console.log("Server Running on port 5000"));

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

// Endpoint to get signed URL for direct upload
router.post("/get-signed-url", async (req, res) => {
  try {
    const { fileName, contentType, slug } = req.body;

    if (!fileName || !contentType || !slug) {
      return res.status(400).json({ error: "Missing fileName, contentType, or slug" });
    }

    // Make the file path unique
    // Clean filename
    const safeFileName = fileName
      .toLowerCase()
      .replace(/\s+/g, "-")       // replace spaces with hyphen
      .replace(/[^a-z0-9.-]/g, ""); // remove strange characters

    const path = `templates/${slug}/${Date.now()}_${safeFileName}`;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: path,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 900 }); // 15 min

    res.json({
      signedUrl,
      publicUrl: `https://pub-${process.env.R2_ACCOUNT}.r2.dev/${path}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not generate signed URL" });
  }
});