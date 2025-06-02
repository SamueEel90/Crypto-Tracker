import axios from 'axios';

export const fetchPairData = async (symbol: string) => {
  const response = await axios.get(`/api/binance/price/${symbol}`);
  return response.data;
};

export const fetchTopPrices = async () => {
  const response = await axios.get(`/api/binance/prices`);
  return response.data;
};

export const setWalletKeys = async (apiKey: string, secretKey: string) => {
  const response = await axios.post(`/api/binance/wallet`, {
    apiKey,
    secretKey,
  });
  return response.data;
} 

