import express from 'express';
import { getPrices, getWalletBalance, setWalletData, getPortfolioHistory } from '../controllers/binanceController.js';

const router = express.Router();

router.get('/prices', getPrices);

router.post('/walletData', setWalletData);

router.get('/walletBalance/:username', getWalletBalance);

router.get('/portfolio/:username', getPortfolioHistory);

export default router;