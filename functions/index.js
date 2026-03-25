const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

admin.initializeApp();

const db = admin.firestore();

// -------------------- EMAIL SETUP --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password",
  },
});

// -------------------- R2 CONFIG --------------------
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${functions.config().r2.account}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: functions.config().r2.key,
    secretAccessKey: functions.config().r2.secret,
  },
});

const bucketName = functions.config().r2.bucket;

// -------------------- EMAIL FUNCTION --------------------
exports.sendBackendRequestEmail = functions.firestore
  .document("backendRequests/{requestId}")
  .onCreate(async (snap) => {
    const data = snap.data();

    const mailOptions = {
      from: "Marketplace",
      to: "gogracetech@gmail.com",
      subject: "New Backend Integration Request",
      html: `
        <h2>New Backend Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Template:</strong> ${data.templateName}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Deadline:</strong> ${data.deadline}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    };

    return transporter.sendMail(mailOptions);
  });

// -------------------- SIGNED URL FUNCTION (FIXED) --------------------
exports.getUploadUrl = functions.https.onCall(async (data, context) => {
  try {
    const { fileName, fileType } = data;

    if (!fileName || !fileType) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing fileName or fileType"
      );
    }

    // Clean filename
    const safeFileName = fileName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    const key = `uploads/${Date.now()}_${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(r2, command, {
      expiresIn: 60 * 15, // 15 mins
    });

    return {
      url: signedUrl,
      publicUrl: `https://pub-${functions.config().r2.account}.r2.dev/${key}`,
    };
  } catch (error) {
    console.error("SIGNED URL ERROR:", error);

    throw new functions.https.HttpsError(
      "internal",
      "Failed to generate upload URL"
    );
  }
});