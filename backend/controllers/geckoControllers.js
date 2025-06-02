import axios from 'axios';

export const getAllCryptos = async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopGainers = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });

    const sorted = data
      .sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0))
      .slice(0, 10);

    res.json(sorted);
  } catch (error) {
    console.error('Top gainers API error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getTopLosers = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });

    const sorted = data
      .sort((a, b) => (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0))
      .slice(0, 10);

    res.json(sorted);
  } catch (error) {
    console.error('Top losers API error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getTopVolume = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'volume_desc',
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    });

    res.json(data.slice(1, 11));
  } catch (error) {
    console.error('Top volume API error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getTopMarketCapChange = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_change_24h_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });

    res.json(data);
  } catch (error) {
    console.error('Top market cap change API error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
