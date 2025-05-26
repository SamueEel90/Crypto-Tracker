import axios from 'axios';

export const fetchAllCryptos = async () => {
  const response = await axios.get(`/api/gecko/all-cryptos`);
  return response.data;
};
export const fetchTopGainers = async () => {
  const response = await axios.get(`/api/gecko/top-gainers`);
  return response.data;
}
export const fetchTopLosers = async () => {
  const response = await axios.get(`/api/gecko/top-losers`);
  return response.data;
}
export const fetchTopVolume = async () => {
  const response = await axios.get(`/api/gecko/top-volume`);
  return response.data;
}
export const fetchTopMarketCapChange = async () => {
  const response = await axios.get('/api/gecko/top-market-cap-change');
  return response.data;

}