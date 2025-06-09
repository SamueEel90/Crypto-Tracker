import express from 'express';

const router = express.Router();
import User from '../models/User.js';

export const uploadProfilePicture = async (req, res) => {
  const username = req.body.username; 
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { profilePicture: imageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile picture updated', profilePicture: user.profilePicture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile picture' });
  }
};





export const getProfilePicture = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('profilePicture');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ profilePicture: user.profilePicture });
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export default router;