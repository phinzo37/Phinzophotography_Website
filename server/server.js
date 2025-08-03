import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: "phinzophotography@gmail.com",
      pass: "@@@Mandala123", // Replace with your actual Gmail app password
    },
  });

  const mailOptions = {
    from: email,
    to: "phinzophotography@gmail.com",
    subject: `Contact Form: ${subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
