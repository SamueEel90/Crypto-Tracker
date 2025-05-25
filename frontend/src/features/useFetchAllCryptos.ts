import { useQuery } from '@tanstack/react-query';
import { fetchAllCryptos } from '../api/binance';
import type { CoinGeckoMarketCoin } from '../types/CoinGecko';

export const useFetchAllCryptos = () => 
  useQuery<CoinGeckoMarketCoin[]>({
    queryKey: ['all-cryptos'],
    queryFn: () => fetchAllCryptos(),
  });