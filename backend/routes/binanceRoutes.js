import express from 'express';
import { getPrices, getWalletBalance, setWalletData } from '../controllers/binanceController.js';

const router = express.Router();

router.get('/prices', getPrices);

router.post('/walletData', setWalletData);

router.get('/walletBalance/:username', getWalletBalance);


export default router;