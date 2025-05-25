import express from 'express';

import axios from 'axios';
const router = express.Router();


router.get('/all-cryptos', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;