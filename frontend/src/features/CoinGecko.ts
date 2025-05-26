import { useQuery } from '@tanstack/react-query';
import { fetchAllCryptos } from '../api/gecko';
import type { CoinGeckoMarketCoin } from '../types/CoinGecko';

export const useFetchAllCryptos = () => 
  useQuery<CoinGeckoMarketCoin[]>({
    queryKey: ['all-cryptos'],
    queryFn: () => fetchAllCryptos(),
  });
  export const useFetchTopGainers = () =>
  useQuery<CoinGeckoMarketCoin[]>({
    queryKey: ['top-gainers'],
    queryFn: () => fetchAllCryptos(),
    select: (data) => data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 8),
  });

