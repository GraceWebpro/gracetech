/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

admin.initializeApp();

const db = admin.firestore();

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password",
  }
});

// R2 CONFIG
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${functions.config().r2.account}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: functions.config().r2.key,
    secretAccessKey: functions.config().r2.secret,
  },
});

const bucketName = functions.config().r2.bucket;



// EMAIL FUNCTION
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
      `
    };

    return transporter.sendMail(mailOptions);
  });

  // R2 UPLOAD FUNCTION/
  exports.uploadToR2 = functions.https.onCall(async (data, context) => {

    const { fileName, fileData, contentType } = data;
  
    const buffer = Buffer.from(fileData, "base64");
  
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    });
  
    await r2.send(command);
  
    return {
      success: true,
      url: `https://${functions.config().r2.account}.r2.cloudflarestorage.com/${bucketName}/${fileName}`
    };
  });