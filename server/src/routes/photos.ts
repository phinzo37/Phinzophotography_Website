import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '../middleware/auth';
import Photo from '../models/Photo';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config();

console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadDate: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload photo (protected route)
router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
      folder: 'photography-portfolio',
    });

    const photo = new Photo({
      title: req.body.title,
      description: req.body.description,
      album: req.body.album,
      url: result.secure_url,
    });

    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete photo (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    await photo.deleteOne();
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 