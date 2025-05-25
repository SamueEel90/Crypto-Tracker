import axios from 'axios';

export const fetchAllCryptos = async () => {
  const response = await axios.get(`/api/binance/all-cryptos`);
  return response.data;
};