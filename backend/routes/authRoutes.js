import express from 'express';
import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { uploadImageToCloudinary } from '../controllers/cloudinaryUploadController.js';
import { authLimiter, uploadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register',      authLimiter,  registerUser);
router.post('/login',         authLimiter,  loginUser);
router.get('/getUser',        protect,      getUserInfo);
router.post('/upload-image',  protect, uploadLimiter, upload.single('image'), uploadImageToCloudinary);

export default router;