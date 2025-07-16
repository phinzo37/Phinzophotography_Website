import express from 'express';
import multer from 'multer';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Create uploads directory
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// In-memory data store (replace with database)
let photos = [];
let photoIdCounter = 1;

// Admin credentials (replace with database)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && await bcrypt.compare(password, ADMIN_PASSWORD)) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/photos', (req, res) => {
  res.json(photos);
});

app.post('/api/photos', authenticateToken, upload.single('photo'), (req, res) => {
  const { title, description, album } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const photo = {
    _id: photoIdCounter++,
    title,
    description,
    album,
    url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    filename: req.file.filename
  };

  photos.unshift(photo);
  res.json(photo);
});

app.put('/api/photos/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description, album } = req.body;
  
  const photoIndex = photos.findIndex(p => p._id == id);
  if (photoIndex === -1) {
    return res.status(404).json({ error: 'Photo not found' });
  }

  photos[photoIndex] = { ...photos[photoIndex], title, description, album };
  res.json(photos[photoIndex]);
});

app.delete('/api/photos/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const photoIndex = photos.findIndex(p => p._id == id);
  
  if (photoIndex === -1) {
    return res.status(404).json({ error: 'Photo not found' });
  }

  const photo = photos[photoIndex];
  
  // Delete file
  const filePath = join(__dirname, 'uploads', photo.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  photos.splice(photoIndex, 1);
  res.json({ message: 'Photo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});