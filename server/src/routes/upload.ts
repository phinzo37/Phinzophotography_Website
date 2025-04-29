import express from 'express';
import { upload } from '../config/cloudinary';
import { auth } from '../middleware/auth';

const router = express.Router();

// Upload single image
router.post('/single', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log successful upload
    console.log('File uploaded successfully:', {
      filename: req.file.originalname,
      path: req.file.path,
      folder: req.body.folder
    });

    res.json({
      message: 'File uploaded successfully',
      file: {
        url: req.file.path,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        folder: req.body.folder
      }
    });
  } catch (error) {
    console.error('Upload error details:', error);
    res.status(500).json({ 
      message: 'Error uploading file',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Upload multiple images
router.post('/multiple', auth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    res.json({
      message: 'Files uploaded successfully',
      files: req.files
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading files' });
  }
});

export default router; 