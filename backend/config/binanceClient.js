import axios from 'axios';

export async function get24hTicker(symbol) {
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;
  const response = await axios.get(url);
  return response.data;
}
export default get24hTicker;