import express from 'express'
import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

import { uploadImageToCloudinary } from '../controllers/cloudinaryUploadController.js'


const router = express.Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect,getUserInfo)

router.post('/upload-image', upload.single('image'), uploadImageToCloudinary)


export default router 
