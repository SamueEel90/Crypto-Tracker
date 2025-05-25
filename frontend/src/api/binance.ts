import axios from 'axios';

export const fetchPairData = async (symbol: string) => {
  const response = await axios.get(`/api/binance/price/${symbol}`);
  return response.data;
};

export const fetchTopPrices = async () => {
  const response = await axios.get(`/api/binance/prices`);
  return response.data;
};