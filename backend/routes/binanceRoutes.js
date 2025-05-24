import express from 'express';
import { get24hTicker } from '../config/binanceClient.js';

const router = express.Router();

router.get('/price/:symbol', async (req, res) => {
  try {
    const data = await get24hTicker(req.params.symbol.toUpperCase());
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
