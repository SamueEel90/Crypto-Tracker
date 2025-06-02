import ApiCredentials from '../models/ApiCredentials.js';
import User from '../models/User.js';
import axios from 'axios';

export const setWalletData = async (req, res) => {
  const { username, apiKey, apiSecret } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      await ApiCredentials.create({ userId: existingUser._id, apiKey, apiSecret });
      res.status(201).json({ message: 'Wallet data saved successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
export const getPrices = async (req, res) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');

    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'LTCUSDT', 'SOLUSDT'];
    const filtered = response.data.filter(t => symbols.includes(t.symbol));

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};