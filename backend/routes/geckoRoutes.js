import express from 'express';
import {getAllCryptos, getTopGainers, getTopLosers, getTopVolume, getTopMarketCapChange } from '../controllers/geckoControllers.js';

const router = express.Router();

router.get('/all-cryptos', getAllCryptos);
router.get('/top-gainers', getTopGainers);
router.get('/top-losers', getTopLosers);
router.get('/top-volume', getTopVolume);
router.get('/top-market-cap-change', getTopMarketCapChange);

export default router;