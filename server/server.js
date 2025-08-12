import 'dotenv/config';
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Mock database (replace with real database in production)
let photos = [];
let photoIdCounter = 1;

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token || token !== 'mock-admin-token') {
    return res.sendStatus(401);
  }
  next();
};

// Admin login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password') {
    res.json({ token: 'mock-admin-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get all photos
app.get('/api/photos', (req, res) => {
  res.json(photos);
});

// Upload photo
app.post('/api/photos', authenticateToken, upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const newPhoto = {
    _id: photoIdCounter++,
    title: req.body.title || 'Untitled',
    description: req.body.description || '',
    album: req.body.album || '',
url: `https://phinzophotography.com/uploads/${req.file.filename}`,
    filename: req.file.filename,
    uploadDate: new Date()
  };
  
  photos.unshift(newPhoto);
  res.json(newPhoto);
});

// Delete photo
app.delete('/api/photos/:id', authenticateToken, (req, res) => {
  const photoId = parseInt(req.params.id);
  const photoIndex = photos.findIndex(p => p._id === photoId);
  
  if (photoIndex === -1) {
    return res.status(404).json({ error: 'Photo not found' });
  }
  
  const photo = photos[photoIndex];
  
  // Delete file from filesystem
  const filePath = path.join(__dirname, photo.url);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  
  photos.splice(photoIndex, 1);
  res.json({ success: true });
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "phinzophotography@gmail.com",
      pass: process.env.EMAIL_PASS, // Use environment variable for security
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
