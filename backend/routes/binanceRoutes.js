import express from 'express';
import { getPrices, setWalletData } from '../controllers/binanceController.js';

const router = express.Router();

router.get('/prices', getPrices);

router.post('/walletData', setWalletData);

export default router;