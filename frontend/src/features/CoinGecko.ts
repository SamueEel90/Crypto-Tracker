import { useQuery } from '@tanstack/react-query';
import { fetchAllCryptos, fetchTopGainers, fetchTopLosers, fetchTopVolume } from '../api/gecko';
import type { CoinGeckoMarketCoin } from '../types/CoinGecko';

export const useFetchAllCryptos = () => 
  useQuery<CoinGeckoMarketCoin[]>({
    queryKey: ['all-cryptos'],
    queryFn: () => fetchAllCryptos(),
  });
  export const useFetchTopGainers = () =>
  useQuery<CoinGeckoMarketCoin[]>({
    queryKey: ['top-gainers'],
    queryFn: () => fetchTopGainers(),

  });
  export const useFetchTopLosers = () =>
  useQuery<CoinGeckoMarketCoin[]>({
    queryKey: ['top-losers'],
    queryFn: () => fetchTopLosers(),

  });

  export const useFetchTopVolume = () => 
    useQuery<CoinGeckoMarketCoin[]>({
      queryKey: ['top-volume'],
      queryFn: () => fetchTopVolume(),
  });

  
