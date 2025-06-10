import express from 'express';
import { login, register } from '../controllers/authController.js';
import { uploadProfilePicture , getProfilePicture ,getUserEmail } from '../controllers/userController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload-profile-picture', upload.single('profilePicture'), uploadProfilePicture);
router.get('/profile/:username', getProfilePicture);
router.get('/email/:username', getUserEmail);
export default router;
