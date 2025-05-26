import axios from 'axios';

export const fetchAllCryptos = async () => {
  const response = await axios.get(`/api/gecko/all-cryptos`);
  return response.data;
};
export const fetchTopGainers = async () => {
  const response = await axios.get(`/api/gecko/top-gainers`);
  return response.data;
}