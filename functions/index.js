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

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password"
  }
});

exports.sendBackendRequestEmail = functions.firestore
  .document("backendRequests/{requestId}")
  .onCreate(async (snap) => {

    const data = snap.data();

    const mailOptions = {
      from: "Marketplace",
      to: "your-email@gmail.com",
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
