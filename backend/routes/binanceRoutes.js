import express from 'express';
import { get24hTicker } from '../config/binanceClient.js';
import axios from 'axios';
const router = express.Router();

router.get('/prices', async (req, res) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
    
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'LTCUSDT','SOLUSDT', ];
    const filtered = response.data.filter(t => symbols.includes(t.symbol));
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/price/:symbol', async (req, res) => {
  try {
    const data = await get24hTicker(req.params.symbol.toUpperCase());
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
