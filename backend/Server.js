const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000', // Ensure this matches your frontend's URL
    methods: ['GET', 'POST'],
  }));
  app.use(bodyParser.json());

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gracetechagency@gmail.com', // Replace with your Gmail address
    pass: 'twbggryikgxpeorq', // Replace with your Gmail password (or App password)
  },
});

// POST route for contact form
app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;


  // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gracetechagency@gmail.com', // Replace with your Gmail address
      pass: 'twbggryikgxpeorq', // Replace with your Gmail password (or App password)
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'gracetechagency@gmail.com', // Your email address to receive messages
    subject: `New Message from ${firstName} ${lastName}`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ code: 200, message: "Message sent successfully" });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ code: 500, message: "Failed to send message" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
