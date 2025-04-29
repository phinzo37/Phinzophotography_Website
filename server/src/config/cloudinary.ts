import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { Request } from 'express';
require('dotenv').config();



console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    // You can dynamically set the folder based on request parameters
    // For example: req.body.category or req.params.albumId
    const folder = req.body.folder || 'gurung-photography';
    
    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      format: 'auto', // Auto-detect format
      resource_type: 'auto', // Auto-detect resource type
      transformation: [
        { quality: 'auto:best' }, // Use best quality optimization
        { fetch_format: 'auto' }, // Automatic format selection based on browser
        // Removed size limit to preserve original quality
        // Original file will be stored, but Cloudinary will create optimized versions for delivery
      ]
    };
  }
} as any);

// Create multer upload middleware
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

export { cloudinary, upload }; 