import User from '../models/User.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({username, email, password }); 
    res.status(201).json(user);
  }catch (err) {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
}
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
