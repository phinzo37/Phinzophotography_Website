"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const auth_1 = require("../middleware/auth");
const Photo_1 = __importDefault(require("../models/Photo"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Get all photos
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield Photo_1.default.find().sort({ uploadDate: -1 });
        res.json(photos);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Upload photo (protected route)
router.post('/', auth_1.auth, upload.single('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = yield cloudinary_1.v2.uploader.upload(req.file.buffer.toString('base64'), {
            folder: 'photography-portfolio',
        });
        const photo = new Photo_1.default({
            title: req.body.title,
            description: req.body.description,
            album: req.body.album,
            url: result.secure_url,
        });
        yield photo.save();
        res.status(201).json(photo);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Delete photo (protected route)
router.delete('/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = yield Photo_1.default.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        yield photo.deleteOne();
        res.json({ message: 'Photo deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
