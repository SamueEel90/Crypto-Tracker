import ApiCredentials from '../models/ApiCredentials.js';
import User from '../models/User.js';
import axios from 'axios';
import ccxt from 'ccxt';

export const setWalletData = async (req, res) => {
  const { username, apiKey, apiSecret } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await ApiCredentials.findOneAndUpdate(
      { userId: existingUser._id },
      { apiKey, apiSecret },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Wallet data saved or updated successfully.' });
  } catch (error) {
    console.error(error);
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


export const getWalletBalance = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const creds = await ApiCredentials.findOne({ userId: user._id });
    if (!creds || !creds.apiKey || !creds.apiSecret) {
      return res.status(400).json({ message: 'API credentials not set for user.' });
    }

    const binance = new ccxt.binance({
      apiKey: creds.apiKey,
      secret: creds.apiSecret,
      options: { defaultType: 'spot' },
    });

    await binance.loadMarkets();

    const balance = await binance.fetchBalance();

    const balances = [];
    let totalValueUSDC = 0;
for (const asset of Object.keys(balance.total)) {
  const free = balance.free?.[asset] ?? 0;
  const locked = balance.locked?.[asset] ?? 0;
  if (free + locked === 0) continue;

  let priceUSDC = 0;
  try {
    if (binance.markets?.[`${asset}/USDC`]) {
      const ticker = await binance.fetchTicker(`${asset}/USDC`);
      priceUSDC = ticker.last;
    } else if (binance.markets?.[`${asset}/USDT`]) {
      const ticker = await binance.fetchTicker(`${asset}/USDT`);
      priceUSDC = ticker.last;
    }
  } catch {
    priceUSDC = 0;
  }


  if (!priceUSDC || priceUSDC === 0) continue;

  const valueUSDC = (free + locked) * priceUSDC;
  totalValueUSDC += valueUSDC;

  balances.push({
    asset,
    free,
    locked,
    priceUSDC,
    valueUSDC,
  });
}
    res.json({
      totalValueUSDC,
      balances,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch wallet overview', error: error.message });
  }
};
