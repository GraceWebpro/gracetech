// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();

// -------------------- CORS --------------------
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002", // 👈 add this if you use it
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error("❌ CORS blocked:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// -------------------- R2 SETUP --------------------
const { R2_ACCOUNT, R2_KEY, R2_SECRET, R2_BUCKET } = process.env;

if (!R2_ACCOUNT || !R2_KEY || !R2_SECRET || !R2_BUCKET) {
  console.error("❌ Missing R2 environment variables");
  process.exit(1); // stop server if config is broken
}

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_KEY,
    secretAccessKey: R2_SECRET,
  },
});

// -------------------- ROUTES --------------------

// Health check
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Signed URL endpoint
app.post("/get-signed-url", async (req, res) => {
  try {
    console.log("📩 Incoming request:", req.body);

    const { fileName, contentType, slug } = req.body;

    if (!fileName || !contentType || !slug) {
      return res.status(400).json({
        error: "Missing fileName, contentType, or slug",
      });
    }

    // ✅ Better file type validation (more flexible)
    const allowedTypes = [
      "image/",
      "application/zip",
      "application/x-zip-compressed",
      "application/octet-stream",
    ];

    const isValidType = allowedTypes.some((type) =>
      contentType.startsWith(type)
    );

    if (!isValidType) {
      return res.status(400).json({
        error: "Invalid file type",
      });
    }

    // Clean filename
    const safeFileName = fileName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    const path = `templates/${slug}/${Date.now()}_${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: path,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(r2, command, {
      expiresIn: 60 * 15,
    });

    console.log("✅ Signed URL generated:", path);

    return res.status(200).json({
      signedUrl,
      publicUrl: `https://pub-${R2_ACCOUNT}.r2.dev/${path}`,
    });
  } catch (error) {
    console.error("❌ SIGNED URL ERROR:", error);

    return res.status(500).json({
      error: "Could not generate signed URL",
      details: error.message,
    });
  }
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});