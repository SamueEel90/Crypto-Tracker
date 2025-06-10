import ApiCredentials from '../models/ApiCredentials.js';
import User from '../models/User.js';
import axios from 'axios';
import ccxt from 'ccxt';
import { createHmac } from 'crypto';
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
export const getPortfolioHistory = async (req, res) => {
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

    const timestamp = Date.now();

    const params = new URLSearchParams({
      type: 'SPOT',
      timestamp: timestamp.toString(),
    });

    const signature = createHmac('sha256', creds.apiSecret)
      .update(params.toString())
      .digest('hex');
    params.append('signature', signature);

    const config = {
      headers: { 'X-MBX-APIKEY': creds.apiKey },
    };

    const response = await axios.get(
      `https://api.binance.com/sapi/v1/accountSnapshot?${params.toString()}`,
      config
    );

    const snapshots = response.data?.snapshotVos ?? [];

    if (snapshots.length === 0) {
      return res.status(404).json({ message: 'No snapshot data found.' });
    }

    const binance = new ccxt.binance();
    await binance.loadMarkets();

    const assetsToIgnore = new Set([
      "ETHW", "LDAAVE", "LDADA", "LDBABY", "LDBMT", "LDBNB", "LDBTC",
      "LDETH", "LDGPS", "LDGUN", "LDHAEDAL", "LDHUMA", "LDHYPER", "LDINIT",
      "LDINJ", "LDLINK", "LDNIL", "LDNXPC", "LDPARTI", "LDPEPE", "LDPOL",
      "LDRED", "LDSIGN", "LDSOL", "LDSOPH", "LDSTO", "LDSXT", "LDWCT", "SOLO"
    ]);

    const history = [];

    for (const snapshot of snapshots) {
      const balancesRaw = snapshot.data.balances;

      let totalValueUSDC = 0;

      console.log(`📅 Snapshot: ${new Date(snapshot.updateTime).toISOString()}`);

      for (const item of balancesRaw) {
        const asset = item.asset;

        // Ak je asset v zozname ignorovaných, preskočíme ho bez logu
        if (assetsToIgnore.has(asset)) {
          continue;
        }

        const total = parseFloat(item.free) + parseFloat(item.locked);

        if (total === 0) continue;

        let priceUSDC = 0;

        if (['USDC', 'USDT', 'BUSD'].includes(asset)) {
          priceUSDC = 1;
        } else {
          try {
            if (binance.markets?.[`${asset}/USDC`]) {
              priceUSDC = (await binance.fetchTicker(`${asset}/USDC`)).last;
            } else if (binance.markets?.[`${asset}/USDT`]) {
              priceUSDC = (await binance.fetchTicker(`${asset}/USDT`)).last;
            }
          } catch (err) {
            console.warn(`⚠️ Error fetching price for ${asset}: ${err.message}`);
            priceUSDC = 0;
          }
        }

        if (!priceUSDC || priceUSDC === 0) {
          console.log(`❌ Skipping ${asset}, price unavailable.`);
          continue;
        }

        const value = total * priceUSDC;
        totalValueUSDC += value;

        console.log(`✅ ${asset}: ${total} * ${priceUSDC} = ${value.toFixed(2)} USDC`);
      }

      console.log(`📈 Total portfolio value: ${totalValueUSDC.toFixed(2)} USDC\n`);

      history.push({
        date: new Date(snapshot.updateTime).toISOString().split('T')[0],
        totalValueUSDC: +totalValueUSDC.toFixed(2),
      });
    }

    history.sort((a, b) => new Date(a.date) - new Date(b.date));

    return res.json(history);
  } catch (err) {
    console.error('❌ Server error:', err.message);
    res.status(500).json({
      message: 'Failed to fetch portfolio history',
      error: err.message,
    });
  }
};
